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
    const result = await kv.getAndDelete(key);

    if (result.value === null) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id,
        content: result.value,
        metadata: result.metadata,
      },
    });
  } catch (error) {
    console.error('Error retrieving message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve message' },
      { status: 500 }
    );
  }
}
