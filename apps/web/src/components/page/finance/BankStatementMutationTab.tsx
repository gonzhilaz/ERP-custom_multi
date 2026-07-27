'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, FileText, Filter, Eye } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

interface BankMutationRow {
  id: string;
  bankAccount: string;
  date: string;
  refNumber: string;
  description: string;
  type: 'DEBIT_IN' | 'CREDIT_OUT';
  amount: number;
  balanceAfter: number;
  reconciledStatus: string;
}

export const BankStatementMutationTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMutation, setSelectedMutation] = useState<BankMutationRow | null>(null);

  const mutations: BankMutationRow[] = [
    { id: '1', bankAccount: 'Bank Mandiri (122-00-988277-1)', date: '2026-07-24', refNumber: 'TRF-889102', description: 'Transfer Masuk: Pelunasan Invoice PT Nusantara Jaya', type: 'DEBIT_IN', amount: 45000000, balanceAfter: 285000000, reconciledStatus: 'RECONCILED' },
    { id: '2', bankAccount: 'Bank Mandiri (122-00-988277-1)', date: '2026-07-23', refNumber: 'PAY-110293', description: 'Transfer Keluar: Pembayaran AP Daging Import PT Meat Prima', type: 'CREDIT_OUT', amount: 94350000, balanceAfter: 240000000, reconciledStatus: 'RECONCILED' },
    { id: '3', bankAccount: 'Bank BCA (880-112-9900)', date: '2026-07-22', refNumber: 'SET-990182', description: 'Setoran Kasir POS Outlet Retail Ke Rekening BCA', type: 'DEBIT_IN', amount: 15400000, balanceAfter: 154000000, reconciledStatus: 'MATCHED' },
    { id: '4', bankAccount: 'Bank BCA (880-112-9900)', date: '2026-07-20', refNumber: 'FEE-001928', description: 'Biaya Admin Bulanan & Layanan EDC Kasir BCA', type: 'CREDIT_OUT', amount: 150000, balanceAfter: 138600000, reconciledStatus: 'PENDING' }
  ];

  const filteredMutations = mutations.filter(
    (m) =>
      m.bankAccount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.refNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<BankMutationRow>[] = [
    { key: 'date', header: 'Tanggal', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'bankAccount', header: 'Rekening Bank', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.bankAccount },
    { key: 'refNumber', header: 'No. Referensi / Mutasi', className: 'font-mono text-sky-600 dark:text-sky-400', render: (i) => i.refNumber },
    { key: 'description', header: 'Uraian Transaksi Bank Statement', render: (i) => i.description },
    {
      key: 'amount',
      header: 'Mutasi (Rp)',
      align: 'right',
      render: (i) => (
        <span className={`font-mono font-bold flex items-center justify-end gap-1 ${i.type === 'DEBIT_IN' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
          {i.type === 'DEBIT_IN' ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
          {i.type === 'DEBIT_IN' ? `+ Rp ${i.amount.toLocaleString('id-ID')}` : `- Rp ${i.amount.toLocaleString('id-ID')}`}
        </span>
      )
    },
    { key: 'balanceAfter', header: 'Saldo Akhir (Rp)', align: 'right', className: 'font-mono font-bold text-slate-900 dark:text-white', render: (i) => `Rp ${i.balanceAfter.toLocaleString('id-ID')}` },
    {
      key: 'reconciledStatus',
      header: 'Status Rekon',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.reconciledStatus === 'RECONCILED' || i.reconciledStatus === 'MATCHED'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
        }`}>
          {i.reconciledStatus}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Detail',
      align: 'center',
      render: (i) => (
        <button
          onClick={() => setSelectedMutation(i)}
          className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
          title="Lihat Detail Mutasi Bank"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari rekening bank, uraian mutasi, atau no ref..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`History Mutasi Bank Statement Koran (${filteredMutations.length} Baris)`}
        columns={columns}
        data={filteredMutations}
        keyExtractor={(i) => i.id}
      />

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedMutation !== null}
        onClose={() => setSelectedMutation(null)}
        title="Detail Mutasi Rekening Koran Bank"
        subtitle={selectedMutation ? `${selectedMutation.refNumber} • ${selectedMutation.bankAccount}` : ''}
        badgeLabel={selectedMutation?.reconciledStatus}
        badgeType={selectedMutation?.reconciledStatus === 'RECONCILED' ? 'ACTIVE' : 'NEUTRAL'}
        summaryCards={[
          { label: 'Nominal Mutasi', value: selectedMutation ? `${selectedMutation.type === 'DEBIT_IN' ? '+' : '-'} Rp ${selectedMutation.amount.toLocaleString('id-ID')}` : '0', color: selectedMutation?.type === 'DEBIT_IN' ? 'text-emerald-600' : 'text-rose-600' },
          { label: 'Saldo Akhir Bank', value: selectedMutation ? `Rp ${selectedMutation.balanceAfter.toLocaleString('id-ID')}` : '0' },
          { label: 'Status Rekonsiliasi', value: selectedMutation?.reconciledStatus || '-' }
        ]}
        metadata={[
          { label: 'No. Referensi Bank', value: selectedMutation?.refNumber, mono: true, highlight: true },
          { label: 'Rekening Bank Terkait', value: selectedMutation?.bankAccount },
          { label: 'Tanggal Mutasi Koran', value: selectedMutation?.date, mono: true },
          { label: 'Uraian Transaksi Bank', value: selectedMutation?.description }
        ]}
        footerNotes="Mutasi rekening koran bank diimpor otomatis dari e-Banking Host-to-Host."
      />
    </div>
  );
};

