export interface BankTransactionItem {
  id: string;
  bankName: 'BCA' | 'MANDIRI' | 'BRI' | 'BNI';
  accountNumber: string;
  transactionDate: string;
  description: string;
  amount: number;
  type: 'CR' | 'DB';
  matchedGlJournalId?: string;
  status: 'MATCHED_100%' | 'UNMATCHED_AMOUNT' | 'UNMATCHED_DATE' | 'PENDING';
}

export interface GlCashbookItem {
  id: string;
  journalNo: string;
  date: string;
  description: string;
  amount: number;
  type: 'CR' | 'DB';
}

export const MOCK_BANK_TRANSACTIONS: BankTransactionItem[] = [
  {
    id: 'tx-001',
    bankName: 'BCA',
    accountNumber: '882-0192-881 (BCA Rek Utama)',
    transactionDate: '2026-07-24',
    description: 'TRSF POS RESTO CASHIER REVENUE OUTLET BANDUNG',
    amount: 15450000,
    type: 'CR',
    matchedGlJournalId: 'JRN-2026-881',
    status: 'MATCHED_100%'
  },
  {
    id: 'tx-002',
    bankName: 'BCA',
    accountNumber: '882-0192-881 (BCA Rek Utama)',
    transactionDate: '2026-07-24',
    description: 'TRSF PAYROLL SALARY BATCH JULI 2026',
    amount: 145000000,
    type: 'DB',
    matchedGlJournalId: 'JRN-2026-885',
    status: 'MATCHED_100%'
  },
  {
    id: 'tx-003',
    bankName: 'MANDIRI',
    accountNumber: '133-00-9921-8 (Mandiri Mining Ops)',
    transactionDate: '2026-07-23',
    description: 'PAYMENT PO-SPAREPART TRAKTOR NUSANTARA',
    amount: 68500000,
    type: 'DB',
    matchedGlJournalId: undefined,
    status: 'UNMATCHED_AMOUNT'
  }
];

export const MOCK_GL_CASHBOOK: GlCashbookItem[] = [
  {
    id: 'JRN-2026-881',
    journalNo: 'GL-2026-07-881',
    date: '2026-07-24',
    description: 'Setoran Omset Kasir Resto Bandung',
    amount: 15450000,
    type: 'CR'
  },
  {
    id: 'JRN-2026-885',
    journalNo: 'GL-2026-07-885',
    date: '2026-07-24',
    description: 'Beban Penggajian Payroll Juli 2026 Batch 1',
    amount: 145000000,
    type: 'DB'
  },
  {
    id: 'JRN-2026-890',
    journalNo: 'GL-2026-07-890',
    date: '2026-07-23',
    description: 'Pembayaran PO Sparepart Traktor Nus',
    amount: 68000000, // Selisih 500rb
    type: 'DB'
  }
];
