'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ProjectLaunchOverlay } from './ProjectLaunchOverlay';

interface ProjectTransitionContextType {
  isTransitioning: boolean;
  statusText: string;
  progress: number;
  triggerLaunch: (targetUrl?: string) => void;
}

const ProjectTransitionContext = createContext<ProjectTransitionContextType>({
  isTransitioning: false,
  statusText: '',
  progress: 0,
  triggerLaunch: () => {},
});

export function ProjectTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [statusText, setStatusText] = useState('تهيئة بيئة العمل...');
  const [progress, setProgress] = useState(0);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);

  const triggerLaunch = useCallback(
    (targetUrl: string = '/start-project') => {
      // Don't re-trigger if already transitioning or already on the exact target page
      if (isTransitioning) return;
      if (pathname === targetUrl) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      setIsTransitioning(true);
      setActiveTarget(targetUrl);
      setProgress(15);
      setStatusText('جاري تشغيل محرك المشروع...');

      // Phase 1: Initial Warp surge
      const t1 = setTimeout(() => {
        setProgress(55);
        setStatusText('تهيئة استوديو مناقشة الفكرة والتسعير...');
      }, 250);

      // Phase 2: Router navigation push
      const t2 = setTimeout(() => {
        setProgress(90);
        setStatusText('انطلاق مساحة العمل...');
        router.push(targetUrl);
      }, 520);

      // Phase 3: Complete & clean up
      const t3 = setTimeout(() => {
        setProgress(100);
      }, 800);

      const t4 = setTimeout(() => {
        setIsTransitioning(false);
        setProgress(0);
        setActiveTarget(null);
      }, 1050);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    },
    [isTransitioning, pathname, router]
  );

  // Auto clean up if route change finishes
  useEffect(() => {
    if (isTransitioning && activeTarget && pathname === activeTarget.split('?')[0]) {
      const exitTimer = setTimeout(() => {
        setIsTransitioning(false);
        setProgress(0);
        setActiveTarget(null);
      }, 400);
      return () => clearTimeout(exitTimer);
    }
  }, [pathname, isTransitioning, activeTarget]);

  return (
    <ProjectTransitionContext.Provider
      value={{
        isTransitioning,
        statusText,
        progress,
        triggerLaunch,
      }}
    >
      {children}
      <ProjectLaunchOverlay
        visible={isTransitioning}
        statusText={statusText}
        progress={progress}
      />
    </ProjectTransitionContext.Provider>
  );
}

export function useProjectTransition() {
  const context = useContext(ProjectTransitionContext);
  if (!context) {
    throw new Error('useProjectTransition must be used within a ProjectTransitionProvider');
  }
  return context;
}
