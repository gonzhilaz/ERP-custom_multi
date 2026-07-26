'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface CrmReportItem {
  id: string;
  salesPerson: string;
  leadsHandled: number;
  closedDeals: number;
  revenueGenerated: string;
  winRatePct: string;
}

const MOCK_CRM_REPORTS: CrmReportItem[] = [
  { id: 'cr-01', salesPerson: 'Deni Kurniawan (Account Exec)', leadsHandled: 15, closedDeals: 6, revenueGenerated: 'Rp 1.200.000.000', winRatePct: '40.0%' }
];

export const CrmReportsView = () => {
  const columns: ColumnDef<CrmReportItem>[] = [
    { key: 'salesPerson', header: 'Account Executive / Sales', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.salesPerson },
    { key: 'leadsHandled', header: 'Prospek Ditangani', align: 'center', className: 'font-mono', render: (i) => `${i.leadsHandled} Lead` },
    { key: 'closedDeals', header: 'Deals Won', align: 'center', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => `${i.closedDeals} Deals` },
    { key: 'revenueGenerated', header: 'Total Revenue Win', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.revenueGenerated },
    { key: 'winRatePct', header: 'Win Rate (%)', align: 'center', className: 'font-mono font-bold', render: (i) => i.winRatePct }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan Penjualan CRM"
        icon={BarChart3}
        iconBgColor="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        glossaryTitle="Glossary Laporan Performa CRM"
        glossaryItems={[{ term: 'Sales Productivity', description: 'Rekapitulasi pencapaian target komisi & perolehan kontrak baru account executive.' }]}
      />
      <DataTable headerTitle="Laporan Performa Account Executive & Rekapitulasi Pipeline Win Rate" columns={columns} data={MOCK_CRM_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
