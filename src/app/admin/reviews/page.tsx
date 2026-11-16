import { getAdminClient } from '@/lib/supabase/admin';
import { MessageSquare, Star } from 'lucide-react';
import { formatArabicDate } from '@/lib/utils';
import { Review } from '@/types';

export const dynamic = 'force-dynamic';

async function getAllReviews(): Promise<Review[]> {
  const adminClient = getAdminClient();
  if (!adminClient) return [];

  try {
    const { data: reviews, error } = await adminClient
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !reviews) return [];
    return reviews as Review[];
  } catch {
    return [];
  }
}

export default async function AdminReviewsPage() {
  const reviews = await getAllReviews();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            المراجعة والرقابة
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-3">
            <MessageSquare className="w-7 h-7 text-indigo-400" />
            <span>إدارة التقييمات والتعليقات</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            مراجعة كافة تقييمات الزوار وإخفاء أو حذف أي تعليقات مسيئة أو سبام.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {reviews.length === 0 ? (
          <div className="text-center py-16 px-4">
            <MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              لا توجد تقييمات حالياً
            </h3>
            <p className="text-xs text-slate-400">
              لم يقم أي زائر بتقديم تقييم بعد. تظهر هنا التقييمات فور نشرها في الموقع.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400">
                  <th className="py-3 px-4 font-semibold">المستخدم</th>
                  <th className="py-3 px-4 font-semibold">التقييم</th>
                  <th className="py-3 px-4 font-semibold">التعليق</th>
                  <th className="py-3 px-4 font-semibold">التاريخ</th>
                  <th className="py-3 px-4 font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {reviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-bold text-white">
                      {rev.display_name}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{rev.rating} / 5</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-200 max-w-md">
                      {rev.comment}
                    </td>
                    <td className="py-4 px-4 text-slate-400 whitespace-nowrap">
                      {formatArabicDate(rev.created_at)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {rev.is_hidden ? (
                        <span className="text-[11px] text-rose-400 bg-rose-950/40 border border-rose-800/60 px-2 py-0.5 rounded">
                          مخفي
                        </span>
                      ) : (
                        <span className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                          معروض للعامة
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
