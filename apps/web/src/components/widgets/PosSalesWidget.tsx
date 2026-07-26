'use client';

import React from 'react';
import { ShoppingCart, TrendingUp, CreditCard, QrCode, Banknote } from 'lucide-react';

export const PosSalesWidget = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-lg">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white">POS Sales Kasir Today</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          +12.4% vs Kemarin
        </span>
      </div>

      <div className="space-y-1">
        <div className="text-[10px] text-slate-400">Total Omset Kasir Hari Ini</div>
        <div className="text-xl font-bold text-sky-600 dark:text-sky-400 font-mono">Rp 14.850.000</div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
        <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <Banknote className="w-3 h-3 text-emerald-500" /> Cash
          </div>
          <div className="font-bold text-slate-900 dark:text-white font-mono">Rp 4.200k</div>
        </div>

        <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <QrCode className="w-3 h-3 text-sky-500" /> QRIS
          </div>
          <div className="font-bold text-slate-900 dark:text-white font-mono">Rp 8.150k</div>
        </div>

        <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <CreditCard className="w-3 h-3 text-indigo-500" /> Card
          </div>
          <div className="font-bold text-slate-900 dark:text-white font-mono">Rp 2.500k</div>
        </div>
      </div>
    </div>
  );
};
