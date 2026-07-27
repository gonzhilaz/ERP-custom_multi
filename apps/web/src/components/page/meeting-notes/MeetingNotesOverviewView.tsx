'use client';

import React from 'react';
import { HelpCircle, AlertTriangle, CheckCircle2, Clock, ArrowUpRight, Calendar, Layers } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/button/PrimaryButton';
import { ActionButton } from '@/components/ui/button/ActionButton';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { GlossaryPopover } from '@/components/ui/popover/GlossaryPopover';
import { useMeetingNotes } from '@/hooks/meeting/useMeetingNotes';

export function MeetingNotesOverviewView() {
  const { allTickets, sessions, agendaItems } = useMeetingNotes();

  const openTickets = allTickets.filter((t) => !t.isDeleted && t.status === 'OPEN').length;
  const escalatedTickets = allTickets.filter((t) => !t.isDeleted && t.status === 'ESCALATED_TO_HO').length;
  const resolvedTickets = allTickets.filter((t) => !t.isDeleted && (t.status === 'RESOLVED' || t.status === 'CLOSED')).length;
  const pendingCarryOvers = agendaItems.filter((a) => a.status === 'PENDING_CARRY_OVER').length;

  return (
    <div className="space-y-6">
      {/* Header Title with Short Copywriting & Glossary Popover */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Overview Rapat</h1>
          <GlossaryPopover
            title="Overview Escalation & Meeting Notes"
            description="Pusat pemantauan tiket kendala operasional cabang yang dieskalasi ke Direksi HO serta risalah keputusan rapat mingguan."
          />
        </div>
        <div className="flex items-center gap-2">
          <ActionButton icon={Calendar} label="Jadwal Rapat" onClick={() => {}} />
          <PrimaryButton icon={Layers} label="Buat Tiket" onClick={() => {}} />
        </div>
      </div>

      {/* Warning Banner for Urgent Escalations */}
      {escalatedTickets > 0 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div>
              <div className="text-sm font-bold text-amber-600 dark:text-amber-400">
                Perhatian: {escalatedTickets} Tiket Kendala Membutuhkan Keputusan HO!
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Tiket dieskalasi oleh Manager Cabang untuk dibahas pada Rapat Mingguan Direksi.
              </div>
            </div>
          </div>
          <ActionButton icon={ArrowUpRight} label="Review Agenda" onClick={() => {}} />
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Tiket Lapangan Open</span>
            <Clock className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{openTickets}</div>
          <div className="text-[11px] text-slate-400">Menunggu tindak lanjut Manager</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Eskalasi ke Agenda HO</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{escalatedTickets}</div>
          <div className="text-[11px] text-amber-500/80 font-medium">Membutuhkan persetujuan Direksi</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Carry-Over Meeting</span>
            <Calendar className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{pendingCarryOvers}</div>
          <div className="text-[11px] text-slate-400">Di-carry over ke rapat berikutnya</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Tiket Selesai / Closed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{resolvedTickets}</div>
          <div className="text-[11px] text-emerald-500/80 font-medium">Solusi disetujui & terekam</div>
        </div>
      </div>

      {/* Analytical Charts & Urgent Escalation Board */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Escalations List */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Agenda Rapat Direksi HO</h2>
            <StatusBadge type="ACTIVE" label="LIVE SESSION" />
          </div>
          <div className="space-y-3">
            {allTickets
              .filter((t) => t.status === 'ESCALATED_TO_HO')
              .map((t) => (
                <div key={t.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400">{t.ticketCode}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500/10 text-red-600 border border-red-500/30 rounded-full">{t.priority}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{t.title}</div>
                  <div className="text-[11px] text-slate-500">{t.branchLocation} • Dibuat oleh: {t.createdByName}</div>
                </div>
              ))}
          </div>
        </div>

        {/* Meeting Session Summary */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Sesi Rapat Terjadwal</h2>
            <GlossaryPopover title="Meeting Sessions" description="Daftar rapat koordinasi mingguan antara Direksi Holding dengan para General Manager Cabang." />
          </div>
          <div className="space-y-3">
            {sessions.map((s) => (
              <div key={s.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{s.title}</span>
                  <StatusBadge type="ACTIVE" label={s.status} />
                </div>
                <div className="text-[11px] text-slate-500">Tanggal: {s.meetingDate} • Pimpinan: {s.chairpersonName}</div>
                {s.notes && <div className="text-[11px] text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">{s.notes}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
