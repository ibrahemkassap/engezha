import Link from 'next/link';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <MainHeader />
      <main className="flex-1 flex items-center justify-center py-20 bg-brand-bg dark:bg-brand-dark-bg px-4 transition-colors">
        <div className="max-w-md w-full bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-8 sm:p-10 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-brand-subtle dark:bg-brand-primary/20 text-brand-primary dark:text-brand-dark-primary flex items-center justify-center mx-auto mb-6">
            <Compass className="w-8 h-8" />
          </div>

          <span className="text-4xl font-extrabold text-brand-primary dark:text-brand-dark-primary font-mono block mb-2" dir="ltr">
            404
          </span>

          <h1 className="text-2xl font-extrabold text-brand-text dark:text-brand-dark-text mb-3">
            الصفحة غير موجودة
          </h1>

          <p className="text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed mb-8">
            يبدو أن الرابط الذي حاولت الوصول إليه غير صحيح أو قد تم نقل المشروع لعنوان آخر.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold transition-all shadow-xs"
            >
              العودة للرئيسية
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-brand-dark-surface hover:bg-slate-200 dark:hover:bg-brand-dark-border text-slate-700 dark:text-brand-dark-text border border-transparent dark:border-brand-dark-border text-xs font-semibold transition-all inline-flex items-center justify-center gap-1.5"
            >
              <span>تصفح المشاريع</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
