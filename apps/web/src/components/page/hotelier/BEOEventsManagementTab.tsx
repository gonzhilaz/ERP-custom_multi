'use client';

import React, { useState } from 'react';
import { FileSpreadsheet, Plus, CheckCircle2, Users, Calendar, Utensils, Music, Projector } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface BeoSheetRecord {
  id: string;
  beoNumber: string;
  eventName: string;
  clientCompany: string;
  functionRoom: string;
  setupStyle: 'THEATER' | 'CLASSROOM' | 'U_SHAPE' | 'BANQUET_ROUND_TABLE';
  attendeeCount: number;
  eventDate: string;
  fnbMenuPackage: string;
  avEquipment: string;
  status: 'DRAFT' | 'APPROVED_DISTRIBUTED' | 'COMPLETED';
}

export const BEOEventsManagementTab = () => {
  const [beoList] = useState<BeoSheetRecord[]>([
    {
      id: 'beo-01',
      beoNumber: 'BEO-2026-07-012',
      eventName: 'Rapat Kerja Nasional ESDM RI 2026',
      clientCompany: 'Kementerian ESDM RI',
      functionRoom: 'Grand Ballroom Pakuan (Lantai 2)',
      setupStyle: 'BANQUET_ROUND_TABLE',
      attendeeCount: 250,
      eventDate: '2026-07-28 (08:00 - 17:00)',
      fnbMenuPackage: 'Buffet Nusantara VIP + 2x Coffee Break',
      avEquipment: 'Videotron LED 4x3m, Wireless Mic 6 Pcs, Sound 5000W',
      status: 'APPROVED_DISTRIBUTED'
    },
    {
      id: 'beo-02',
      beoNumber: 'BEO-2026-07-009',
      eventName: 'Supplier Gathering PT Freeport Indonesia',
      clientCompany: 'PT Freeport Supplier Partner',
      functionRoom: 'Meeting Room Cendana (Lantai 3)',
      setupStyle: 'U_SHAPE',
      attendeeCount: 45,
      eventDate: '2026-07-27 (13:00 - 18:00)',
      fnbMenuPackage: 'International Buffet + 1x Coffee Break',
      avEquipment: 'Projector 4000 Lumens, Screen 2x2m, Pointer',
      status: 'APPROVED_DISTRIBUTED'
    }
  ]);

  const columns: ColumnDef<BeoSheetRecord>[] = [
    { key: 'beoNumber', header: 'No. BEO Sheet', className: 'font-mono font-bold text-purple-600 dark:text-purple-400', render: (i) => i.beoNumber },
    { key: 'eventName', header: 'Nama Event & Klien B2B', render: (i) => <div><div className="font-bold text-slate-900 dark:text-white">{i.eventName}</div><div className="text-[10px] text-slate-400 font-mono">{i.clientCompany}</div></div> },
    { key: 'functionRoom', header: 'Ruangan & Layout Setup', render: (i) => <div><div className="font-mono font-bold text-slate-700 dark:text-slate-200">{i.functionRoom}</div><div className="text-[9px] text-purple-600 font-bold font-mono">Setup: {i.setupStyle}</div></div> },
    { key: 'attendeeCount', header: 'Peserta', align: 'center', className: 'font-mono font-bold text-sky-600', render: (i) => `${i.attendeeCount} Pax` },
    { key: 'fnbMenuPackage', header: 'Paket F&B Catering', className: 'font-mono text-[10px]', render: (i) => i.fnbMenuPackage },
    { key: 'eventDate', header: 'Jadwal Acara', className: 'font-mono text-slate-500', render: (i) => i.eventDate },
    { key: 'status', header: 'Status BEO', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-purple-500/10 text-purple-600 font-bold font-mono text-[10px] rounded border border-purple-500/20">{i.status}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Banquet Event Order (BEO) MICE Sheet"
        icon={FileSpreadsheet}
        iconBgColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        glossaryTitle="Glossary Banquet Event Order (BEO)"
        glossaryItems={[
          { term: 'BEO Sheet', description: 'Lembar kerja operasional resmi MICE yang didistribusikan ke Dapur/Kitchen, Banquet Ops, AV Technician, & Finance.' },
          { term: 'Layout Setup', description: 'Konfigurasi meja & kursi (Theater, Classroom, U-Shape, Banquet Round Table).' }
        ]}
        actions={
          <button onClick={() => alert('Terbitkan BEO Sheet Baru')} className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Terbitkan BEO Sheet Baru</span>
          </button>
        }
      />

      <DataTable headerTitle="Daftar Banquet Event Order (BEO Sheet MICE & Wedding)" columns={columns} data={beoList} keyExtractor={(i) => i.id} />
    </div>
  );
};
