export interface CorporateBankAccount {
  id: string;
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  branchName: string;
  swiftCode: string;
  currency: string;
  currentBalance: number;
  linkedCoaAccountCode: string;
  linkedCoaAccountName: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface BankStatementLine {
  id: string;
  statementDate: string;
  bankAccountCode: string;
  transactionDescription: string;
  referenceNumber: string;
  type: 'CR' | 'DB'; // Credit (Masuk) / Debit (Keluar)
  amount: number;
  matchedJournalId?: string;
  matchStatus: 'MATCHED' | 'UNMATCHED' | 'DISCREPANCY';
}

export const TENANT_BANK_MAP: Record<string, CorporateBankAccount[]> = {
  'TOKO-ROTI': [
    {
      id: 'bank-tr-01',
      bankCode: 'BCA-RETAIL-01',
      bankName: 'PT Bank Central Asia Tbk (BCA)',
      accountNumber: '157-074-7-190',
      accountHolderName: 'Toko Roti Nusantara Chain',
      branchName: 'KCU Sudirman Jakarta',
      swiftCode: 'CENAIDJA',
      currency: 'IDR',
      currentBalance: 185000000,
      linkedCoaAccountCode: '1-10201',
      linkedCoaAccountName: 'Bank BCA Operational Retail',
      status: 'ACTIVE'
    },
    {
      id: 'bank-tr-02',
      bankCode: 'MND-QRIS-02',
      bankName: 'PT Bank Mandiri (Persero) Tbk',
      accountNumber: '122-00-9988-11',
      accountHolderName: 'Toko Roti QRIS EDC Settlement',
      branchName: 'KCU Plaza Mandiri',
      swiftCode: 'BMRIIDJA',
      currency: 'IDR',
      currentBalance: 65000000,
      linkedCoaAccountCode: '1-10202',
      linkedCoaAccountName: 'Bank Mandiri QRIS Settlement',
      status: 'ACTIVE'
    }
  ],
  'RESTO-ALAM-RINDU': [
    {
      id: 'bank-rst-01',
      bankCode: 'MND-RESTO-01',
      bankName: 'PT Bank Mandiri (Persero) Tbk',
      accountNumber: '118-00-7766-00',
      accountHolderName: 'Resto Alam Rindu Senopati',
      branchName: 'KCU Senopati Jakarta',
      swiftCode: 'BMRIIDJA',
      currency: 'IDR',
      currentBalance: 340000000,
      linkedCoaAccountCode: '1-10201',
      linkedCoaAccountName: 'Bank Mandiri Resto Utama',
      status: 'ACTIVE'
    },
    {
      id: 'bank-rst-02',
      bankCode: 'BCA-EDC-02',
      bankName: 'PT Bank Central Asia Tbk (BCA)',
      accountNumber: '245-099-881-2',
      accountHolderName: 'Resto Alam Rindu EDC Kasir',
      branchName: 'KCU Kebayoran Baru',
      swiftCode: 'CENAIDJA',
      currency: 'IDR',
      currentBalance: 125000000,
      linkedCoaAccountCode: '1-10202',
      linkedCoaAccountName: 'Bank BCA Settlement EDC Kasir',
      status: 'ACTIVE'
    }
  ],
  'CATERING-SURYA': [
    {
      id: 'bank-cat-01',
      bankCode: 'BNI-CAT-01',
      bankName: 'PT Bank Negara Indonesia Tbk (BNI)',
      accountNumber: '089-777-654-1',
      accountHolderName: 'Catering Surya Kencana Cikarang',
      branchName: 'KCU Jababeka Cikarang',
      swiftCode: 'BNINIDJA',
      currency: 'IDR',
      currentBalance: 480000000,
      linkedCoaAccountCode: '1-10201',
      linkedCoaAccountName: 'Bank BNI Corporate Catering',
      status: 'ACTIVE'
    },
    {
      id: 'bank-cat-02',
      bankCode: 'MND-B2B-02',
      bankName: 'PT Bank Mandiri (Persero) Tbk',
      accountNumber: '118-00-4433-22',
      accountHolderName: 'Catering Surya Escrow Project B2B',
      branchName: 'KCU Rungkut Surabaya',
      swiftCode: 'BMRIIDJA',
      currency: 'IDR',
      currentBalance: 220000000,
      linkedCoaAccountCode: '1-10202',
      linkedCoaAccountName: 'Bank Mandiri Escrow Project B2B',
      status: 'ACTIVE'
    }
  ],
  'HOTEL-ALAM-PAKUAN': [
    {
      id: 'bank-htl-01',
      bankCode: 'BCA-HTL-01',
      bankName: 'PT Bank Central Asia Tbk (BCA)',
      accountNumber: '008-999-123-4',
      accountHolderName: 'Hotel Alam Pakuan Resort Bogor',
      branchName: 'KCU Pajajaran Bogor',
      swiftCode: 'CENAIDJA',
      currency: 'IDR',
      currentBalance: 750000000,
      linkedCoaAccountCode: '1-10201',
      linkedCoaAccountName: 'Bank BCA Corporate Hotelier',
      status: 'ACTIVE'
    },
    {
      id: 'bank-htl-02',
      bankCode: 'MND-OTA-02',
      bankName: 'PT Bank Mandiri (Persero) Tbk',
      accountNumber: '118-00-5511-33',
      accountHolderName: 'Hotel Alam Pakuan OTA Deposit',
      branchName: 'KCU Sunset Road Bali',
      swiftCode: 'BMRIIDJA',
      currency: 'IDR',
      currentBalance: 310000000,
      linkedCoaAccountCode: '1-10202',
      linkedCoaAccountName: 'Bank Mandiri OTA Deposit',
      status: 'ACTIVE'
    }
  ],
  'MINING-BRAXIT': [
    {
      id: 'bank-mne-01',
      bankCode: 'MND-MINE-01',
      bankName: 'PT Bank Mandiri (Persero) Tbk',
      accountNumber: '122-00-1111-99',
      accountHolderName: 'PT Braxit Mining Gold Escrow',
      branchName: 'KCU Plaza Mandiri',
      swiftCode: 'BMRIIDJA',
      currency: 'IDR',
      currentBalance: 2450000000,
      linkedCoaAccountCode: '1-10201',
      linkedCoaAccountName: 'Bank Mandiri Escrow Mining',
      status: 'ACTIVE'
    },
    {
      id: 'bank-mne-02',
      bankCode: 'BRI-MINE-02',
      bankName: 'PT Bank Rakyat Indonesia Tbk (BRI)',
      accountNumber: '034-01-000222-30-1',
      accountHolderName: 'PT Braxit Mining Site Kutai Ops',
      branchName: 'KCU Balikpapan',
      swiftCode: 'BRINIDJA',
      currency: 'IDR',
      currentBalance: 980000000,
      linkedCoaAccountCode: '1-10202',
      linkedCoaAccountName: 'Bank BRI Operational Site',
      status: 'ACTIVE'
    }
  ],
  'HOLDING-HO': [
    {
      id: 'bank-01',
      bankCode: 'BCA-CORP-01',
      bankName: 'PT Bank Central Asia Tbk (BCA)',
      accountNumber: '8830-192-111',
      accountHolderName: 'PT Nusantara Enterprise Holding',
      branchName: 'KCU Sudirman Jakarta',
      swiftCode: 'CENAIDJA',
      currency: 'IDR',
      currentBalance: 3450000000,
      linkedCoaAccountCode: '1-10202',
      linkedCoaAccountName: 'Bank BCA Corporate Holding',
      status: 'ACTIVE'
    },
    {
      id: 'bank-02',
      bankCode: 'MANDIRI-CORP-02',
      bankName: 'PT Bank Mandiri (Persero) Tbk',
      accountNumber: '122-00-9988-771',
      accountHolderName: 'PT Nusantara Enterprise Holding',
      branchName: 'KCU Plaza Mandiri',
      swiftCode: 'BMRIIDJA',
      currency: 'IDR',
      currentBalance: 1850000000,
      linkedCoaAccountCode: '1-10201',
      linkedCoaAccountName: 'Bank Mandiri Corporate Holding',
      status: 'ACTIVE'
    }
  ]
};

export const MOCK_CORPORATE_BANK_ACCOUNTS: CorporateBankAccount[] = TENANT_BANK_MAP['HOLDING-HO'];

export const MOCK_BANK_STATEMENT_LINES: BankStatementLine[] = [
  {
    id: 'stmt-101',
    statementDate: '2026-07-24',
    bankAccountCode: 'BCA-CORP-01',
    transactionDescription: 'TRANSFER MASUK TRSF E-BANKING KASIR POS TOKO ROTI',
    referenceNumber: 'TRX-POS-20260724-001',
    type: 'CR',
    amount: 14850000,
    matchedJournalId: 'JRN-202607-0091',
    matchStatus: 'MATCHED'
  },
  {
    id: 'stmt-102',
    statementDate: '2026-07-24',
    bankAccountCode: 'BCA-CORP-01',
    transactionDescription: 'PEMBAYARAN INVOICE TERIGU BOGASARI SUPPLIER',
    referenceNumber: 'PO-BGS-2026-88',
    type: 'DB',
    amount: 120000000,
    matchedJournalId: 'JRN-202607-0092',
    matchStatus: 'MATCHED'
  },
  {
    id: 'stmt-103',
    statementDate: '2026-07-23',
    bankAccountCode: 'MANDIRI-CORP-02',
    transactionDescription: 'SETORAN HASIL KASIR RESTO & KATERING MASSAL',
    referenceNumber: 'DEP-RST-20260723',
    type: 'CR',
    amount: 85000000,
    matchStatus: 'UNMATCHED'
  }
];
