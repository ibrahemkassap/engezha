import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { ProjectLaunchButton } from '../transitions/ProjectLaunchButton';
import {
  Globe,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const accentColor = project.accent_color || '#5B2C6F';
  const previewHref = `/preview/${project.slug}`;

  return (
    <article
      className="group relative bg-white dark:bg-brand-dark-surface rounded-2xl border border-brand-border dark:border-brand-dark-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
      style={{
        borderTopColor: accentColor,
        borderTopWidth: '3px',
      }}
    >
      {/* Cover image wrapper with interactive hover overlay */}
      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
        <Image
          src={project.cover_image}
          alt={project.title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 left-3 flex items-center justify-between gap-2 z-10">
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

        {/* Live Demo Quick Action on Image Hover */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4 z-20">
          <Link
            href={previewHref}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-xl hover:bg-slate-100 transition-all active:scale-95"
            title="تجربة ومعاينة الموقع لايف"
          >
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>معاينة حية للمشروع</span>
          </Link>
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/90 text-white font-bold text-xs border border-white/20 hover:bg-slate-900 transition-all active:scale-95"
            title="عرض كامل التفاصيل"
          >
            <span>التفاصيل</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Project type pill bottom right */}
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
          <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10 shadow-xs">
            {project.project_type}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Status availability row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>جاهز للتنفيذ والتخصيص</span>
            </span>
            <span className="text-[11px] font-mono text-brand-muted dark:text-brand-dark-muted">
              {project.technology_tags[0] || 'Web Solution'}
            </span>
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

          {/* 3 Core Highlights Bullets (Clean & High-Converting) */}
          {project.features && project.features.length > 0 && (
            <div className="mt-4 space-y-1.5 pt-3 border-t border-brand-border/60 dark:border-brand-dark-border/60">
              {project.features.slice(0, 2).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-brand-text dark:text-brand-dark-text truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span className="truncate text-[11px] sm:text-xs text-brand-muted dark:text-brand-dark-muted">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clean, Organized Dual-Action Buttons */}
        <div className="pt-4 border-t border-brand-border/70 dark:border-brand-dark-border flex items-center justify-between gap-2">
          {/* Live Preview Button */}
          <Link
            href={previewHref}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2.5 rounded-xl bg-brand-subtle dark:bg-brand-dark-border text-brand-primary dark:text-brand-dark-primary hover:bg-brand-primary hover:text-white dark:hover:bg-brand-dark-primary dark:hover:text-white transition-all shadow-xs flex-1 text-center"
            title="تجربة ومعاينة الموقع لايف"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>معاينة حية ↗</span>
          </Link>

          {/* Direct Customization & Order CTA with Transition */}
          <ProjectLaunchButton
            href={`/start-project?project=${project.id}`}
            variant="accent"
            showIcon={false}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-md shadow-orange-900/20 flex-1 text-center"
            title="ناقش السعر واطلب موقعاً مشابهاً لهويتك"
          >
            <span>اطلب مثله</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </ProjectLaunchButton>
        </div>
      </div>
    </article>
  );
}
