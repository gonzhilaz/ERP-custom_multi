'use client';

import React, { useState } from 'react';
import { Pickaxe, Plus } from 'lucide-react';
import { useSpecializedIndustries } from '@/hooks/useSpecializedIndustries';
import { DynamicSearchFilter, FilterOption } from '@/components/ui/forms/DynamicSearchFilter';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface HaulingRow {
  id: string;
  haulingCode: string;
  truckNumber: string;
  driverName: string;
  pitLocation: string;
  tonnageTons: number;
  fuelConsumedLiters: number;
  shift: string;
}

export const MiningView = () => {
  const { haulings, addHaulingLog } = useSpecializedIndustries();
  const [searchQuery, setSearchQuery] = useState('');
  const [shiftFilter, setShiftFilter] = useState('ALL');

  const filteredHaulings = haulings.filter((h) => {
    const matchesSearch =
      h.truckNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.pitLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesShift = shiftFilter === 'ALL' || h.shift.toUpperCase() === shiftFilter;
    return matchesSearch && matchesShift;
  });

  const columns: ColumnDef<HaulingRow>[] = [
    { key: 'haulingCode', header: 'Kode Hauling', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (h) => h.haulingCode },
    { key: 'truckNumber', header: 'Unit Dump Truck & Driver', render: (h) => <div><div className="font-bold text-slate-900 dark:text-white">{h.truckNumber}</div><div className="text-[10px] text-slate-400">Driver: {h.driverName}</div></div> },
    { key: 'pitLocation', header: 'Lokasi Pit Tambang', className: 'font-bold text-slate-700 dark:text-slate-300', render: (h) => h.pitLocation },
    { key: 'tonnageTons', header: 'Tonnase Hauling', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (h) => `${h.tonnageTons} Ton` },
    { key: 'fuelConsumedLiters', header: 'Konsumsi Solar BBM', align: 'right', className: 'font-mono font-bold text-amber-600', render: (h) => `${h.fuelConsumedLiters} Liter` },
    { key: 'shift', header: 'Shift Kerja', align: 'center', render: (h) => <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-amber-500/10 text-amber-600 border border-amber-500/20">{h.shift} SHIFT</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Operasional Hauling Mining"
        icon={Pickaxe}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Operasional Tambang & Ritase"
        glossaryItems={[
          { term: 'Log Hauling Dump Truck', description: 'Pelacakan ritase tonnase batu bara/biji besi & konsumsi BBM solar alat berat tambang.' }
        ]}
        actions={
          <button onClick={() => addHaulingLog('DT-MINE-12 (Scania P410)', 'Ahmad Rizky', 45.0)} className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Catat Ritase Hauling</span>
          </button>
        }
      />

      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari nomor unit dump truck, driver, atau pit location..."
        categoryValue={shiftFilter}
        onCategoryChange={setShiftFilter}
        categoryOptions={[
          { label: 'Shift Siang (Day)', value: 'SIANG' },
          { label: 'Shift Malam (Night)', value: 'MALAM' }
        ]}
        categoryPlaceholder="Semua Shift Kerja"
        colorScheme="amber"
      />

      <DataTable
        headerTitle={`Log Hauling & Ritase Tonnase Tambang (${filteredHaulings.length})`}
        columns={columns}
        data={filteredHaulings as any}
        keyExtractor={(h) => h.id}
      />
    </div>
  );
};
