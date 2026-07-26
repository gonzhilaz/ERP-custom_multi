'use client';

import React, { useState } from 'react';
import { Clock, Calendar, ShieldCheck, HelpCircle, X, CheckCircle2, Table, Plus } from 'lucide-react';
import { MASTER_WORK_SHIFTS, MOCK_WEEKLY_SCHEDULE } from '@/lib/mock/ess-schedule';

export const EssScheduleView = () => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [activeTab, setActiveTab] = useState<'ROSTER' | 'CATEGORIES_TABLE'>('ROSTER');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-500" />
            <span>Jadwal & Shift Kerja</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Jadwal & Shift Kerja"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Shift & Master Tabel Jam Kerja</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Kode Shift Non-Hardcoded</strong>: Dibuat oleh HRD/Atasan (T1/S1, T2A/S2A, T2B/S2B, T3/S3, L/OFF).
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Tabel Master Jam Kerja</strong>: Pengaturan durasi shift dan aturan setengah hari jam 12 siang.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('ROSTER')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'ROSTER' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Jadwal Roster Saya
          </button>
          <button
            onClick={() => setActiveTab('CATEGORIES_TABLE')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'CATEGORIES_TABLE' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Tabel Master Kode Shift
          </button>
        </div>
      </div>

      {activeTab === 'ROSTER' ? (
        /* Roster Schedule Table Assigned by Supervisor */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Jadwal Roster Kerja Mingguan & Bulanan (Disusun Supervisor)</span>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Roster Confirmed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Hari & Tanggal</th>
                  <th className="py-3 px-4 text-center">Kode Shift</th>
                  <th className="py-3 px-4">Nama Shift Kerja</th>
                  <th className="py-3 px-4 font-mono">Jam Kerja</th>
                  <th className="py-3 px-4">Supervisor Penanggung Jawab</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {MOCK_WEEKLY_SCHEDULE.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {item.dayName}, {item.date}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                        {item.shiftCode}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">{item.shiftName}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">{item.shiftHours}</td>
                    <td className="py-3 px-4 text-slate-500">{item.supervisorName}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        item.status === 'SCHEDULED' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300' :
                        'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kategori Master Jam Kerja Dalam Bentuk Tabel */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Tabel Master Kategori Jam Kerja & Kode Shift (Non-Hardcoded)</span>
            <button className="px-3 py-1 bg-sky-600 text-white rounded-lg text-xs font-bold transition-all cursor-pointer">
              + Kode Shift Baru
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4 text-center">Kode Shift</th>
                  <th className="py-3 px-4">Nama Kategori Jam Kerja</th>
                  <th className="py-3 px-4 font-mono">Jam Kerja Reguler</th>
                  <th className="py-3 px-4 font-mono">Hari Setengah Hari (Jam 12)</th>
                  <th className="py-3 px-4 font-mono">Jam Istirahat</th>
                  <th className="py-3 px-4 text-center">Durasi Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {MASTER_WORK_SHIFTS.map((ws) => (
                  <tr key={ws.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-center font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">
                      {ws.code}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{ws.name}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">{ws.normalHours}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-amber-600">{ws.halfDayHours || '-'}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{ws.breakHours}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold">{ws.totalHoursPerDay} Jam</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
