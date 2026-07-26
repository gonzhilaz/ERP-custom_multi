'use client';

import React from 'react';
import { UtensilsCrossed, Plus } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface MessHallTapLog {
  id: string;
  workerNik: string;
  workerName: string;
  companyName: string;
  mealShift: string;
  tapTimestamp: string;
  headcountBillingRate: string;
}

const MOCK_MESS_LOGS: MessHallTapLog[] = [
  { id: 'mhl-01', workerNik: 'NIK-SITE-9912', workerName: 'Joko Raharjo', companyName: 'PT Borneo Mining Emas', mealShift: 'Makan Siang (Shift Day)', tapTimestamp: '2026-07-25 12:10', headcountBillingRate: 'Rp 30.000 / Pax' }
];

export const MiningMessHallView = () => {
  const columns: ColumnDef<MessHallTapLog>[] = [
    { key: 'workerNik', header: 'NIK Karyawan', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => i.workerNik },
    { key: 'workerName', header: 'Nama Pekerja Site', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.workerName },
    { key: 'companyName', header: 'Perusahaan Kontraktor', render: (i) => i.companyName },
    { key: 'mealShift', header: 'Shift Makan', render: (i) => i.mealShift },
    { key: 'tapTimestamp', header: 'Waktu Tap Barcode NIK', className: 'font-mono text-slate-500', render: (i) => i.tapTimestamp },
    { key: 'headcountBillingRate', header: 'Tarif Headcount Billing', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.headcountBillingRate }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Mess Hall & Kantin EDR"
        icon={UtensilsCrossed}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Mess Hall & Kantin EDR"
        glossaryItems={[{ term: 'EDR Billing', description: 'Pencatatan headcount penagihan makan pekerja site tambang berdasarkan scan NIK.' }]}
        actions={
          <button onClick={() => alert('Scan Barcode NIK Pekerja Site')} className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Scan NIK Manual</span>
          </button>
        }
      />
      <DataTable headerTitle="Log Presensi Makan Pekerja Mess Hall & Kantin EDR Headcount Billing" columns={columns} data={MOCK_MESS_LOGS} keyExtractor={(i) => i.id} />
    </div>
  );
};
