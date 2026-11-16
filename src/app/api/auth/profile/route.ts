import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getAdminClient } from '@/lib/supabase/admin';
import { profileUpdateSchema } from '@/lib/validations/auth';

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

    const { data: profile } = await client
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    return NextResponse.json({
      user: {
        id: session.user.id,
        email: session.user.email,
      },
      profile: profile || {
        id: session.user.id,
        full_name: session.user.user_metadata?.full_name || '',
        phone: session.user.user_metadata?.phone || '',
        email: session.user.email || '',
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const body = await req.json();
    const validation = profileUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'بيانات غير صالحة' },
        { status: 400 }
      );
    }

    const { fullName, phone } = validation.data;
    const admin = getAdminClient();
    const client = admin || supabase;
    const nowIso = new Date().toISOString();

    const profileData = {
      id: session.user.id,
      full_name: fullName,
      phone,
      email: session.user.email || '',
      updated_at: nowIso,
    };

    const { error: upsertError } = await client
      .from('profiles')
      .upsert(profileData, { onConflict: 'id' });

    if (upsertError) {
      console.error('[Profile API] Upsert Error:', upsertError);
      return NextResponse.json({ error: 'تعذر حفظ الملف الشخصي' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      profile: profileData,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
