'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  Building2,
  FileText,
  DollarSign,
  Paperclip,
  PhoneCall,
  ClipboardCheck,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  X,
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
  // Wizard Step State (1 to 7)
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Project Type
  const [executionMode, setExecutionMode] = useState<'existing_project' | 'custom_project'>(
    initialProjectId ? 'existing_project' : initialMode
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId || '');
  const [categoryId, setCategoryId] = useState<string>(initialCategoryId || '');
  const [projectType, setProjectType] = useState<string>('موقع شركات');

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    const found = projects.find((p) => p.id === id);
    if (found?.category_id) {
      setCategoryId(found.category_id);
    }
  };

  // Step 2: Business Information
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('تجارة وتجزئة');
  const [country, setCountry] = useState('مصر');
  const [preferredLanguage, setPreferredLanguage] = useState('عربي وإنجليزي');

  // Step 3: Requirements
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [referenceWebsites, setReferenceWebsites] = useState('');
  const [desiredIntegrations, setDesiredIntegrations] = useState('');

  // Step 4: Budget & Timeline
  const [budgetRange, setBudgetRange] = useState('10,000 - 25,000 ج.م');
  const [budgetCurrency, setBudgetCurrency] = useState<'EGP' | 'SAR' | 'USD'>('EGP');
  const [desiredTimeframe, setDesiredTimeframe] = useState('خلال 2 إلى 4 أسابيع');
  const [priorityLevel, setPriorityLevel] = useState<'normal' | 'urgent' | 'flexible'>('normal');

  // Step 5: Attachments
  const [attachmentsList, setAttachmentsList] = useState<{ name: string; size: number }[]>([]);

  // Step 6: Contact Channels
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [consent, setConsent] = useState(false);

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    requestId: string;
    message: string;
    whatsappUrl: string;
  } | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const currentProject = projects.find((p) => p.id === selectedProjectId);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Step Validation before progressing
  const validateAndNext = () => {
    setStepError(null);

    if (currentStep === 1) {
      if (executionMode === 'existing_project' && !selectedProjectId) {
        setStepError('يرجى اختيار نموذج من قائمة المشاريع المعروضة.');
        return;
      }
    }

    if (currentStep === 3) {
      if (!description.trim() || description.trim().length < 10) {
        setStepError('يرجى كتابة نبذة توضيحية عن فكرتك أو متطلباتك (10 أحرف على الأقل).');
        return;
      }
    }

    if (currentStep === 6) {
      if (!fullName.trim() || fullName.trim().length < 3) {
        setStepError('يرجى إدخال اسمك الكريم (3 أحرف على الأقل).');
        return;
      }
      if (!phone.trim() || phone.trim().length < 7) {
        setStepError('يرجى إدخال رقم هاتف أو واتساب صحيح للمتابعة.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setStepError('يرجى إدخال بريد إلكتروني صالح.');
        return;
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  const handlePrev = () => {
    setStepError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 20 * 1024 * 1024) {
        setStepError('حجم الملف يتجاوز الحد الأقصى المسموح (20 ميجابايت).');
        return;
      }
      setAttachmentsList((prev) => [...prev, { name: file.name, size: file.size }]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachmentsList((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!consent) {
      setErrorMessage('يجب الموافقة على شروط الخدمة وسياسة الخصوصية للمتابعة.');
      return;
    }

    const formDataToValidate = {
      fullName,
      phone,
      email,
      executionMode,
      projectType,
      businessName: businessName || undefined,
      industry: industry || undefined,
      country: country || undefined,
      preferredLanguage: preferredLanguage || undefined,
      categoryId: categoryId || undefined,
      selectedProjectId: executionMode === 'existing_project' ? selectedProjectId : undefined,
      selectedProjectTitle:
        executionMode === 'existing_project' && currentProject
          ? currentProject.title
          : undefined,
      projectTitle: projectTitle || undefined,
      targetAudience: targetAudience || undefined,
      description,
      referenceWebsites: referenceWebsites || undefined,
      desiredIntegrations: desiredIntegrations || undefined,
      budgetRange: budgetRange || undefined,
      budgetCurrency,
      desiredTimeframe: desiredTimeframe || undefined,
      priorityLevel,
      preferredContactMethod,
      consent,
    };

    const validation = inquirySchema.safeParse(formDataToValidate);

    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || 'بيانات غير مكتملة، يرجى مراجعة الحقول.');
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
            attachments: attachmentsList.map((a) => ({
              file_name: a.name,
              file_size: a.size,
              file_type: 'application/octet-stream',
            })),
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

      if (!finalRequestId) {
        finalRequestId = generateRequestId();
      }

      const whatsappUrl = buildInquiryWhatsAppUrl({
        requestId: finalRequestId,
        fullName,
        phone,
        email,
        executionMode,
        selectedProjectTitle,
        categoryName,
        description: `نوع المشروع: ${projectType} | النشاط: ${industry} | الدولة: ${country}\nالتفاصيل: ${description}`,
        budgetRange: `${budgetRange} (${budgetCurrency})`,
        desiredTimeframe,
      });

      setSuccessData({
        requestId: finalRequestId,
        message: 'تم تسجيل طلب مشروعك بنجاح في نظام أنجزها! جاري توجيهك لشات واتساب الرسمي لمناقشة التفاصيل وخطة التنفيذ...',
        whatsappUrl,
      });

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
      <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
            تم تسجيل طلب المشروع بنجاح
          </span>
          <h2 className="text-2xl font-extrabold text-brand-text dark:text-brand-dark-text">
            شكراً لك، {fullName}!
          </h2>
          <p className="text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
            {successData.message}
          </p>
        </div>

        {/* Unique Tracking Reference Code Box */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border space-y-1">
          <span className="text-xs text-brand-muted dark:text-brand-dark-muted block">
            كود المتابعة المخصص لطلبك:
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-xl font-extrabold text-brand-primary dark:text-brand-dark-primary tracking-wider">
              {successData.requestId}
            </span>
            <button
              onClick={() => handleCopyId(successData.requestId)}
              className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition-colors"
              title="نسخ الكود"
              type="button"
            >
              {copiedId ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Direct WhatsApp Call to Action */}
        <div className="pt-2 space-y-3">
          <a
            href={successData.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-lg shadow-emerald-900/25 active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>الانتقال إلى محادثة واتساب الآن (01017358087)</span>
          </a>

          <Link
            href="/projects"
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-brand-primary dark:text-brand-dark-primary hover:underline"
          >
            <span>استعراض باقي مشاريع أنجزها</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const stepsMeta = [
    { num: 1, title: 'نوع المشروع', icon: Layers },
    { num: 2, title: 'بيانات النشاط', icon: Building2 },
    { num: 3, title: 'المتطلبات', icon: FileText },
    { num: 4, title: 'الميزانية والوقت', icon: DollarSign },
    { num: 5, title: 'المرفقات', icon: Paperclip },
    { num: 6, title: 'بيانات التواصل', icon: PhoneCall },
    { num: 7, title: 'المراجعة والتأكيد', icon: ClipboardCheck },
  ];

  return (
    <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-5 sm:p-10 shadow-xl max-w-4xl mx-auto space-y-8 transition-colors">
      {/* Wizard Step Progress Tracker */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-extrabold text-brand-muted dark:text-brand-dark-muted">
          <span>الخطوة {currentStep} من 7</span>
          <span className="text-brand-primary dark:text-purple-300 font-bold">
            {stepsMeta[currentStep - 1]?.title}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-l from-purple-600 to-brand-accent transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>

        {/* Desktop Step Icons Row */}
        <div className="hidden sm:grid grid-cols-7 gap-2 pt-2">
          {stepsMeta.map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <div
                key={s.num}
                className={`flex flex-col items-center gap-1.5 text-center ${
                  isCurrent
                    ? 'text-brand-primary dark:text-purple-300 font-extrabold'
                    : isCompleted
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-slate-400 font-medium'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-all ${
                    isCurrent
                      ? 'bg-brand-primary text-white shadow-xs scale-105'
                      : isCompleted
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className="text-[10px] leading-tight line-clamp-1">{s.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Error Banner */}
      {stepError && (
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{stepError}</span>
        </div>
      )}

      {/* Global Form Submission Error */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Wizard Steps Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: Project Type & Mode */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-brand-text dark:text-white">
                اختر نوع وطريقة تنفيذ مشروعك
              </h2>
              <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1">
                هل تفضل الانطلاق من نموذج رقمي تم إنجازه واختباره، أم بناء فكرة استثنائية من الصفر؟
              </p>
            </div>

            {/* Execution Mode Radio Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => setExecutionMode('existing_project')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  executionMode === 'existing_project'
                    ? 'border-brand-primary dark:border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 shadow-xs'
                    : 'border-brand-border dark:border-brand-dark-border hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <input
                  type="radio"
                  name="executionMode"
                  value="existing_project"
                  checked={executionMode === 'existing_project'}
                  onChange={() => {}}
                  className="mt-1"
                />
                <div>
                  <div className="font-extrabold text-sm text-brand-text dark:text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-brand-primary dark:text-purple-400" />
                    <span>تخصيص نموذج من المعرض</span>
                  </div>
                  <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                    إطلاق فوري وسريع (خلال 3 - 5 أيام) بالاعتماد على أحد الـ 12 نموذجاً المنفذة.
                  </p>
                </div>
              </label>

              <label
                onClick={() => setExecutionMode('custom_project')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  executionMode === 'custom_project'
                    ? 'border-brand-accent dark:border-brand-dark-action bg-orange-50/50 dark:bg-orange-950/20 shadow-xs'
                    : 'border-brand-border dark:border-brand-dark-border hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <input
                  type="radio"
                  name="executionMode"
                  value="custom_project"
                  checked={executionMode === 'custom_project'}
                  onChange={() => {}}
                  className="mt-1"
                />
                <div>
                  <div className="font-extrabold text-sm text-brand-text dark:text-white flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-brand-accent dark:text-brand-dark-action" />
                    <span>بناء مخصص بالكامل من الصفر</span>
                  </div>
                  <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                    تصميم وبرمجة منصة سحابية فريدة تلائم متطلباتك الخاصة بنسبة 100%.
                  </p>
                </div>
              </label>
            </div>

            {/* Model Picker if existing_project */}
            {executionMode === 'existing_project' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-brand-text dark:text-white">
                  اختر النموذج المرغوب من معرض الأعمال:
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => handleSelectProject(e.target.value)}
                  className="w-full p-3 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs font-bold text-brand-text dark:text-white"
                >
                  <option value="">-- اضغط لاختيار المشروع --</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.project_type})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Project Type Chips */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-brand-text dark:text-white">
                تصنيف المشروع الأساسي:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'موقع شركات تعريفي',
                  'متجر إلكتروني متكامل',
                  'تطبيق موبايل (iOS/Android)',
                  'نظام كاشير وإدارة POS',
                  'منظومة فواتير سحابية',
                  'حلول ذكاء اصطناعي وأتمتة',
                  'منصة تعليم وحجوزات',
                  'منصة سحابية مخصصة (SaaS)',
                ].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setProjectType(t)}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                      projectType === t
                        ? 'border-brand-primary bg-brand-primary text-white shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Business Information */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-brand-text dark:text-white">
                بيانات النشاط والشركة
              </h2>
              <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1">
                ساعدنا في فهم قطاع عملك والجمهور المستهدف لتقديم الاقتراحات الهندسية الأنسب.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  اسم الشركة أو العلامة التجارية (أو اسم الفكرة)
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="مثال: شركة النور للحلول اللوجستية"
                  className="w-full p-3 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs text-brand-text dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  مجال ونشاط العمل (Industry)
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-3 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs font-bold text-brand-text dark:text-white"
                >
                  <option value="تجارة وتجزئة">تجارة وتجزئة ومتاجر</option>
                  <option value="رعاية صحية وطبية">رعاية صحية وعيادات ومستشفيات</option>
                  <option value="عقارات ومقاولات">عقارات ومقاولات وتطوير عقاري</option>
                  <option value="طيران وسياحة فاخرة">طيران وسياحة وخدمات كونسيرج</option>
                  <option value="تعليم وتدريب">تعليم وتدريب واستشارات</option>
                  <option value="مطاعم وضيافة">مطاعم وكافيهات وضيافة</option>
                  <option value="تكنولوجيا واتصالات">تكنولوجيا وبرمجيات وذكاء اصطناعي</option>
                  <option value="أخرى">قطاع آخر</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  الدولة أو السوق المستهدف
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-3 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs font-bold text-brand-text dark:text-white"
                >
                  <option value="مصر">جمهورية مصر العربية</option>
                  <option value="السعودية">المملكة العربية السعودية</option>
                  <option value="الإمارات">الإمارات العربية المتحدة</option>
                  <option value="الكويت">دولة الكويت</option>
                  <option value="قطر">دولة قطر</option>
                  <option value="سوق دولي متعدد">سوق دولي ومتعدد البلدان</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  اللغات المطلوبة في المنصة
                </label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs font-bold text-brand-text dark:text-white"
                >
                  <option value="عربي فقط">اللغة العربية فقط</option>
                  <option value="عربي وإنجليزي">لغتان (عربي + إنجليزي مع RTL/LTR)</option>
                  <option value="إنجليزي فقط">اللغة الإنجليزية فقط</option>
                  <option value="متعدد اللغات">أكثر من لغتين</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Requirements & Description */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-brand-text dark:text-white">
                متطلبات ومواصفات المشروع
              </h2>
              <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1">
                احكِ لنا بالتفصيل عن أهدافك والميزات الأساسية التي تتطلع لوجودها في النظام.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  عنوان أو اسم تعريفي للمشروع (اختياري)
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="مثال: تطبيق توصيل شحنات سريع"
                  className="w-full p-3 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs text-brand-text dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  الجمهور المستهدف للمشروع (اختياري)
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="مثال: أصحاب الشركات الصغيرة، أطباء الأسنان، عملاء التجزئة"
                  className="w-full p-3 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs text-brand-text dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  شرح الفكرة والمتطلبات الرئيسية *
                </label>
                <span className="text-[11px] text-slate-400">
                  {description.length} / 3000 حرف
                </span>
              </div>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اشرح لنا طبيعة عملك، الشاشات المطلوبة، الوظائف التي تريد أن يقوم بها الموقع، وطريقة تعامل المستخدمين..."
                className="w-full p-3.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs text-brand-text dark:text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  مواقع أو تطبيقات ملهمة (روابط للمقارنة)
                </label>
                <input
                  type="text"
                  value={referenceWebsites}
                  onChange={(e) => setReferenceWebsites(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-3 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs text-brand-text dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  ربط وتكاملات مرغوبة (Integrations)
                </label>
                <input
                  type="text"
                  value={desiredIntegrations}
                  onChange={(e) => setDesiredIntegrations(e.target.value)}
                  placeholder="مثال: بوابة PayMob، شحن Bosta، خرائط Google"
                  className="w-full p-3 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs text-brand-text dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Budget & Timeline */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-brand-text dark:text-white">
                الميزانية التقديرية والجدول الزمني
              </h2>
              <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1">
                تحديد ميزانيتك يساعدنا في اقتراح المعمارية والحلول المناسبة لحجم استثمارك دون مبالغة.
              </p>
            </div>

            {/* Currency Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-text dark:text-white block">
                عملة التقدير المفضلة:
              </label>
              <div className="flex items-center gap-2">
                {(['EGP', 'SAR', 'USD'] as const).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setBudgetCurrency(curr)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      budgetCurrency === curr
                        ? 'bg-brand-primary text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {curr === 'EGP' ? 'الجنيه المصري (EGP)' : curr === 'SAR' ? 'الريال السعودي (SAR)' : 'الدولار الأمريكي (USD)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Ranges */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-brand-text dark:text-white block">
                نطاق الميزانية التقديرية:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'بداية واستكشاف', val: budgetCurrency === 'EGP' ? '5,000 - 15,000 ج.م' : budgetCurrency === 'SAR' ? '1,500 - 4,000 ر.س' : '$500 - $1,500' },
                  { label: 'شركات متوسطة ومتكاملة', val: budgetCurrency === 'EGP' ? '15,000 - 40,000 ج.م' : budgetCurrency === 'SAR' ? '4,000 - 10,000 ر.س' : '$1,500 - $3,500' },
                  { label: 'أنظمة متقدمة وتطبيقات SaaS', val: budgetCurrency === 'EGP' ? '+40,000 ج.م' : budgetCurrency === 'SAR' ? '+10,000 ر.س' : '+$3,500' },
                ].map((b, bIdx) => (
                  <button
                    key={bIdx}
                    type="button"
                    onClick={() => setBudgetRange(b.val)}
                    className={`p-3.5 rounded-2xl border text-right transition-all ${
                      budgetRange === b.val
                        ? 'border-brand-primary bg-purple-50/50 dark:bg-purple-950/30 font-extrabold text-brand-primary dark:text-purple-300'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-[11px] text-slate-400">{b.label}</div>
                    <div className="text-sm font-bold mt-1">{b.val}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Desired Timeframe */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  المدة الزمنية المفضلة للتسليم
                </label>
                <select
                  value={desiredTimeframe}
                  onChange={(e) => setDesiredTimeframe(e.target.value)}
                  className="w-full p-3 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs font-bold text-brand-text dark:text-white"
                >
                  <option value="خلال أسبوع إلى أسبوعين">خلال أسبوع إلى أسبوعين (تسليم سريع)</option>
                  <option value="خلال 2 إلى 4 أسابيع">خلال 2 إلى 4 أسابيع (المدة القياسية)</option>
                  <option value="خلال شهر إلى شهرين">خلال شهر إلى شهرين (مشاريع كبرى)</option>
                  <option value="الجدول مرن بحسب اكتمال الميزات">مرن بحسب مراحل العمل</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  مستوى الأولوية والاستعجال
                </label>
                <select
                  value={priorityLevel}
                  onChange={(e) => setPriorityLevel(e.target.value as 'normal' | 'urgent' | 'flexible')}
                  className="w-full p-3 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs font-bold text-brand-text dark:text-white"
                >
                  <option value="normal">أولوية عادية (Normal)</option>
                  <option value="urgent">أولوية عاجلة ومستعجلة (Urgent Delivery)</option>
                  <option value="flexible">أولوية مرنة (Flexible)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Attachments */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-brand-text dark:text-white">
                إرفاق ملفات ومستندات مرجعية
              </h2>
              <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1">
                إذا كان لديك شعار، ملف مواصفات PDF، مخططات، أو صور توضيحية، يمكنك إرفاقها هنا (اختياري).
              </p>
            </div>

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-8 text-center space-y-3 bg-slate-50/50 dark:bg-slate-900/40">
              <UploadCloud className="w-10 h-10 text-brand-primary dark:text-purple-400 mx-auto" />
              <div>
                <p className="text-xs font-bold text-brand-text dark:text-white">
                  اسحب الملفات هنا أو اضغط لاختيارها من جهازك
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  يدعم صيغ PDF، Word، PNG، JPG حتى 20 ميجابايت للملف
                </p>
              </div>

              <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold cursor-pointer hover:bg-brand-primaryHover transition-colors shadow-xs">
                <span>تحديد ملف من الجهاز</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileSimulate}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                />
              </label>
            </div>

            {/* Uploaded List */}
            {attachmentsList.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 block">
                  الملفات المرفقة ({attachmentsList.length}):
                </span>
                <div className="space-y-2">
                  {attachmentsList.map((att, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Paperclip className="w-4 h-4 text-brand-primary dark:text-purple-400 flex-shrink-0" />
                        <span className="font-bold truncate text-brand-text dark:text-white">
                          {att.name}
                        </span>
                        <span className="text-slate-400 text-[10px]">
                          ({Math.round(att.size / 1024)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(idx)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="حذف الملف"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 6: Contact Details */}
        {currentStep === 6 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-brand-text dark:text-white">
                بيانات التواصل والمتابعة
              </h2>
              <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1">
                سنتواصل معك عبر هذه البيانات لمناقشة خطة العمل وإرسال مقترح التسعير والجدول الزمني.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  الاسم الكامل أو اسم المسؤول *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: م. أحمد محمود"
                  className="w-full p-3.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs text-brand-text dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-text dark:text-white block">
                    رقم الهاتف / الواتساب *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01017358087 أو +201017358087"
                    dir="ltr"
                    className="w-full p-3.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs text-brand-text dark:text-white text-right"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-text dark:text-white block">
                    البريد الإلكتروني الرسمي *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    dir="ltr"
                    className="w-full p-3.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-900 text-xs text-brand-text dark:text-white text-right"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-brand-text dark:text-white block">
                  قناة التواصل المفضلة لديك:
                </label>
                <div className="flex items-center gap-3">
                  {[
                    { id: 'whatsapp', label: 'محادثة واتساب مباشرة (الأسرع)', icon: MessageCircle },
                    { id: 'phone', label: 'اتصال هاتفي', icon: PhoneCall },
                    { id: 'email', label: 'البريد الإلكتروني', icon: FileText },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setPreferredContactMethod(ch.id as 'whatsapp' | 'phone' | 'email')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        preferredContactMethod === ch.id
                          ? 'border-brand-primary bg-purple-50 dark:bg-purple-950/40 text-brand-primary dark:text-purple-300 font-extrabold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <ch.icon className="w-3.5 h-3.5" />
                      <span>{ch.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Review & Confirm */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-brand-text dark:text-white">
                مراجعة تفاصيل الطلب وتأكيد الإرسال
              </h2>
              <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1">
                تأكد من صحة بياناتك قبل الإرسال. سيتم إنشاء كود تتبع خاص بك وتوجيهك فوراً للتواصل.
              </p>
            </div>

            {/* Summary Review Card */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 block mb-1">نوع التنفيذ:</span>
                  <span className="font-extrabold text-brand-text dark:text-white">
                    {executionMode === 'existing_project'
                      ? `تخصيص نموذج: ${currentProject?.title || 'نموذج محدد'}`
                      : 'بناء وبرمجة مخصصة من الصفر'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">تصنيف المشروع:</span>
                  <span className="font-extrabold text-brand-text dark:text-white">{projectType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">النشاط والدولة:</span>
                  <span className="font-bold text-brand-text dark:text-white">{industry} ({country})</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">الميزانية والمدة:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {budgetRange} ({desiredTimeframe})
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">ملخص فكرة المشروع:</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <span className="text-slate-500">بيانات مقدم الطلب:</span>
                <span className="font-extrabold text-brand-primary dark:text-purple-300">
                  {fullName} | {phone} | {email}
                </span>
              </div>
            </div>

            {/* Consent & NDA Banner */}
            <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-primary dark:text-purple-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>حماية كاملة لأفكارك واتفاقية عدم إفصاح (NDA)</span>
              </div>
              <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                />
                <span className="leading-relaxed">
                  أوافق على سياسة الخصوصية وشروط الاستخدام، وأفوض فريق أنجزها بدراسة متطلباتي والتواصل معي لتقديم الاستشارة وعرض السعر.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Wizard Controls Footer (Back / Next / Submit) */}
        <div className="pt-6 border-t border-brand-border/60 dark:border-brand-dark-border flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>الخطوة السابقة</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={validateAndNext}
              className="inline-flex items-center gap-1.5 px-7 py-3 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-extrabold transition-all shadow-md active:scale-95"
            >
              <span>المتابعة للخطوة التالية</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white text-sm font-extrabold transition-all shadow-lg shadow-orange-900/20 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>جاري حفظ الطلب والتحويل للواتساب...</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" />
                  <span>إرسال الطلب والتواصل بالواتساب</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
