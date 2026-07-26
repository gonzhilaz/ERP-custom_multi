'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface ManagerialAuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: string;
  targetEntity: string;
  details: string;
}

const MOCK_MGR_AUDIT: ManagerialAuditLogItem[] = [
  { id: 'mga-01', timestamp: '2026-07-25 14:00:00', userName: 'Bpk. Irfan CEO', userRole: 'HOLDING_CEO', actionType: 'APPROVE_BUDGET_REVISION', targetEntity: 'BUDGET-2026-Q3', details: 'Persetujuan adendum revisi anggaran ekspansi site tambang baru sebesar Rp 2.500.000.000' }
];

export const ManagerialAuditLogView = () => {
  const columns: ColumnDef<ManagerialAuditLogItem>[] = [
    { key: 'timestamp', header: 'Waktu Transaksi', className: 'font-mono text-slate-500', render: (i) => i.timestamp },
    { key: 'userName', header: 'User Direksi / CEO', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.userName },
    { key: 'userRole', header: 'Role Hak Akses', render: (i) => <span className="px-2 py-0.5 bg-purple-500/10 text-purple-600 font-bold font-mono text-[10px] rounded">{i.userRole}</span> },
    { key: 'actionType', header: 'Jenis Keputusan', align: 'center', className: 'font-mono font-bold', render: (i) => i.actionType },
    { key: 'targetEntity', header: 'Target Entitas Dokumen', className: 'font-mono font-bold text-purple-600 dark:text-purple-400', render: (i) => i.targetEntity },
    { key: 'details', header: 'Rincian Perubahan Audit', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log"
        icon={ShieldCheck}
        iconBgColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        glossaryTitle="Glossary Audit Log Manajerial"
        glossaryItems={[{ term: 'Executive Governance', description: 'Pelacakan keputusan strategis direksi, adendum legal, & persetujuan anggaran.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Permanent Decision Making & Adendum Legal DMS" columns={columns} data={MOCK_MGR_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
