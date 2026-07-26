'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit3, Clock } from 'lucide-react';
import { VendorCategory } from '@/lib/mock/vendor';

interface Props {
  vendorCategories: VendorCategory[];
  addVendorCategory: (newCat: Omit<VendorCategory, 'id' | 'vendorCount'>) => void;
  updateVendorCategory: (id: string, updatedCat: Partial<VendorCategory>) => void;
  deleteVendorCategory: (id: string) => void;
}

export const VendorCategoriesTab: React.FC<Props> = ({
  vendorCategories,
  addVendorCategory,
  updateVendorCategory,
  deleteVendorCategory
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<VendorCategory | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    defaultTopDays: 30,
    description: ''
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    addVendorCategory(formData);
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    updateVendorCategory(editingCategory.id, formData);
    setEditingCategory(null);
  };

  const openEditModal = (cat: VendorCategory) => {
    setEditingCategory(cat);
    setFormData({
      code: cat.code,
      name: cat.name,
      defaultTopDays: cat.defaultTopDays,
      description: cat.description
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Add Action */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-sky-500" />
            <span>Kategori Vendor</span>
          </h3>
        </div>

        <button
          onClick={() => {
            setFormData({
              code: '',
              name: '',
              defaultTopDays: 30,
              description: ''
            });
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Kategori Vendor Baru</span>
        </button>
      </div>

      {/* Vendor Category Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Daftar Master Kategori Vendor Terdaftar ({vendorCategories.length} Kategori)
          </span>
          <span className="text-[11px] text-slate-400">Strict Classification Table</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Kode Kategori</th>
                <th className="py-3.5 px-4">Nama Kategori Supplier</th>
                <th className="py-3.5 px-4 text-center">Default TOP</th>
                <th className="py-3.5 px-4 text-center">Jumlah Vendor</th>
                <th className="py-3.5 px-4">Deskripsi</th>
                <th className="py-3.5 px-4 text-center">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {vendorCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{cat.code}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{cat.name}</td>
                  <td className="py-3.5 px-4 text-center font-bold font-mono">
                    <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-md">
                      {cat.defaultTopDays} Hari
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold font-mono">{cat.vendorCount} Vendor</td>
                  <td className="py-3.5 px-4 text-slate-500">{cat.description}</td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-lg transition-all"
                        title="Edit Kategori Vendor"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteVendorCategory(cat.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all"
                        title="Hapus Kategori Vendor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Add / Edit Vendor Category */}
      {(isCreateModalOpen || editingCategory) && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <h3 className="text-base font-bold">
              {editingCategory ? 'Edit Master Kategori Vendor' : 'Tambah Master Kategori Vendor Baru'}
            </h3>
            <form onSubmit={editingCategory ? handleEditSubmit : handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Kode Kategori Vendor</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Kategori Supplier</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Default TOP (Hari)</label>
                <input
                  type="number"
                  value={formData.defaultTopDays}
                  onChange={(e) => setFormData({ ...formData, defaultTopDays: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold">
                  {editingCategory ? 'Simpan Perubahan' : 'Simpan Kategori'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
