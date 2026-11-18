import { z } from 'zod';

export const inquirySchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'يرجى كتابة الاسم الكامل (3 أحرف على الأقل)' })
    .max(100, { message: 'الاسم طويل جدًا' }),
  phone: z
    .string()
    .min(7, { message: 'يرجى كتابة رقم هاتف / واتساب صحيح' })
    .max(25, { message: 'رقم الهاتف غير صحيح' })
    .regex(/^[+0-9\s-()]+$/, { message: 'صيغة رقم الهاتف غير صالحة' }),
  email: z
    .string()
    .email({ message: 'يرجى كتابة بريد إلكتروني صحيح' })
    .max(255, { message: 'البريد الإلكتروني طويل جدًا' }),
  executionMode: z.enum(['existing_project', 'custom_project'], {
    message: 'يرجى اختيار طريقة التنفيذ',
  }),
  projectType: z.string().optional(),
  businessName: z.string().max(150).optional(),
  industry: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  preferredLanguage: z.string().optional(),
  categoryId: z.string().optional(),
  selectedProjectId: z.string().optional(),
  selectedProjectTitle: z.string().optional(),
  projectTitle: z.string().max(200, { message: 'اسم المشروع طويل جداً' }).optional(),
  targetAudience: z.string().max(500).optional(),
  description: z
    .string()
    .min(10, { message: 'يرجى كتابة وصف لفكرتك أو مشروعك (10 أحرف على الأقل)' })
    .max(3000, { message: 'الوصف يتجاوز الحد الأقصى المسموح (3000 حرف)' }),
  referenceWebsites: z.string().max(1000).optional(),
  desiredIntegrations: z.string().max(1000).optional(),
  budgetRange: z.string().optional(),
  budgetCurrency: z.enum(['EGP', 'USD', 'SAR']).default('EGP'),
  desiredTimeframe: z.string().optional(),
  priorityLevel: z.enum(['normal', 'urgent', 'flexible']).default('normal'),
  preferredContactMethod: z.enum(['whatsapp', 'phone', 'email']).default('whatsapp'),
  additionalFeatures: z.string().max(2000).optional(),
  consent: z.literal(true, {
    message: 'يجب الموافقة على سياسة الخصوصية للمتابعة',
  }),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
