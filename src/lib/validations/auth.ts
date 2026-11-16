import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
  password: z
    .string()
    .min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' }),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, { message: 'الاسم الكامل يجب أن يتكون من 3 أحرف على الأقل' })
      .max(100, { message: 'الاسم طويل جداً' }),
    email: z
      .string()
      .trim()
      .email({ message: 'يرجى إدخال بريد إلكتروني صحيح' })
      .max(255, { message: 'البريد الإلكتروني طويل جداً' }),
    phone: z
      .string()
      .trim()
      .min(7, { message: 'يرجى إدخال رقم هاتف / واتساب صحيح' })
      .max(25, { message: 'رقم الهاتف غير صحيح' })
      .regex(/^[+0-9\s-()]+$/, { message: 'صيغة رقم الهاتف غير صالحة' }),
    password: z
      .string()
      .min(6, { message: 'كلمة المرور يجب ألا تقل عن 6 أحرف' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'يرجى تأكيد كلمة المرور' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  });

export const profileUpdateSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: 'الاسم الكامل يجب أن يتكون من 3 أحرف على الأقل' })
    .max(100, { message: 'الاسم طويل جداً' }),
  phone: z
    .string()
    .trim()
    .min(7, { message: 'يرجى إدخال رقم هاتف / واتساب صحيح' })
    .max(25, { message: 'رقم الهاتف غير صحيح' })
    .regex(/^[+0-9\s-()]+$/, { message: 'صيغة رقم الهاتف غير صالحة' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
