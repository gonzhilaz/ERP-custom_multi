'use client';

import React from 'react';
import { ArrowRightLeft, Upload, CheckCircle2 } from 'lucide-react';
import { BankStatementLine } from '@/lib/mock/bank-accounts';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';

interface Props {
  statementLines: BankStatementLine[];
  unmatchedStatementsCount: number;
  reconcileStatementLine: (statementId: string) => void;
}

export const BankReconciliationTab = ({ statementLines, unmatchedStatementsCount, reconcileStatementLine }: Props) => {
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

      {/* Statement Lines Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Tanggal Mutasi</th>
                <th className="py-3 px-4">Rekening Bank Target</th>
                <th className="py-3 px-4">Deskripsi Mutasi Bank</th>
                <th className="py-3 px-4 font-mono">No. Referensi</th>
                <th className="py-3 px-4 text-right">Nominal Mutasi (Rp)</th>
                <th className="py-3 px-4 text-center">Status Matching</th>
                <th className="py-3 px-4 text-center">Aksi Rekonsiliasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {statementLines.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{st.statementDate}</td>
                  <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{st.bankAccountCode}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{st.transactionDescription}</div>
                    {st.matchedJournalId && (
                      <div className="text-[10px] text-emerald-600 font-mono">Matched to GL: {st.matchedJournalId}</div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{st.referenceNumber}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-sm">
                    <span className={st.type === 'CR' ? 'text-emerald-600' : 'text-rose-600'}>
                      {st.type === 'CR' ? '+' : '-'} Rp {st.amount.toLocaleString('id-ID')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      st.matchStatus === 'MATCHED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {st.matchStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {st.matchStatus === 'UNMATCHED' ? (
                      <button
                        onClick={() => reconcileStatementLine(st.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg transition-all flex items-center gap-1 mx-auto cursor-pointer"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Match Jurnal GL</span>
                      </button>
                    ) : (
                      <span className="text-[10px] text-emerald-600 font-bold">✓ Reconciled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
