'use client';

import React, { useState } from 'react';
import { Plus, CheckCircle2, Tag } from 'lucide-react';
import { CoaCategory, CoaItem } from '@/lib/mock/finance';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

interface Props {
  coaCategories: CoaCategory[];
  addCoaItem: (newItem: Omit<CoaItem, 'id'>) => void;
  onSuccess: () => void;
}

export const CreateCoaTab: React.FC<Props> = ({ coaCategories, addCoaItem, onSuccess }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    categoryId: coaCategories[0]?.id || 'coa-cat-01',
    categoryName: coaCategories[0]?.name || 'Aset Lancar & Kas Bank',
    type: coaCategories[0]?.type || 'ASSET',
    balance: 0,
    currency: 'IDR' as 'IDR' | 'USD'
  });

  const handleCategoryChange = (catId: string) => {
    const selected = coaCategories.find((c) => c.id === catId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        categoryId: selected.id,
        categoryName: selected.name,
        type: selected.type
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    addCoaItem(formData);
    alert(`Akun COA Buku Besar [${formData.code} - ${formData.name}] berhasil terdaftar!`);
    onSuccess();
  };

  const categoryOptions = coaCategories.map((c) => ({
    id: c.id,
    label: c.name,
    subLabel: `${c.code} — Tipe: ${c.type}`,
    badge: c.type
  }));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-emerald-500" />
          <span>Form Registrasi Akun COA Baru</span>
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-900 dark:text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Kode Nomor Akun COA</label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g. 100-02-005"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600 dark:text-emerald-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Nama Akun Buku Besar (GL)</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Kas Kecil Operasional Resto"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Universal Searchable Category Dropdown */}
        <div>
          <label className="block font-semibold mb-1 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <Tag className="w-3.5 h-3.5" /> Pilih Master Kelompok Akun Terdaftar
          </label>
          <SearchableSelect
            options={categoryOptions}
            value={formData.categoryId}
            onChange={(selectedId) => handleCategoryChange(selectedId)}
            placeholder="Cari atau pilih kelompok akun COA..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div>
            <label className="block font-semibold mb-1">Saldo Awal Akun (Balance)</label>
            <input
              type="number"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Mata Uang (Currency)</label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value as any })}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
            >
              <option value="IDR">IDR (Rupiah Indonesia)</option>
              <option value="USD">USD (US Dollar)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Daftarkan Akun COA Baru</span>
          </button>
        </div>
      </form>
    </div>
  );
};
