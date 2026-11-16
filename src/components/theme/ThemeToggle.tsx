'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-xl border border-brand-border/60 bg-white/60 dark:bg-brand-dark-surface dark:border-brand-dark-border"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-xl text-brand-muted hover:text-brand-text dark:text-brand-dark-muted dark:hover:text-brand-dark-text bg-brand-subtle/50 hover:bg-brand-subtle dark:bg-brand-dark-surface dark:hover:bg-brand-dark-border border border-brand-border/50 dark:border-brand-dark-border transition-all duration-200"
      aria-label={isDark ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
      title={isDark ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-[#FF7A1A]" />
      ) : (
        <Moon className="w-5 h-5 text-brand-primary" />
      )}
    </button>
  );
}
