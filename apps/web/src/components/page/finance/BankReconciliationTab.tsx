'use client';

import React, { useState } from 'react';
import { ArrowRightLeft, Upload, CheckCircle2, Eye } from 'lucide-react';
import { BankStatementLine } from '@/lib/mock/bank-accounts';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

interface Props {
  statementLines: BankStatementLine[];
  unmatchedStatementsCount: number;
  reconcileStatementLine: (statementId: string) => void;
}

export const BankReconciliationTab = ({ statementLines, unmatchedStatementsCount, reconcileStatementLine }: Props) => {
  const [selectedSt, setSelectedSt] = useState<BankStatementLine | null>(null);

  const columns: ColumnDef<BankStatementLine>[] = [
    { key: 'statementDate', header: 'Tanggal Mutasi', className: 'font-mono text-[11px] text-slate-500', render: (st) => st.statementDate },
    { key: 'bankAccountCode', header: 'Rekening Bank Target', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (st) => st.bankAccountCode },
    {
      key: 'transactionDescription',
      header: 'Deskripsi Mutasi Bank',
      render: (st) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{st.transactionDescription}</div>
          {st.matchedJournalId && (
            <div className="text-[10px] text-emerald-600 font-mono">Matched to GL: {st.matchedJournalId}</div>
          )}
        </div>
      )
    },
    { key: 'referenceNumber', header: 'No. Referensi', className: 'font-mono text-[11px] text-slate-400', render: (st) => st.referenceNumber },
    {
      key: 'amount',
      header: 'Nominal Mutasi (Rp)',
      align: 'right',
      render: (st) => (
        <span className={`font-mono font-bold text-sm ${st.type === 'CR' ? 'text-emerald-600' : 'text-rose-600'}`}>
          {st.type === 'CR' ? '+' : '-'} Rp {st.amount.toLocaleString('id-ID')}
        </span>
      )
    },
    {
      key: 'matchStatus',
      header: 'Status Matching',
      align: 'center',
      render: (st) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
          st.matchStatus === 'MATCHED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
        }`}>
          {st.matchStatus}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      render: (st) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => setSelectedSt(st)}
            className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
            title="Lihat Detail Rekonsiliasi Bank"
          >
            <Eye className="w-4 h-4" />
          </button>
          {st.matchStatus === 'UNMATCHED' ? (
            <button
              onClick={() => reconcileStatementLine(st.id)}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg transition-all flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Match GL</span>
            </button>
          ) : (
            <span className="text-[10px] text-emerald-600 font-bold">✓ Match</span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Rekonsiliasi Bank"
        icon={ArrowRightLeft}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Rekonsiliasi Bank"
        glossaryItems={[
          { term: 'e-Statement Import', description: 'Simulasi impor mutasi kas koran dari bank.' },
          { term: 'Unmatched Mutasi', description: 'Transaksi mutasi kas yang belum dicocokkan dengan posting General Ledger.' }
        ]}
        badges={[
          { label: `${unmatchedStatementsCount} Mutasi Unmatched`, variant: 'amber' }
        ]}
        actions={
          <button
            onClick={() => alert('Simulasi Impor File e-Statement (.CSV / .MT940) Rekening Bank Berhasil!')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer text-xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import e-Statement Bank</span>
          </button>
        }
      />

      <DataTable
        headerTitle={`Daftar Mutasi e-Statement Bank Koran (${statementLines.length} Baris)`}
        columns={columns}
        data={statementLines}
        keyExtractor={(st) => st.id}
      />

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedSt !== null}
        onClose={() => setSelectedSt(null)}
        title="Detail Rekonsiliasi Statement Bank"
        subtitle={selectedSt ? `${selectedSt.referenceNumber} • ${selectedSt.bankAccountCode}` : ''}
        badgeLabel={selectedSt?.matchStatus}
        badgeType={selectedSt?.matchStatus === 'MATCHED' ? 'ACTIVE' : 'ALERT'}
        summaryCards={[
          { label: 'Nominal Mutasi Bank', value: selectedSt ? `${selectedSt.type === 'CR' ? '+' : '-'} Rp ${selectedSt.amount.toLocaleString('id-ID')}` : '0', color: selectedSt?.type === 'CR' ? 'text-emerald-600' : 'text-rose-600' },
          { label: 'Status Pencocokan', value: selectedSt?.matchStatus || '-' },
          { label: 'Tipe Mutasi', value: selectedSt?.type === 'CR' ? 'Kredit (Koran)' : 'Debet (Koran)' }
        ]}
        metadata={[
          { label: 'No. Referensi Bank', value: selectedSt?.referenceNumber, mono: true, highlight: true },
          { label: 'Kode Bank Target', value: selectedSt?.bankAccountCode, mono: true },
          { label: 'Tanggal Mutasi Koran', value: selectedSt?.statementDate, mono: true },
          { label: 'Uraian Transaksi Bank', value: selectedSt?.transactionDescription },
          { label: 'Tautan Voucher GL', value: selectedSt?.matchedJournalId || 'Belum Di-match ke GL', mono: true }
        ]}
        footerNotes="Matching otomatis membandingkan nomor referensi & nominal mutasi antara e-Statement dan Ledger."
      />
    </div>
  );
};

