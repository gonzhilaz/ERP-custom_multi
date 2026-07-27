'use client';

import React, { useState } from 'react';
import { Plus, CheckCircle2, Tag } from 'lucide-react';
import { StorageLocation, StorageTypeItem } from '@/lib/mock/inventory';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

interface Props {
  storageTypes: StorageTypeItem[];
  addStorageLocation: (newStorage: Omit<StorageLocation, 'id'>) => void;
  onSuccess: () => void;
}

export const CreateStorageTab: React.FC<Props> = ({ storageTypes, addStorageLocation, onSuccess }) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    typeId: storageTypes[0]?.id || 'str-type-02',
    type: storageTypes[0]?.type || 'MAIN_WAREHOUSE',
    typeName: storageTypes[0]?.name || 'Gudang Utama Kering',
    ownershipStatus: (storageTypes[0]?.ownershipStatus || 'OWNED') as 'OWNED' | 'LEASED',
    branchName: 'Cabang Utama Sudirman',
    capacityMax: 5000,
    capacityUsed: 1200,
    uom: 'Karung/Box',
    managerName: 'Eko Stok'
  });

  const handleTypeChange = (typeId: string) => {
    const selected = storageTypes.find((t) => t.id === typeId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        typeId: selected.id,
        type: selected.type,
        typeName: selected.name,
        ownershipStatus: selected.ownershipStatus
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    addStorageLocation(formData);
    alert(`Storage Lokasi Gudang [${formData.name}] berhasil terdaftar!`);
    onSuccess();
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-amber-500" />
          <span>Form Registrasi Storage Baru</span>
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-900 dark:text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Kode Storage</label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g. WH-ROTI-02"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-amber-600 dark:text-amber-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Nama Storage Lokasi</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Gudang Bahan Baku Kelapa Gading"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Strict Storage Type Dropdown */}
        <div>
          <label className="block font-semibold mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <Tag className="w-3.5 h-3.5" /> Pilih Master Tipe Storage Terdaftar
            </span>
          </label>
          <SearchableSelect
            options={storageTypes.map((t) => ({
              id: t.id,
              label: `${t.name} (${t.code} — ${t.ownershipStatus === 'OWNED' ? 'Milik Sendiri' : 'Sewa'})`
            }))}
            value={formData.typeId}
            onChange={(val) => handleTypeChange(val)}
            placeholder="Pilih Master Tipe Storage..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Nama Cabang Unit Usaha</label>
            <input
              type="text"
              value={formData.branchName}
              onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Manager Penanggung Jawab</label>
            <input
              type="text"
              value={formData.managerName}
              onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div>
            <label className="block font-semibold mb-1">Kapasitas Max</label>
            <input
              type="number"
              value={formData.capacityMax}
              onChange={(e) => setFormData({ ...formData, capacityMax: Number(e.target.value) })}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-500">Stok Terisi Awal</label>
            <input
              type="number"
              value={formData.capacityUsed}
              onChange={(e) => setFormData({ ...formData, capacityUsed: Number(e.target.value) })}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Satuan UOM</label>
            <input
              type="text"
              value={formData.uom}
              onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
              className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Daftarkan Storage Baru</span>
          </button>
        </div>
      </form>
    </div>
  );
};
