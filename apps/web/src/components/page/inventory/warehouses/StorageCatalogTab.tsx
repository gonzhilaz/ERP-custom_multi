'use client';

import React, { useState } from 'react';
import { Search, Filter, MapPin, Trash2, Warehouse } from 'lucide-react';
import { StorageLocation, StorageTypeItem } from '@/lib/mock/inventory';

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

  return (
    <div className="space-y-4">
      {/* Search & Dynamic Type Filter */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kode storage, nama gudang, cabang..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <button
            onClick={() => setSelectedType('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              selectedType === 'ALL'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Semua Tipe Storage
          </button>
          {storageTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedType === t.type
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Storage Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStorages.map((str) => {
          const usedPct = Math.round((str.capacityUsed / str.capacityMax) * 100);
          return (
            <div
              key={str.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-amber-500/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">{str.code}</div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{str.name}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    <span>{str.branchName}</span>
                  </p>
                </div>
                <button
                  onClick={() => deleteStorageLocation(str.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all"
                  title="Hapus Storage"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar Okupansi */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Kapasitas Terisi:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {str.capacityUsed.toLocaleString('id-ID')} / {str.capacityMax.toLocaleString('id-ID')} {str.uom} ({usedPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full transition-all rounded-full ${
                      usedPct > 85 ? 'bg-red-500' : usedPct > 65 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(usedPct, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>Manager: <strong className="text-slate-900 dark:text-white">{str.managerName}</strong></span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md font-mono text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
                  {str.type}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
