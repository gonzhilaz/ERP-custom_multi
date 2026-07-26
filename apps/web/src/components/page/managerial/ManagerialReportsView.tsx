'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface ManagerialReportItem {
  id: string;
  unitDomain: string;
  revenueActual: string;
  budgetCap: string;
  ebitdaMarginPct: string;
  healthIndexStatus: string;
}

const MOCK_MGR_REPORTS: ManagerialReportItem[] = [
  { id: 'mgr-rep-01', unitDomain: 'Holding Enterprise HO', revenueActual: 'Rp 45.800.000.000', budgetCap: 'Rp 40.000.000.000', ebitdaMarginPct: '24.5%', healthIndexStatus: 'EXCELLENT' }
];

export const ManagerialReportsView = () => {
  const columns: ColumnDef<ManagerialReportItem>[] = [
    { key: 'unitDomain', header: 'Unit Bisnis / Domain', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.unitDomain },
    { key: 'revenueActual', header: 'Total Realisasi Revenue', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.revenueActual },
    { key: 'budgetCap', header: 'Pagu Anggaran (Budget)', align: 'right', className: 'font-mono', render: (i) => i.budgetCap },
    { key: 'ebitdaMarginPct', header: 'EBITDA Margin (%)', align: 'center', className: 'font-mono font-bold', render: (i) => i.ebitdaMarginPct },
    { key: 'healthIndexStatus', header: 'Status Kesehatan Bisnis', align: 'center', render: (i) => <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 font-bold text-[10px] rounded-full">{i.healthIndexStatus}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan Manajerial"
        icon={BarChart3}
        iconBgColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        glossaryTitle="Glossary Executive Executive Report"
        glossaryItems={[{ term: 'EBITDA Margin', description: 'Metrik rasio keuntungan operasional konsolidasi sebelum bunga, pajak, & depresiasi.' }]}
      />
      <DataTable headerTitle="Pusat Laporan Eksekutif Konsolidasi Holding & Unit Usaha" columns={columns} data={MOCK_MGR_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
