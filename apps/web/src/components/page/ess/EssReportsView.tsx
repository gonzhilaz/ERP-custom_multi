'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface EssReportItem {
  id: string;
  employeeName: string;
  leaveBalanceRemaining: number;
  totalClaimsThisMonth: string;
  overtimeHoursCount: number;
  attendancePunctualityPct: string;
}

const MOCK_ESS_REPORTS: EssReportItem[] = [
  { id: 'er-01', employeeName: 'Budi Santoso', leaveBalanceRemaining: 8, totalClaimsThisMonth: 'Rp 450.000', overtimeHoursCount: 12, attendancePunctualityPct: '98.5%' }
];

export const EssReportsView = () => {
  const columns: ColumnDef<EssReportItem>[] = [
    { key: 'employeeName', header: 'Nama Karyawan', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.employeeName },
    { key: 'leaveBalanceRemaining', header: 'Sisa Cuti Tahunan', align: 'center', className: 'font-bold font-mono', render: (i) => `${i.leaveBalanceRemaining} Hari` },
    { key: 'totalClaimsThisMonth', header: 'Klaim Disetujui', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.totalClaimsThisMonth },
    { key: 'overtimeHoursCount', header: 'Total Jam Lembur', align: 'center', className: 'font-mono font-bold', render: (i) => `${i.overtimeHoursCount} Jam` },
    { key: 'attendancePunctualityPct', header: 'Kedisiplinan Mandiri', align: 'center', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.attendancePunctualityPct }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan Self Service"
        icon={BarChart3}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Laporan Layanan Mandiri Karyawan"
        glossaryItems={[{ term: 'Personal Analytics', description: 'Rekapitulasi sisa kuota cuti, total jam lembur, & klaim pengeluaran dinas personal.' }]}
      />
      <DataTable headerTitle="Laporan Rekapitulasi Cuti, Lembur, & Klaim Reimbursement Karyawan" columns={columns} data={MOCK_ESS_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
