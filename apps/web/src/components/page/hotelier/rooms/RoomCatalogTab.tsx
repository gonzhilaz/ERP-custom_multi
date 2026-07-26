'use client';

import React, { useState } from 'react';
import { Trash2, Eye, BedDouble, ImageIcon } from 'lucide-react';
import { HotelRoom, RoomTypeCategory } from '@/lib/mock/hotelier';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { DynamicSearchFilter, FilterOption } from '@/components/ui/forms/DynamicSearchFilter';
import { HotelRoomDetailModal } from '../HotelRoomDetailModal';

interface Props {
  rooms: HotelRoom[];
  roomTypes: RoomTypeCategory[];
  deleteRoom: (id: string) => void;
}

export const RoomCatalogTab: React.FC<Props> = ({ rooms, roomTypes, deleteRoom }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedRoomForModal, setSelectedRoomForModal] = useState<HotelRoom | null>(null);

  const filteredRooms = rooms.filter((r) => {
    const matchesSearch =
      r.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.typeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'ALL' || r.typeName.includes(selectedType);
    return matchesSearch && matchesType;
  });

  const filterOptions: FilterOption[] = roomTypes.map((t) => ({
    label: t.name,
    value: t.name
  }));

  const columns: ColumnDef<HotelRoom>[] = [
    {
      key: 'roomNumber',
      header: 'No. Kamar',
      render: (r) => (
        <div onClick={() => setSelectedRoomForModal(r)} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
            {r.imageUrl ? (
              <img src={r.imageUrl} alt={`Foto Kamar ${r.roomNumber}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <BedDouble className="w-4 h-4" />
              </div>
            )}
          </div>
          <div>
            <div className="font-mono font-bold text-amber-600 dark:text-amber-400 group-hover:underline flex items-center gap-1">
              <span>Kamar {r.roomNumber}</span>
              <Eye className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-[10px] text-slate-400 font-mono">Lantai {r.floor}</div>
          </div>
        </div>
      )
    },
    {
      key: 'typeName',
      header: 'Tipe Kamar Resmi',
      className: 'font-bold text-slate-900 dark:text-white',
      render: (r) => r.typeName
    },
    {
      key: 'ratePerNight',
      header: 'Tarif / Malam',
      align: 'right',
      className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400',
      render: (r) => `Rp ${r.ratePerNight.toLocaleString('id-ID')}`
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (r) => {
        const badgeMap: Record<string, string> = {
          VACANT_CLEAN: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          OCCUPIED: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800',
          VACANT_DIRTY: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
          MAINTENANCE: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800'
        };
        const labelMap: Record<string, string> = {
          VACANT_CLEAN: 'Vacant Clean',
          OCCUPIED: 'Occupied',
          VACANT_DIRTY: 'Vacant Dirty',
          MAINTENANCE: 'Maintenance'
        };
        return (
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${badgeMap[r.status] || ''}`}>
            {labelMap[r.status] || r.status}
          </span>
        );
      }
    },
    {
      key: 'guestName',
      header: 'Tamu Terdaftar',
      render: (r) => r.guestName || <span className="text-slate-400 italic font-mono">-</span>
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      render: (r) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => setSelectedRoomForModal(r)}
            className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-lg text-sky-600 transition-colors cursor-pointer"
            title="Lihat Detail Kamar"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => deleteRoom(r.id)}
            className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            title="Hapus Unit Kamar"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Dynamic Search Filter */}
      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari nomor kamar, tipe kamar..."
        categoryValue={selectedType}
        onCategoryChange={setSelectedType}
        categoryOptions={filterOptions}
        categoryPlaceholder="Semua Tipe Kamar"
      />

      {/* Universal DataTable */}
      <DataTable
        headerTitle={`Daftar Unit Kamar Hotel (${filteredRooms.length} Unit)`}
        columns={columns}
        data={filteredRooms}
        keyExtractor={(r) => r.id}
      />

      {/* Room Detail Modal */}
      <HotelRoomDetailModal
        room={selectedRoomForModal}
        onClose={() => setSelectedRoomForModal(null)}
      />
    </div>
  );
};
