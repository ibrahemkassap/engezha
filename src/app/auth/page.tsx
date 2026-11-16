'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { createClient } from '@/lib/supabase/client';
import { loginSchema, registerSchema } from '@/lib/validations/auth';
import { sanitizeRedirectUrl } from '@/lib/url-helpers';
import {
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const returnUrl = searchParams.get('returnUrl') || searchParams.get('redirect') || '/projects';
  const selectedProject = searchParams.get('project');
  const projectMode = searchParams.get('projectMode');

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const calculateRedirect = () => {
    let dest = sanitizeRedirectUrl(returnUrl, '/projects');
    const params = new URLSearchParams();
    if (selectedProject) params.set('project', selectedProject);
    if (projectMode) params.set('mode', projectMode);
    const paramStr = params.toString();
    if (paramStr) {
      dest = dest.includes('?') ? `${dest}&${paramStr}` : `${dest}?${paramStr}`;
    }
    return dest;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessNotice(null);

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || 'بيانات غير صالحة');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(
          error.message.includes('Invalid login')
            ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.'
            : error.message
        );
      }

      // Check if profile is complete
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (!profile || !profile.full_name || !profile.phone) {
        const dest = calculateRedirect();
        router.push(`/complete-profile?returnUrl=${encodeURIComponent(dest)}`);
        return;
      }

      const dest = calculateRedirect();
      router.push(dest);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر تسجيل الدخول';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessNotice(null);

    const validation = registerSchema.safeParse({
      fullName,
      email,
      phone,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || 'بيانات غير صالحة');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Persist to profiles table explicitly as well
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name: fullName,
          phone: phone,
          email: email,
          updated_at: new Date().toISOString(),
        });
      }

      // Check if email confirmation is required by Supabase project
      if (data.session) {
        const dest = calculateRedirect();
        router.push(dest);
        router.refresh();
      } else {
        setSuccessNotice(
          'تم إنشاء حسابك بنجاح! تم إرسال رابط تأكيد إلى بريدك الإلكتروني لتفعيل الدخول.'
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر إتمام التسجيل';
      setErrorMessage(
        msg.includes('already registered')
          ? 'هذا البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول.'
          : msg
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative z-10">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BrandLogo variant="light" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-purple-300 text-xs font-bold border border-purple-500/20 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            <span>بوابة حساب العميل</span>
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            {activeTab === 'login' ? 'مرحبًا بك مجددًا' : 'ابدأ حسابك الجديد في انجزها'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            سجل دخولك لتتمكن من اختيار النماذج وبدء مناقشة مشروعك ومتابعة طلباتك
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex rounded-xl bg-slate-900/90 p-1 border border-slate-700 mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'login'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'register'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            إنشاء حساب جديد
          </button>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successNotice && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>{successNotice}</span>
          </div>
        )}

        {activeTab === 'login' ? (
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
                  placeholder="name@example.com"
                  dir="ltr"
                  disabled={loading}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
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
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  disabled={loading}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                  required
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3 text-slate-500 hover:text-slate-300"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-brand-primary text-white text-sm font-bold hover:bg-brand-primaryHover disabled:opacity-50 transition-all shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span>جاري تسجيل الدخول...</span>
              ) : (
                <>
                  <span>دخول إلى حسابي</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                الاسم بالكامل
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="محمد أحمد"
                  disabled={loading}
                  className="w-full pl-3.5 pr-10 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  required
                />
                <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  dir="ltr"
                  disabled={loading}
                  className="w-full pl-3.5 pr-10 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                  required
                />
                <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                رقم الهاتف / واتساب
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 100 000 0000"
                  dir="ltr"
                  disabled={loading}
                  className="w-full pl-3.5 pr-10 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                  required
                />
                <Phone className="w-4 h-4 text-slate-500 absolute right-3.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  disabled={loading}
                  className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                  required
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-2.5 text-slate-500 hover:text-slate-300"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  disabled={loading}
                  className="w-full pl-3.5 pr-10 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                  required
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-brand-primary text-white text-sm font-bold hover:bg-brand-primaryHover disabled:opacity-50 transition-all shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span>جاري إنشاء الحساب...</span>
              ) : (
                <>
                  <span>إنشاء الحساب ومتابعة المشروع</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-slate-700/80 text-center">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← العودة للصفحة الرئيسية للمنصة
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-sm">جاري التحميل...</div>}>
      <AuthContent />
    </Suspense>
  );
}
