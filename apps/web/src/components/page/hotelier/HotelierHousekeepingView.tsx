'use client';

import React, { useState } from 'react';
import { Sparkles, Plus, CheckCircle2, AlertTriangle, ShieldAlert, Package, Wine, PackageCheck, Wrench } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { DynamicSearchFilter, FilterOption } from '@/components/ui/forms/DynamicSearchFilter';
import { MinibarInspectionTab } from './MinibarInspectionTab';
import { RoomAmenitiesChecklistTab } from './RoomAmenitiesChecklistTab';
import { RoomMaintenanceDefectTab } from './RoomMaintenanceDefectTab';

interface HousekeepingTask {
  id: string;
  roomNumber: string;
  cleaningStatus: 'VACANT_CLEAN' | 'VACANT_DIRTY' | 'OCCUPIED_CLEAN' | 'OCCUPIED_DIRTY' | 'OUT_OF_ORDER';
  assignedStaff: string;
  floor: number;
  linenChangedCount: number;
  lastCleanedTime: string;
}

const MOCK_HOUSEKEEPING: HousekeepingTask[] = [
  { id: 'hk-01', roomNumber: 'RM-101', cleaningStatus: 'OCCUPIED_CLEAN', assignedStaff: 'Ahmad Subagyo', floor: 1, linenChangedCount: 4, lastCleanedTime: '2026-07-26 09:15' },
  { id: 'hk-02', roomNumber: 'RM-102', cleaningStatus: 'VACANT_CLEAN', assignedStaff: 'Dewi Lestari', floor: 1, linenChangedCount: 6, lastCleanedTime: '2026-07-26 11:30' },
  { id: 'hk-03', roomNumber: 'RM-201', cleaningStatus: 'OCCUPIED_DIRTY', assignedStaff: 'Ahmad Subagyo', floor: 2, linenChangedCount: 2, lastCleanedTime: '2026-07-25 16:45' },
  { id: 'hk-04', roomNumber: 'RM-202', cleaningStatus: 'OUT_OF_ORDER', assignedStaff: 'Chief Engineer Budi', floor: 2, linenChangedCount: 0, lastCleanedTime: '2026-07-24 14:00' }
];

export const HotelierHousekeepingView = () => {
  const [activeTab, setActiveTab] = useState<'STATUS_BOARD' | 'MINIBAR' | 'AMENITIES' | 'DEFECTS'>('STATUS_BOARD');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTasks = MOCK_HOUSEKEEPING.filter((t) => {
    const matchesSearch =
      t.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignedStaff.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || t.cleaningStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const subTabs: SubTabItem[] = [
    { id: 'STATUS_BOARD', label: 'Status Board Kamar', icon: Sparkles },
    { id: 'MINIBAR', label: 'Inspeksi Minibar', icon: Wine },
    { id: 'AMENITIES', label: 'Checklist Amenities & Linen', icon: PackageCheck },
    { id: 'DEFECTS', label: 'Defect Maintenance (OOO)', icon: Wrench }
  ];

  const getStatusBadge = (status: HousekeepingTask['cleaningStatus']) => {
    switch (status) {
      case 'VACANT_CLEAN':
        return <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded border border-emerald-500/20">VC - Vacant Clean</span>;
      case 'VACANT_DIRTY':
        return <span className="px-2 py-0.5 bg-rose-500/10 text-rose-600 font-bold font-mono text-[10px] rounded border border-rose-500/20">VD - Vacant Dirty</span>;
      case 'OCCUPIED_CLEAN':
        return <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded border border-sky-500/20">OC - Occupied Clean</span>;
      case 'OCCUPIED_DIRTY':
        return <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 font-bold font-mono text-[10px] rounded border border-amber-500/20">OD - Occupied Dirty</span>;
      case 'OUT_OF_ORDER':
        return <span className="px-2 py-0.5 bg-slate-200 text-slate-700 font-bold font-mono text-[10px] rounded border border-slate-300">OOO - Out of Order</span>;
    }
  };

  const columns: ColumnDef<HousekeepingTask>[] = [
    { key: 'roomNumber', header: 'No. Kamar', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.roomNumber },
    { key: 'cleaningStatus', header: 'Status Kebersihan PMS Matrix', align: 'center', render: (i) => getStatusBadge(i.cleaningStatus) },
    { key: 'assignedStaff', header: 'Petugas Shift Housekeeping', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.assignedStaff },
    { key: 'linenChangedCount', header: 'Ganti Linen (Pcs)', align: 'center', render: (i) => `${i.linenChangedCount} Pcs` },
    { key: 'lastCleanedTime', header: 'Waktu Terakhir Pembersihan', className: 'font-mono text-slate-500', render: (i) => i.lastCleanedTime }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Operasi Housekeeping"
        icon={Sparkles}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Housekeeping & Status Kamar"
        glossaryItems={[
          { term: 'Vacant Clean (VC)', description: 'Kamar kosong bersih, sudah di-inspeksi supervisor & siap huni.' },
          { term: 'Vacant Dirty (VD)', description: 'Kamar kosong kotor setelah check-out, memerlukan sanitasi & linen baru.' },
          { term: 'Out of Order (OOO)', description: 'Kamar tidak dapat disewakan karena perbaikan teknis / maintenance.' }
        ]}
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="amber"
      />

      {activeTab === 'STATUS_BOARD' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <div className="text-[10px] text-slate-400 font-semibold">Vacant Clean (VC)</div>
              <div className="text-lg font-bold font-mono text-emerald-600">8 Kamar</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <div className="text-[10px] text-slate-400 font-semibold">Vacant Dirty (VD)</div>
              <div className="text-lg font-bold font-mono text-rose-600">3 Kamar</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <div className="text-[10px] text-slate-400 font-semibold">Occupied (OC/OD)</div>
              <div className="text-lg font-bold font-mono text-sky-600">14 Kamar</div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-sm">
              <div className="text-[10px] text-slate-400 font-semibold">Out of Order (OOO)</div>
              <div className="text-lg font-bold font-mono text-slate-500">1 Kamar</div>
            </div>
          </div>

          <DynamicSearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Cari nomor kamar, nama petugas..."
            categoryValue={statusFilter}
            onCategoryChange={setStatusFilter}
            categoryOptions={[
              { label: 'Vacant Clean (VC)', value: 'VACANT_CLEAN' },
              { label: 'Vacant Dirty (VD)', value: 'VACANT_DIRTY' },
              { label: 'Occupied Clean (OC)', value: 'OCCUPIED_CLEAN' },
              { label: 'Occupied Dirty (OD)', value: 'OCCUPIED_DIRTY' },
              { label: 'Out of Order (OOO)', value: 'OUT_OF_ORDER' }
            ]}
            categoryPlaceholder="Semua Status Kebersihan"
            colorScheme="amber"
          />

          <DataTable headerTitle="Jadwal & Task Sheet Pembersihan Kamar PMS" columns={columns} data={filteredTasks} keyExtractor={(i) => i.id} />
        </div>
      )}

      {activeTab === 'MINIBAR' && <MinibarInspectionTab />}
      {activeTab === 'AMENITIES' && <RoomAmenitiesChecklistTab />}
      {activeTab === 'DEFECTS' && <RoomMaintenanceDefectTab />}
    </div>
  );
};
