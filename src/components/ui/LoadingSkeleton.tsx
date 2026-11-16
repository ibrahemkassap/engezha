export function LoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-brand-border p-4 space-y-4 animate-pulse"
        >
          <div className="aspect-[16/10] bg-slate-200 rounded-xl w-full" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="h-5 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-full" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-6 bg-slate-200 rounded w-16" />
            <div className="h-6 bg-slate-200 rounded w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
