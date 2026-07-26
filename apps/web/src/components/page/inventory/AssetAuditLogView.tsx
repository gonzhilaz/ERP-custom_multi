'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface AssetAuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: string;
  targetEntity: string;
  details: string;
}

const MOCK_ASSET_AUDIT: AssetAuditLogItem[] = [
  { id: 'asa-01', timestamp: '2026-07-25 15:10:00', userName: 'Bpk. Irfan Asset Admin', userRole: 'ASSET_MANAGER', actionType: 'AUTO_POST_DEPRECIATION', targetEntity: 'AST-HO-001', details: 'Auto-post jurnal penyusutan bulanan Toyota HiAce Rp 6.770.833 ke GL Akumulasi Depresiasi' }
];

export const AssetAuditLogView = () => {
  const columns: ColumnDef<AssetAuditLogItem>[] = [
    { key: 'timestamp', header: 'Waktu Transaksi', className: 'font-mono text-slate-500', render: (i) => i.timestamp },
    { key: 'userName', header: 'User Pengelola Aset', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.userName },
    { key: 'userRole', header: 'Role Hak Akses', render: (i) => <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded">{i.userRole}</span> },
    { key: 'actionType', header: 'Jenis Mutasi Aset', align: 'center', className: 'font-mono font-bold', render: (i) => i.actionType },
    { key: 'targetEntity', header: 'Target Barcode Tag', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.targetEntity },
    { key: 'details', header: 'Rincian Jurnal / Pelepasan', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log"
        icon={ShieldCheck}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Audit Log Manajemen Aset"
        glossaryItems={[{ term: 'Asset Audit Trail', description: 'Pelacakan permanen riwayat auto-post penyusutan, pelepasan (disposal), & revaluasi aset.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Permanent Mutasi & Auto-Post Depresiasi Aset GL" columns={columns} data={MOCK_ASSET_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
