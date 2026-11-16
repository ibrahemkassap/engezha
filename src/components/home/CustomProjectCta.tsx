import Link from 'next/link';
import { ArrowLeft, Mic, FileUp } from 'lucide-react';

export function CustomProjectCta() {
  return (
    <section className="py-20 bg-brand-deep text-white relative overflow-hidden">
      {/* Background accents matching brand colors */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-orange-300 text-xs font-bold mb-6 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-brand-accent" />
          <span>تنفيذ مخصص بالكامل</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          مش لاقي التصميم اللي في بالك؟
        </h2>

        <p className="text-base sm:text-lg text-purple-200 max-w-2xl mx-auto mt-4 leading-relaxed">
          احكيلنا عن فكرتك، وابعت صورك أو تسجيلك الصوتي، ونبدأ من احتياجك أنت بدل ما نكرر تصميم موجود.
        </p>

        {/* Feature Highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
            <Mic className="w-4 h-4 text-brand-accent" />
            <span>تسجيل صوتي مباشر</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
            <FileUp className="w-4 h-4 text-purple-300" />
            <span>رفع ملفات وصور ومستندات</span>
          </div>
        </div>

        {/* Action CTA */}
        <div className="mt-10">
          <Link
            href="/start-project?mode=custom"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-action hover:bg-brand-actionHover dark:bg-brand-dark-action dark:hover:bg-[#E05E00] text-white font-bold text-base transition-all shadow-lg shadow-orange-950/40 active:scale-[0.98]"
          >
            <span>صمم مشروعي من الصفر</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
