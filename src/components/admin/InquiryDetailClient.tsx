'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectInquiry, InquiryStatus } from '@/types';
import { InquiryStatusBadge } from './InquiryStatusBadge';
import { formatArabicDate, formatBytes } from '@/lib/utils';
import {
  Copy,
  Check,
  RotateCcw,
  Download,
  Send,
  MessageSquare,
  FileText,
  AlertCircle,
  Mail,
  ExternalLink,
} from 'lucide-react';

interface InquiryDetailClientProps {
  inquiry: ProjectInquiry;
}

export function InquiryDetailClient({ inquiry }: InquiryDetailClientProps) {
  const router = useRouter();

  const [status, setStatus] = useState<InquiryStatus>(inquiry.status);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isRetryingEmail, setIsRetryingEmail] = useState(false);
  const [emailNotice, setEmailNotice] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleStatusChange = async (newStatus: InquiryStatus) => {
    setStatus(newStatus);
    setIsUpdatingStatus(true);
    try {
      await fetch(`/api/admin/inquiries/${inquiry.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh();
    } catch {
      // Non-blocking update
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleRetryEmail = async () => {
    setIsRetryingEmail(true);
    setEmailNotice(null);
    try {
      const res = await fetch(`/api/inquiries/${inquiry.id}/retry-email`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل إرسال الإشعار');
      }
      setEmailNotice('تم إرسال الإشعار بنجاح إلى ibrahem.kassap@gmail.com');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل إعادة الإرسال';
      setEmailNotice(`خطأ: ${msg}`);
    } finally {
      setIsRetryingEmail(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsAddingNote(true);
    try {
      await fetch(`/api/admin/inquiries/${inquiry.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: newNote }),
      });
      setNewNote('');
      router.refresh();
    } catch {
      // Non-blocking
    } finally {
      setIsAddingNote(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl sm:text-2xl font-mono font-extrabold text-indigo-400" dir="ltr">
              {inquiry.id}
            </span>
            <InquiryStatusBadge status={status} />
          </div>
          <p className="text-xs text-slate-400">
            تاريخ الإرسال: {formatArabicDate(inquiry.created_at)}
          </p>
        </div>

        {/* Status Dropdown & Email Action */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-semibold">تغيير الحالة:</label>
            <select
              value={status}
              disabled={isUpdatingStatus}
              onChange={(e) => handleStatusChange(e.target.value as InquiryStatus)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <option value="new">جديد</option>
              <option value="in_review">قيد المراجعة</option>
              <option value="contacted">تم التواصل</option>
              <option value="in_progress">قيد التنفيذ</option>
              <option value="completed">مكتمل</option>
              <option value="closed">مغلق</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleRetryEmail}
            disabled={isRetryingEmail}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isRetryingEmail ? 'animate-spin' : ''}`} />
            <span>إعادة إرسال الإشعار</span>
          </button>
        </div>
      </div>

      {emailNotice && (
        <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{emailNotice}</span>
        </div>
      )}

      {/* Grid: Customer Info & Request Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inquiry Content & Attachments */}
        <div className="lg:col-span-8 space-y-6">
          {/* Description Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              تفاصيل فكرة المشروع
            </h2>
            <div className="p-4 rounded-xl bg-slate-950 text-sm text-slate-200 leading-relaxed whitespace-pre-line border border-slate-800/80">
              {inquiry.description}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block mb-1">طريقة التنفيذ</span>
                <span className="font-bold text-white">
                  {inquiry.execution_mode === 'existing_project'
                    ? 'مشروع مشابه'
                    : 'تصميم مخصص من الصفر'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block mb-1">الميزانية التقديرية</span>
                <span className="font-bold text-white">
                  {inquiry.budget_range || 'غير محددة'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block mb-1">المدة المستهدفة</span>
                <span className="font-bold text-white">
                  {inquiry.desired_timeframe || 'غير محددة'}
                </span>
              </div>
            </div>
          </div>

          {/* Attachments & Voice Recordings Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              المرفقات والتسجيلات الصوتية ({inquiry.attachments?.length || 0})
            </h2>

            {!inquiry.attachments || inquiry.attachments.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                لا توجد مرفقات مع هذا الطلب.
              </p>
            ) : (
              <div className="space-y-3">
                {inquiry.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{att.file_name}</p>
                        <span className="text-[11px] text-slate-400">
                          {formatBytes(att.file_size)} • {att.is_voice_recording ? 'تسجيل صوتي' : att.file_type}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {att.file_path && (
                        <a
                          href={`/api/admin/files/download?path=${encodeURIComponent(att.file_path)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>تحميل</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Internal Notes Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>ملاحظات الفريق الداخلي (سرية وغير مرئية للعميل)</span>
            </h2>

            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                rows={2}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="أضف ملاحظة داخلية (مثال: تم الاتصال، العميل يطلب عرض سعر يوم الخميس)..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <button
                type="submit"
                disabled={isAddingNote || !newNote.trim()}
                className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primaryHover disabled:opacity-50 transition-all inline-flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إضافة ملاحظة</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Customer Info & Fast Copy */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              بيانات العميل
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">الاسم الكامل:</span>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-white">{inquiry.full_name}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(inquiry.full_name, 'name')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedField === 'name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">الهاتف / واتساب:</span>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800" dir="ltr">
                  <span className="font-bold text-white">{inquiry.phone}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(inquiry.phone, 'phone')}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300"
                      title="فتح محادثة واتساب"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">البريد الإلكتروني:</span>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800" dir="ltr">
                  <span className="font-bold text-white truncate max-w-[180px]">{inquiry.email}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(inquiry.email, 'email')}
                      className="text-slate-400 hover:text-white"
                    >
                      {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-indigo-400 hover:text-indigo-300"
                      title="إرسال بريد"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
