'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface HrdAuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: string;
  targetEntity: string;
  details: string;
}

const MOCK_HRD_AUDIT: HrdAuditLogItem[] = [
  { id: 'ha-01', timestamp: '2026-07-25 09:45:00', userName: 'Siti HR Manager', userRole: 'HR_MANAGER', actionType: 'DISBURSE_PAYROLL', targetEntity: 'PAYROLL-JULY-2026', details: 'Proses eksekusi transfer payroll masal 145 pegawai via Bank Mandiri Host-to-Host' }
];

export const HrdAuditLogView = () => {
  const columns: ColumnDef<HrdAuditLogItem>[] = [
    { key: 'timestamp', header: 'Waktu Transaksi', className: 'font-mono text-slate-500', render: (i) => i.timestamp },
    { key: 'userName', header: 'User HRD', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.userName },
    { key: 'userRole', header: 'Role Hak Akses', render: (i) => <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded">{i.userRole}</span> },
    { key: 'actionType', header: 'Jenis Perubahan', align: 'center', className: 'font-mono font-bold', render: (i) => i.actionType },
    { key: 'targetEntity', header: 'Target Data NIK / Payroll', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.targetEntity },
    { key: 'details', header: 'Rincian Perubahan', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log"
        icon={ShieldCheck}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Audit Log HRD"
        glossaryItems={[{ term: 'HR Audit Trail', description: 'Pelacakan permanen perubahan gaji, kenaikan jabatan, & mutasi status pegawai.' }]}
      />
      <DataTable headerTitle="Catatan Audit Permanent SDM & Pengubahan Master Gaji Pegawai" columns={columns} data={MOCK_HRD_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
