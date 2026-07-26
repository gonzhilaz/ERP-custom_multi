'use client';

import React, { useState } from 'react';
import { UserCheck, Calendar, Clock, DollarSign, FileText, ShieldCheck, MapPin, ArrowRight, HelpCircle, X, Camera, BarChart2, AlertTriangle, Award, Activity } from 'lucide-react';
import Link from 'next/link';

export const EssOverviewView = () => {
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-sky-500" />
            <span>ESS Overview</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary ESS Overview"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary ESS Overview & Analisis</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Metrik Produktivitas Karyawan</strong>: Persentase efisiensi jam kerja & pencapaian KPI individu (96.5%).
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Catatan Disiplin SP (Surat Peringatan)</strong>: Rekam jejak kedisiplinan (SP 0 - Clean Record).
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Persentase Kehadiran Bulanan</strong>: Persentase kehadiran tepat waktu (98.2%).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics & KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Presensi Hari Ini</span>
            <UserCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">07:54 WIB</div>
          <div className="text-[10px] text-slate-500">Status: HADIR (GPS Validated)</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Kehadiran Bulanan</span>
            <Activity className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-xl font-bold text-sky-600 dark:text-sky-400 font-mono">98.2%</div>
          <div className="text-[10px] text-emerald-600 font-semibold">Tepat Waktu (22/22 Hari)</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Skor Produktivitas</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">96.5 / 100</div>
          <div className="text-[10px] text-slate-500">Evaluasi Performa Mandiri</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
            <span>Status SP (Surat Peringatan)</span>
            <AlertTriangle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">SP 0 (Bersih)</div>
          <div className="text-[10px] text-emerald-600 font-semibold">Clean Disciplinary Record</div>
        </div>
      </div>

      {/* Visual Analytical Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Productivity & Attendance Progress Chart */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-sky-500" />
              <span>Analisis Produktivitas & Jam Kerja Karyawan</span>
            </span>
            <span className="text-[10px] font-mono text-sky-600 font-bold">Periode Juli 2026</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
                <span>Rasio Kehadiran Tepat Waktu</span>
                <span className="font-mono font-bold text-emerald-600">98.2%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '98.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
                <span>Pencapaian KPI & Output Tugas</span>
                <span className="font-mono font-bold text-sky-600">96.5%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '96.5%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-semibold mb-1">
                <span>Penggunaan Kuota Cuti Tahunan</span>
                <span className="font-mono font-bold text-amber-600">0% (Sisa 12 Hari)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Shift Schedule Status & Quick Actions */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-500" />
                <span>Shift Kerja Hari Ini (Penugasan Supervisor)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                OFFICE-01
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1 text-xs">
              <div className="font-bold text-slate-900 dark:text-white">Setengah Hari (Jam 12 Siang)</div>
              <div className="text-emerald-600 font-mono font-bold">08:00 - 12:00 WIB</div>
              <div className="text-[11px] text-slate-400">Supervisor: Hendra Wijaya (SPV Operations)</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/ess/attendance"
              className="p-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold text-center transition-all cursor-pointer"
            >
              Presensi & Kalender
            </Link>
            <Link
              href="/ess/schedule"
              className="p-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold text-center transition-all cursor-pointer"
            >
              Jadwal Shift Roster
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
