import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a unique, professional inquiry request ID:
 * Format: ENG-2026-XXXX (4 random alphanumeric characters)
 */
export function generateRequestId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ENG-2026-${randomPart}`;
}

/**
 * Format date in Arabic locale
 */
export function formatArabicDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Format bytes to readable size
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 بايت';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export interface InquiryWhatsAppParams {
  requestId: string;
  fullName: string;
  phone: string;
  email: string;
  executionMode: 'existing_project' | 'custom_project';
  selectedProjectTitle?: string;
  categoryName?: string;
  description: string;
  budgetRange?: string;
  desiredTimeframe?: string;
  attachmentsCount?: number;
  hasVoice?: boolean;
}

/**
 * Builds an organized, formatted WhatsApp chat URL for client inquiries
 * Target WhatsApp phone: 01017358087 (International format: 201017358087)
 */
export function buildInquiryWhatsAppUrl(params: InquiryWhatsAppParams): string {
  const WHATSAPP_PHONE = '201017358087';

  const modeText =
    params.executionMode === 'existing_project'
      ? `تنفيذ نموذج مشابه لـ (${params.selectedProjectTitle || 'مشروع معروض'})`
      : 'تصميم وتنفيذ مخصص من الصفر';

  const lines = [
    `*مرحباً فريق أنجزها 🚀*`,
    `أرغب في بدء ومناقشة مشروع جديد عبر المنصة، وهذه تفاصيل طلبي:`,
    ``,
    `🔖 *كود المتابعة المخصص:* \`${params.requestId}\``,
    `────────────────────`,
    `👤 *الاسم:* ${params.fullName}`,
    `📱 *رقم الهاتف:* ${params.phone}`,
    `✉️ *البريد الإلكتروني:* ${params.email}`,
    ``,
    `🎯 *نوع الطلب:* ${modeText}`,
  ];

  if (params.categoryName) {
    lines.push(`🏷️ *التصنيف:* ${params.categoryName}`);
  }

  if (params.budgetRange) {
    lines.push(`💰 *الميزانية التقريبية:* ${params.budgetRange}`);
  }

  if (params.desiredTimeframe) {
    lines.push(`⏱️ *المدة المتوقعة:* ${params.desiredTimeframe}`);
  }

  lines.push(
    ``,
    `📝 *تفاصيل ومتطلبات الفكرة:*`,
    params.description,
    ``,
    `📎 *المرفقات:* ${
      (params.attachmentsCount || 0) > 0 || params.hasVoice
        ? `${params.attachmentsCount || 0} ملف(ات)${params.hasVoice ? ' + تسجيل صوتي 🎙️' : ''}`
        : 'لا يوجد'
    }`,
    `────────────────────`,
    `🌐 *مرسل عبر:* منصة أنجزها (engezha.vercel.app)`
  );

  const message = lines.join('\n');
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

