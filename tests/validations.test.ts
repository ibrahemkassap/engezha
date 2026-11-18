import { describe, it, expect } from 'vitest';
import { inquirySchema } from '@/lib/validations/inquiry';
import { reviewSchema } from '@/lib/validations/review';
import { validateUploadFile, MAX_FILE_SIZE } from '@/lib/validations/upload';

describe('Inquiry Validation Schema', () => {
  it('validates a correct inquiry submission', () => {
    const validData = {
      fullName: 'أحمد محمود',
      phone: '+201012345678',
      email: 'ahmed@example.com',
      executionMode: 'custom_project',
      description: 'أريد بناء منصة تعليمية وتدريب تفاعلية للطلاب.',
      consent: true,
    };

    const result = inquirySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects an inquiry without consent', () => {
    const invalidData = {
      fullName: 'أحمد محمود',
      phone: '+201012345678',
      email: 'ahmed@example.com',
      executionMode: 'custom_project',
      description: 'أريد بناء تطبيق متكامل.',
      consent: false,
    };

    const result = inquirySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email format', () => {
    const invalidData = {
      fullName: 'أحمد محمود',
      phone: '+201012345678',
      email: 'invalid-email-address',
      executionMode: 'custom_project',
      description: 'أريد بناء تطبيق متكامل.',
      consent: true,
    };

    const result = inquirySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('rejects an excessively short description (< 10 chars)', () => {
    const invalidData = {
      fullName: 'أحمد محمود',
      phone: '+201012345678',
      email: 'ahmed@example.com',
      executionMode: 'custom_project',
      description: 'قصير',
      consent: true,
    };

    const result = inquirySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('validates a complete 7-step wizard submission with currencies and priority', () => {
    const fullWizardData = {
      fullName: 'م. إبراهيم كساب',
      phone: '+201017358087',
      email: 'ibrahem@engezha.com',
      executionMode: 'custom_project',
      projectType: 'متجر إلكتروني متكامل',
      businessName: 'براند أزياء مودرن',
      industry: 'تجارة وتجزئة',
      country: 'مصر',
      preferredLanguage: 'عربي وإنجليزي',
      description: 'أريد بناء متجر إلكتروني متكامل ببوابات دفع وسلة سريعة.',
      budgetRange: '25,000 - 40,000 ج.م',
      budgetCurrency: 'EGP',
      desiredTimeframe: 'خلال 2 إلى 4 أسابيع',
      priorityLevel: 'urgent',
      preferredContactMethod: 'whatsapp',
      consent: true,
    };

    const result = inquirySchema.safeParse(fullWizardData);
    expect(result.success).toBe(true);
  });

  it('validates currency choices including SAR and USD', () => {
    const baseData = {
      fullName: 'سالم الكعبي',
      phone: '+966501234567',
      email: 'salem@example.sa',
      executionMode: 'custom_project',
      description: 'منصة استشارات وحجوزات طبية متقدمة.',
      consent: true,
    };

    expect(inquirySchema.safeParse({ ...baseData, budgetCurrency: 'SAR' }).success).toBe(true);
    expect(inquirySchema.safeParse({ ...baseData, budgetCurrency: 'USD' }).success).toBe(true);
    expect(inquirySchema.safeParse({ ...baseData, budgetCurrency: 'EUR' }).success).toBe(false);
  });
});

describe('Review Validation Schema', () => {
  it('validates a valid 5-star review', () => {
    const validReview = {
      projectId: 'proj-123',
      displayName: 'سامي خالد',
      rating: 5,
      comment: 'تصميم رائع جداً وأداء سريع وممتاز.',
    };

    const result = reviewSchema.safeParse(validReview);
    expect(result.success).toBe(true);
  });

  it('rejects ratings below 1 or above 5', () => {
    expect(
      reviewSchema.safeParse({
        projectId: 'proj-123',
        displayName: 'سامي',
        rating: 0,
        comment: 'تعليق جيد',
      }).success
    ).toBe(false);

    expect(
      reviewSchema.safeParse({
        projectId: 'proj-123',
        displayName: 'سامي',
        rating: 6,
        comment: 'تعليق ممتاز',
      }).success
    ).toBe(false);
  });

  it('rejects whitespace-only or empty comments', () => {
    const invalidReview = {
      projectId: 'proj-123',
      displayName: 'سامي',
      rating: 4,
      comment: '    ',
    };

    const result = reviewSchema.safeParse(invalidReview);
    expect(result.success).toBe(false);
  });
});

describe('File Upload Safety Validation', () => {
  it('accepts safe files like PNG and PDF within size limit', () => {
    const safeFile = {
      name: 'wireframe.png',
      size: 1024 * 500, // 500 KB
      type: 'image/png',
    };

    const result = validateUploadFile(safeFile);
    expect(result.isValid).toBe(true);
  });

  it('rejects dangerous executable files (.exe, .bat, .sh)', () => {
    const dangerousFile = {
      name: 'malware.exe',
      size: 1024 * 50,
      type: 'application/octet-stream',
    };

    const result = validateUploadFile(dangerousFile);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('غير مسموح به لأسباب أمنية');
  });

  it('rejects files exceeding maximum allowed size', () => {
    const hugeFile = {
      name: 'heavy-dataset.zip',
      size: MAX_FILE_SIZE + 1024,
      type: 'application/zip',
    };

    const result = validateUploadFile(hugeFile);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('حجم الملف يتجاوز الحد الأقصى');
  });
});
