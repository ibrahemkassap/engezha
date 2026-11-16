'use client';

import React from 'react';
import { Zap, Layers } from 'lucide-react';

interface ProjectLaunchOverlayProps {
  visible: boolean;
  statusText: string;
  progress: number;
}

export function ProjectLaunchOverlay({
  visible,
  statusText,
  progress,
}: ProjectLaunchOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#0B0817]/95 backdrop-blur-2xl transition-all duration-300"
      aria-live="polite"
      role="status"
    >
      {/* Dynamic Cyber Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(138, 79, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(138, 79, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
        }}
      />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-700/30 via-indigo-600/20 to-orange-500/25 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-orange-500/20 blur-2xl pointer-events-none" />

      {/* Pulsing Shockwave Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-purple-500/20 animate-ping pointer-events-none duration-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-orange-500/15 pointer-events-none animate-pulse" />

      {/* Centerpiece Showcase Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full animate-in fade-in zoom-in-95 duration-300">
        {/* Animated Brand Emblem */}
        <div className="relative mb-6 group">
          {/* Neon Glow under emblem */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-orange-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse" />

          {/* Icon Box */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/60 p-1 bg-gradient-to-br from-purple-600 via-purple-900 to-slate-950 border border-purple-400/30 flex items-center justify-center">
            {/* SVG Replica of Engezha Logo Icon with rocket glow */}
            <svg
              viewBox="0 0 220 220"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="overlayIconBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B21A8" />
                  <stop offset="50%" stopColor="#4C1D95" />
                  <stop offset="100%" stopColor="#2E1065" />
                </linearGradient>
                <linearGradient id="overlayCheck" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E9D5FF" />
                </linearGradient>
                <linearGradient id="overlayOrange" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF5722" />
                  <stop offset="100%" stopColor="#FFA000" />
                </linearGradient>
                <filter id="overlayGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background */}
              <rect x="0" y="0" width="220" height="220" rx="48" fill="url(#overlayIconBg)" />

              {/* Tech dots */}
              <g fill="#A855F7" opacity="0.35">
                <circle cx="45" cy="55" r="3.5" />
                <circle cx="60" cy="55" r="3.5" />
                <circle cx="45" cy="70" r="3.5" />
                <circle cx="60" cy="70" r="3.5" />
                <circle cx="160" cy="155" r="3.5" />
                <circle cx="175" cy="155" r="3.5" />
                <circle cx="160" cy="170" r="3.5" />
                <circle cx="175" cy="170" r="3.5" />
              </g>

              {/* Circuit lines */}
              <path
                d="M 40 120 L 70 90 M 130 180 L 165 145 M 150 60 L 175 35"
                stroke="#C084FC"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.5"
                strokeDasharray="4 4"
              />

              {/* White Checkmark */}
              <path
                d="M 45 115 L 92 162 C 95 165 100 165 103 162 L 165 100 L 138 73 L 97 114 L 68 85 Z"
                fill="url(#overlayCheck)"
              />

              {/* Orange Dynamic Rocket Arrow */}
              <path
                d="M 165 100 L 195 70 C 198 67 196 60 190 58 C 175 52 150 61 138 73 Z"
                fill="url(#overlayOrange)"
                filter="url(#overlayGlow)"
              />

              {/* Flame spark */}
              <circle cx="186" cy="52" r="5" fill="#FFA000" />
            </svg>
          </div>

          {/* Orbiting Sparkle */}
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/50 animate-bounce">
            <Zap className="w-3.5 h-3.5 fill-white" />
          </div>
        </div>

        {/* Tech Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold tracking-wider uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
          <span>ENGEZHA // STUDIO LAUNCH</span>
        </div>

        {/* Title & Brand */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          أنجزها <span className="text-orange-400">.</span>
        </h2>

        {/* Animated Dynamic Status Text */}
        <p className="text-sm font-semibold text-purple-200/90 min-h-[24px] transition-all duration-200">
          {statusText}
        </p>

        {/* Progress Bar Container */}
        <div className="w-full mt-6 space-y-2">
          <div className="relative w-full h-2 bg-slate-900/90 rounded-full overflow-hidden border border-purple-500/20 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-orange-500 to-amber-400 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(255,107,0,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-purple-300/70 pt-1">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-orange-400" />
              <span>مساحة العمل الرقمية</span>
            </span>
            <span className="font-bold text-orange-300">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
