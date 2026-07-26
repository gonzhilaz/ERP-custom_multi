'use client';

import { useState } from 'react';
import {
  MOCK_BANK_TRANSACTIONS,
  MOCK_GL_CASHBOOK,
  BankTransactionItem,
  GlCashbookItem
} from '@/lib/mock/finance-reconcile';

export function useBankReconciliation() {
  const [bankTransactions, setBankTransactions] = useState<BankTransactionItem[]>(MOCK_BANK_TRANSACTIONS);
  const [glCashbook] = useState<GlCashbookItem[]>(MOCK_GL_CASHBOOK);
  const [isMatching, setIsMatching] = useState(false);

  const simulateAutoMatchCsv = (fileName: string) => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      const newItems: BankTransactionItem[] = [
        {
          id: `tx-${Date.now()}-1`,
          bankName: 'BCA',
          accountNumber: '882-0192-881 (BCA Rek Utama)',
          transactionDate: '2026-07-25',
          description: 'TRSF RETAIL STORE REVENUE HARIAN NUSA MART',
          amount: 28400000,
          type: 'CR',
          matchedGlJournalId: 'JRN-2026-901',
          status: 'MATCHED_100%'
        },
        {
          id: `tx-${Date.now()}-2`,
          bankName: 'BCA',
          accountNumber: '882-0192-881 (BCA Rek Utama)',
          transactionDate: '2026-07-25',
          description: 'BI-FAST PEMBAYARAN VENDOR DAGING RESTO',
          amount: 12500000,
          type: 'DB',
          matchedGlJournalId: undefined,
          status: 'UNMATCHED_AMOUNT'
        }
      ];
      setBankTransactions((prev) => [...newItems, ...prev]);
      alert(`Rekonsiliasi Mutasi Bank [${fileName}] Selesai! 1 Transaksi Matched 100%, 1 Transaksi Selisih Membutuhkan Perhatian.`);
    }, 1500);
  };

  const matchedCount = bankTransactions.filter((t) => t.status === 'MATCHED_100%').length;
  const unmatchedCount = bankTransactions.filter((t) => t.status.startsWith('UNMATCHED')).length;

  return {
    bankTransactions,
    glCashbook,
    isMatching,
    matchedCount,
    unmatchedCount,
    simulateAutoMatchCsv
  };
}
