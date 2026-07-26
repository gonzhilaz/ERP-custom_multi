'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface FinanceAuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: string;
  targetEntity: string;
  details: string;
}

const MOCK_FINANCE_AUDIT: FinanceAuditLogItem[] = [
  { id: 'fa-01', timestamp: '2026-07-25 11:20:15', userName: 'Bpk. Hendra Director', userRole: 'FINANCE_DIRECTOR', actionType: 'APPROVE_PAYMENT', targetEntity: 'BILL-SUP-2026-089', details: 'Persetujuan pelunasan AP PT Meat Prima Importindo sebesar Rp 45.000.000' }
];

export const FinanceAuditLogView = () => {
  const columns: ColumnDef<FinanceAuditLogItem>[] = [
    { key: 'timestamp', header: 'Waktu Transaksi', className: 'font-mono text-slate-500', render: (i) => i.timestamp },
    { key: 'userName', header: 'User Pengakses', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.userName },
    { key: 'userRole', header: 'Role Hak Akses', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.userRole}</span> },
    { key: 'actionType', header: 'Jenis Tindakan', align: 'center', className: 'font-mono font-bold', render: (i) => i.actionType },
    { key: 'targetEntity', header: 'Target Dokumen ID', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => i.targetEntity },
    { key: 'details', header: 'Rincian Perubahan Audit', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log"
        icon={ShieldCheck}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Audit Log Finance"
        glossaryItems={[{ term: 'Immutable Audit Trail', description: 'Catatan permanen riwayat persetujuan, jurnal otomatis, & pelunasan kas bank.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Permanent Mutasi Keuangan & Settlement" columns={columns} data={MOCK_FINANCE_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
