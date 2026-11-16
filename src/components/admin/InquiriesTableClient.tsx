'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProjectInquiry } from '@/types';
import { InquiryStatusBadge } from './InquiryStatusBadge';
import { formatArabicDate } from '@/lib/utils';
import { Search, Filter, AlertCircle, ArrowLeft, Mail, Phone } from 'lucide-react';

interface InquiriesTableClientProps {
  initialInquiries: ProjectInquiry[];
}

export function InquiriesTableClient({
  initialInquiries,
}: InquiriesTableClientProps) {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredInquiries = useMemo(() => {
    return initialInquiries.filter((inq) => {
      if (selectedStatus !== 'all' && inq.status !== selectedStatus) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = inq.full_name.toLowerCase().includes(q);
        const matchesEmail = inq.email.toLowerCase().includes(q);
        const matchesPhone = inq.phone.includes(q);
        const matchesId = inq.id.toLowerCase().includes(q);

        if (!matchesName && !matchesEmail && !matchesPhone && !matchesId) {
          return false;
        }
      }
      return true;
    });
  }, [initialInquiries, selectedStatus, search]);

  return (
    <div className="space-y-6">
      {/* Search and Status Filters */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث برقم الطلب، اسم العميل، الهاتف، أو البريد..."
            className="w-full pl-3.5 pr-10 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <option value="all">جميع الحالات</option>
            <option value="new">جديد</option>
            <option value="in_review">قيد المراجعة</option>
            <option value="contacted">تم التواصل</option>
            <option value="in_progress">قيد التنفيذ</option>
            <option value="completed">مكتمل</option>
            <option value="closed">مغلق</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-16 px-4">
            <AlertCircle className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              لا توجد طلبات مطابقة
            </h3>
            <p className="text-xs text-slate-400">
              لم نجد أي طلبات تتوافق مع معايير البحث أو التصفية المحددة.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400">
                  <th className="py-3 px-4 font-semibold">رقم الطلب</th>
                  <th className="py-3 px-4 font-semibold">العميل والتواصل</th>
                  <th className="py-3 px-4 font-semibold">طريقة التنفيذ</th>
                  <th className="py-3 px-4 font-semibold">التاريخ</th>
                  <th className="py-3 px-4 font-semibold">الإشعار البريدي</th>
                  <th className="py-3 px-4 font-semibold">الحالة</th>
                  <th className="py-3 px-4 font-semibold text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-indigo-400 whitespace-nowrap" dir="ltr">
                      {inq.id}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-white text-sm">
                        {inq.full_name}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1" dir="ltr">
                          <Phone className="w-3 h-3 text-slate-500" />
                          {inq.phone}
                        </span>
                        <span className="flex items-center gap-1" dir="ltr">
                          <Mail className="w-3 h-3 text-slate-500" />
                          {inq.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {inq.execution_mode === 'existing_project' ? (
                        <span className="inline-block px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[11px]">
                          مشروع مشابه
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[11px]">
                          تصميم مخصص
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-slate-400 whitespace-nowrap">
                      {formatArabicDate(inq.created_at)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {inq.notification_status === 'sent' ? (
                        <span className="text-emerald-400 text-[11px] font-semibold">✓ تم الإرسال</span>
                      ) : inq.notification_status === 'failed' ? (
                        <span className="text-rose-400 text-[11px] font-semibold">✗ تعذر الإرسال</span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">قيد المعالجة</span>
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <InquiryStatusBadge status={inq.status} />
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <Link
                        href={`/admin/inquiries/${inq.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-primary text-white font-bold hover:bg-brand-primaryHover transition-all"
                      >
                        <span>فتح الطلب</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
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
