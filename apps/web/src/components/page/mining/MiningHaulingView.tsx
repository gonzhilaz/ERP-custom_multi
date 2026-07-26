'use client';

import React from 'react';
import { Truck, Plus } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface HaulingRitaseLog {
  id: string;
  ritaseNo: string;
  truckUnitId: string;
  driverName: string;
  pitOrigin: string;
  crusherDestination: string;
  tonnaseWeight: string;
  timestamp: string;
}

const MOCK_HAULING: HaulingRitaseLog[] = [
  { id: 'rit-01', ritaseNo: 'RIT-2026-0991', truckUnitId: 'DT-CAT-777-04', driverName: 'Suryanto', pitOrigin: 'Pit Alpha North', crusherDestination: 'Crusher Plant 02', tonnaseWeight: '85.40 Ton', timestamp: '2026-07-25 14:15' }
];

export const MiningHaulingView = () => {
  const columns: ColumnDef<HaulingRitaseLog>[] = [
    { key: 'ritaseNo', header: 'No. Slip Ritase', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => i.ritaseNo },
    { key: 'truckUnitId', header: 'Unit Dump Truck', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.truckUnitId },
    { key: 'driverName', header: 'Operator Driver', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.driverName },
    { key: 'pitOrigin', header: 'Asal Pit Site', render: (i) => i.pitOrigin },
    { key: 'crusherDestination', header: 'Tujuan Crusher', render: (i) => i.crusherDestination },
    { key: 'tonnaseWeight', header: 'Tonnase Muatan Ore', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.tonnaseWeight },
    { key: 'timestamp', header: 'Waktu Timbang', className: 'font-mono text-slate-500', render: (i) => i.timestamp }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Hauling & Ritase Dump Truck"
        icon={Truck}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Hauling & Ritase Dump Truck"
        glossaryItems={[{ term: 'Ritase Dump Truck', description: 'Catatan timbang tonnase angkutan ore dari pit ke crusher plant.' }]}
        actions={
          <button onClick={() => alert('Input Slip Ritase Baru')} className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Slip Ritase Baru</span>
          </button>
        }
      />
      <DataTable headerTitle="Log Ritase Angkutan Ore & Tonnase Dump Truck Heavy Fleet" columns={columns} data={MOCK_HAULING} keyExtractor={(i) => i.id} />
    </div>
  );
};
