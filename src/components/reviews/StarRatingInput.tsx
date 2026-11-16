'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function StarRatingInput({
  value,
  onChange,
  disabled = false,
}: StarRatingInputProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const activeRating = hoverValue ?? value;

  return (
    <div
      className="flex items-center gap-1.5"
      role="radiogroup"
      aria-label="اختر التقييم من 1 إلى 5 نجوم"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= activeRating;
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(null)}
            className="p-1 rounded-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} من 5 نجوم`}
          >
            <Star
              className={cn(
                'w-7 h-7 transition-colors',
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-slate-100 text-slate-300'
              )}
            />
          </button>
        );
      })}

      <span className="text-sm font-bold text-brand-text dark:text-brand-dark-text mr-2">
        {value > 0 ? `${value} من 5` : 'اختر التقييم'}
      </span>
    </div>
  );
}
