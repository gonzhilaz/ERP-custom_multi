'use client';

import { useState } from 'react';
import {
  MOCK_PETTY_CASH,
  PettyCashTransaction
} from '@/lib/mock/hr-finance-integration';

export function usePettyCash() {
  const [transactions, setTransactions] = useState<PettyCashTransaction[]>(MOCK_PETTY_CASH);
  const [pettyCashBalance] = useState(5000000); // Plafon Rp 5 Juta

  const addTransaction = (newTx: Omit<PettyCashTransaction, 'id' | 'voucherCode' | 'status'>) => {
    const item: PettyCashTransaction = {
      ...newTx,
      id: `pc-${Date.now()}`,
      voucherCode: `PC-2026-07-${Math.floor(100 + Math.random() * 900)}`,
      status: 'APPROVED'
    };
    setTransactions((prev) => [item, ...prev]);
  };

  const requestReplenishment = () => {
    setTransactions((prev) =>
      prev.map((t) => ({ ...t, status: 'APPROVED' }))
    );
    alert('Pengajuan Replenishment Kas Kecil ke Finance GL Berhasil! Saldo Kas Kecil Diisi Kembali.');
  };

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const currentRemaining = Math.max(0, pettyCashBalance - totalSpent);

  return {
    transactions,
    pettyCashBalance,
    totalSpent,
    currentRemaining,
    addTransaction,
    requestReplenishment
  };
}
