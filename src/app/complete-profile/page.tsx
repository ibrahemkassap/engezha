'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { useAuth } from '@/context/AuthContext';
import { profileUpdateSchema } from '@/lib/validations/auth';
import { sanitizeRedirectUrl } from '@/lib/url-helpers';
import { User, Phone, AlertCircle, ArrowLeft } from 'lucide-react';

function CompleteProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/projects';

  const { user, profile, refreshProfile, isLoading } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/auth?returnUrl=${encodeURIComponent(returnUrl)}`);
    }
    if (profile) {
      if (profile.full_name) setFullName(profile.full_name);
      if (profile.phone) setPhone(profile.phone);
    }
  }, [user, profile, isLoading, router, returnUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = profileUpdateSchema.safeParse({ fullName, phone });
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || 'بيانات غير صالحة');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'تعذر استكمال الملف الشخصي');
      }

      await refreshProfile();
      const dest = sanitizeRedirectUrl(returnUrl, '/projects');
      router.push(dest);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">
        جاري التحقق من الحساب...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative z-10">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BrandLogo variant="light" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            استكمال بيانات حسابك
          </h1>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            يرجى تأكيد اسمك ورقم التواصل لنتمكن من متابعة ومناقشة مشروعك معك مباشرة
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              الاسم بالكامل <span className="text-indigo-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="أحمد محمود"
                disabled={submitting}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                required
              />
              <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              رقم الهاتف / واتساب <span className="text-indigo-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+20 100 000 0000"
                dir="ltr"
                disabled={submitting}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                required
              />
              <Phone className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 rounded-xl bg-brand-primary text-white text-sm font-bold hover:bg-brand-primaryHover disabled:opacity-50 transition-all shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 mt-4"
          >
            {submitting ? (
              <span>جاري الحفظ...</span>
            ) : (
              <>
                <span>حفظ البيانات والاستمرار</span>
                <ArrowLeft className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CompleteProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">جاري التحميل...</div>}>
      <CompleteProfileContent />
    </Suspense>
  );
}
