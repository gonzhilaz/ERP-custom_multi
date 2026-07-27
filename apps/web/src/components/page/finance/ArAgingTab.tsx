'use client';

import React, { useState } from 'react';
import { Clock, AlertCircle, Eye } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

interface ArAgingRow {
  customerName: string;
  totalAr: number;
  current: number; // 0-30 Hari
  days31to60: number; // 31-60 Hari
  days61to90: number; // 61-90 Hari
  over90: number; // >90 Hari
  badDebtProvision: number; // Allowance
}

export const ArAgingTab = () => {
  const [selectedRow, setSelectedRow] = useState<ArAgingRow | null>(null);

  const agingData: ArAgingRow[] = [
    { customerName: 'PT Nusantara Jaya Mandiri', totalAr: 45000000, current: 45000000, days31to60: 0, days61to90: 0, over90: 0, badDebtProvision: 0 },
    { customerName: 'PT Kalimantan Mining Resources', totalAr: 250000000, current: 150000000, days31to60: 100000000, days61to90: 0, over90: 0, badDebtProvision: 1000000 },
    { customerName: 'CV Resto Mitra Sejahtera', totalAr: 18500000, current: 0, days31to60: 8500000, days61to90: 10000000, over90: 0, badDebtProvision: 500000 },
    { customerName: 'PT Hotel Internasional Kaltim', totalAr: 62000000, current: 0, days31to60: 0, days61to90: 12000000, over90: 50000000, badDebtProvision: 25000000 }
  ];

  const totalCurrent = agingData.reduce((acc, curr) => acc + curr.current, 0);
  const total31to60 = agingData.reduce((acc, curr) => acc + curr.days31to60, 0);
  const total61to90 = agingData.reduce((acc, curr) => acc + curr.days61to90, 0);
  const totalOver90 = agingData.reduce((acc, curr) => acc + curr.over90, 0);
  const grandTotal = agingData.reduce((acc, curr) => acc + curr.totalAr, 0);
  const totalProvision = agingData.reduce((acc, curr) => acc + curr.badDebtProvision, 0);

  const columns: ColumnDef<ArAgingRow>[] = [
    { key: 'customerName', header: 'Nama Pelanggan (Customer)', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.customerName },
    { key: 'current', header: 'Lancar (0-30 Hr)', align: 'right', className: 'font-mono text-emerald-600 dark:text-emerald-400 font-bold', render: (i) => `Rp ${i.current.toLocaleString('id-ID')}` },
    { key: 'days31to60', header: '31-60 Hari', align: 'right', className: 'font-mono text-sky-600 dark:text-sky-400 font-bold', render: (i) => `Rp ${i.days31to60.toLocaleString('id-ID')}` },
    { key: 'days61to90', header: '61-90 Hari', align: 'right', className: 'font-mono text-amber-600 dark:text-amber-400 font-bold', render: (i) => `Rp ${i.days61to90.toLocaleString('id-ID')}` },
    { key: 'over90', header: '>90 Hari (Macet)', align: 'right', className: 'font-mono text-rose-600 dark:text-rose-400 font-bold', render: (i) => `Rp ${i.over90.toLocaleString('id-ID')}` },
    { key: 'totalAr', header: 'Total Piutang (Rp)', align: 'right', className: 'font-mono font-extrabold text-slate-900 dark:text-white', render: (i) => `Rp ${i.totalAr.toLocaleString('id-ID')}` },
    { key: 'badDebtProvision', header: 'Cadangan Bad Debt', align: 'right', className: 'font-mono text-rose-500 font-semibold', render: (i) => `Rp ${i.badDebtProvision.toLocaleString('id-ID')}` },
    {
      key: 'actions',
      header: 'Detail',
      align: 'center',
      render: (i) => (
        <button
          onClick={() => setSelectedRow(i)}
          className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
          title="Lihat Detail Umur Piutang Pelanggan"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Lancar (0-30 Hari)</span>
          <p className="font-mono font-bold text-sm text-emerald-600">Rp {totalCurrent.toLocaleString('id-ID')}</p>
        </div>
        <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-2xl">
          <span className="text-[10px] font-bold text-sky-600 uppercase">31-60 Hari</span>
          <p className="font-mono font-bold text-sm text-sky-600">Rp {total31to60.toLocaleString('id-ID')}</p>
        </div>
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
          <span className="text-[10px] font-bold text-amber-600 uppercase">61-90 Hari</span>
          <p className="font-mono font-bold text-sm text-amber-600">Rp {total61to90.toLocaleString('id-ID')}</p>
        </div>
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
          <span className="text-[10px] font-bold text-rose-600 uppercase">&gt;90 Hari (Macet)</span>
          <p className="font-mono font-bold text-sm text-rose-600">Rp {totalOver90.toLocaleString('id-ID')}</p>
        </div>
        <div className="p-3 bg-slate-900 text-white rounded-2xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Cadangan Bad Debt</span>
          <p className="font-mono font-bold text-sm text-rose-400">Rp {totalProvision.toLocaleString('id-ID')}</p>
        </div>
      </div>

      <DataTable
        headerTitle="Tabel Analisis Umur Piutang Dagang (AR Aging Schedule)"
        columns={columns}
        data={agingData}
        keyExtractor={(i) => i.customerName}
      />

      <FinanceItemDetailModal
        isOpen={selectedRow !== null}
        onClose={() => setSelectedRow(null)}
        title="Detail Analisis Umur Piutang Pelanggan"
        subtitle={selectedRow?.customerName}
        badgeLabel={selectedRow && selectedRow.over90 > 0 ? 'RISIKO MACET' : 'LANCAR'}
        badgeType={selectedRow && selectedRow.over90 > 0 ? 'ALERT' : 'ACTIVE'}
        summaryCards={[
          { label: 'Total Piutang', value: selectedRow ? `Rp ${selectedRow.totalAr.toLocaleString('id-ID')}` : '0' },
          { label: '0-30 Hari', value: selectedRow ? `Rp ${selectedRow.current.toLocaleString('id-ID')}` : '0', color: 'text-emerald-600' },
          { label: '31-60 Hari', value: selectedRow ? `Rp ${selectedRow.days31to60.toLocaleString('id-ID')}` : '0', color: 'text-sky-600' },
          { label: 'Cadangan Bad Debt', value: selectedRow ? `Rp ${selectedRow.badDebtProvision.toLocaleString('id-ID')}` : '0', color: 'text-rose-600' }
        ]}
        metadata={[
          { label: 'Nama Pelanggan', value: selectedRow?.customerName, highlight: true },
          { label: 'Term Kredit Customer', value: 'Credit Limit 30 Hari' },
          { label: 'Cadangan Piutang Ragu', value: selectedRow ? `Rp ${selectedRow.badDebtProvision.toLocaleString('id-ID')}` : '0', mono: true }
        ]}
        lineItemsHeader="Breakdown Invoice Tagihan Pelanggan"
        columns={[
          { header: 'No. Invoice AR', accessor: 'invoiceNo', mono: true },
          { header: 'Tanggal Penjualan', accessor: 'saleDate' },
          { header: 'Jatuh Tempo', accessor: 'dueDate' },
          { header: 'Kategori Aging', accessor: 'agingCategory' },
          { header: 'Nominal Piutang', accessor: 'amount', align: 'right', isCurrency: true }
        ]}
        lineItems={[
          { invoiceNo: 'INV-CLI-2026-104', saleDate: '2026-07-05', dueDate: '2026-08-10', agingCategory: '0-30 Hari (Lancar)', amount: selectedRow?.current || 0 },
          { invoiceNo: 'INV-CLI-2026-099', saleDate: '2026-06-10', dueDate: '2026-07-10', agingCategory: '31-60 Hari', amount: selectedRow?.days31to60 || 0 }
        ].filter(item => item.amount > 0)}
        footerNotes="Cadangan piutang tak tertagih (Allowance for Bad Debt) dibentuk secara otomatis sesuai standar PSAK."
      />
    </div>
  );
};

