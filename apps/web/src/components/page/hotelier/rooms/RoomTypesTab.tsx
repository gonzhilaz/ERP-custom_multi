'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit3 } from 'lucide-react';
import { RoomTypeCategory } from '@/lib/mock/hotelier';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface Props {
  roomTypes?: RoomTypeCategory[];
  addRoomType?: (newType: Omit<RoomTypeCategory, 'id' | 'roomCount'>) => void;
  updateRoomType?: (id: string, updatedType: Partial<RoomTypeCategory>) => void;
  deleteRoomType?: (id: string) => void;
}

const DEFAULT_ROOM_TYPES: RoomTypeCategory[] = [
  { id: 'rt-01', code: 'DELUXE', name: 'Deluxe Room', defaultRatePerNight: 1250000, maxOccupancy: 2, description: 'Kamar deluxe dengan tempat tidur King/Twin dan balkon kota', roomCount: 24 },
  { id: 'rt-02', code: 'EXECUTIVE', name: 'Executive Suite', defaultRatePerNight: 2400000, maxOccupancy: 3, description: 'Suite mewah dilengkapi ruang tamu dan akses Executive Lounge', roomCount: 12 },
  { id: 'rt-03', code: 'PRESIDENTIAL', name: 'Presidential Suite', defaultRatePerNight: 5500000, maxOccupancy: 4, description: 'Suite utama dengan pemandangan panoramik laut dan layanan butler 24 jam', roomCount: 2 }
];

export const RoomTypesTab: React.FC<Props> = ({
  roomTypes = DEFAULT_ROOM_TYPES,
  addRoomType,
  updateRoomType,
  deleteRoomType
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<RoomTypeCategory | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    defaultRatePerNight: 1500000,
    maxOccupancy: 2,
    description: ''
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    if (addRoomType) addRoomType(formData);
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingType) return;
    if (updateRoomType) updateRoomType(editingType.id, formData);
    setEditingType(null);
  };

  const openEditModal = (t: RoomTypeCategory) => {
    setEditingType(t);
    setFormData({
      code: t.code,
      name: t.name,
      defaultRatePerNight: t.defaultRatePerNight,
      maxOccupancy: t.maxOccupancy,
      description: t.description
    });
  };

  const columns: ColumnDef<RoomTypeCategory>[] = [
    {
      key: 'code',
      header: 'Kode Tipe',
      className: 'font-mono font-bold text-amber-600 dark:text-amber-400',
      render: (t) => t.code
    },
    {
      key: 'name',
      header: 'Nama Tipe Kamar',
      className: 'font-bold text-slate-900 dark:text-white',
      render: (t) => t.name
    },
    {
      key: 'defaultRatePerNight',
      header: 'Tarif Standar / Malam',
      align: 'right',
      className: 'font-bold font-mono text-slate-900 dark:text-white',
      render: (t) => `Rp ${t.defaultRatePerNight.toLocaleString('id-ID')}`
    },
    {
      key: 'maxOccupancy',
      header: 'Kapasitas Tampung',
      align: 'center',
      className: 'font-bold',
      render: (t) => `${t.maxOccupancy} Person`
    },
    {
      key: 'roomCount',
      header: 'Total Unit Active',
      align: 'center',
      render: (t) => (
        <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full font-mono text-[10px] font-bold">
          {t.roomCount || 0} Unit
        </span>
      )
    },
    {
      key: 'description',
      header: 'Fasilitas & Keterangan',
      className: 'text-slate-600 dark:text-slate-300',
      render: (t) => t.description
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      render: (t) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => openEditModal(t)}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-sky-500 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => deleteRoomType && deleteRoomType(t.id)}
            className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Action Header Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-amber-500" />
          <span className="font-bold text-slate-900 dark:text-white">Master Tipe Kamar & Tarif</span>
        </div>

        <button
          onClick={() => {
            setFormData({
              code: '',
              name: '',
              defaultRatePerNight: 1500000,
              maxOccupancy: 2,
              description: ''
            });
            setIsCreateModalOpen(true);
          }}
          className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Tipe Kamar Baru</span>
        </button>
      </div>

      {/* Universal DataTable */}
      <DataTable
        headerTitle={`Master Tipe Kamar Terdaftar (${roomTypes.length} Tipe)`}
        columns={columns}
        data={roomTypes}
        keyExtractor={(t) => t.id}
      />

      {/* Modal Form Dialog */}
      {(isCreateModalOpen || editingType) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingType ? 'Edit Tipe Kamar' : 'Buat Tipe Kamar Baru'}
            </h3>
            <form onSubmit={editingType ? handleEditSubmit : handleCreateSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Kode Tipe</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="EXECUTIVE"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Tipe Kamar</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Executive Suite"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Tarif / Malam (Rp)</label>
                  <input
                    type="number"
                    required
                    value={formData.defaultRatePerNight}
                    onChange={(e) => setFormData({ ...formData, defaultRatePerNight: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Max Tamu</label>
                  <input
                    type="number"
                    required
                    value={formData.maxOccupancy}
                    onChange={(e) => setFormData({ ...formData, maxOccupancy: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Fasilitas / Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingType(null);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs cursor-pointer shadow-md"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
