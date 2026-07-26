'use client';

import React, { useState } from 'react';
import { Car, Plus, Plane, Clock, UserCheck, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface ShuttleDispatchRecord {
  id: string;
  roomNo: string;
  guestName: string;
  shuttleType: 'AIRPORT_PICKUP' | 'AIRPORT_DROPOFF' | 'CITY_TOUR';
  flightNo: string;
  scheduledTime: string;
  vehicleModel: string;
  driverName: string;
  passengerCount: number;
  chargeAmount: number;
  status: 'SCHEDULED' | 'IN_TRANSIT' | 'COMPLETED';
}

export const GuestShuttleDispatchTab = () => {
  const [shuttles] = useState<ShuttleDispatchRecord[]>([
    {
      id: 'SHT-2026-051',
      roomNo: 'RM-301',
      guestName: 'Ir. Hendra Wijaya',
      shuttleType: 'AIRPORT_PICKUP',
      flightNo: 'GA-502 (Soekarno-Hatta T3)',
      scheduledTime: '2026-07-26 14:30 (ETA)',
      vehicleModel: 'Toyota Alphard VIP (B 1088 HO)',
      driverName: 'Driver Supriadi',
      passengerCount: 2,
      chargeAmount: 350000,
      status: 'SCHEDULED'
    },
    {
      id: 'SHT-2026-048',
      roomNo: 'RM-104',
      guestName: 'Mr. Johnathan Smith',
      shuttleType: 'AIRPORT_DROPOFF',
      flightNo: 'SQ-951 (Changi International)',
      scheduledTime: '2026-07-27 10:00 (ETD)',
      vehicleModel: 'Innova Zenix Hybrid (B 2411 PAK)',
      driverName: 'Driver Bambang',
      passengerCount: 1,
      chargeAmount: 250000,
      status: 'SCHEDULED'
    }
  ]);

  const columns: ColumnDef<ShuttleDispatchRecord>[] = [
    { key: 'id', header: 'No. Transport Slip', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.id },
    { key: 'roomNo', header: 'Kamar & Tamu', render: (i) => <div><div className="font-bold text-slate-900 dark:text-white font-mono">{i.roomNo} - {i.guestName}</div><div className="text-[10px] text-slate-400">{i.shuttleType}</div></div> },
    { key: 'flightNo', header: 'Penerbangan & Jadwal', render: (i) => <div><div className="font-mono font-bold text-slate-700 dark:text-slate-200">{i.flightNo}</div><div className="text-[10px] text-sky-600 font-mono font-bold">{i.scheduledTime}</div></div> },
    { key: 'vehicleModel', header: 'Armada Mobil & Driver', render: (i) => <div><div className="font-bold text-slate-900 dark:text-white">{i.vehicleModel}</div><div className="text-[10px] text-slate-400 font-mono">{i.driverName} ({i.passengerCount} Pax)</div></div> },
    { key: 'chargeAmount', header: 'Biaya (Auto-Folio)', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (i) => `Rp ${i.chargeAmount.toLocaleString('id-ID')}` },
    { key: 'status', header: 'Status Penjemputan', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded border border-sky-500/20">{i.status}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Concierge & Airport Shuttle Fleet"
        icon={Car}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Concierge & Shuttle Dispatch"
        glossaryItems={[
          { term: 'Airport Shuttle Dispatch', description: 'Jadwal penjemputan & pengantaran tamu ke Bandara dengan auto-posting biaya ke Guest Folio B.' }
        ]}
        actions={
          <button onClick={() => alert('Jadwalkan Penjemputan Shuttle Baru')} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Jadwalkan Penjemputan Shuttle</span>
          </button>
        }
      />

      <DataTable headerTitle="Jadwal Penjemputan & Pengantaran Armada Shuttle Concierge" columns={columns} data={shuttles} keyExtractor={(i) => i.id} />
    </div>
  );
};
