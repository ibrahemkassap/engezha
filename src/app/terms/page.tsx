import { Metadata } from 'next';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'شروط وأحكام الاستخدام',
  description:
    'شروط وأحكام استخدام منصة انجزها لطلب النماذج وتنفيذ المشاريع البرمجية وتطبيقات الويب والموبايل.',
};

export default function TermsPage() {
  return (
    <>
      <MainHeader />
      <main className="flex-1 py-14 bg-brand-bg dark:bg-brand-dark-bg transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-8 sm:p-12 space-y-8">
            <div className="flex items-center gap-3 border-b border-brand-border dark:border-brand-dark-border pb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-subtle dark:bg-brand-dark-border text-brand-primary dark:text-brand-dark-primary flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text dark:text-brand-dark-text">
                  شروط وأحكام الاستخدام
                </h1>
                <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-1">
                  آخر تحديث: {new Date().getFullYear()}
                </p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-700 dark:text-brand-dark-muted leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
                  1. قبول الشروط
                </h2>
                <p>
                  باستخدامك لمنصة <strong>انجزها (ENGEZHA)</strong> أو تصفحك للنماذج أو إرسالك لطلب مشروع جديد، فإنك تقر وتوافق على الالتزام بكافة الشروط والأحكام الواردة في هذه الاتفاقية.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
                  2. طبيعة الخدمات ونماذج الأعمال
                </h2>
                <p>
                  المشاريع والنماذج المعروضة في الكتالوج تمثل نماذج حية وتطبيقية (Demo Projects) أو أعمال سابقة قابلة للتطوير وإعادة التخصيص. لا يُعتبر تقديم الطلب تعاقدًا نهائيًا ملزمًا إلا بعد التواصل المباشر والاتفاق الرسمي على وثيقة نطاق العمل والجدول الزمني والدفعات المالية.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
                  3. حقوق الملكية الفكرية
                </h2>
                <p>
                  عند اكتمال تنفيذ وتسليم المشروع وسداد كافة المستحقات المتفق عليها، تنتقل حقوق الكود والتصميم والبيانات الخاصة بالعميل إليه بالكامل، مع احتفاظ منصة انجزها بحق الإشارة للعمل في معرض أعمالها ما لم يتم الاتفاق على غير ذلك في اتفاقية عدم الإفصاح (NDA).
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
                  4. الاستخدام المقبول والنزاهة
                </h2>
                <p>
                  يلتزم المستخدم بعدم رفع أي ملفات تحتوي على برمجيات ضارة، أو استخدام المنصة في إرسال طلبات مزيفة أو احتيالية أو مسيئة. يحق لإدارة المنصة حظر أي محتوى أو تقييمات غير ملائمة دون إشعار مسبق.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-brand-text dark:text-brand-dark-text">
                  5. التواصل والاستفسارات
                </h2>
                <p>
                  لأي استفسارات قانونية أو تعاقدية، يرجى التواصل معنا عبر:
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
