import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { Mail } from 'lucide-react';

export function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#141024] dark:bg-brand-dark-surface text-brand-dark-text border-t border-brand-dark-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo variant="light" />
            <p className="text-sm text-brand-dark-muted max-w-md leading-relaxed mt-4">
              منصة رقمية متخصصة في تنفيذ وبناء المشاريع البرمجية والنماذج الرقمية الاحترافية. من المواقع والمتاجر إلى تطبيقات الموبايل والأنظمة المخصصة. فكرتك تستاهل تتنفذ باحتراف.
            </p>
            <div className="pt-2">
              <a
                href="mailto:ibrahem.kassap@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-purple-200 hover:text-brand-accent transition-colors"
                dir="ltr"
              >
                <Mail className="w-4 h-4 text-brand-accent" />
                <span>ibrahem.kassap@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              روابط سريعة
            </h3>
            <ul className="space-y-2 text-sm text-brand-dark-muted">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  كتالوج المشاريع
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-white transition-colors">
                  تصفح التصنيفات
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  كيف نعمل؟
                </Link>
              </li>
              <li>
                <Link href="/start-project" className="hover:text-white transition-colors">
                  طلب مشروع جديد
                </Link>
              </li>
              <li>
                <Link href="/sell-project" className="hover:text-orange-400 font-semibold text-purple-300 transition-colors">
                  اعرض مشروعك للبيع 💼
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              الشروط والخصوصية
            </h3>
            <ul className="space-y-2 text-sm text-brand-dark-muted">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  شروط الاستخدام
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors text-xs text-brand-dark-muted/80">
                  دخول الإدارة
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-brand-dark-border flex flex-col sm:flex-row items-center justify-between text-xs text-brand-dark-muted gap-4">
          <p>© {currentYear} انجزها (ENGEZHA). جميع الحقوق محفوظة.</p>
          <p className="text-brand-dark-muted">
            فكرتك تستاهل تتنفذ باحتراف
          </p>
        </div>
      </div>
    </footer>
  );
}
