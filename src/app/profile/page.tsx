'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { useAuth } from '@/context/AuthContext';
import { profileUpdateSchema } from '@/lib/validations/auth';
import { User, Phone, Mail, CheckCircle2, AlertCircle, Save, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, refreshProfile, isLoading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth?returnUrl=/profile');
    }
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
    }
  }, [user, profile, isLoading, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const validation = profileUpdateSchema.safeParse({ fullName, phone });
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || 'بيانات غير صالحة');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'تعذر تحديث البيانات');
      }

      await refreshProfile();
      setSuccessMessage('تم تحديث بياناتك الشخصية بنجاح!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء الحفظ';
      setErrorMessage(msg);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-brand-dark-bg flex items-center justify-center text-sm text-brand-muted dark:text-brand-dark-muted">
        جاري تحميل الملف الشخصي...
      </div>
    );
  }

  return (
    <>
      <MainHeader />
      <main className="flex-1 py-12 bg-brand-bg dark:bg-brand-dark-bg transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary uppercase tracking-wider bg-brand-subtle dark:bg-brand-dark-surface px-3 py-1 rounded-full border border-transparent dark:border-brand-dark-border">
              إعدادات الحساب
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text dark:text-brand-dark-text mt-3">
              الملف الشخصي وبيانات التواصل
            </h1>
            <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
              تُستخدم هذه البيانات للتواصل معك بخصوص طلبات المشاريع المنفذة والنماذج التي تناقشها معنا.
            </p>
          </div>

          <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-10 shadow-xs space-y-6">
            {successMessage && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600 dark:text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  البريد الإلكتروني (المعتمد لتسجيل الدخول)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    dir="ltr"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-brand-dark-bg/60 border border-brand-border dark:border-brand-dark-border text-sm text-slate-500 dark:text-brand-dark-muted cursor-not-allowed text-right"
                  />
                  <Mail className="w-4 h-4 text-slate-400 dark:text-brand-dark-muted absolute right-3.5 top-3" />
                </div>
                <p className="text-[11px] text-brand-muted dark:text-brand-dark-muted mt-1">
                  البريد الإلكتروني مرتبط بحسابك الأمني ولا يمكن تغييره مباشرة من هذه الصفحة.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={saving}
                    placeholder="اسمك الكامل"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface text-sm text-brand-text dark:text-brand-dark-text placeholder:text-brand-muted/50 dark:placeholder:text-brand-dark-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 dark:text-brand-dark-muted absolute right-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  رقم الهاتف / واتساب <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={saving}
                    placeholder="+20 100 000 0000"
                    dir="ltr"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface text-sm text-brand-text dark:text-brand-dark-text placeholder:text-brand-muted/50 dark:placeholder:text-brand-dark-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                    required
                  />
                  <Phone className="w-4 h-4 text-slate-400 dark:text-brand-dark-muted absolute right-3.5 top-3" />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-brand-border/70 dark:border-brand-dark-border">
                <div className="flex items-center gap-1.5 text-xs text-brand-muted dark:text-brand-dark-muted">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>بياناتك محمية ومشفرة بأعلى معايير الأمان</span>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold disabled:opacity-50 transition-all shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
