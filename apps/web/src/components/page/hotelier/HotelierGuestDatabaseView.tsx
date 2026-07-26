'use client';

import React, { useState, useEffect } from 'react';
import { Users, Plus, Star, Globe, ShieldCheck, CreditCard, Building } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { DynamicSearchFilter, FilterOption } from '@/components/ui/forms/DynamicSearchFilter';
import { SearchableSelect, SearchSelectOption } from '@/components/ui/dropdowns/SearchableSelect';

interface HotelGuestProfile {
  guestId: string;
  fullName: string;
  idPassportNo: string;
  nationality: string;
  phone: string;
  email: string;
  totalStayVisits: number;
  vipStatus: 'REGULAR' | 'GOLD_VIP' | 'PLATINUM_VIP';
  bookingSource: 'TRAVELOKA' | 'BOOKING_COM' | 'AGODA' | 'DIRECT_WALK_IN' | 'CORPORATE_CONTRACT';
  preferredRoomType: string;
  specialRequests: string;
}

export const HotelierGuestDatabaseView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('ALL');

  const [guests, setGuests] = useState<HotelGuestProfile[]>([
    { guestId: 'GST-2026-0881', fullName: 'Bpk. Ir. Hendra Wijaya', idPassportNo: '3174091802880001', nationality: 'Indonesia (WNI)', phone: '+62 812-8890-1122', email: 'hendra.wijaya@freeport.co.id', totalStayVisits: 14, vipStatus: 'PLATINUM_VIP', bookingSource: 'CORPORATE_CONTRACT', preferredRoomType: 'Executive Suite', specialRequests: 'High Floor, Non-Smoking, Extra Pillow' },
    { guestId: 'GST-2026-0902', fullName: 'Mr. Johnathan Smith', idPassportNo: 'A-889102391', nationality: 'Australia (WNA)', phone: '+61 412-345-678', email: 'johnathan.smith@gmail.com', totalStayVisits: 3, vipStatus: 'GOLD_VIP', bookingSource: 'TRAVELOKA', preferredRoomType: 'Deluxe King Room', specialRequests: 'Airport Shuttle Pickup, Late Checkout 14:00' },
    { guestId: 'GST-2026-0915', fullName: 'Ibu Ratna Saraswati', idPassportNo: '3201085512900004', nationality: 'Indonesia (WNI)', phone: '+62 813-7711-2299', email: 'ratna.saraswati@esdm.go.id', totalStayVisits: 8, vipStatus: 'GOLD_VIP', bookingSource: 'BOOKING_COM', preferredRoomType: 'Grand Deluxe Twin', specialRequests: 'Quiet Room, Near Elevator' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const sourceOptions: SearchSelectOption[] = [
    { id: 'ALL', label: 'Semua Channel Booking (OTA & Direct)' },
    { id: 'TRAVELOKA', label: 'Traveloka OTA API Sync' },
    { id: 'BOOKING_COM', label: 'Booking.com Channel Manager' },
    { id: 'AGODA', label: 'Agoda Global Partner' },
    { id: 'DIRECT_WALK_IN', label: 'Direct Walk-In (Front Desk)' },
    { id: 'CORPORATE_CONTRACT', label: 'Corporate B2B Contract Rate' }
  ];

  const filtered = guests.filter((g) => {
    const matchesSearch =
      g.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.idPassportNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = sourceFilter === 'ALL' || g.bookingSource === sourceFilter;
    return matchesSearch && matchesSource;
  });

  const columns: ColumnDef<HotelGuestProfile>[] = [
    { key: 'guestId', header: 'ID Tamu PMS', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.guestId },
    { key: 'fullName', header: 'Nama Lengkap Tamu', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.fullName },
    { key: 'idPassportNo', header: 'No. KTP / Paspor', className: 'font-mono font-bold text-slate-700 dark:text-slate-300', render: (i) => i.idPassportNo },
    { key: 'nationality', header: 'Kewarganegaraan', render: (i) => i.nationality },
    { key: 'phone', header: 'No. Telp / WhatsApp', className: 'font-mono font-bold text-emerald-600', render: (i) => i.phone },
    {
      key: 'bookingSource',
      header: 'Kanal Booking (OTA)',
      align: 'center',
      render: (i) => (
        <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded border border-sky-500/20">
          {i.bookingSource}
        </span>
      )
    },
    {
      key: 'vipStatus',
      header: 'Status Tamu',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.vipStatus === 'PLATINUM_VIP' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/30' : 'bg-slate-100 text-slate-600'
        }`}>
          {i.vipStatus}
        </span>
      )
    },
    { key: 'totalStayVisits', header: 'Total Stay (Menginap)', align: 'center', className: 'font-mono font-bold text-sky-600', render: (i) => `${i.totalStayVisits} Kali` },
    { key: 'specialRequests', header: 'Catatan Spesial Request', render: (i) => i.specialRequests }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Guest History Profile & OTA Booking Channel Sync"
        icon={Users}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Master Guest Database"
        glossaryItems={[
          { term: 'Guest Profile CRM 360°', description: 'Database riwayat menginap tamu, paspor/KTP, preferensi kamar, dan akumulasi poin stay loyalty.' },
          { term: 'OTA Channel Manager', description: 'Integrasi otomatis API dua arah dengan Traveloka, Booking.com, dan Agoda untuk update alokasi kamar real-time.' }
        ]}
        badges={[
          { label: `${guests.length} Profiles Saved`, variant: 'sky' },
          { label: 'Traveloka & Booking.com Sync', variant: 'emerald' }
        ]}
      />

      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari nama tamu, KTP/Paspor, atau email..."
        categoryValue={sourceFilter}
        onCategoryChange={setSourceFilter}
        categoryOptions={[
          { label: 'Traveloka OTA API', value: 'TRAVELOKA' },
          { label: 'Booking.com Channel', value: 'BOOKING_COM' },
          { label: 'Agoda Global Partner', value: 'AGODA' },
          { label: 'Direct Walk-In', value: 'DIRECT_WALK_IN' },
          { label: 'Corporate B2B Contract', value: 'CORPORATE_CONTRACT' }
        ]}
        categoryPlaceholder="Semua Channel Booking (OTA & Direct)"
        colorScheme="sky"
      />

      {isLoading ? (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4 animate-pulse"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-slate-100 dark:bg-slate-800/60 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      ) : (
        <DataTable
          headerTitle={`Master Database Profil Tamu & Kanal OTA Traveloka/Booking.com (${filtered.length})`}
          columns={columns}
          data={filtered}
          keyExtractor={(i) => i.guestId}
        />
      )}
    </div>
  );
};
