import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { getServices, getServiceBySlug, getPublishedProjects } from '@/lib/data';
import { ProjectLaunchButton } from '@/components/transitions/ProjectLaunchButton';
import { ProjectCard } from '@/components/projects/ProjectCard';
import {
  Building2,
  ShoppingBag,
  Smartphone,
  LayoutDashboard,
  Cpu,
  Code2,
  ShieldCheck,
  Search,
  CheckCircle2,
  ArrowLeft,
  Clock,
  Sparkles,
  HelpCircle,
  PackageCheck,
  Users2,
  MessageCircle,
} from 'lucide-react';

interface ServicePageProps {
  params: { slug: string };
}

const iconMap: Record<string, React.ElementType> = {
  Building2,
  ShoppingBag,
  Smartphone,
  LayoutDashboard,
  Cpu,
  Code2,
  ShieldCheck,
  Search,
};

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) {
    return { title: 'الخدمة غير موجودة | أنجزها' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://engezha.vercel.app';

  return {
    title: `${service.title} | أنجزها لإنتاج المشاريع البرمجية`,
    description: service.short_description,
    alternates: {
      canonical: `${baseUrl}/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | أنجزها`,
      description: service.short_description,
      url: `${baseUrl}/services/${service.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | أنجزها`,
      description: service.short_description,
    },
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export const revalidate = 60;

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug);
  if (!service) {
    notFound();
  }

  const allProjects = await getPublishedProjects();
  // Find related projects for this service
  const relatedProjects = allProjects
    .filter((p) => {
      if (service.slug === 'ecommerce-development') return p.category_id.includes('c2222222');
      if (service.slug === 'website-development') return p.category_id.includes('c1111111') || p.category_id.includes('c5555555') || p.category_id.includes('c6666666');
      if (service.slug === 'management-systems') return p.category_id.includes('c7777777');
      if (service.slug === 'ai-solutions') return p.technology_tags.some((t) => t.toLowerCase().includes('ai'));
      return true;
    })
    .slice(0, 3);

  const IconComponent = iconMap[service.icon_name] || Code2;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://engezha.vercel.app';

  // Structured Data (JSON-LD)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.short_description,
    provider: {
      '@type': 'Organization',
      name: 'انجزها | ENGEZHA',
      url: baseUrl,
      logo: `${baseUrl}/favicon.ico`,
      telephone: '+201017358087',
    },
    areaServed: 'Worldwide',
    serviceType: service.hero_badge,
    termsOfService: `${baseUrl}/terms`,
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
        name: 'الخدمات',
        item: `${baseUrl}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `${baseUrl}/services/${service.slug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <MainHeader />
      <main className="flex-1 w-full max-w-full overflow-x-hidden py-8 sm:py-12 bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted overflow-x-auto pb-1">
            <Link href="/" className="hover:text-brand-primary dark:hover:text-brand-dark-primary flex-shrink-0">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-brand-primary dark:hover:text-brand-dark-primary flex-shrink-0">
              الخدمات
            </Link>
            <span>/</span>
            <span className="text-brand-text dark:text-brand-dark-text font-bold truncate max-w-xs">
              {service.title}
            </span>
          </nav>

          {/* Service Hero Header */}
          <div className="relative bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-12 shadow-sm overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/50 dark:bg-purple-950/20 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-subtle dark:bg-brand-dark-border/60 text-brand-primary dark:text-purple-300 text-xs font-bold">
                  <IconComponent className="w-4 h-4" />
                  <span>{service.hero_badge}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text dark:text-brand-dark-text leading-tight">
                  {service.title}
                </h1>

                <p className="text-base sm:text-lg text-purple-900 dark:text-purple-300 font-semibold leading-relaxed">
                  {service.headline}
                </p>

                <p className="text-sm sm:text-base text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                  {service.detailed_description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <ProjectLaunchButton
                    href={`/start-project?service=${service.slug}`}
                    variant="glow"
                    className="px-8 py-3.5 rounded-xl font-bold text-sm shadow-md"
                  >
                    <span>طلب هذه الخدمة لمشروعك</span>
                  </ProjectLaunchButton>
                  <a
                    href={`https://wa.me/201017358087?text=${encodeURIComponent(
                      `مرحباً أنجزها، أود الاستفسار عن خدمة: ${service.title}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>محادثة واتساب مباشرة</span>
                  </a>
                </div>
              </div>

              {/* Specs & Timeline Widget */}
              <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-6 border border-brand-border dark:border-brand-dark-border space-y-4">
                <div className="flex items-center gap-2 text-brand-text dark:text-white font-extrabold text-sm pb-3 border-b border-slate-200 dark:border-slate-800">
                  <Clock className="w-4 h-4 text-brand-accent dark:text-brand-dark-action" />
                  <span>المدة التقديرية للتنفيذ</span>
                </div>
                <div className="text-base font-bold text-brand-primary dark:text-purple-300">
                  {service.timeline_estimate}
                </div>

                <div className="pt-2 space-y-2">
                  <span className="text-xs font-bold text-slate-400 block mb-2">
                    التقنيات المستخدمة
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Benefits & Deliverables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefits */}
            <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-brand-primary dark:text-purple-300 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-brand-text dark:text-brand-dark-text">
                  المزايا والقيمة التجارية لعملك
                </h2>
              </div>
              <ul className="space-y-3 pt-2">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-brand-text dark:text-brand-dark-text">
                  ماذا تستلم عند اكتمال المشروع؟
                </h2>
              </div>
              <ul className="space-y-3 pt-2">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Suitable For Persona */}
          <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Users2 className="w-5 h-5 text-brand-primary dark:text-purple-300" />
              <h2 className="text-lg font-extrabold text-brand-text dark:text-brand-dark-text">
                من هم المستفيدون الأنسب لهذه الخدمة؟
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {service.suitable_for.map((persona, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-brand-text dark:text-slate-300 flex items-center gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-primary dark:bg-purple-400 flex-shrink-0" />
                  <span>{persona}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Demo Projects if Available */}
          {relatedProjects.length > 0 && (
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-text dark:text-brand-dark-text">
                    نماذج أعمال حية تم تنفيذها بهذه التقنيات
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted mt-1">
                    استكشف مشاريع حقيقية تعمل حالياً وتجول في تفاصيلها وأكوادها.
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary dark:text-purple-300 hover:text-brand-accent transition-colors"
                >
                  <span>كافة النماذج المتاحة ({allProjects.length})</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Service FAQ */}
          <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-brand-primary dark:text-purple-300" />
              <h2 className="text-xl font-extrabold text-brand-text dark:text-brand-dark-text">
                الأسئلة الشائعة حول {service.title}
              </h2>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {service.faq.map((item, idx) => (
                <div key={idx} className="py-4 space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-brand-text dark:text-brand-dark-text">
                    {item.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Conversion CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 p-8 sm:p-12 text-center text-white space-y-6 shadow-xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              جاهز لتحويل فكرتك إلى مشروع رقمي ناجح؟
            </h2>
            <p className="text-sm sm:text-base text-purple-200 max-w-2xl mx-auto leading-relaxed">
              تواصل مع فريقنا الهندسي اليوم، واحصل على تحليل فني واستشارة مجانية تحدد لك خارطة الطريق والتكلفة الدقيقة.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <ProjectLaunchButton
                href={`/start-project?service=${service.slug}`}
                variant="glow"
                className="px-8 py-3.5 rounded-xl font-bold shadow-xl"
              >
                <span>بدء طلب {service.title}</span>
              </ProjectLaunchButton>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all"
              >
                <span>استكشاف باقي الخدمات</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <MainFooter />
    </>
  );
}
