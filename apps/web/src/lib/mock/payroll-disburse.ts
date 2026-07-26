export interface PayrollDisbursementBatch {
  id: string;
  batchCode: string;
  periodMonth: string;
  bankName: 'BCA_KLIKBISNIS' | 'MANDIRI_MCM' | 'BRI_CORPORATE';
  totalEmployees: number;
  totalAmount: number;
  exportFormatFileName: string;
  status: 'READY' | 'DISBURSED' | 'SLIP_SENT_WA';
  processedDate: string;
}

export interface PayrollDisbursementItem {
  id: string;
  employeeName: string;
  bankAccount: string;
  bankName: string;
  takeHomePay: number;
  waStatus: 'SENT' | 'PENDING' | 'FAILED';
  waSendTimestamp?: string;
}

export const MOCK_PAYROLL_DISBURSEMENT_BATCHES: PayrollDisbursementBatch[] = [
  {
    id: 'batch-01',
    batchCode: 'PAY-BATCH-2026-07-BCA',
    periodMonth: 'Juli 2026',
    bankName: 'BCA_KLIKBISNIS',
    totalEmployees: 145,
    totalAmount: 1450000000,
    exportFormatFileName: 'BCA_Payroll_Batch_Juli_2026.TXT',
    status: 'READY',
    processedDate: '2026-07-25'
  },
  {
    id: 'batch-02',
    batchCode: 'PAY-BATCH-2026-07-MANDIRI',
    periodMonth: 'Juli 2026',
    bankName: 'MANDIRI_MCM',
    totalEmployees: 98,
    totalAmount: 890000000,
    exportFormatFileName: 'MANDIRI_Payroll_MCM_Juli_2026.CSV',
    status: 'READY',
    processedDate: '2026-07-25'
  }
];

export const MOCK_DISBURSEMENT_EMPLOYEES: PayrollDisbursementItem[] = [
  {
    id: 'disb-01',
    employeeName: 'Budi Santoso',
    bankAccount: '8820192881',
    bankName: 'BCA',
    takeHomePay: 14742000,
    waStatus: 'SENT',
    waSendTimestamp: '2026-07-25 09:30'
  },
  {
    id: 'disb-02',
    employeeName: 'Siti Rahma',
    bankAccount: '1330099218',
    bankName: 'MANDIRI',
    takeHomePay: 6450000,
    waStatus: 'PENDING'
  },
  {
    id: 'disb-03',
    employeeName: 'Dewi Lestari',
    bankAccount: '8820194451',
    bankName: 'BCA',
    takeHomePay: 9800000,
    waStatus: 'PENDING'
  }
];
