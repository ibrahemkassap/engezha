import Link from 'next/link';
import { ProjectCategory } from '@/types';
import {
  Building2,
  ShoppingBag,
  Smartphone,
  Gamepad2,
  UserCheck,
  CalendarCheck,
  LayoutDashboard,
  Compass,
  ArrowLeft,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  ShoppingBag,
  Smartphone,
  Gamepad2,
  UserCheck,
  CalendarCheck,
  LayoutDashboard,
  Compass,
};

interface CategoryCardProps {
  category: ProjectCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = ICON_MAP[category.icon_name] || Building2;
  const isCustomMode = category.slug === 'custom-design';

  return (
    <Link
      href={
        isCustomMode
          ? '/start-project?mode=custom'
          : `/projects?category=${category.slug}`
      }
      className={cn(
        'group relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:shadow-lg',
        isCustomMode
          ? 'bg-gradient-to-br from-brand-deep to-slate-900 dark:from-brand-dark-surface dark:to-brand-dark-bg border-brand-primary/40 dark:border-brand-dark-border text-white'
          : 'bg-white dark:bg-brand-dark-surface border-brand-border dark:border-brand-dark-border text-brand-text dark:text-brand-dark-text hover:border-brand-primary/40 dark:hover:border-brand-dark-primary/50'
      )}
    >
      <div>
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110',
            isCustomMode
              ? 'bg-brand-primary dark:bg-brand-dark-primary text-white shadow-md shadow-purple-900/30'
              : 'bg-brand-subtle dark:bg-brand-dark-border text-brand-primary dark:text-brand-dark-primary'
          )}
        >
          <IconComponent className="w-6 h-6" />
        </div>

        <h3
          className={cn(
            'text-lg font-bold mb-2 transition-colors',
            isCustomMode
              ? 'text-white'
              : 'text-brand-text dark:text-brand-dark-text group-hover:text-brand-primary dark:group-hover:text-brand-dark-primary'
          )}
        >
          {category.name}
        </h3>

        <p
          className={cn(
            'text-sm leading-relaxed',
            isCustomMode ? 'text-slate-300 dark:text-brand-dark-muted' : 'text-brand-muted dark:text-brand-dark-muted'
          )}
        >
          {category.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-brand-border/40 dark:border-brand-dark-border flex items-center gap-1.5 text-xs font-bold">
        <span
          className={cn(
            isCustomMode ? 'text-brand-accent dark:text-brand-dark-action' : 'text-brand-primary dark:text-brand-dark-primary'
          )}
        >
          {isCustomMode ? 'ابدأ فكرتك من الصفر' : 'استعراض النماذج'}
        </span>
        <ArrowLeft
          className={cn(
            'w-3.5 h-3.5 transition-transform group-hover:-translate-x-1',
            isCustomMode ? 'text-brand-accent dark:text-brand-dark-action' : 'text-brand-primary dark:text-brand-dark-primary'
          )}
        />
      </div>
    </Link>
  );
}
