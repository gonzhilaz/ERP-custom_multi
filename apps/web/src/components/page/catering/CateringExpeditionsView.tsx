'use client';

import React from 'react';
import { Truck, Plus } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface ExpeditionWaybill {
  id: string;
  waybillNo: string;
  destinationSite: string;
  driverName: string;
  vehiclePlate: string;
  paxCount: number;
  dispatchTime: string;
  deliveryStatus: string;
}

const MOCK_EXPEDITIONS: ExpeditionWaybill[] = [
  { id: 'exp-01', waybillNo: 'WB-CAT-9901', destinationSite: 'Mess Hall Site Tambang Braxit', driverName: 'Joko Susilo', vehiclePlate: 'KT 8812 B (Isuzu Elf Cold Box)', paxCount: 1500, dispatchTime: '2026-07-25 04:30', deliveryStatus: 'DELIVERED' }
];

export const CateringExpeditionsView = () => {
  const columns: ColumnDef<ExpeditionWaybill>[] = [
    { key: 'waybillNo', header: 'No. Surat Jalan Waybill', className: 'font-mono font-bold text-orange-600 dark:text-orange-400', render: (i) => i.waybillNo },
    { key: 'destinationSite', header: 'Lokasi Tujuan Pengiriman', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.destinationSite },
    { key: 'driverName', header: 'Driver Bertugas', render: (i) => i.driverName },
    { key: 'vehiclePlate', header: 'Armada Box Thermo', render: (i) => i.vehiclePlate },
    { key: 'paxCount', header: 'Muatan Porsi', align: 'center', className: 'font-bold font-mono', render: (i) => `${i.paxCount} Pax` },
    { key: 'dispatchTime', header: 'Waktu Keberangkatan', className: 'font-mono', render: (i) => i.dispatchTime },
    { key: 'deliveryStatus', header: 'Status Pengiriman', align: 'center', render: (i) => <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 font-bold text-[10px] rounded-full">{i.deliveryStatus}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Surat Jalan & Expeditions"
        icon={Truck}
        iconBgColor="bg-orange-500/10 text-orange-600 dark:text-orange-400"
        glossaryTitle="Glossary Expeditions Catering"
        glossaryItems={[{ term: 'Surat Jalan Waybill', description: 'Dokumen resit resmi serah terima porsi makanan ke pengelola site tambang/event.' }]}
        actions={
          <button onClick={() => alert('Terbitkan Surat Jalan Baru')} className="px-3.5 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Surat Jalan Baru</span>
          </button>
        }
      />
      <DataTable headerTitle="Jadwal Pengiriman & Surat Jalan Porsi Makanan Central Kitchen" columns={columns} data={MOCK_EXPEDITIONS} keyExtractor={(i) => i.id} />
    </div>
  );
};
