'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BrandLogo } from '../layout/BrandLogo';
import {
  LayoutDashboard,
  Layers,
  Tags,
  MessageSquare,
  Inbox,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'نظرة عامة', href: '/admin', icon: LayoutDashboard },
    { label: 'طلبات العملاء', href: '/admin/inquiries', icon: Inbox },
    { label: 'إدارة المشاريع', href: '/admin/projects', icon: Layers },
    { label: 'إدارة التصنيفات', href: '/admin/categories', icon: Tags },
    { label: 'إدارة التقييمات', href: '/admin/reviews', icon: MessageSquare },
  ];

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Fallback
    }
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-brand-deep text-white flex flex-col justify-between p-4 min-h-screen border-l border-slate-800">
      <div>
        <div className="p-2 mb-6">
          <BrandLogo variant="light" />
          <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
            لوحة الإدارة
          </span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  isActive
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2 pt-4 border-t border-slate-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <span>زيارة الموقع العام</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-950/30 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
