'use client';

import React, { useState } from 'react';
import { Plus, CheckCircle2, Tag } from 'lucide-react';
import { InventoryCategory, InventoryItem } from '@/lib/mock/inventory';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

interface Props {
  categories: InventoryCategory[];
  addInventoryItem: (newItem: Omit<InventoryItem, 'id'>) => void;
  onSuccess: () => void;
}

export const CreateItemTab: React.FC<Props> = ({ categories, addInventoryItem, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    categoryId: categories[0]?.id || 'cat-01',
    categoryName: categories[0]?.name || 'Sembako & Bahan Olahan',
    warehouse: 'Gudang Utama HO Jakarta',
    uom: 'Kartun (Carton)',
    minStock: 20,
    currentStock: 100,
    unitPrice: 150000
  });

  const handleCategoryChange = (catId: string) => {
    const selected = categories.find((c) => c.id === catId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        categoryId: selected.id,
        categoryName: selected.name
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    addInventoryItem({
      code: `SKU-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      categoryId: formData.categoryId,
      category: formData.categoryName,
      warehouse: formData.warehouse,
      stockQty: formData.currentStock,
      minStockLevel: formData.minStock,
      maxStockBudget: formData.minStock * 5,
      uom: formData.uom,
      costPerUnit: formData.unitPrice,
      valuationMethod: 'FIFO',
      isAlert: formData.currentStock <= formData.minStock
    });
    alert(`Barang Persediaan [${formData.name}] berhasil didaftarkan!`);
    onSuccess();
  };

  const categoryOptions = categories.map((c) => ({
    id: c.id,
    label: c.name,
    subLabel: `${c.code} — COA: ${c.coaAccountCode}`,
    badge: c.code
  }));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-4 text-xs">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-sky-500" />
          <span>Form Registrasi Barang Persediaan Baru</span>
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-slate-900 dark:text-white">
        <div>
          <label className="block font-semibold mb-1">Nama Barang / SKU Produk</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Gula Pasir Industri Premium 50kg"
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
          />
        </div>

        {/* Universal Searchable Category Dropdown */}
        <div>
          <label className="block font-semibold mb-1 flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
            <Tag className="w-3.5 h-3.5" /> Pilih Master Kategori Terdaftar
          </label>
          <SearchableSelect
            options={categoryOptions}
            value={formData.categoryId}
            onChange={(selectedId) => handleCategoryChange(selectedId)}
            placeholder="Cari atau pilih kategori barang..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Lokasi Gudang Penyimpanan</label>
            <input
              type="text"
              value={formData.warehouse}
              onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Satuan UOM Base</label>
            <input
              type="text"
              value={formData.uom}
              onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
              placeholder="e.g. Karung, Box, Kg, Pcs"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold mb-1">Stok Awal</label>
            <input
              type="number"
              value={formData.currentStock}
              onChange={(e) => setFormData({ ...formData, currentStock: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Ambang Stok Minimum</label>
            <input
              type="number"
              value={formData.minStock}
              onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-amber-600"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Harga Perolehan (Rp)</label>
            <input
              type="number"
              value={formData.unitPrice}
              onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Daftarkan Barang Baru</span>
          </button>
        </div>
      </form>
    </div>
  );
};
