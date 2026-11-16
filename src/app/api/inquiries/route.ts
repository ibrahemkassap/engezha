import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validations/inquiry';
import { generateRequestId } from '@/lib/utils';
import { getAdminClient } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { sendInquiryNotificationEmail } from '@/lib/email/mailer';
import { InquiryAttachment, ProjectInquiry } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = inquirySchema.safeParse(body.formData);

    if (!parsedData.success) {
      const firstIssue = parsedData.error.issues[0]?.message || 'بيانات غير صالحة';
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    const {
      fullName,
      phone,
      email,
      executionMode,
      categoryId,
      selectedProjectId,
      selectedProjectTitle,
      projectTitle,
      description,
      budgetRange,
      budgetCurrency,
      desiredTimeframe,
      additionalFeatures,
    } = parsedData.data;

    // Check authenticated user
    let authenticatedUserId: string | null = null;
    try {
      const supabase = createServerSupabaseClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        authenticatedUserId = session.user.id;
      }
    } catch {
      // Offline fallback
    }

    if (body.userId && !authenticatedUserId) {
      authenticatedUserId = body.userId;
    }

    const attachments: InquiryAttachment[] = (body.attachments || []).map(
      (att: Partial<InquiryAttachment>) => ({
        id: crypto.randomUUID(),
        inquiry_id: '',
        file_name: att.file_name || 'attachment',
        file_path: att.file_path || '',
        file_type: att.file_type || 'application/octet-stream',
        file_size: att.file_size || 0,
        is_voice_recording: Boolean(att.is_voice_recording),
        created_at: new Date().toISOString(),
      })
    );

    const requestId = generateRequestId();
    const nowIso = new Date().toISOString();

    const inquiry: ProjectInquiry = {
      id: requestId,
      user_id: authenticatedUserId || undefined,
      full_name: fullName,
      phone,
      email,
      category_id: categoryId,
      category_name: body.categoryName || undefined,
      execution_mode: executionMode,
      selected_project_id: selectedProjectId,
      selected_project_title: selectedProjectTitle,
      project_title: projectTitle,
      description,
      budget_range: budgetRange,
      budget_currency: budgetCurrency,
      desired_timeframe: desiredTimeframe,
      additional_features: additionalFeatures,
      status: 'new',
      notification_status: 'pending',
      created_at: nowIso,
      updated_at: nowIso,
      attachments,
    };

    // 1. Save to Database FIRST before attempting email notification
    const adminClient = getAdminClient();
    if (adminClient) {
      const { error: dbError } = await adminClient.from('project_inquiries').insert({
        id: inquiry.id,
        user_id: inquiry.user_id || null,
        full_name: inquiry.full_name,
        phone: inquiry.phone,
        email: inquiry.email,
        category_id: inquiry.category_id || null,
        category_name: inquiry.category_name || null,
        execution_mode: inquiry.execution_mode,
        selected_project_id: inquiry.selected_project_id || null,
        selected_project_title: inquiry.selected_project_title || null,
        project_title: inquiry.project_title || null,
        description: inquiry.description,
        budget_range: inquiry.budget_range || null,
        budget_currency: inquiry.budget_currency || 'EGP',
        desired_timeframe: inquiry.desired_timeframe || null,
        additional_features: inquiry.additional_features || null,
        status: 'new',
        notification_status: 'pending',
        created_at: nowIso,
        updated_at: nowIso,
      });

      if (dbError) {
        console.error('[Inquiry API] DB Insert Error:', dbError);
        return NextResponse.json(
          { error: 'تعذر حفظ طلب المشروع في قاعدة البيانات. يرجى المحاولة مرة أخرى.' },
          { status: 500 }
        );
      }

      // Save attachments if any
      if (attachments.length > 0) {
        const attachmentRows = attachments.map((att) => ({
          inquiry_id: requestId,
          file_name: att.file_name,
          file_path: att.file_path,
          file_type: att.file_type,
          file_size: att.file_size,
          is_voice_recording: att.is_voice_recording,
          created_at: nowIso,
        }));

        await adminClient.from('inquiry_attachments').insert(attachmentRows);
      }
    } else {
      console.warn('[Inquiry API] Supabase client not connected. Operating in standalone demo mode.');
    }

    // 2. Dispatch Email Notification (asynchronously logs results to DB)
    const emailResult = await sendInquiryNotificationEmail(inquiry);
    console.info(`[Inquiry API] Email dispatch status for ${requestId}:`, emailResult.success);

    // 3. Return client confirmation
    return NextResponse.json({
      success: true,
      requestId,
      message: `تم استلام طلبك بنجاح. رقم الطلب: ${requestId}. هنراجع التفاصيل ونتواصل معاك على بيانات التواصل المسجلة.`,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Inquiry API] Unexpected Error:', errorMsg);
    return NextResponse.json(
      { error: 'حدث خطأ في معالجة طلبك، يرجى إعادة المحاولة.' },
      { status: 500 }
    );
  }
}
