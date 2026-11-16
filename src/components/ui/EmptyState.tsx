import { LucideIcon, FolderSearch } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export function EmptyState({
  title,
  description,
  icon: Icon = FolderSearch,
  actionText,
  actionHref,
  onActionClick,
}: EmptyStateProps) {
  return (
    <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-dashed border-brand-border dark:border-brand-dark-border p-12 text-center max-w-md mx-auto my-8 transition-colors">
      <div className="w-14 h-14 rounded-2xl bg-brand-subtle dark:bg-brand-dark-border text-brand-primary dark:text-brand-dark-primary flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text mb-2">{title}</h3>
      <p className="text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed mb-6">
        {description}
      </p>

      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary dark:bg-brand-dark-primary text-white text-xs font-bold hover:bg-brand-primaryHover dark:hover:bg-purple-600 transition-all shadow-xs"
        >
          {actionText}
        </Link>
      )}

      {actionText && onActionClick && !actionHref && (
        <button
          type="button"
          onClick={onActionClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary dark:bg-brand-dark-primary text-white text-xs font-bold hover:bg-brand-primaryHover dark:hover:bg-purple-600 transition-all shadow-xs"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
