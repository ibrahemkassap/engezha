'use client';

import { useEffect, useState } from 'react';
import { Review } from '@/types';
import { StarRatingDisplay } from './StarRatingDisplay';
import { ReviewForm } from './ReviewForm';
import { createClient } from '@/lib/supabase/client';
import { formatArabicDate } from '@/lib/utils';
import { MessageSquare, User } from 'lucide-react';

interface ReviewListProps {
  projectId: string;
  initialReviews?: Review[];
}

export function ReviewList({
  projectId,
  initialReviews = [],
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const count = reviews.length;
  const avgRating =
    count > 0
      ? parseFloat(
          (reviews.reduce((acc, curr) => acc + curr.rating, 0) / count).toFixed(1)
        )
      : undefined;

  // Supabase Realtime subscription
  useEffect(() => {
    try {
      const supabase = createClient();
      const channel = supabase
        .channel(`project-reviews-${projectId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'reviews',
            filter: `project_id=eq.${projectId}`,
          },
          (payload) => {
            const newRev = payload.new as Review;
            if (!newRev.is_hidden) {
              setReviews((prev) => [newRev, ...prev.filter((r) => r.id !== newRev.id)]);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch {
      // Offline / fallback mode
    }
  }, [projectId]);

  const handleNewReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev.filter((r) => r.id !== newReview.id)]);
  };

  return (
    <div className="space-y-8">
      {/* Header and Summary */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-brand-border dark:border-brand-dark-border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <h2 className="text-xl font-bold text-brand-text dark:text-brand-dark-text flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-primary dark:text-brand-dark-primary" />
            <span>آراء وتقييمات العملاء</span>
          </h2>
          <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1">
            ملاحظات وتجارب حقيقية من زوار وعملاء المنصة
          </p>
        </div>

        <StarRatingDisplay rating={avgRating} count={count} size="md" />
      </div>

      {/* Submission Form */}
      <ReviewForm projectId={projectId} onReviewSubmitted={handleNewReview} />

      {/* Reviews listing */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-dashed border-brand-border dark:border-brand-dark-border p-10 text-center transition-colors">
            <MessageSquare className="w-10 h-10 text-slate-300 dark:text-brand-dark-muted/50 mx-auto mb-3" />
            <h4 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
              لسه مفيش تقييمات. كن أول من يشارك رأيه.
            </h4>
            <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1 max-w-sm mx-auto">
              شاركنا انطباعك عن هذا النموذج ومستوى تصميمه من خلال النموذج أعلاه.
            </p>
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-brand-border dark:border-brand-dark-border p-5 shadow-xs space-y-3 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-subtle dark:bg-brand-dark-border text-brand-primary dark:text-brand-dark-primary flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-text dark:text-brand-dark-text">
                      {rev.display_name}
                    </h4>
                    <span className="text-[11px] text-brand-muted dark:text-brand-dark-muted">
                      {formatArabicDate(rev.created_at)}
                    </span>
                  </div>
                </div>

                <StarRatingDisplay
                  rating={rev.rating}
                  count={1}
                  showCount={false}
                  size="sm"
                />
              </div>

              <p className="text-sm text-slate-700 dark:text-brand-dark-muted leading-relaxed pr-10">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
