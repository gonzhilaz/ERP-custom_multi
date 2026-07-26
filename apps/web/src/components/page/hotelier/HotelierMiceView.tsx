'use client';

import React, { useState } from 'react';
import { UtensilsCrossed, Plus, FileSpreadsheet } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { BEOEventsManagementTab } from './BEOEventsManagementTab';

interface MiceEventItem {
  id: string;
  eventName: string;
  clientName: string;
  eventDate: string;
  paxCount: number;
  packageType: string;
  estimatedRevenue: string;
}

const MOCK_MICE_EVENTS: MiceEventItem[] = [
  { id: 'me-01', eventName: 'Rapat Kerja Nasional Kemenkeu 2026', clientName: 'Biro Umum Kemenkeu RI', eventDate: '2026-08-15', paxCount: 350, packageType: 'Fullboard Meeting + Grand Ballroom', estimatedRevenue: 'Rp 285.000.000' }
];

export const HotelierMiceView = () => {
  const [activeTab, setActiveTab] = useState<'BEO_SHEETS' | 'MICE_RESERVATIONS'>('BEO_SHEETS');

  const subTabs: SubTabItem[] = [
    { id: 'BEO_SHEETS', label: 'BEO Event Sheets', icon: FileSpreadsheet },
    { id: 'MICE_RESERVATIONS', label: 'Reservasi Ballroom & MICE', icon: UtensilsCrossed }
  ];

  const columns: ColumnDef<MiceEventItem>[] = [
    { key: 'eventName', header: 'Nama Event Banquet', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.eventName },
    { key: 'clientName', header: 'Klien Instansi / Corporate', render: (i) => i.clientName },
    { key: 'eventDate', header: 'Tanggal Event', className: 'font-mono', render: (i) => i.eventDate },
    { key: 'paxCount', header: 'Kapasitas Pax', align: 'center', className: 'font-bold', render: (i) => `${i.paxCount} Pax` },
    { key: 'packageType', header: 'Paket MICE Chosen', render: (i) => i.packageType },
    { key: 'estimatedRevenue', header: 'Estimasi Revenue', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.estimatedRevenue }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Operasi MICE & Ballroom"
        icon={UtensilsCrossed}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Banquet & MICE Estimator"
        glossaryItems={[{ term: 'MICE Estimator', description: 'Kalkulator estimasi pendapatan event Meeting, Incentive, Convention, Exhibition & BEO Sheet.' }]}
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="amber"
      />

      {activeTab === 'BEO_SHEETS' && <BEOEventsManagementTab />}
      {activeTab === 'MICE_RESERVATIONS' && (
        <DataTable headerTitle="Rancangan Event Ballroom & Estimasi Revenue MICE" columns={columns} data={MOCK_MICE_EVENTS} keyExtractor={(i) => i.id} />
      )}
    </div>
  );
};
