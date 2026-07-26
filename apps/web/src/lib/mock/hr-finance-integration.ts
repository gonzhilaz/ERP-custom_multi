export interface TravelExpenseItem {
  id: string;
  spdCode: string;
  employeeName: string;
  departmentName: string;
  destinationCity: string;
  purpose: string;
  startDate: string;
  endDate: string;
  daysCount: number;
  perDiemRatePerDay: number;
  perDiemTotal: number;
  hotelFlightAdvance: number;
  actualSpentReceipts: number;
  settlementDifference: number;
  status: 'PENDING_APPROVAL' | 'ADVANCE_PAID' | 'SETTLED' | 'REJECTED';
}

export interface PettyCashTransaction {
  id: string;
  voucherCode: string;
  date: string;
  requestedBy: string;
  category: 'ATK_KANTOR' | 'KONSUMSI_RAPAT' | 'BENSIN_DARURAT' | 'MAINTENANCE_LOGISTIK';
  description: string;
  amount: number;
  receiptFileName: string;
  status: 'APPROVED' | 'PENDING_REPLENISHMENT';
}

export interface TaxReportItem {
  id: string;
  periodMonth: string;
  pph21TerCategory: 'TER_A' | 'TER_B' | 'TER_C';
  totalGrossSalary: number;
  totalPph21Tax: number;
  status: 'CALCULATED' | 'EXPORTED_CORETAX';
  csvFileName: string;
}

export const MOCK_TRAVEL_EXPENSES: TravelExpenseItem[] = [
  {
    id: 'trv-01',
    spdCode: 'SPD-2026-081',
    employeeName: 'Budi Santoso',
    departmentName: 'Operasional Site Tambang',
    destinationCity: 'Samarinda, Kaltim',
    purpose: 'Inspeksi & Maintenance Alat Berat Heavy Excavator Site Gold-01',
    startDate: '2026-08-01',
    endDate: '2026-08-05',
    daysCount: 5,
    perDiemRatePerDay: 500000,
    perDiemTotal: 2500000,
    hotelFlightAdvance: 4500000,
    actualSpentReceipts: 6800000,
    settlementDifference: 200000, // Tambah 200rb
    status: 'ADVANCE_PAID'
  },
  {
    id: 'trv-02',
    spdCode: 'SPD-2026-092',
    employeeName: 'Chef Arnold',
    departmentName: 'Dapur Resto & Catering',
    destinationCity: 'Bandung, Jawa Barat',
    purpose: 'Audit Quality Control Bahan Baku Daging Supplier Resto',
    startDate: '2026-07-20',
    endDate: '2026-07-22',
    daysCount: 3,
    perDiemRatePerDay: 350000,
    perDiemTotal: 1050000,
    hotelFlightAdvance: 2000000,
    actualSpentReceipts: 2950000,
    settlementDifference: -100000, // Sisa dikembalikan 100rb
    status: 'SETTLED'
  }
];

export const MOCK_PETTY_CASH: PettyCashTransaction[] = [
  {
    id: 'pc-01',
    voucherCode: 'PC-2026-07-011',
    date: '2026-07-24',
    requestedBy: 'Siti Rahma (Admin GA)',
    category: 'ATK_KANTOR',
    description: 'Pembelian Kertas A4 80gr 5 Rim & Tinta Printer HQ',
    amount: 385000,
    receiptFileName: 'Struk_Gramedia_Kertas_Tinta.pdf',
    status: 'APPROVED'
  },
  {
    id: 'pc-02',
    voucherCode: 'PC-2026-07-018',
    date: '2026-07-25',
    requestedBy: 'Ahmad Rizky (Admin IT)',
    category: 'KONSUMSI_RAPAT',
    description: 'Konsumsi Rapat Evaluasi Direksi Holding Central',
    amount: 450000,
    receiptFileName: 'Kwitansi_Snack_Rapat.pdf',
    status: 'PENDING_REPLENISHMENT'
  }
];

export const MOCK_TAX_REPORTS: TaxReportItem[] = [
  {
    id: 'tax-01',
    periodMonth: 'Juli 2026',
    pph21TerCategory: 'TER_B',
    totalGrossSalary: 1620000000,
    totalPph21Tax: 81000000,
    status: 'CALCULATED',
    csvFileName: 'Import_eSPT_PPh21_TER_Juli_2026.CSV'
  }
];
