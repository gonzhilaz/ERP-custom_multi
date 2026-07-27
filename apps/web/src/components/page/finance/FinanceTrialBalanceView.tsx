'use client';

import React, { useState } from 'react';
import { Scale, Download, Printer, Eye } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { useFinance } from '@/hooks/finance/useFinance';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

interface TrialBalanceRow {
  accountCode: string;
  accountName: string;
  category: string;
  unadjustedDebit: number;
  unadjustedCredit: number;
  adjustedDebit: number;
  adjustedCredit: number;
}

export const FinanceTrialBalanceView = () => {
  const { coaList } = useFinance();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTbRow, setSelectedTbRow] = useState<TrialBalanceRow | null>(null);

  const tbData: TrialBalanceRow[] = coaList.map((c) => {
    const isDebitNormal = c.type === 'ASSET' || c.type === 'EXPENSE';
    const amount = c.balance;
    return {
      accountCode: c.code,
      accountName: c.name,
      category: c.type,
      unadjustedDebit: isDebitNormal ? amount : 0,
      unadjustedCredit: !isDebitNormal ? amount : 0,
      adjustedDebit: isDebitNormal ? amount : 0,
      adjustedCredit: !isDebitNormal ? amount : 0
    };
  });

  const filteredTb = tbData.filter(
    (t) =>
      t.accountCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.accountName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDebit = filteredTb.reduce((acc, curr) => acc + curr.adjustedDebit, 0);
  const totalCredit = filteredTb.reduce((acc, curr) => acc + curr.adjustedCredit, 0);
  const isBalanced = totalDebit === totalCredit;

  const columns: ColumnDef<TrialBalanceRow>[] = [
    { key: 'accountCode', header: 'Kode Akun', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.accountCode },
    { key: 'accountName', header: 'Nama Akun COA', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.accountName },
    { key: 'category', header: 'Kategori Akun', render: (i) => <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px] rounded font-bold">{i.category}</span> },
    { key: 'unadjustedDebit', header: 'Sebelum Penyesuaian (Debet)', align: 'right', className: 'font-mono font-bold text-slate-600 dark:text-slate-400', render: (i) => i.unadjustedDebit ? `Rp ${i.unadjustedDebit.toLocaleString('id-ID')}` : '-' },
    { key: 'unadjustedCredit', header: 'Sebelum Penyesuaian (Kredit)', align: 'right', className: 'font-mono font-bold text-slate-600 dark:text-slate-400', render: (i) => i.unadjustedCredit ? `Rp ${i.unadjustedCredit.toLocaleString('id-ID')}` : '-' },
    { key: 'adjustedDebit', header: 'Neraca Saldo (Debet)', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => i.adjustedDebit ? `Rp ${i.adjustedDebit.toLocaleString('id-ID')}` : '-' },
    { key: 'adjustedCredit', header: 'Neraca Saldo (Kredit)', align: 'right', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.adjustedCredit ? `Rp ${i.adjustedCredit.toLocaleString('id-ID')}` : '-' },
    {
      key: 'actions',
      header: 'Detail',
      align: 'center',
      render: (i) => (
        <button
          onClick={() => setSelectedTbRow(i)}
          className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg cursor-pointer transition-colors"
          title="Lihat Detail Saldo Neraca"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Neraca Saldo / Neraca Sisa (Trial Balance)"
        icon={Scale}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Trial Balance"
        glossaryItems={[
          { term: 'Trial Balance (Neraca Saldo)', description: 'Laporan rekapitulasi seluruh saldo akhir akun COA untuk memastikan keseimbangan debet dan kredit sebelum penutupan buku.' },
          { term: 'Adjusted Trial Balance', description: 'Neraca saldo yang telah disesuaikan dengan Jurnal Penyesuaian akhir periode.' }
        ]}
        badges={[
          { label: `Total Debet: Rp ${totalDebit.toLocaleString('id-ID')}`, variant: 'emerald' },
          { label: `Total Kredit: Rp ${totalCredit.toLocaleString('id-ID')}`, variant: 'purple' },
          { label: isBalanced ? 'STATUS: BALANCED ✓' : 'UNBALANCED ❌', variant: isBalanced ? 'emerald' : 'rose' }
        ]}
        actions={
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl flex items-center gap-1.5 cursor-pointer">
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>
            <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer">
              <Download className="w-3.5 h-3.5" />
              <span>Export Excel</span>
            </button>
          </div>
        }
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari kode akun atau nama akun..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Kertas Kerja Neraca Saldo (${filteredTb.length} Akun)`}
        columns={columns}
        data={filteredTb}
        keyExtractor={(i) => i.accountCode}
      />

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedTbRow !== null}
        onClose={() => setSelectedTbRow(null)}
        title="Detail Pos Neraca Saldo (Trial Balance)"
        subtitle={selectedTbRow ? `${selectedTbRow.accountCode} • ${selectedTbRow.accountName}` : ''}
        badgeLabel="RECONCILED"
        badgeType="ACTIVE"
        summaryCards={[
          { label: 'Saldo Debet Akhir', value: selectedTbRow?.adjustedDebit ? `Rp ${selectedTbRow.adjustedDebit.toLocaleString('id-ID')}` : '-', color: 'text-emerald-600' },
          { label: 'Saldo Kredit Akhir', value: selectedTbRow?.adjustedCredit ? `Rp ${selectedTbRow.adjustedCredit.toLocaleString('id-ID')}` : '-', color: 'text-sky-600' },
          { label: 'Kategori Akun', value: selectedTbRow?.category || '-' }
        ]}
        metadata={[
          { label: 'Kode Akun COA', value: selectedTbRow?.accountCode, mono: true, highlight: true },
          { label: 'Nama Akun Utama', value: selectedTbRow?.accountName },
          { label: 'Debet Sebelum Penyesuaian', value: selectedTbRow?.unadjustedDebit ? `Rp ${selectedTbRow.unadjustedDebit.toLocaleString('id-ID')}` : '-', mono: true },
          { label: 'Kredit Sebelum Penyesuaian', value: selectedTbRow?.unadjustedCredit ? `Rp ${selectedTbRow.unadjustedCredit.toLocaleString('id-ID')}` : '-', mono: true }
        ]}
        footerNotes="Keseimbangan Neraca Saldo (Balanced Trial Balance) disyaratkan sebelum laporan keuangan disahkan."
      />
    </div>
  );
};

