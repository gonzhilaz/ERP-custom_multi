'use client';

import React from 'react';
import { BarChart3, Download } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface HrdReportItem {
  id: string;
  reportName: string;
  period: string;
  employeeCount: number;
  totalAmount: string;
  generatedDate: string;
}

const MOCK_HRD_REPORTS: HrdReportItem[] = [
  { id: 'hr-rep-01', reportName: 'Rekapitulasi Gaji & PPh 21 Masa Juli 2026', period: 'Juli 2026', employeeCount: 145, totalAmount: 'Rp 685.400.000', generatedDate: '2026-07-25' }
];

export const HrdReportsView = () => {
  const columns: ColumnDef<HrdReportItem>[] = [
    { key: 'reportName', header: 'Nama Laporan HRD', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.reportName },
    { key: 'period', header: 'Periode Laporan', className: 'font-mono', render: (i) => i.period },
    { key: 'employeeCount', header: 'Jumlah Pegawai', align: 'center', className: 'font-bold', render: (i) => `${i.employeeCount} Karyawan` },
    { key: 'totalAmount', header: 'Total Nilai Nominal', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.totalAmount },
    { key: 'generatedDate', header: 'Tanggal Terbit', className: 'font-mono text-slate-500', render: (i) => i.generatedDate },
    {
      key: 'id',
      header: 'Export Dokumen',
      align: 'center',
      render: () => (
        <button onClick={() => alert('Download Laporan HRD PDF/Excel')} className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer mx-auto text-[11px]">
          <Download className="w-3 h-3" />
          <span>Export PDF</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan HRD"
        icon={BarChart3}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Laporan HRD & Payroll"
        glossaryItems={[{ term: 'Rekapitulasi PPh 21', description: 'Rincian pemotongan PPh 21 bulanan dan iuran BPJS Ketenagakerjaan.' }]}
      />
      <DataTable headerTitle="Pusat Laporan SDM, Rekap Gaji, & Pajak PPh 21 Karyawan" columns={columns} data={MOCK_HRD_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
