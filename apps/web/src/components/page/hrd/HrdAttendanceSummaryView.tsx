'use client';

import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, AlertTriangle, XCircle, HelpCircle, X } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface AttendanceSummaryItem {
  id: string;
  employeeName: string;
  department: string;
  presentDays: number;
  lateDays: number;
  absentDays: number;
  leaveDays: number;
  overtimeHours: number;
}

export const HrdAttendanceSummaryView = () => {
  const [showGlossary, setShowGlossary] = useState(false);

  const summaryData: AttendanceSummaryItem[] = [
    { id: 'att-1', employeeName: 'Budi Santoso', department: 'Holding Central', presentDays: 22, lateDays: 1, absentDays: 0, leaveDays: 0, overtimeHours: 12 },
    { id: 'att-2', employeeName: 'Siti Aminah', department: 'Holding Central', presentDays: 20, lateDays: 0, absentDays: 0, leaveDays: 2, overtimeHours: 4 },
    { id: 'att-3', employeeName: 'Rudi Hermawan', department: 'Mining Operations', presentDays: 21, lateDays: 2, absentDays: 1, leaveDays: 0, overtimeHours: 10 }
  ];

  const columns: ColumnDef<AttendanceSummaryItem>[] = [
    { key: 'employeeName', header: 'Nama Karyawan', className: 'font-bold text-slate-900 dark:text-white', render: (r) => r.employeeName },
    { key: 'department', header: 'Departemen', className: 'text-slate-500', render: (r) => r.department },
    { key: 'presentDays', header: 'Hadir (Hari)', align: 'center', className: 'font-bold font-mono text-emerald-600', render: (r) => `${r.presentDays} Hari` },
    { key: 'lateDays', header: 'Terlambat', align: 'center', className: 'font-bold font-mono text-amber-600', render: (r) => `${r.lateDays} Kali` },
    { key: 'absentDays', header: 'Mangkir', align: 'center', className: 'font-bold font-mono text-rose-600', render: (r) => `${r.absentDays} Hari` },
    { key: 'leaveDays', header: 'Cuti/Izin', align: 'center', className: 'font-bold font-mono text-sky-600', render: (r) => `${r.leaveDays} Hari` },
    { key: 'overtimeHours', header: 'Lembur (Jam)', align: 'center', className: 'font-bold font-mono text-indigo-600', render: (r) => `${r.overtimeHours} Jam` }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Presensi</span>
          </h1>

          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Rekap Presensi"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Rekapitulasi Presensi</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Ringkasan total akumulasi kehadiran, ketepatan waktu, keterlambatan, cuti, serta total jam lembur per periode bulanan yang langsung tersinkronisasi ke engine penggajian Payroll.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Tingkat Kehadiran</div>
            <div className="text-base font-bold text-slate-900 dark:text-white">96.8%</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Total Keterlambatan</div>
            <div className="text-base font-bold text-slate-900 dark:text-white">3 Kejadian</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/10 text-rose-600 rounded-xl">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Mangkir / Alpha</div>
            <div className="text-base font-bold text-slate-900 dark:text-white">1 Hari</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Total Jam Lembur</div>
            <div className="text-base font-bold text-slate-900 dark:text-white">26 Jam</div>
          </div>
        </div>
      </div>

      <DataTable
        headerTitle={`Rekapitulasi Presensi Karyawan (${summaryData.length})`}
        columns={columns}
        data={summaryData}
        keyExtractor={(r) => r.id}
      />
    </div>
  );
};
