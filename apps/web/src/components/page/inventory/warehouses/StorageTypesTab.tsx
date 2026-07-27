'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit3, Building, FileSpreadsheet, Key } from 'lucide-react';
import { StorageTypeItem, MOCK_ASSETS } from '@/lib/mock/inventory';
import { COA_DATA } from '@/lib/mock/finance';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface Props {
  storageTypes: StorageTypeItem[];
  addStorageType: (newType: Omit<StorageTypeItem, 'id' | 'storageCount'>) => void;
  updateStorageType: (id: string, updatedType: Partial<StorageTypeItem>) => void;
  deleteStorageType: (id: string) => void;
}

export const StorageTypesTab: React.FC<Props> = ({
  storageTypes,
  addStorageType,
  updateStorageType,
  deleteStorageType
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<StorageTypeItem | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'Gudang Kering Utama',
    ownershipStatus: 'OWNED' as 'OWNED' | 'LEASED',
    coaAccountCode: '150-100',
    coaAccountName: 'Aset Tetap Gedung & Bangunan Gudang',
    linkedAssetId: '',
    tempControl: false,
    targetTempCelsius: 24,
    description: ''
  });

  const handleOwnershipChange = (status: 'OWNED' | 'LEASED') => {
    if (status === 'OWNED') {
      setFormData((prev) => ({
        ...prev,
        ownershipStatus: status,
        coaAccountCode: '150-100',
        coaAccountName: 'Aset Tetap Gedung & Bangunan Gudang'
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        ownershipStatus: status,
        coaAccountCode: '505-100',
        coaAccountName: 'Beban Sewa Gudang & Logistik Ops',
        linkedAssetId: ''
      }));
    }
  };

  const handleCoaChange = (code: string) => {
    const found = COA_DATA.find((c) => c.code === code);
    if (found) {
      setFormData((prev) => ({
        ...prev,
        coaAccountCode: found.code,
        coaAccountName: found.name
      }));
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code || !formData.type) return;
    addStorageType(formData);
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingType) return;
    updateStorageType(editingType.id, formData);
    setEditingType(null);
  };

  const openEditModal = (st: StorageTypeItem) => {
    setEditingType(st);
    setFormData({
      code: st.code,
      name: st.name,
      type: st.type,
      ownershipStatus: st.ownershipStatus,
      coaAccountCode: st.coaAccountCode || '1-10400',
      coaAccountName: st.coaAccountName || 'Persediaan Storage',
      linkedAssetId: st.linkedAssetId || '',
      tempControl: st.tempControl || false,
      targetTempCelsius: st.targetTempCelsius || 24,
      description: st.description
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Action */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-500" />
            <span>Klasifikasi Storage</span>
          </h3>
        </div>

        <button
          onClick={() => {
            setFormData({
              code: '',
              name: '',
              type: 'Gudang Kering Utama',
              ownershipStatus: 'OWNED',
              coaAccountCode: '150-100',
              coaAccountName: 'Aset Tetap Gedung & Bangunan Gudang',
              linkedAssetId: '',
              tempControl: false,
              targetTempCelsius: 24,
              description: ''
            });
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Tipe Storage Baru</span>
        </button>
      </div>

      <DataTable
        headerTitle={`Daftar Master Tipe Storage (${storageTypes.length})`}
        columns={[
          { key: 'code', header: 'Kode Tipe', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (st) => st.code },
          { key: 'name', header: 'Nama Tipe Storage', className: 'font-bold text-slate-900 dark:text-white', render: (st) => st.name },
          {
            key: 'ownershipStatus',
            header: 'Status Kepemilikan',
            align: 'center',
            render: (st) => (
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  st.ownershipStatus === 'OWNED'
                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                }`}
              >
                {st.ownershipStatus === 'OWNED' ? '🏠 Milik Sendiri (Asset)' : '📜 Sewa (Lease)'}
              </span>
            )
          },
          {
            key: 'coaAccountCode',
            header: 'Terikat HO COA Accounts',
            className: 'font-semibold text-slate-600 dark:text-slate-300',
            render: (st) => (
              <div className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="font-mono text-amber-600 dark:text-amber-400">{st.coaAccountCode}</span>
                <span className="text-[11px] text-slate-500">{st.coaAccountName}</span>
              </div>
            )
          },
          {
            key: 'linkedAssetId',
            header: 'Link Master Asset',
            className: 'text-slate-500',
            render: (st) => (
              st.linkedAssetId ? (
                <span className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400">
                  <Building className="w-3.5 h-3.5" /> AST-OVEN-001 (Deck Rotari)
                </span>
              ) : (
                <span className="text-slate-400 font-mono text-[11px]">Unlinked</span>
              )
            )
          },
          { key: 'storageCount', header: 'Jumlah Gudang', align: 'center', className: 'font-bold text-slate-700 dark:text-slate-300', render: (st) => `${st.storageCount} Unit` },
          {
            key: 'actions',
            header: 'Aksi CRUD',
            align: 'center',
            sortable: false,
            render: (st) => (
              <div className="flex items-center justify-center gap-1">
                <button
                  onClick={() => openEditModal(st)}
                  className="p-1.5 text-slate-400 hover:text-amber-600 transition-colors cursor-pointer"
                  title="Edit Tipe Storage"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteStorageType(st.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Hapus Tipe Storage"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          }
        ]}
        data={storageTypes}
        keyExtractor={(st) => st.id}
      />

      {/* Modal Form Add / Edit Storage Type */}
      {(isCreateModalOpen || editingType) && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <h3 className="text-base font-bold">
              {editingType ? 'Edit Master Tipe Storage' : 'Tambah Master Tipe Storage Baru'}
            </h3>
            <form onSubmit={editingType ? handleEditSubmit : handleCreateSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Kode Tipe</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. TYPE-FREEZER-01"
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Nama Tipe Fasilitas</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Cold Storage Room"
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* Status Kepemilikan */}
              <div>
                <label className="block font-semibold mb-1">Status Kepemilikan Fasilitas Storage</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleOwnershipChange('OWNED')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                      formData.ownershipStatus === 'OWNED'
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-300 text-slate-600'
                    }`}
                  >
                    🏠 Milik Sendiri (Asset)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOwnershipChange('LEASED')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                      formData.ownershipStatus === 'LEASED'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-300 text-slate-600'
                    }`}
                  >
                    📜 Disewa (Sewa)
                  </button>
                </div>
              </div>

              {/* Strict Select HO COA Accounts */}
              <div>
                <label className="block font-semibold mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                    <FileSpreadsheet className="w-3.5 h-3.5" /> Pilih Akun COA Resmi Holding (HO)
                  </span>
                  <span className="text-[10px] text-slate-400">Strict HO COA Binding</span>
                </label>
                <SearchableSelect
                  options={[
                    { id: '150-100', label: '150-100 - Aset Tetap Gedung & Bangunan Gudang (ASSET)' },
                    { id: '150-200', label: '150-200 - Aset Tetap Tangki & Heavy Equipment (ASSET)' },
                    { id: '150-300', label: '150-300 - Aset Tetap Mesin & Instalasi Cold Storage (ASSET)' },
                    { id: '505-100', label: '505-100 - Beban Sewa Gudang & Logistik Ops (EXPENSE)' }
                  ]}
                  value={formData.coaAccountCode}
                  onChange={(val) => handleCoaChange(val)}
                  placeholder="Pilih Akun COA..."
                />
              </div>

              {/* Link to Fixed Assets Directory if Owned */}
              {formData.ownershipStatus === 'OWNED' && (
                <div>
                  <label className="block font-semibold mb-1 flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                    <Building className="w-3.5 h-3.5" /> Link ke Master Asset Tetap Terdaftar
                  </label>
                  <SearchableSelect
                    options={[
                      { id: '', label: '-- Bebas / Tidak Dihubungkan ke Asset Spesifik --' },
                      ...MOCK_ASSETS.map((ast) => ({
                        id: ast.id,
                        label: `${ast.code} - ${ast.name} (Perolehan: Rp ${ast.purchaseCost.toLocaleString('id-ID')})`
                      }))
                    ]}
                    value={formData.linkedAssetId}
                    onChange={(val) => setFormData({ ...formData, linkedAssetId: val })}
                    placeholder="Pilih Master Asset..."
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingType(null);
                  }}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-semibold">
                  {editingType ? 'Simpan Perubahan' : 'Simpan Tipe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
