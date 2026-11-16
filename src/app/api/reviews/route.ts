import { NextRequest, NextResponse } from 'next/server';
import { reviewSchema } from '@/lib/validations/review';
import { getAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ error: 'معرف المشروع مطلوب' }, { status: 400 });
    }

    const adminClient = getAdminClient();
    if (!adminClient) {
      // In offline/demo mode, return empty reviews list
      return NextResponse.json({ reviews: [], avgRating: 0, count: 0 });
    }

    const { data: reviews, error } = await adminClient
      .from('reviews')
      .select('id, project_id, display_name, comment, rating, created_at')
      .eq('project_id', projectId)
      .eq('is_hidden', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Reviews API] GET error:', error);
      return NextResponse.json({ error: 'تعذر جلب التقييمات' }, { status: 500 });
    }

    const count = reviews?.length || 0;
    const avgRating =
      count > 0
        ? parseFloat(
            (
              reviews.reduce((acc, curr) => acc + curr.rating, 0) / count
            ).toFixed(1)
          )
        : 0;

    return NextResponse.json({ reviews: reviews || [], avgRating, count });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || 'بيانات التقييم غير صالحة';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { projectId, displayName, rating, comment } = parsed.data;

    const newReview = {
      id: crypto.randomUUID(),
      project_id: projectId,
      display_name: displayName,
      rating,
      comment,
      is_hidden: false,
      created_at: new Date().toISOString(),
    };

    const adminClient = getAdminClient();
    if (adminClient) {
      const { error: dbError } = await adminClient.from('reviews').insert({
        id: newReview.id,
        project_id: newReview.project_id,
        display_name: newReview.display_name,
        rating: newReview.rating,
        comment: newReview.comment,
        is_hidden: false,
        created_at: newReview.created_at,
      });

      if (dbError) {
        console.error('[Reviews API] Insert error:', dbError);
        return NextResponse.json(
          { error: 'تعذر حفظ التقييم، يرجى المحاولة لاحقًا.' },
          { status: 500 }
        );
      }
    } else {
      console.warn('[Reviews API] Database not configured. Operating in test mode.');
    }

    return NextResponse.json({
      success: true,
      review: newReview,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
