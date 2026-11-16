'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ArrowLeft,
  Home,
  Layers,
  LayoutGrid,
  HelpCircle,
  Rocket,
  ChevronLeft,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { useProjectTransition } from '@/components/transitions/ProjectTransitionContext';

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { triggerLaunch } = useProjectTransition();

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  // Lock body scroll when mobile menu is open to prevent page bleed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const handleLaunch = () => {
    close();
    triggerLaunch('/start-project');
  };

  const navItems = [
    {
      title: 'الرئيسية',
      description: 'واجهة المنصة وأحدث الأعمال',
      href: '/',
      icon: Home,
      isAction: false,
    },
    {
      title: 'استكشف المشاريع',
      description: 'معرض النماذج الحية المنفذة',
      href: '/projects',
      icon: Layers,
      isAction: false,
    },
    {
      title: 'تصفح حسب النوع',
      description: 'مواقع، متاجر، وتطبيقات',
      href: '/#categories',
      icon: LayoutGrid,
      isAction: false,
    },
    {
      title: 'كيف نعمل؟',
      description: 'خطوات التنفيذ من الفكرة للتسليم',
      href: '/how-it-works',
      icon: HelpCircle,
      isAction: false,
    },
    {
      title: 'ابدأ مشروعك الرقمي',
      description: 'طلب تنفيذ مخصص من الصفر',
      href: '/start-project',
      icon: Rocket,
      isAction: true,
      highlight: true,
    },
  ];

  return (
    <div className="md:hidden">
      {/* Menu Toggle Button */}
      <button
        onClick={toggle}
        type="button"
        className="p-2.5 rounded-xl text-brand-text dark:text-brand-dark-text hover:bg-brand-subtle dark:hover:bg-brand-dark-border focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
        aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-brand-primary dark:text-brand-dark-primary" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Full-Screen Mobile Drawer with 100% Solid Opaque Background */}
      {isOpen && (
        <div
          className="fixed inset-x-0 top-16 sm:top-20 bottom-0 z-[100] flex flex-col justify-between overflow-y-auto bg-white dark:bg-[#120E24] border-t border-brand-border dark:border-brand-dark-border px-5 py-6 shadow-2xl transition-all"
        >
          {/* Navigation Items List */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-brand-muted dark:text-brand-dark-muted uppercase tracking-wider block px-2 mb-3">
              روابط التنقل
            </span>

            <nav className="space-y-1.5">
              {navItems.map((item, idx) => {
                const Icon = item.icon;

                if (item.isAction) {
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={handleLaunch}
                      className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-brand-subtle/80 dark:bg-brand-dark-surface border border-purple-200/60 dark:border-brand-dark-border text-right hover:border-brand-primary transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-xs">
                          <Icon className="w-5 h-5 text-orange-300 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-brand-text dark:text-brand-dark-text group-hover:text-brand-primary dark:group-hover:text-brand-dark-primary transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <ChevronLeft className="w-4 h-4 text-brand-muted dark:text-brand-dark-muted group-hover:-translate-x-1 transition-transform" />
                    </button>
                  );
                }

                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={close}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-brand-dark-surface/60 border border-transparent hover:border-brand-border dark:hover:border-brand-dark-border text-right transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-brand-dark-surface text-brand-muted dark:text-brand-dark-muted flex items-center justify-center group-hover:bg-brand-subtle dark:group-hover:bg-brand-dark-border group-hover:text-brand-primary dark:group-hover:text-brand-dark-primary transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-text dark:text-brand-dark-text group-hover:text-brand-primary dark:group-hover:text-brand-dark-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-brand-muted dark:text-brand-dark-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-slate-300 dark:text-brand-dark-muted group-hover:-translate-x-1 transition-transform" />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Call to Action and Contact */}
          <div className="pt-6 mt-6 border-t border-brand-border/80 dark:border-brand-dark-border space-y-4">
            <button
              type="button"
              onClick={handleLaunch}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-brand-action hover:bg-brand-actionHover dark:bg-brand-dark-action dark:hover:bg-[#E05E00] text-white font-bold text-sm shadow-md shadow-orange-900/20 active:scale-[0.98] transition-all"
            >
              <span>ناقش مشروعك الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-xs text-brand-muted dark:text-brand-dark-muted px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>فكرتك تستاهل تتنفذ باحتراف</span>
              </span>
              <a
                href="mailto:ibrahem.kassap@gmail.com"
                className="flex items-center gap-1 hover:text-brand-primary dark:hover:text-brand-dark-primary"
                dir="ltr"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>ibrahem.kassap@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
