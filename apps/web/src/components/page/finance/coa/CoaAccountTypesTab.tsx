'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit3, FileSpreadsheet } from 'lucide-react';
import { CoaCategory } from '@/lib/mock/finance';

interface Props {
  coaCategories: CoaCategory[];
  addCoaCategory: (newCat: Omit<CoaCategory, 'id' | 'accountCount'>) => void;
  updateCoaCategory: (id: string, updatedCat: Partial<CoaCategory>) => void;
  deleteCoaCategory: (id: string) => void;
}

export const CoaAccountTypesTab: React.FC<Props> = ({
  coaCategories,
  addCoaCategory,
  updateCoaCategory,
  deleteCoaCategory
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CoaCategory | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'ASSET' as 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE',
    description: ''
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    addCoaCategory(formData);
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    updateCoaCategory(editingCategory.id, formData);
    setEditingCategory(null);
  };

  const openEditModal = (cat: CoaCategory) => {
    setEditingCategory(cat);
    setFormData({
      code: cat.code,
      name: cat.name,
      type: cat.type,
      description: cat.description
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Action */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-emerald-500" />
            <span>Master Klasifikasi Kelompok Akun Keuangan (Account Classifications)</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Tabel master kelompok akun COA. Mengatur struktur Laporan Laba Rugi & Neraca Keuangan.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              code: '',
              name: '',
              type: 'ASSET',
              description: ''
            });
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Kelompok Akun Baru</span>
        </button>
      </div>

      {/* COA Category Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Daftar Master Kelompok Akun Terdaftar ({coaCategories.length} Kelompok)
          </span>
          <span className="text-[11px] text-slate-400">Strict Classification Table</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Kode Kelompok</th>
                <th className="py-3.5 px-4">Nama Kelompok Akun</th>
                <th className="py-3.5 px-4 text-center">Tipe Laporan</th>
                <th className="py-3.5 px-4 text-center">Jumlah Akun</th>
                <th className="py-3.5 px-4">Deskripsi</th>
                <th className="py-3.5 px-4 text-center">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {coaCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{cat.code}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{cat.name}</td>
                  <td className="py-3.5 px-4 text-center font-bold">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md font-mono">
                      {cat.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold font-mono">{cat.accountCount} Akun</td>
                  <td className="py-3.5 px-4 text-slate-500">{cat.description}</td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-all"
                        title="Edit Kelompok Akun"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCoaCategory(cat.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all"
                        title="Hapus Kelompok Akun"
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

      {/* Modal Form Add / Edit COA Category */}
      {(isCreateModalOpen || editingCategory) && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <h3 className="text-base font-bold">
              {editingCategory ? 'Edit Master Kelompok Akun' : 'Tambah Master Kelompok Akun Baru'}
            </h3>
            <form onSubmit={editingCategory ? handleEditSubmit : handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Kode Kelompok</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. CLASS-600"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Kelompok Akun</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Beban Administrasi & Umum"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tipe Laporan Laba Rugi / Neraca</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
                >
                  <option value="ASSET">ASSET (Aset / Aktiva)</option>
                  <option value="LIABILITY">LIABILITY (Kewajiban / Utang)</option>
                  <option value="EQUITY">EQUITY (Modal / Ekuitas)</option>
                  <option value="REVENUE">REVENUE (Pendapatan)</option>
                  <option value="EXPENSE">EXPENSE (Beban Operasional)</option>
                </select>
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
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold">
                  {editingCategory ? 'Simpan Perubahan' : 'Simpan Kelompok'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
