'use client';

import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface ApAgingRow {
  supplierName: string;
  totalAp: number;
  current: number; // 0-30 Hari
  days31to60: number; // 31-60 Hari
  days61to90: number; // 61-90 Hari
  over90: number; // >90 Hari
}

export const ApAgingTab = () => {
  const agingData: ApAgingRow[] = [
    { supplierName: 'PT Meat Prima Indonesia', totalAp: 94350000, current: 94350000, days31to60: 0, days61to90: 0, over90: 0 },
    { supplierName: 'PT Heavy Machinery Supply', totalAp: 180000000, current: 80000000, days31to60: 100000000, days61to90: 0, over90: 0 },
    { supplierName: 'CV Distributor Sembako HQ', totalAp: 28500000, current: 0, days31to60: 18500000, days61to90: 10000000, over90: 0 }
  ];

  const totalCurrent = agingData.reduce((acc, curr) => acc + curr.current, 0);
  const total31to60 = agingData.reduce((acc, curr) => acc + curr.days31to60, 0);
  const total61to90 = agingData.reduce((acc, curr) => acc + curr.days61to90, 0);
  const totalOver90 = agingData.reduce((acc, curr) => acc + curr.over90, 0);

  const columns: ColumnDef<ApAgingRow>[] = [
    { key: 'supplierName', header: 'Nama Pemasok (Vendor/Supplier)', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.supplierName },
    { key: 'current', header: 'Lancar (0-30 Hr)', align: 'right', className: 'font-mono text-emerald-600 dark:text-emerald-400 font-bold', render: (i) => `Rp ${i.current.toLocaleString('id-ID')}` },
    { key: 'days31to60', header: '31-60 Hari', align: 'right', className: 'font-mono text-sky-600 dark:text-sky-400 font-bold', render: (i) => `Rp ${i.days31to60.toLocaleString('id-ID')}` },
    { key: 'days61to90', header: '61-90 Hari', align: 'right', className: 'font-mono text-amber-600 dark:text-amber-400 font-bold', render: (i) => `Rp ${i.days61to90.toLocaleString('id-ID')}` },
    { key: 'over90', header: '>90 Hari (Jatuh Tempo)', align: 'right', className: 'font-mono text-rose-600 dark:text-rose-400 font-bold', render: (i) => `Rp ${i.over90.toLocaleString('id-ID')}` },
    { key: 'totalAp', header: 'Total Utang (Rp)', align: 'right', className: 'font-mono font-extrabold text-slate-900 dark:text-white', render: (i) => `Rp ${i.totalAp.toLocaleString('id-ID')}` }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Lancar (0-30 Hari)</span>
          <p className="font-mono font-bold text-sm text-emerald-600">Rp {totalCurrent.toLocaleString('id-ID')}</p>
        </div>
        <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-2xl">
          <span className="text-[10px] font-bold text-sky-600 uppercase">31-60 Hari</span>
          <p className="font-mono font-bold text-sm text-sky-600">Rp {total31to60.toLocaleString('id-ID')}</p>
        </div>
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
          <span className="text-[10px] font-bold text-amber-600 uppercase">61-90 Hari</span>
          <p className="font-mono font-bold text-sm text-amber-600">Rp {total61to90.toLocaleString('id-ID')}</p>
        </div>
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
          <span className="text-[10px] font-bold text-rose-600 uppercase">&gt;90 Hari (Jatuh Tempo)</span>
          <p className="font-mono font-bold text-sm text-rose-600">Rp {totalOver90.toLocaleString('id-ID')}</p>
        </div>
      </div>

      <DataTable
        headerTitle="Tabel Analisis Umur Utang Dagang (AP Aging Schedule)"
        columns={columns}
        data={agingData}
        keyExtractor={(i) => i.supplierName}
      />
    </div>
  );
};
