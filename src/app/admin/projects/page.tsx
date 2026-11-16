import Link from 'next/link';
import { getPublishedProjects } from '@/lib/data';
import { Layers, Plus, ExternalLink, Check } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            كتالوج النماذج
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-3">
            <Layers className="w-7 h-7 text-indigo-400" />
            <span>إدارة المشاريع والنماذج</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            إضافة وتعديل وحذف مشاريع الكتالوج، وإدارة المعارض والوسوم والأسماء اللطيفة (Slugs).
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primaryHover transition-all shadow-sm self-start sm:self-auto opacity-90 hover:opacity-100"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مشروع جديد</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400">
                <th className="py-3 px-4 font-semibold">المشروع</th>
                <th className="py-3 px-4 font-semibold">التصنيف</th>
                <th className="py-3 px-4 font-semibold">النوع</th>
                <th className="py-3 px-4 font-semibold">الحالة</th>
                <th className="py-3 px-4 font-semibold">النوع</th>
                <th className="py-3 px-4 font-semibold text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-white text-sm">
                    {proj.title}
                    <div className="text-[11px] text-slate-400 font-normal font-mono" dir="ltr">
                      /{proj.slug}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-300">
                    {proj.category?.name || 'غير محدد'}
                  </td>
                  <td className="py-4 px-4 text-slate-300">
                    {proj.project_type}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                      <Check className="w-3 h-3" />
                      منشور
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {proj.is_demo ? (
                      <span className="text-[11px] text-amber-400 bg-amber-950/40 border border-amber-800/60 px-2 py-0.5 rounded">
                        نموذج تجريبي
                      </span>
                    ) : (
                      <span className="text-[11px] text-indigo-300 bg-indigo-950/40 border border-indigo-800/60 px-2 py-0.5 rounded">
                        مشروع عميل
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <Link
                      href={`/projects/${proj.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 inline-flex items-center gap-1 text-[11px] font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>معاينة</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
