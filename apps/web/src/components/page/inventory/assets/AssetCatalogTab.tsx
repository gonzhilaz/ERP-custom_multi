'use client';

import React from 'react';
import { Trash2, CheckCircle2, Wrench } from 'lucide-react';
import { AssetCategory, AssetItem } from '@/lib/mock/inventory';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface Props {
  assets: AssetItem[];
  assetCategories: AssetCategory[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  deleteAssetItem: (id: string) => void;
}

export const AssetCatalogTab: React.FC<Props> = ({
  assets,
  assetCategories,
  searchQuery,
  setSearchQuery,
  deleteAssetItem
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState('ALL');

  const filteredAssets = assets.filter((ast) => {
    const matchesSearch =
      ast.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ast.branchLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || ast.category.includes(selectedCategory);
    return matchesSearch && matchesCat;
  });

  const columns: ColumnDef<AssetItem>[] = [
    { key: 'code', header: 'Kode Asset', className: 'font-mono font-bold text-indigo-600 dark:text-indigo-400', render: (i) => i.code },
    { key: 'name', header: 'Nama Asset Aktiva', className: 'font-semibold text-slate-900 dark:text-white', render: (i) => i.name },
    { key: 'category', header: 'Kategori Master', className: 'text-slate-500', render: (i) => i.category },
    { key: 'branchLocation', header: 'Lokasi Cabang', className: 'text-slate-500', render: (i) => i.branchLocation },
    { key: 'purchaseCost', header: 'Harga Perolehan', align: 'right', className: 'font-bold text-slate-900 dark:text-white', render: (i) => `Rp ${i.purchaseCost.toLocaleString('id-ID')}` },
    { key: 'monthlyDepreciation', header: 'Depresiasi /Bln', align: 'right', className: 'font-mono text-amber-600 dark:text-amber-400 font-bold', render: (i) => `Rp ${i.monthlyDepreciation.toLocaleString('id-ID')}` },
    { key: 'bookValue', header: 'Nilai Buku Net', align: 'right', className: 'font-bold text-emerald-600 dark:text-emerald-400', render: (i) => `Rp ${i.bookValue.toLocaleString('id-ID')}` },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (i) => (
        i.status === 'OPERATIONAL' ? (
          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Operasional</span>
          </span>
        ) : (
          <span className="px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
            <Wrench className="w-3 h-3" />
            <span>Maintenance</span>
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
          onClick={() => deleteAssetItem(i.id)}
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all cursor-pointer"
          title="Hapus Asset"
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
        searchPlaceholder="Cari kode asset, nama asset, cabang..."
        categoryValue={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryOptions={assetCategories.map((c) => ({ value: c.name, label: c.name }))}
        categoryPlaceholder="Semua Kategori Asset"
      />

      <DataTable
        headerTitle={`Daftar Aktiva Tetap Perusahaan (${filteredAssets.length} Assets Terdaftar)`}
        columns={columns}
        data={filteredAssets}
        keyExtractor={(i) => i.id}
      />
    </div>
  );
};
