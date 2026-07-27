'use client';

import React from 'react';
import { ShieldCheck, Trash2, History } from 'lucide-react';
import { GlossaryPopover } from '@/components/ui/popover/GlossaryPopover';
import { useMeetingNotes } from '@/hooks/meeting/useMeetingNotes';

export function MeetingNotesAuditLogView() {
  const { allTickets } = useMeetingNotes();
  const deletedTickets = allTickets.filter((t) => t.isDeleted);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Audit Log Rapat & Tiket</h1>
        <GlossaryPopover
          title="Audit Trail Governance"
          description="Catatan riwayat perubahan status tiket, eskalasi, risalah rapat, serta arsip data soft-delete."
        />
      </div>

      <div className="p-4 bg-slate-900 text-white rounded-xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div className="text-xs">
            <div className="font-bold">Soft-Delete & Audit Integrity Active</div>
            <div className="text-slate-400">Semua penghapusan tiket terekam sebagai soft-delete (isDeleted: true) untuk keperluan audit.</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">Arsip Tiket Di-Soft Delete ({deletedTickets.length})</h3>
        </div>
        <div className="p-4 text-xs text-slate-400">
          {deletedTickets.length === 0 ? (
            <div>Belum ada tiket yang di-soft delete. Seluruh audit trail bersih.</div>
          ) : (
            deletedTickets.map((t) => (
              <div key={t.id} className="p-2 border-b border-slate-100 dark:border-slate-800 flex justify-between">
                <span>[{t.ticketCode}] {t.title}</span>
                <span className="text-red-500 font-bold">SOFT DELETED</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
