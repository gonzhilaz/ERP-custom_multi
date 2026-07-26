'use client';

import React, { useState } from 'react';
import { Plus, Edit, Trash2, BedDouble, CheckCircle2, ShieldCheck, Search, DollarSign, Users } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { SearchableSelect, SearchSelectOption } from '@/components/ui/dropdowns/SearchableSelect';
import { RoomTypeCategory } from '@/lib/mock/hotelier';
import { useHotelier } from '@/hooks/hotelier/useHotelier';

export const RoomTypeParamView = () => {
  const { roomTypes, addRoomType, updateRoomType, deleteRoomType } = useHotelier();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<RoomTypeCategory | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    defaultRatePerNight: 850000,
    maxOccupancy: 2,
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      code: 'DLX-TWN',
      name: 'Deluxe Twin Beds',
      defaultRatePerNight: 850000,
      maxOccupancy: 2,
      description: 'Kamar mewah dengan 2 kasur Single/Twin Bed, Smart TV 50 inch, & Pemandangan Gunung'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item: RoomTypeCategory) => {
    setEditingItem(item);
    setFormData({
      code: item.code,
      name: item.name,
      defaultRatePerNight: item.defaultRatePerNight || item.basePricePerNight || 850000,
      maxOccupancy: item.maxOccupancy,
      description: item.description
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateRoomType(editingItem.id, {
        code: formData.code,
        name: formData.name,
        defaultRatePerNight: formData.defaultRatePerNight,
        maxOccupancy: formData.maxOccupancy,
        description: formData.description
      });
      alert(`Tipe Kamar [${formData.name}] Berhasil Diperbarui!`);
    } else {
      addRoomType({
        code: formData.code,
        name: formData.name,
        defaultRatePerNight: formData.defaultRatePerNight,
        maxOccupancy: formData.maxOccupancy,
        description: formData.description
      });
      alert(`Tipe Kamar Baru [${formData.name}] Berhasil Ditambahkan ke Master Data!`);
    }
    setShowModal(false);
  };

  const columns: ColumnDef<RoomTypeCategory>[] = [
    { key: 'code', header: 'Kode Tipe', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => i.code },
    { key: 'name', header: 'Nama Resmi Tipe Kamar', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.name },
    { key: 'defaultRatePerNight', header: 'Tarif Dasar / Malam', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => `Rp ${(i.defaultRatePerNight || i.basePricePerNight || 0).toLocaleString('id-ID')}` },
    { key: 'maxOccupancy', header: 'Kapasitas Tamu', align: 'center', className: 'font-mono font-bold text-sky-600', render: (i) => `${i.maxOccupancy} Pax` },
    { key: 'roomCount', header: 'Total Unit', align: 'center', className: 'font-mono font-bold text-slate-700 dark:text-slate-300', render: (i) => `${i.roomCount || 0} Kamar` },
    { key: 'description', header: 'Deskripsi Fasilitas', className: 'font-mono text-slate-500 text-[11px]', render: (i) => i.description },
    {
      key: 'actions',
      header: 'Kelola',
      align: 'center',
      render: (i) => (
        <div className="flex items-center justify-center gap-1">
          <button onClick={() => handleOpenEdit(i)} className="p-1 text-sky-600 hover:bg-sky-50 rounded cursor-pointer">
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => deleteRoomType(i.id)} className="p-1 text-rose-600 hover:bg-rose-50 rounded cursor-pointer">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-amber-500" />
            <span>Master Dynamic Tipe Kamar Hotel</span>
          </h2>
          <p className="text-[11px] text-slate-500">
            Kelola kategori tipe kamar (Deluxe 1 King Bed, Deluxe Twin Beds, Executive Suite) tanpa hardcode.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Tambah Tipe Kamar Baru</span>
        </button>
      </div>

      <DataTable headerTitle={`Master Tipe Kamar Hotel (${roomTypes.length} Tipe)`} columns={columns} data={roomTypes} keyExtractor={(i) => i.id} />

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-amber-500" />
                <span>{editingItem ? 'Edit Tipe Kamar' : 'Tambah Tipe Kamar Baru'}</span>
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">Kode Tipe Kamar</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">Kapasitas Maksimal (Pax)</label>
                  <input
                    type="number"
                    required
                    value={formData.maxOccupancy}
                    onChange={(e) => setFormData({ ...formData, maxOccupancy: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Resmi Tipe Kamar</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="misal: Deluxe Twin Beds"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">Tarif Dasar Standar / Malam (Rp)</label>
                <input
                  type="number"
                  required
                  value={formData.defaultRatePerNight}
                  onChange={(e) => setFormData({ ...formData, defaultRatePerNight: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Fasilitas Kamar</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 font-bold rounded-xl">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md">
                  Simpan Master Tipe Kamar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
