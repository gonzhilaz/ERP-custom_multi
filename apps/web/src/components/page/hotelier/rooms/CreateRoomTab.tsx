'use client';

import React, { useState } from 'react';
import { Plus, CheckCircle2, Tag, Image as ImageIcon } from 'lucide-react';
import { HotelRoom, RoomTypeCategory } from '@/lib/mock/hotelier';

interface Props {
  roomTypes: RoomTypeCategory[];
  addRoom: (newRoom: Omit<HotelRoom, 'id'>) => void;
  onSuccess: () => void;
}

export const CreateRoomTab: React.FC<Props> = ({ roomTypes, addRoom, onSuccess }) => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    typeId: roomTypes[0]?.id || 'rtype-01',
    typeName: roomTypes[0]?.name || 'Deluxe Suite Resort View',
    type: 'DELUXE_SUITE' as 'DELUXE_SUITE' | 'EXECUTIVE_KING' | 'STANDARD_TWIN',
    floor: 1,
    ratePerNight: roomTypes[0]?.defaultRatePerNight || 850000,
    status: 'VACANT_CLEAN' as 'VACANT_CLEAN' | 'OCCUPIED' | 'VACANT_DIRTY' | 'MAINTENANCE',
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop'
  });

  const sampleImages = [
    { label: 'Deluxe King', url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop' },
    { label: 'Deluxe Twin', url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop' },
    { label: 'Executive Suite', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop' }
  ];

  const handleTypeChange = (typeId: string) => {
    const selected = roomTypes.find((t) => t.id === typeId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        typeId: selected.id,
        typeName: selected.name,
        ratePerNight: selected.defaultRatePerNight
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.roomNumber) return;
    addRoom(formData);
    alert(`Kamar Hotel [Kamar ${formData.roomNumber}] berhasil terdaftar dengan Foto Preview!`);
    onSuccess();
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-amber-500" />
          <span>Form Registrasi Kamar Hotel Baru</span>
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-900 dark:text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Nomor Kamar</label>
            <input
              type="text"
              required
              value={formData.roomNumber}
              onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
              placeholder="e.g. 305"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-amber-600 dark:text-amber-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Lokasi Lantai Gedung</label>
            <input
              type="number"
              required
              value={formData.floor}
              onChange={(e) => setFormData({ ...formData, floor: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
            />
          </div>
        </div>

        {/* Strict Room Type Dropdown */}
        <div>
          <label className="block font-semibold mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <Tag className="w-3.5 h-3.5" /> Pilih Master Tipe Kamar Terdaftar
            </span>
          </label>
          <select
            value={formData.typeId}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
          >
            {roomTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.code} — Rp {t.defaultRatePerNight.toLocaleString('id-ID')})
              </option>
            ))}
          </select>
        </div>

        {/* Photo URL & Image Upload Section */}
        <div>
          <label className="block font-semibold mb-1 flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <ImageIcon className="w-3.5 h-3.5 text-sky-500" />
            <span>URL Foto Kamar / Preview Image</span>
          </label>
          <input
            type="url"
            required
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://..."
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-[11px]"
          />
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] text-slate-400">Pilih Preset Foto:</span>
            {sampleImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setFormData({ ...formData, imageUrl: img.url })}
                className="px-2 py-0.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 text-[10px] font-bold rounded-lg cursor-pointer"
              >
                {img.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
          <label className="block font-semibold mb-1">Tarif Kamar per Malam (Rp)</label>
          <input
            type="number"
            value={formData.ratePerNight}
            onChange={(e) => setFormData({ ...formData, ratePerNight: Number(e.target.value) })}
            className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Daftarkan Kamar Baru</span>
          </button>
        </div>
      </form>
    </div>
  );
};
