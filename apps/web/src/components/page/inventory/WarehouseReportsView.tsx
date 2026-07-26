'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface WarehouseReportItem {
  id: string;
  warehouseName: string;
  locationCity: string;
  capacityMax: number;
  capacityUsed: number;
  utilizationPct: string;
  coldStorageTemp: string;
}

const MOCK_WAREHOUSE_REPORTS: WarehouseReportItem[] = [
  { id: 'wr-01', warehouseName: 'Central Cold Storage HO', locationCity: 'Jakarta Barat', capacityMax: 500, capacityUsed: 380, utilizationPct: '76.0%', coldStorageTemp: '-20°C (Normal)' }
];

export const WarehouseReportsView = () => {
  const columns: ColumnDef<WarehouseReportItem>[] = [
    { key: 'warehouseName', header: 'Nama Gudang / Site', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.warehouseName },
    { key: 'locationCity', header: 'Kota Lokasi', render: (i) => i.locationCity },
    { key: 'capacityMax', header: 'Kapasitas Max (M3)', align: 'center', className: 'font-mono', render: (i) => `${i.capacityMax} M3` },
    { key: 'capacityUsed', header: 'Terpakai (M3)', align: 'center', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => `${i.capacityUsed} M3` },
    { key: 'utilizationPct', header: 'Utilisasi (%)', align: 'center', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => i.utilizationPct },
    { key: 'coldStorageTemp', header: 'Status Suhu Cold Room', align: 'center', render: (i) => <span className="px-2.5 py-1 bg-sky-500/10 text-sky-600 font-bold text-[10px] rounded-full">{i.coldStorageTemp}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan Gudang"
        icon={BarChart3}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Laporan Utilisasi Gudang"
        glossaryItems={[{ term: 'Occupancy Rate', description: 'Persentase tingkat keterisian kubikasi gudang dibanding kapasitas maksimum.' }]}
      />
      <DataTable headerTitle="Laporan Utilisasi Kapasitas Gudang & Monitor Suhu Cold Storage" columns={columns} data={MOCK_WAREHOUSE_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
