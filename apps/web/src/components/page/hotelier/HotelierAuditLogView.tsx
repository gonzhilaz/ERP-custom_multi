'use client';

import React from 'react';
import { ShieldCheck, History } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  actionType: string;
  entityId: string;
  details: string;
}

const MOCK_HOTEL_AUDIT_LOGS: AuditLogItem[] = [
  { id: 'al-01', timestamp: '2026-07-25 14:10:22', user: 'receptionist_01', role: 'Front Desk Agent', actionType: 'CHECK_IN', entityId: 'ROOM_301', details: 'Check-in tamu Bpk. Irfan Saputra (Folio #FOL-9921)' },
  { id: 'al-02', timestamp: '2026-07-25 11:45:00', user: 'hotel_manager', role: 'Hotel Manager', actionType: 'RATE_OVERRIDE', entityId: 'ROOM_305', details: 'Override publish rate dari Rp 1.500.000 menjadi Rp 1.200.000 (Diskon Corporate)' },
  { id: 'al-03', timestamp: '2026-07-25 08:30:15', user: 'housekeeping_lead', role: 'Housekeeping', actionType: 'STATUS_CHANGE', entityId: 'ROOM_204', details: 'Ubah status kamar dari VACANT_DIRTY menjadi VACANT_CLEAN' }
];

export const HotelierAuditLogView = () => {
  const columns: ColumnDef<AuditLogItem>[] = [
    { key: 'timestamp', header: 'Timestamp', className: 'font-mono text-slate-500 dark:text-slate-400', render: (item) => item.timestamp },
    { key: 'user', header: 'User Operational', className: 'font-bold text-slate-900 dark:text-white', render: (item) => item.user },
    { key: 'role', header: 'Role Jabatan', render: (item) => <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-[10px]">{item.role}</span> },
    { key: 'actionType', header: 'Tipe Aksi Audit', align: 'center', render: (item) => <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 font-bold font-mono text-[10px] rounded">{item.actionType}</span> },
    { key: 'entityId', header: 'Target Entity ID', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (item) => item.entityId },
    { key: 'details', header: 'Rincian Aktivitas', className: 'text-slate-600 dark:text-slate-300', render: (item) => item.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log Hotel"
        icon={History}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Audit Log Hotelier"
        glossaryItems={[
          { term: 'Audit Trail', description: 'Catatan permanen waktu, user, role, dan detail perubahan data kamar.' },
          { term: 'Rate Override Log', description: 'Log aktivitas pengubahan harga publish kamar oleh manajer.' }
        ]}
      />

      <DataTable
        headerTitle="Catatan Jejak Audit Security & Operasional Hotelier PMS"
        columns={columns}
        data={MOCK_HOTEL_AUDIT_LOGS}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
};
