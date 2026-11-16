'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { useAuth } from '@/context/AuthContext';
import { ProjectInquiry } from '@/types';
import { InquiryStatusBadge } from '@/components/admin/InquiryStatusBadge';
import { formatArabicDate, formatBytes } from '@/lib/utils';
import {
  Inbox,
  ArrowLeft,
  FileText,
  Clock,
  Layers,
  Compass,
} from 'lucide-react';

export default function MyInquiriesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth?returnUrl=/my-inquiries');
      return;
    }

    if (user) {
      fetch('/api/customer/inquiries')
        .then((res) => res.json())
        .then((data) => {
          if (data.inquiries) {
            setInquiries(data.inquiries);
          }
        })
        .catch((err) => {
          console.error('Error fetching inquiries:', err);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [user, isLoading, router]);

  if (isLoading || fetching) {
    return (
      <div className="min-h-screen bg-brand-bg dark:bg-brand-dark-bg flex items-center justify-center text-sm text-brand-muted dark:text-brand-dark-muted">
        جاري تحميل سجل طلباتك...
      </div>
    );
  }

  return (
    <>
      <MainHeader />
      <main className="flex-1 py-12 bg-brand-bg dark:bg-brand-dark-bg transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary uppercase tracking-wider bg-brand-subtle dark:bg-brand-dark-surface px-3 py-1 rounded-full border border-transparent dark:border-brand-dark-border">
                متابعة المشاريع
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text dark:text-brand-dark-text mt-3">
                طلباتي واستشاراتي السابقة
              </h1>
              <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-1">
                استعرض حالة مراجعة طلباتك، الميزانيات المحددة، والتفاصيل المسجلة معنا.
              </p>
            </div>

            <Link
              href="/discuss-project"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
            >
              <span>بدء طلب مشروع جديد</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          {inquiries.length === 0 ? (
            <div className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-dashed border-brand-border dark:border-brand-dark-border p-12 text-center max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-brand-subtle dark:bg-brand-primary/20 text-brand-primary dark:text-brand-dark-primary flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text mb-2">
                لا توجد طلبات مشاريع مسجلة بعد
              </h3>
              <p className="text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed mb-6">
                استكشف معرض الأعمال والنماذج أو احكيلنا عن فكرتك لنبدأ في مناقشتها وبنائها خصيصاً لك.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>استكشف المشاريع والنماذج</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-brand-border dark:border-brand-dark-border p-6 shadow-xs hover:border-brand-primary/40 dark:hover:border-brand-dark-primary/50 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border/60 dark:border-brand-dark-border/60 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-extrabold text-brand-primary dark:text-brand-dark-primary text-base" dir="ltr">
                        {inq.id}
                      </span>
                      <InquiryStatusBadge status={inq.status} />
                    </div>

                    <div className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
                      <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-brand-dark-muted" />
                      <span>{formatArabicDate(inq.created_at)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-brand-bg dark:bg-brand-dark-bg border border-brand-border/60 dark:border-brand-dark-border/60">
                      <span className="text-brand-muted dark:text-brand-dark-muted block mb-1">طريقة التنفيذ</span>
                      <div className="flex items-center gap-1.5 font-bold text-brand-text dark:text-brand-dark-text">
                        {inq.execution_mode === 'existing_project' ? (
                          <>
                            <Layers className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                            <span>مشروع مشابه: {inq.selected_project_title || 'نموذج محدد'}</span>
                          </>
                        ) : (
                          <>
                            <Compass className="w-3.5 h-3.5 text-brand-primary dark:text-brand-dark-primary" />
                            <span>تصميم مخصص من الصفر</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-brand-bg dark:bg-brand-dark-bg border border-brand-border/60 dark:border-brand-dark-border/60">
                      <span className="text-brand-muted dark:text-brand-dark-muted block mb-1">الميزانية المختارة</span>
                      <span className="font-bold text-brand-text dark:text-brand-dark-text">
                        {inq.budget_range || 'قيد الاستشارة'} ({inq.budget_currency || 'EGP'})
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-brand-bg dark:bg-brand-dark-bg border border-brand-border/60 dark:border-brand-dark-border/60">
                      <span className="text-brand-muted dark:text-brand-dark-muted block mb-1">المدة المستهدفة</span>
                      <span className="font-bold text-brand-text dark:text-brand-dark-text">
                        {inq.desired_timeframe || 'حسب الاتفاق'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-brand-text dark:text-brand-dark-text mb-1">
                      تفاصيل الفكرة المسجلة:
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-brand-dark-muted leading-relaxed bg-brand-bg dark:bg-brand-dark-bg p-3.5 rounded-xl border border-brand-border/60 dark:border-brand-dark-border/60 whitespace-pre-line">
                      {inq.description}
                    </p>
                  </div>

                  {inq.attachments && inq.attachments.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-brand-text dark:text-brand-dark-text mb-2">
                        المرفقات المسجلة ({inq.attachments.length}):
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {inq.attachments.map((att) => (
                          <div
                            key={att.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border text-xs text-slate-700 dark:text-brand-dark-text"
                          >
                            <FileText className="w-3.5 h-3.5 text-brand-primary dark:text-brand-dark-primary" />
                            <span className="font-medium truncate max-w-[150px]">{att.file_name}</span>
                            <span className="text-[10px] text-brand-muted dark:text-brand-dark-muted">
                              ({formatBytes(att.file_size)})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <MainFooter />
    </>
  );
}
