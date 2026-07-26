export interface FixedAssetDepreciationItem {
  id: string;
  assetCode: string;
  assetName: string;
  category: 'HEAVY_EQUIPMENT' | 'FLEET_VEHICLE' | 'FACTORY_MACHINERY' | 'BUILDING_PROPERTY' | 'IT_HARDWARE';
  taxGroup: string;
  acquisitionDate: string;
  acquisitionCost: number;
  usefulLifeYears: number;
  salvageResidualValue: number;
  monthlyDepreciationAmount: number;
  accumulatedDepreciationTotal: number;
  netBookValue: number;
  depreciationMethod: 'STRAIGHT_LINE' | 'DECLINING_BALANCE';
  lastJournalPostedPeriod?: string;
  status: 'ACTIVE_DEPRECIATING' | 'FULLY_DEPRECIATED' | 'DISPOSED';
}

export interface TaxDepreciationRule {
  id: string;
  groupCode: string;
  groupName: string;
  assetClassification: 'NON_BUILDING' | 'BUILDING_PERMANENT' | 'BUILDING_NON_PERMANENT';
  usefulLifeYears: number;
  straightLineRatePct: number;
  decliningBalanceRatePct: number;
  examples: string;
}

export interface DepreciationAuditLog {
  id: string;
  timestamp: string;
  postedPeriod: string;
  executedBy: string;
  totalAssetsCount: number;
  totalJournalAmount: number;
  journalReference: string;
  notes: string;
}

export const MOCK_TAX_DEPRECIATION_RULES: TaxDepreciationRule[] = [
  {
    id: 'tax-rule-01',
    groupCode: 'KEL-1',
    groupName: 'Kelompok 1 (Bukan Bangunan)',
    assetClassification: 'NON_BUILDING',
    usefulLifeYears: 4,
    straightLineRatePct: 25.0,
    decliningBalanceRatePct: 50.0,
    examples: 'Komputer, Laptop, Barcode Scanner POS, Printer, Tools Dapur Kecil.'
  },
  {
    id: 'tax-rule-02',
    groupCode: 'KEL-2',
    groupName: 'Kelompok 2 (Bukan Bangunan)',
    assetClassification: 'NON_BUILDING',
    usefulLifeYears: 8,
    straightLineRatePct: 12.5,
    decliningBalanceRatePct: 25.0,
    examples: 'Mobil Operasional, Dump Truck, Oven Industri Bakery, AC, Furnitur Kantor.'
  },
  {
    id: 'tax-rule-03',
    groupCode: 'KEL-3',
    groupName: 'Kelompok 3 (Bukan Bangunan)',
    assetClassification: 'NON_BUILDING',
    usefulLifeYears: 16,
    straightLineRatePct: 6.25,
    decliningBalanceRatePct: 12.5,
    examples: 'Excavator Site Tambang, Mesin Smelting Peleburan Emas, Conveyor.'
  },
  {
    id: 'tax-rule-04',
    groupCode: 'KEL-4',
    groupName: 'Kelompok 4 (Bukan Bangunan)',
    assetClassification: 'NON_BUILDING',
    usefulLifeYears: 20,
    straightLineRatePct: 5.0,
    decliningBalanceRatePct: 10.0,
    examples: 'Lokomotif, Pipa Tambang Berat, Dermaga Kargo.'
  },
  {
    id: 'tax-rule-05',
    groupCode: 'BLG-PERM',
    groupName: 'Bangunan Permanen',
    assetClassification: 'BUILDING_PERMANENT',
    usefulLifeYears: 20,
    straightLineRatePct: 5.0,
    decliningBalanceRatePct: 0,
    examples: 'Gedung Head Office Sudirman, Pabrik Roti Permanen, Hotel.'
  }
];

export const MOCK_DEPRECIATION_AUDIT_LOGS: DepreciationAuditLog[] = [
  {
    id: 'log-202607-01',
    timestamp: '2026-07-24 10:45:00',
    postedPeriod: '2026-07',
    executedBy: 'Bpk. Rayhan Prasetya (Senior Accountant)',
    totalAssetsCount: 4,
    totalJournalAmount: 109583333,
    journalReference: 'JRN-DEP-202607-001',
    notes: 'Posting Jurnal Penyusutan Bulanan Serentak (Debit: 6-2001, Kredit: 1-2901)'
  },
  {
    id: 'log-202606-01',
    timestamp: '2026-06-30 17:00:00',
    postedPeriod: '2026-06',
    executedBy: 'Bpk. Rayhan Prasetya (Senior Accountant)',
    totalAssetsCount: 4,
    totalJournalAmount: 109583333,
    journalReference: 'JRN-DEP-202606-088',
    notes: 'Posting Penutupan Bulan Juni 2026'
  }
];

export const MOCK_FIXED_ASSETS_DEPRECIATION: FixedAssetDepreciationItem[] = [
  {
    id: 'ast-dep-01',
    assetCode: 'AST-CAT-320D-01',
    assetName: 'Excavator Caterpillar 320D Site Pit 1',
    category: 'HEAVY_EQUIPMENT',
    taxGroup: 'Kelompok 2 (8 Tahun)',
    acquisitionDate: '2024-01-15',
    acquisitionCost: 2850000000,
    usefulLifeYears: 8,
    salvageResidualValue: 250000000,
    monthlyDepreciationAmount: 27083333,
    accumulatedDepreciationTotal: 812500000,
    netBookValue: 2037500000,
    depreciationMethod: 'STRAIGHT_LINE',
    lastJournalPostedPeriod: '2026-06',
    status: 'ACTIVE_DEPRECIATING'
  },
  {
    id: 'ast-dep-02',
    assetCode: 'AST-DUMP-DT04-02',
    assetName: 'Armada Dump Truck Scania P410 Hauling',
    category: 'FLEET_VEHICLE',
    taxGroup: 'Kelompok 2 (8 Tahun)',
    acquisitionDate: '2024-03-01',
    acquisitionCost: 1950000000,
    usefulLifeYears: 5,
    salvageResidualValue: 150000000,
    monthlyDepreciationAmount: 30000000,
    accumulatedDepreciationTotal: 840000000,
    netBookValue: 1110000000,
    depreciationMethod: 'STRAIGHT_LINE',
    lastJournalPostedPeriod: '2026-06',
    status: 'ACTIVE_DEPRECIATING'
  },
  {
    id: 'ast-dep-03',
    assetCode: 'AST-OVEN-RTL-03',
    assetName: 'Oven Deck Otomatis Roti Industri Bakery',
    category: 'FACTORY_MACHINERY',
    taxGroup: 'Kelompok 1 (4 Tahun)',
    acquisitionDate: '2024-06-10',
    acquisitionCost: 480000000,
    usefulLifeYears: 4,
    salvageResidualValue: 40000000,
    monthlyDepreciationAmount: 9166667,
    accumulatedDepreciationTotal: 229166675,
    netBookValue: 250833325,
    depreciationMethod: 'STRAIGHT_LINE',
    lastJournalPostedPeriod: '2026-06',
    status: 'ACTIVE_DEPRECIATING'
  },
  {
    id: 'ast-dep-04',
    assetCode: 'AST-BLD-HQ-04',
    assetName: 'Gedung Head Office Sudirman Holding',
    category: 'BUILDING_PROPERTY',
    taxGroup: 'Bangunan Permanen (20 Tahun)',
    acquisitionDate: '2023-01-01',
    acquisitionCost: 12400000000,
    usefulLifeYears: 20,
    salvageResidualValue: 2000000000,
    monthlyDepreciationAmount: 43333333,
    accumulatedDepreciationTotal: 1819999986,
    netBookValue: 10580000014,
    depreciationMethod: 'STRAIGHT_LINE',
    lastJournalPostedPeriod: '2026-06',
    status: 'ACTIVE_DEPRECIATING'
  }
];
