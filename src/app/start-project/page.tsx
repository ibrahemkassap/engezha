import { Metadata } from 'next';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { ProjectInquiryForm } from '@/components/inquiry/ProjectInquiryForm';
import { getCategories, getPublishedProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'ابدأ مشروعك الرقمي | طلب تنفيذ مخصص',
  description:
    'احكيلنا فكرتك وسجل تفاصيل مشروعك أو اطلب تنفيذ نموذج مشابه. بنحول أفكارك لتطبيقات ومواقع حقيقية باحترافية.',
};

interface StartProjectPageProps {
  searchParams: {
    project?: string;
    mode?: string;
    category?: string;
  };
}

export default async function StartProjectPage({
  searchParams,
}: StartProjectPageProps) {
  const [categories, projects] = await Promise.all([
    getCategories(),
    getPublishedProjects(),
  ]);

  const initialMode =
    searchParams.mode === 'custom' ? 'custom_project' : 'existing_project';

  return (
    <>
      <MainHeader />
      <main className="flex-1 py-12 bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-200 relative overflow-hidden">
        {/* Ambient Top Glow for Studio Arrival */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-purple-500/20 via-orange-500/10 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in zoom-in-[0.98] duration-500">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-subtle dark:bg-brand-dark-surface text-brand-primary dark:text-brand-dark-primary text-xs font-bold mb-3 border border-brand-border dark:border-brand-dark-border">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent dark:bg-brand-dark-action" />
              <span>طلب تنفيذ ومناقشة مشروع</span>
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text">
              ابدأ مشروعك الرقمي الآن
            </h1>

            <p className="text-base text-brand-muted dark:text-brand-dark-muted mt-3 leading-relaxed">
              اختار نموذج يلهمك، أو احكيلنا فكرتك ونبني لك تجربة رقمية على مقاسك. املأ البيانات وسنتواصل معك لمناقشة التفاصيل.
            </p>
          </div>

          {/* Form */}
          <ProjectInquiryForm
            categories={categories}
            projects={projects}
            initialMode={initialMode}
            initialProjectId={searchParams.project}
            initialCategoryId={searchParams.category}
          />
        </div>
      </main>
      <MainFooter />
    </>
  );
}
