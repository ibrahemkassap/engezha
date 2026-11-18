import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { MobileNavigation } from './MobileNavigation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { ProjectLaunchButton } from '@/components/transitions/ProjectLaunchButton';
import { Code2 } from 'lucide-react';

export function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-brand-dark-surface border-b border-brand-border dark:border-brand-dark-border transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <BrandLogo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-5 text-sm font-semibold text-brand-text dark:text-brand-dark-text">
            <Link
              href="/"
              className="hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors py-1"
            >
              الرئيسية
            </Link>
            <Link
              href="/projects"
              className="hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors py-1"
            >
              استكشف المشاريع
            </Link>
            <Link
              href="/services"
              className="hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors py-1"
            >
              الخدمات
            </Link>
            <Link
              href="/how-it-works"
              className="hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors py-1"
            >
              كيف نعمل؟
            </Link>
            <Link
              href="/blog"
              className="hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors py-1"
            >
              المدونة
            </Link>
            <Link
              href="/sell-project"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-brand-primary dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 hover:bg-brand-primary hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all text-xs font-bold"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>اعرض مشروع للبيع</span>
            </Link>
          </nav>
        </div>

        {/* Action Button & Mobile Nav */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />

          <ProjectLaunchButton
            href="/start-project"
            variant="header"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-xl"
          >
            <span>ناقش مشروعك</span>
          </ProjectLaunchButton>

          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
