import Link from 'next/link';
import {
  Code2,
  Sparkles,
  ArrowLeft,
  MonitorPlay,
  ShieldCheck,
  Coins,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';

export function DevelopersMarketplaceBanner() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#110D23] via-[#171230] to-[#0D0A1C] text-white relative overflow-hidden border-t border-purple-900/30">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/20 text-xs font-bold text-purple-300 shadow-sm">
            <Code2 className="w-4 h-4 text-orange-400" />
            <span>مساحة المطورين وأصحاب المشاريع الجاهزة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            معاك مشاريع وتطبيقات جاهزة <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-purple-300">
              ومش لاقي عملاء يشتروها؟
            </span>
          </h2>

          <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed max-w-2xl mx-auto">
            متسيبش كودك يركن على الهارد! انضم لشبكة مطوري أنجزها.. اعرض مشروعك، وخلّينا نتكفل بتجهيزه في استوديو العرض التفاعلي الحي، وتسويقه لشبكة عملائنا من الشركات، وتحصيل أرباحك فوراً.
          </p>
        </div>

        {/* 3 Value Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Feature 1 */}
          <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-purple-400/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center shadow-xs">
              <MonitorPlay className="w-6 h-6 text-purple-300" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              استوديو عرض حي تفاعلي 3D/Live
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">
              مش بنكتفي بسكرين شوتس عادية، بنشغل مشروعك لايف داخل إطارات موبايل وكمبيوتر تبهر العميل وتخليه يجرب الموقع بنفسه قبل الشراء.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-orange-400/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-300 flex items-center justify-center shadow-xs">
              <Coins className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              نماذج أرباح متعددة ومستمرة
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">
              اختر بين البيع الحصري الكامل للكود بمبلغ مقطوع كبير، أو بيع تراخيص استخدام متكررة لنفس الكود بعد تخصيصه لكل عميل لتوليد دخل سلبي مستمر.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              حفظ حقوق الملكية الفكرية NDA
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">
              كودك في أمان تام؛ لن يتم تسليم ملفات السورس كود أو قواعد البيانات لأي طرف إلا بعد توقيع عقود رسمية واستلام مستحقاتك المالية بالكامل.
            </p>
          </div>
        </div>

        {/* Action Call to Action */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-purple-950/40 border border-purple-800/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-right">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              <span>تقييم الكود والمشروع مجاني بالكامل وبدون أي التزام</span>
            </div>
            <h4 className="text-lg sm:text-xl font-extrabold text-white">
              جاهز تبدأ تعرض مشاريعك وتكسب منها؟
            </h4>
            <p className="text-xs text-purple-200/70">
              خطوات بسيطة: قدّم تفاصيل المشروع، نراجعه معك خلال 24 ساعة، ونبدأ في تسويقه فوراً.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/sell-project"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-brand-action hover:bg-brand-actionHover text-white font-extrabold text-sm shadow-lg shadow-orange-900/30 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>اعرض مشروعك للبيع الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/201017358087?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%81%D8%B1%D9%8A%D9%82%20%D8%A3%D9%86%D8%AC%D8%B2%D9%87%D8%A7%20%D9%84%D9%84%D9%85%D8%B7%D9%88%D8%B1%D9%8A%D9%86%20%F0%9F%92%BB%20%D8%A3%D9%86%D8%A7%20%D9%85%D8%A8%D8%B1%D9%85%D8%AC%20%D9%88%D9%84%D8%AF%D9%8A%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%AC%D8%A7%D9%87%D8%B2%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%B9%D8%B1%D8%B6%D9%87%20%D9%84%D9%84%D8%A8%D9%8A%D8%B9."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors border border-white/10"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>استفسار واتساب للمطورين</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
