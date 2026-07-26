'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface SettingsReportItem {
  id: string;
  tenantDomain: string;
  userLicensesCount: number;
  securityRoleMatrix: string;
  lastSecurityScan: string;
}

const MOCK_SETTINGS_REPORTS: SettingsReportItem[] = [
  { id: 'sr-01', tenantDomain: 'Nusantara Group HO', userLicensesCount: 150, securityRoleMatrix: 'RBAC_STRICT', lastSecurityScan: '2026-07-25 00:00' }
];

export const SettingsReportsView = () => {
  const columns: ColumnDef<SettingsReportItem>[] = [
    { key: 'tenantDomain', header: 'Domain Tenant', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.tenantDomain },
    { key: 'userLicensesCount', header: 'Lisensi User Active', align: 'center', className: 'font-bold font-mono', render: (i) => `${i.userLicensesCount} User` },
    { key: 'securityRoleMatrix', header: 'Matriks Keamanan RBAC', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.securityRoleMatrix}</span> },
    { key: 'lastSecurityScan', header: 'Uji Keamanan Terakhir', className: 'font-mono text-slate-500', render: (i) => i.lastSecurityScan }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan System"
        icon={BarChart3}
        iconBgColor="bg-slate-500/10 text-slate-600 dark:text-slate-400"
        glossaryTitle="Glossary Laporan Pengaturan & Keamanan"
        glossaryItems={[{ term: 'Security Audit', description: 'Rekapitulasi alokasi lisensi user, matriks RBAC, & audit keamanan tenant.' }]}
      />
      <DataTable headerTitle="Laporan Lisensi Pengguna, Matriks Role Access Control, & Security Audit" columns={columns} data={MOCK_SETTINGS_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
