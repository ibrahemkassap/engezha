'use client';

import { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Globe,
  DollarSign,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Send,
  FolderGit2,
  Check,
  Plus,
  MessageCircle,
} from 'lucide-react';
import {
  generateDeveloperSubmissionId,
  buildDeveloperSubmissionWhatsAppUrl,
  DeveloperProjectWhatsAppParams,
} from '@/lib/utils';

const POPULAR_TECH_STACK = [
  'Next.js',
  'React',
  'Tailwind CSS',
  'TypeScript',
  'Flutter',
  'React Native',
  'Laravel',
  'PHP',
  'Node.js',
  'Express',
  'Python',
  'Django / FastAPI',
  'Vue.js',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Supabase',
  'Firebase',
  'AI / LLM API',
];

const CATEGORIES = [
  'مواقع شركات وبراندات',
  'متاجر إلكترونية وحلول تجارة',
  'تطبيقات هواتف (iOS & Android)',
  'أنظمة سحابية و SaaS',
  'أنظمة كاشير ونقاط بيع (POS)',
  'أدوات ذكاء اصطناعي وأتمتة',
  'بورتفوليو ومعارض أعمال شخصية',
  'منصات حجوزات وخدمات طبية وسياحية',
  'ألعاب ومنصات تفاعلية',
];

const READINESS_LEVELS = [
  {
    id: 'ready_100',
    title: 'جاهز 100% ومكتمل للتشغيل الفوري',
    desc: 'الكود سليم، قاعدة البيانات مجهزة، والواجهات تعمل بكفاءة تامة.',
  },
  {
    id: 'ready_80',
    title: 'مكتمل بنسبة 80%+ (يحتاج تخصيص بسيط)',
    desc: 'الأساسيات والوظائف الأساسية مكتملة ولكن يحتاج لمسات بيانات العميل.',
  },
  {
    id: 'ui_template',
    title: 'قالب واجهات احترافي (Frontend/Template)',
    desc: 'تصميم وبرمجة واجهات متجاوبة جاهزة للربط مع أي باك إند.',
  },
];

const SELLING_MODELS: {
  id: DeveloperProjectWhatsAppParams['sellingModel'];
  title: string;
  badge: string;
  desc: string;
}[] = [
  {
    id: 'exclusive_buyout',
    title: 'بيع حصري كامل للكود (Exclusive Buyout)',
    badge: 'مبلغ كبير دفعة واحدة',
    desc: 'بيع حقوق الكود المصدري بالكامل لعميل واحد بمبلغ متفق عليه، مع تنازل كامل عن الكود للعميل.',
  },
  {
    id: 'licensing',
    title: 'بيع تراخيص استخدام وتخصيص (Licensing & Customization)',
    badge: 'دخل متكرر مستمر (الأكثر طلباً)',
    desc: 'نحتفظ بنواة الكود ونبيعه لأكثر من عميل بعد تخصيص الهوية والألوان لكل عميل، وأنت تاخد نسبة ربح عن كل بيعة.',
  },
  {
    id: 'partnership',
    title: 'شراكة تنفيذ وصيانة مستمرة (Partnership)',
    badge: 'شراكة عمل',
    desc: 'نقوم بجلب العملاء، وتتولى أنت التعديلات والمهام البرمجية المخصصة بمقابل مجزي ومتفق عليه.',
  },
  {
    id: 'undecided',
    title: 'استشارة ومناقشة مع فريق أنجزها',
    badge: 'تقييم مجاني',
    desc: 'دع فريق أنجزها يراجع المشروع ويقترح النموذج الأكثر ربحية وانتشاراً لمشروعك.',
  },
];

export function DeveloperProjectSubmissionForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedSubmissionId, setGeneratedSubmissionId] = useState('');
  const [whatsAppDirectUrl, setWhatsAppDirectUrl] = useState('');

  // Form State
  const [developerName, setDeveloperName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState(CATEGORIES[0]);
  const [selectedTech, setSelectedTech] = useState<string[]>(['Next.js', 'React', 'Tailwind CSS']);
  const [customTechInput, setCustomTechInput] = useState('');
  const [readinessStatus, setReadinessStatus] = useState(READINESS_LEVELS[0].title);

  const [demoUrl, setDemoUrl] = useState('');
  const [repoOrDriveUrl, setRepoOrDriveUrl] = useState('');
  const [projectSummary, setProjectSummary] = useState('');

  const [sellingModel, setSellingModel] = useState<DeveloperProjectWhatsAppParams['sellingModel']>('licensing');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [notes, setNotes] = useState('');

  const toggleTech = (tech: string) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter((t) => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const addCustomTech = () => {
    if (customTechInput.trim() && !selectedTech.includes(customTechInput.trim())) {
      setSelectedTech([...selectedTech, customTechInput.trim()]);
      setCustomTechInput('');
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!developerName.trim() || !phone.trim() || !email.trim()) return;
      setStep(2);
    } else if (step === 2) {
      if (!projectTitle.trim() || selectedTech.length === 0) return;
      setStep(3);
    } else if (step === 3) {
      if (!projectSummary.trim()) return;
      setStep(4);
    } else if (step === 4) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const submissionId = generateDeveloperSubmissionId();
    setGeneratedSubmissionId(submissionId);

    const waUrl = buildDeveloperSubmissionWhatsAppUrl({
      submissionId,
      developerName,
      phone,
      email,
      portfolioUrl,
      projectTitle,
      projectCategory,
      techStack: selectedTech,
      readinessStatus,
      demoUrl,
      repoOrDriveUrl,
      projectSummary,
      sellingModel,
      expectedPrice,
      notes,
    });

    setWhatsAppDirectUrl(waUrl);
    setIsSubmitted(true);

    // Automatically launch WhatsApp in new window
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-10 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            تم استلام تفاصيل مشروعك بنجاح!
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-text dark:text-brand-dark-text">
            جاهزون لتحويل كودك إلى أرباح حقيقية 🚀
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
            تم تسجيل مشروعك تحت كود المتابعة المخصص التالي، وجاري فتح محادثة الواتساب مع فريق الإدارة الفنية لمراجعة المشروع والبدء في تسويقه.
          </p>
        </div>

        {/* Tracking Code Box */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border max-w-md mx-auto space-y-1">
          <span className="text-[11px] font-semibold text-brand-muted dark:text-brand-dark-muted block">
            كود المطور والمشروع (احفظه للمتابعة):
          </span>
          <span className="text-xl sm:text-2xl font-mono font-extrabold text-brand-primary dark:text-brand-dark-primary tracking-wider" dir="ltr">
            {generatedSubmissionId}
          </span>
        </div>

        {/* Direct WhatsApp Button */}
        <div className="pt-2 max-w-md mx-auto space-y-3">
          <a
            href={whatsAppDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-900/20 active:scale-95 transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>فتح محادثة الواتساب ومتابعة المشروع</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setStep(1);
            }}
            className="text-xs font-semibold text-brand-muted dark:text-brand-dark-muted hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors underline"
          >
            تقديم مشروع برمجي آخر
          </button>
        </div>

        {/* Next Steps Note */}
        <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 max-w-lg mx-auto text-right text-xs text-brand-muted dark:text-brand-dark-muted space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-brand-primary dark:text-brand-dark-primary">
            <ShieldCheck className="w-4 h-4 text-brand-primary dark:text-brand-dark-primary" />
            <span>ماذا يحدث بعد الإرسال؟</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            1. يقوم مهندسونا بفحص الكود والمعاينة والتأكد من استقراره (خلال 24-48 ساعة).<br />
            2. نوقع معك اتفاقية سرية وعدم إفشاء NDA وحفظ حقوق ملكية الكود.<br />
            3. نجهز العرض التفاعلي وننشره لشبكة عملائنا ونبدأ تسويقه فوراً.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-5 sm:p-8 md:p-10 shadow-xl space-y-8">
      {/* Step Indicator Header */}
      <div>
        <div className="flex items-center justify-between gap-2 border-b border-brand-border/60 dark:border-brand-dark-border pb-4">
          {[
            { num: 1, title: 'بياناتك كـ مطور' },
            { num: 2, title: 'هوية المشروع' },
            { num: 3, title: 'المعاينة والملفات' },
            { num: 4, title: 'التسعير ونموذج البيع' },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => {
                // allow navigating to previous steps only
                if (s.num < step) setStep(s.num as 1 | 2 | 3 | 4);
              }}
              className={`flex items-center gap-2 cursor-pointer transition-all ${
                step === s.num
                  ? 'text-brand-primary dark:text-brand-dark-primary font-bold'
                  : step > s.num
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-brand-muted/60 dark:text-brand-dark-muted/60'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-xl text-xs flex items-center justify-center font-bold ${
                  step === s.num
                    ? 'bg-brand-primary text-white shadow-xs'
                    : step > s.num
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-100 dark:bg-brand-dark-border text-slate-500'
                }`}
              >
                {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </span>
              <span className="text-xs hidden md:inline">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleNextStep} className="space-y-6">
        {/* STEP 1: Developer Contact Info */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary uppercase tracking-wider">
                الخطوة 1 من 4
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-brand-text dark:text-brand-dark-text mt-1">
                بيانات المبرمج ومعلومات التواصل
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                سنتواصل معك عبر هذه البيانات لمناقشة كودك ومتابعة عروض الشراء والأرباح.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  الاسم بالكامل أو اسم فريق التطوير <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-brand-muted absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={developerName}
                    onChange={(e) => setDeveloperName(e.target.value)}
                    placeholder="مثال: م. أحمد كمال أو DevStudio"
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs sm:text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  رقم الواتساب للتواصل المباشر <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-brand-muted absolute right-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال: 01017358087"
                    dir="ltr"
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs sm:text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  البريد الإلكتروني <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-brand-muted absolute right-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    dir="ltr"
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs sm:text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  رابط معرض الأعمال / GitHub / LinkedIn (اختياري)
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-brand-muted absolute right-3.5 top-3.5" />
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://github.com/username"
                    dir="ltr"
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs sm:text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <span>المتابعة إلى تفاصيل المشروع</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Project Info & Stack */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary uppercase tracking-wider">
                الخطوة 2 من 4
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-brand-text dark:text-brand-dark-text mt-1">
                مواصفات المشروع والتقنيات المستخدمة
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                حدد تصنيف مشروعك والتقنيات المبني بها ومدى جاهزية الكود للتشغيل والتسليم.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  اسم المشروع أو الفكرة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="مثال: نظام إدارة العيادات والمواعيد، أو متجر إلكتروني متكامل"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs sm:text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  تصنيف المشروع الرئيسي <span className="text-red-500">*</span>
                </label>
                <select
                  value={projectCategory}
                  onChange={(e) => setProjectCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs sm:text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-2">
                  التقنيات وأطر العمل المستخدمة في المشروع <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {POPULAR_TECH_STACK.map((tech) => {
                    const isSelected = selectedTech.includes(tech);
                    return (
                      <button
                        type="button"
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-brand-primary text-white shadow-xs scale-[1.02]'
                            : 'bg-slate-100 dark:bg-brand-dark-bg text-brand-muted dark:text-brand-dark-muted border border-slate-200 dark:border-brand-dark-border hover:border-brand-primary'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{tech}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Tech */}
                <div className="flex items-center gap-2 max-w-sm">
                  <input
                    type="text"
                    value={customTechInput}
                    onChange={(e) => setCustomTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomTech();
                      }
                    }}
                    placeholder="أضف تقنية أخرى (اضغط Enter)"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                  <button
                    type="button"
                    onClick={addCustomTech}
                    className="p-2 rounded-xl bg-slate-200 dark:bg-brand-dark-border text-brand-text dark:text-brand-dark-text hover:bg-brand-primary hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Readiness status */}
              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-2">
                  حالة الكود وجاهزية المشروع
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {READINESS_LEVELS.map((level) => {
                    const isSelected = readinessStatus === level.title;
                    return (
                      <div
                        key={level.id}
                        onClick={() => setReadinessStatus(level.title)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                          isSelected
                            ? 'bg-purple-50 dark:bg-purple-950/40 border-brand-primary shadow-xs'
                            : 'bg-slate-50 dark:bg-brand-dark-bg border-slate-200 dark:border-brand-dark-border hover:border-brand-primary/60'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                              isSelected
                                ? 'border-brand-primary bg-brand-primary text-white'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <h4 className="text-xs font-bold text-brand-text dark:text-brand-dark-text">
                            {level.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-brand-muted dark:text-brand-dark-muted pr-6 leading-relaxed">
                          {level.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-brand-dark-border text-brand-text dark:text-brand-dark-text font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                <span>الرجوع</span>
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <span>المتابعة إلى روابط المعاينة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Preview URLs & Description */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary uppercase tracking-wider">
                الخطوة 3 من 4
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-brand-text dark:text-brand-dark-text mt-1">
                روابط المعاينة ووصف القيمة والميزات
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                كلما وفرت رابطاً لمعاينة المشروع حياً أو شرحت ميزاته، زادت سرعة تجهيزه وعرضه للعملاء.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  رابط المعاينة الحية المباشرة للمشروع (إن وجد)
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-brand-muted absolute right-3.5 top-3.5" />
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://my-project-demo.vercel.app"
                    dir="ltr"
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs sm:text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                  />
                </div>
                <p className="text-[11px] text-brand-muted dark:text-brand-dark-muted mt-1">
                  💡 سيتم ربط هذا الديمو مع استوديو العرض التفاعلي الخاص بأنجزها لتمكين العملاء من تجربته.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  رابط الكود أو مستودع GitHub أو مجلد Google Drive / Dropbox
                </label>
                <div className="relative">
                  <FolderGit2 className="w-4 h-4 text-brand-muted absolute right-3.5 top-3.5" />
                  <input
                    type="url"
                    value={repoOrDriveUrl}
                    onChange={(e) => setRepoOrDriveUrl(e.target.value)}
                    placeholder="https://github.com/... أو رابط مجلد مضغوط"
                    dir="ltr"
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs sm:text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary text-right"
                  />
                </div>
                <p className="text-[11px] text-brand-muted dark:text-brand-dark-muted mt-1">
                  🔒 جميع الروابط والملفات تعامل بسرية مطلقة ولا يتم مشاركتها مع أي طرف ثالث إلا بعد توقيع عقد الشراء.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  ملخص المشروع وأبرز المشاكل التي يحلها والميزات <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={projectSummary}
                  onChange={(e) => setProjectSummary(e.target.value)}
                  placeholder="احكيلنا باختصار: ما هو الهدف من هذا المشروع؟ ما هي أهم الشاشات والميزات المتاحة؟ وما الذي يجعله جذاباً للشركات أو العملاء؟"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs sm:text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-brand-dark-border text-brand-text dark:text-brand-dark-text font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                <span>الرجوع</span>
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <span>المتابعة إلى التسعير والبيع</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Pricing Model & Submit */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary uppercase tracking-wider">
                الخطوة 4 من 4 والأخيرة
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-brand-text dark:text-brand-dark-text mt-1">
                نموذج البيع المفضل والسعر المتوقع
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                اختر الطريقة التي تفضلها لتحقيق الأرباح من مشروعك، والسعر التقديري الذي تراه مناسباً.
              </p>
            </div>

            {/* Selling Models Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SELLING_MODELS.map((model) => {
                const isSelected = sellingModel === model.id;
                return (
                  <div
                    key={model.id}
                    onClick={() => setSellingModel(model.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      isSelected
                        ? 'bg-purple-50 dark:bg-purple-950/40 border-brand-primary ring-2 ring-brand-primary/20 shadow-sm'
                        : 'bg-slate-50 dark:bg-brand-dark-bg border-slate-200 dark:border-brand-dark-border hover:border-brand-primary/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-brand-primary text-white">
                        {model.badge}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-brand-primary bg-brand-primary text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-brand-text dark:text-brand-dark-text">
                      {model.title}
                    </h4>

                    <p className="text-[11px] text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                      {model.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  السعر المطلوب أو التقديري (بالجنيه المصري أو بالدولار)
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-brand-muted absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value)}
                    placeholder="مثال: 20,000 ج.م أو 600$ أو قابل للتفاوض"
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs sm:text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5">
                  أي ملاحظات إضافية أو شروط خاصة (اختياري)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثال: متوفر مع لوحة تحكم، أو الكود يحتاج سيرفر مخصص"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs sm:text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>

            {/* NDA Trust Box */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                <span className="font-bold text-emerald-900 dark:text-emerald-300">
                  ضمان وحماية الملكية الفكرية وسرية الكود:
                </span>
                <p className="text-[11px]">
                  لن يتم تسليم الكود المصدري أو ملفات قاعدة البيانات لأي عميل إلا بعد توقيع اتفاقية رسمية وإيداع مستحقاتك المالية بالكامل في حسابك أو محفظتك.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-brand-dark-border text-brand-text dark:text-brand-dark-text font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                <span>الرجوع</span>
              </button>

              <button
                type="submit"
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-brand-action hover:bg-brand-actionHover text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-900/30 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>إرسال المشروع وبدء المراجعة والبيع</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
