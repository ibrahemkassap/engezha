import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { TechnologyTag } from '@/components/projects/TechnologyTag';
import { ReviewList } from '@/components/reviews/ReviewList';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectLaunchButton } from '@/components/transitions/ProjectLaunchButton';
import { getProjectBySlug, getProjectReviews, getPublishedProjects } from '@/lib/data';
import {
  ArrowLeft,
  CheckCircle2,
  Globe,
  ExternalLink,
  Layers,
  Compass,
  MessagesSquare,
  Tag,
  ShieldCheck,
  Check,
  Clock,
  HelpCircle,
  Users2,
  Sliders,
} from 'lucide-react';

interface ProjectDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: 'المشروع غير موجود | أنجزها' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://engezha.vercel.app';

  return {
    title: `${project.title} | أنجزها لإنتاج المشاريع الرقمية`,
    description: project.short_description,
    alternates: {
      canonical: `${baseUrl}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | أنجزها`,
      description: project.short_description,
      images: [project.cover_image],
      url: `${baseUrl}/projects/${project.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
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

  const allProjects = await getPublishedProjects();
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && p.category_id === project.category_id)
    .slice(0, 3);

  const reviews = await getProjectReviews(project.id);
  const previewHref = `/preview/${project.slug}`;
  const directDemoUrl = project.demo_url || `https://${project.slug}.vercel.app`;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://engezha.vercel.app';
  const pageUrl = `${baseUrl}/projects/${project.slug}`;

  // Structured Data (JSON-LD)
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.short_description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All modern web browsers, iOS, Android, Windows, macOS',
    image: `${baseUrl}${project.cover_image}`,
    url: pageUrl,
    author: {
      '@type': 'Organization',
      name: 'انجزها | ENGEZHA',
      url: baseUrl,
    },
    aggregateRating: project.avg_rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: project.avg_rating,
          reviewCount: project.review_count || 1,
        }
      : undefined,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'المشاريع',
        item: `${baseUrl}/projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <MainHeader />
      <main className="flex-1 w-full max-w-full overflow-x-hidden py-6 sm:py-10 bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted overflow-x-auto max-w-full pb-1">
            <Link href="/" className="hover:text-brand-primary dark:hover:text-brand-dark-primary flex-shrink-0">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-brand-primary dark:hover:text-brand-dark-primary flex-shrink-0">
              المشاريع
            </Link>
            <span>/</span>
            <span className="text-brand-text dark:text-brand-dark-text font-bold truncate max-w-[200px] sm:max-w-xs">
              {project.title}
            </span>
          </nav>

          {/* Project Header Hero */}
          <div className="bg-white dark:bg-brand-dark-surface rounded-2xl sm:rounded-3xl border border-brand-border dark:border-brand-dark-border p-4 sm:p-8 md:p-10 shadow-sm space-y-5 sm:space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {project.badge && (
                  <span
                    className="px-2.5 py-1 rounded-xl text-white text-xs font-extrabold shadow-sm"
                    style={{ backgroundColor: project.accent_color || '#5B2C6F' }}
                  >
                    {project.badge}
                  </span>
                )}
                {project.category && (
                  <span className="px-2.5 py-1 rounded-xl bg-brand-subtle dark:bg-brand-dark-border text-brand-primary dark:text-brand-dark-primary text-xs font-bold">
                    {project.category.name}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {project.production_status === 'ready_to_launch'
                      ? 'جاهز للإطلاق الفوري'
                      : 'قابل للتخصيص والتطوير'}
                  </span>
                </span>
              </div>

              {/* Live Preview Direct Pill */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={previewHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-600 hover:text-white transition-all text-xs font-bold shadow-xs"
                  title="استعراض الموقع في استوديو المعاينة التفاعلي"
                >
                  <Globe className="w-4 h-4" />
                  <span>معاينة حية للمشروع ↗</span>
                </Link>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text leading-tight break-words">
                {project.title}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-brand-muted dark:text-brand-dark-muted max-w-4xl leading-relaxed">
                {project.short_description}
              </p>
            </div>

            {/* Quick Hero Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full">
              <Link
                href={previewHref}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl bg-brand-primary text-white font-bold text-xs sm:text-sm hover:bg-brand-primaryHover shadow-md transition-all active:scale-[0.98]"
              >
                <Globe className="w-4 h-4 text-emerald-300" />
                <span>تجربة ومعاينة الموقع لايف</span>
              </Link>

              <ProjectLaunchButton
                href={`/start-project?project=${project.id}`}
                variant="accent"
                showIcon={false}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-900/20 active:scale-[0.98]"
              >
                <MessagesSquare className="w-4 h-4" />
                <span>ناقش السعر واطلب موقعك الآن</span>
              </ProjectLaunchButton>

              <a
                href={directDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-brand-dark-border text-slate-700 dark:text-brand-dark-text hover:bg-slate-200 dark:hover:bg-brand-dark-border/80 text-xs font-bold transition-all"
                title="فتح رابط الموقع المباشر في تبويب مستقل"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>الرابط المباشر للموقع</span>
              </a>
            </div>
          </div>

          {/* Main Grid: Gallery & Visual Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-8">
              {/* Visual Gallery Showcase */}
              <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h2 className="text-base font-bold text-brand-text dark:text-brand-dark-text flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-primary dark:text-brand-dark-primary" />
                    <span>واجهات وتصميم النموذج</span>
                  </h2>
                  <Link
                    href={previewHref}
                    className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary hover:underline flex items-center gap-1"
                  >
                    <span>فتح المعاينة التفاعلية</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <ProjectGallery
                  coverImage={project.cover_image}
                  galleryImages={project.gallery_images}
                  title={project.title}
                />
              </div>

              {/* Section 1: Target Audience & Problem Solved */}
              <div className="bg-white dark:bg-brand-dark-surface rounded-2xl sm:rounded-3xl border border-brand-border dark:border-brand-dark-border p-4 sm:p-6 md:p-8 space-y-5 shadow-sm">
                {project.problem_solved && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      التحدي المحلول
                    </span>
                    <h2 className="text-base sm:text-lg font-extrabold text-brand-text dark:text-brand-dark-text">
                      كيف يساعد هذا المشروع نشاطك التجاري؟
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                      {project.problem_solved}
                    </p>
                  </div>
                )}

                {project.target_audience && project.target_audience.length > 0 && (
                  <div className="pt-4 border-t border-brand-border/60 dark:border-brand-dark-border space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      الجمهور المستهدف
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.target_audience.map((aud, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                        >
                          <Users2 className="w-3.5 h-3.5 text-brand-primary dark:text-purple-400" />
                          <span>{aud}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Features & Functions */}
              {project.features && project.features.length > 0 && (
                <div className="bg-white dark:bg-brand-dark-surface rounded-2xl sm:rounded-3xl border border-brand-border dark:border-brand-dark-border p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 shadow-sm">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary dark:text-brand-dark-primary">
                      القيمة والميزات
                    </span>
                    <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-brand-text dark:text-brand-dark-text mt-1">
                      أبرز ما يقدمه هذا الموقع لنشاطك التجاري
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {project.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-brand-bg dark:bg-brand-dark-bg border border-brand-border dark:border-brand-dark-border text-right transition-colors"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-brand-text dark:text-brand-dark-text leading-relaxed">
                            {feat}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 3: Delivery Scope (What you receive) */}
              <div className="bg-white dark:bg-brand-dark-surface rounded-2xl sm:rounded-3xl border border-brand-border dark:border-brand-dark-border p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 shadow-sm">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    نطاق العمل والتسليم
                  </span>
                  <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-brand-text dark:text-brand-dark-text mt-1">
                    ماذا يشمل طلب تنفيذ هذا النموذج؟
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {(project.delivery_scope || [
                    'تخصيص الهوية والشعار والألوان 100%',
                    'استضافة سحابية سريعة ودومين خاص مشمول',
                    'ربط مباشر بالواتساب وبوابات الدفع الإلكتروني',
                    'لوحة تحكم إدارية سهلة وتدريب كامل لفريقك',
                  ]).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200/80 dark:border-brand-dark-border space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        <h3 className="text-xs sm:text-sm font-bold text-brand-text dark:text-brand-dark-text">
                          {item}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Customization Options & Roadmap */}
              {project.customization_options && project.customization_options.length > 0 && (
                <div className="bg-white dark:bg-brand-dark-surface rounded-2xl sm:rounded-3xl border border-brand-border dark:border-brand-dark-border p-4 sm:p-6 md:p-8 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-brand-accent dark:text-brand-dark-action" />
                    <h2 className="text-base sm:text-lg font-bold text-brand-text dark:text-brand-dark-text">
                      خيارات التخصيص والإضافات المتاحة
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {project.customization_options.map((opt, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary dark:bg-purple-400 mt-2 flex-shrink-0" />
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Section 5: Technical Capabilities & Tech Specs */}
              <div className="bg-white dark:bg-brand-dark-surface rounded-2xl sm:rounded-3xl border border-brand-border dark:border-brand-dark-border p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 shadow-sm">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-brand-text dark:text-brand-dark-text mb-2">
                    تفاصيل معمارية النظام والمواصفات التقنية
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-brand-dark-muted leading-relaxed whitespace-pre-line">
                    {project.detailed_description}
                  </p>
                </div>

                {project.tech_specs && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {project.tech_specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-400 font-medium">{spec.label}:</span>
                        <span className="font-bold text-brand-text dark:text-white">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <h3 className="text-xs font-bold text-brand-text dark:text-brand-dark-text mb-2.5 uppercase tracking-wider">
                    التقنيات المستخدمة
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technology_tags.map((tag) => (
                      <TechnologyTag key={tag} tag={tag} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 6: Project FAQ */}
              {project.faq_items && project.faq_items.length > 0 && (
                <div className="bg-white dark:bg-brand-dark-surface rounded-2xl sm:rounded-3xl border border-brand-border dark:border-brand-dark-border p-4 sm:p-6 md:p-8 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-brand-primary dark:text-purple-400" />
                    <h2 className="text-base sm:text-lg font-bold text-brand-text dark:text-brand-dark-text">
                      أسئلة شائعة حول هذا المشروع
                    </h2>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {project.faq_items.map((faq, fIdx) => (
                      <div key={fIdx} className="py-3.5 space-y-1.5">
                        <h3 className="text-xs sm:text-sm font-bold text-brand-text dark:text-white">
                          {faq.question}
                        </h3>
                        <p className="text-xs text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {reviews && reviews.length > 0 && (
                <ReviewList projectId={project.id} initialReviews={reviews} />
              )}
            </div>

            {/* Sticky Sidebar CTA */}
            <div className="lg:col-span-4 space-y-6">
              <div
                className="sticky top-24 bg-white dark:bg-brand-dark-surface rounded-2xl sm:rounded-3xl border border-brand-border dark:border-brand-dark-border p-4 sm:p-6 md:p-8 shadow-sm space-y-5 sm:space-y-6 transition-colors"
                style={{
                  borderTopColor: project.accent_color || '#FF6B00',
                  borderTopWidth: '4px',
                }}
              >
                <div>
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold mb-2 text-white shadow-xs"
                    style={{ backgroundColor: project.accent_color || '#5B2C6F' }}
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>{project.badge || 'جاهز للتنفيذ'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-brand-text dark:text-brand-dark-text mt-1">
                    طلب تسعير وتنفيذ النموذج
                  </h3>
                  <p className="text-xs text-brand-muted dark:text-brand-dark-muted mt-2 leading-relaxed">
                    احصل على استشارة فنية مجانية، وعرض سعر مخصص لتهيئة هذا النموذج بهوية شركتك ومتطلباتك الخاصة.
                  </p>
                </div>

                {project.estimated_timeline && (
                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 flex items-center gap-2.5 text-xs text-purple-900 dark:text-purple-300 font-bold">
                    <Clock className="w-4 h-4 text-brand-accent flex-shrink-0" />
                    <span>المدة المتوقعة: {project.estimated_timeline}</span>
                  </div>
                )}

                {/* Conversion Actions */}
                <div className="space-y-3 pt-1">
                  {/* Primary WhatsApp / Launch CTA */}
                  <ProjectLaunchButton
                    href={`/start-project?project=${project.id}`}
                    variant="accent"
                    showIcon={false}
                    className="w-full py-4 px-5 rounded-2xl text-sm font-extrabold shadow-lg shadow-orange-900/25 flex items-center justify-center gap-2"
                  >
                    <MessagesSquare className="w-4 h-4" />
                    <span>ناقش السعر وخطة التنفيذ</span>
                    <ArrowLeft className="w-4 h-4 mr-auto" />
                  </ProjectLaunchButton>

                  {/* Live Interactive Preview Button */}
                  <Link
                    href={previewHref}
                    className="w-full py-3.5 px-4 rounded-2xl bg-brand-subtle dark:bg-brand-dark-border text-brand-primary dark:text-brand-dark-primary hover:bg-brand-primary hover:text-white dark:hover:bg-brand-dark-primary dark:hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-2 text-center"
                    title="تجربة الموقع لايف في بيئة تفاعلية"
                  >
                    <Globe className="w-4 h-4" />
                    <span>معاينة حية للمشروع ↗</span>
                  </Link>

                  {/* Custom Project Link */}
                  <ProjectLaunchButton
                    href="/start-project?mode=custom"
                    variant="secondary"
                    showIcon={false}
                    className="w-full py-3 px-4 rounded-2xl text-xs font-bold"
                  >
                    <Compass className="w-4 h-4 text-brand-primary dark:text-brand-dark-primary" />
                    <span>أو طلب تصميم مخصص من الصفر</span>
                  </ProjectLaunchButton>
                </div>

                {/* Guarantee & Transparency Note */}
                <div className="p-4 rounded-2xl bg-brand-subtle/50 dark:bg-brand-dark-border/40 border border-brand-border/60 dark:border-brand-dark-border space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-brand-primary dark:text-brand-dark-primary">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>ضمان الجودة والتسليم المعتمد</span>
                  </div>
                  <p className="text-[11px] text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                    اتفاقية عدم إفصاح NDA + كود نظيف وتصميم عصري متجاوب 100% مع ضمان صيانة تشغيلية.
                  </p>
                </div>

                {/* Metadata Details */}
                <div className="pt-4 border-t border-brand-border/70 dark:border-brand-dark-border space-y-2.5 text-xs text-brand-muted dark:text-brand-dark-muted">
                  <div className="flex items-center justify-between">
                    <span>نوع العمل:</span>
                    <span className="font-semibold text-brand-text dark:text-brand-dark-text">
                      {project.project_type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>التصنيف:</span>
                    <span className="font-semibold text-brand-text dark:text-brand-dark-text">
                      {project.category?.name || 'مشاريع رقمية'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>حالة التنفيذ:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      متاح للتطوير الفوري
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Projects Section */}
          {relatedProjects.length > 0 && (
            <div className="space-y-6 pt-10 border-t border-brand-border/60 dark:border-brand-dark-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-text dark:text-brand-dark-text">
                    مشاريع مشابهة قد تهمك
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted mt-1">
                    استكشف نماذج أخرى من نفس التصنيف تلائم فكرتك.
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="text-xs font-bold text-brand-primary dark:text-purple-300 hover:text-brand-accent transition-colors flex items-center gap-1"
                >
                  <span>كافة النماذج ({allProjects.length})</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((rel) => (
                  <ProjectCard key={rel.id} project={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <MainFooter />
    </>
  );
}
