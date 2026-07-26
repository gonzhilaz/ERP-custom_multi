'use client';

import React from 'react';
import { Pickaxe, ArrowUpRight, ShieldCheck, Fuel } from 'lucide-react';
import Link from 'next/link';

export const MiningProductionWidget = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
            <Pickaxe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Produksi Tambang Emas</h3>
            <p className="text-[10px] text-slate-400">Site Kutai Block 4 Operations</p>
          </div>
        </div>
        <Link
          href="/mining"
          className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-colors"
          title="Buka Mining Suite"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 font-mono">
        <div className="p-2.5 bg-amber-50/50 dark:bg-amber-950/30 rounded-2xl border border-amber-100 dark:border-amber-900/40">
          <div className="text-[10px] text-amber-600 dark:text-amber-400 font-sans font-semibold">Hasil Kerukan Emas</div>
          <div className="text-base font-bold text-amber-700 dark:text-amber-300 mt-0.5">14.850 Ton</div>
        </div>
        <div className="p-2.5 bg-blue-50/50 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/40">
          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-sans font-semibold">Konsumsi Solar Fleet</div>
          <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mt-0.5">18.400 Liter</div>
        </div>
      </div>
    </div>
  );
};
