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
  PhoneCall,
} from 'lucide-react';
import { useProjectTransition } from '@/components/transitions/ProjectTransitionContext';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { triggerLaunch } = useProjectTransition();

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  // Strictly lock body scroll when mobile menu is open to prevent page bleed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
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
      description: 'طلب تنفيذ مخصص وسريع من الصفر',
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
        className="p-2.5 rounded-xl bg-slate-100 dark:bg-brand-dark-surface text-brand-text dark:text-brand-dark-text border border-brand-border dark:border-brand-dark-border focus:outline-none focus:ring-2 focus:ring-brand-primary active:scale-95 transition-all"
        aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-brand-primary dark:text-brand-dark-primary" />
        ) : (
          <Menu className="w-6 h-6 text-brand-text dark:text-brand-dark-text" />
        )}
      </button>

      {/* 100% Solid, Opaque Full-Screen Mobile Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex flex-col bg-white dark:bg-[#0B0F19] text-brand-text dark:text-brand-dark-text w-full h-[100dvh] overflow-y-auto"
          style={{
            backgroundColor: 'var(--mobile-menu-bg, #ffffff)',
            color: 'inherit',
          }}
        >
          {/* Top Header inside Drawer */}
          <div className="h-16 sm:h-20 px-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] flex-shrink-0">
            <div onClick={close}>
              <BrandLogo />
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={close}
                type="button"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-text dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors"
                aria-label="إغلاق القائمة"
              >
                <X className="w-6 h-6 text-brand-primary dark:text-brand-dark-primary" />
              </button>
            </div>
          </div>

          {/* Navigation Items List */}
          <div className="flex-1 px-5 py-6 space-y-6 overflow-y-auto bg-white dark:bg-[#0B0F19]">
            <div>
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block px-2 mb-3">
                أقسام المنصة والتنقل
              </span>

              <nav className="space-y-2">
                {navItems.map((item, idx) => {
                  const Icon = item.icon;

                  if (item.isAction) {
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={handleLaunch}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 text-right hover:border-brand-action transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-action text-white flex items-center justify-center shadow-xs">
                            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-orange-950 dark:text-orange-200 group-hover:text-brand-action transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-xs text-orange-800/80 dark:text-orange-300/80 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-brand-action group-hover:-translate-x-1 transition-transform" />
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={close}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800/90 border border-slate-200/70 dark:border-slate-800 text-right transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 text-brand-primary dark:text-brand-dark-primary shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-dark-primary transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick WhatsApp Action Banner */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    تواصل مباشر واتساب
                  </h5>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-300" dir="ltr">
                    01017358087
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/201017358087?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%81%D8%B1%D9%8A%D9%82%20%D8%A3%D9%86%D8%AC%D8%B2%D9%87%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AD%D9%88%D9%84%20%D8%AA%D9%86%D9%81%D9%8A%D8%B0%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
              >
                محادثة
              </a>
            </div>
          </div>

          {/* Bottom Footer inside Drawer */}
          <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19] flex-shrink-0 space-y-3">
            <button
              type="button"
              onClick={handleLaunch}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-brand-action hover:bg-brand-actionHover text-white font-extrabold text-sm shadow-lg shadow-orange-900/20 active:scale-[0.98] transition-all"
            >
              <span>ناقش مشروعك الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 pt-1">
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
