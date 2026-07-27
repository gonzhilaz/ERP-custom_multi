'use client';

import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { InventoryCategory, InventoryItem } from '@/lib/mock/inventory';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

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
  const columns: ColumnDef<InventoryItem>[] = [
    { key: 'code', header: 'Kode SKU', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.code },
    { key: 'name', header: 'Nama Item Barang', className: 'font-semibold text-slate-900 dark:text-white', render: (i) => i.name },
    { key: 'category', header: 'Kategori Master', className: 'text-slate-500', render: (i) => i.category },
    { key: 'warehouse', header: 'Lokasi Gudang', className: 'text-slate-500', render: (i) => i.warehouse },
    {
      key: 'stockQty',
      header: 'Stok (Min / Max Budget)',
      align: 'center',
      render: (i) => (
        <span className="font-bold font-mono">
          <span className={i.isAlert ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}>
            {i.stockQty}
          </span>
          <span className="text-[10px] text-slate-400"> / ({i.minStockLevel} - {i.maxStockBudget})</span>
        </span>
      )
    },
    { key: 'uom', header: 'Satuan (UOM)', align: 'center', className: 'font-semibold', render: (i) => i.uom },
    { key: 'costPerUnit', header: 'Harga Pokok (HPP)', align: 'right', className: 'font-bold text-slate-900 dark:text-white', render: (i) => `Rp ${i.costPerUnit.toLocaleString('id-ID')}` },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (i) => (
        i.isAlert ? (
          <span className="px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            <span>Low Stock</span>
          </span>
        ) : (
          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold">
            Aman
          </span>
        )
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      sortable: false,
      render: (i) => (
        <button
          onClick={() => deleteInventoryItem(i.id)}
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all cursor-pointer"
          title="Hapus Item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {/* Universal Search & Dynamic Category Filter */}
      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari SKU, nama barang, atau kategori..."
        categoryValue={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryOptions={categories.map((c) => ({ value: c.name, label: c.name }))}
        categoryPlaceholder="Semua Kategori"
      />

      <DataTable
        headerTitle={`Daftar SKU Persediaan (${items.length} Barang Terdaftar)`}
        columns={columns}
        data={items}
        keyExtractor={(i) => i.id}
      />
    </div>
  );
};
