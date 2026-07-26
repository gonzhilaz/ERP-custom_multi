'use client';

import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface MiningReportItem {
  id: string;
  shiftDate: string;
  pitZone: string;
  oreTonnase: string;
  strippingRatio: string;
  fuelConsumed: string;
}

const MOCK_MINING_REPORTS: MiningReportItem[] = [
  { id: 'mr-01', shiftDate: '2026-07-24 (Shift Day)', pitZone: 'Pit Alpha North', oreTonnase: '12.450 Ton', strippingRatio: '4.2 : 1 OB', fuelConsumed: '3.850 Liter HSD' },
  { id: 'mr-02', shiftDate: '2026-07-24 (Shift Night)', pitZone: 'Pit Beta South', oreTonnase: '10.800 Ton', strippingRatio: '4.4 : 1 OB', fuelConsumed: '3.420 Liter HSD' }
];

export const MiningReportsView = () => {
  const columns: ColumnDef<MiningReportItem>[] = [
    { key: 'shiftDate', header: 'Tanggal Shift Site', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.shiftDate },
    { key: 'pitZone', header: 'Lokasi Pit Site', render: (i) => i.pitZone },
    { key: 'oreTonnase', header: 'Production Ore (Ton)', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.oreTonnase },
    { key: 'strippingRatio', header: 'Stripping Ratio OB vs Ore', align: 'center', className: 'font-mono font-bold', render: (i) => i.strippingRatio },
    { key: 'fuelConsumed', header: 'Konsumsi Solar HSD', align: 'right', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.fuelConsumed }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan Tambang"
        icon={BarChart3}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Laporan Mining Site"
        glossaryItems={[{ term: 'Production Ore Yield', description: 'Total tonnase batuan bijih emas yang berhasil ditambang.' }]}
        actions={
          <button onClick={() => alert('Export Laporan Mining')} className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Download className="w-4 h-4" />
            <span>Export Laporan</span>
          </button>
        }
      />
      <DataTable headerTitle="Laporan Production Yield Tonnase & Consumsi Solar HSD" columns={columns} data={MOCK_MINING_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
