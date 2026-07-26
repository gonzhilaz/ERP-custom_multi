'use client';

import React, { useState } from 'react';
import { Sparkles, Plus, Clock, UserCheck, Receipt, Heart, CheckCircle2 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface SpaBookingRecord {
  id: string;
  roomNo: string;
  guestName: string;
  treatmentName: string;
  durationMins: number;
  therapistName: string;
  spaRoomNo: string;
  totalCost: number;
  status: 'SCHEDULED' | 'IN_TREATMENT' | 'COMPLETED_POSTED';
  bookingTime: string;
}

export const SpaWellnessTab = () => {
  const [spaBookings] = useState<SpaBookingRecord[]>([
    {
      id: 'SPA-2026-081',
      roomNo: 'RM-301',
      guestName: 'Ibu Ratna Saraswati',
      treatmentName: 'Traditional Balinese Aromatherapy Massage',
      durationMins: 90,
      therapistName: 'Therapist Ni Wayan',
      spaRoomNo: 'Spa Suite #02',
      totalCost: 450000,
      status: 'COMPLETED_POSTED',
      bookingTime: '2026-07-26 15:00'
    },
    {
      id: 'SPA-2026-082',
      roomNo: 'RM-104',
      guestName: 'Mr. Johnathan Smith',
      treatmentName: 'Foot Reflexology & Body Scrub',
      durationMins: 60,
      therapistName: 'Therapist Made Kadek',
      spaRoomNo: 'Spa Room #05',
      totalCost: 350000,
      status: 'SCHEDULED',
      bookingTime: '2026-07-26 17:30'
    }
  ]);

  const columns: ColumnDef<SpaBookingRecord>[] = [
    { key: 'id', header: 'No. Slip Spa', className: 'font-mono font-bold text-rose-600 dark:text-rose-400', render: (i) => i.id },
    { key: 'roomNo', header: 'Kamar & Nama Tamu', render: (i) => <div><div className="font-bold text-slate-900 dark:text-white font-mono">{i.roomNo} - {i.guestName}</div><div className="text-[10px] text-slate-400 font-mono">{i.spaRoomNo}</div></div> },
    { key: 'treatmentName', header: 'Perawatan Spa & Durasi', render: (i) => <div><div className="font-mono font-bold text-slate-700 dark:text-slate-200">{i.treatmentName}</div><div className="text-[10px] text-rose-500 font-bold">{i.durationMins} Menit</div></div> },
    { key: 'therapistName', header: 'Terapis Shift', className: 'font-bold text-slate-800 dark:text-slate-200', render: (i) => i.therapistName },
    { key: 'totalCost', header: 'Biaya (Auto-Folio)', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (i) => `Rp ${i.totalCost.toLocaleString('id-ID')}` },
    { key: 'status', header: 'Status Treatment', align: 'center', render: (i) => <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${i.status === 'COMPLETED_POSTED' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-sky-500/10 text-sky-600'}`}>{i.status}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Spa, Wellness, & Gym Membership"
        icon={Heart}
        iconBgColor="bg-rose-500/10 text-rose-600 dark:text-rose-400"
        glossaryTitle="Glossary Spa & Wellness Center"
        glossaryItems={[
          { term: 'Spa Treatment Folio', description: 'Reservasi perawatan spa & pijat tradisional dengan auto-posting tagihan ke Guest Folio.' },
          { term: 'Therapist Schedule', description: 'Penugasan terapis spa & alokasi kamar perawatan wellness.' }
        ]}
        actions={
          <button onClick={() => alert('Reservasi Treatment Spa Baru')} className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Book Treatment Spa Baru</span>
          </button>
        }
      />

      <DataTable headerTitle="Jadwal Reservasi & Treatment Spa Hotelier" columns={columns} data={spaBookings} keyExtractor={(i) => i.id} />
    </div>
  );
};
