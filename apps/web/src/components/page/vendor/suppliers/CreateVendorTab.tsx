'use client';

import React, { useState } from 'react';
import { Plus, CheckCircle2, Tag, BookOpen } from 'lucide-react';
import { VendorCategory, VendorItem } from '@/lib/mock/vendor';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { COA_DATA } from '@/lib/mock/finance';

interface Props {
  vendorCategories: VendorCategory[];
  addVendor: (newVendor: Omit<VendorItem, 'id' | 'status' | 'rating'>) => void;
  onSuccess: () => void;
}

export const CreateVendorTab: React.FC<Props> = ({ vendorCategories, addVendor, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    categoryId: vendorCategories[0]?.id || 'vcat-01',
    categoryName: vendorCategories[0]?.name || 'Daging Import & Frozen Food',
    contactPerson: 'Bpk. Hendra Purwanto',
    phone: '+62 812-9900-1122',
    topDays: 30,
    apCoaAccount: '2-10100'
  });

  const handleCategoryChange = (catId: string) => {
    const selected = vendorCategories.find((c) => c.id === catId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        categoryId: selected.id,
        categoryName: selected.name,
        topDays: selected.defaultTopDays
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    addVendor({
      code: `VND-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      categoryId: formData.categoryId,
      category: formData.categoryName,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      payableBalance: 0,
      topDays: formData.topDays,
      apCoaAccount: formData.apCoaAccount
    });
    alert(`Vendor Partner [${formData.name}] berhasil didaftarkan!`);
    onSuccess();
  };

  const categoryOptions = vendorCategories.map((c) => ({
    id: c.id,
    label: c.name,
    subLabel: `${c.code} — TOP: ${c.defaultTopDays} Hari`,
    badge: c.code
  }));

  const coaApOptions = COA_DATA.filter((c) => c.type === 'LIABILITY').map((c) => ({
    id: c.code,
    label: `[ ${c.code} ] ${c.name}`,
    subLabel: c.categoryName,
    badge: c.code
  }));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-4 text-xs">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-sky-500" />
          <span>Form Registrasi Rekanan Vendor / Supplier Baru</span>
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-slate-900 dark:text-white">
        <div>
          <label className="block font-semibold mb-1">Nama Perusahaan Vendor / Supplier</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. PT Meat Prima Importindo"
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
          />
        </div>

        {/* Universal Searchable Category Dropdown */}
        <div>
          <label className="block font-semibold mb-1 flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
            <Tag className="w-3.5 h-3.5" /> Pilih Master Kategori Supplier Terdaftar
          </label>
          <SearchableSelect
            options={categoryOptions}
            value={formData.categoryId}
            onChange={(selectedId) => handleCategoryChange(selectedId)}
            placeholder="Cari atau pilih kategori vendor..."
          />
        </div>

        {/* Universal Searchable COA AP Dropdown */}
        <div>
          <label className="block font-semibold mb-1 flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-3.5 h-3.5" /> Linkage Akun COA Utang AP
          </label>
          <SearchableSelect
            options={coaApOptions}
            value={formData.apCoaAccount}
            onChange={(selectedCode) => setFormData({ ...formData, apCoaAccount: selectedCode })}
            placeholder="Cari akun COA utang AP..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Contact Person (Sales PIC)</label>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">No. Handphone / WhatsApp</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Term of Payment (TOP Hari)</label>
          <input
            type="number"
            value={formData.topDays}
            onChange={(e) => setFormData({ ...formData, topDays: Number(e.target.value) })}
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Daftarkan Vendor Baru</span>
          </button>
        </div>
      </form>
    </div>
  );
};
