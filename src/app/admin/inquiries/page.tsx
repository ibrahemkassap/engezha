import { getAllInquiries } from '@/lib/admin-data';
import { InquiriesTableClient } from '@/components/admin/InquiriesTableClient';
import { Inbox } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminInquiriesPage() {
  const inquiries = await getAllInquiries();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            إدارة الطلبات
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-3">
            <Inbox className="w-7 h-7 text-indigo-400" />
            <span>طلبات المشاريع الواردة</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            استعراض كافة استفسارات وطلبات العملاء، المرفقات، والتسجيلات الصوتية مع إمكانية تحديث الحالة.
          </p>
        </div>
      </div>

      <InquiriesTableClient initialInquiries={inquiries} />
    </div>
  );
}
