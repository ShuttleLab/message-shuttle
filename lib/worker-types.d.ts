/// <reference types="@cloudflare/workers-types" />

declare global {
  interface CloudflareEnv {
    "message-kv": KVNamespace;
    [key: string]: KVNamespace | undefined;
  }
}

export {};
