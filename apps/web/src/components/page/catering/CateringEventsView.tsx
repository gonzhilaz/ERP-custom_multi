'use client';

import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface CateringEvent {
  id: string;
  contractNo: string;
  clientName: string;
  eventDate: string;
  portionPax: number;
  menuPackage: string;
  totalContractValue: string;
  status: string;
}

const MOCK_EVENTS: CateringEvent[] = [
  { id: 'ce-01', contractNo: 'CTR-CAT-2026-01', clientName: 'PT Borneo Mining Emas (Mess Hall)', eventDate: '2026-08-01 s/d 2026-08-31', portionPax: 30000, menuPackage: 'Paket Buffet Pekerja Site (3x Makan)', totalContractValue: 'Rp 900.000.000', status: 'IN_PROGRESS' }
];

export const CateringEventsView = () => {
  const columns: ColumnDef<CateringEvent>[] = [
    { key: 'contractNo', header: 'No. Kontrak Event', className: 'font-mono font-bold text-orange-600 dark:text-orange-400', render: (i) => i.contractNo },
    { key: 'clientName', header: 'Klien Instansi / Site', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.clientName },
    { key: 'eventDate', header: 'Periode Kontrak', className: 'font-mono', render: (i) => i.eventDate },
    { key: 'portionPax', header: 'Total Porti (Pax)', align: 'center', className: 'font-bold', render: (i) => `${i.portionPax.toLocaleString('id-ID')} Pax` },
    { key: 'menuPackage', header: 'Paket Menu', render: (i) => i.menuPackage },
    { key: 'totalContractValue', header: 'Nilai Kontrak', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.totalContractValue }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Kontrak Catering"
        icon={Calendar}
        iconBgColor="bg-orange-500/10 text-orange-600 dark:text-orange-400"
        glossaryTitle="Glossary Kontrak Catering Massal"
        glossaryItems={[{ term: 'Contract Event', description: 'Pengelolaan kontrak pemesanan catering massal porsi besar.' }]}
        actions={
          <button onClick={() => alert('Buat Kontrak Catering Baru')} className="px-3.5 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Kontrak Baru</span>
          </button>
        }
      />
      <DataTable headerTitle="Daftar Kontrak Catering Massal & Event Porsi Besar" columns={columns} data={MOCK_EVENTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
