import { ProjectInquiry } from '@/types';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function generateInquiryEmailHtml(
  inquiry: ProjectInquiry,
  adminDashboardUrl: string
): string {
  const safeName = escapeHtml(inquiry.full_name);
  const safePhone = escapeHtml(inquiry.phone);
  const safeEmail = escapeHtml(inquiry.email);
  const safeDesc = escapeHtml(inquiry.description).replace(/\n/g, '<br/>');
  const safeCategory = escapeHtml(inquiry.category_name || 'غير محدد');
  const safeBudget = escapeHtml(inquiry.budget_range || 'غير محدد');
  const safeTimeframe = escapeHtml(inquiry.desired_timeframe || 'غير محدد');
  const safeMode =
    inquiry.execution_mode === 'existing_project'
      ? `مشروع مشابه (${escapeHtml(inquiry.selected_project_title || 'مشروع محدد')})`
      : 'تصميم مخصص من الصفر';

  const attachmentsList = inquiry.attachments && inquiry.attachments.length > 0
    ? inquiry.attachments
        .map(
          (att) => `
            <li style="margin-bottom: 6px;">
              <strong>${escapeHtml(att.file_name)}</strong> 
              ${att.is_voice_recording ? '<span style="color:#4F46E5;">[تسجيل صوتي]</span>' : ''} 
              (${Math.round(att.file_size / 1024)} كيلوبايت)
            </li>`
        )
        .join('')
    : '<li>لا توجد مرفقات</li>';

  return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8">
  <title>طلب مشروع جديد - انجزها</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 24px; color: #101828;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E4E7EC; overflow: hidden;">
    <!-- Header -->
    <tr>
      <td style="background-color: #17182F; padding: 24px 32px; text-align: right;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">انجزها | ENGEZHA</h1>
        <p style="color: #94A3B8; margin: 6px 0 0 0; font-size: 14px;">إشعار استلام طلب مشروع رقم: <span style="color: #F5A623; font-weight: bold;">${inquiry.id}</span></p>
      </td>
    </tr>

    <!-- Body content -->
    <tr>
      <td style="padding: 32px; text-align: right; line-height: 1.6;">
        <h2 style="font-size: 18px; color: #101828; margin-top: 0; border-bottom: 2px solid #EEF2FF; padding-bottom: 10px;">بيانات العميل والتواصل</h2>
        <table width="100%" cellpadding="6" style="margin-bottom: 20px;">
          <tr>
            <td width="35%" style="color: #667085; font-weight: 600;">الاسم الكامل:</td>
            <td style="color: #101828; font-weight: 700;">${safeName}</td>
          </tr>
          <tr>
            <td style="color: #667085; font-weight: 600;">رقم الهاتف / واتساب:</td>
            <td style="color: #101828; direction: ltr; text-align: right;">
              <a href="tel:${safePhone}" style="color: #4F46E5; text-decoration: none;">${safePhone}</a>
            </td>
          </tr>
          <tr>
            <td style="color: #667085; font-weight: 600;">البريد الإلكتروني:</td>
            <td style="color: #101828; direction: ltr; text-align: right;">
              <a href="mailto:${safeEmail}" style="color: #4F46E5; text-decoration: none;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="color: #667085; font-weight: 600;">نوع / تصنيف العمل:</td>
            <td style="color: #101828;">${safeCategory}</td>
          </tr>
          <tr>
            <td style="color: #667085; font-weight: 600;">طريقة التنفيذ:</td>
            <td style="color: #101828;">${safeMode}</td>
          </tr>
          <tr>
            <td style="color: #667085; font-weight: 600;">الميزانية التقديرية:</td>
            <td style="color: #101828;">${safeBudget}</td>
          </tr>
          <tr>
            <td style="color: #667085; font-weight: 600;">المدة المطلوبة:</td>
            <td style="color: #101828;">${safeTimeframe}</td>
          </tr>
          <tr>
            <td style="color: #667085; font-weight: 600;">تاريخ الطلب:</td>
            <td style="color: #101828;">${new Date(inquiry.created_at).toLocaleString('ar-EG')}</td>
          </tr>
        </table>

        <h2 style="font-size: 18px; color: #101828; border-bottom: 2px solid #EEF2FF; padding-bottom: 10px;">شرح فكرة المشروع</h2>
        <div style="background-color: #F8FAFC; border: 1px solid #E4E7EC; padding: 16px; border-radius: 8px; color: #101828; margin-bottom: 24px;">
          ${safeDesc}
        </div>

        <h2 style="font-size: 18px; color: #101828; border-bottom: 2px solid #EEF2FF; padding-bottom: 10px;">الملفات والمرفقات والتسجيلات</h2>
        <ul style="padding-right: 20px; color: #334155; margin-bottom: 30px;">
          ${attachmentsList}
        </ul>

        <!-- Action CTA -->
        <div style="text-align: center; margin: 30px 0 10px 0;">
          <a href="${adminDashboardUrl}" style="background-color: #4F46E5; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; display: inline-block;">
            فتح تفاصيل الطلب في لوحة التحكم &larr;
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #F8FAFC; padding: 20px 32px; text-align: center; border-top: 1px solid #E4E7EC; font-size: 12px; color: #667085;">
        تم إرسال هذا الإشعار تلقائيًا من نظام طلبات منصة <strong>انجزها</strong>.
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function generateInquiryEmailText(
  inquiry: ProjectInquiry,
  adminDashboardUrl: string
): string {
  return `
طلب مشروع جديد | منصة انجزها
رقم الطلب: ${inquiry.id}
تاريخ الطلب: ${inquiry.created_at}

بيانات العميل:
- الاسم: ${inquiry.full_name}
- الهاتف / واتساب: ${inquiry.phone}
- البريد: ${inquiry.email}
- نوع العمل: ${inquiry.category_name || 'غير محدد'}
- نمط التنفيذ: ${inquiry.execution_mode} (${inquiry.selected_project_title || ''})
- الميزانية التقديرية: ${inquiry.budget_range || 'غير محدد'}
- المدة المستهدفة: ${inquiry.desired_timeframe || 'غير محدد'}

وصف المشروع:
${inquiry.description}

المرفقات:
${inquiry.attachments?.map((a) => `- ${a.file_name} (${a.is_voice_recording ? 'تسجيل صوتي' : 'ملف'})`).join('\n') || 'لا توجد مرفقات'}

رابط مراجعة الطلب في لوحة التحكم:
${adminDashboardUrl}
  `.trim();
}
