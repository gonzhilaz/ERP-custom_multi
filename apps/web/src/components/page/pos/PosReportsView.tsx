'use client';

import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface PosReportItem {
  id: string;
  shiftDate: string;
  cashierName: string;
  totalOrders: number;
  totalSales: string;
  cashVariance: string;
}

const MOCK_POS_REPORTS: PosReportItem[] = [
  { id: 'pr-01', shiftDate: '2026-07-24 (Shift Pagi)', cashierName: 'Siti Rahma', totalOrders: 142, totalSales: 'Rp 12.850.000', cashVariance: 'Rp 0 (Balanced)' },
  { id: 'pr-02', shiftDate: '2026-07-24 (Shift Malam)', cashierName: 'Budi Santoso', totalOrders: 189, totalSales: 'Rp 18.400.000', cashVariance: '- Rp 15.000 (Selisih)' }
];

export const PosReportsView = () => {
  const columns: ColumnDef<PosReportItem>[] = [
    { key: 'shiftDate', header: 'Tanggal & Shift Kasir', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.shiftDate },
    { key: 'cashierName', header: 'Nama Kasir Bertugas', render: (i) => i.cashierName },
    { key: 'totalOrders', header: 'Jumlah Transaksi', align: 'center', className: 'font-bold', render: (i) => `${i.totalOrders} Struk` },
    { key: 'totalSales', header: 'Total Penjualan Shift', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.totalSales },
    { key: 'cashVariance', header: 'Selisih Kas Audit', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 font-mono text-[10px] font-bold">{i.cashVariance}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan Kasir & POS"
        icon={BarChart3}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Laporan Kasir POS"
        glossaryItems={[{ term: 'Selisih Kas Audit', description: 'Perbandingan uang kas fisik di laci kasir vs rekap penjualan sistem.' }]}
        actions={
          <button onClick={() => alert('Export Laporan POS')} className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Download className="w-4 h-4" />
            <span>Export Laporan</span>
          </button>
        }
      />
      <DataTable headerTitle="Laporan Penjualan Kasir & Audit Cash Variance Shift" columns={columns} data={MOCK_POS_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
