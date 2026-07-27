'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, LogOut, ShieldCheck, X } from 'lucide-react';
import { getFilteredCategoriesForTenant } from '@/lib/constants/navigation';
import { ThemeToggle } from '@/components/ui/toggles/ThemeToggle';
import { useTenantContext } from '@/context/TenantContext';
import { SystemRole } from '@/lib/auth/rbac-resolver';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { activeUnit } = useTenantContext();

  const [activeRole] = useState<SystemRole>('HOLDING_EXECUTIVE');

  // Dynamically get allowed module categories for active tenant
  const activeCategories = getFilteredCategoriesForTenant(
    activeUnit?.tenantId || 'holding',
    activeUnit?.type,
    activeRole
  );

  // Track open accordion category IDs
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    dashboard: true,
    finance: pathname.startsWith('/finance'),
    'inventory-management': pathname.startsWith('/inventory'),
    inventory: pathname.startsWith('/inventory'),
    vendor: pathname.startsWith('/vendor'),
    hrd: pathname.startsWith('/hrd'),
    ess: pathname.startsWith('/ess'),
    managerial: pathname.startsWith('/managerial'),
    pos: pathname.startsWith('/pos'),
    hotelier: pathname.startsWith('/hotelier'),
    manufacturing: pathname.startsWith('/manufacturing'),
    settings: pathname.startsWith('/users') || pathname.startsWith('/settings') || pathname.startsWith('/system-health'),
    crm: pathname.startsWith('/crm'),
  });

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 z-40">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-500/20">
            ERP
          </div>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white text-base leading-none">Nusantara Group</h1>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Enterprise Holding ERP</span>
          </div>
        </div>

        {onCloseMobile && (
          <button onClick={onCloseMobile} className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Accordion Module Navigation (Overflow Y Scrolled) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex justify-between items-center">
          <span className="truncate pr-1">Modul ({activeUnit?.name || 'HO'})</span>
          <span className="text-[9px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.2 rounded font-mono shrink-0">
            Enterprise
          </span>
        </div>

        {activeCategories.map((category) => {
          const Icon = category.icon;
          const isOpen = !!openCategories[category.id];
          const hasActiveChild = category.subMenus.some((sub) => sub.href === pathname);

          return (
            <div key={category.id} className="space-y-1">
              {/* Category Accordion Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  hasActiveChild
                    ? 'bg-sky-50 text-sky-700 dark:bg-slate-800/90 dark:text-sky-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className="w-4 h-4 text-sky-500 shrink-0" />
                  <span className="truncate">{category.name}</span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </button>

              {/* Accordion Sub-Menus List */}
              {isOpen && (
                <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 ml-4 animate-in fade-in duration-150">
                  {category.subMenus.map((sub, idx) => {
                    if (sub.isSectionHeader) {
                      return (
                        <div
                          key={`hdr-${idx}`}
                          className="pt-2 pb-1 px-2 text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                          <span className="truncate">{sub.name}</span>
                        </div>
                      );
                    }

                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                          isSubActive
                            ? 'bg-sky-600 text-white font-bold shadow-sm shadow-sky-600/30'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span className="truncate">{sub.name}</span>
                        {sub.badge && (
                          <span className={`px-1.5 py-0.2 text-[8px] font-bold rounded-full shrink-0 ${
                            sub.badge === 'Alert' || sub.badge === 'Kritis' ? 'bg-amber-500 text-white' :
                            sub.badge === 'Touch' || sub.badge === 'Room Grid' ? 'bg-sky-500 text-white' :
                            'bg-emerald-500 text-white'
                          }`}>
                            {sub.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Controls & Theme / Logout Buttons */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>v3.0 Multi-Tenant</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/80 text-red-600 dark:text-red-300 rounded-xl text-xs font-bold transition-all border border-red-200 dark:border-red-900/40"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar (Logout)</span>
        </button>
      </div>
    </aside>
  );
};
