import { cn } from '@/lib/utils';

interface TechnologyTagProps {
  tag: string;
  className?: string;
}

export function TechnologyTag({ tag, className }: TechnologyTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-brand-subtle/70 dark:bg-brand-dark-border text-brand-text dark:text-brand-dark-text border border-brand-border/60 dark:border-brand-dark-border',
        className
      )}
    >
      {tag}
    </span>
  );
}
