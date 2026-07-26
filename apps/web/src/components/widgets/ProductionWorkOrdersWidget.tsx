'use client';

import React from 'react';
import { Factory, PlayCircle, CheckCircle2, Clock } from 'lucide-react';

export const ProductionWorkOrdersWidget = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-lg">
            <Factory className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white">Batch Work Orders Produksi Berjalan</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
          2 Batch Active (WIP)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-amber-600 font-bold">WO-BKR-202607-001</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 animate-pulse">
              IN PRODUCTION
            </span>
          </div>
          <div className="font-bold text-slate-900 dark:text-white line-clamp-1">Roti Tawar Premium (100 Pcs)</div>
          <div className="text-[10px] text-slate-400">Target Output: Gudang Display Etalase</div>
        </div>

        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] text-emerald-600 font-bold">WO-RST-202607-003</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
              COMPLETED
            </span>
          </div>
          <div className="font-bold text-slate-900 dark:text-white line-clamp-1">Sate Sapi Ribeye (30 Porsi)</div>
          <div className="text-[10px] text-slate-400">Target Output: Dapur Saji Resto</div>
        </div>
      </div>
    </div>
  );
};
