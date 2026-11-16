import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'حدث خطأ غير متوقع',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-red-200 dark:border-red-900/60 p-8 text-center max-w-md mx-auto my-8">
      <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text mb-2">{title}</h3>
      <p className="text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed mb-6">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all shadow-xs"
        >
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}
