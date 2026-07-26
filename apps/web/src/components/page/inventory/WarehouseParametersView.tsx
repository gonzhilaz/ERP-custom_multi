'use client';

import React from 'react';
import { Sliders, Plus } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface StorageTypeParam {
  id: string;
  typeCode: string;
  typeName: string;
  temperatureTarget: string;
  fefoRequired: string;
  maxCapacityVolume: string;
}

const MOCK_STORAGE_PARAMS: StorageTypeParam[] = [
  { id: 'stp-01', typeCode: 'STP-COLD-20', typeName: 'Cold Storage Deep Freeze (-20°C)', temperatureTarget: '-20°C s/d -25°C', fefoRequired: 'WAJIB_FEFO_STRICT', maxCapacityVolume: '500 M3' },
  { id: 'stp-02', typeCode: 'STP-DRY-RACK', typeName: 'Dry Warehouse Multi-Tier Pallet', temperatureTarget: 'Suhu Ruangan (25°C)', fefoRequired: 'FIFO_STANDARD', maxCapacityVolume: '2.500 M3' }
];

export const WarehouseParametersView = () => {
  const columns: ColumnDef<StorageTypeParam>[] = [
    { key: 'typeCode', header: 'Kode Tipe Storage', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => i.typeCode },
    { key: 'typeName', header: 'Nama Tipe Gudang / Vault', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.typeName },
    { key: 'temperatureTarget', header: 'Target Suhu (°C)', align: 'center', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.temperatureTarget },
    { key: 'fefoRequired', header: 'Standar Rotasi Barang', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 font-bold font-mono text-[10px] rounded">{i.fefoRequired}</span> },
    { key: 'maxCapacityVolume', header: 'Kapasitas Volume Max', align: 'right', className: 'font-mono font-bold', render: (i) => i.maxCapacityVolume }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Aturan Gudang"
        icon={Sliders}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Aturan Storage Gudang & Cold FEFO"
        glossaryItems={[{ term: 'Rotasi FEFO', description: 'Aturan First-Expired, First-Out wajib untuk gudang berpendingin Cold Storage.' }]}
        actions={
          <button onClick={() => alert('Tambah Tipe Gudang Baru')} className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Tipe Gudang Baru</span>
          </button>
        }
      />
      <DataTable headerTitle="Master Parameter Tipe Gudang, Standar Suhu, & Aturan FEFO Rotasi" columns={columns} data={MOCK_STORAGE_PARAMS} keyExtractor={(i) => i.id} />
    </div>
  );
};
