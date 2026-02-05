import { getRequestContext } from '@cloudflare/next-on-pages';
import { createKVUtil } from '@/lib/kv';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

function generatePickupCode(): string {
  return crypto.randomUUID().substring(0, 4).toUpperCase();
}

export async function GET(request: NextRequest) {
  try {
    const { env } = getRequestContext();
    const kvBinding = (env as Record<string, KVNamespace | undefined>)["message-kv"];
    if (!kvBinding) {
      throw new Error('KV binding not found; expected "message-kv"');
    }
    const kv = createKVUtil(kvBinding);
    
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const cursor = url.searchParams.get('cursor') || undefined;
    const prefix = url.searchParams.get('prefix') || undefined;

    const result = await kv.list({ limit, cursor, prefix });

    return NextResponse.json({
      success: true,
      data: result.keys.map(entry => ({
        id: entry.key,
        ...(typeof entry.value === 'string' ? { content: entry.value } : entry.value),
        metadata: entry.metadata,
        expiration: entry.expiration,
      })),
      cursor: result.cursor,
      list_complete: result.list_complete,
    });
  } catch (error) {
    console.error('Error listing messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to list messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { env } = getRequestContext();
    const kvBinding = (env as Record<string, KVNamespace | undefined>)["message-kv"];
    if (!kvBinding) {
      throw new Error('KV binding not found; expected "message-kv"');
    }
    const kv = createKVUtil(kvBinding);

    const body = await request.json() as { content?: string; metadata?: Record<string, unknown>; expiration?: number; expirationTtl?: number };
    const { content, metadata, expiration, expirationTtl } = body;

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: content' },
        { status: 400 }
      );
    }

    const id = generatePickupCode();
    const key = `message:${id}`;
    // 默认 24 小时（86400 秒）过期
    const finalExpirationTtl = expirationTtl ?? 86400;
    await kv.set(key, content, {
      expiration,
      expirationTtl: finalExpirationTtl,
      metadata: metadata ? { ...metadata, createdAt: Date.now() } : { createdAt: Date.now() },
    });

    return NextResponse.json({
      success: true,
      data: { id, key },
    });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create message' },
      { status: 500 }
    );
  }
}
