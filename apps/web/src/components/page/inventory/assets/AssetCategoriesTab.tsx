'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit3, FileSpreadsheet } from 'lucide-react';
import { AssetCategory } from '@/lib/mock/inventory';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

interface Props {
  assetCategories: AssetCategory[];
  addAssetCategory: (newCat: Omit<AssetCategory, 'id' | 'assetCount'>) => void;
  updateAssetCategory: (id: string, updatedCat: Partial<AssetCategory>) => void;
  deleteAssetCategory: (id: string) => void;
}

export const AssetCategoriesTab: React.FC<Props> = ({
  assetCategories,
  addAssetCategory,
  updateAssetCategory,
  deleteAssetCategory
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AssetCategory | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    assetCoaCode: '150-100',
    assetCoaName: 'Aset Tetap Gedung & Bangunan',
    depreciationCoaCode: '155-100',
    depreciationCoaName: 'Akumulasi Depresiasi Bangunan',
    usefulLifeYearsDefault: 10,
    description: ''
  });

  const handleAssetCoaChange = (code: string) => {
    const coaMap: Record<string, { assetName: string; depCode: string; depName: string }> = {
      '150-100': { assetName: 'Aset Tetap Gedung & Bangunan', depCode: '155-100', depName: 'Akumulasi Depresiasi Bangunan' },
      '150-200': { assetName: 'Aset Tetap Kendaraan & Heavy Equipment Fleet', depCode: '155-200', depName: 'Akumulasi Depresiasi Kendaraan' },
      '150-300': { assetName: 'Aset Tetap Mesin & Peralatan Produksi', depCode: '155-300', depName: 'Akumulasi Depresiasi Mesin' },
      '150-400': { assetName: 'Aset Tetap Inventaris & IT Hardware', depCode: '155-400', depName: 'Akumulasi Depresiasi Peralatan IT' }
    };
    const target = coaMap[code];
    if (target) {
      setFormData((prev) => ({
        ...prev,
        assetCoaCode: code,
        assetCoaName: target.assetName,
        depreciationCoaCode: target.depCode,
        depreciationCoaName: target.depName
      }));
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    addAssetCategory(formData);
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    updateAssetCategory(editingCategory.id, formData);
    setEditingCategory(null);
  };

  const openEditModal = (cat: AssetCategory) => {
    setEditingCategory(cat);
    setFormData({
      code: cat.code,
      name: cat.name,
      assetCoaCode: cat.assetCoaCode,
      assetCoaName: cat.assetCoaName,
      depreciationCoaCode: cat.depreciationCoaCode,
      depreciationCoaName: cat.depreciationCoaName,
      usefulLifeYearsDefault: cat.usefulLifeYearsDefault,
      description: cat.description
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Action */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-500" />
            <span>Master Kategori Asset Tetap & HO COA Mapping</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Daftar akun COA disusun resmi oleh HO (Holding Central) untuk konsistensi pembukuan seluruh tenants.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              code: '',
              name: '',
              assetCoaCode: '150-100',
              assetCoaName: 'Aset Tetap Gedung & Bangunan',
              depreciationCoaCode: '155-100',
              depreciationCoaName: 'Akumulasi Depresiasi Bangunan',
              usefulLifeYearsDefault: 10,
              description: ''
            });
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Kategori Asset Baru</span>
        </button>
      </div>

      {/* Asset Category Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Daftar Master Kategori Asset Terdaftar ({assetCategories.length} Kategori)
          </span>
          <span className="text-[11px] text-slate-400">Strict HO COA Bound Table</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Kode Kategori</th>
                <th className="py-3.5 px-4">Nama Kategori Asset</th>
                <th className="py-3.5 px-4">Terikat HO COA Asset</th>
                <th className="py-3.5 px-4 text-center">Masa Manfaat Default</th>
                <th className="py-3.5 px-4 text-center">Jumlah Asset</th>
                <th className="py-3.5 px-4">Deskripsi</th>
                <th className="py-3.5 px-4 text-center">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {assetCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{cat.code}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{cat.name}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{cat.assetCoaCode}</span>
                      <span className="text-[11px] text-slate-500">{cat.assetCoaName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold font-mono">{cat.usefulLifeYearsDefault} Tahun</td>
                  <td className="py-3.5 px-4 text-center font-bold font-mono">{cat.assetCount} Unit</td>
                  <td className="py-3.5 px-4 text-slate-500">{cat.description}</td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-all"
                        title="Edit Kategori Asset"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteAssetCategory(cat.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all"
                        title="Hapus Kategori Asset"
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

      {/* Modal Form Add / Edit Asset Category */}
      {(isCreateModalOpen || editingCategory) && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <h3 className="text-base font-bold">
              {editingCategory ? 'Edit Master Kategori Asset' : 'Tambah Master Kategori Asset Baru'}
            </h3>
            <form onSubmit={editingCategory ? handleEditSubmit : handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Kode Kategori Asset</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. AST-VEHICLE"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Kategori Asset</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kendaraan Heavy Duty Site"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              {/* Strict Select Registered HO COA Asset Account */}
              <div>
                <label className="block font-semibold mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                    <FileSpreadsheet className="w-3.5 h-3.5" /> Terikat Akun COA Resmi HO Holding
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Strict HO COA Binding</span>
                </label>
                <SearchableSelect
                  options={[
                    { id: '150-100', label: '150-100 - Aset Tetap Gedung & Bangunan' },
                    { id: '150-200', label: '150-200 - Aset Tetap Kendaraan & Heavy Equipment Fleet' },
                    { id: '150-300', label: '150-300 - Aset Tetap Mesin & Peralatan Produksi' },
                    { id: '150-400', label: '150-400 - Aset Tetap Inventaris & IT Hardware' }
                  ]}
                  value={formData.assetCoaCode}
                  onChange={(val) => handleAssetCoaChange(val)}
                  placeholder="Pilih Akun COA Asset..."
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Masa Manfaat Default (Tahun)</label>
                <input
                  type="number"
                  value={formData.usefulLifeYearsDefault}
                  onChange={(e) => setFormData({ ...formData, usefulLifeYearsDefault: Number(e.target.value) })}
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
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold">
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
