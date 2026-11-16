import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Layers, ShieldCheck, Zap } from 'lucide-react';
import { ProjectLaunchButton } from '@/components/transitions/ProjectLaunchButton';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-bg dark:bg-brand-dark-bg pt-12 pb-20 lg:pt-20 lg:pb-28 transition-colors duration-200">
      {/* Clean subtle ambient glow matching logo purple */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-purple-100/70 dark:from-brand-dark-primary/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-subtle dark:bg-brand-dark-surface border border-brand-border dark:border-brand-dark-border text-xs font-bold text-brand-primary dark:text-brand-dark-primary">
              <span className="w-2 h-2 rounded-full bg-brand-accent dark:bg-brand-dark-action animate-pulse" />
              <span>منصة تنفيذ المشاريع الرقمية والنماذج الجاهزة</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-text dark:text-brand-dark-text leading-[1.2] tracking-tight">
              فكرتك تستاهل <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-800 to-purple-950 dark:from-purple-300 dark:to-purple-500">
                تتنفذ باحتراف
              </span>
            </h1>

            <p className="text-base sm:text-lg text-brand-muted dark:text-brand-dark-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              من المواقع والمتاجر الإلكترونية إلى تطبيقات الموبايل والأنظمة السحابية. اكتشف نماذج حقيقية قابلة للتخصيص، أو ابدأ مشروعك الجديد بالكامل من الصفر.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-primary dark:bg-brand-dark-primary text-white font-bold text-base hover:bg-brand-primaryHover dark:hover:bg-purple-600 transition-all shadow-md shadow-purple-900/20 active:scale-[0.98]"
              >
                <span>استكشف المشاريع</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>

              <ProjectLaunchButton
                href="/start-project"
                variant="glow"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base shadow-xl"
              >
                <span>ابدأ مشروعك</span>
              </ProjectLaunchButton>
            </div>

            {/* Value Highlights */}
            <div className="pt-6 border-t border-brand-border/60 dark:border-brand-dark-border/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-brand-muted dark:text-brand-dark-muted font-medium">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-primary dark:text-brand-dark-primary" />
                <span>نماذج حقيقية قابلة للتخصيص</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>تنفيذ برمجي آمن ومتكامل</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-accent dark:text-brand-dark-action" />
                <span>تسليم سريع ومتابعة دقيقة</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Back Card Preview */}
              <div className="absolute -top-6 -left-4 w-11/12 h-64 bg-slate-900 dark:bg-brand-dark-surface rounded-2xl shadow-xl overflow-hidden opacity-40 blur-[1px] transform -rotate-3 transition-transform pointer-events-none" />

              {/* Main Visual Project Showcase Card */}
              <div className="relative bg-white dark:bg-brand-dark-surface rounded-2xl border border-brand-border dark:border-brand-dark-border p-4 shadow-2xl transition-transform hover:-translate-y-1 duration-300">
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-slate-950 border border-brand-border/60 dark:border-brand-dark-border/60">
                  <Image
                    src="/projects/miraj-cover.png"
                    alt="معاينة منصة ميراج لحجوزات الطيران الخاص"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute top-3 right-3 bg-amber-600/90 backdrop-blur-sm text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                    طيران وخدمات VIP
                  </div>
                </div>

                <div className="p-3 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-brand-text dark:text-brand-dark-text">
                      منصة ميراج للطيران الخاص
                    </h4>
                    <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-0.5">
                      حجز طائرات رجال الأعمال وخدمات الكونسيرج
                    </p>
                  </div>
                  <Link
                    href="/projects/miraj-vip-aviation"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-action hover:bg-brand-actionHover text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>معاينة وطلب</span>
                    <ArrowLeft className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 dark:bg-brand-dark-surface/95 backdrop-blur-md border border-brand-border dark:border-brand-dark-border rounded-xl p-3 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-text dark:text-brand-dark-text">
                    جاهز للبناء والتشغيل
                  </p>
                  <p className="text-[11px] text-brand-muted dark:text-brand-dark-muted">
                    كود نظيف وتصميم عصري
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
