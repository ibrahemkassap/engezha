'use client';

import React from 'react';
import { useProjectTransition } from './ProjectTransitionContext';
import { Rocket, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectLaunchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'header' | 'glow';
  showIcon?: boolean;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
}

export function ProjectLaunchButton({
  href = '/start-project',
  variant = 'primary',
  showIcon = true,
  iconPosition = 'left',
  children = 'ابدأ مشروعك',
  className,
  onClick,
  ...props
}: ProjectLaunchButtonProps) {
  const { triggerLaunch, isTransitioning } = useProjectTransition();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If middle click or special keys, allow standard browser behavior if wrapped in anchor, else handle
    if (e.metaKey || e.ctrlKey) {
      window.open(href, '_blank');
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);
    triggerLaunch(href);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'glow':
        return 'relative overflow-hidden group bg-gradient-to-r from-purple-700 via-brand-primary to-orange-500 hover:from-purple-800 hover:to-orange-600 text-white font-extrabold shadow-lg shadow-purple-900/30 hover:shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98]';
      case 'accent':
        return 'bg-brand-action hover:bg-brand-actionHover dark:bg-brand-dark-action dark:hover:bg-[#E05E00] text-white font-bold shadow-md shadow-orange-900/20 active:scale-[0.98]';
      case 'header':
        return 'bg-brand-action hover:bg-brand-actionHover dark:bg-brand-dark-action dark:hover:bg-[#E05E00] text-white text-sm font-bold shadow-sm shadow-orange-900/15 active:scale-[0.98]';
      case 'secondary':
        return 'bg-white dark:bg-brand-dark-surface border border-brand-border dark:border-brand-dark-border text-brand-text dark:text-brand-dark-text font-bold hover:bg-slate-50 dark:hover:bg-brand-dark-border/60 shadow-xs active:scale-[0.98]';
      case 'primary':
      default:
        return 'bg-brand-primary dark:bg-brand-dark-primary text-white font-bold hover:bg-brand-primaryHover dark:hover:bg-purple-600 shadow-md shadow-purple-900/20 active:scale-[0.98]';
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isTransitioning}
      className={cn(
        'inline-flex items-center justify-center gap-2.5 transition-all duration-200 select-none cursor-pointer',
        getVariantStyles(),
        className
      )}
      {...props}
    >
      {/* Optional shiny reflective light sweep effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

      {showIcon && iconPosition === 'right' && (
        <Rocket className="w-4 h-4 text-orange-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}

      <span>{children}</span>

      {showIcon && iconPosition === 'left' && (
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      )}
    </button>
  );
}
