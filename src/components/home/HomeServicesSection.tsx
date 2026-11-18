import Link from 'next/link';
import { getServices } from '@/lib/data';
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
  Sparkles,
} from 'lucide-react';

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

export async function HomeServicesSection() {
  const services = await getServices();

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-brand-dark-surface border-b border-brand-border/60 dark:border-brand-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-subtle dark:bg-brand-dark-border/60 text-xs font-bold text-brand-primary dark:text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent dark:text-brand-dark-action" />
              <span>مجالات وتخصصات الإنتاج الرقمي</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text tracking-tight">
              خدمات هندسية متكاملة تدعم توسع شركتك
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
              حلول برمجية متطورة مصممة وفق أرقى المعايير العالمية لتلبية تحديات الأعمال وتحقيق أعلى كفاءة تشغيلية ومبيعات.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-brand-primary dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold hover:bg-brand-primary hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all self-start md:self-auto"
          >
            <span>عرض كافة الخدمات والمواصفات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid of 8 Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon_name] || Code2;
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-brand-primary/40 dark:hover:border-purple-500/40 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between hover:shadow-lg"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-brand-primary dark:text-purple-300 flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-extrabold text-brand-text dark:text-white group-hover:text-brand-primary dark:group-hover:text-purple-300 transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs text-brand-muted dark:text-brand-dark-muted leading-relaxed line-clamp-3">
                    {service.short_description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-brand-primary dark:text-purple-300 group-hover:text-brand-accent transition-colors">
                  <span>تفاصيل ومواصفات الخدمة</span>
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
