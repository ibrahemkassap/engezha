import { ProjectCategory } from '@/types';
import { CategoryCard } from './CategoryCard';

interface CategoryGridProps {
  categories: ProjectCategory[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section id="categories" className="py-20 bg-slate-50 dark:bg-brand-dark-surface/50 border-y border-brand-border dark:border-brand-dark-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary tracking-wider uppercase bg-brand-subtle dark:bg-brand-dark-border px-3 py-1 rounded-full">
            التصنيفات والخدمات
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text mt-3">
            إيه اللي حابب تنفذه؟
          </h2>
          <p className="text-base text-brand-muted dark:text-brand-dark-muted mt-3 leading-relaxed">
            تصفح النماذج والمشاريع المنفذة في مختلف المجالات، أو ابدأ فكرتك الجديدة على مقاسك.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
