export interface BlindCashAudit {
  id: string;
  cashierName: string;
  shiftPeriod: string;
  systemExpectedCash: number;
  physicalCashCounted: number;
  varianceAmount: number;
  status: 'EXACT_MATCH' | 'DISCREPANCY_WARNING';
  auditTimestamp: string;
}

export interface ColdStorageBatch {
  id: string;
  itemCode: string;
  itemName: string;
  batchNumber: string;
  storageUnit: string; // e.g. "Cold Room #02 (-18°C)"
  expiryDate: string;
  quantityInStock: number;
  unitMeasurement: string;
  daysRemaining: number;
  status: 'FRESH' | 'FEFO_WARNING' | 'EXPIRED';
}

export interface ConsolidatedPnlData {
  tenantName: string;
  domain: string;
  revenue: number;
  cogsCost: number;
  grossProfit: number;
  operatingExpenses: number;
  netProfit: number;
  netMarginPercentage: number;
}

export const MOCK_BLIND_CASH_AUDITS: BlindCashAudit[] = [
  {
    id: 'csh-01',
    cashierName: 'Siti Kasir Resto',
    shiftPeriod: 'Shift Siang (08:00 - 16:00)',
    systemExpectedCash: 4500000,
    physicalCashCounted: 4500000,
    varianceAmount: 0,
    status: 'EXACT_MATCH',
    auditTimestamp: '2026-07-25 16:05'
  }
];

export const MOCK_COLD_STORAGE_BATCHES: ColdStorageBatch[] = [
  {
    id: 'cld-01',
    itemCode: 'RAW-BEEF-WAGYU',
    itemName: 'Daging Sapi Wagyu A5 Australia',
    batchNumber: 'BATCH-2026-0710',
    storageUnit: 'Freezer Room #01 (-20°C)',
    expiryDate: '2026-08-05',
    quantityInStock: 45,
    unitMeasurement: 'Kg',
    daysRemaining: 11,
    status: 'FEFO_WARNING'
  },
  {
    id: 'cld-02',
    itemCode: 'RAW-CHICKEN-FILLET',
    itemName: 'Daging Ayam Fillet Segar',
    batchNumber: 'BATCH-2026-0720',
    storageUnit: 'Cold Room #02 (-4°C)',
    expiryDate: '2026-08-20',
    quantityInStock: 120,
    unitMeasurement: 'Kg',
    daysRemaining: 26,
    status: 'FRESH'
  }
];

export const MOCK_CONSOLIDATED_PNL: ConsolidatedPnlData[] = [
  {
    tenantName: 'PT Borneo Mining Emas',
    domain: 'MINING',
    revenue: 45000000000,
    cogsCost: 22500000000,
    grossProfit: 22500000000,
    operatingExpenses: 9000000000,
    netProfit: 13500000000,
    netMarginPercentage: 30.0
  },
  {
    tenantName: 'Nusantara Culinary & Catering',
    domain: 'RESTO',
    revenue: 1200000000,
    cogsCost: 480000000,
    grossProfit: 720000000,
    operatingExpenses: 420000000,
    netProfit: 300000000,
    netMarginPercentage: 25.0
  },
  {
    tenantName: 'Grand Royal Hotel & Resort',
    domain: 'HOTEL',
    revenue: 2800000000,
    cogsCost: 840000000,
    grossProfit: 1960000000,
    operatingExpenses: 1120000000,
    netProfit: 840000000,
    netMarginPercentage: 30.0
  },
  {
    tenantName: 'Nusa Mart Retail Chain',
    domain: 'RETAIL',
    revenue: 1800000000,
    cogsCost: 1260000000,
    grossProfit: 540000000,
    operatingExpenses: 324000000,
    netProfit: 216000000,
    netMarginPercentage: 12.0
  }
];
