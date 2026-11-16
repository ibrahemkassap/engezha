import Link from 'next/link';
import { Project } from '@/types';
import { ProjectCard } from '../projects/ProjectCard';
import { ArrowLeft } from 'lucide-react';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="py-20 bg-brand-bg dark:bg-brand-dark-bg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary tracking-wider uppercase bg-brand-subtle dark:bg-brand-dark-border px-3 py-1 rounded-full">
              معرض الأعمال والنماذج
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text dark:text-brand-dark-text mt-3">
              أعمال تقدر تبدأ منها
            </h2>
            <p className="text-base text-brand-muted dark:text-brand-dark-muted mt-2 max-w-xl leading-relaxed">
              اختر نموذجًا من أعمالنا التوضيحية لتطوير فكرتك عليه، أو اطلب إضافة ميزات وتعديلات خاصة.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary dark:text-brand-dark-primary hover:text-brand-primaryHover dark:hover:text-purple-400 transition-colors self-start md:self-auto"
          >
            <span>عرض كل المشاريع ({projects.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
