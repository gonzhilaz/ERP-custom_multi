'use client';

import React, { useState } from 'react';
import { RefreshCw, Upload, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useBankReconciliation } from '@/hooks/finance/useBankReconciliation';
import { BankTransactionItem } from '@/lib/mock/finance-reconcile';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

export const FinanceReconciliationView = () => {
  const { bankTransactions, matchedCount, unmatchedCount, isMatching, simulateAutoMatchCsv } = useBankReconciliation();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateAutoMatchCsv(file.name);
    }
  };

  const filteredItems = filterStatus === 'ALL'
    ? bankTransactions
    : filterStatus === 'MATCHED'
    ? bankTransactions.filter((t) => t.status === 'MATCHED_100%')
    : bankTransactions.filter((t) => t.status.startsWith('UNMATCHED'));

  const columns: ColumnDef<BankTransactionItem>[] = [
    { key: 'transactionDate', header: 'Tanggal Mutasi', className: 'font-mono text-slate-500', render: (i) => i.transactionDate },
    { key: 'bankName', header: 'Bank', align: 'center', className: 'font-bold font-mono', render: (i) => i.bankName },
    { key: 'description', header: 'Keterangan Rekening Koran', render: (i) => i.description },
    { key: 'amount', header: 'Nominal Mutasi', align: 'right', className: 'font-mono font-bold text-slate-900 dark:text-white', render: (i) => `Rp ${i.amount.toLocaleString('id-ID')}` },
    { key: 'type', header: 'Mutasi', align: 'center', render: (i) => <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${i.type === 'CR' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>{i.type}</span> },
    { key: 'status', header: 'Hasil Reconcile', align: 'center', render: (i) => <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${i.status === 'MATCHED_100%' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>{i.status}</span> },
    { key: 'matchedGlJournalId', header: 'Jurnal ERP Matched', className: 'font-mono text-slate-500', render: (i) => i.matchedGlJournalId || '-' }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Rekonsiliasi Bank"
        icon={RefreshCw}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Auto-Match Bank Reconcile"
        glossaryItems={[
          { term: 'Auto-Matching', description: 'Algoritma pencocokan 1-klik antara file mutasi rekening koran CSV dengan buku kas ERP General Ledger.' }
        ]}
        badges={[
          { label: `${matchedCount} Matched ✓`, variant: 'emerald' },
          { label: `${unmatchedCount} Selisih Unmatched`, variant: 'amber' }
        ]}
        actions={
          <label className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Upload className="w-4 h-4" />
            <span>{isMatching ? 'Memproses CSV...' : 'Upload Bank CSV'}</span>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>
        }
      />

      <DataTable
        headerTitle="Buku Rekonsiliasi Internet Banking vs ERP General Ledger"
        columns={columns}
        data={filteredItems}
        keyExtractor={(i) => i.id}
      />
    </div>
  );
};
