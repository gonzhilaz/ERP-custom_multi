'use client';

import React, { useState } from 'react';
import { ShieldCheck, Monitor, LogOut, Globe, AlertTriangle } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

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
      <DataTable
        headerTitle={`Sesi User Aktif Real-Time (${sessions.length})`}
        columns={[
          {
            key: 'userName',
            header: 'Nama Pengguna & Peran',
            className: 'font-bold text-slate-900 dark:text-white',
            render: (s) => (
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{s.userName}</div>
                <div className="text-[10px] text-slate-400 font-semibold">{s.role}</div>
              </div>
            )
          },
          { key: 'ipAddress', header: 'IP Address', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (s) => s.ipAddress },
          {
            key: 'location',
            header: 'Lokasi & Device',
            render: (s) => (
              <div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{s.location}</div>
                <div className="text-[10px] text-slate-400">{s.device}</div>
              </div>
            )
          },
          { key: 'loginTime', header: 'Waktu Login', className: 'font-mono text-[11px] text-slate-500', render: (s) => s.loginTime },
          {
            key: 'actions',
            header: 'Aksi Keamanan',
            align: 'center',
            sortable: false,
            render: (s) => (
              <button
                onClick={() => handleForceLogout(s.id, s.userName)}
                className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all flex items-center gap-1 mx-auto cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>Force Logout</span>
              </button>
            )
          }
        ]}
        data={sessions}
        keyExtractor={(s) => s.id}
      />
    </div>
  );
};
