import Link from 'next/link';
import { ProjectLaunchButton } from '@/components/transitions/ProjectLaunchButton';
import {
  PackageCheck,
  Code2,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export function ThreeBusinessModelsSection() {
  const models = [
    {
      id: 'ready-made',
      badge: 'إطلاق فوري وسريع',
      title: 'أ. النماذج الرقمية الجاهزة للتخصيص',
      description:
        'اختر من بين 12 نموذجاً حياً حقيقياً (مواقع شركات، متاجر زجاجية، أنظمة كاشير POS، عيادات، ومنصات AI) تم اختبارها واكتمال برمجتها، لنقوم بتخصيصها بهويتك وإطلاقها في أيام معدودة.',
      icon: PackageCheck,
      color: 'from-purple-600 to-indigo-600',
      badgeBg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300',
      features: [
        'معاينة حية وتجربة فعلية لكافة الشاشات قبل الشراء',
        'تخصيص كامل للهوية والألوان والشعار والمحتوى',
        'ربط فوري بالدومين واستضافة سحابية فائقة السرعة',
        'زمن تسليم قياسي يتراوح بين 2 إلى 5 أيام عمل',
      ],
      ctaText: 'تصفح النماذج الجاهزة',
      ctaHref: '/projects',
      isPrimary: false,
    },
    {
      id: 'custom-production',
      badge: 'تنفيذ مخصص من الصفر',
      title: 'ب. إنتاج وتطوير البرمجيات المخصصة',
      description:
        'إذا كانت فكرة مشروعك فريدة أو تحتاج لمنصة سحابية متكاملة (Custom SaaS)، نقوم بهندسة وبناء النظام من الصفر بأحدث التقنيات مع تسليم الكود المصدري بالكامل وملكيته لك.',
      icon: Code2,
      color: 'from-orange-500 to-amber-600',
      badgeBg: 'bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300',
      features: [
        'تحليل متطلبات دقيق وتوثيق هندسي ومخططات Wireframes',
        'كود نظيف موثق بالكامل واختبارات جودة أوتوماتيكية',
        'بنية قابلة للتوسع بملايين المعاملات والمستخدمين',
        'اتفاقية عدم إفصاح (NDA) وضمان جودة تشغيلي',
      ],
      ctaText: 'ابدأ مشروعك المخصص',
      ctaHref: '/start-project',
      isPrimary: true,
    },
    {
      id: 'maintenance-growth',
      badge: 'استقرار وأمان دائم',
      title: 'ج. الصيانة والتأمين والتطوير المستمر',
      description:
        'لا نتركك بعد الإطلاق. نقدم باقات رعاية سحابية متكاملة تضمن مراقبة السيرفرات 24/7، نسخاً احتياطياً يومياً، تحديثات أمنية، وإضافة ميزات جديدة لتوسيع نشاطك.',
      icon: ShieldCheck,
      color: 'from-emerald-600 to-teal-600',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300',
      features: [
        'مراقبة لحظية واستجابة طارئة للأعطال في أقل من 15 دقيقة',
        'نسخ احتياطي يومي سحابي وتحديثات الحزم البرمجية',
        'ساعات عمل شهرية لإضافة ميزات وتعديلات جديدة',
        'تحسين مستمر لسرعة الموقع ومؤشرات Core Web Vitals',
      ],
      ctaText: 'استكشف باقات الصيانة',
      ctaHref: '/services/website-maintenance',
      isPrimary: false,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 dark:bg-[#0c0919] border-y border-brand-border/60 dark:border-brand-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-subtle dark:bg-brand-dark-surface border border-brand-border dark:border-brand-dark-border text-xs font-bold text-brand-primary dark:text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent dark:text-brand-dark-action" />
            <span>3 نماذج إنتاج مرنة لتلبية كافة احتياجاتك</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text tracking-tight">
            كيف نعمل معاً لتحقيق أهدافك الرقمية؟
          </h2>

          <p className="text-sm sm:text-base text-brand-muted dark:text-brand-dark-muted leading-relaxed">
            سواء كنت تريد إطلاقاً سريعاً بنموذج مثبت، أو بناء نظام مبتكر ومخصص من الصفر، أو ضمان استقرار نظامك الحالي، نوفر لك المسار الأنسب بتكلفة واضحة وجودة استثنائية.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((model) => {
            const Icon = model.icon;
            return (
              <div
                key={model.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  model.isPrimary
                    ? 'bg-white dark:bg-brand-dark-surface border-2 border-brand-primary dark:border-purple-500 shadow-xl lg:-translate-y-2'
                    : 'bg-white dark:bg-brand-dark-surface border border-brand-border dark:border-brand-dark-border shadow-xs hover:shadow-lg'
                }`}
              >
                {model.isPrimary && (
                  <div className="absolute -top-3.5 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 text-white text-[11px] font-extrabold shadow-md">
                    الخيار الأكثر طلباً للشركات
                  </div>
                )}

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-brand-primary dark:text-purple-300 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${model.badgeBg}`}>
                      {model.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-brand-text dark:text-brand-dark-text">
                    {model.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                    {model.description}
                  </p>

                  <div className="pt-4 border-t border-brand-border/60 dark:border-brand-dark-border/60 space-y-2.5">
                    {model.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-brand-muted dark:text-brand-dark-muted">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-brand-border/60 dark:border-brand-dark-border/60">
                  {model.isPrimary ? (
                    <ProjectLaunchButton
                      href={model.ctaHref}
                      variant="glow"
                      className="w-full py-3.5 rounded-xl font-bold text-sm shadow-md"
                    >
                      <span>{model.ctaText}</span>
                    </ProjectLaunchButton>
                  ) : (
                    <Link
                      href={model.ctaHref}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-primary hover:text-white dark:hover:bg-purple-600 text-brand-text dark:text-white text-xs font-bold transition-all"
                    >
                      <span>{model.ctaText}</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
