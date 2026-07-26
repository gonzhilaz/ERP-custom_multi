export interface IncomeStatementLine {
  category: 'REVENUE' | 'COGS' | 'OPERATING_EXPENSE' | 'OTHER_INCOME';
  accountCode: string;
  accountName: string;
  holdingTotal: number;
  bakeryRetail: number;
  restoFnB: number;
  hotelPms: number;
  miningOps: number;
}

export interface BalanceSheetLine {
  classification: 'CURRENT_ASSET' | 'NON_CURRENT_ASSET' | 'SHORT_TERM_LIABILITY' | 'LONG_TERM_LIABILITY' | 'EQUITY';
  accountCode: string;
  accountName: string;
  amount: number;
}

export interface CogmBreakdownLine {
  costCategory: 'RAW_MATERIAL' | 'DIRECT_LABOR' | 'FACTORY_OVERHEAD';
  description: string;
  amount: number;
  percentageOfTotal: number;
}

export interface UnitProfitabilitySegment {
  unitCode: string;
  unitName: string;
  industry: string;
  revenue: number;
  cogsHpp: number;
  grossProfit: number;
  operatingExpenses: number;
  netProfit: number;
  grossMarginPct: number;
  netMarginPct: number;
}

export const MOCK_INCOME_STATEMENT: IncomeStatementLine[] = [
  // REVENUE
  { category: 'REVENUE', accountCode: '4-1001', accountName: 'Penjualan Kasir POS Toko Roti', holdingTotal: 485000000, bakeryRetail: 485000000, restoFnB: 0, hotelPms: 0, miningOps: 0 },
  { category: 'REVENUE', accountCode: '4-1002', accountName: 'Penjualan Restoran & Katering Massal', holdingTotal: 620000000, bakeryRetail: 0, restoFnB: 620000000, hotelPms: 0, miningOps: 0 },
  { category: 'REVENUE', accountCode: '4-1003', accountName: 'Pendapatan Kamar Hotel & Guest Folio', holdingTotal: 380000000, bakeryRetail: 0, restoFnB: 0, hotelPms: 380000000, miningOps: 0 },
  { category: 'REVENUE', accountCode: '4-1004', accountName: 'Penjualan Emas Murni & Ore Batangan', holdingTotal: 7450000000, bakeryRetail: 0, restoFnB: 0, hotelPms: 0, miningOps: 7450000000 },

  // COGS
  { category: 'COGS', accountCode: '5-1001', accountName: 'HPP / COGM Roti & Kue (Bahan Baku)', holdingTotal: 210000000, bakeryRetail: 210000000, restoFnB: 0, hotelPms: 0, miningOps: 0 },
  { category: 'COGS', accountCode: '5-1002', accountName: 'HPP Restoran & Bahan Baku Masakan', holdingTotal: 260000000, bakeryRetail: 0, restoFnB: 260000000, hotelPms: 0, miningOps: 0 },
  { category: 'COGS', accountCode: '5-1003', accountName: 'HPP Kamar & Laundry Housekeeping', holdingTotal: 75000000, bakeryRetail: 0, restoFnB: 0, hotelPms: 75000000, miningOps: 0 },
  { category: 'COGS', accountCode: '5-1004', accountName: 'COGM Ekstraksi Ore & Smelting Emas', holdingTotal: 4100000000, bakeryRetail: 0, restoFnB: 0, hotelPms: 0, miningOps: 4100000000 },

  // OPERATING EXPENSE
  { category: 'OPERATING_EXPENSE', accountCode: '6-1001', accountName: 'Beban Gaji Karyawan & Payroll TER 2026', holdingTotal: 890000000, bakeryRetail: 95000000, restoFnB: 110000000, hotelPms: 85000000, miningOps: 600000000 },
  { category: 'OPERATING_EXPENSE', accountCode: '6-1002', accountName: 'Beban Solar HSD & BBM Heavy Fleet Site', holdingTotal: 420000000, bakeryRetail: 12000000, restoFnB: 18000000, hotelPms: 25000000, miningOps: 365000000 }
];

export const MOCK_BALANCE_SHEET: BalanceSheetLine[] = [
  { classification: 'CURRENT_ASSET', accountCode: '1-1101', accountName: 'Kas & Bank Operasional Holding', amount: 3450000000 },
  { classification: 'CURRENT_ASSET', accountCode: '1-1201', accountName: 'Piutang Usaha B2B & Customer AR', amount: 1850000000 },
  { classification: 'CURRENT_ASSET', accountCode: '1-1301', accountName: 'Persediaan Barang Jadi & Bahan Baku', amount: 2680000000 },
  { classification: 'NON_CURRENT_ASSET', accountCode: '1-2101', accountName: 'Aset Tetap Heavy Fleet Excavator & Truck', amount: 18500000000 },
  { classification: 'NON_CURRENT_ASSET', accountCode: '1-2201', accountName: 'Gedung Outlet Toko Roti & Hotel', amount: 12400000000 },
  { classification: 'SHORT_TERM_LIABILITY', accountCode: '2-1101', accountName: 'Hutang Dagang Supplier & Vendor AP', amount: 2150000000 },
  { classification: 'SHORT_TERM_LIABILITY', accountCode: '2-1201', accountName: 'Hutang Pajak PPh 21 TER & PPN', amount: 480000000 },
  { classification: 'EQUITY', accountCode: '3-1101', accountName: 'Modal Disetor Pemegang Saham Holding', amount: 25000000000 },
  { classification: 'EQUITY', accountCode: '3-1201', accountName: 'Laba Ditahan (Retained Earnings)', amount: 11250000000 }
];

export const MOCK_COGM_BREAKDOWN: CogmBreakdownLine[] = [
  { costCategory: 'RAW_MATERIAL', description: 'Pemakaian Bahan Baku Utama (Terigu, Gula, Ore Emas, Chemical)', amount: 4640000000, percentageOfTotal: 65.5 },
  { costCategory: 'DIRECT_LABOR', description: 'Tenaga Kerja Langsung (Baker Dapur, Metallurgist Site, Operator Fleet)', amount: 1450000000, percentageOfTotal: 20.5 },
  { costCategory: 'FACTORY_OVERHEAD', description: 'Beban Overhead Pabrik/Site (Listrik Industri, Solar HSD, Servis Fleet)', amount: 995000000, percentageOfTotal: 14.0 }
];

export const MOCK_UNIT_PROFITABILITY: UnitProfitabilitySegment[] = [
  { unitCode: 'UNT-RTL-01', unitName: 'Mahkota Bakery & Retail', industry: 'Bakery Chain', revenue: 485000000, cogsHpp: 210000000, grossProfit: 275000000, operatingExpenses: 107000000, netProfit: 168000000, grossMarginPct: 56.7, netMarginPct: 34.6 },
  { unitCode: 'UNT-RST-02', unitName: 'Sultan Resto & Catering Massal', industry: 'FnB Resto', revenue: 620000000, cogsHpp: 260000000, grossProfit: 360000000, operatingExpenses: 128000000, netProfit: 232000000, grossMarginPct: 58.0, netMarginPct: 37.4 },
  { unitCode: 'UNT-HTL-03', unitName: 'Grand Royal Hotel & PMS', industry: 'Hotelier', revenue: 380000000, cogsHpp: 75000000, grossProfit: 305000000, operatingExpenses: 110000000, netProfit: 195000000, grossMarginPct: 80.2, netMarginPct: 51.3 },
  { unitCode: 'UNT-MNG-04', unitName: 'Kutai Mining Operations', industry: 'Gold Mining', revenue: 7450000000, cogsHpp: 4100000000, grossProfit: 3350000000, operatingExpenses: 965000000, netProfit: 2385000000, grossMarginPct: 44.9, netMarginPct: 32.0 }
];
