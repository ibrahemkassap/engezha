import { Metadata } from 'next';
import Link from 'next/link';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { getServices } from '@/lib/data';
import { ProjectLaunchButton } from '@/components/transitions/ProjectLaunchButton';
import {
  Building2,
  ShoppingBag,
  Smartphone,
  LayoutDashboard,
  Cpu,
  Code2,
  ShieldCheck,
  Search,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'خدمات الإنتاج البرمجي والحلول الرقمية | أنجزها',
  description:
    'استكشف خدمات أنجزها المتكاملة: تطوير المواقع، المتاجر الإلكترونية، تطبيقات الموبايل، الأنظمة الإدارية، الذكاء الاصطناعي، والصيانة السحابية.',
  openGraph: {
    title: 'خدمات الإنتاج الرقمي | أنجزها',
    description:
      'نصمم ونطور البرمجيات والأنظمة التي تساعد أعمالك على النمو والريادة.',
  },
};

const iconMap: Record<string, React.ElementType> = {
  Building2,
  ShoppingBag,
  Smartphone,
  LayoutDashboard,
  Cpu,
  Code2,
  ShieldCheck,
  Search,
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <MainHeader />
      <main className="flex-1 w-full max-w-full overflow-x-hidden bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-200">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 overflow-hidden border-b border-brand-border/60 dark:border-brand-dark-border/60">
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-purple-200/50 dark:from-brand-dark-primary/10 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-subtle dark:bg-brand-dark-surface border border-brand-border dark:border-brand-dark-border text-xs font-bold text-brand-primary dark:text-brand-dark-primary">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent dark:text-brand-dark-action" />
              <span>قدرات هندسية متكاملة لرواد الأعمال والشركات</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brand-text dark:text-brand-dark-text tracking-tight">
              خدمات الإنتاج الرقمي <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-800 to-purple-950 dark:from-purple-300 dark:to-purple-500">
                من الفكرة إلى الإطلاق الكامل
              </span>
            </h1>

            <p className="text-base sm:text-lg text-brand-muted dark:text-brand-dark-muted max-w-3xl mx-auto leading-relaxed">
              سواء كنت تبحث عن إطلاق موقع جديد لشركتك، بناء متجر إلكتروني فائق التحويل، تطوير تطبيق موبايل، أو أتمتة عملياتك بنظام ERP ذكي، نوفر لك خبرة هندسية متكاملة تضمن أعلى عائد على استثمارك.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <ProjectLaunchButton
                href="/start-project"
                variant="glow"
                className="px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg"
              >
                <span>طلب استشارة أو مشروع جديد</span>
              </ProjectLaunchButton>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-brand-dark-surface border border-brand-border dark:border-brand-dark-border text-brand-text dark:text-brand-dark-text font-bold text-sm hover:border-brand-primary transition-all shadow-xs"
              >
                <Layers className="w-4 h-4 text-brand-primary dark:text-brand-dark-primary" />
                <span>استكشف النماذج الجاهزة</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = iconMap[service.icon_name] || Code2;
                return (
                  <div
                    key={service.id}
                    className="group relative bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-7 shadow-xs hover:shadow-xl hover:border-brand-primary/40 dark:hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-brand-subtle dark:bg-brand-dark-border/60 text-brand-primary dark:text-purple-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {service.hero_badge}
                        </span>
                      </div>

                      <h2 className="text-xl font-extrabold text-brand-text dark:text-brand-dark-text group-hover:text-brand-primary dark:group-hover:text-purple-300 transition-colors">
                        {service.title}
                      </h2>

                      <p className="text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed line-clamp-3">
                        {service.short_description}
                      </p>

                      <div className="pt-3 border-t border-brand-border/60 dark:border-brand-dark-border/60 space-y-2">
                        {service.benefits.slice(0, 3).map((benefit, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-brand-border/60 dark:border-brand-dark-border/60 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                        {service.timeline_estimate}
                      </span>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-primary dark:text-purple-300 hover:text-brand-accent transition-colors"
                      >
                        <span>تفاصيل الخدمة ومواصفاتها</span>
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workflow Banner */}
        <section className="py-16 bg-purple-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              منهجية إنتاج واضحة وشفافة 100%
            </h2>
            <p className="text-sm sm:text-base text-purple-200 max-w-2xl mx-auto leading-relaxed">
              لا توجد تكاليف خفية أو مواعيد تسليم وهمية. نحدد معك نطاق العمل بدقة، نوقع اتفاقية عدم إفصاح، ونسلمك تقارير أسبوعية حية حتى استلام مشروعك بنجاح.
            </p>
            <div className="pt-4 flex justify-center">
              <ProjectLaunchButton
                href="/start-project"
                variant="glow"
                className="px-8 py-3.5 rounded-xl font-bold shadow-xl"
              >
                <span>ابدأ رحلة مشروعك الآن</span>
              </ProjectLaunchButton>
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </>
  );
}
