'use client';

import React from 'react';
import { Users, UserCheck, Clock } from 'lucide-react';

export const StaffAttendanceWidget = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Users className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white">Presensi Staff & Shift Today</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          96% Hadir
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] text-slate-400">Total Staff Bertugas</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white font-mono">24 / 25 Karyawan</div>
        </div>
        <div className="p-2 bg-indigo-50 dark:bg-slate-800 rounded-xl text-indigo-600 dark:text-indigo-400 font-bold text-[11px]">
          Shift Pagi Active
        </div>
      </div>
    </div>
  );
};
