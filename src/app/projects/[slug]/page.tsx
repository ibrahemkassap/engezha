import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { TechnologyTag } from '@/components/projects/TechnologyTag';
import { ReviewList } from '@/components/reviews/ReviewList';
import { ProjectLaunchButton } from '@/components/transitions/ProjectLaunchButton';
import { getProjectBySlug, getProjectReviews, getPublishedProjects } from '@/lib/data';
import { formatArabicDate } from '@/lib/utils';
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Layers,
  Compass,
  Info,
  MessagesSquare,
  Tag,
  ShieldCheck,
} from 'lucide-react';

interface ProjectDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: 'المشروع غير موجود' };
  }

  return {
    title: project.title,
    description: project.short_description,
    openGraph: {
      title: `${project.title} | انجزها`,
      description: project.short_description,
      images: [project.cover_image],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export const revalidate = 60;

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const reviews = await getProjectReviews(project.id);

  return (
    <>
      <MainHeader />
      <main className="flex-1 py-10 bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
            <Link href="/" className="hover:text-brand-primary dark:hover:text-brand-dark-primary">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-brand-primary dark:hover:text-brand-dark-primary">
              المشاريع
            </Link>
            <span>/</span>
            <span className="text-brand-text dark:text-brand-dark-text font-bold truncate max-w-xs">
              {project.title}
            </span>
          </nav>

          {/* Project Header Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              {project.badge && (
                <span
                  className="px-3 py-1 rounded-lg text-white text-xs font-extrabold shadow-sm"
                  style={{ backgroundColor: project.accent_color || '#5B2C6F' }}
                >
                  {project.badge}
                </span>
              )}
              {project.category && (
                <span className="px-3 py-1 rounded-lg bg-brand-subtle dark:bg-brand-dark-border text-brand-primary dark:text-brand-dark-primary text-xs font-bold">
                  {project.category.name}
                </span>
              )}
              <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-brand-dark-surface text-slate-700 dark:text-brand-dark-text text-xs font-semibold">
                {project.project_type}
              </span>
              {project.is_demo && (
                <span className="px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold">
                  نموذج تجريبي توضيحي
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text leading-tight">
              {project.title}
            </h1>

            <p className="text-base text-brand-muted dark:text-brand-dark-muted max-w-3xl leading-relaxed">
              {project.short_description}
            </p>
          </div>

          {/* Demo Disclaimer notice if illustrative */}
          {project.is_demo && (
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-300 text-xs flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>تنويه شفاف:</strong> هذا المشروع عبارة عن نموذج تطبيقي توضيحي جاهز ومصمم لعرض إمكانيات التنفيذ الفعلي، ويمكن تخصيصه وتطويره ليتوافق تمامًا مع نشاطك التجاري.
              </p>
            </div>
          )}

          {/* Main Grid: Gallery & Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Gallery Showcase */}
            <div className="lg:col-span-8 space-y-8">
              <ProjectGallery
                coverImage={project.cover_image}
                galleryImages={project.gallery_images}
                title={project.title}
              />

              {/* Detailed Description */}
              <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-8 space-y-6 transition-colors">
                <div>
                  <h2 className="text-lg font-bold text-brand-text dark:text-brand-dark-text mb-3">
                    عن المشروع ونطاق العمل
                  </h2>
                  <p className="text-sm text-slate-700 dark:text-brand-dark-muted leading-relaxed whitespace-pre-line">
                    {project.detailed_description}
                  </p>
                </div>

                {project.problem_solved && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border">
                    <h3 className="text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1.5 uppercase tracking-wider">
                      التحدي والحل التقني
                    </h3>
                    <p className="text-xs text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                      {project.problem_solved}
                    </p>
                  </div>
                )}

                {/* Features List */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="text-base font-bold text-brand-text dark:text-brand-dark-text mb-3">
                      أبرز المزايا والوظائف المضمنة
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-bg dark:bg-brand-dark-bg border border-brand-border dark:border-brand-dark-border text-xs font-semibold text-brand-text dark:text-brand-dark-text"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Tags */}
                <div>
                  <h3 className="text-xs font-bold text-brand-text dark:text-brand-dark-text mb-2 uppercase tracking-wider">
                    التقنيات المستخدمة
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technology_tags.map((tag) => (
                      <TechnologyTag key={tag} tag={tag} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Promotional Bottom CTA Banner */}
              <div
                className="p-6 sm:p-8 rounded-2xl border text-white relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${project.accent_color || '#4A154B'} 0%, #17182F 100%)`,
                  borderColor: project.accent_color || '#4A154B',
                }}
              >
                <div className="space-y-2 max-w-xl z-10">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-orange-300">
                    جاهز للانطلاق بمشروعك؟
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black leading-snug">
                    احصل على تقدير تكلفة دقيق لتنفيذ هذا النموذج
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    حدد الميزات التي ترغب بإضافتها أو الاحتفاظ بها، وسنقدم لك خطة عمل وجدولاً زمنياً واضحاً وعرض سعر مخصص لميزانيتك.
                  </p>
                </div>

                <div className="flex-shrink-0 z-10">
                  <ProjectLaunchButton
                    href={`/start-project?project=${project.id}`}
                    variant="accent"
                    showIcon={false}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm shadow-xl"
                  >
                    <MessagesSquare className="w-4 h-4" />
                    <span>ناقش السعر الآن</span>
                  </ProjectLaunchButton>
                </div>
              </div>

              {/* Live Star Ratings and Reviews Section */}
              <ReviewList projectId={project.id} initialReviews={reviews} />
            </div>

            {/* Sidebar CTA & Metadata Box */}
            <div className="lg:col-span-4 space-y-6">
              <div
                className="sticky top-24 bg-white dark:bg-brand-dark-surface rounded-2xl border border-brand-border dark:border-brand-dark-border p-6 shadow-sm space-y-6 transition-colors"
                style={{
                  borderTopColor: project.accent_color || '#FF6B00',
                  borderTopWidth: '4px',
                }}
              >
                <div>
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold mb-2 text-white shadow-xs"
                    style={{ backgroundColor: project.accent_color || '#5B2C6F' }}
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>{project.badge || 'جاهز للتنفيذ'}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-brand-text dark:text-brand-dark-text mt-1">
                    طلب تسعير وتنفيذ المشروع
                  </h3>
                  <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-2 leading-relaxed">
                    يمكنك طلب هذا المشروع كما هو بهويتك، أو مناقشة إضافة ميزات وتعديلات مع فريقنا لتحديد التكلفة والجدول الزمني بدقة.
                  </p>
                </div>

                {/* Promotional Value Box */}
                <div className="p-3.5 rounded-xl bg-brand-subtle/50 dark:bg-brand-dark-border/40 border border-brand-border/60 dark:border-brand-dark-border space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-brand-primary dark:text-brand-dark-primary">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>ضمان تسليم برمجي عالي الجودة</span>
                  </div>
                  <p className="text-[11px] text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                    استشارة ومناقشة مجانية بالكامل قبل التعاقد + كود نظيف وتصميم عصري متجاوب 100%.
                  </p>
                </div>

                {/* Conversion Actions */}
                <div className="space-y-3 pt-1">
                  <ProjectLaunchButton
                    href={`/start-project?project=${project.id}`}
                    variant="accent"
                    showIcon={false}
                    className="w-full py-3.5 px-4 rounded-xl text-sm font-bold"
                  >
                    <MessagesSquare className="w-4 h-4" />
                    <span>ناقش السعر وخطة التنفيذ</span>
                    <ArrowLeft className="w-4 h-4 mr-auto" />
                  </ProjectLaunchButton>

                  <ProjectLaunchButton
                    href="/start-project?mode=custom"
                    variant="secondary"
                    showIcon={false}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold"
                  >
                    <Compass className="w-4 h-4 text-brand-primary dark:text-brand-dark-primary" />
                    <span>طلب تصميم مخصص من الصفر</span>
                  </ProjectLaunchButton>
                </div>

                {/* Metadata Details */}
                <div className="pt-6 border-t border-brand-border/70 dark:border-brand-dark-border space-y-3 text-xs text-brand-muted dark:text-brand-dark-muted">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-slate-400 dark:text-brand-dark-muted" />
                      نوع التطبيق:
                    </span>
                    <span className="font-semibold text-brand-text dark:text-brand-dark-text">
                      {project.project_type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-brand-dark-muted" />
                      تاريخ الإضافة:
                    </span>
                    <span className="font-semibold text-brand-text dark:text-brand-dark-text">
                      {formatArabicDate(project.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
