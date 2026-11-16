import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { note } = await req.json();
    const adminClient = getAdminClient();

    if (!adminClient) {
      return NextResponse.json({ success: true, mock: true });
    }

    const { error } = await adminClient.from('inquiry_internal_notes').insert({
      inquiry_id: params.id,
      note,
      author_email: 'admin@engezha.com',
      created_at: new Date().toISOString(),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
