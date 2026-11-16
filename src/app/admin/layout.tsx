import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'لوحة التحكم المركزية | انجزها',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row" dir="rtl">
      {/* Sidebar on desktop */}
      <div className="hidden md:block flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-x-hidden min-h-screen bg-slate-950/60">
        <header className="md:hidden bg-brand-deep p-4 border-b border-slate-800 flex items-center justify-between">
          <span className="font-bold text-white text-base">لوحة الإدارة - انجزها</span>
        </header>

        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
