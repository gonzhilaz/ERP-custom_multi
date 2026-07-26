'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface AssetReportItem {
  id: string;
  assetTag: string;
  assetName: string;
  acquisitionCost: string;
  accumulatedDepreciation: string;
  bookValueRemaining: string;
}

const MOCK_ASSET_REPORTS: AssetReportItem[] = [
  { id: 'ar-01', assetTag: 'AST-HO-001', assetName: 'Toyota HiAce Premio Executive Shuttle', acquisitionCost: 'Rp 650.000.000', accumulatedDepreciation: 'Rp 81.250.000', bookValueRemaining: 'Rp 568.750.000' }
];

export const AssetReportsView = () => {
  const columns: ColumnDef<AssetReportItem>[] = [
    { key: 'assetTag', header: 'Nomor Barcode Tag Aset', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.assetTag },
    { key: 'assetName', header: 'Nama Unit Aset Tetap', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.assetName },
    { key: 'acquisitionCost', header: 'Harga Perolehan', align: 'right', className: 'font-mono font-bold', render: (i) => i.acquisitionCost },
    { key: 'accumulatedDepreciation', header: 'Akumulasi Penyusutan', align: 'right', className: 'font-mono text-amber-600 dark:text-amber-400', render: (i) => i.accumulatedDepreciation },
    { key: 'bookValueRemaining', header: 'Nilai Buku Bersih (NBV)', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.bookValueRemaining }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan Aset"
        icon={BarChart3}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Laporan Nilai Buku Aset"
        glossaryItems={[{ term: 'Net Book Value (NBV)', description: 'Nilai sisa buku bersih aset setelah dikurangi akumulasi penyusutan bulanan.' }]}
      />
      <DataTable headerTitle="Kertas Kerja Fiskal & Laporan Nilai Buku Bersih Aset Tetap" columns={columns} data={MOCK_ASSET_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
