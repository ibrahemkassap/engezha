import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin';
import { sendInquiryNotificationEmail } from '@/lib/email/mailer';
import { ProjectInquiry } from '@/types';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const inquiryId = params.id;
    const adminClient = getAdminClient();

    if (!adminClient) {
      return NextResponse.json(
        { error: 'قاعدة البيانات غير متصلة.' },
        { status: 500 }
      );
    }

    const { data: inquiry, error } = await adminClient
      .from('project_inquiries')
      .select('*, attachments:inquiry_attachments(*)')
      .eq('id', inquiryId)
      .single();

    if (error || !inquiry) {
      return NextResponse.json(
        { error: 'الطلب غير موجود.' },
        { status: 404 }
      );
    }

    const result = await sendInquiryNotificationEmail(inquiry as ProjectInquiry);

    if (!result.success) {
      return NextResponse.json(
        { error: `فشل إرسال البريد: ${result.error}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'تم إعادة إرسال الإشعار بنجاح.',
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
