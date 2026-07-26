'use client';

import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface VendorReportItem {
  id: string;
  vendorName: string;
  totalPO: number;
  totalPurchasingValue: string;
  scoreCard: string;
}

const MOCK_VENDOR_REPORTS: VendorReportItem[] = [
  { id: 'vr-01', vendorName: 'PT Traktor Nusantara', totalPO: 8, totalPurchasingValue: 'Rp 2.450.000.000', scoreCard: '95 / 100 (A)' },
  { id: 'vr-02', vendorName: 'CV Daging Import Utama', totalPO: 24, totalPurchasingValue: 'Rp 680.000.000', scoreCard: '88 / 100 (B+)' }
];

export const VendorReportsView = () => {
  const columns: ColumnDef<VendorReportItem>[] = [
    { key: 'vendorName', header: 'Nama Vendor Rekanan', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.vendorName },
    { key: 'totalPO', header: 'Jumlah PO Terbit', align: 'center', className: 'font-bold', render: (i) => `${i.totalPO} Transaksi` },
    { key: 'totalPurchasingValue', header: 'Total Nilai Purchasing', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.totalPurchasingValue },
    { key: 'scoreCard', header: 'Performance Score', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.scoreCard}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan Procurement"
        icon={BarChart3}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Laporan Procurement"
        glossaryItems={[{ term: 'Performance Score', description: 'Evaluasi keandalan pengiriman & ketepatan kuantitas supplier.' }]}
        actions={
          <button onClick={() => alert('Export Laporan Procurement')} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Download className="w-4 h-4" />
            <span>Export Laporan</span>
          </button>
        }
      />
      <DataTable headerTitle="Laporan Rekapitulasi Pembelian & Scorecard Supplier" columns={columns} data={MOCK_VENDOR_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
