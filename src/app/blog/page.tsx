import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { getBlogArticles } from '@/lib/data';
import { BookOpen, Clock, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'مركز المعرفة ومقالات الهندسة الرقمية | أنجزها',
  description:
    'مقالات وأدلة هندسية متخصصة في تطوير المواقع، التجارة الإلكترونية، تحسين محركات البحث، والذكاء الاصطناعي في مصر والوطن العربي.',
  openGraph: {
    title: 'مركز المعرفة الرقمية | أنجزها',
    description:
      'أحدث المقالات التقنية وأسرار تحويل المشاريع الرقمية لمبيعات واستثمارات رابحة.',
  },
};

export default async function BlogIndexPage() {
  const articles = await getBlogArticles();

  return (
    <>
      <MainHeader />
      <main className="flex-1 w-full max-w-full overflow-x-hidden bg-brand-bg dark:bg-brand-dark-bg transition-colors duration-200">
        {/* Blog Hero */}
        <section className="relative py-14 sm:py-20 border-b border-brand-border/60 dark:border-brand-dark-border/60 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-subtle dark:bg-brand-dark-surface border border-brand-border dark:border-brand-dark-border text-xs font-bold text-brand-primary dark:text-purple-300">
              <BookOpen className="w-3.5 h-3.5" />
              <span>رؤى هندسية وتقنية لأصحاب الأعمال</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text dark:text-brand-dark-text tracking-tight">
              مركز المعرفة الرقمية <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-800 to-purple-950 dark:from-purple-300 dark:to-purple-500">
                خبرات عملية لبناء وتوسيع مشاريعك
              </span>
            </h1>

            <p className="text-sm sm:text-base text-brand-muted dark:text-brand-dark-muted max-w-2xl mx-auto leading-relaxed">
              مقالات موثقة يكتبها مهندسو أنجزها تشرح لك خطوات تحسين الأداء، مضاعفة مبيعات المتاجر، واختيار التقنيات المناسبة لنجاح مشروعك الرقمي.
            </p>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border overflow-hidden shadow-xs hover:shadow-xl hover:border-brand-primary/40 dark:hover:border-purple-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-purple-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs">
                        {article.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{article.read_time}</span>
                        </span>
                        <span>•</span>
                        <span>{new Date(article.published_at).toLocaleDateString('ar-EG')}</span>
                      </div>

                      <h2 className="text-lg font-extrabold text-brand-text dark:text-brand-dark-text group-hover:text-brand-primary dark:group-hover:text-purple-300 transition-colors leading-snug">
                        <Link href={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {article.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden bg-slate-800">
                        <Image
                          src={article.author.avatar}
                          alt={article.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {article.author.name}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary dark:text-purple-300 group-hover:text-brand-accent transition-colors"
                    >
                      <span>قراءة المقال</span>
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </>
  );
}
