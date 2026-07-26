'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Play, CheckCircle2, ShieldCheck, DollarSign, Calendar } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

interface NightAuditLog {
  auditId: string;
  businessDate: string;
  totalRoomsOccupied: number;
  occupancyPercentage: string; // e.g. 84.5%
  adrAmount: number; // Average Daily Rate
  revParAmount: number; // Revenue Per Available Room
  totalRoomRevenue: number;
  totalFnBRevenue: number;
  postedToGlStatus: 'POSTED_AUTOMATIC' | 'PENDING';
  executedBy: string;
}

export const HotelierNightAuditView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [logs, setLogs] = useState<NightAuditLog[]>([
    { auditId: 'NA-2026-07-24', businessDate: '2026-07-24', totalRoomsOccupied: 42, occupancyPercentage: '84.0%', adrAmount: 850000, revParAmount: 714000, totalRoomRevenue: 35700000, totalFnBRevenue: 12400000, postedToGlStatus: 'POSTED_AUTOMATIC', executedBy: 'System Auto Night Auditor (00:00)' },
    { auditId: 'NA-2026-07-23', businessDate: '2026-07-23', totalRoomsOccupied: 38, occupancyPercentage: '76.0%', adrAmount: 820000, revParAmount: 623200, totalRoomRevenue: 31160000, totalFnBRevenue: 9800000, postedToGlStatus: 'POSTED_AUTOMATIC', executedBy: 'System Auto Night Auditor (00:00)' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.auditId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.businessDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<NightAuditLog>[] = [
    { key: 'businessDate', header: 'Tanggal Bisnis Hotel', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.businessDate },
    { key: 'totalRoomsOccupied', header: 'Kamar Terisi (Occupied)', align: 'center', className: 'font-mono font-bold text-slate-800 dark:text-slate-200', render: (i) => `${i.totalRoomsOccupied} / 50 Kamar` },
    { key: 'occupancyPercentage', header: 'Tingkat Okupansi (%)', align: 'center', className: 'font-mono font-bold text-emerald-600', render: (i) => i.occupancyPercentage },
    { key: 'adrAmount', header: 'ADR (Average Daily Rate)', align: 'right', className: 'font-mono font-bold text-slate-700', render: (i) => `Rp ${i.adrAmount.toLocaleString('id-ID')}` },
    { key: 'revParAmount', header: 'RevPAR', align: 'right', className: 'font-mono font-bold text-sky-600', render: (i) => `Rp ${i.revParAmount.toLocaleString('id-ID')}` },
    { key: 'totalRoomRevenue', header: 'Pendapatan Kamar (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (i) => `Rp ${i.totalRoomRevenue.toLocaleString('id-ID')}` },
    { key: 'totalFnBRevenue', header: 'Pendapatan Resto/MICE (Rp)', align: 'right', className: 'font-mono font-bold text-amber-600', render: (i) => `Rp ${i.totalFnBRevenue.toLocaleString('id-ID')}` },
    {
      key: 'postedToGlStatus',
      header: 'Auto-Post GL Finance',
      align: 'center',
      render: (i) => (
        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">
          {i.postedToGlStatus}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Night Audit"
        icon={Moon}
        iconBgColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        glossaryTitle="Glossary Hotel Night Audit"
        glossaryItems={[
          { term: 'Night Audit', description: 'Proses penutupan hari bisnis hotel pada tengah malam untuk memposting charge kamar ke folio tamu & membukukan jurnal pendapatan otomatis.' },
          { term: 'RevPAR & ADR', description: 'Metrik indikator kinerja utama industri perhotelan (Revenue Per Available Room & Average Daily Rate).' }
        ]}
        badges={[
          { label: `${logs.length} Night Audits`, variant: 'purple' },
          { label: 'EOD Rollover Active', variant: 'sky' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari tanggal bisnis atau ID audit..."
          />
        </div>

        <button onClick={() => alert('Night Audit manual berhasil dijalankan! Tanggal bisnis bergeser ke hari berikutnya.')} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
          <Play className="w-4 h-4" />
          <span>Jalankan Night Audit Manual</span>
        </button>
      </div>

      {isLoading ? (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4 animate-pulse"></div>
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-10 bg-slate-100 dark:bg-slate-800/60 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      ) : (
        <DataTable
          headerTitle={`History Audit Penutupan Hari (Night Audit Log) (${filtered.length})`}
          columns={columns}
          data={filtered}
          keyExtractor={(i) => i.auditId}
        />
      )}
    </div>
  );
};
