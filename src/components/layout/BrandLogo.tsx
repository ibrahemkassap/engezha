import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
}

export function BrandLogo({ className, variant = 'dark', showSubtitle = false }: BrandLogoProps) {
  const isLight = variant === 'light';

  return (
    <Link
      href="/"
      className={cn(
        'inline-flex items-center gap-3 transition-opacity hover:opacity-90 select-none group',
        className
      )}
      aria-label="الصفحة الرئيسية لمنصة أنجزها"
    >
      {/* SVG Icon Mark — exact replica of user-provided logo icon */}
      <div className="relative flex-shrink-0 w-10 h-10 group-hover:scale-105 transition-transform duration-200">
        <svg
          viewBox="0 0 220 220"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="blIconBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B21A8" />
              <stop offset="50%" stopColor="#4C1D95" />
              <stop offset="100%" stopColor="#2E1065" />
            </linearGradient>
            <linearGradient id="blCheck" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E9D5FF" />
            </linearGradient>
            <linearGradient id="blOrange" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF5722" />
              <stop offset="100%" stopColor="#FFA000" />
            </linearGradient>
            <filter id="blShadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#2E1065" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Rounded square background */}
          <rect x="0" y="0" width="220" height="220" rx="48" fill="url(#blIconBg)" filter="url(#blShadow)" />

          {/* Tech dots grid */}
          <g fill="#A855F7" opacity="0.3">
            <circle cx="45" cy="55" r="3.5" />
            <circle cx="60" cy="55" r="3.5" />
            <circle cx="45" cy="70" r="3.5" />
            <circle cx="60" cy="70" r="3.5" />
            <circle cx="160" cy="155" r="3.5" />
            <circle cx="175" cy="155" r="3.5" />
            <circle cx="160" cy="170" r="3.5" />
            <circle cx="175" cy="170" r="3.5" />
          </g>

          {/* Circuit accent lines */}
          <path
            d="M 40 120 L 70 90 M 130 180 L 165 145 M 150 60 L 175 35"
            stroke="#C084FC"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
            strokeDasharray="4 4"
          />

          {/* Main checkmark */}
          <path
            d="M 45 115 L 92 162 C 95 165 100 165 103 162 L 165 100 L 138 73 L 97 114 L 68 85 Z"
            fill="url(#blCheck)"
          />

          {/* Orange rocket tip */}
          <path
            d="M 165 100 L 195 70 C 198 67 196 60 190 58 C 175 52 150 61 138 73 Z"
            fill="url(#blOrange)"
          />

          {/* Flame dot */}
          <circle cx="186" cy="52" r="5" fill="#FFA000" />
        </svg>
      </div>

      {/* Brand text */}
      <div className="flex flex-col leading-none gap-0.5">
        {/* Arabic name */}
        <span
          className={cn(
            'font-black text-[22px] leading-none tracking-tight',
            isLight
              ? 'text-white'
              : 'text-[#2E1065] dark:text-white'
          )}
          style={{ fontFamily: "'Cairo', 'Segoe UI', Tahoma, sans-serif" }}
        >
          أنجزها
        </span>

        {/* English name */}
        <span
          className={cn(
            'font-bold text-[11px] tracking-[3px] uppercase leading-none',
            isLight
              ? 'text-purple-200'
              : 'text-[#3B0764] dark:text-purple-300'
          )}
        >
          ENGEZHA
        </span>

        {/* Subtitle — shown only when explicitly requested */}
        {showSubtitle && (
          <span
            className={cn(
              'text-[9px] font-semibold tracking-wide leading-none mt-1 hidden lg:block',
              isLight ? 'text-purple-300' : 'text-brand-muted dark:text-brand-dark-muted'
            )}
          >
            لتطوير المواقع والتطبيقات
          </span>
        )}
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Full-width standalone logo — used in hero banners, auth pages, print assets.
   Renders the complete SVG exactly as provided by the brand guide.
───────────────────────────────────────────────────────────────────────────── */
export function BrandLogoFull({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      className={cn('w-full h-auto', className)}
      aria-label="شعار أنجزها — لتطوير المواقع والتطبيقات"
      role="img"
    >
      <defs>
        <linearGradient id="fIconBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B21A8" />
          <stop offset="50%" stopColor="#4C1D95" />
          <stop offset="100%" stopColor="#2E1065" />
        </linearGradient>
        <linearGradient id="fCheck" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E9D5FF" />
        </linearGradient>
        <linearGradient id="fOrange" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF5722" />
          <stop offset="100%" stopColor="#FFA000" />
        </linearGradient>
        <filter id="fShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#2E1065" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Icon */}
      <g transform="translate(80, 100)" filter="url(#fShadow)">
        <rect x="0" y="0" width="220" height="220" rx="48" fill="url(#fIconBg)" />
        <g fill="#A855F7" opacity="0.25">
          <circle cx="45" cy="55" r="3" />
          <circle cx="60" cy="55" r="3" />
          <circle cx="45" cy="70" r="3" />
          <circle cx="60" cy="70" r="3" />
          <circle cx="160" cy="155" r="3" />
          <circle cx="175" cy="155" r="3" />
          <circle cx="160" cy="170" r="3" />
          <circle cx="175" cy="170" r="3" />
        </g>
        <path
          d="M 40 120 L 70 90 M 130 180 L 165 145 M 150 60 L 175 35"
          stroke="#C084FC" strokeWidth="2" strokeLinecap="round"
          opacity="0.4" strokeDasharray="4 4"
        />
        <path
          d="M 45 115 L 92 162 C 95 165 100 165 103 162 L 165 100 L 138 73 L 97 114 L 68 85 Z"
          fill="url(#fCheck)"
        />
        <path
          d="M 165 100 L 195 70 C 198 67 196 60 190 58 C 175 52 150 61 138 73 Z"
          fill="url(#fOrange)"
        />
        <circle cx="186" cy="52" r="4" fill="#FFA000" />
      </g>

      {/* Arabic name */}
      <text
        x="340" y="215"
        fontFamily="'Cairo', 'Segoe UI', Tahoma, sans-serif"
        fontWeight="800"
        fontSize="96"
        fill="#2E1065"
        textAnchor="start"
      >
        أنجزها
      </text>

      {/* English name */}
      <text
        x="345" y="275"
        fontFamily="'Segoe UI', Tahoma, sans-serif"
        fontWeight="700"
        fontSize="38"
        letterSpacing="3"
        fill="#3B0764"
        textAnchor="start"
      >
        ENGEZHA
      </text>

      {/* Separator */}
      <line x1="80" y1="360" x2="720" y2="360" stroke="#E9D5FF" strokeWidth="2" strokeLinecap="round" />

      {/* Arabic subtitle */}
      <text
        x="400" y="415"
        fontFamily="'Cairo', 'Segoe UI', Tahoma, sans-serif"
        fontWeight="600"
        fontSize="34"
        fill="#4C1D95"
        textAnchor="middle"
      >
        لتطوير المواقع والتطبيقات
      </text>

      {/* English subtitle */}
      <text
        x="400" y="460"
        fontFamily="'Segoe UI', Tahoma, sans-serif"
        fontWeight="500"
        fontSize="24"
        letterSpacing="0.5"
        fill="#5B21B6"
        textAnchor="middle"
      >
        Web &amp; Mobile Development
      </text>
    </svg>
  );
}
