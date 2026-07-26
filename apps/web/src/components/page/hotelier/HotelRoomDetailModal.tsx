'use client';

import React from 'react';
import { X, BedDouble, CheckCircle2, User, DollarSign, Sparkles, Building, Key, ShieldCheck, Tag } from 'lucide-react';
import { HotelRoom } from '@/lib/mock/hotelier';

interface Props {
  room: HotelRoom | null;
  onClose: () => void;
  onBookOrCheckin?: (room: HotelRoom) => void;
}

export const HotelRoomDetailModal: React.FC<Props> = ({ room, onClose, onBookOrCheckin }) => {
  if (!room) return null;

  const defaultImage = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop';
  const displayImage = room.imageUrl || defaultImage;

  const statusBadgeMap: Record<string, { label: string; style: string }> = {
    VACANT_CLEAN: { label: 'Vacant Clean (VC)', style: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' },
    OCCUPIED: { label: 'Occupied (Terisi)', style: 'bg-sky-500/10 text-sky-600 border-sky-500/30' },
    VACANT_DIRTY: { label: 'Vacant Dirty (VD)', style: 'bg-amber-500/10 text-amber-600 border-amber-500/30' },
    MAINTENANCE: { label: 'Out of Order (OOO)', style: 'bg-rose-500/10 text-rose-600 border-rose-500/30' }
  };

  const currentStatus = statusBadgeMap[room.status] || { label: room.status, style: 'bg-slate-100 text-slate-700' };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 space-y-0">
        {/* Header Preview Image */}
        <div className="relative h-64 w-full bg-slate-950">
          <img src={displayImage} alt={`Foto Preview Kamar ${room.roomNumber}`} className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-all cursor-pointer backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono border backdrop-blur-md ${currentStatus.style}`}>
                {currentStatus.label}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
                <span>Kamar {room.roomNumber}</span>
                <span className="text-xs font-mono font-normal text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-lg border border-amber-500/30">
                  Lantai {room.floor}
                </span>
              </h2>
              <p className="text-xs font-semibold text-slate-300 font-mono mt-0.5">{room.typeName}</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-300 font-medium">Tarif Resmi / Malam</div>
              <div className="text-xl font-bold font-mono text-emerald-400">Rp {room.ratePerNight.toLocaleString('id-ID')}</div>
            </div>
          </div>
        </div>

        {/* Modal Body Info */}
        <div className="p-6 space-y-4 text-xs text-slate-900 dark:text-white">
          {/* Guest Status Card */}
          {room.guestName ? (
            <div className="p-3.5 bg-sky-500/10 border border-sky-500/20 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-600 text-white rounded-xl">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-sky-600 font-bold uppercase tracking-wider">Tamu Menginap Terdaftar</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{room.guestName}</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-sky-600 text-white text-[10px] font-bold font-mono rounded-lg">Active Checked-In</span>
            </div>
          ) : (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600 text-white rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Status Ketersediaan</div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">Kamar Siap Huni (Vacant Clean)</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-bold font-mono rounded-lg">Available for Booking</span>
            </div>
          )}

          {/* Room Amenities & Specifications */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Fasilitas & Spesifikasi Unit Kamar</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(room.amenities || [
                'Kasur Luxe King Bed 180x200',
                'Smart TV 55 Inch Premium',
                'High-Speed Wi-Fi Dedicated',
                'Coffee & Espresso Machine',
                'Balkon Pemandangan Kota',
                'Mini Bar Full Stocked'
              ]).map((item, idx) => (
                <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2 font-mono text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold rounded-xl cursor-pointer"
            >
              Tutup Window
            </button>

            {onBookOrCheckin && room.status === 'VACANT_CLEAN' && (
              <button
                onClick={() => {
                  onBookOrCheckin(room);
                  onClose();
                }}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Key className="w-4 h-4" />
                <span>Proses Reservasi Kamar Ini</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
