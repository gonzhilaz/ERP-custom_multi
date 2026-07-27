'use client';

import React, { useState } from 'react';
import { Activity, Database, ShieldCheck, RefreshCw, Server, Wifi, Cpu, HelpCircle, X } from 'lucide-react';
import { useSystemHealth } from '@/hooks/health/useSystemHealth';
import { SkeletonTable } from '@/components/ui/loader/skeleton/SkeletonTable';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

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
        <DataTable
          headerTitle={`Status Dynamic Database Pools (${pools.length})`}
          columns={[
            { key: 'code', header: 'Kode Tenant', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (p) => p.code },
            { key: 'name', header: 'Nama Database / Unit Usaha', className: 'font-semibold text-slate-900 dark:text-white', render: (p) => p.name },
            { key: 'dbUriMasked', header: 'Connection String', className: 'font-mono text-[10px] text-slate-400', render: (p) => p.dbUriMasked },
            {
              key: 'connections',
              header: 'Aktif / Idle',
              align: 'center',
              className: 'font-bold',
              render: (p) => (
                <span>
                  <span className="text-emerald-600">{p.activeConnections} active</span> / <span className="text-slate-400">{p.idleConnections} idle</span>
                </span>
              )
            },
            { key: 'latencyMs', header: 'Latency Query', align: 'center', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (p) => `${p.latencyMs} ms` },
            {
              key: 'status',
              header: 'Status',
              align: 'center',
              render: (p) => (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {p.status}
                </span>
              )
            }
          ]}
          data={pools}
          keyExtractor={(p) => p.tenantId}
        />
      )}
    </div>
  );
};
