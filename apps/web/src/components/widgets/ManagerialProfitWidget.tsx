'use client';

import React from 'react';
import { BarChart3, ArrowUpRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const ManagerialProfitWidget = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Managerial BI & EBITDA</h3>
            <p className="text-[10px] text-slate-400">Profitabilitas 5 Domain Tenant</p>
          </div>
        </div>
        <Link
          href="/managerial"
          className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-colors"
          title="Buka Managerial BI Suite"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="p-2.5 bg-purple-50/50 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900/40 flex justify-between items-center font-mono">
        <div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 font-sans font-semibold">Total Profit Konsolidasi</div>
          <div className="text-base font-bold text-purple-700 dark:text-purple-300 mt-0.5">Rp 4.130.000.000</div>
        </div>
        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 font-bold rounded-lg text-xs">
          +21.5% YoY
        </span>
      </div>
    </div>
  );
};
