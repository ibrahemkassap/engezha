import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getInquiryById } from '@/lib/admin-data';
import { InquiryDetailClient } from '@/components/admin/InquiryDetailClient';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface InquiryDetailPageProps {
  params: { id: string };
}

export default async function AdminInquiryDetailPage({
  params,
}: InquiryDetailPageProps) {
  const inquiry = await getInquiryById(params.id);

  if (!inquiry) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لقائمة الطلبات</span>
        </Link>
      </div>

      <InquiryDetailClient inquiry={inquiry} />
    </div>
  );
}
