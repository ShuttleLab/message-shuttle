/// <reference types="@cloudflare/workers-types" />

export interface KVEntry<T = string> {
  key: string;
  value: T;
  metadata?: Record<string, unknown>;
  expiration?: number;
}

export interface KVListOptions {
  limit?: number;
  cursor?: string;
  prefix?: string;
}

export interface KVListResult<T = string> {
  keys: KVEntry<T>[];
  list_complete: boolean;
  cursor?: string;
}

export class KVUtil {
  private kv: KVNamespace;

  constructor(kv: KVNamespace) {
    this.kv = kv;
  }

  async get<T = string>(key: string): Promise<T | null> {
    const value = await this.kv.get(key);
    if (value === null) return null;
    
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  }

  async getRaw(key: string): Promise<string | null> {
    return await this.kv.get(key);
  }

  async set<T>(
    key: string,
    value: T,
    options?: { expiration?: number; expirationTtl?: number; metadata?: Record<string, unknown> }
  ): Promise<void> {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    
    await this.kv.put(key, stringValue, {
      expiration: options?.expiration,
      expirationTtl: options?.expirationTtl,
      metadata: options?.metadata,
    });
  }

  async delete(key: string): Promise<void> {
    await this.kv.delete(key);
  }

  async deleteMultiple(keys: string[]): Promise<void> {
    for (const key of keys) {
      await this.kv.delete(key);
    }
  }

  async list<T = string>(options: KVListOptions = {}): Promise<KVListResult<T>> {
    const result = await this.kv.list({
      limit: options.limit,
      cursor: options.cursor,
      prefix: options.prefix,
    });

    const keys: KVEntry<T>[] = result.keys.map((key) => ({
      key: key.name,
      value: (key.metadata as Record<string, unknown> | undefined)?.value as T ?? '' as T,
      metadata: key.metadata as Record<string, unknown> | undefined,
      expiration: key.expiration,
    }));

    return {
      keys,
      list_complete: result.list_complete,
      cursor: 'cursor' in result ? result.cursor : undefined,
    };
  }

  async exists(key: string): Promise<boolean> {
    const value = await this.kv.get(key);
    return value !== null;
  }

  async getWithMetadata<T = string>(
    key: string
  ): Promise<{ value: T | null; metadata: Record<string, unknown> | null }> {
    const result = await this.kv.getWithMetadata(key);
    if (result.value === null) return { value: null, metadata: null };

    try {
      return {
        value: JSON.parse(result.value) as T,
        metadata: result.metadata as Record<string, unknown> | null,
      };
    } catch {
      return {
        value: result.value as unknown as T,
        metadata: result.metadata as Record<string, unknown> | null,
      };
    }
  }

  async getAndDelete<T = string>(
    key: string
  ): Promise<{ value: T | null; metadata: Record<string, unknown> | null }> {
    const result = await this.getWithMetadata<T>(key);
    if (result.value !== null) {
      await this.delete(key);
    }
    return result;
  }
}

export function createKVUtil(kv: KVNamespace): KVUtil {
  return new KVUtil(kv);
}
