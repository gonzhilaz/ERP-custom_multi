'use client';

import React, { useState } from 'react';
import { Wrench, Plus, AlertTriangle, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

interface DefectTicket {
  id: string;
  roomNo: string;
  defectCategory: 'AC_COOLING' | 'PLUMBING_LEAK' | 'DOOR_LOCK_BATTERY' | 'TV_ELECTRONIC' | 'WATER_HEATER';
  description: string;
  severity: 'CRITICAL_OOO' | 'MEDIUM_OOS' | 'MINOR';
  reportedBy: string;
  assignedEngineer: string;
  status: 'OPEN_OOO' | 'IN_PROGRESS' | 'REPAIRED_INSPECTED';
  reportedTime: string;
}

export const RoomMaintenanceDefectTab = () => {
  const [tickets, setTickets] = useState<DefectTicket[]>([
    {
      id: 'WO-ENG-2026-081',
      roomNo: 'RM-202',
      defectCategory: 'AC_COOLING',
      description: 'Kompresor AC berisik & Freon bocor (Suhu kamar tidak dingin > 26°C)',
      severity: 'CRITICAL_OOO',
      reportedBy: 'Housekeeping Supervisor Ahmad',
      assignedEngineer: 'Chief Engineer Budi',
      status: 'OPEN_OOO',
      reportedTime: '2026-07-26 08:30'
    },
    {
      id: 'WO-ENG-2026-078',
      roomNo: 'RM-104',
      defectCategory: 'DOOR_LOCK_BATTERY',
      description: 'Baterai RFID Smart Door Lock lemah (Indikator Merah Berkedip)',
      severity: 'MINOR',
      reportedBy: 'Front Desk Receptionist Rina',
      assignedEngineer: 'Teknisi Elektro Herman',
      status: 'REPAIRED_INSPECTED',
      reportedTime: '2026-07-25 15:10'
    }
  ]);

  const handleResolveTicket = (ticketId: string) => {
    setTickets(
      tickets.map((t) => (t.id === ticketId ? { ...t, status: 'REPAIRED_INSPECTED' } : t))
    );
    alert(`Kerusakan pada kamar berhasil diperbaiki & disetujui! Status Kamar dikembalikan ke Vacant Clean (VC).`);
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Inspeksi Defect Kamar & Out of Order (OOO)</h2>
            <p className="text-[11px] text-slate-500">Laporan Kerusakan Fasilitas Fisik Kamar & Assignment Engineering Work Order</p>
          </div>
        </div>

        <button onClick={() => alert('Buat Laporan Defect Kerusakan Kamar Baru')} className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Laporkan Kerusakan Kamar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-amber-500 transition-all">
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-sky-500/10 text-sky-600 border border-sky-500/20">
                {ticket.id}
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                ticket.severity === 'CRITICAL_OOO' ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20' : 'bg-amber-500/10 text-amber-600'
              }`}>
                {ticket.severity === 'CRITICAL_OOO' ? 'CRITICAL - SET OOO' : ticket.severity}
              </span>
            </div>

            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-mono">{ticket.roomNo}</h3>
              <span className="text-[10px] text-slate-400 font-mono">Kategori: {ticket.defectCategory}</span>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 font-mono">
              {ticket.description}
            </p>

            <div className="text-[10px] text-slate-400 flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <div>Pelapor: {ticket.reportedBy} ({ticket.reportedTime})</div>
                <div>Teknisi: <span className="font-bold text-slate-700 dark:text-slate-200">{ticket.assignedEngineer}</span></div>
              </div>
              <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                ticket.status === 'REPAIRED_INSPECTED' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
              }`}>
                {ticket.status}
              </span>
            </div>

            {ticket.status !== 'REPAIRED_INSPECTED' && (
              <button onClick={() => handleResolveTicket(ticket.id)} className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all text-xs cursor-pointer flex items-center justify-center gap-1.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Konfirmasi Perbaikan Selesai & Release OOO</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
