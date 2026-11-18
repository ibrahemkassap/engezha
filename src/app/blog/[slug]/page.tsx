import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { getBlogArticles, getBlogArticleBySlug } from '@/lib/data';
import { ProjectLaunchButton } from '@/components/transitions/ProjectLaunchButton';
import {
  Clock,
  Calendar,
  Share2,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await getBlogArticleBySlug(params.slug);
  if (!article) {
    return { title: 'المقال غير موجود | أنجزها' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://engezha.vercel.app';

  return {
    title: `${article.title} | مدونة أنجزها`,
    description: article.excerpt,
    alternates: {
      canonical: `${baseUrl}/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      authors: [article.author.name],
      images: [article.cover_image],
      url: `${baseUrl}/blog/${article.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.cover_image],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getBlogArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export const revalidate = 60;

export default async function BlogDetailPage({ params }: ArticlePageProps) {
  const article = await getBlogArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://engezha.vercel.app';
  const articleUrl = `${baseUrl}/blog/${article.slug}`;

  // Structured Data (JSON-LD)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [`${baseUrl}${article.cover_image}`],
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'انجزها | ENGEZHA',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
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
        name: 'المدونة',
        item: `${baseUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <MainHeader />
      <main className="flex-1 w-full max-w-full overflow-x-hidden py-8 sm:py-14 bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-200">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted overflow-x-auto pb-1">
            <Link href="/" className="hover:text-brand-primary dark:hover:text-brand-dark-primary flex-shrink-0">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-brand-primary dark:hover:text-brand-dark-primary flex-shrink-0">
              مركز المعرفة
            </Link>
            <span>/</span>
            <span className="text-brand-text dark:text-brand-dark-text font-bold truncate max-w-xs">
              {article.title}
            </span>
          </nav>

          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-brand-primary dark:text-purple-300 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{article.category}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-text dark:text-brand-dark-text leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-brand-border/60 dark:border-brand-dark-border/60 text-xs text-brand-muted dark:text-brand-dark-muted">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-brand-border">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-brand-text dark:text-brand-dark-text text-sm">
                    {article.author.name}
                  </div>
                  <div className="text-[11px] text-slate-400">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-primary dark:text-purple-400" />
                  <span>{new Date(article.published_at).toLocaleDateString('ar-EG')}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-accent dark:text-brand-dark-action" />
                  <span>{article.read_time}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-slate-900 shadow-md">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Excerpt Callout */}
          <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border-r-4 border-brand-primary dark:border-purple-400 text-sm sm:text-base font-semibold text-purple-950 dark:text-purple-200 leading-relaxed">
            {article.excerpt}
          </div>

          {/* Body Content */}
          <div className="prose dark:prose-invert max-w-none text-brand-text dark:text-brand-dark-text space-y-6 leading-relaxed text-sm sm:text-base">
            {article.content.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={pIdx}
                    className="text-lg sm:text-2xl font-extrabold text-brand-text dark:text-white pt-4 pb-1"
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const listItems = paragraph.split('\n').map((li) => li.replace('- ', ''));
                return (
                  <ul key={pIdx} className="space-y-2 list-none p-0 my-4">
                    {listItems.map((li, liIdx) => (
                      <li key={liIdx} className="flex items-start gap-2.5 text-brand-muted dark:text-brand-dark-muted">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={pIdx} className="text-brand-muted dark:text-brand-dark-muted leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags & Share */}
          <div className="pt-6 border-t border-brand-border dark:border-brand-dark-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400">الوسوم:</span>
              {article.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `${article.title}\n${articleUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة عبر واتساب</span>
            </a>
          </div>

          {/* Conversion Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950 to-indigo-950 text-white text-center space-y-5 shadow-xl mt-12">
            <h3 className="text-xl sm:text-3xl font-extrabold">
              هل لديك فكرة مشروع رقمي تريد مناقشتها؟
            </h3>
            <p className="text-xs sm:text-sm text-purple-200 max-w-xl mx-auto leading-relaxed">
              فريقنا الهندسي جاهز لتحليل متطلباتك وتقديم مقترح هندسي متكامل ومحدد التكاليف والجدول الزمني.
            </p>
            <div className="pt-2 flex justify-center">
              <ProjectLaunchButton
                href="/start-project"
                variant="glow"
                className="px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl"
              >
                <span>ابدأ مناقشة مشروعك</span>
              </ProjectLaunchButton>
            </div>
          </div>
        </article>
      </main>
      <MainFooter />
    </>
  );
}
