'use client';

import React, { useState } from 'react';
import { Trash2, Plus, CheckCircle2, AlertOctagon, DollarSign } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

interface AssetDisposalRow {
  disposalNo: string;
  date: string;
  assetCode: string;
  assetName: string;
  bookValue: number;
  salePrice: number;
  gainLossAmount: number; // salePrice - bookValue
  disposalReason: string;
  approvedBy: string;
  status: 'POSTED' | 'PENDING';
}

export const AssetDisposalView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [disposals, setDisposals] = useState<AssetDisposalRow[]>([
    { disposalNo: 'DSP-2026-07-004', date: '2026-07-22', assetCode: 'AST-HO-009', assetName: 'Kendaraan Operasional Avanza 2018', bookValue: 45000000, salePrice: 60000000, gainLossAmount: 15000000, disposalReason: 'Penjualan aset bekas operasional (Laba Penjualan Aset)', approvedBy: 'Direktur Keuangan', status: 'POSTED' },
    { disposalNo: 'DSP-2026-07-005', date: '2026-07-23', assetCode: 'AST-RST-088', assetName: 'Mesin Espresso Coffee Commercial', bookValue: 12000000, salePrice: 0, gainLossAmount: -12000000, disposalReason: 'Write-Off pemusnahan aset akibat kerusakan parah tidak dapat diperbaiki', approvedBy: 'General Manager Resto', status: 'POSTED' }
  ]);

  const filtered = disposals.filter(
    (d) =>
      d.disposalNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.assetCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.assetName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<AssetDisposalRow>[] = [
    { key: 'disposalNo', header: 'No. Berita Acara Disposal', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.disposalNo },
    { key: 'date', header: 'Tanggal Pelepasan', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'assetName', header: 'Nama Aset Tetap', render: (i) => <div><p className="font-bold text-slate-900 dark:text-white">{i.assetName}</p><p className="font-mono text-[10px] text-slate-400">{i.assetCode}</p></div> },
    { key: 'bookValue', header: 'Nilai Buku (Rp)', align: 'right', className: 'font-mono font-bold text-slate-700', render: (i) => `Rp ${i.bookValue.toLocaleString('id-ID')}` },
    { key: 'salePrice', header: 'Harga Jual (Rp)', align: 'right', className: 'font-mono font-bold text-sky-600', render: (i) => `Rp ${i.salePrice.toLocaleString('id-ID')}` },
    {
      key: 'gainLossAmount',
      header: 'Laba / (Rugi) Pelepasan',
      align: 'right',
      render: (i) => (
        <span className={`font-mono font-bold text-xs ${i.gainLossAmount >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {i.gainLossAmount >= 0 ? `+Rp ${i.gainLossAmount.toLocaleString('id-ID')}` : `-Rp ${Math.abs(i.gainLossAmount).toLocaleString('id-ID')}`}
        </span>
      )
    },
    { key: 'disposalReason', header: 'Alasan Pelepasan / Pemusnahan', render: (i) => i.disposalReason },
    { key: 'approvedBy', header: 'Otorisasi Pejabat', className: 'font-bold text-slate-700', render: (i) => i.approvedBy },
    { key: 'status', header: 'Status GL', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.status}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Asset Disposal & Write-Off Management"
        icon={Trash2}
        iconBgColor="bg-rose-500/10 text-rose-600 dark:text-rose-400"
        glossaryTitle="Glossary Asset Disposal"
        glossaryItems={[
          { term: 'Asset Disposal', description: 'Penghentian pengakuan aset tetap dari neraca karena dijual, ditukar, atau dimusnahkan.' },
          { term: 'Laba/Rugi Pelepasan Aset', description: 'Selisih antara hasil penjualan bersih dengan nilai buku aset saat dijual.' }
        ]}
        badges={[
          { label: `${disposals.length} Disposal Records`, variant: 'rose' },
          { label: 'Auto-Post GL Gain/Loss', variant: 'emerald' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari no disposal, kode aset, atau nama..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Berita Acara Pelepasan & Pemusnahan Aset (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.disposalNo}
      />
    </div>
  );
};
