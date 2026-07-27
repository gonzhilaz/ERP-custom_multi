'use client';

import React from 'react';
import { BarChart3, CheckCircle2, Clock, AlertTriangle, Download } from 'lucide-react';
import { ActionButton } from '@/components/ui/button/ActionButton';
import { GlossaryPopover } from '@/components/ui/popover/GlossaryPopover';
import { useMeetingNotes } from '@/hooks/meeting/useMeetingNotes';

export function MeetingNotesReportsView() {
  const { allTickets } = useMeetingNotes();

  const totalCount = allTickets.length;
  const resolvedCount = allTickets.filter((t) => t.status === 'RESOLVED' || t.status === 'CLOSED').length;
  const resolutionRate = totalCount > 0 ? ((resolvedCount / totalCount) * 100).toFixed(1) : '100';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Laporan Resolusi</h1>
          <GlossaryPopover
            title="Laporan & Performa Resolusi Tiket"
            description="Pusat rekapitulasi tingkat kecepatan penyelesaian tiket kendala cabang serta rasio efisiensi keputusan rapat HO."
          />
        </div>
        <ActionButton icon={Download} label="Export PDF / Excel" onClick={() => {}} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-400">Total Tiket Dibuat</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{totalCount}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-400">Tiket Terresolusi</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{resolvedCount}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-400">Tingkat Keberhasilan (Resolution Rate)</div>
          <div className="text-2xl font-black text-sky-600 dark:text-sky-400">{resolutionRate}%</div>
        </div>
      </div>

      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Rekapitulasi Tiket Per Cabang</h3>
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex justify-between items-center text-xs">
            <span className="font-bold text-slate-900 dark:text-white">Site East Borneo Facility (Berau)</span>
            <span className="text-amber-500 font-semibold">1 Eskalasi HO Active</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex justify-between items-center text-xs">
            <span className="font-bold text-slate-900 dark:text-white">Resto Alam Rindu (Jakarta)</span>
            <span className="text-sky-500 font-semibold">1 Open Issue</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex justify-between items-center text-xs">
            <span className="font-bold text-slate-900 dark:text-white">Hotel Alam Pakuan (Bogor)</span>
            <span className="text-emerald-500 font-semibold">1 Resolved Issue</span>
          </div>
        </div>
      </div>
    </div>
  );
}
