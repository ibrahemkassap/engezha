import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingDisplayProps {
  rating?: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export function StarRatingDisplay({
  rating,
  count = 0,
  size = 'sm',
  showCount = true,
  className,
}: StarRatingDisplayProps) {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-semibold',
  };

  if (!rating || count === 0) {
    return (
      <div className={cn('inline-flex items-center gap-1.5 text-brand-muted', textSizes[size], className)}>
        <span className="text-slate-400">لا توجد تقييمات بعد</span>
      </div>
    );
  }

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              iconSizes[size],
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-slate-100 text-slate-300'
            )}
          />
        ))}
      </div>
      <span className={cn('font-bold text-brand-text dark:text-brand-dark-text', textSizes[size])}>
        {rating.toFixed(1)}
      </span>
      {showCount && (
        <span className={cn('text-brand-muted dark:text-brand-dark-muted', textSizes[size])}>
          ({count} {count === 1 ? 'تقييم' : 'تقييمات'})
        </span>
      )}
    </div>
  );
}
