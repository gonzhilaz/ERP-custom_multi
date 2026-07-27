'use client';

import React from 'react';
import { Trash2, CheckCircle2, Wrench } from 'lucide-react';
import { AssetCategory, AssetItem } from '@/lib/mock/inventory';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';

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

  return (
    <div className="space-y-4">
      {/* Universal Search & Dynamic Category Filter */}
      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari kode asset, nama asset, cabang..."
        categoryValue={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryOptions={[
          { value: 'ALL', label: 'Semua Kategori Asset' },
          ...assetCategories.map((c) => ({ value: c.name, label: c.name }))
        ]}
        categoryPlaceholder="Semua Kategori Asset"
      />

      {/* Asset Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Daftar Aktiva Tetap Perusahaan ({filteredAssets.length} Assets Terdaftar)
          </span>
          <span className="text-[11px] text-slate-400">Depresiasi Garis Lurus Auto-Calculated</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Kode Asset</th>
                <th className="py-3.5 px-4">Nama Asset Aktiva</th>
                <th className="py-3.5 px-4">Kategori Master</th>
                <th className="py-3.5 px-4">Lokasi Cabang</th>
                <th className="py-3.5 px-4 text-right">Harga Perolehan</th>
                <th className="py-3.5 px-4 text-right">Depresiasi /Bln</th>
                <th className="py-3.5 px-4 text-right">Nilai Buku Net</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredAssets.map((ast) => (
                <tr key={ast.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{ast.code}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">{ast.name}</td>
                  <td className="py-3.5 px-4 text-slate-500">{ast.category}</td>
                  <td className="py-3.5 px-4 text-slate-500">{ast.branchLocation}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white">
                    Rp {ast.purchaseCost.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-amber-600 dark:text-amber-400 font-bold">
                    Rp {ast.monthlyDepreciation.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                    Rp {ast.bookValue.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {ast.status === 'OPERATIONAL' ? (
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Operasional</span>
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <Wrench className="w-3 h-3" />
                        <span>Maintenance</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => deleteAssetItem(ast.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all"
                      title="Hapus Asset"
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
