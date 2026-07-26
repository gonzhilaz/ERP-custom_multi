'use client';

import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, AlertTriangle, XCircle, HelpCircle, X, Download } from 'lucide-react';

export const HrdAttendanceSummaryView = () => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('2026-07');

  const summaryData = [
    {
      id: 'emp-01',
      employeeName: 'Budi Santoso',
      department: 'Operasional Site Tambang',
      presentDays: 22,
      lateMinutes: 15,
      earlyLeave: 0,
      alphaDays: 0,
      approvedLeave: 1,
      overtimeHours: 12
    },
    {
      id: 'emp-02',
      employeeName: 'Siti Rahma',
      department: 'Dapur & Service Resto',
      presentDays: 20,
      lateMinutes: 45,
      earlyLeave: 1,
      alphaDays: 1,
      approvedLeave: 2,
      overtimeHours: 6
    },
    {
      id: 'emp-03',
      employeeName: 'Dewi Lestari',
      department: 'Front Office Hotel',
      presentDays: 23,
      lateMinutes: 0,
      earlyLeave: 0,
      alphaDays: 0,
      approvedLeave: 0,
      overtimeHours: 8
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Rekap Presensi</span>
          </h1>

          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 p-1 cursor-pointer"
              title="Informasi Audit Timesheet"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Rekapitulasi Kehadiran Karyawan</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Rekapitulasi total presensi, menit keterlambatan, mangkir (alpha), dan lembur karyawan per periode penggajian. Menjadi dasar hitungan potong absensi di Payroll Engine.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
          />
          <button
            onClick={() => alert('Exporting Timesheet Summary CSV...')}
            className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Tingkat Kehadiran</div>
            <div className="text-base font-bold text-slate-900 dark:text-white">96.4%</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Total Keterlambatan</div>
            <div className="text-base font-bold text-slate-900 dark:text-white">60 Menit</div>
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

      {/* Summary Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <th className="p-3 font-semibold">Nama Karyawan</th>
              <th className="p-3 font-semibold">Departemen</th>
              <th className="p-3 font-semibold text-center">Hadir (Hari)</th>
              <th className="p-3 font-semibold text-center">Terlambat</th>
              <th className="p-3 font-semibold text-center">Mangkir</th>
              <th className="p-3 font-semibold text-center">Cuti/Izin</th>
              <th className="p-3 font-semibold text-center">Lembur (Jam)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {summaryData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-bold text-slate-900 dark:text-white">{row.employeeName}</td>
                <td className="p-3 text-slate-600 dark:text-slate-300">{row.department}</td>
                <td className="p-3 text-center font-semibold text-emerald-600">{row.presentDays} Hari</td>
                <td className="p-3 text-center text-amber-600 font-medium">{row.lateMinutes > 0 ? `${row.lateMinutes} Mnt` : '-'}</td>
                <td className="p-3 text-center text-rose-600 font-semibold">{row.alphaDays > 0 ? `${row.alphaDays} Hari` : '-'}</td>
                <td className="p-3 text-center text-sky-600 font-medium">{row.approvedLeave} Hari</td>
                <td className="p-3 text-center text-indigo-600 font-bold">{row.overtimeHours} Jam</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
