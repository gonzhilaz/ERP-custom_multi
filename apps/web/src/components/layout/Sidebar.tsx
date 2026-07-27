'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  LayoutDashboard,
  Wallet,
  Boxes,
  Truck,
  Users,
  UserCheck,
  BarChart3,
  MessageSquare,
  ChevronDown,
  Moon,
  Sun,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

const MOCK_UNITS = [
  { tenantId: 'tenant-resto-01', code: 'RESTO-01', name: 'Nusantara Culinary & Catering', type: 'Restoran & Catering' },
  { tenantId: 'tenant-gold-01', code: 'GOLD-MINE-01', name: 'PT Borneo Mining Emas', type: 'Tambang Emas' },
  { tenantId: 'tenant-hotel-01', code: 'HOTEL-01', name: 'Grand Royal Hotel & Resort', type: 'Hotel & Hospitality' },
  { tenantId: 'tenant-retail-01', code: 'RETAIL-01', name: 'Nusa Mart Retail Chain', type: 'Retail Chain' }
];

const NAV_ITEMS = [
  { name: 'Holding Overview', href: '/', icon: LayoutDashboard, module: 'CORE' },
  { name: 'Finance & COA', href: '/finance', icon: Wallet, module: 'FINANCE' },
  { name: 'Inventory & Storage', href: '/inventory', icon: Boxes, module: 'INVENTORY' },
  { name: 'Vendor & PO', href: '/vendor', icon: Truck, module: 'VENDOR' },
  { name: 'HRD & Payroll', href: '/hrd', icon: Users, module: 'HRD' },
  { name: 'Employee Portal', href: '/ess', icon: UserCheck, module: 'ESS' },
  { name: 'CRM & Field Sales', href: '/crm', icon: Smartphone, module: 'CRM' },
  { name: 'Managerial & Budget', href: '/managerial', icon: BarChart3, module: 'MANAGERIAL' },
  { name: 'Internal Chat & Voice', href: '/chat', icon: MessageSquare, module: 'CHAT', badge: 'Live' }
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [selectedUnit, setSelectedUnit] = useState(MOCK_UNITS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0 z-40">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-500/20">
            ERP
          </div>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white text-base leading-none">Nusantara Group</h1>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Enterprise Holding ERP</span>
          </div>
        </div>
      </div>

      {/* Unit Usaha Cross-Company Switcher */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
          Active Unit Usaha (Tenant)
        </label>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between p-2.5 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-left transition-colors border border-slate-200 dark:border-slate-700/60"
          >
            <div className="truncate pr-2">
              <div className="font-semibold text-xs text-slate-900 dark:text-slate-100 truncate">{selectedUnit.name}</div>
              <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">{selectedUnit.type}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase">Available Units (Access Granted)</div>
              {MOCK_UNITS.map((unit) => (
                <button
                  key={unit.tenantId}
                  onClick={() => {
                    setSelectedUnit(unit);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-sky-50 dark:hover:bg-slate-800 ${
                    selectedUnit.tenantId === unit.tenantId ? 'bg-sky-50 dark:bg-slate-800/80 font-semibold text-sky-600 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="truncate">{unit.name}</span>
                  <span className="text-[10px] opacity-75">{unit.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Module Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Core Modules
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-sky-600 text-white font-semibold shadow-md shadow-sky-600/20 dark:bg-sky-600'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-500 text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Controls & Theme Switcher */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>v1.0 Ready</span>
        </div>
      </div>
    </aside>
  );
};
