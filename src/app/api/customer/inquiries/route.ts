import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const admin = getAdminClient();
    const client = admin || supabase;

    // Fetch inquiries owned by this user
    const { data: inquiries, error } = await client
      .from('project_inquiries')
      .select('*, attachments:inquiry_attachments(*)')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Customer Inquiries API] Error:', error);
      return NextResponse.json({ error: 'تعذر جلب طلباتك' }, { status: 500 });
    }

    return NextResponse.json({ inquiries: inquiries || [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
