'use client';

import React, { useState } from 'react';
import { PhoneCall, Plus, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

interface ActivityRow {
  id: string;
  date: string;
  activityType: 'CALL' | 'MEETING' | 'SITE_VISIT' | 'DEMO' | 'PROPOSAL_SENT';
  customerName: string;
  picName: string;
  notes: string;
  nextFollowUp: string;
  salesPerson: string;
}

export const CrmActivitiesView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [activities, setActivities] = useState<ActivityRow[]>([
    { id: 'act-01', date: '2026-07-24', activityType: 'SITE_VISIT', customerName: 'PT Freeport Supplier Partner', picName: 'Bpk. Ir. Hendra Wijaya', notes: 'Survei lokasi area tambang & dapur lapangan katering massal site 2', nextFollowUp: '2026-07-28', salesPerson: 'Irfan Aries' },
    { id: 'act-02', date: '2026-07-23', activityType: 'MEETING', customerName: 'Kementerian ESDM Event Reserve', picName: 'Ibu Ratna Saraswati', notes: 'Meeting pembahasan menu katering VIP & alokasi kamar hotel resort', nextFollowUp: '2026-07-30', salesPerson: 'Siti Rahma' },
    { id: 'act-03', date: '2026-07-21', activityType: 'CALL', customerName: 'PT Kalimantan Mining Resources', picName: 'Bpk. H. Bambang Subagyo', notes: 'Follow-up via Call/WA penawaran sewa alat berat dump truck', nextFollowUp: '2026-08-01', salesPerson: 'Irfan Aries' }
  ]);

  const filtered = activities.filter(
    (a) =>
      a.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.picName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<ActivityRow>[] = [
    { key: 'date', header: 'Tanggal Log', className: 'font-mono text-slate-500', render: (i) => i.date },
    {
      key: 'activityType',
      header: 'Jenis Aktivitas',
      align: 'center',
      render: (i) => (
        <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded">
          {i.activityType}
        </span>
      )
    },
    { key: 'customerName', header: 'Perusahaan Client', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.customerName },
    { key: 'picName', header: 'PIC Kontak', className: 'font-bold text-sky-600', render: (i) => i.picName },
    { key: 'notes', header: 'Catatan Rangkuman Aktivitas', render: (i) => i.notes },
    { key: 'nextFollowUp', header: 'Jadwal Next Follow-Up', className: 'font-mono font-bold text-amber-600', render: (i) => i.nextFollowUp },
    { key: 'salesPerson', header: 'Sales Person', className: 'font-semibold text-slate-700', render: (i) => i.salesPerson }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Log Aktivitas & Follow-Up Sales (Sales Activity Register)"
        icon={PhoneCall}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Sales Activities Log"
        glossaryItems={[
          { term: 'Sales Activity Log', description: 'Catatan rekam jejak panggilan telp, meeting, site visit, dan email ke client.' },
          { term: 'Next Follow-Up Date', description: 'Jadwal pengingat otomatis untuk kontak ulang client.' }
        ]}
        badges={[
          { label: `${activities.length} Log Activity Recorded`, variant: 'sky' },
          { label: 'Role Restrict: Sales Executive', variant: 'slate' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari client, PIC, atau catatan..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`History Log Aktivitas Prospek & Follow-Up Client (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.id}
      />
    </div>
  );
};
