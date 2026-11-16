import Link from 'next/link';
import { getAdminOverviewMetrics } from '@/lib/admin-data';
import { InquiryStatusBadge } from '@/components/admin/InquiryStatusBadge';
import { formatArabicDate } from '@/lib/utils';
import {
  Layers,
  Inbox,
  Clock,
  Star,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const metrics = await getAdminOverviewMetrics();

  const cards = [
    {
      title: 'إجمالي المشاريع المنشورة',
      value: metrics.totalProjects,
      desc: 'مشاريع و نماذج في الكتالوج',
      icon: Layers,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      href: '/admin/projects',
    },
    {
      title: 'إجمالي طلبات العملاء',
      value: metrics.totalInquiries,
      desc: 'طلبات مسجلة في النظام',
      icon: Inbox,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      href: '/admin/inquiries',
    },
    {
      title: 'طلبات جديدة قيد المراجعة',
      value: metrics.newInquiriesCount,
      desc: 'تحتاج للتواصل والمتابعة',
      icon: Clock,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      href: '/admin/inquiries?status=new',
    },
    {
      title: 'متوسط التقييمات الحقيقية',
      value: metrics.totalReviews > 0 ? `${metrics.averageRating} / 5` : 'لا توجد تقييمات',
      desc: `${metrics.totalReviews} تقييم حقيقي منشور`,
      icon: Star,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      href: '/admin/reviews',
    },
    {
      title: 'إشعارات بريدية متعثرة',
      value: metrics.failedNotificationsCount,
      desc: 'يمكن إعادة إرسالها يدويًا',
      icon: AlertTriangle,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      href: '/admin/inquiries?filter=failed_notification',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            لوحة الإحصائيات الحقيقية
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            مرحبًا بك في لوحة تحكم انجزها
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            متابعة دقيقة وفورية لجميع طلبات العملاء، المشاريع، والتقييمات المسجلة.
          </p>
        </div>

        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primaryHover transition-all shadow-sm self-start sm:self-auto"
        >
          <Inbox className="w-4 h-4" />
          <span>مراجعة الطلبات الجديدة ({metrics.newInquiriesCount})</span>
        </Link>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={i}
              href={c.href}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-400">
                  {c.title}
                </span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${c.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono block">
                  {c.value}
                </span>
                <span className="text-xs text-slate-400 mt-1 block">
                  {c.desc}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">
              أحدث طلبات المشاريع الواردة
            </h2>
          </div>

          <Link
            href="/admin/inquiries"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>عرض كل الطلبات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {metrics.recentInquiries.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl">
            <Inbox className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">لا توجد طلبات مشاريع بعد.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-semibold">رقم الطلب</th>
                  <th className="pb-3 font-semibold">العميل</th>
                  <th className="pb-3 font-semibold">طريقة التنفيذ</th>
                  <th className="pb-3 font-semibold">التاريخ</th>
                  <th className="pb-3 font-semibold">الحالة</th>
                  <th className="pb-3 font-semibold">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {metrics.recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 font-mono font-bold text-indigo-400" dir="ltr">
                      {inq.id}
                    </td>
                    <td className="py-3.5 text-white font-medium">
                      <div>{inq.full_name}</div>
                      <div className="text-[11px] text-slate-400" dir="ltr">{inq.phone}</div>
                    </td>
                    <td className="py-3.5 text-slate-300">
                      {inq.execution_mode === 'existing_project'
                        ? 'مشروع مشابه'
                        : 'تصميم مخصص'}
                    </td>
                    <td className="py-3.5 text-slate-400">
                      {formatArabicDate(inq.created_at)}
                    </td>
                    <td className="py-3.5">
                      <InquiryStatusBadge status={inq.status} />
                    </td>
                    <td className="py-3.5">
                      <Link
                        href={`/admin/inquiries/${inq.id}`}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 font-semibold"
                      >
                        تفاصيل
                      </Link>
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
