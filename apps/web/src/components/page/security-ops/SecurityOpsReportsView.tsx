'use client';

import React from 'react';
import { Shield, Download, Truck, Users } from 'lucide-react';
import { ActionButton } from '@/components/ui/button/ActionButton';
import { GlossaryPopover } from '@/components/ui/popover/GlossaryPopover';
import { useSecurityOps } from '@/hooks/security/useSecurityOps';

export function SecurityOpsReportsView() {
  const { allGateLogs, incidents } = useSecurityOps();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Laporan Keamanan</h1>
          <GlossaryPopover
            title="Laporan Gate Traffic & Keamanan Pos"
            description="Rekapitulasi total kendaraan angkut, tamu VIP hotel, dan statistik insiden keamanan per cabang."
          />
        </div>
        <ActionButton icon={Download} label="Export PDF / Excel" onClick={() => {}} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-400">Total Gate Pass Diterbitkan</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{allGateLogs.length}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-400">Total Insiden Shift Patroli</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{incidents.length}</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-400">Insiden Ter-Eskalasi ke Rapat</div>
          <div className="text-2xl font-black text-red-600 dark:text-red-400">
            {incidents.filter((i) => i.status === 'ESCALATED_TO_TICKET').length}
          </div>
        </div>
      </div>
    </div>
  );
}
