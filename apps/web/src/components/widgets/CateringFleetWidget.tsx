'use client';

import React from 'react';
import { UtensilsCrossed, ArrowUpRight, Truck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const CateringFleetWidget = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl">
            <UtensilsCrossed className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Catering Massal & Armada</h3>
            <p className="text-[10px] text-slate-400">Dapur Pusat & Event Dispatch</p>
          </div>
        </div>
        <Link
          href="/catering"
          className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-colors"
          title="Buka Catering Suite"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 font-mono">
        <div className="p-2.5 bg-orange-50/50 dark:bg-orange-950/30 rounded-2xl border border-orange-100 dark:border-orange-900/40">
          <div className="text-[10px] text-orange-600 dark:text-orange-400 font-sans font-semibold">Porti Siap Hari Ini</div>
          <div className="text-base font-bold text-orange-700 dark:text-orange-300 mt-0.5">3.450 Pax</div>
        </div>
        <div className="p-2.5 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-sans font-semibold">Armada Mobil Box</div>
          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">8 Unit On Duty</div>
        </div>
      </div>
    </div>
  );
};
