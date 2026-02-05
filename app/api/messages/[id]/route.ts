import { getRequestContext } from '@cloudflare/next-on-pages';
import { createKVUtil } from '@/lib/kv';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { env } = getRequestContext();
    const kvBinding = (env as Record<string, KVNamespace | undefined>)["message-kv"];
    if (!kvBinding) {
      throw new Error('KV binding not found; expected "message-kv"');
    }
    const kv = createKVUtil(kvBinding);

    const key = `message:${id}`;
    const exists = await kv.exists(key);

    if (!exists) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    const result = await kv.getWithMetadata(key);

    return NextResponse.json({
      success: true,
      data: {
        id,
        content: result.value,
        metadata: result.metadata,
      },
    });
  } catch (error) {
    console.error('Error getting message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get message' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const key = `message:${id}`;
    const exists = await kv.exists(key);

    if (!exists) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    const existingMetadata = await kv.getWithMetadata(key);
    const mergedMetadata = {
      ...(existingMetadata.metadata || {}),
      ...metadata,
      updatedAt: Date.now(),
    };

    // 默认 24 小时（86400 秒）过期
    const finalExpirationTtl = expirationTtl ?? 86400;
    await kv.set(key, content, {
      expiration,
      expirationTtl: finalExpirationTtl,
      metadata: mergedMetadata,
    });

    return NextResponse.json({
      success: true,
      data: { id },
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { env } = getRequestContext();
    const kvBinding = (env as Record<string, KVNamespace | undefined>)["message-kv"];
    if (!kvBinding) {
      throw new Error('KV binding not found; expected "message-kv"');
    }
    const kv = createKVUtil(kvBinding);

    const key = `message:${id}`;
    const exists = await kv.exists(key);

    if (!exists) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    await kv.delete(key);

    return NextResponse.json({
      success: true,
      data: { id },
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
