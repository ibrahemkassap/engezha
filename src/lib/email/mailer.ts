import nodemailer from 'nodemailer';
import { ProjectInquiry } from '@/types';
import { generateInquiryEmailHtml, generateInquiryEmailText } from './templates';
import { getAdminClient } from '../supabase/admin';

export function isSmtpConfigured(): boolean {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  return Boolean(
    host &&
    user &&
    pass &&
    !host.includes('dummy') &&
    !user.includes('dummy') &&
    pass !== 'dummy-app-password'
  );
}

export async function sendInquiryNotificationEmail(
  inquiry: ProjectInquiry
): Promise<{ success: boolean; error?: string }> {
  const recipient =
    process.env.NOTIFICATION_EMAIL_RECIPIENT || 'ibrahem.kassap@gmail.com';
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const adminDashboardUrl = `${baseUrl}/admin/inquiries/${inquiry.id}`;

  if (!isSmtpConfigured()) {
    const errorMsg =
      'SMTP credentials are not configured or are set to placeholder values. Notification not dispatched.';
    console.warn(`[Mailer] ${errorMsg}`);
    
    // Log to notification_logs if DB is available
    await logNotificationResult(inquiry.id, recipient, false, errorMsg);
    return { success: false, error: errorMsg };
  }

  try {
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlContent = generateInquiryEmailHtml(inquiry, adminDashboardUrl);
    const textContent = generateInquiryEmailText(inquiry, adminDashboardUrl);

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"منصة انجزها" <${recipient}>`,
      to: recipient,
      subject: `طلب مشروع جديد | انجزها | ${inquiry.id}`,
      text: textContent,
      html: htmlContent,
    });

    console.info(`[Mailer] Successfully sent inquiry notification for ${inquiry.id} to ${recipient}`);
    await logNotificationResult(inquiry.id, recipient, true);
    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown SMTP error';
    console.error(`[Mailer] Error sending email for ${inquiry.id}:`, errorMessage);
    await logNotificationResult(inquiry.id, recipient, false, errorMessage);
    return { success: false, error: errorMessage };
  }
}

async function logNotificationResult(
  inquiryId: string,
  recipient: string,
  success: boolean,
  errorMessage?: string
) {
  try {
    const adminClient = getAdminClient();
    if (!adminClient) return;

    await adminClient.from('notification_logs').insert({
      inquiry_id: inquiryId,
      recipient,
      status: success ? 'sent' : 'failed',
      error_message: errorMessage || null,
    });

    await adminClient
      .from('project_inquiries')
      .update({
        notification_status: success ? 'sent' : 'failed',
        notification_error: errorMessage || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', inquiryId);
  } catch (dbErr) {
    console.error('[Mailer] Could not persist notification log:', dbErr);
  }
}
