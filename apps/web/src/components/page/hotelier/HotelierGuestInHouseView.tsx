'use client';

import React, { useState, useEffect } from 'react';
import { BedDouble, FileText, CheckCircle2, DollarSign, Search } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

interface GuestInHouseRow {
  roomNumber: string;
  guestName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  ratePerNight: number;
  currentFolioBalance: number;
  depositPaid: number;
  paymentMethod: string;
  bookingSource: string;
}

export const HotelierGuestInHouseView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [inHouseGuests, setInHouseGuests] = useState<GuestInHouseRow[]>([
    { roomNumber: 'RM-301', guestName: 'Bpk. Ir. Hendra Wijaya', roomType: 'Executive Suite', checkInDate: '2026-07-22', checkOutDate: '2026-07-26', ratePerNight: 1200000, currentFolioBalance: 4800000, depositPaid: 5000000, paymentMethod: 'Corporate Guarantee (B2B)', bookingSource: 'CORPORATE_CONTRACT' },
    { roomNumber: 'RM-204', guestName: 'Mr. Johnathan Smith', roomType: 'Deluxe King Room', checkInDate: '2026-07-24', checkOutDate: '2026-07-27', ratePerNight: 850000, currentFolioBalance: 1700000, depositPaid: 2000000, paymentMethod: 'Credit Card (BCA)', bookingSource: 'TRAVELOKA' },
    { roomNumber: 'RM-108', guestName: 'Ibu Ratna Saraswati', roomType: 'Grand Deluxe Twin', checkInDate: '2026-07-23', checkOutDate: '2026-07-26', ratePerNight: 950000, currentFolioBalance: 2850000, depositPaid: 3000000, paymentMethod: 'Virtual Account Mandiri', bookingSource: 'BOOKING_COM' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filtered = inHouseGuests.filter(
    (g) =>
      g.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.roomType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<GuestInHouseRow>[] = [
    { key: 'roomNumber', header: 'No. Kamar', className: 'font-mono font-extrabold text-sky-600 dark:text-sky-400 text-sm', render: (i) => i.roomNumber },
    { key: 'guestName', header: 'Nama Tamu In-House', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.guestName },
    { key: 'roomType', header: 'Tipe Kamar', render: (i) => i.roomType },
    { key: 'checkInDate', header: 'Tgl Check-In', className: 'font-mono text-slate-500', render: (i) => i.checkInDate },
    { key: 'checkOutDate', header: 'Tgl Check-Out', className: 'font-mono font-bold text-amber-600', render: (i) => i.checkOutDate },
    { key: 'ratePerNight', header: 'Tarif / Malam (Rp)', align: 'right', className: 'font-mono font-bold text-slate-700', render: (i) => `Rp ${i.ratePerNight.toLocaleString('id-ID')}` },
    { key: 'currentFolioBalance', header: 'Saldo Tagihan Folio (Rp)', align: 'right', className: 'font-mono font-bold text-sky-600', render: (i) => `Rp ${i.currentFolioBalance.toLocaleString('id-ID')}` },
    { key: 'depositPaid', header: 'Deposit Diterima (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (i) => `Rp ${i.depositPaid.toLocaleString('id-ID')}` },
    { key: 'bookingSource', header: 'Kanal Booking', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded">{i.bookingSource}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Guest-In-House Report & Room Folio Register"
        icon={BedDouble}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Guest In-House Report"
        glossaryItems={[
          { term: 'Guest In-House Report', description: 'Laporan real-time daftar seluruh tamu yang sedang menginap beserta saldo folio kamar.' },
          { term: 'Folio Balance vs Deposit', description: 'Monitoring kecukupan uang muka/deposit tamu terhadap akumulasi tagihan kamar & F&B.' }
        ]}
        badges={[
          { label: `${inHouseGuests.length} Rooms Occupied`, variant: 'sky' },
          { label: 'Live Folio Balance Audit', variant: 'emerald' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari nomor kamar, nama tamu, atau tipe..."
          />
        </div>
      </div>

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
          headerTitle={`Daftar Tamu Sedang Menginap (Guest-In-House Active) (${filtered.length})`}
          columns={columns}
          data={filtered}
          keyExtractor={(i) => i.roomNumber}
        />
      )}
    </div>
  );
};
