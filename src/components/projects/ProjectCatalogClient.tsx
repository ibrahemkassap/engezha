'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Project, ProjectCategory } from '@/types';
import { ProjectCard } from './ProjectCard';
import { ProjectSearch } from './ProjectSearch';
import { EmptyState } from '../ui/EmptyState';
import { SlidersHorizontal, X } from 'lucide-react';

interface ProjectCatalogClientProps {
  initialProjects: Project[];
  categories: ProjectCategory[];
}

export function ProjectCatalogClient({
  initialProjects,
  categories,
}: ProjectCatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategorySlug = searchParams.get('category') || 'all';
  const currentQuery = searchParams.get('q') || '';
  const currentSort = searchParams.get('sort') || 'newest';

  const [searchQuery, setSearchQuery] = useState(currentQuery);
  const [selectedCategory, setSelectedCategory] = useState(currentCategorySlug);
  const [selectedSort, setSelectedSort] = useState(currentSort);

  // Update URL params smoothly
  const updateUrl = (newCategory: string, newQuery: string, newSort: string) => {
    const params = new URLSearchParams();
    if (newCategory && newCategory !== 'all') params.set('category', newCategory);
    if (newQuery.trim()) params.set('q', newQuery.trim());
    if (newSort && newSort !== 'newest') params.set('sort', newSort);

    const queryString = params.toString();
    router.replace(queryString ? `/projects?${queryString}` : '/projects', {
      scroll: false,
    });
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    updateUrl(slug, searchQuery, selectedSort);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    updateUrl(selectedCategory, q, selectedSort);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    updateUrl(selectedCategory, searchQuery, sort);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSort('newest');
    router.replace('/projects', { scroll: false });
  };

  // Filter and sort computation
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const cat = categories.find((c) => c.slug === selectedCategory);
        if (cat && project.category_id !== cat.id) {
          return false;
        }
      }

      // Search keyword filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.short_description.toLowerCase().includes(query);
        const matchesType = project.project_type.toLowerCase().includes(query);
        const matchesTags = project.technology_tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );

        if (!matchesTitle && !matchesDesc && !matchesType && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'highest-rated') {
        const aRating = a.avg_rating || 0;
        const bRating = b.avg_rating || 0;
        return bRating - aRating;
      }
      // default newest
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [initialProjects, categories, selectedCategory, searchQuery, selectedSort]);

  const hasActiveFilters =
    selectedCategory !== 'all' || searchQuery.trim() !== '' || selectedSort !== 'newest';

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-brand-border dark:border-brand-dark-border p-5 shadow-xs space-y-4 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-8">
            <ProjectSearch
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="ابحث باسم المشروع، الكلمات المفتاحية، أو التقنيات (مثل: Next.js, Stripe)..."
            />
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-4 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-brand-muted dark:text-brand-dark-muted flex-shrink-0" />
            <select
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-dark-primary"
            >
              <option value="newest">الترتيب: الأحدث أولاً</option>
              <option value="highest-rated">الترتيب: الأعلى تقييماً</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-2 border-t border-brand-border/60 dark:border-brand-dark-border flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-brand-primary dark:bg-brand-dark-primary text-white shadow-xs'
                : 'bg-slate-100 dark:bg-brand-dark-border text-slate-700 dark:text-brand-dark-text hover:bg-slate-200 dark:hover:bg-brand-dark-border/70'
            }`}
          >
            جميع النماذج ({initialProjects.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-brand-primary dark:bg-brand-dark-primary text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-brand-dark-border text-slate-700 dark:text-brand-dark-text hover:bg-slate-200 dark:hover:bg-brand-dark-border/70'
              }`}
            >
              {cat.name}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 inline-flex items-center gap-1 whitespace-nowrap mr-auto transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>إعادة ضبط الفلاتر</span>
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title="لم نتمكن من العثور على مشاريع مطابقة"
          description="جرب البحث بكلمات أخرى أو اختر تصنيفًا مختلفًا من القائمة، أو اطلب منا تصميم مشروعك الخاص من الصفر."
          actionText="إعادة ضبط الفلاتر"
          onActionClick={handleClearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
