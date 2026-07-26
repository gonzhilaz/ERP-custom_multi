'use client';

import React, { useState } from 'react';
import { Activity, Database, ShieldCheck, RefreshCw, Server, Wifi, Cpu, HelpCircle, X } from 'lucide-react';
import { useSystemHealth } from '@/hooks/health/useSystemHealth';
import { SkeletonTable } from '@/components/ui/loader/skeleton/SkeletonTable';

export const SystemHealthView = () => {
  const { pools, loading, refreshDiagnostics } = useSystemHealth();
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
            <span>System Health</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-emerald-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary System Health"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-emerald-400">
                  <span>Glossary System Diagnostics</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Database Pool per Tenant</strong>: Koneksi terisolasi ke database PostgreSQL fisik masing-masing unit bisnis.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Latency Query</strong>: Waktu respon query basis data dalam milidetik.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={refreshDiagnostics}
          className="px-3.5 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Infrastructure Status Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 rounded-xl">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">API Engine</div>
            <div className="font-bold text-xs text-emerald-600">ONLINE (Port 5000)</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 rounded-xl">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">WebSocket</div>
            <div className="font-bold text-xs text-blue-600">CONNECTED (0ms)</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-purple-50 dark:bg-purple-950/50 text-purple-600 rounded-xl">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">DB Pools</div>
            <div className="font-bold text-xs text-purple-600">4 Active & Healthy</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="p-3 bg-violet-50 dark:bg-violet-950/50 text-violet-600 rounded-xl">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">AI Engine</div>
            <div className="font-bold text-xs text-violet-600">DeepSeek Lite Ready</div>
          </div>
        </div>
      </div>

      {/* Database Connection Pool Metrics Table */}
      {loading ? (
        <SkeletonTable />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Status Dynamic Database Pools</span>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Isolated DB-per-Tenant
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Kode Tenant</th>
                  <th className="py-3 px-4">Nama Database / Unit Usaha</th>
                  <th className="py-3 px-4">Connection String</th>
                  <th className="py-3 px-4 text-center">Aktif / Idle</th>
                  <th className="py-3 px-4 text-center">Latency Query</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {pools.map((p) => (
                  <tr key={p.tenantId} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{p.code}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{p.name}</td>
                    <td className="py-3 px-4 font-mono text-[10px] text-slate-400">{p.dbUriMasked}</td>
                    <td className="py-3 px-4 text-center font-bold">
                      <span className="text-emerald-600">{p.activeConnections} active</span> / <span className="text-slate-400">{p.idleConnections} idle</span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-sky-600 dark:text-sky-400">{p.latencyMs} ms</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        {p.status}
                      </span>
                    </td>
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
