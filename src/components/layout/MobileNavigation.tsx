'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useProjectTransition } from '@/components/transitions/ProjectTransitionContext';

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { triggerLaunch } = useProjectTransition();

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const handleLaunch = () => {
    close();
    triggerLaunch('/start-project');
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggle}
        type="button"
        className="p-2 text-brand-text dark:text-brand-dark-text hover:text-brand-primary dark:hover:text-brand-dark-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
        aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-white/98 dark:bg-brand-dark-surface/98 backdrop-blur-md border-t border-brand-border dark:border-brand-dark-border px-6 py-8 flex flex-col justify-between shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-base font-semibold">
            <Link
              href="/"
              onClick={close}
              className="py-2.5 px-3 rounded-lg text-brand-text dark:text-brand-dark-text hover:bg-brand-subtle dark:hover:bg-brand-dark-border hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/projects"
              onClick={close}
              className="py-2.5 px-3 rounded-lg text-brand-text dark:text-brand-dark-text hover:bg-brand-subtle dark:hover:bg-brand-dark-border hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors"
            >
              استكشف المشاريع
            </Link>
            <Link
              href="/#categories"
              onClick={close}
              className="py-2.5 px-3 rounded-lg text-brand-text dark:text-brand-dark-text hover:bg-brand-subtle dark:hover:bg-brand-dark-border hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors"
            >
              تصفح حسب النوع
            </Link>
            <Link
              href="/how-it-works"
              onClick={close}
              className="py-2.5 px-3 rounded-lg text-brand-text dark:text-brand-dark-text hover:bg-brand-subtle dark:hover:bg-brand-dark-border hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors"
            >
              كيف نعمل؟
            </Link>
            <button
              type="button"
              onClick={handleLaunch}
              className="text-right py-2.5 px-3 rounded-lg text-brand-text dark:text-brand-dark-text hover:bg-brand-subtle dark:hover:bg-brand-dark-border hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors font-semibold"
            >
              ابدأ مشروعك
            </button>
          </nav>

          <div className="pt-6 border-t border-brand-border dark:border-brand-dark-border flex flex-col gap-3">
            <button
              type="button"
              onClick={handleLaunch}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-brand-action hover:bg-brand-actionHover dark:bg-brand-dark-action dark:hover:bg-[#E05E00] text-white font-bold shadow-sm"
            >
              <span>ناقش مشروعك</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
