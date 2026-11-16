'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || 'بيانات الدخول غير صحيحة.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر تسجيل الدخول';
      setErrorMessage(
        msg.includes('Invalid login')
          ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.'
          : msg
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BrandLogo variant="light" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>بوابة الإدارة المركزية</span>
          </div>
          <h1 className="text-xl font-bold text-white">تسجيل دخول المشرفين</h1>
          <p className="text-xs text-slate-400 mt-1">
            أدخل بيانات الحساب المصرح له بإدارة المنصة
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@engezha.com"
                dir="ltr"
                disabled={loading}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                required
              />
              <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                disabled={loading}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                required
              />
              <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-brand-primary text-white text-sm font-bold hover:bg-brand-primaryHover disabled:opacity-50 transition-all shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span>جاري التحقق...</span>
            ) : (
              <>
                <span>دخول إلى لوحة التحكم</span>
                <ArrowLeft className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
