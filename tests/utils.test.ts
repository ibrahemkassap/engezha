import { describe, it, expect } from 'vitest';
import {
  generateRequestId,
  generateDeveloperSubmissionId,
  formatBytes,
  buildInquiryWhatsAppUrl,
  buildDeveloperSubmissionWhatsAppUrl,
} from '@/lib/utils';
import { DEMO_PROJECTS, INITIAL_CATEGORIES } from '@/lib/catalog-config';

describe('Utility Functions', () => {
  it('generates unique request IDs adhering to ENG-2026-XXXX format', () => {
    const id1 = generateRequestId();
    const id2 = generateRequestId();

    expect(id1).toMatch(/^ENG-2026-[A-Z0-9]{4}$/);
    expect(id2).toMatch(/^ENG-2026-[A-Z0-9]{4}$/);
    expect(id1).not.toBe(id2);
  });

  it('generates unique developer submission IDs adhering to DEV-2026-XXXX format', () => {
    const devId1 = generateDeveloperSubmissionId();
    const devId2 = generateDeveloperSubmissionId();

    expect(devId1).toMatch(/^DEV-2026-[A-Z0-9]{4}$/);
    expect(devId2).toMatch(/^DEV-2026-[A-Z0-9]{4}$/);
    expect(devId1).not.toBe(devId2);
  });

  it('formats byte sizes into readable Arabic units', () => {
    expect(formatBytes(0)).toBe('0 بايت');
    expect(formatBytes(1024)).toBe('1 كيلوبايت');
    expect(formatBytes(1024 * 1024 * 5)).toBe('5 ميجابايت');
  });

  it('builds a structured WhatsApp URL with client tracking code and all project details', () => {
    const url = buildInquiryWhatsAppUrl({
      requestId: 'ENG-2026-AB12',
      fullName: 'أحمد محمود',
      phone: '01017358087',
      email: 'ahmed@example.com',
      executionMode: 'custom_project',
      categoryName: 'مواقع الشركات والخدمات',
      description: 'نظام حجوزات فندقية متكامل مع دفع إلكتروني',
      budgetRange: '15,000 - 25,000 ج.م',
      desiredTimeframe: 'خلال أسبوعين',
      attachmentsCount: 2,
      hasVoice: true,
    });

    expect(url).toContain('https://wa.me/201017358087?text=');
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain('ENG-2026-AB12');
    expect(decoded).toContain('أحمد محمود');
    expect(decoded).toContain('01017358087');
    expect(decoded).toContain('ahmed@example.com');
    expect(decoded).toContain('تصميم وتنفيذ مخصص من الصفر');
    expect(decoded).toContain('مواقع الشركات والخدمات');
    expect(decoded).toContain('نظام حجوزات فندقية متكامل');
    expect(decoded).toContain('ملاحظة توضيحية');
    expect(decoded).toContain('منصة أنجزها');
  });

  it('builds a structured developer submission WhatsApp URL with tracking code and monetization options', () => {
    const devUrl = buildDeveloperSubmissionWhatsAppUrl({
      submissionId: 'DEV-2026-XY99',
      developerName: 'إبراهيم كساب',
      phone: '01017358087',
      email: 'dev@example.com',
      portfolioUrl: 'https://github.com/developer',
      projectTitle: 'نظام محاسبة سحابي ومخازن',
      projectCategory: 'أنظمة سحابية ولوحات تحكم',
      techStack: ['Next.js', 'PostgreSQL', 'Tailwind CSS'],
      readinessStatus: 'مكتمل بنسبة 100% وجاهز للتشغيل',
      demoUrl: 'https://pos-demo.vercel.app',
      projectSummary: 'نظام نقاط بيع وطباعة فواتير مع دعم الباركود وتقارير أرباح',
      sellingModel: 'exclusive_buyout',
      expectedPrice: '25,000 ج.م',
    });

    expect(devUrl).toContain('https://wa.me/201017358087?text=');
    const decoded = decodeURIComponent(devUrl);
    expect(decoded).toContain('DEV-2026-XY99');
    expect(decoded).toContain('إبراهيم كساب');
    expect(decoded).toContain('نظام محاسبة سحابي ومخازن');
    expect(decoded).toContain('بيع حصري كامل للكود المصدري');
    expect(decoded).toContain('25,000 ج.م');
    expect(decoded).toContain('حفظ حقوق الملكية الفكرية NDA');
  });
});

describe('Catalog Integrity and Slugs Uniqueness', () => {
  it('has unique category slugs and required 8 categories', () => {
    const slugs = INITIAL_CATEGORIES.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);

    expect(slugs.length).toBe(8);
    expect(uniqueSlugs.size).toBe(8);
  });

  it('has unique project slugs and demo flags strictly preserved', () => {
    const slugs = DEMO_PROJECTS.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);

    expect(slugs.length).toBe(uniqueSlugs.size);
    // All initial demo projects must be marked as demo and have 0 fake reviews
    DEMO_PROJECTS.forEach((p) => {
      expect(p.is_demo).toBe(true);
      expect(p.review_count).toBe(0);
      expect(p.avg_rating).toBeUndefined();
    });
  });
});
