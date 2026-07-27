'use client';

import React, { useState } from 'react';
import { MapPin, Trash2 } from 'lucide-react';
import { StorageLocation, StorageTypeItem } from '@/lib/mock/inventory';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface Props {
  storages: StorageLocation[];
  storageTypes: StorageTypeItem[];
  deleteStorageLocation: (id: string) => void;
}

export const StorageCatalogTab: React.FC<Props> = ({
  storages,
  storageTypes,
  deleteStorageLocation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredStorages = storages.filter((str) => {
    const matchesSearch =
      str.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      str.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      str.branchName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'ALL' || str.type === selectedType || str.typeName.includes(selectedType);
    return matchesSearch && matchesType;
  });

  const columns: ColumnDef<StorageLocation>[] = [
    { key: 'code', header: 'Kode Storage', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => i.code },
    { key: 'name', header: 'Nama Lokasi Gudang', className: 'font-semibold text-slate-900 dark:text-white', render: (i) => i.name },
    { key: 'branchName', header: 'Cabang Operating Unit', className: 'text-slate-500', render: (i) => i.branchName },
    { key: 'type', header: 'Tipe Storage', align: 'center', className: 'font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase', render: (i) => i.type },
    {
      key: 'capacityUsed',
      header: 'Okupansi Kapasitas',
      align: 'center',
      render: (i) => {
        const usedPct = Math.round((i.capacityUsed / i.capacityMax) * 100);
        return (
          <div className="w-36 mx-auto space-y-1 text-center">
            <span className="font-bold text-[10px]">
              {i.capacityUsed.toLocaleString('id-ID')} / {i.capacityMax.toLocaleString('id-ID')} ({usedPct}%)
            </span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${usedPct > 85 ? 'bg-red-500' : usedPct > 65 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min(usedPct, 100)}%` }}
              ></div>
            </div>
          </div>
        );
      }
    },
    { key: 'managerName', header: 'Gudang Manager', className: 'font-semibold text-slate-700 dark:text-slate-300', render: (i) => i.managerName },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      sortable: false,
      render: (i) => (
        <button
          onClick={() => deleteStorageLocation(i.id)}
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all cursor-pointer"
          title="Hapus Storage"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {/* Universal Search & Dynamic Type Filter */}
      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari kode storage, nama gudang, cabang..."
        categoryValue={selectedType}
        onCategoryChange={setSelectedType}
        categoryOptions={storageTypes.map((t) => ({ value: t.type, label: t.name }))}
        categoryPlaceholder="Semua Tipe Storage"
      />

      <DataTable
        headerTitle={`Daftar Gudang & Storage Terdaftar (${filteredStorages.length})`}
        columns={columns}
        data={filteredStorages}
        keyExtractor={(i) => i.id}
      />
    </div>
  );
};
