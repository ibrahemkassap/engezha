import { z } from 'zod';

export const reviewSchema = z.object({
  projectId: z.string().min(1, { message: 'معرف المشروع مطلوب' }),
  displayName: z
    .string()
    .trim()
    .min(2, { message: 'يرجى كتابة اسمك (حرفين على الأقل)' })
    .max(80, { message: 'الاسم طويل جدًا' }),
  rating: z
    .number()
    .int()
    .min(1, { message: 'أقل تقييم هو نجمة واحدة' })
    .max(5, { message: 'أقصى تقييم هو 5 نجوم' }),
  comment: z
    .string()
    .trim()
    .min(4, { message: 'يرجى كتابة تعليق مفيد (4 أحرف على الأقل)' })
    .max(1500, { message: 'التعليق يتجاوز الحد المسموح (1500 حرف)' }),
  userId: z.string().optional(),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
