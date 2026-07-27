'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit3, FileSpreadsheet } from 'lucide-react';
import { InventoryCategory } from '@/lib/mock/inventory';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface Props {
  categories: InventoryCategory[];
  addCategory: (newCat: Omit<InventoryCategory, 'id' | 'itemCount'>) => void;
  updateCategory: (id: string, updatedCat: Partial<InventoryCategory>) => void;
  deleteCategory: (id: string) => void;
}

export const ItemCategoriesTab: React.FC<Props> = ({
  categories,
  addCategory,
  updateCategory,
  deleteCategory
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<InventoryCategory | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    coaAccountCode: '102-100',
    coaAccountName: 'Persediaan Bahan Baku & Dapur Resto',
    description: ''
  });

  const handleCoaChange = (code: string) => {
    const coaMap: Record<string, string> = {
      '102-100': 'Persediaan Bahan Baku & Dapur Resto',
      '102-200': 'Persediaan Barang Jadi & Retail Product',
      '102-300': 'Persediaan Kemasan & Packaging Store',
      '102-400': 'Persediaan Sparepart & Heavy Equipment Fleet'
    };
    setFormData((prev) => ({
      ...prev,
      coaAccountCode: code,
      coaAccountName: coaMap[code] || 'Persediaan Stok Barang'
    }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    addCategory(formData);
    setFormData({
      code: '',
      name: '',
      coaAccountCode: '102-100',
      coaAccountName: 'Persediaan Bahan Baku & Dapur Resto',
      description: ''
    });
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    updateCategory(editingCategory.id, formData);
    setEditingCategory(null);
  };

  const openEditModal = (cat: InventoryCategory) => {
    setEditingCategory(cat);
    setFormData({
      code: cat.code,
      name: cat.name,
      coaAccountCode: cat.coaAccountCode,
      coaAccountName: cat.coaAccountName,
      description: cat.description
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Add Action */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-sky-500" />
            <span>Kategori Barang</span>
          </h3>
        </div>

        <button
          onClick={() => {
            setFormData({
              code: '',
              name: '',
              coaAccountCode: '102-100',
              coaAccountName: 'Persediaan Bahan Baku & Dapur Resto',
              description: ''
            });
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Master Kategori Baru</span>
        </button>
      </div>

      {/* Enterprise Category Table */}
      <DataTable
        headerTitle={`Daftar Master Kategori Barang (${categories.length})`}
        columns={[
          { key: 'code', header: 'Kode Kategori', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (cat) => cat.code },
          { key: 'name', header: 'Nama Kategori Resmi', className: 'font-bold text-slate-900 dark:text-white', render: (cat) => cat.name },
          {
            key: 'coaAccountCode',
            header: 'Terikat HO COA Persediaan',
            className: 'font-semibold text-slate-600 dark:text-slate-300',
            render: (cat) => (
              <div className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span className="font-mono text-sky-600 dark:text-sky-400">{cat.coaAccountCode}</span>
                <span className="text-[11px] text-slate-500">{cat.coaAccountName}</span>
              </div>
            )
          },
          { key: 'itemCount', header: 'Jumlah SKU', align: 'center', className: 'font-bold font-mono text-slate-800 dark:text-slate-200', render: (cat) => `${cat.itemCount} SKU` },
          { key: 'description', header: 'Deskripsi', className: 'text-slate-500', render: (cat) => cat.description },
          {
            key: 'actions',
            header: 'Aksi CRUD',
            align: 'center',
            sortable: false,
            render: (cat) => (
              <div className="flex items-center justify-center gap-1">
                <button
                  onClick={() => openEditModal(cat)}
                  className="p-1.5 text-slate-400 hover:text-sky-600 transition-colors cursor-pointer"
                  title="Edit Kategori"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Hapus Kategori"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          }
        ]}
        data={categories}
        keyExtractor={(cat) => cat.id}
      />

      {/* Modal Form Add / Edit Category */}
      {(isCreateModalOpen || editingCategory) && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <h3 className="text-base font-bold">
              {editingCategory ? 'Edit Master Kategori Item' : 'Tambah Master Kategori Baru'}
            </h3>
            <form onSubmit={editingCategory ? handleEditSubmit : handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Kode Kategori</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. CAT-PACKAGING"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Kategori Resmi</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kemasan Plastik & Box Roti"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              {/* Strict Select Registered HO COA Account */}
              <div>
                <label className="block font-semibold mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
                    <FileSpreadsheet className="w-3.5 h-3.5" /> Terikat Akun COA Resmi HO Holding
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Strict HO COA Binding</span>
                </label>
                <SearchableSelect
                  options={[
                    { id: '102-100', label: '102-100 - Persediaan Bahan Baku & Dapur Resto' },
                    { id: '102-200', label: '102-200 - Persediaan Barang Jadi & Retail Product' },
                    { id: '102-300', label: '102-300 - Persediaan Kemasan & Packaging Store' },
                    { id: '102-400', label: '102-400 - Persediaan Sparepart & Heavy Equipment Fleet' }
                  ]}
                  value={formData.coaAccountCode}
                  onChange={(val) => handleCoaChange(val)}
                  placeholder="Pilih Akun COA..."
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Deskripsi Kategori</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Keterangan cakupan barang..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                ></textarea>
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
