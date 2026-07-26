'use client';

import React from 'react';
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export const FinanceCashflowWidget = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
            <Wallet className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white">Cashflow & Revenue Konsolidasi Holding</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 font-bold">Juli 2026</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-500/20 space-y-1">
          <div className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> Total Pendapatan
          </div>
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">Rp 8.950.000.000</div>
          <div className="text-[9px] text-slate-400">Terposting dari POS & B2B Sales</div>
        </div>

        <div className="p-3 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl border border-rose-500/20 space-y-1">
          <div className="flex items-center gap-1 text-[10px] text-rose-700 dark:text-rose-300 font-semibold">
            <TrendingDown className="w-3.5 h-3.5" /> Total Pengeluaran / HPP
          </div>
          <div className="text-lg font-bold text-rose-600 dark:text-rose-400 font-mono">Rp 4.820.000.000</div>
          <div className="text-[9px] text-slate-400">Pembelian Vendor & Payroll</div>
        </div>
      </div>
    </div>
  );
};
