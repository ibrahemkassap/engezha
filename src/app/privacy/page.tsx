import { Metadata } from 'next';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية وحماية البيانات',
  description:
    'سياسة الخصوصية لمنصة انجزها: كيفية جمع البيانات، وتأمين المرفقات والتسجيلات الصوتية وحفظ سرية معلومات العملاء.',
};

export default function PrivacyPage() {
  return (
    <>
      <MainHeader />
      <main className="flex-1 py-14 bg-brand-bg dark:bg-brand-dark-bg transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-8 sm:p-12 space-y-8">
            <div className="flex items-center gap-3 border-b border-brand-border dark:border-brand-dark-border pb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-subtle dark:bg-brand-dark-border text-brand-primary dark:text-brand-dark-primary flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text dark:text-brand-dark-text">
                  سياسة الخصوصية وحماية البيانات
                </h1>
                <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1">
                  آخر تحديث: {new Date().getFullYear()}
                </p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-700 dark:text-brand-dark-muted leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
                  1. مقدمة والتزامنا بالخصوصية
                </h2>
                <p>
                  نحن في منصة <strong>انجزها (ENGEZHA)</strong> نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية ومعلومات مشاريعك الرقمية بأعلى درجات الأمان والسرية. توضح هذه الوثيقة ماهية البيانات التي نجمعها وكيفية معالجتها واستخدامها.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
                  2. البيانات التي يتم جمعها
                </h2>
                <ul className="list-disc pr-6 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-brand-dark-muted">
                  <li>
                    <strong>بيانات التواصل:</strong> الاسم الكامل، رقم الهاتف / واتساب، وعنوان البريد الإلكتروني.
                  </li>
                  <li>
                    <strong>تفاصيل فكرة المشروع:</strong> الشرح المكتوب، التصنيف المختار، الميزانية المقترحة، والجدول الزمني المستهدف.
                  </li>
                  <li>
                    <strong>المرفقات والتسجيلات:</strong> الملفات التوضيحية، الصور، المستندات، والتسجيلات الصوتية المسجلة عبر المتصفح لدعم شرح الفكرة.
                  </li>
                  <li>
                    <strong>التقييمات العامة:</strong> الاسم المستعار والتعليق والتقييم بالنجوم المنشور اختياريًا على صفحات النماذج.
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
                  3. كيف نستخدم بياناتك؟
                </h2>
                <p>
                  تُستخدم البيانات المدخلة حصرًا للأغراض التالية:
                </p>
                <ul className="list-disc pr-6 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-brand-dark-muted">
                  <li>التواصل المباشر معك لمناقشة طلب المشروع وتقديم العروض الفنية والمالية.</li>
                  <li>مراجعة الملفات والتسجيلات الصوتية المرفقة لفهم المتطلبات البرمجية.</li>
                  <li>إرسال الإشعارات وتحديثات حالة العمل.</li>
                  <li>حماية المنصة من الاستخدام الآلي الاحتيالي والرسائل المزعجة.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
                  4. سرية وأمان المرفقات والملفات
                </h2>
                <p>
                  جميع الملفات والتسجيلات الصوتية التي يرفعها العميل تُحفظ في وحدات تخزين سحابية خاصة ومغلقة (Private Storage Buckets). لا يتم إتاحة هذه الملفات للجمهور ولا يمكن الوصول إليها إلا من خلال روابط موقعة مؤقتة (Signed URLs) مخصصة فقط للإدارة المخولة.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
                  5. مشاركة البيانات مع أطراف خارجية
                </h2>
                <p>
                  نحن لا نبيع ولا نؤجر ولا نشارك بياناتك الشخصية أو تفاصيل مشاريعك مع أي أطراف ثالثة لأغراض دعائية أو تسويقية على الإطلاق.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
                  6. الاستفسارات وحذف البيانات
                </h2>
                <p>
                  إذا كان لديك أي سؤال حول سياسة الخصوصية أو ترغب في تعديل أو حذف بياناتك المسجلة لدينا، يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني المعتمد:
                  <br />
                  <a
                    href="mailto:ibrahem.kassap@gmail.com"
                    className="text-brand-primary dark:text-brand-dark-primary font-bold hover:underline"
                    dir="ltr"
                  >
                    ibrahem.kassap@gmail.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
