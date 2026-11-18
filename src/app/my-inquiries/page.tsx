'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { useAuth } from '@/context/AuthContext';
import { ProjectInquiry } from '@/types';
import { InquiryStatusBadge } from '@/components/admin/InquiryStatusBadge';
import { formatArabicDate } from '@/lib/utils';
import {
  Inbox,
  ArrowLeft,
  Clock,
  Layers,
  Compass,
  MessageCircle,
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
        جاري تحميل سجل مشاريعك ومتابعتها...
      </div>
    );
  }

  // Stages of project progress
  const getStageIndex = (status: string) => {
    switch (status) {
      case 'new':
        return 1;
      case 'in_review':
        return 2;
      case 'contacted':
        return 3;
      case 'in_progress':
        return 4;
      case 'completed':
        return 5;
      default:
        return 1;
    }
  };

  return (
    <>
      <MainHeader />
      <main className="flex-1 py-12 bg-brand-bg dark:bg-brand-dark-bg transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-primary dark:text-brand-dark-primary uppercase tracking-wider bg-brand-subtle dark:bg-brand-dark-surface px-3 py-1 rounded-full border border-transparent dark:border-brand-dark-border">
                بوابة العميل الرقمية
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text dark:text-brand-dark-text mt-3">
                متابعة مشاريعي وطلباتي
              </h1>
              <p className="text-sm text-brand-muted dark:text-brand-dark-muted mt-1">
                استعرض حالة مراجعة طلباتك، عروض الأسعار، والمراحل التنفيذية المعتمدة لكل مشروع.
              </p>
            </div>

            <Link
              href="/start-project"
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
                لا توجد مشاريع مسجلة بحسابك بعد
              </h3>
              <p className="text-sm text-brand-muted dark:text-brand-dark-muted leading-relaxed mb-6">
                استكشف معرض الأعمال والنماذج الحية أو ابدأ بطلب مشروع مخصص من الصفر ليتم إدراجه ومتابعته هنا.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>استكشف المشاريع والنماذج</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/start-project"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold transition-all"
                >
                  <span>طلب مشروع مخصص</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {inquiries.map((inq) => {
                const stage = getStageIndex(inq.status);
                const steps = [
                  { label: 'استلام الطلب', step: 1 },
                  { label: 'المراجعة الفنية', step: 2 },
                  { label: 'عرض المواصفات', step: 3 },
                  { label: 'قيد التطوير', step: 4 },
                  { label: 'التسليم المكتمل', step: 5 },
                ];

                return (
                  <div
                    key={inq.id}
                    className="bg-white dark:bg-brand-dark-surface rounded-3xl border border-brand-border dark:border-brand-dark-border p-6 sm:p-7 shadow-xs hover:border-brand-primary/40 dark:hover:border-purple-500/40 transition-all space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border/60 dark:border-brand-dark-border/60 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-extrabold text-brand-primary dark:text-purple-300 text-base" dir="ltr">
                          {inq.id}
                        </span>
                        <InquiryStatusBadge status={inq.status} />
                      </div>

                      <div className="flex items-center gap-2 text-xs text-brand-muted dark:text-brand-dark-muted">
                        <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-brand-dark-muted" />
                        <span>{formatArabicDate(inq.created_at)}</span>
                      </div>
                    </div>

                    {/* Milestone Progress Bar */}
                    <div className="space-y-2 py-2">
                      <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
                        {steps.map((st) => (
                          <span
                            key={st.step}
                            className={
                              stage >= st.step
                                ? 'text-brand-primary dark:text-purple-300 font-extrabold'
                                : 'text-slate-400'
                            }
                          >
                            {st.label}
                          </span>
                        ))}
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                        {steps.map((st) => (
                          <div
                            key={st.step}
                            className={`flex-1 h-full border-r border-white dark:border-slate-900 transition-all ${
                              stage >= st.step
                                ? 'bg-gradient-to-r from-purple-600 to-brand-accent'
                                : 'bg-transparent'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 rounded-xl bg-brand-bg dark:bg-brand-dark-bg border border-brand-border/60 dark:border-brand-dark-border/60">
                        <span className="text-brand-muted dark:text-brand-dark-muted block mb-1">نوع التنفيذ</span>
                        <div className="flex items-center gap-1.5 font-bold text-brand-text dark:text-brand-dark-text">
                          {inq.execution_mode === 'existing_project' ? (
                            <>
                              <Layers className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                              <span>تخصيص نموذج: {inq.selected_project_title || 'نموذج محدد'}</span>
                            </>
                          ) : (
                            <>
                              <Compass className="w-3.5 h-3.5 text-brand-primary dark:text-brand-dark-primary" />
                              <span>تصميم وبرمجة مخصصة</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-brand-bg dark:bg-brand-dark-bg border border-brand-border/60 dark:border-brand-dark-border/60">
                        <span className="text-brand-muted dark:text-brand-dark-muted block mb-1">الميزانية التقديرية</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
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

                    {/* WhatsApp Fast Follow-up Action */}
                    <div className="pt-3 border-t border-brand-border/60 dark:border-brand-dark-border/60 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-slate-400">
                        لأي استفسار طارئ حول هذا المشروع:
                      </span>
                      <a
                        href={`https://wa.me/201017358087?text=${encodeURIComponent(
                          `مرحباً أنجزها، أود الاستفسار عن حالة مشروعي رقم: ${inq.id}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>متابعة الطلب على واتساب (01017358087)</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <MainFooter />
    </>
  );
}
