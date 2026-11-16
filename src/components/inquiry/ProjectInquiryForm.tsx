'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project, ProjectCategory } from '@/types';
import { inquirySchema } from '@/lib/validations/inquiry';
import { buildInquiryWhatsAppUrl, generateRequestId } from '@/lib/utils';
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  Compass,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

interface ProjectInquiryFormProps {
  categories: ProjectCategory[];
  projects: Project[];
  initialMode?: 'existing_project' | 'custom_project';
  initialProjectId?: string;
  initialCategoryId?: string;
}

export function ProjectInquiryForm({
  categories,
  projects,
  initialMode = 'custom_project',
  initialProjectId,
  initialCategoryId,
}: ProjectInquiryFormProps) {
  // Form State
  const [executionMode, setExecutionMode] = useState<'existing_project' | 'custom_project'>(
    initialProjectId ? 'existing_project' : initialMode
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId || '');
  const [categoryId, setCategoryId] = useState<string>(initialCategoryId || '');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [desiredTimeframe, setDesiredTimeframe] = useState('');
  const [consent, setConsent] = useState(false);

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    requestId: string;
    message: string;
    whatsappUrl: string;
  } | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Find currently selected project
  const currentProject = projects.find((p) => p.id === selectedProjectId);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const formDataToValidate = {
      fullName,
      phone,
      email,
      executionMode,
      categoryId: categoryId || undefined,
      selectedProjectId: executionMode === 'existing_project' ? selectedProjectId : undefined,
      selectedProjectTitle:
        executionMode === 'existing_project' && currentProject
          ? currentProject.title
          : undefined,
      description,
      budgetRange: budgetRange || undefined,
      desiredTimeframe: desiredTimeframe || undefined,
      consent,
    };

    const validation = inquirySchema.safeParse(formDataToValidate);

    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || 'بيانات غير مكتملة');
      return;
    }

    setIsSubmitting(true);

    try {
      const categoryName = categories.find((c) => c.id === categoryId)?.name;
      const selectedProjectTitle =
        executionMode === 'existing_project' && currentProject
          ? currentProject.title
          : undefined;

      let finalRequestId = '';

      try {
        const res = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formData: validation.data,
            attachments: [],
            categoryName,
          }),
        });

        const data = await res.json();

        if (res.ok && data.requestId) {
          finalRequestId = data.requestId;
        }
      } catch (networkErr) {
        console.warn('API call fallback for offline/client mode:', networkErr);
      }

      // If backend did not supply requestId, generate a valid client tracking code
      if (!finalRequestId) {
        finalRequestId = generateRequestId();
      }

      // Build structured WhatsApp URL with client selections and dedicated tracking code
      const whatsappUrl = buildInquiryWhatsAppUrl({
        requestId: finalRequestId,
        fullName,
        phone,
        email,
        executionMode,
        selectedProjectTitle,
        categoryName,
        description,
        budgetRange: budgetRange || undefined,
        desiredTimeframe: desiredTimeframe || undefined,
      });

      setSuccessData({
        requestId: finalRequestId,
        message: 'تم تسجيل تفاصيل طلبك بنجاح! جاري توجيهك الآن إلى شات واتساب للمتابعة المباشرة مع فريق العمل...',
        whatsappUrl,
      });

      // Automatically redirect client to WhatsApp chat on 01017358087
      if (typeof window !== 'undefined') {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          window.location.href = whatsappUrl;
        } else {
          window.open(whatsappUrl, '_blank');
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ في الاتصال بالخادم';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success view
  if (successData) {
    return (
      <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm transition-colors">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 mb-3">
          تم استلام وتسجيل طلبك بنجاح
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text dark:text-brand-dark-text mb-3">
          شكرًا لثقتك في أنجزها
        </h2>

        <p className="text-sm sm:text-base text-brand-muted dark:text-brand-dark-muted leading-relaxed mb-6">
          {successData.message}
        </p>

        {/* Request ID Display */}
        <div className="bg-brand-bg dark:bg-brand-dark-bg rounded-2xl border border-brand-border dark:border-brand-dark-border p-5 max-w-md mx-auto mb-6">
          <p className="text-xs text-brand-muted dark:text-brand-dark-muted mb-1 font-semibold">
            كود المتابعة المخصص لطلبك:
          </p>
          <div className="flex items-center justify-center gap-3">
            <span
              className="text-xl sm:text-2xl font-mono font-extrabold text-brand-primary dark:text-brand-dark-primary tracking-wider"
              dir="ltr"
            >
              {successData.requestId}
            </span>
            <button
              type="button"
              onClick={() => handleCopyId(successData.requestId)}
              className="p-2 rounded-lg bg-white dark:bg-brand-dark-surface border border-brand-border dark:border-brand-dark-border text-slate-600 dark:text-brand-dark-text hover:text-brand-primary dark:hover:text-brand-dark-primary shadow-xs transition-colors"
              title="نسخ كود الطلب"
            >
              {copiedId ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* WhatsApp Direct Action Button */}
        <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 mb-8 text-center space-y-3">
          <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">
            إذا لم يفتح الواتساب معك تلقائياً، اضغط على الزر أدناه لبدء المحادثة فوراً:
          </p>
          <a
            href={successData.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-base font-bold shadow-md shadow-emerald-900/20 active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>فتح شات واتساب الآن (01017358087)</span>
            <ExternalLink className="w-4 h-4 mr-0.5 opacity-80" />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/projects"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-primary text-white text-sm font-bold hover:bg-brand-primaryHover transition-all"
          >
            استكشف المزيد من الأعمال
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 dark:bg-brand-dark-border text-slate-700 dark:text-brand-dark-text text-sm font-semibold hover:bg-slate-200 dark:hover:bg-brand-dark-border/80 transition-all"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-10 shadow-sm max-w-3xl mx-auto transition-colors">
      {/* Mode Selection Tabs */}
      <div className="mb-8">
        <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-3 uppercase tracking-wider">
          طريقة التنفيذ
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setExecutionMode('existing_project')}
            className={`p-4 rounded-2xl border text-right transition-all flex items-start gap-3.5 ${
              executionMode === 'existing_project'
                ? 'border-brand-primary dark:border-brand-dark-primary bg-brand-subtle/70 dark:bg-brand-dark-border ring-2 ring-brand-primary/20 dark:ring-brand-dark-primary/30'
                : 'border-brand-border dark:border-brand-dark-border hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-brand-dark-surface'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                executionMode === 'existing_project'
                  ? 'bg-brand-primary dark:bg-brand-dark-primary text-white'
                  : 'bg-slate-100 dark:bg-brand-dark-border text-slate-500 dark:text-brand-dark-muted'
              }`}
            >
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-text dark:text-brand-dark-text">
                مشروع مشابه لنموذج موجود
              </h4>
              <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-0.5 leading-relaxed">
                اختار عملًا جاهزًا من أعمالنا لنبني لك موقعًا أو تطبيقًا مشابهًا له.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setExecutionMode('custom_project')}
            className={`p-4 rounded-2xl border text-right transition-all flex items-start gap-3.5 ${
              executionMode === 'custom_project'
                ? 'border-brand-primary dark:border-brand-dark-primary bg-brand-subtle/70 dark:bg-brand-dark-border ring-2 ring-brand-primary/20 dark:ring-brand-dark-primary/30'
                : 'border-brand-border dark:border-brand-dark-border hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-brand-dark-surface'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                executionMode === 'custom_project'
                  ? 'bg-brand-primary dark:bg-brand-dark-primary text-white'
                  : 'bg-slate-100 dark:bg-brand-dark-border text-slate-500 dark:text-brand-dark-muted'
              }`}
            >
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-text dark:text-brand-dark-text">
                تصميم مخصص من الصفر
              </h4>
              <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-0.5 leading-relaxed">
                فكرة جديدة لم تنفذ من قبل، أو احتياجات برمجية مصممة خصيصًا لك.
              </p>
            </div>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* If existing project mode is selected */}
        {executionMode === 'existing_project' && (
          <div className="p-4 rounded-2xl bg-brand-bg dark:bg-brand-dark-bg border border-brand-border dark:border-brand-dark-border space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="selectedProject" className="block text-xs font-bold text-brand-text dark:text-brand-dark-text">
                المشروع المختار لمناقشة السعر والتنفيذ:
              </label>
              {currentProject?.badge && (
                <span
                  className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full text-white shadow-xs"
                  style={{ backgroundColor: currentProject.accent_color || '#5B2C6F' }}
                >
                  {currentProject.badge}
                </span>
              )}
            </div>

            {currentProject && (
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white dark:bg-brand-dark-surface border border-brand-border dark:border-brand-dark-border shadow-xs">
                <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-900 border border-brand-border/60">
                  <Image
                    src={currentProject.cover_image}
                    alt={currentProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-extrabold text-brand-text dark:text-brand-dark-text truncate">
                    {currentProject.title}
                  </h4>
                  <p className="text-xs text-brand-muted dark:text-brand-dark-muted truncate mt-0.5">
                    {currentProject.project_type}
                  </p>
                </div>
              </div>
            )}

            <select
              id="selectedProject"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-surface text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
              required
            >
              <option value="">-- اضغط للاختيار أو التغيير من القائمة --</option>
              {projects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.title} ({proj.project_type})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Category selector */}
        <div>
          <label htmlFor="category" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
            نوع أو تصنيف المشروع
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-brand-bg dark:bg-brand-dark-surface text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <option value="" className="dark:bg-brand-dark-surface">-- اختر التصنيف المناسب (اختياري) --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="dark:bg-brand-dark-surface">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
              الاسم الكامل <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isSubmitting}
              placeholder="مثال: محمد مصطفى"
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-brand-bg dark:bg-brand-dark-surface text-sm text-brand-text dark:text-brand-dark-text placeholder:text-slate-400 dark:placeholder:text-brand-dark-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
              رقم الهاتف / واتساب <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
              placeholder="+20 100 000 0000"
              dir="ltr"
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-brand-bg dark:bg-brand-dark-surface text-sm text-brand-text dark:text-brand-dark-text text-right placeholder:text-slate-400 dark:placeholder:text-brand-dark-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
            البريد الإلكتروني <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            placeholder="name@example.com"
            dir="ltr"
            className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-brand-bg dark:bg-brand-dark-surface text-sm text-brand-text dark:text-brand-dark-text text-right placeholder:text-slate-400 dark:placeholder:text-brand-dark-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            required
          />
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="description" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
            اشرح فكرتك واحتياجاتك <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            placeholder="احكيلنا عن هدف المشروع، الميزات الأساسية المطلوبة، وأي روابط أو أفكار ملهمة لديك..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-brand-bg dark:bg-brand-dark-surface text-sm text-brand-text dark:text-brand-dark-text placeholder:text-slate-400 dark:placeholder:text-brand-dark-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary leading-relaxed"
            required
          />
          <p className="text-[11px] text-brand-muted dark:text-brand-dark-muted mt-1">
            بين 10 إلى 3000 حرف.
          </p>
        </div>

        {/* Budget & Timeframe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="budget" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
              الميزانية التقديرية (اختياري)
            </label>
            <input
              id="budget"
              type="text"
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              disabled={isSubmitting}
              placeholder="مثال: 5,000 - 15,000 ريال / جنيه / دولار"
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-brand-bg dark:bg-brand-dark-surface text-sm text-brand-text dark:text-brand-dark-text placeholder:text-slate-400 dark:placeholder:text-brand-dark-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div>
            <label htmlFor="timeframe" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
              المدة المستهدفة للتنفيذ (اختياري)
            </label>
            <input
              id="timeframe"
              type="text"
              value={desiredTimeframe}
              onChange={(e) => setDesiredTimeframe(e.target.value)}
              disabled={isSubmitting}
              placeholder="مثال: خلال شهر، أسبوعين، عاجل"
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-brand-bg dark:bg-brand-dark-surface text-sm text-brand-text dark:text-brand-dark-text placeholder:text-slate-400 dark:placeholder:text-brand-dark-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
        </div>

        {/* WhatsApp Voice & Media Optional Notice */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-[#25D366] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
              إرسال فويس نوت أو صور للتوضيح (اختياري عبر واتساب)
            </h4>
            <p className="text-xs text-emerald-800/80 dark:text-emerald-400/90 mt-1 leading-relaxed">
              بياناتك واختياراتك في هذا النموذج واضحة وكافية جداً لفهم مشروعك. وإذا كنت ترغب في إضافة توضيح إضافي بفويس نوت (تسجيل صوتي) أو صور، يمكنك إرسالها بكل سهولة مباشرة داخل شات الواتساب بعد تحويلك.
            </p>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={isSubmitting}
              className="mt-1 w-4 h-4 rounded text-brand-primary border-brand-border focus:ring-brand-primary"
              required
            />
            <span className="text-xs text-brand-muted dark:text-brand-dark-muted leading-relaxed">
              أوافق على{' '}
              <Link href="/privacy" target="_blank" className="text-brand-primary dark:text-brand-dark-primary font-semibold hover:underline">
                سياسة الخصوصية
              </Link>{' '}
              واستخدام بيانات التواصل للتواصل معي بخصوص هذا المشروع.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4 space-y-2">
          <button
            type="submit"
            disabled={isSubmitting || !consent}
            className="w-full py-4 px-6 rounded-2xl bg-brand-action hover:bg-brand-actionHover dark:bg-brand-dark-action dark:hover:bg-[#E05E00] text-white text-base font-bold disabled:opacity-50 transition-all shadow-md shadow-orange-900/20 flex items-center justify-center gap-2 group active:scale-[0.99]"
          >
            {isSubmitting ? (
              <span>جاري تسجيل الطلب وتجهيز محادثة واتساب...</span>
            ) : (
              <>
                <span>إرسال طلب المشروع والمتابعة عبر واتساب</span>
                <MessageCircle className="w-5 h-5 mr-1 text-white fill-current group-hover:scale-110 transition-transform" />
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-brand-muted dark:text-brand-dark-muted">
            سيتم نقلك مباشرة إلى شات واتساب الخاص بنا (<span className="font-mono font-semibold" dir="ltr">01017358087</span>) مع كود مخصص وتفاصيل طلبك لمناقشة السعر والبدء فوراً.
          </p>
        </div>
      </form>
    </div>
  );
}
