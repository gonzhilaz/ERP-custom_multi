'use client';

import React, { useState } from 'react';
import { BookOpen, Search, Filter } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { useFinance } from '@/hooks/finance/useFinance';

interface GlTransaction {
  id: string;
  date: string;
  jvNumber: string;
  accountCode: string;
  accountName: string;
  description: string;
  debit: number;
  credit: number;
  runningBalance: number;
}

export const FinanceGlView = () => {
  const { coaList } = useFinance();
  const [selectedCoaCode, setSelectedCoaCode] = useState('1-10100');
  const [searchQuery, setSearchQuery] = useState('');

  const coaOptions = coaList.map((c) => ({
    id: c.code,
    value: c.code,
    label: `${c.code} - ${c.name} (${c.type})`
  }));

  const mockGlEntries: GlTransaction[] = [
    { id: '1', date: '2026-07-01', jvNumber: 'JV/2026/07/0001', accountCode: '1-10100', accountName: 'Kas Kasir Outlet Retail', description: 'Saldo Awal Bulan Juli 2026', debit: 50000000, credit: 0, runningBalance: 50000000 },
    { id: '2', date: '2026-07-15', jvNumber: 'JV/2026/07/0045', accountCode: '1-10100', accountName: 'Kas Kasir Outlet Retail', description: 'Penerimaan Penjualan Cash POS Retail', debit: 25000000, credit: 0, runningBalance: 75000000 },
    { id: '3', date: '2026-07-20', jvNumber: 'JV/2026/07/0078', accountCode: '1-10100', accountName: 'Kas Kasir Outlet Retail', description: 'Setoran Kas Ke Bank Mandiri Operasional', debit: 0, credit: 40000000, runningBalance: 35000000 },
    { id: '4', date: '2026-07-24', jvNumber: 'JV/2026/07/0090', accountCode: '1-10100', accountName: 'Kas Kasir Outlet Retail', description: 'Auto-Post Kasir POS Retail: Penjualan Beras & Minyak', debit: 128240, credit: 0, runningBalance: 35128240 }
  ];

  const filteredGl = mockGlEntries.filter(
    (g) =>
      g.accountCode === selectedCoaCode &&
      (g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.jvNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const columns: ColumnDef<GlTransaction>[] = [
    { key: 'date', header: 'Tanggal', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'jvNumber', header: 'No. Voucher', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.jvNumber },
    { key: 'description', header: 'Keterangan Transaksi GL', className: 'font-medium text-slate-900 dark:text-white', render: (i) => i.description },
    { key: 'debit', header: 'Debet (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => i.debit ? `Rp ${i.debit.toLocaleString('id-ID')}` : '-' },
    { key: 'credit', header: 'Kredit (Rp)', align: 'right', className: 'font-mono font-bold text-rose-600 dark:text-rose-400', render: (i) => i.credit ? `Rp ${i.credit.toLocaleString('id-ID')}` : '-' },
    { key: 'runningBalance', header: 'Saldo Akhir (Rp)', align: 'right', className: 'font-mono font-bold text-slate-900 dark:text-white', render: (i) => `Rp ${i.runningBalance.toLocaleString('id-ID')}` }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Jurnal Buku Besar (General Ledger)"
        icon={BookOpen}
        iconBgColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        glossaryTitle="Glossary General Ledger"
        glossaryItems={[
          { term: 'General Ledger (GL)', description: 'Buku catatan utama mutasi debet/kredit per akun COA beserta akumulasi saldo berjalan.' },
          { term: 'Running Balance', description: 'Akumulasi saldo kas/akun secara historis mengikuti setiap posting transaksi.' }
        ]}
        badges={[
          { label: `Akun Active: ${selectedCoaCode}`, variant: 'slate' },
          { label: 'Real-time Balance Sync ✓', variant: 'emerald' }
        ]}
      />

      {/* Account Selector Toolbar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 mb-1">Pilih Akun COA Buku Besar:</label>
          <SearchableSelect
            options={coaOptions}
            value={selectedCoaCode}
            onChange={setSelectedCoaCode}
            placeholder="Cari & Pilih Kode Akun COA..."
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-500 mb-1">Cari Transaksi GL:</label>
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari nomor voucher atau uraian..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Mutasi Buku Besar Akun ${selectedCoaCode} (${filteredGl.length} Baris)`}
        columns={columns}
        data={filteredGl}
        keyExtractor={(i) => i.id}
      />
    </div>
  );
};
