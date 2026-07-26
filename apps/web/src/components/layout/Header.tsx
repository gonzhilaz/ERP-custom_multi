'use client';

import React from 'react';
import { Bell, Search, UserCheck, ShieldAlert, Cpu } from 'lucide-react';

export const Header = () => {
  return (
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari transaksi, jurnal, barang, karyawan, atau invoice..."
            className="w-full bg-slate-100 dark:bg-slate-800 text-xs pl-9 pr-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-sky-500 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* OpenClaw AI Status Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-violet-500/10 to-sky-500/10 border border-violet-500/20 dark:border-violet-400/30 rounded-full text-violet-700 dark:text-violet-300 text-[11px] font-semibold">
          <Cpu className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 animate-pulse" />
          <span>OpenClaw AI Active</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
        </button>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            BS
          </div>
          <div className="text-left hidden md:block">
            <div className="text-xs font-semibold text-slate-900 dark:text-white leading-none">Budi Santoso</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Holding Executive</div>
          </div>
        </div>
      </div>
    </header>
  );
};
