import { Metadata } from 'next';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { ProjectCatalogClient } from '@/components/projects/ProjectCatalogClient';
import { getCategories, getPublishedProjects } from '@/lib/data';
import { Suspense } from 'react';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

export const metadata: Metadata = {
  title: 'استكشف المشاريع والنماذج المنفذة',
  description:
    'تصفح كتالوج المشاريع والنماذج البرمجية الجاهزة للتطوير والتخصيص: مواقع شركات، متاجر، تطبيقات، وأنظمة سحابية.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const [categories, projects] = await Promise.all([
    getCategories(),
    getPublishedProjects(),
  ]);

  return (
    <>
      <MainHeader />
      <main className="flex-1 py-12 bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary tracking-wider uppercase bg-brand-subtle dark:bg-brand-dark-surface px-3 py-1 rounded-full">
              معرض المشاريع
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text mt-3">
              استكشف نماذج أعمالنا
            </h1>
            <p className="text-base text-brand-muted dark:text-brand-dark-muted mt-2 leading-relaxed">
              تصفح المشاريع والنماذج التوضيحية القابلة للتخصيص الكامل. يمكنك اختيار أي نموذج لطلب تنفيذ مشروع مشابه، أو إرسال فكرتك الخاصة لنبدأ من الصفر.
            </p>
          </div>

          {/* Client Catalog Filter and Search */}
          <Suspense fallback={<LoadingSkeleton count={6} />}>
            <ProjectCatalogClient
              initialProjects={projects}
              categories={categories}
            />
          </Suspense>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
