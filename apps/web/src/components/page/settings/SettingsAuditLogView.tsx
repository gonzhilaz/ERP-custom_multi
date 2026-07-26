'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface SettingsAuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: string;
  targetEntity: string;
  details: string;
}

const MOCK_SETTINGS_AUDIT: SettingsAuditLogItem[] = [
  { id: 'sa-01', timestamp: '2026-07-25 00:05:00', userName: 'Super Administrator', userRole: 'SUPER_ADMIN', actionType: 'UPDATE_RBAC_PERMISSIONS', targetEntity: 'ROLE_FINANCE_ADMIN', details: 'Pembaruan hak akses approval limit transaksi AP > Rp 50.000.000' }
];

export const SettingsAuditLogView = () => {
  const columns: ColumnDef<SettingsAuditLogItem>[] = [
    { key: 'timestamp', header: 'Waktu Transaksi', className: 'font-mono text-slate-500', render: (i) => i.timestamp },
    { key: 'userName', header: 'User Administrator', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.userName },
    { key: 'userRole', header: 'Role Hak Akses', render: (i) => <span className="px-2 py-0.5 bg-slate-500/10 text-slate-600 font-bold font-mono text-[10px] rounded">{i.userRole}</span> },
    { key: 'actionType', header: 'Jenis Perubahan Governance', align: 'center', className: 'font-mono font-bold', render: (i) => i.actionType },
    { key: 'targetEntity', header: 'Target Role / User ID', className: 'font-mono font-bold text-slate-700 dark:text-slate-300', render: (i) => i.targetEntity },
    { key: 'details', header: 'Rincian Perubahan', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log"
        icon={ShieldCheck}
        iconBgColor="bg-slate-500/10 text-slate-600 dark:text-slate-400"
        glossaryTitle="Glossary Audit Log Governance Sistem"
        glossaryItems={[{ term: 'System Governance Log', description: 'Pelacakan permanen pengubahan role RBAC, password reset, & matriks hirarki holding.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Permanent Akses Keamanan & Governance Pengaturan Sistem" columns={columns} data={MOCK_SETTINGS_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
