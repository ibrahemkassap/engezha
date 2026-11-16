import { describe, it, expect, vi } from 'vitest';
import { generateInquiryEmailHtml, generateInquiryEmailText } from '@/lib/email/templates';
import { sendInquiryNotificationEmail } from '@/lib/email/mailer';
import { ProjectInquiry } from '@/types';

describe('Email Templates and Security Escaping', () => {
  const sampleInquiry: ProjectInquiry = {
    id: 'ENG-2026-TEST',
    full_name: 'عميل تجريبي <script>alert("xss")</script>',
    phone: '+201099887766',
    email: 'client@example.com',
    execution_mode: 'custom_project',
    description: 'أريد نظام إدارة متكامل & سريع',
    status: 'new',
    notification_status: 'pending',
    created_at: '2026-03-01T12:00:00Z',
    updated_at: '2026-03-01T12:00:00Z',
    attachments: [
      {
        id: 'att-1',
        inquiry_id: 'ENG-2026-TEST',
        file_name: 'brief.pdf',
        file_path: 'uploads/brief.pdf',
        file_type: 'application/pdf',
        file_size: 1024 * 200,
        is_voice_recording: false,
        created_at: '2026-03-01T12:00:00Z',
      },
    ],
  };

  it('escapes dangerous HTML characters to prevent email injection attacks', () => {
    const html = generateInquiryEmailHtml(
      sampleInquiry,
      'http://localhost:3000/admin/inquiries/ENG-2026-TEST'
    );

    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('ENG-2026-TEST');
    expect(html).toContain('client@example.com');
  });

  it('generates a clean plain text email equivalent', () => {
    const text = generateInquiryEmailText(
      sampleInquiry,
      'http://localhost:3000/admin/inquiries/ENG-2026-TEST'
    );

    expect(text).toContain('ENG-2026-TEST');
    expect(text).toContain('brief.pdf');
    expect(text).toContain('client@example.com');
  });

  it('gracefully handles missing SMTP credentials without crashing inquiry flow', async () => {
    // With dummy credentials in test environment
    const result = await sendInquiryNotificationEmail(sampleInquiry);
    // Should return false with honest error message, not throw an unhandled error
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
