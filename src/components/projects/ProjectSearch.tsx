'use client';

import { Search, X } from 'lucide-react';

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ProjectSearch({
  value,
  onChange,
  placeholder = 'ابحث بالاسم أو التقنية أو الكلمات المفتاحية...',
}: ProjectSearchProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-brand-muted dark:text-brand-dark-muted">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text placeholder:text-slate-400 dark:placeholder:text-brand-dark-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-dark-primary transition-all"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 dark:text-brand-dark-muted hover:text-brand-text dark:hover:text-brand-dark-text"
          aria-label="مسح البحث"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
