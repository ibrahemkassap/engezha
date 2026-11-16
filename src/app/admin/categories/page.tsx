import { getCategories } from '@/lib/data';
import { Tags } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            التصنيفات والخدمات
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-3">
            <Tags className="w-7 h-7 text-indigo-400" />
            <span>إدارة التصنيفات</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            إدارة أقسام وتصنيفات المشاريع، وترتيب ظهورها في الصفحة الرئيسية والكتالوج.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400">
                <th className="py-3 px-4 font-semibold">الترتيب</th>
                <th className="py-3 px-4 font-semibold">اسم التصنيف</th>
                <th className="py-3 px-4 font-semibold">المعرف اللطيف (Slug)</th>
                <th className="py-3 px-4 font-semibold">الأيقونة</th>
                <th className="py-3 px-4 font-semibold">الوصف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-indigo-400">
                    {cat.display_order}
                  </td>
                  <td className="py-4 px-4 font-bold text-white text-sm">
                    {cat.name}
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-300" dir="ltr">
                    {cat.slug}
                  </td>
                  <td className="py-4 px-4 text-slate-400 font-mono">
                    {cat.icon_name}
                  </td>
                  <td className="py-4 px-4 text-slate-400 max-w-sm truncate">
                    {cat.description}
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
