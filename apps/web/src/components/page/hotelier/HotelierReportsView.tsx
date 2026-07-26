'use client';

import React from 'react';
import { BarChart3, Download, Calendar } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface HotelReportItem {
  id: string;
  reportDate: string;
  totalRooms: number;
  occupiedRooms: number;
  occupancyPct: string;
  adrAmount: string;
  revParAmount: string;
  totalRevenue: string;
}

const MOCK_HOTEL_REPORTS: HotelReportItem[] = [
  { id: 'hr-01', reportDate: '2026-07-24', totalRooms: 38, occupiedRooms: 32, occupancyPct: '84.2%', adrAmount: 'Rp 1.450.000', revParAmount: 'Rp 1.220.900', totalRevenue: 'Rp 46.400.000' },
  { id: 'hr-02', reportDate: '2026-07-23', totalRooms: 38, occupiedRooms: 35, occupancyPct: '92.1%', adrAmount: 'Rp 1.500.000', revParAmount: 'Rp 1.381.500', totalRevenue: 'Rp 52.500.000' },
  { id: 'hr-03', reportDate: '2026-07-22', totalRooms: 38, occupiedRooms: 30, occupancyPct: '78.9%', adrAmount: 'Rp 1.400.000', revParAmount: 'Rp 1.104.600', totalRevenue: 'Rp 42.000.000' }
];

export const HotelierReportsView = () => {
  const columns: ColumnDef<HotelReportItem>[] = [
    { key: 'reportDate', header: 'Tanggal Laporan', className: 'font-mono font-bold text-slate-900 dark:text-white', render: (item) => item.reportDate },
    { key: 'totalRooms', header: 'Total Kamar', align: 'center', render: (item) => `${item.totalRooms} Unit` },
    { key: 'occupiedRooms', header: 'Kamar Terisi', align: 'center', className: 'font-bold text-sky-600 dark:text-sky-400', render: (item) => `${item.occupiedRooms} Unit` },
    { key: 'occupancyPct', header: 'Okupansi %', align: 'center', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (item) => item.occupancyPct },
    { key: 'adrAmount', header: 'ADR (Average Rate)', align: 'right', className: 'font-mono font-bold', render: (item) => item.adrAmount },
    { key: 'revParAmount', header: 'RevPAR', align: 'right', className: 'font-mono font-bold', render: (item) => item.revParAmount },
    { key: 'totalRevenue', header: 'Total Revenue Harian', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (item) => item.totalRevenue }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan Hotel"
        icon={BarChart3}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Laporan Hotelier PMS"
        glossaryItems={[
          { term: 'RevPAR', description: 'Revenue Per Available Room - Total pendapatan kamar dibagi seluruh kamar tersedia.' },
          { term: 'ADR', description: 'Average Daily Rate - Rata-rata harga jual per kamar terisi.' }
        ]}
        actions={
          <button
            onClick={() => alert('Export Laporan Hotel (.PDF / .XLSX)')}
            className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export Laporan</span>
          </button>
        }
      />

      <DataTable
        headerTitle="Laporan Rekapitulasi Pendapatan & Okupansi Hotel Harian"
        columns={columns}
        data={MOCK_HOTEL_REPORTS}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
};
