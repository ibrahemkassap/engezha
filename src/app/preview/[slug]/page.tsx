import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getPublishedProjects } from '@/lib/data';
import { LivePreviewStudio } from '@/components/projects/LivePreviewStudio';

interface PreviewPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PreviewPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: 'المشروع غير موجود' };
  }

  return {
    title: `معاينة حية لايف: ${project.title} | أنجزها`,
    description: `استكشف وجرّب نموذج ${project.title} بشكل مباشر وتفاعلي عبر منصة أنجزها لتنفيذ وتطوير المشاريع الرقمية.`,
  };
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export const revalidate = 60;

export default async function ProjectPreviewPage({ params }: PreviewPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <LivePreviewStudio project={project} />;
}
