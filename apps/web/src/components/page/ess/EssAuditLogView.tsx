'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface EssAuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: string;
  targetEntity: string;
  details: string;
}

const MOCK_ESS_AUDIT: EssAuditLogItem[] = [
  { id: 'esa-01', timestamp: '2026-07-25 07:30:15', userName: 'Budi Santoso', userRole: 'EMPLOYEE', actionType: 'CLOCK_IN', targetEntity: 'ATTENDANCE-2507', details: 'Presensi masuk via Mobile GPS Geo-fencing (Titik Kantor HO Radius 15 meter)' }
];

export const EssAuditLogView = () => {
  const columns: ColumnDef<EssAuditLogItem>[] = [
    { key: 'timestamp', header: 'Waktu Transaksi', className: 'font-mono text-slate-500', render: (i) => i.timestamp },
    { key: 'userName', header: 'Nama Pegawai', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.userName },
    { key: 'userRole', header: 'Role Hak Akses', render: (i) => <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded">{i.userRole}</span> },
    { key: 'actionType', header: 'Jenis Aktivitas', align: 'center', className: 'font-mono font-bold', render: (i) => i.actionType },
    { key: 'targetEntity', header: 'Target Entitas', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.targetEntity },
    { key: 'details', header: 'Rincian GPS / Lampiran', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log"
        icon={ShieldCheck}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Audit Log Mandiri Karyawan"
        glossaryItems={[{ term: 'Self-Service Audit', description: 'Pelacakan permanen log presensi GPS, pengajuan cuti, & persetujuan klaim atasan.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Permanent Presensi GPS & Pengajuan Mandiri Karyawan" columns={columns} data={MOCK_ESS_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
