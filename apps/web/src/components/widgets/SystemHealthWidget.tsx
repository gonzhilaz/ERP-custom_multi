'use client';

import React from 'react';
import { Activity, ArrowUpRight, Database, Server } from 'lucide-react';
import Link from 'next/link';

export const SystemHealthWidget = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Engine & Database Health</h3>
            <p className="text-[10px] text-slate-400">PostgreSQL Pools & Socket Status</p>
          </div>
        </div>
        <Link
          href="/system-health"
          className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-colors"
          title="Buka System Health"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 font-mono">
        <div className="p-2.5 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-sans font-semibold">PostgreSQL Master DB</div>
          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">HEALTHY (4ms)</div>
        </div>
        <div className="p-2.5 bg-sky-50/50 dark:bg-sky-950/30 rounded-2xl border border-sky-100 dark:border-sky-900/40">
          <div className="text-[10px] text-sky-600 dark:text-sky-400 font-sans font-semibold">Tenant DB Pool</div>
          <div className="text-xs font-bold text-sky-700 dark:text-sky-300 mt-0.5">HEALTHY (6ms)</div>
        </div>
      </div>
    </div>
  );
};
