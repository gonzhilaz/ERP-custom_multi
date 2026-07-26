'use client';

import React, { useState } from 'react';
import { Plus, CheckCircle2, Tag } from 'lucide-react';
import { MenuCategoryItem, PosMenuItem } from '@/lib/mock/pos';

interface Props {
  menuCategories: MenuCategoryItem[];
  addMenuItem: (newItem: Omit<PosMenuItem, 'id'>) => void;
  onSuccess: () => void;
}

export const CreateMenuTab: React.FC<Props> = ({ menuCategories, addMenuItem, onSuccess }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    categoryId: menuCategories[0]?.id || 'mcat-01',
    category: menuCategories[0]?.name || 'Main Course & Signature Dish',
    price: 50000,
    cogsHpp: 18000,
    isAvailable: true
  });

  const handleCategoryChange = (catId: string) => {
    const selected = menuCategories.find((c) => c.id === catId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        categoryId: selected.id,
        category: selected.name
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    addMenuItem(formData);
    alert(`Menu Hidangan F&B [${formData.name}] berhasil terdaftar!`);
    onSuccess();
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-sky-500" />
          <span>Form Registrasi Menu Baru</span>
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-900 dark:text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Kode Menu F&B</label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g. MENU-FNB-099"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-sky-600 dark:text-sky-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Nama Hidangan Menu</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sop Buntut Bakar Madu"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Strict Category Dropdown */}
        <div>
          <label className="block font-semibold mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
              <Tag className="w-3.5 h-3.5" /> Pilih Master Kategori Menu Terdaftar
            </span>
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
          >
            {menuCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div>
            <label className="block font-semibold mb-1">Harga Jual Kasir (Rp)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-500">Estimasi HPP Cost (Rp)</label>
            <input
              type="number"
              value={formData.cogsHpp}
              onChange={(e) => setFormData({ ...formData, cogsHpp: Number(e.target.value) })}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-amber-600"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Daftarkan Menu Baru</span>
          </button>
        </div>
      </form>
    </div>
  );
};
