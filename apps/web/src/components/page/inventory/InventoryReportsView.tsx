'use client';

import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface InventoryReportItem {
  id: string;
  category: string;
  totalSKU: number;
  totalValuation: string;
  reorderAlerts: number;
}

const MOCK_INVENTORY_REPORTS: InventoryReportItem[] = [
  { id: 'ir-01', category: 'Cold Storage Frozen Food', totalSKU: 45, totalValuation: 'Rp 450.000.000', reorderAlerts: 2 },
  { id: 'ir-02', category: 'Bumbu & Bahan Kering', totalSKU: 120, totalValuation: 'Rp 120.000.000', reorderAlerts: 5 },
  { id: 'ir-03', category: 'Sparepart Heavy Fleet Mining', totalSKU: 310, totalValuation: 'Rp 3.850.000.000', reorderAlerts: 1 }
];

export const InventoryReportsView = () => {
  const columns: ColumnDef<InventoryReportItem>[] = [
    { key: 'category', header: 'Kategori Storage Persediaan', className: 'font-bold text-slate-900 dark:text-white', render: (item) => item.category },
    { key: 'totalSKU', header: 'Jumlah SKU', align: 'center', className: 'font-bold', render: (item) => `${item.totalSKU} Items` },
    { key: 'totalValuation', header: 'Valuasi Persediaan (Rp)', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (item) => item.totalValuation },
    { key: 'reorderAlerts', header: 'Warning Buffer Stock', align: 'center', render: (item) => <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 font-bold font-mono text-[10px] rounded">{item.reorderAlerts} Alert</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan Inventory"
        icon={BarChart3}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Laporan Inventory"
        glossaryItems={[{ term: 'Valuasi Stok', description: 'Total nilai persediaan barang berdasarkan HPP rata-rata.' }]}
        actions={
          <button onClick={() => alert('Export Laporan Inventory')} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Download className="w-4 h-4" />
            <span>Export Laporan</span>
          </button>
        }
      />
      <DataTable headerTitle="Laporan Valuasi & Ringkasan Stok Gudang" columns={columns} data={MOCK_INVENTORY_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
