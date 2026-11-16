'use client';

import { useState } from 'react';
import { StarRatingInput } from './StarRatingInput';
import { reviewSchema } from '@/lib/validations/review';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Review } from '@/types';

interface ReviewFormProps {
  projectId: string;
  onReviewSubmitted?: (newReview: Review) => void;
}

export function ReviewForm({ projectId, onReviewSubmitted }: ReviewFormProps) {
  const [displayName, setDisplayName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = reviewSchema.safeParse({
      projectId,
      displayName,
      rating,
      comment,
    });

    if (!validation.success) {
      setErrorMessage(validation.error.issues[0]?.message || 'بيانات غير صالحة');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل إرسال التقييم');
      }

      setIsSuccess(true);
      setDisplayName('');
      setComment('');
      setRating(5);
      if (onReviewSubmitted && data.review) {
        onReviewSubmitted(data.review);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء حفظ التقييم';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-brand-border dark:border-brand-dark-border p-6 shadow-sm transition-colors">
      <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text mb-1">
        شاركنا رأيك في هذا العمل
      </h3>
      <p className="text-xs text-brand-muted dark:text-brand-dark-muted mb-5">
        تقييمك الحقيقي يساعدنا ويساعد العملاء الآخرين في اتخاذ القرار.
      </p>

      {isSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span>تم نشر تقييمك بنجاح! شكرًا لمشاركتك رأيك.</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-2">
            تقييمك العام للمشروع
          </label>
          <StarRatingInput
            value={rating}
            onChange={(val) => setRating(val)}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="displayName" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
            اسمك الكريم
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={loading}
            placeholder="مثال: أحمد عبد الله"
            className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-brand-bg dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-dark-primary placeholder:text-slate-400 dark:placeholder:text-brand-dark-muted/60"
            required
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1.5">
            تعليقك وملاحظاتك
          </label>
          <textarea
            id="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loading}
            placeholder="اكتب ما أعجبك في هذا النموذج أو أي اقتراح تراه مفيدًا..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-brand-bg dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-dark-primary placeholder:text-slate-400 dark:placeholder:text-brand-dark-muted/60"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary dark:bg-brand-dark-primary text-white text-sm font-bold hover:bg-brand-primaryHover dark:hover:bg-purple-600 disabled:opacity-50 transition-all shadow-sm"
        >
          {loading ? (
            <span>جاري الإرسال...</span>
          ) : (
            <>
              <span>إرسال التقييم</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
