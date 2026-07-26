'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface ManufacturingReportItem {
  id: string;
  workOrderNo: string;
  productName: string;
  plannedQty: number;
  actualQty: number;
  scrapQty: number;
  completionDate: string;
}

const MOCK_MFG_REPORTS: ManufacturingReportItem[] = [
  { id: 'mr-01', workOrderNo: 'WO-2026-0991', productName: 'Roti Tawar Gandum Premium', plannedQty: 1000, actualQty: 995, scrapQty: 5, completionDate: '2026-07-25' }
];

export const ManufacturingReportsView = () => {
  const columns: ColumnDef<ManufacturingReportItem>[] = [
    { key: 'workOrderNo', header: 'No. Work Order', className: 'font-mono font-bold text-indigo-600 dark:text-indigo-400', render: (i) => i.workOrderNo },
    { key: 'productName', header: 'Nama Produk Hasil', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.productName },
    { key: 'plannedQty', header: 'Target Plan', align: 'center', className: 'font-mono', render: (i) => `${i.plannedQty} Pcs` },
    { key: 'actualQty', header: 'Hasil Actual', align: 'center', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => `${i.actualQty} Pcs` },
    { key: 'scrapQty', header: 'Scrap / Reject', align: 'center', className: 'font-mono font-bold text-red-600 dark:text-red-400', render: (i) => `${i.scrapQty} Pcs` },
    { key: 'completionDate', header: 'Waktu Selesai', className: 'font-mono text-slate-500', render: (i) => i.completionDate }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan Produksi"
        icon={BarChart3}
        iconBgColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        glossaryTitle="Glossary Laporan Manufaktur & Variance"
        glossaryItems={[{ term: 'Scrap Variance', description: 'Pelaporan sisa bahan baku terbuang dan deviasi biaya HPP standar produksi.' }]}
      />
      <DataTable headerTitle="Laporan Efisiensi Produksi & Rekapitulasi Work Order Selesai" columns={columns} data={MOCK_MFG_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
