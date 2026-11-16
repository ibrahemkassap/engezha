import { getAdminClient } from './supabase/admin';
import { INITIAL_CATEGORIES, DEMO_PROJECTS } from './catalog-config';
import { Project, ProjectCategory } from '@/types';

export async function getCategories(): Promise<ProjectCategory[]> {
  try {
    const admin = getAdminClient();
    if (!admin) return INITIAL_CATEGORIES;

    const { data, error } = await admin
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return INITIAL_CATEGORIES;
    }

    return data as ProjectCategory[];
  } catch {
    return INITIAL_CATEGORIES;
  }
}

export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const admin = getAdminClient();
    if (!admin) return DEMO_PROJECTS;

    const { data: projects, error } = await admin
      .from('projects')
      .select('*, category:categories(*)')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error || !projects || projects.length === 0) {
      return DEMO_PROJECTS;
    }

    // Attach ratings summary if available
    const { data: ratingSummaries } = await admin
      .from('project_rating_summary')
      .select('*');

    const ratingsMap = new Map<string, { avg_rating: number; review_count: number }>();
    if (ratingSummaries) {
      ratingSummaries.forEach((r) => {
        ratingsMap.set(r.project_id, {
          avg_rating: r.avg_rating,
          review_count: r.review_count,
        });
      });
    }

    const demoMap = new Map(DEMO_PROJECTS.map((dp) => [dp.slug, dp.demo_url]));

    return projects.map((p) => ({
      ...p,
      demo_url: p.demo_url || demoMap.get(p.slug) || `/demos/${p.slug}/index.html`,
      avg_rating: ratingsMap.get(p.id)?.avg_rating,
      review_count: ratingsMap.get(p.id)?.review_count || 0,
    })) as Project[];
  } catch {
    return DEMO_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const admin = getAdminClient();
    if (!admin) {
      return DEMO_PROJECTS.find((p) => p.slug === slug) || null;
    }

    const { data: project, error } = await admin
      .from('projects')
      .select('*, category:categories(*)')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error || !project) {
      return DEMO_PROJECTS.find((p) => p.slug === slug) || null;
    }

    const fallbackDemo = DEMO_PROJECTS.find((p) => p.slug === slug)?.demo_url;

    // Get ratings
    const { data: ratingSummary } = await admin
      .from('project_rating_summary')
      .select('*')
      .eq('project_id', project.id)
      .single();

    return {
      ...project,
      demo_url: project.demo_url || fallbackDemo || `/demos/${slug}/index.html`,
      avg_rating: ratingSummary?.avg_rating,
      review_count: ratingSummary?.review_count || 0,
    } as Project;
  } catch {
    return DEMO_PROJECTS.find((p) => p.slug === slug) || null;
  }
}

export async function getProjectReviews(projectId: string) {
  try {
    const admin = getAdminClient();
    if (!admin) return [];

    const { data: reviews, error } = await admin
      .from('reviews')
      .select('*')
      .eq('project_id', projectId)
      .eq('is_hidden', false)
      .order('created_at', { ascending: false });

    if (error || !reviews) return [];
    return reviews;
  } catch {
    return [];
  }
}

