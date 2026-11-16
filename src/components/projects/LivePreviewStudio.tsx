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
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';

interface LivePreviewStudioProps {
  project: Project;
}

export function LivePreviewStudio({ project }: LivePreviewStudioProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeImage, setActiveImage] = useState(0);
  const { triggerLaunch } = useProjectTransition();

  const allImages = [
    project.cover_image,
    ...(project.gallery_images || []).filter((img) => img !== project.cover_image),
  ];

  const handleOrderLaunch = () => {
    triggerLaunch(`/start-project?project=${project.id}`);
  };

  const demoUrl = project.demo_url || `https://${project.slug}.vercel.app`;
  const whatsappUrl = `https://wa.me/201017358087?text=${encodeURIComponent(
    `مرحباً فريق أنجزها 🚀\nأنا الآن أعاين نموذج (${project.title}) على المنصة وأرغب في مناقشة تفاصيل وسعر تنفيذه لهويتي التجارية.`
  )}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" dir="rtl">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-50 h-16 sm:h-20 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between gap-4 shadow-xl">
        {/* Right Section: Back to platform & project info */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-2 rounded-xl border border-slate-700/60 transition-all flex-shrink-0"
            title="العودة لصفحة تفاصيل المشروع"
          >
            <ArrowRight className="w-4 h-4 ml-0.5" />
            <span className="hidden sm:inline">العودة للمنصة</span>
          </Link>

          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-extrabold px-2 py-0.5 rounded-md text-white shadow-xs"
                style={{ backgroundColor: project.accent_color || '#5B2C6F' }}
              >
                {project.badge || 'معاينة حية'}
              </span>
              <h1 className="text-xs sm:text-sm font-extrabold text-white truncate max-w-[200px] sm:max-w-md">
                {project.title}
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block truncate mt-0.5" dir="ltr">
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

        {/* Left Section: Conversion CTAs */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* External Fullscreen Link */}
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700/80 border border-slate-700/80 text-xs font-bold transition-all shadow-xs"
            title="فتح الرابط في تبويب مستقل كامل الشاشة"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">فتح في نافذة كاملة</span>
          </a>

          {/* Primary Launch Action */}
          <button
            type="button"
            onClick={handleOrderLaunch}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-brand-action hover:bg-brand-actionHover text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-orange-900/30 active:scale-95 transition-all"
            title="اطلب موقعاً مشابهاً لهويتك"
          >
            <Rocket className="w-4 h-4" />
            <span>اطلب تنفيذ مماثل</span>
          </button>
        </div>
      </header>

      {/* Main Preview Canvas Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-3 sm:p-8 overflow-y-auto">
        {/* Device Frame Wrapper */}
        <div
          className={`transition-all duration-300 w-full flex flex-col items-center justify-center my-auto ${
            device === 'desktop'
              ? 'max-w-6xl'
              : device === 'tablet'
              ? 'max-w-[768px]'
              : 'max-w-[390px]'
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
            <div className="flex-1 max-w-md mx-auto bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono" dir="ltr">
              <span className="text-emerald-400 text-xs">🔒</span>
              <span className="truncate">{demoUrl}</span>
            </div>

            <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">معاينة حية</span>
            </div>
          </div>

          {/* Screen Content Container with Smooth Scroll */}
          <div
            className={`w-full bg-slate-950 border-x border-b border-slate-800 rounded-b-2xl overflow-hidden shadow-2xl relative ${
              device === 'mobile' ? 'aspect-[9/18]' : device === 'tablet' ? 'aspect-[4/3]' : 'aspect-[16/10]'
            }`}
          >
            <div className="relative w-full h-full bg-slate-900 overflow-y-auto">
              <Image
                src={allImages[activeImage] || project.cover_image}
                alt={project.title}
                fill
                className="object-cover object-top"
                priority
              />

              {/* In-Frame Live Action Floating Pill */}
              <div className="absolute top-4 right-4 z-20">
                <span className="bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>نموذج تفاعلي جاهز للتنفيذ</span>
                </span>
              </div>
            </div>
          </div>

          {/* Multiple Screen Shots Selector (if available) */}
          {allImages.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4 p-2 bg-slate-900/60 rounded-xl border border-slate-800/80">
              <span className="text-xs font-semibold text-slate-400 px-2">واجهات أخرى:</span>
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
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  عجبك هذا النموذج وتريد مثله لنشاطك التجاري؟
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                نقوم بتخصيص التصميم، الألوان، الهوية، بوابات الدفع، وإضافة ميزاتك الخاصة وإطلاقه على دومينك في أسرع وقت.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>استفسر عبر واتساب</span>
              </a>

              <button
                type="button"
                onClick={handleOrderLaunch}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-action hover:bg-brand-actionHover text-white text-xs font-bold transition-all shadow-md shadow-orange-900/30"
              >
                <Rocket className="w-4 h-4" />
                <span>ناقش السعر والطلب</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
