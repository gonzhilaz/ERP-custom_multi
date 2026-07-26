'use client';

import React, { useState } from 'react';
import { ShieldCheck, Monitor, LogOut, Globe, AlertTriangle } from 'lucide-react';

export const ActiveSessionsTab = () => {
  const [sessions, setSessions] = useState([
    { id: 'ses-01', userName: 'Bpk. Rayhan Prasetya', role: 'Holding Executive', ipAddress: '182.253.99.10', location: 'Jakarta, Indonesia', device: 'Chrome / Windows 11', loginTime: '2026-07-24 08:00', status: 'ACTIVE' },
    { id: 'ses-02', userName: 'Siti Aminah', role: 'Kasir Toko Roti Outlet 1', ipAddress: '36.85.12.44', location: 'Surabaya, Indonesia', device: 'Edge / POS Tablet', loginTime: '2026-07-24 07:30', status: 'ACTIVE' },
    { id: 'ses-03', userName: 'Ir. Hidayat Mining', role: 'Chief Engineer Site', ipAddress: '114.122.45.89', location: 'Balikpapan, Indonesia', device: 'Firefox / macOS', loginTime: '2026-07-24 06:15', status: 'ACTIVE' }
  ]);

  const handleForceLogout = (sessionId: string, userName: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    alert(`User Session untuk [${userName}] Berhasil Dikeluarkan (Force Logout)!`);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl shrink-0">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Sesi Login</h2>
          </div>
        </div>

        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold rounded-xl font-mono">
          {sessions.length} Active Sessions
        </span>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Nama Pengguna & Peran</th>
                <th className="py-3 px-4 font-mono">IP Address</th>
                <th className="py-3 px-4">Lokasi & Device</th>
                <th className="py-3 px-4">Waktu Login</th>
                <th className="py-3 px-4 text-center">Aksi Keamanan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {sessions.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{s.userName}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{s.role}</div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{s.ipAddress}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{s.location}</div>
                    <div className="text-[10px] text-slate-400">{s.device}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{s.loginTime}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleForceLogout(s.id, s.userName)}
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all flex items-center gap-1 mx-auto cursor-pointer"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Force Logout</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
