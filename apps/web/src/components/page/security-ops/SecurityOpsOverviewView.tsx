'use client';

import React from 'react';
import { Shield, Truck, Users, AlertTriangle, CheckCircle2, ArrowUpRight, Lock } from 'lucide-react';
import { ActionButton } from '@/components/ui/button/ActionButton';
import { PrimaryButton } from '@/components/ui/button/PrimaryButton';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { GlossaryPopover } from '@/components/ui/popover/GlossaryPopover';
import { useSecurityOps } from '@/hooks/security/useSecurityOps';

export function SecurityOpsOverviewView() {
  const { allGateLogs, incidents } = useSecurityOps();

  const insideCount = allGateLogs.filter((g) => !g.isDeleted && g.status === 'INSIDE').length;
  const haulingCount = allGateLogs.filter((g) => !g.isDeleted && g.passType === 'OUTBOUND_HAULING').length;
  const totalIncidents = incidents.filter((i) => !i.isDeleted).length;
  const escalatedIncidents = incidents.filter((i) => !i.isDeleted && i.status === 'ESCALATED_TO_TICKET').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Overview Keamanan Pos</h1>
          <GlossaryPopover
            title="Pos Keamanan & Control Gate Ops"
            description="Pusat pemantauan lalu lintas supir truk hauling, tamu VIP hotel, pencatatan gate pass, dan laporan insiden patroli shift."
          />
        </div>
        <div className="flex items-center gap-2">
          <ActionButton icon={Shield} label="Jadwal Shift Patroli" onClick={() => {}} />
          <PrimaryButton icon={Lock} label="Input Gate Pass" onClick={() => {}} />
        </div>
      </div>

      {escalatedIncidents > 0 && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-red-600 dark:text-red-400">
                Peringatan: {escalatedIncidents} Insiden Keamanan Dieskalasi ke Tiket Rapat!
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Insiden ditemukann saat patroli dan telah di-link ke Tiket Kendala Meeting Notes.
              </div>
            </div>
          </div>
          <ActionButton icon={ArrowUpRight} label="Lihat Insiden" onClick={() => {}} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Kendaraan / Tamu di Dalam</span>
            <Users className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{insideCount}</div>
          <div className="text-[11px] text-slate-400">Status active INSIDE site</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Truk Hauling Tambang</span>
            <Truck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{haulingCount}</div>
          <div className="text-[11px] text-amber-500/80 font-medium">Lalu lintas angkut ore emas/nikel</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Insiden Patroli Shift</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-red-600 dark:text-red-400">{totalIncidents}</div>
          <div className="text-[11px] text-red-500/80 font-medium">Tercatat dalam shift minggu ini</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Gate Pass Status</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">NORMAL</div>
          <div className="text-[11px] text-emerald-500/80 font-medium">Pengawasan pintu gerbang 100% aman</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Lalu Lintas Gate Pass Terbaru</h2>
          <div className="space-y-3">
            {allGateLogs.slice(0, 3).map((g) => (
              <div key={g.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{g.vehiclePlate} — {g.driverName}</div>
                  <div className="text-[11px] text-slate-500">{g.purpose}</div>
                </div>
                <StatusBadge type={g.status === 'INSIDE' ? 'WARNING' : 'ACTIVE'} label={g.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Laporan Insiden Terbaru</h2>
          <div className="space-y-3">
            {incidents.map((inc) => (
              <div key={inc.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">{inc.title}</span>
                  <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">{inc.severity}</span>
                </div>
                <div className="text-[11px] text-slate-500">{inc.description}</div>
                {inc.linkedTicketCode && (
                  <div className="text-[10px] text-sky-600 font-mono font-bold">Ter-link ke Tiket: {inc.linkedTicketCode}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
