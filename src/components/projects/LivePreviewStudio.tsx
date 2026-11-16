'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { useProjectTransition } from '@/components/transitions/ProjectTransitionContext';
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  ArrowRight,
  Rocket,
  MessageCircle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface LivePreviewStudioProps {
  project: Project;
}

export function LivePreviewStudio({ project }: LivePreviewStudioProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewMode, setPreviewMode] = useState<'iframe' | 'screenshots'>('iframe');
  const [activeImage, setActiveImage] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);
  const { triggerLaunch } = useProjectTransition();

  const allImages = [
    project.cover_image,
    ...(project.gallery_images || []).filter((img) => img !== project.cover_image),
  ];

  const handleOrderLaunch = () => {
    triggerLaunch(`/start-project?project=${project.id}`);
  };

  const demoUrl = project.demo_url || `/demos/${project.slug}/index.html`;
  const whatsappUrl = `https://wa.me/201017358087?text=${encodeURIComponent(
    `مرحباً فريق أنجزها 🚀\nأنا الآن أعاين نموذج (${project.title}) وأرغب في مناقشة تفاصيل وسعر تنفيذه لهويتي التجارية.`
  )}`;

  const refreshIframe = () => {
    setIsLoadingIframe(true);
    setIframeKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans max-w-full overflow-x-hidden" dir="rtl">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-50 h-16 sm:h-20 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 sm:px-8 flex items-center justify-between gap-3 shadow-xl">
        {/* Right Section: Back to platform & project info */}
        <div className="flex items-center gap-2 sm:gap-6 min-w-0">
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-2 rounded-xl border border-slate-700/60 transition-all flex-shrink-0"
            title="العودة لصفحة تفاصيل المشروع"
          >
            <ArrowRight className="w-4 h-4 ml-0.5" />
            <span className="hidden sm:inline">العودة للتفاصيل</span>
          </Link>

          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-extrabold px-2 py-0.5 rounded-md text-white shadow-xs hidden xs:inline-block"
                style={{ backgroundColor: project.accent_color || '#5B2C6F' }}
              >
                {project.badge || 'معاينة حية'}
              </span>
              <h1 className="text-xs sm:text-sm font-extrabold text-white truncate max-w-[150px] sm:max-w-md">
                {project.title}
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block truncate mt-0.5 font-mono" dir="ltr">
              {demoUrl}
            </p>
          </div>
        </div>

        {/* Center Section: Responsive Device Switcher */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              device === 'desktop'
                ? 'bg-brand-primary text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
            title="عرض شاشة الكمبيوتر (Desktop)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>كمبيوتر</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              device === 'tablet'
                ? 'bg-brand-primary text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
            title="عرض شاشة التابلت (Tablet)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>تابلت</span>
          </button>

          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              device === 'mobile'
                ? 'bg-brand-primary text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
            title="عرض شاشة الجوال (Mobile)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>موبايل</span>
          </button>
        </div>

        {/* Left Section: Conversion CTAs & External Link */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* External Fullscreen Link */}
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 border border-slate-700/80 text-xs font-bold transition-all shadow-xs"
            title="فتح الموقع في تبويب مستقل كامل الشاشة"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">فتح في نافذة كاملة</span>
          </a>

          {/* Primary Order Action */}
          <button
            type="button"
            onClick={handleOrderLaunch}
            className="flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-brand-action hover:bg-brand-actionHover text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-orange-900/30 active:scale-95 transition-all"
            title="اطلب موقعاً مماثلاً لهويتك"
          >
            <Rocket className="w-4 h-4" />
            <span className="hidden xs:inline">اطلب تنفيذ مماثل</span>
            <span className="xs:hidden">طلب تنفيذ</span>
          </button>
        </div>
      </header>

      {/* Main Preview Canvas Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-3 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
        {/* Device Frame Wrapper */}
        <div
          className={`transition-all duration-300 w-full flex flex-col items-center justify-center my-auto ${
            device === 'desktop'
              ? 'max-w-6xl'
              : device === 'tablet'
              ? 'max-w-[768px]'
              : 'max-w-[400px]'
          }`}
        >
          {/* Browser Address Mockup Bar */}
          <div className="w-full bg-slate-900 border border-slate-800 rounded-t-2xl px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Simulated Address Bar */}
            <div className="flex-1 max-w-md mx-auto bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1 flex items-center justify-between gap-2 text-[11px] text-slate-400 font-mono" dir="ltr">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-emerald-400 text-xs">🔒</span>
                <span className="truncate">{demoUrl}</span>
              </div>
              <button
                type="button"
                onClick={refreshIframe}
                className="hover:text-white p-0.5 rounded transition-colors"
                title="إعادة تحميل الصفحة"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>

            {/* Mode Switcher Pill */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
              <button
                type="button"
                onClick={() => setPreviewMode('iframe')}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                  previewMode === 'iframe'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                موقع حي
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode('screenshots')}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                  previewMode === 'screenshots'
                    ? 'bg-brand-primary text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                صور
              </button>
            </div>
          </div>

          {/* Screen Content Container */}
          <div
            className={`w-full bg-slate-900 border-x border-b border-slate-800 rounded-b-2xl overflow-hidden shadow-2xl relative ${
              device === 'mobile'
                ? 'h-[680px]'
                : device === 'tablet'
                ? 'h-[720px]'
                : 'h-[700px]'
            }`}
          >
            {previewMode === 'iframe' ? (
              <div className="relative w-full h-full bg-white">
                {isLoadingIframe && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs z-10 flex flex-col items-center justify-center gap-3 text-white">
                    <div className="w-8 h-8 border-3 border-brand-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-bold text-slate-300">جاري تشغيل الموقع الحقيقي...</p>
                  </div>
                )}
                <iframe
                  key={iframeKey}
                  src={demoUrl}
                  title={`معاينة مباشرة لمشروع ${project.title}`}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  onLoad={() => setIsLoadingIframe(false)}
                />
              </div>
            ) : (
              <div className="relative w-full h-full bg-slate-900 overflow-y-auto">
                <Image
                  src={allImages[activeImage] || project.cover_image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            )}
          </div>

          {/* Screenshot selector if in screenshots mode */}
          {previewMode === 'screenshots' && allImages.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4 p-2 bg-slate-900/60 rounded-xl border border-slate-800/80">
              <span className="text-xs font-semibold text-slate-400 px-2">الواجهات:</span>
              {allImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeImage === i
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  واجهة {i + 1}
                </button>
              ))}
            </div>
          )}

          {/* Marketing Value Box Below Preview */}
          <div className="w-full mt-6 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  عجبك هذا النموذج وتريد مثله لهويتك ونشاطك؟
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                نقوم بتخصيص الموقع بالكامل (شعارك، ألوانك، بوابات دفع، لوحة تحكم، ونربطه بدومينك) مع دعم فني مستمر.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>استفسر عبر واتساب</span>
              </a>

              <button
                type="button"
                onClick={handleOrderLaunch}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <span>طلب تنفيذ فوري</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
