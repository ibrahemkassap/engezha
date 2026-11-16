import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { TechnologyTag } from './TechnologyTag';
import { StarRatingDisplay } from '../reviews/StarRatingDisplay';
import { ProjectLaunchButton } from '../transitions/ProjectLaunchButton';
import { ArrowLeft, MessagesSquare } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const accentColor = project.accent_color || '#5B2C6F';

  return (
    <article
      className="group relative bg-white dark:bg-brand-dark-surface rounded-2xl border border-brand-border dark:border-brand-dark-border overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
      style={{
        borderTopColor: accentColor,
        borderTopWidth: '3px',
      }}
    >
      {/* Cover image wrapper */}
      <div className="relative aspect-[16/10] bg-slate-900/95 overflow-hidden">
        <Image
          src={project.cover_image}
          alt={project.title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient shadow overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 left-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          {project.badge ? (
            <span
              className="text-[11px] font-extrabold px-3 py-1 rounded-full text-white shadow-md backdrop-blur-md"
              style={{ backgroundColor: accentColor }}
            >
              {project.badge}
            </span>
          ) : (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-brand-deep/80 text-white backdrop-blur-md">
              مشروع معتمد
            </span>
          )}

          {project.category && (
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
              {project.category.name}
            </span>
          )}
        </div>

        {/* Project type pill bottom right of image */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="bg-white/95 dark:bg-brand-dark-surface/95 backdrop-blur-md text-brand-text dark:text-brand-dark-text text-[11px] font-bold px-2.5 py-1 rounded-lg border border-brand-border dark:border-brand-dark-border shadow-xs">
            {project.project_type}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Header row with rating */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span
              className="text-xs font-bold tracking-wide"
              style={{ color: accentColor }}
            >
              جاهز للتنفيذ الفوري
            </span>
            <StarRatingDisplay
              rating={project.avg_rating}
              count={project.review_count}
              size="sm"
            />
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-extrabold text-brand-text dark:text-brand-dark-text group-hover:text-brand-primary dark:group-hover:text-brand-dark-primary transition-colors line-clamp-1">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-dark-muted mt-2 line-clamp-2 leading-relaxed">
            {project.short_description}
          </p>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technology_tags.slice(0, 3).map((tag) => (
              <TechnologyTag key={tag} tag={tag} />
            ))}
            {project.technology_tags.length > 3 && (
              <span className="text-[11px] text-brand-muted dark:text-brand-dark-muted self-center">
                +{project.technology_tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Actions - Dedicated Price Discussion & Details */}
        <div className="pt-4 border-t border-brand-border/70 dark:border-brand-dark-border flex items-center justify-between gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-text dark:text-brand-dark-text hover:text-brand-primary dark:hover:text-brand-dark-primary transition-colors py-1"
            title="استعراض كامل ميزات وتفاصيل النموذج"
          >
            <span>التفاصيل</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>

          {/* Prominent Price Discussion CTA with Legendary Transition */}
          <ProjectLaunchButton
            href={`/start-project?project=${project.id}`}
            variant="accent"
            showIcon={false}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl"
            title="ناقش السعر وخطة التنفيذ المخصصة لهذا المشروع"
          >
            <MessagesSquare className="w-3.5 h-3.5" />
            <span>ناقش السعر والطلب</span>
          </ProjectLaunchButton>
        </div>
      </div>
    </article>
  );
}
