'use client';

import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { InventoryCategory, InventoryItem } from '@/lib/mock/inventory';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';

interface Props {
  items: InventoryItem[];
  categories: InventoryCategory[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  deleteInventoryItem: (id: string) => void;
}

export const ItemCatalogTab: React.FC<Props> = ({
  items,
  categories,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  deleteInventoryItem
}) => {
  return (
    <div className="space-y-4">
      {/* Universal Search & Dynamic Category Filter */}
      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari SKU, nama barang, atau kategori..."
        categoryValue={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryOptions={[
          { value: 'ALL', label: 'Semua Kategori' },
          ...categories.map((c) => ({ value: c.name, label: c.name }))
        ]}
        categoryPlaceholder="Semua Kategori"
      />

      {/* Inventory Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Daftar SKU Persediaan ({items.length} Barang Terdaftar)
          </span>
          <span className="text-[11px] text-slate-400">Valuasi HPP Auto FIFO / Average</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Kode SKU</th>
                <th className="py-3.5 px-4">Nama Item Barang</th>
                <th className="py-3.5 px-4">Kategori Master</th>
                <th className="py-3.5 px-4">Lokasi Gudang</th>
                <th className="py-3.5 px-4 text-center">Stok (Min / Max Budget)</th>
                <th className="py-3.5 px-4 text-center">Satuan (UOM)</th>
                <th className="py-3.5 px-4 text-right">Harga Pokok (HPP)</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{item.code}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">{item.name}</td>
                  <td className="py-3.5 px-4 text-slate-500">{item.category}</td>
                  <td className="py-3.5 px-4 text-slate-500">{item.warehouse}</td>
                  <td className="py-3.5 px-4 text-center font-bold font-mono">
                    <span className={item.isAlert ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}>
                      {item.stockQty}
                    </span>
                    <span className="text-[10px] text-slate-400"> / ({item.minStockLevel} - {item.maxStockBudget})</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold">{item.uom}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white">
                    Rp {item.costPerUnit.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {item.isAlert ? (
                      <span className="px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Low Stock</span>
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold">
                        Aman
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => deleteInventoryItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all"
                      title="Hapus Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
