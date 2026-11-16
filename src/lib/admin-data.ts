import { getAdminClient } from './supabase/admin';
import { ProjectInquiry } from '@/types';
import { DEMO_PROJECTS } from './catalog-config';

export async function getAdminOverviewMetrics() {
  const adminClient = getAdminClient();

  if (!adminClient) {
    // Standalone fallback stats
    return {
      totalProjects: DEMO_PROJECTS.length,
      totalInquiries: 0,
      newInquiriesCount: 0,
      totalReviews: 0,
      averageRating: 0,
      failedNotificationsCount: 0,
      recentInquiries: [] as ProjectInquiry[],
    };
  }

  try {
    // Projects count
    const { count: projectsCount } = await adminClient
      .from('projects')
      .select('*', { count: 'exact', head: true });

    // Inquiries metrics
    const { data: inquiries } = await adminClient
      .from('project_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    const totalInquiries = inquiries?.length || 0;
    const newInquiriesCount =
      inquiries?.filter((i) => i.status === 'new').length || 0;
    const failedNotificationsCount =
      inquiries?.filter((i) => i.notification_status === 'failed').length || 0;
    const recentInquiries = (inquiries?.slice(0, 5) || []) as ProjectInquiry[];

    // Reviews metrics
    const { data: reviews } = await adminClient
      .from('reviews')
      .select('rating')
      .eq('is_hidden', false);

    const totalReviews = reviews?.length || 0;
    const averageRating =
      totalReviews > 0
        ? parseFloat(
            (
              reviews!.reduce((acc, curr) => acc + curr.rating, 0) /
              totalReviews
            ).toFixed(1)
          )
        : 0;

    return {
      totalProjects: projectsCount || DEMO_PROJECTS.length,
      totalInquiries,
      newInquiriesCount,
      totalReviews,
      averageRating,
      failedNotificationsCount,
      recentInquiries,
    };
  } catch (err) {
    console.error('Error fetching admin metrics:', err);
    return {
      totalProjects: DEMO_PROJECTS.length,
      totalInquiries: 0,
      newInquiriesCount: 0,
      totalReviews: 0,
      averageRating: 0,
      failedNotificationsCount: 0,
      recentInquiries: [],
    };
  }
}

export async function getAllInquiries(filterStatus?: string) {
  const adminClient = getAdminClient();
  if (!adminClient) return [];

  try {
    let query = adminClient
      .from('project_inquiries')
      .select('*, attachments:inquiry_attachments(*)')
      .order('created_at', { ascending: false });

    if (filterStatus && filterStatus !== 'all') {
      query = query.eq('status', filterStatus);
    }

    const { data, error } = await query;
    if (error || !data) return [];
    return data as ProjectInquiry[];
  } catch {
    return [];
  }
}

export async function getInquiryById(id: string): Promise<ProjectInquiry | null> {
  const adminClient = getAdminClient();
  if (!adminClient) return null;

  try {
    const { data: inquiry, error } = await adminClient
      .from('project_inquiries')
      .select('*, attachments:inquiry_attachments(*), internal_notes:inquiry_internal_notes(*)')
      .eq('id', id)
      .single();

    if (error || !inquiry) return null;
    return inquiry as ProjectInquiry;
  } catch {
    return null;
  }
}

