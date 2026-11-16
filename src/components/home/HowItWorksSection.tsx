import { CheckCircle2, Search, Send, MessagesSquare } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'اختار نوع المشروع',
      description: 'حدد تخصص مشروعك سواء موقع شركة، متجر إلكتروني، تطبيق موبايل، أو نظام مخصص.',
      icon: Search,
    },
    {
      number: '02',
      title: 'استكشف النماذج أو اطلب تصميمًا مخصصًا',
      description: 'شوف نماذج الأعمال الحية واطلب مشروع مشابه، أو اختر البدء في تصميم فكرة جديدة تمامًا.',
      icon: CheckCircle2,
    },
    {
      number: '03',
      title: 'ابعت فكرتك وتفاصيلك',
      description: 'اكتب وصف فكرتك، وارفق الصور والملفات، أو سجل رسالة صوتية سريعة بصوتك من المتصفح.',
      icon: Send,
    },
    {
      number: '04',
      title: 'نتواصل معاك لمناقشة الخطوات',
      description: 'نراجع تفاصيل طلبك مباشرة ونتواصل معك عبر الهاتف أو الواتساب لعرض خطة العمل والجدول الزمني.',
      icon: MessagesSquare,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-brand-dark-surface border-b border-brand-border dark:border-brand-dark-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary tracking-wider uppercase bg-brand-subtle dark:bg-brand-dark-border px-3 py-1 rounded-full">
            خطوات بسيطة وسلسة
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text mt-3">
            كيف نعمل؟
          </h2>
          <p className="text-base text-brand-muted dark:text-brand-dark-muted mt-3 leading-relaxed">
            من الفكرة والتصور الأولي حتى التسليم والإطلاق، بنمشي معاك خطوة بخطوة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-brand-bg dark:bg-brand-dark-bg rounded-2xl p-6 border border-brand-border dark:border-brand-dark-border flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-purple-300 dark:text-brand-dark-primary/60">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-subtle dark:bg-brand-dark-border text-brand-primary dark:text-brand-dark-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/60 dark:border-brand-dark-border/60 text-xs font-semibold text-brand-primary dark:text-brand-dark-primary">
                  الخطوة {idx + 1} من 4
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
