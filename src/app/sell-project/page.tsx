import { Metadata } from 'next';
import Link from 'next/link';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { DeveloperProjectSubmissionForm } from '@/components/developers/DeveloperProjectSubmissionForm';
import {
  Code2,
  ShieldCheck,
  Coins,
  MonitorPlay,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  Clock,
  Briefcase,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'اعرض مشروعك للبيع | منصة أنجزها للمطورين والمبرمجين',
  description:
    'معاك مواقع أو تطبيقات أو مشاريع برمجية جاهزة غير مباعة؟ اعرض كودك على منصة أنجزها، وسوقه لآلاف الشركات ورواد الأعمال مع استوديو عرض تفاعلي حي وحفظ كامل لحقوق الملكية والأرباح.',
  openGraph: {
    title: 'اعرض مشروعك للبيع | حول كودك غير المباع لأرباح حقيقية مع أنجزها',
    description:
      'أنت برمجت وتعبت.. سيب علينا التسويق، العرض في استوديو المعاينة الحية، التفاوض مع العملاء، وإغلاق الصفقات بأعلى عائد لك.',
  },
};

export default function SellProjectPage() {
  return (
    <>
      <MainHeader />
      <main className="flex-1 w-full max-w-full overflow-x-hidden py-8 sm:py-12 bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
            <Link href="/" className="hover:text-brand-primary dark:hover:text-brand-dark-primary">
              الرئيسية
            </Link>
            <span>/</span>
            <span className="text-brand-text dark:text-brand-dark-text font-bold">
              مساحة المطورين: اعرض مشروعك للبيع
            </span>
          </nav>

          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#120D26] via-[#1A1338] to-[#0D0A1C] text-white p-6 sm:p-12 md:p-16 border border-purple-900/40 shadow-2xl">
            {/* Ambient background decorative orbs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs font-bold text-purple-300">
                <Code2 className="w-4 h-4 text-orange-400" />
                <span>برنامج شراكة مطوري أنجزها (ENGEZHA Developer Network)</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.25] tracking-tight">
                أكوادك على الهارد متسيبهاش تركن.. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-purple-300">
                  حوّل مشاريعك الجاهزة لأرباح مستمرة!
                </span>
              </h1>

              <p className="text-sm sm:text-lg text-purple-200/90 leading-relaxed max-w-3xl">
                في مبرمجين كتير بنوا مواقع، تطبيقات، ومتاجر فائقة الجودة، لكن واجهوا صعوبة في الوصول لعملاء يشتروها أو تسويقها بمبالغ مجزية.
                هنا دور <strong className="text-white font-extrabold">منصة أنجزها</strong>: بنجهز مشروعك في استوديو العرض التفاعلي الحي، نسوقه لشبكة عملائنا من أصحاب الشركات ورواد الأعمال، ونسلمك أرباحك عند كل بيع أو ترخيص.
              </p>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-purple-200/80">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>عقود وساطة وحفظ ملكية فكرية NDA</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>فحص وتقييم فني خلال 24-48 ساعة</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
                  <Coins className="w-4 h-4 text-orange-400" />
                  <span>خيارات: بيع حصري كامل أو تراخيص متكررة</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Why Sell Through Engezha */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary uppercase tracking-wider">
                القيمة المضافة للمبرمجين
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text dark:text-brand-dark-text">
                ليه تعرض مشروعك وتبيعه عن طريق منصة أنجزها؟
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                وفر وقتك وجهدك في التسويق والمفاوضات، وخلي تركيزك فقط في كتابة كود ممتاز.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-8 space-y-4 shadow-sm hover:border-brand-primary/60 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-brand-primary dark:text-brand-dark-primary flex items-center justify-center shadow-xs">
                  <MonitorPlay className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-text dark:text-brand-dark-text">
                  استوديو معاينة حي تفاعلي
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                  العملاء مش بيشتروا مجرد صور ثابتة! أنجزها بتشغل مشروعك داخل إطارات موبايل وكمبيوتر تفاعلية لايف، تخلّي العميل يجرب الأزرار والواجهات بنفسه ويثق في جودة عملك فوراً.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-8 space-y-4 shadow-sm hover:border-brand-primary/60 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-brand-action flex items-center justify-center shadow-xs">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-text dark:text-brand-dark-text">
                  عملاء جاهزون للتنفيذ الفوري
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                  بدل ما تدور على عميل محتمل وتدخل في مفاوضات ومماطلة، منصتنا تجذب أصحاب شركات ومتاجر وأطباء بيبحثوا عن نماذج حقيقية جاهزة للتخصيص والاستلام السريع.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-8 space-y-4 shadow-sm hover:border-brand-primary/60 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-text dark:text-brand-dark-text">
                  ضمان الحقوق والسرية التامة
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                  سورس كودك محمي بنسبة 100% باتفاقيات رسمية. لا يتم تسليم الكود للعميل إلا بعد استلامك لمستحقاتك المالية بالكامل عبر وسيلتك المفضلة (InstaPay، بنك، أو محفظة إلكترونية).
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: How It Works - 4 Steps */}
          <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-10 shadow-sm space-y-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary uppercase tracking-wider">
                آلية العمل
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-text dark:text-brand-dark-text">
                رحلة مشروعك من مجرد فولدر على جهازك إلى صفقات رابحة
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'إرسال بيانات المشروع',
                  desc: 'قدّم تفاصيل مشروعك وروابط المعاينة ونموذج البيع المفضل عبر النموذج بالأسفل في دقائق معدودة.',
                },
                {
                  step: '02',
                  title: 'المراجعة والتقييم الفني',
                  desc: 'يقوم مهندسونا بمراجعة الكود، تجربة الواجهات، وتقديم تقييم عادل للسعر وخطة الترويج مجاناً.',
                },
                {
                  step: '03',
                  title: 'التجهيز والنشر في الكتالوج',
                  desc: 'نربط مشروعك باستوديو العرض التفاعلي وننشره ضمن كتالوج المنصة الرسمي ونبدأ بحملات التسويق.',
                },
                {
                  step: '04',
                  title: 'إغلاق البيع وتحويل الأرباح',
                  desc: 'عند اختيار أي عميل لمشروعك، نبرم الاتفاق، ونحول لك أرباحك فوراً قبل أي تسليم للكود.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200/80 dark:border-brand-dark-border space-y-2 relative"
                >
                  <span className="text-2xl font-mono font-black text-brand-primary/20 dark:text-brand-dark-primary/30 block">
                    {item.step}
                  </span>
                  <h3 className="text-sm font-bold text-brand-text dark:text-brand-dark-text">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: The Developer Submission Form */}
          <div id="submit-project" className="space-y-4">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-brand-action uppercase tracking-wider">
                ابدأ الآن
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text dark:text-brand-dark-text">
                نموذج تسجيل وعرض مشروعك للبيع
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                املأ البيانات بدقة، وسيتواصل معك مهندسونا على الواتساب لمراجعة المشروع وتجهيزه للعرض.
              </p>
            </div>

            <DeveloperProjectSubmissionForm />
          </div>

          {/* Section 4: Developer FAQ */}
          <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-10 shadow-sm space-y-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-primary dark:text-brand-dark-primary font-bold text-xs">
                <HelpCircle className="w-4 h-4" />
                <span>الأسئلة الشائعة للمطورين</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-text dark:text-brand-dark-text">
                كل ما تحتاج معرفته حول بيع مشاريعك مع أنجزها
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  q: 'هل أنجزها تمتلك الكود الخاص بي بمجرد إرسال النموذج؟',
                  a: 'إطلاقاً. الكود وحقوق الملكية الفكرية تظل ملكاً لك بنسبة 100% حتى يتم الاتفاق الرسمي وتوقيع عقد بيع أو ترخيص واستلامك لكامل مستحقاتك المالية.',
                },
                {
                  q: 'ما هي المشاريع المقبولة للعرض؟',
                  a: 'نقبل مواقع الشركات، المتاجر الإلكترونية، تطبيقات الموبايل (Flutter/React Native)، أنظمة الكاشير ونقاط البيع (POS)، والأنظمة السحابية SaaS، وبوابات الذكاء الاصطناعي.',
                },
                {
                  q: 'ما هو الفرق بين البيع الحصري وبيع التراخيص؟',
                  a: 'في البيع الحصري: تتنازل عن السورس كود لعميل واحد بمبلغ مقطوع كبير ولا يتم بيعه لغيره. أما في بيع التراخيص: يتم بيع نفس النموذج لعدة عملاء مع تغيير الهوية والألوان لكل عميل، مما يحقق لك عائداً متكرراً.',
                },
                {
                  q: 'كيف أستلم أرباحي المالية؟',
                  a: 'نوفر وسائل دفع متعددة وسريعة: إنستاباي InstaPay، المحافظ الإلكترونية (فودافون كاش وغيرها)، تحويلات بنكية مباشرة داخل مصر، أو عبر Wise/USDT للمطورين خارج مصر.',
                },
                {
                  q: 'هل يشترط أن يكون المشروع مكتملاً بنسبة 100%؟',
                  a: 'المشاريع الجاهزة بنسبة 80% فأكثر يتم قبولها وترقيتها للتجهيز. إذا كان لديك واجهات تفاعلية فقط (Frontend)، يمكن أيضاً قبولها وعرضها كقوالب أعمال متكاملة.',
                },
                {
                  q: 'كم يستغرق الوقت لبدء عرض مشروعي للعملاء؟',
                  a: 'بمجرد إرسال التفاصيل، يتواصل معك مهندسونا خلال 24-48 ساعة لمراجعة الكود، وبدء تجهيز استوديو المعاينة وضمه لكتالوج المنصة.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200/80 dark:border-brand-dark-border space-y-2"
                >
                  <h3 className="text-sm font-bold text-brand-text dark:text-brand-dark-text flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary dark:text-brand-dark-primary flex-shrink-0" />
                    <span>{item.q}</span>
                  </h3>
                  <p className="text-xs text-brand-muted dark:text-brand-dark-muted leading-relaxed pr-6">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Support Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-right">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
                تواصل مباشر وسريع
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                عندك استفسار قبل ما تبعت تفاصيل مشروعك؟
              </h3>
              <p className="text-xs text-purple-200/80">
                فريق التطوير والشراكات في أنجزها متاح للرد على أي استفسار فني أو مالي على الواتساب.
              </p>
            </div>

            <a
              href="https://wa.me/201017358087?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%81%D8%B1%D9%8A%D9%82%20%D8%A3%D9%86%D8%AC%D8%B2%D9%87%D8%A7%20%D9%84%D9%84%D9%85%D8%B7%D9%88%D8%B1%D9%8A%D9%86%20%F0%9F%92%BB%20%D8%A3%D9%86%D8%A7%20%D9%85%D8%A8%D8%B1%D9%85%D8%AC%20%D9%88%D8%B9%D9%86%D8%AF%D9%8A%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%AD%D9%88%D9%84%20%D8%B9%D8%B1%D8%B6%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D9%8A%20%D9%84%D9%84%D8%A8%D9%8A%D8%B9."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex-shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>محادثة واتساب سريعة: 01017358087</span>
            </a>
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
