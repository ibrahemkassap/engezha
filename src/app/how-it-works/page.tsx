import { Metadata } from 'next';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { CustomProjectCta } from '@/components/home/CustomProjectCta';
import { ShieldCheck, Zap, Headphones, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'كيف نعمل في انجزها؟ | مراحل التنفيذ والتسليم',
  description:
    'تعرف على منهجية العمل في منصة انجزها من الفكرة والتخطيط وحتى البرمجة والإطلاق والمتابعة المستمرة.',
};

export default function HowItWorksPage() {
  const pillars = [
    {
      title: 'دراسة وتحديد المتطلبات',
      desc: 'بنسمع فكرتك، بنحلل الاحتياج الفعلي وسلوك المستخدمين، وبنحدد نطاق العمل والميزات الأساسية بدقة.',
      icon: Headphones,
    },
    {
      title: 'تصميم الواجهات وتجربة المستخدم',
      desc: 'بنبني واجهات حديثة متجاوبة مع كافة الشاشات، بتراعي أعلى معايير سهولة الاستخدام والهوية البصرية.',
      icon: Code2,
    },
    {
      title: 'تطوير برمجي آمن ومتين',
      desc: 'كتابة كود نظيف باستخدام أحدث التقنيات السحابية مع قواعد بيانات مؤمنة وسرعة تحميل فائقة.',
      icon: ShieldCheck,
    },
    {
      title: 'الاختبار والإطلاق والمتابعة',
      desc: 'فحص جودة شامل لجميع الوظائف، وربط بوابات الدفع والإشعارات، وإطلاق حي مع دعم فني مستمر.',
      icon: Zap,
    },
  ];

  return (
    <>
      <MainHeader />
      <main className="flex-1 bg-brand-bg dark:bg-brand-dark-bg transition-colors">
        {/* Hero */}
        <section className="py-16 bg-white dark:bg-brand-dark-surface border-b border-brand-border dark:border-brand-dark-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary uppercase tracking-wider bg-brand-subtle dark:bg-brand-dark-border px-3 py-1 rounded-full">
              المنهجية والاحترافية
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text dark:text-brand-dark-text">
              كيف نحول فكرتك إلى واقع رقمي؟
            </h1>
            <p className="text-base text-brand-muted dark:text-brand-dark-muted max-w-2xl mx-auto leading-relaxed">
              في انجزها، بنقدم نموذج عمل مرن وسريع يجمع بين استلهام النماذج الناجحة والتنفيذ البرمجي المخصص بأعلى معايير الجودة.
            </p>
          </div>
        </section>

        {/* 4 Steps */}
        <HowItWorksSection />

        {/* Quality Pillars */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text dark:text-brand-dark-text">
              معاييرنا الهندسية في كل مشروع
            </h2>
            <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-2">
              مش بنسلم كود وبس، بنبني منتج رقمي متكامل يعتمد عليه.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-brand-border dark:border-brand-dark-border p-6 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-subtle dark:bg-brand-dark-border text-brand-primary dark:text-brand-dark-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
                    {pil.title}
                  </h3>
                  <p className="text-xs text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <CustomProjectCta />
      </main>
      <MainFooter />
    </>
  );
}
