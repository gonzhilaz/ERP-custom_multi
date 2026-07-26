'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Edit, Trash2 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface InventoryParameterItem {
  id: string;
  category: string;
  paramKey: string;
  paramValue: string;
  description: string;
  unitUsaha: string;
}

const MOCK_INVENTORY_PARAMS: InventoryParameterItem[] = [
  {
    id: 'ip-01',
    category: 'Buffer Threshold',
    paramKey: 'SKU_MINIMUM_SAFETY_STOCK',
    paramValue: '25 Unit',
    description: 'Batas minimum persediaan stok sebelum peringatan reorder otomatis terbit',
    unitUsaha: 'All Holding Units'
  },
  {
    id: 'ip-02',
    category: 'Cold Storage FEFO',
    paramKey: 'COLD_STORAGE_MAX_TEMP_CELSIUS',
    paramValue: '-18°C',
    description: 'Suhu maksimal cold storage bahan makanan basah daging & sayur',
    unitUsaha: 'Nusantara Culinary & Catering'
  },
  {
    id: 'ip-03',
    category: 'UOM Satuan',
    paramKey: 'DEFAULT_UOM_MASTER',
    paramValue: 'KG, LITER, PCS, BOX, DUS, TON',
    description: 'Daftar pilihan satuan baku pengisian katalog barang inventory',
    unitUsaha: 'All Holding Units'
  }
];

export const InventoryParametersView = () => {
  const [params, setParams] = useState<InventoryParameterItem[]>(MOCK_INVENTORY_PARAMS);

  const columns: ColumnDef<InventoryParameterItem>[] = [
    {
      key: 'category',
      header: 'Kategori Parameter',
      className: 'font-bold text-slate-900 dark:text-white',
      render: (item) => item.category
    },
    {
      key: 'paramKey',
      header: 'Kode Parameter System',
      className: 'font-mono text-sky-600 dark:text-sky-400 font-semibold',
      render: (item) => item.paramKey
    },
    {
      key: 'paramValue',
      header: 'Nilai Acuan',
      className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400',
      render: (item) => item.paramValue
    },
    {
      key: 'description',
      header: 'Keterangan Operasional',
      className: 'text-slate-600 dark:text-slate-300',
      render: (item) => item.description
    },
    {
      key: 'unitUsaha',
      header: 'Cakupan Unit Usaha',
      render: (item) => (
        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-semibold">
          {item.unitUsaha}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      render: (item) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => alert(`Edit Parameter ${item.paramKey}`)}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-sky-500 cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setParams((prev) => prev.filter((p) => p.id !== item.id))}
            className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Parameter Inventory"
        icon={Sliders}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Parameter Inventory & Storage"
        glossaryItems={[
          { term: 'Buffer Threshold', description: 'Batas minimum persediaan stok sebelum peringatan reorder.' },
          { term: 'Cold Storage FEFO', description: 'Pengaturan batas suhu cold storage persediaan basah.' }
        ]}
        actions={
          <button
            onClick={() => alert('Tambah Parameter Inventory Baru')}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Parameter</span>
          </button>
        }
      />

      {/* Universal DataTable */}
      <DataTable
        headerTitle="Aturan & Parameter Dinamis Inventory"
        columns={columns}
        data={params}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
};
