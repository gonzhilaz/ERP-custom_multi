'use client';

import React, { useState } from 'react';
import { Plus, CheckCircle2, Tag } from 'lucide-react';
import { AssetCategory, AssetItem } from '@/lib/mock/inventory';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

interface Props {
  assetCategories: AssetCategory[];
  addAssetItem: (newAsset: Omit<AssetItem, 'id' | 'accumulatedDepreciation' | 'bookValue' | 'monthlyDepreciation'>) => void;
  onSuccess: () => void;
}

export const CreateAssetTab: React.FC<Props> = ({ assetCategories, addAssetItem, onSuccess }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    categoryId: assetCategories[0]?.id || 'ast-cat-03',
    category: assetCategories[0]?.name || 'Mesin Industri & Peralatan Dapur',
    branchLocation: 'Cabang Utama Sudirman',
    purchaseDate: new Date().toISOString().split('T')[0],
    purchaseCost: 50000000,
    salvageValue: 5000000,
    usefulLifeYears: assetCategories[0]?.usefulLifeYearsDefault || 5,
    status: 'OPERATIONAL' as 'OPERATIONAL' | 'MAINTENANCE' | 'UNDER_REPAIR'
  });

  const handleCategoryChange = (catId: string) => {
    const selected = assetCategories.find((c) => c.id === catId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        categoryId: selected.id,
        category: selected.name,
        usefulLifeYears: selected.usefulLifeYearsDefault
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    addAssetItem(formData);
    alert(`Asset Aktiva [${formData.name}] berhasil terdaftar!`);
    onSuccess();
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-indigo-500" />
          <span>Form Registrasi Asset Baru</span>
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-900 dark:text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Kode Asset</label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g. AST-OVEN-002"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-indigo-600 dark:text-indigo-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Nama Asset Aktiva Detail</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Mesin Mixer Roti Industri 50kg"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Strict Asset Category Dropdown */}
        <div>
          <label className="block font-semibold mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
              <Tag className="w-3.5 h-3.5" /> Pilih Master Kategori Asset Terdaftar
            </span>
          </label>
          <SearchableSelect
            options={assetCategories.map((c) => ({
              id: c.id,
              label: `${c.name} (${c.code} — COA Asset: ${c.assetCoaCode})`
            }))}
            value={formData.categoryId}
            onChange={(val) => handleCategoryChange(val)}
            placeholder="Pilih Master Kategori Asset..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Lokasi Cabang Asset</label>
            <input
              type="text"
              value={formData.branchLocation}
              onChange={(e) => setFormData({ ...formData, branchLocation: e.target.value })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Tanggal Perolehan (Purchase Date)</label>
            <input
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div>
            <label className="block font-semibold mb-1">Harga Perolehan</label>
            <input
              type="number"
              value={formData.purchaseCost}
              onChange={(e) => setFormData({ ...formData, purchaseCost: Number(e.target.value) })}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-500">Nilai Sisa (Salvage)</label>
            <input
              type="number"
              value={formData.salvageValue}
              onChange={(e) => setFormData({ ...formData, salvageValue: Number(e.target.value) })}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-indigo-600 dark:text-indigo-400">Masa Manfaat (Thn)</label>
            <input
              type="number"
              value={formData.usefulLifeYears}
              onChange={(e) => setFormData({ ...formData, usefulLifeYears: Number(e.target.value) })}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-indigo-600"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Daftarkan Asset Baru</span>
          </button>
        </div>
      </form>
    </div>
  );
};
