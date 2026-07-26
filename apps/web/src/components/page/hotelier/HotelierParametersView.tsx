'use client';

import React, { useState } from 'react';
import { Sliders, Tag, Settings, BedDouble } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { GuestSegmentParamView } from './parameters/GuestSegmentParamView';
import { RoomTypeParamView } from './parameters/RoomTypeParamView';
import { CheckInCheckoutParamView } from './parameters/CheckInCheckoutParamView';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { Clock } from 'lucide-react';

interface HotelParameterItem {
  id: string;
  category: string;
  paramKey: string;
  paramValue: string;
  description: string;
}

const MOCK_HOTEL_PARAMS: HotelParameterItem[] = [
  { id: 'hp-01', category: 'Night Audit Engine', paramKey: 'AUTO_NIGHT_AUDIT_EXECUTION_TIME', paramValue: '02:00 AM WIB', description: 'Waktu otomatis eksekusi posting kamar harian ke GL & penutupan transaksi folio harian' },
  { id: 'hp-02', category: 'Extra Bed & Child Rate', paramKey: 'EXTRA_BED_PER_NIGHT_TARIFF', paramValue: 'Rp 250.000 / Malam', description: 'Tarif tambahan per kasur ekstra termasuk sarapan pagi 1 pax' },
  { id: 'hp-03', category: 'Tax & Service Hotel', paramKey: 'HOTEL_ROOM_TAX_AND_SERVICE_PCT', paramValue: 'Pajak Daerah 10% + Service 10%', description: 'Beban service charge dan pajak hotel pada tagihan guest folio' }
];

export const HotelierParametersView = () => {
  const [activeTab, setActiveTab] = useState<'ROOM_TYPES' | 'SEGMENTS' | 'CHECKIN_RULES' | 'GENERAL_SETTINGS'>('ROOM_TYPES');
  const [params, setParams] = useState<HotelParameterItem[]>(MOCK_HOTEL_PARAMS);

  const subTabs: SubTabItem[] = [
    { id: 'ROOM_TYPES', label: 'Tipe Kamar', icon: BedDouble },
    { id: 'SEGMENTS', label: 'Segmentasi Tamu', icon: Tag },
    { id: 'CHECKIN_RULES', label: 'Jam Check-in & Checkout', icon: Clock },
    { id: 'GENERAL_SETTINGS', label: 'Night Audit & General', icon: Settings }
  ];

  const columns: ColumnDef<HotelParameterItem>[] = [
    { key: 'category', header: 'Kategori Parameter', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.category },
    { key: 'paramKey', header: 'Kode Parameter System', className: 'font-mono text-sky-600 dark:text-sky-400 font-semibold', render: (i) => i.paramKey },
    { key: 'paramValue', header: 'Nilai Acuan', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.paramValue },
    { key: 'description', header: 'Deskripsi Keterangan', render: (i) => i.description }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Pengaturan Parameter Hotel"
        icon={Sliders}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Master Parameters Hotel"
        glossaryItems={[
          { term: 'Master Tipe Kamar', description: 'Pengelolaan dinamis kategori kamar (Deluxe 1 King Bed, Deluxe Twin Beds, Executive Suite).' },
          { term: 'Master Jam Check-in', description: 'Aturan standar jam 14:00 check-in, 12:00 checkout, denda late checkout & deposit jaminan.' }
        ]}
        badges={[
          { label: 'Zero Hardcoded Master Data', variant: 'emerald' }
        ]}
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
      />

      {activeTab === 'ROOM_TYPES' && <RoomTypeParamView />}
      {activeTab === 'SEGMENTS' && <GuestSegmentParamView />}
      {activeTab === 'CHECKIN_RULES' && <CheckInCheckoutParamView />}
      {activeTab === 'GENERAL_SETTINGS' && (
        <DataTable
          headerTitle="Pengaturan General System & Param Waktu Night Audit"
          columns={columns}
          data={params}
          keyExtractor={(i) => i.id}
        />
      )}
    </div>
  );
};
