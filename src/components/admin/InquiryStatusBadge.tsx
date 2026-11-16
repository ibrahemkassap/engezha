import { InquiryStatus } from '@/types';
import { cn } from '@/lib/utils';

const STATUS_CONFIG: Record<
  InquiryStatus,
  { label: string; className: string }
> = {
  new: {
    label: 'جديد',
    className: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  },
  in_review: {
    label: 'قيد المراجعة',
    className: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  },
  contacted: {
    label: 'تم التواصل',
    className: 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
  },
  in_progress: {
    label: 'قيد التنفيذ',
    className: 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  },
  completed: {
    label: 'مكتمل',
    className: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  },
  closed: {
    label: 'مغلق',
    className: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  },
};

export function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.new;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border',
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
