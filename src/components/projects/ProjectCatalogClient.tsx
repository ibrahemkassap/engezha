'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Project, ProjectCategory, ProductionStatus } from '@/types';
import { ProjectCard } from './ProjectCard';
import { ProjectSearch } from './ProjectSearch';
import { EmptyState } from '../ui/EmptyState';
import {
  SlidersHorizontal,
  X,
} from 'lucide-react';

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
  const currentStatus = (searchParams.get('status') as ProductionStatus | 'all') || 'all';
  const currentIndustry = searchParams.get('industry') || 'all';
  const currentTech = searchParams.get('tech') || 'all';
  const currentQuery = searchParams.get('q') || '';
  const currentSort = searchParams.get('sort') || 'newest';

  const [searchQuery, setSearchQuery] = useState(currentQuery);
  const [selectedCategory, setSelectedCategory] = useState(currentCategorySlug);
  const [selectedStatus, setSelectedStatus] = useState<string>(currentStatus);
  const [selectedIndustry, setSelectedIndustry] = useState(currentIndustry);
  const [selectedTech, setSelectedTech] = useState(currentTech);
  const [selectedSort, setSelectedSort] = useState(currentSort);

  // Collect unique technologies across all projects for quick chips
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    initialProjects.forEach((p) => {
      p.technology_tags?.forEach((t) => techSet.add(t));
    });
    return Array.from(techSet).slice(0, 10);
  }, [initialProjects]);

  // Sync with URL params
  const updateUrl = (
    newCategory: string,
    newStatus: string,
    newIndustry: string,
    newTech: string,
    newQuery: string,
    newSort: string
  ) => {
    const params = new URLSearchParams();
    if (newCategory && newCategory !== 'all') params.set('category', newCategory);
    if (newStatus && newStatus !== 'all') params.set('status', newStatus);
    if (newIndustry && newIndustry !== 'all') params.set('industry', newIndustry);
    if (newTech && newTech !== 'all') params.set('tech', newTech);
    if (newQuery.trim()) params.set('q', newQuery.trim());
    if (newSort && newSort !== 'newest') params.set('sort', newSort);

    const queryString = params.toString();
    router.replace(queryString ? `/projects?${queryString}` : '/projects', {
      scroll: false,
    });
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    updateUrl(slug, selectedStatus, selectedIndustry, selectedTech, searchQuery, selectedSort);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    updateUrl(selectedCategory, status, selectedIndustry, selectedTech, searchQuery, selectedSort);
  };

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    updateUrl(selectedCategory, selectedStatus, industry, selectedTech, searchQuery, selectedSort);
  };

  const handleTechChange = (tech: string) => {
    const nextTech = selectedTech === tech ? 'all' : tech;
    setSelectedTech(nextTech);
    updateUrl(selectedCategory, selectedStatus, selectedIndustry, nextTech, searchQuery, selectedSort);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    updateUrl(selectedCategory, selectedStatus, selectedIndustry, selectedTech, q, selectedSort);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    updateUrl(selectedCategory, selectedStatus, selectedIndustry, selectedTech, searchQuery, sort);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedIndustry('all');
    setSelectedTech('all');
    setSelectedSort('newest');
    router.replace('/projects', { scroll: false });
  };

  // Filter and sort computation
  const filteredProjects = useMemo(() => {
    return initialProjects
      .filter((project) => {
        // Category filter
        if (selectedCategory !== 'all') {
          const cat = categories.find((c) => c.slug === selectedCategory);
          if (cat && project.category_id !== cat.id) return false;
        }

        // Production Status filter
        if (selectedStatus !== 'all') {
          if (project.production_status !== selectedStatus) return false;
        }

        // Industry filter
        if (selectedIndustry !== 'all') {
          if (project.industry !== selectedIndustry) return false;
        }

        // Technology tag filter
        if (selectedTech !== 'all') {
          const hasTag = project.technology_tags.some(
            (t) => t.toLowerCase() === selectedTech.toLowerCase()
          );
          if (!hasTag) return false;
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
      })
      .sort((a, b) => {
        if (selectedSort === 'highest-rated') {
          const aRating = a.avg_rating || 0;
          const bRating = b.avg_rating || 0;
          return bRating - aRating;
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [
    initialProjects,
    categories,
    selectedCategory,
    selectedStatus,
    selectedIndustry,
    selectedTech,
    searchQuery,
    selectedSort,
  ]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedStatus !== 'all' ||
    selectedIndustry !== 'all' ||
    selectedTech !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedSort !== 'newest';

  return (
    <div className="space-y-8">
      {/* Search and Advanced Filter Panel */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-5 sm:p-7 shadow-xs space-y-5 transition-colors">
        {/* Main Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8">
            <ProjectSearch
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="ابحث باسم المشروع، الكلمات المفتاحية، أو التقنيات (مثل: Next.js, Stripe, POS)..."
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-brand-muted dark:text-brand-dark-muted flex-shrink-0" />
            <select
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border dark:border-brand-dark-border bg-white dark:bg-brand-dark-bg text-xs font-bold text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-dark-primary"
            >
              <option value="newest">الترتيب: الأحدث أولاً</option>
              <option value="highest-rated">الترتيب: الأعلى تقييماً</option>
            </select>
          </div>
        </div>

        {/* Filter Bar 1: Category Filter Buttons */}
        <div className="pt-2 border-t border-brand-border/60 dark:border-brand-dark-border space-y-2">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
            التصنيفات الرئيسية
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-brand-primary dark:bg-brand-dark-primary text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-brand-dark-text hover:bg-slate-200'
              }`}
            >
              جميع الأقسام ({initialProjects.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-brand-primary dark:bg-brand-dark-primary text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-brand-dark-text hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar 2: Production Status & Industry Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-brand-border/60 dark:border-brand-dark-border">
          {/* Production Status */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
              حالة الجاهزية والإنتاج
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-brand-text dark:text-brand-dark-text"
            >
              <option value="all">كافة حالات الإنتاج</option>
              <option value="ready_to_launch">جاهز للإطلاق الفوري</option>
              <option value="customizable">قابل للتخصيص المباشر</option>
              <option value="under_development">قيد التطوير الهندسي</option>
            </select>
          </div>

          {/* Industry Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
              مجال ونشاط العمل (Industry)
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => handleIndustryChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-brand-border dark:border-brand-dark-border bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-brand-text dark:text-brand-dark-text"
            >
              <option value="all">كافة الأنشطة والمجالات</option>
              <option value="aviation">طيران و VIP Concierge</option>
              <option value="healthcare">طبي، عيادات ومستشفيات</option>
              <option value="ecommerce">تجارة ومتاجر إلكترونية</option>
              <option value="retail">تجزئة وكاشير POS</option>
              <option value="technology">تكنولوجيا وذكاء اصطناعي</option>
              <option value="services">خدمات وفواتير ضريبية</option>
              <option value="education">استشارات وتدريب</option>
            </select>
          </div>
        </div>

        {/* Filter Bar 3: Quick Tech Chips */}
        <div className="pt-2 border-t border-brand-border/60 dark:border-brand-dark-border space-y-2">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
            تصفية سريعة بحسب التقنية
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {allTechnologies.map((tech) => {
              const isSelected = selectedTech === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleTechChange(tech)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  #{tech}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Summary & Reset */}
        <div className="pt-3 border-t border-brand-border/60 dark:border-brand-dark-border flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-brand-primary dark:text-purple-300">
              النتائج المطابقة:
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200">
              {filteredProjects.length} مشروع
            </span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-3 py-1.5 rounded-xl font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 inline-flex items-center gap-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>إعادة تعيين كافة الفلاتر</span>
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title="لم نتمكن من العثور على نماذج مطابقة لهذه الفلاتر"
          description="جرب إزالة بعض معايير التصفية، أو احكيلنا فكرتك وسنقوم بتصميم وبرمجة مشروعك المخصص بالكامل من الصفر."
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
