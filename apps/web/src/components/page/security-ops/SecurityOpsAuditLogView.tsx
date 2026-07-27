'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { GlossaryPopover } from '@/components/ui/popover/GlossaryPopover';
import { useSecurityOps } from '@/hooks/security/useSecurityOps';

export function SecurityOpsAuditLogView() {
  const { allGateLogs } = useSecurityOps();
  const deletedLogs = allGateLogs.filter((g) => g.isDeleted);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Audit Log Keamanan</h1>
        <GlossaryPopover
          title="Audit Trail Pos Keamanan"
          description="Catatan riwayat pencatatan gerbang pos satpam, gate pass, serta arsip data soft-delete."
        />
      </div>

      <div className="p-4 bg-slate-900 text-white rounded-xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <div className="font-bold">Security Audit Trail Active</div>
            <div className="text-slate-400">Seluruh penghapusan log gerbang terekam sebagai soft-delete (isDeleted: true).</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden p-4 text-xs text-slate-400">
        {deletedLogs.length === 0 ? (
          <div>Belum ada log pos yang di-soft delete. Audit trail 100% bersih.</div>
        ) : (
          deletedLogs.map((g) => (
            <div key={g.id} className="p-2 border-b border-slate-100 dark:border-slate-800 flex justify-between">
              <span>[{g.passCode}] {g.vehiclePlate} — {g.driverName}</span>
              <span className="text-red-500 font-bold">SOFT DELETED</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
