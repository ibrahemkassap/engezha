import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { Mail, MessageCircle, ShieldCheck } from 'lucide-react';

export function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#120E22] dark:bg-[#0B0916] text-slate-300 border-t border-purple-950/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mt-4">
              منصة إنتاج رقمية وهندسة برمجية متكاملة. نبتكر ونطور مواقع الشركات، المتاجر الإلكترونية، تطبيقات الهواتف، والأنظمة السحابية لرواد الأعمال والمؤسسات.
            </p>
            <div className="text-xs font-semibold text-purple-300">
              &ldquo;Your Idea. Our Engineering. Your Success.&rdquo;
            </div>

            {/* Direct Contact Badges */}
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="https://wa.me/201017358087"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                dir="ltr"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>+20 101 735 8087 (WhatsApp Official)</span>
              </a>
              <a
                href="mailto:ibrahem.kassap@gmail.com"
                className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors"
                dir="ltr"
              >
                <Mail className="w-4 h-4 text-brand-accent" />
                <span>ibrahem.kassap@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
              خدمات الإنتاج البرمجي
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/services/website-development" className="hover:text-white transition-colors">
                  مواقع الشركات والواجهات
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce-development" className="hover:text-white transition-colors">
                  المتاجر الإلكترونية المتكاملة
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-app-development" className="hover:text-white transition-colors">
                  تطبيقات الهواتف (iOS / Android)
                </Link>
              </li>
              <li>
                <Link href="/services/management-systems" className="hover:text-white transition-colors">
                  الأنظمة الإدارية ونقاط البيع POS
                </Link>
              </li>
              <li>
                <Link href="/services/ai-solutions" className="hover:text-white transition-colors">
                  حلول الذكاء الاصطناعي والأتمتة
                </Link>
              </li>
              <li>
                <Link href="/services/website-maintenance" className="hover:text-white transition-colors">
                  الصيانة السحابية والتأمين 24/7
                </Link>
              </li>
              <li>
                <Link href="/services/technical-seo" className="hover:text-white transition-colors">
                  تحسين محركات البحث التقني
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Discovery */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
              الاستكشاف والمنصة
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  كتالوج النماذج الحية (12 مشروع)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  دليل الخدمات الشامل
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  منهجية ومراحل الإنتاج
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  مركز المعرفة والمدونة
                </Link>
              </li>
              <li>
                <Link href="/start-project" className="hover:text-white transition-colors">
                  طلب مشروع جديد
                </Link>
              </li>
              <li>
                <Link href="/sell-project" className="text-purple-300 hover:text-orange-400 font-bold transition-colors">
                  اعرض مشروعك للبيع 💼
                </Link>
              </li>
              <li>
                <Link href="/my-inquiries" className="hover:text-white transition-colors">
                  بوابة متابعة طلباتي
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
              المعايير والأمان
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  سياسة الخصوصية وحماية البيانات
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  شروط الخدمة والتعاقد
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-slate-500 block pt-1">
                  اتفاقية عدم الإفصاح (NDA) معتمدة لكافة المشاريع
                </span>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-[11px] transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>بوابة المشرفين</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-purple-950/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} أنجزها (ENGEZHA) لتكنولوجيا المعلومات. جميع الحقوق محفوظة.</p>
          <p className="text-purple-300 font-medium">
            فكرتك تستحق أن تتحول إلى واقع رقمي
          </p>
        </div>
      </div>
    </footer>
  );
}
