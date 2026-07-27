'use client';

import React, { useState } from 'react';
import { Calendar, Plus, CheckCircle2, RefreshCw, FileText, User } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/button/PrimaryButton';
import { ActionButton } from '@/components/ui/button/ActionButton';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { GlossaryPopover } from '@/components/ui/popover/GlossaryPopover';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { useMeetingNotes } from '@/hooks/meeting/useMeetingNotes';

export function MeetingNotesSessionsView() {
  const { allTickets, sessions, agendaItems, recordAgendaDecision } = useMeetingNotes();
  const [selectedTicketId, setSelectedTicketId] = useState('');
  const [decisionNote, setDecisionNote] = useState('');
  const [actionItem, setActionItem] = useState('');
  const [picName, setPicName] = useState('');
  const [dueDate, setDueDate] = useState('2026-07-30');
  const [decisionStatus, setDecisionStatus] = useState<'PENDING_CARRY_OVER' | 'RESOLVED_WITH_DECISION'>('PENDING_CARRY_OVER');

  const escalatedTickets = allTickets.filter((t) => t.status === 'ESCALATED_TO_HO');

  const handleRecordDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !decisionNote || sessions.length === 0) return;
    recordAgendaDecision(
      selectedTicketId,
      sessions[0].id,
      decisionStatus,
      decisionNote,
      actionItem,
      picName,
      dueDate
    );
    setSelectedTicketId('');
    setDecisionNote('');
    setActionItem('');
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Board Rapat & Risalah</h1>
          <GlossaryPopover
            title="Minutes of Meeting (MoM) Board"
            description="Pencatatan keputusan rapat mingguan Direksi HO atas tiket kendala eskalasi, menentukan status Carry-Over atau Keputusan Final."
          />
        </div>
        <PrimaryButton icon={Plus} label="Buat Sesi Rapat" onClick={() => {}} />
      </div>

      {/* Active Meeting Session Header */}
      {sessions.length > 0 && (
        <div className="p-5 bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-xl shadow-md space-y-3">
          <div className="flex justify-between items-center">
            <span className="px-2.5 py-1 text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full font-mono">
              {sessions[0].sessionCode}
            </span>
            <StatusBadge type="ACTIVE" label={sessions[0].status} />
          </div>
          <div>
            <h2 className="text-base font-black">{sessions[0].title}</h2>
            <p className="text-xs text-slate-300">Waktu: {sessions[0].meetingDate} • Pimpinan Rapat: {sessions[0].chairpersonName}</p>
          </div>
        </div>
      )}

      {/* Form Decision Recording */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Form Risalah Keputusan Rapat</h3>
        <form onSubmit={handleRecordDecision} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Pilih Tiket Eskalasi HO *</label>
              <SearchableSelect
                options={escalatedTickets.map((t) => ({
                  id: t.id,
                  label: `[${t.ticketCode}] ${t.title}`
                }))}
                value={selectedTicketId}
                onChange={(val) => setSelectedTicketId(val)}
                placeholder="Pilih Tiket Eskalasi..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Status Keputusan Rapat</label>
              <SearchableSelect
                options={[
                  { id: 'PENDING_CARRY_OVER', label: 'PENDING (Carry-Over ke Rapat Berikutnya)' },
                  { id: 'RESOLVED_WITH_DECISION', label: 'RESOLVED (Solusi Final Disetujui)' }
                ]}
                value={decisionStatus}
                onChange={(val) => setDecisionStatus(val as any)}
                placeholder="Pilih Status..."
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Catatan Risalah / Decision Note *</label>
            <textarea
              required
              rows={2}
              value={decisionNote}
              onChange={(e) => setDecisionNote(e.target.value)}
              placeholder="Masukkan keputusan resmi hasil diskusi rapat..."
              className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Action Item Tindakan</label>
              <input
                type="text"
                value={actionItem}
                onChange={(e) => setActionItem(e.target.value)}
                placeholder="Contoh: Kirim bantuan armada tangki"
                className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">PIC Penanggung Jawab</label>
              <input
                type="text"
                value={picName}
                onChange={(e) => setPicName(e.target.value)}
                placeholder="Nama Pejabat HO"
                className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Deadline Target</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <PrimaryButton icon={CheckCircle2} label="Simpan Risalah" onClick={() => {}} />
          </div>
        </form>
      </div>

      {/* Decision Carry-Over & Minutes Data Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">Daftar Risalah & Carry-Over Rapat</h3>
          <span className="text-[11px] text-slate-400">{agendaItems.length} Risalah Terekam</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="p-3">Kode Tiket</th>
                <th className="p-3">Judul Tiket Eskalasi</th>
                <th className="p-3">Status Meeting</th>
                <th className="p-3">Catatan Keputusan & Action Item</th>
                <th className="p-3">PIC & Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {agendaItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-bold text-sky-600 dark:text-sky-400">{item.ticketCode}</td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">{item.ticketTitle}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                      item.status === 'PENDING_CARRY_OVER'
                        ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 space-y-1">
                    <div className="text-slate-800 dark:text-slate-200">{item.decisionNote}</div>
                    {item.actionItem && (
                      <div className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">Tindakan: {item.actionItem}</div>
                    )}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    <div>PIC: {item.picName || '-'}</div>
                    <div className="text-[10px] text-slate-400">Target: {item.dueDate || '-'}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
