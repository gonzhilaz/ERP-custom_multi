'use client';

import React from 'react';
import { Target, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const CrmOverviewWidget = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Pipeline CRM & Sales</h3>
            <p className="text-[10px] text-slate-400">Target Peluang B2B Q3 2026</p>
          </div>
        </div>
        <Link
          href="/crm"
          className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-colors"
          title="Buka CRM Suite"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 font-mono">
        <div className="p-2.5 bg-sky-50/50 dark:bg-sky-950/30 rounded-2xl border border-sky-100 dark:border-sky-900/40">
          <div className="text-[10px] text-sky-600 dark:text-sky-400 font-sans font-semibold">Active Deals</div>
          <div className="text-base font-bold text-sky-700 dark:text-sky-300 mt-0.5">24 Deals</div>
        </div>
        <div className="p-2.5 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-sans font-semibold">Pipeline Value</div>
          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">Rp 4,25 M</div>
        </div>
      </div>

      <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-1.5 border border-slate-200/60 dark:border-slate-800">
        <div className="flex justify-between items-center text-[10px]">
          <span className="font-semibold text-slate-600 dark:text-slate-400">Win Rate Conversion</span>
          <span className="font-bold text-emerald-600">68.4% (+4.2%)</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full" style={{ width: '68.4%' }}></div>
        </div>
      </div>
    </div>
  );
};
