'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface CrmAuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: string;
  targetEntity: string;
  details: string;
}

const MOCK_CRM_AUDIT: CrmAuditLogItem[] = [
  { id: 'ca-01', timestamp: '2026-07-25 11:00:20', userName: 'Deni Sales Exec', userRole: 'SALES_EXECUTIVE', actionType: 'UPDATE_DEAL_STAGE', targetEntity: 'DEAL-KEMENKEU-2026', details: 'Perubahan status deal dari PROPOSAL menjadi CONTRACT_SIGNED (Nilai Rp 285.000.000)' }
];

export const CrmAuditLogView = () => {
  const columns: ColumnDef<CrmAuditLogItem>[] = [
    { key: 'timestamp', header: 'Waktu Transaksi', className: 'font-mono text-slate-500', render: (i) => i.timestamp },
    { key: 'userName', header: 'User Account Exec', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.userName },
    { key: 'userRole', header: 'Role Hak Akses', render: (i) => <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 font-bold font-mono text-[10px] rounded">{i.userRole}</span> },
    { key: 'actionType', header: 'Jenis Tindakan', align: 'center', className: 'font-mono font-bold', render: (i) => i.actionType },
    { key: 'targetEntity', header: 'Target Deal / Lead ID', className: 'font-mono font-bold text-blue-600 dark:text-blue-400', render: (i) => i.targetEntity },
    { key: 'details', header: 'Rincian Perubahan', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log"
        icon={ShieldCheck}
        iconBgColor="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        glossaryTitle="Glossary Audit Log CRM"
        glossaryItems={[{ term: 'CRM Audit Trail', description: 'Pelacakan permanen pemindahan status deal, kontak klien, & perolehan kontrak.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Permanent Mutasi Pipeline & Kontak Klien" columns={columns} data={MOCK_CRM_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
