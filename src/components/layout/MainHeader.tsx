import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { MobileNavigation } from './MobileNavigation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { ProjectLaunchButton } from '@/components/transitions/ProjectLaunchButton';

export function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-brand-dark-surface border-b border-brand-border dark:border-brand-dark-border transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <BrandLogo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-brand-text dark:text-brand-dark-text">
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
              href="/#categories"
              className="hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors py-1"
            >
              تصفح حسب النوع
            </Link>
            <Link
              href="/how-it-works"
              className="hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors py-1"
            >
              كيف نعمل؟
            </Link>
            <ProjectLaunchButton
              href="/start-project"
              showIcon={false}
              className="border-none bg-transparent hover:bg-transparent shadow-none p-0 text-sm font-semibold text-brand-text dark:text-brand-dark-text hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors py-1"
            >
              ابدأ مشروعك
            </ProjectLaunchButton>
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
