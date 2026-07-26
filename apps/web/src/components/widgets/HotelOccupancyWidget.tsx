'use client';

import React from 'react';
import { BedDouble, CheckCircle2 } from 'lucide-react';

export const HotelOccupancyWidget = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg">
            <BedDouble className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white">Okupansi Kamar Hotel</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
          82% Occupied
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] text-slate-400">Kamar Terisi Hari Ini</div>
          <div className="text-xl font-bold text-rose-600 dark:text-rose-400 font-mono">41 / 50 Kamar</div>
        </div>
        <div className="text-right text-[10px] text-slate-400 space-y-0.5">
          <div>Ready: <span className="font-bold text-emerald-600">7 Kamar</span></div>
          <div>Housekeeping: <span className="font-bold text-amber-600">2 Kamar</span></div>
        </div>
      </div>
    </div>
  );
};
