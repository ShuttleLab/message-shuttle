/// <reference types="@cloudflare/workers-types" />
import { createKVUtil } from './kv';

interface Env {
  "message-kv": KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const kv = createKVUtil(env["message-kv"]);

    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/api/kv/set' && request.method === 'POST') {
      const { key, value } = await request.json() as { key: string; value: string };
      await kv.set(key, value);
      return new Response(JSON.stringify({ success: true, key }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (path === '/api/kv/get' && request.method === 'GET') {
      const key = url.searchParams.get('key');
      if (!key) {
        return new Response(JSON.stringify({ error: 'Missing key parameter' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const value = await kv.get(key);
      return new Response(JSON.stringify({ key, value }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (path === '/api/kv/delete' && request.method === 'DELETE') {
      const key = url.searchParams.get('key');
      if (!key) {
        return new Response(JSON.stringify({ error: 'Missing key parameter' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      await kv.delete(key);
      return new Response(JSON.stringify({ success: true, key }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (path === '/api/kv/list' && request.method === 'GET') {
      const result = await kv.list({ limit: 100 });
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
