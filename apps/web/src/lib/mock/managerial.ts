export interface BudgetItem {
  id: string;
  unitUsaha: string;
  category: string;
  budgetAllocated: number;
  actualSpent: number;
  variance: number;
  utilizationPercentage: number;
  status: 'ON_TRACK' | 'WARNING' | 'OVER_BUDGET';
}

export interface LegalDocumentItem {
  id: string;
  documentNumber: string;
  title: string;
  category: string; // e.g. "Izin Usaha Tambang (IUP)", "Sertifikat HGB Hotel", "Izin Halal BPOM"
  unitUsaha: string;
  issueDate: string;
  expiryDate: string;
  status: 'VALID' | 'EXPIRING_SOON' | 'EXPIRED';
}

export const MOCK_BUDGETS: BudgetItem[] = [
  {
    id: 'bgt-001',
    unitUsaha: 'PT Borneo Mining Emas',
    category: 'Heavy Machinery Maintenance & Fuel',
    budgetAllocated: 2000000000,
    actualSpent: 1850000000,
    variance: 150000000,
    utilizationPercentage: 92.5,
    status: 'ON_TRACK'
  },
  {
    id: 'bgt-002',
    unitUsaha: 'Nusantara Culinary & Catering',
    category: 'Perishable Food Ingredients',
    budgetAllocated: 300000000,
    actualSpent: 280000000,
    variance: 20000000,
    utilizationPercentage: 93.3,
    status: 'ON_TRACK'
  },
  {
    id: 'bgt-003',
    unitUsaha: 'Grand Royal Hotel & Resort',
    category: 'Building Renovation & Amenities',
    budgetAllocated: 500000000,
    actualSpent: 520000000,
    variance: -20000000,
    utilizationPercentage: 104.0,
    status: 'OVER_BUDGET'
  }
];

export const MOCK_LEGAL_DOCUMENTS: LegalDocumentItem[] = [
  {
    id: 'doc-001',
    documentNumber: 'KIR-DISHUB-2026-081',
    title: 'Uji Berkala KIR Truk Tronton Hino 500 (B 9122 UXX)',
    category: 'Logistik & Fleet (KIR)',
    unitUsaha: 'PT Borneo Mining Emas',
    issueDate: '2026-02-15',
    expiryDate: '2026-08-15',
    status: 'EXPIRING_SOON'
  },
  {
    id: 'doc-002',
    documentNumber: 'STNK-SAMSAT-99120',
    title: 'STNK & Pajak Tahunan Truk Heavy Box Isuzu Giga (B 8831 CXX)',
    category: 'Logistik & Fleet (STNK)',
    unitUsaha: 'Nusa Mart Retail Chain',
    issueDate: '2025-08-20',
    expiryDate: '2026-08-20',
    status: 'EXPIRING_SOON'
  },
  {
    id: 'doc-003',
    documentNumber: 'IZIN-B3-ESDM-2024-44',
    title: 'Izin Usaha Transportasi & Angkutan B3 Bahan Bakar Site',
    category: 'Izin Angkutan B3',
    unitUsaha: 'PT Borneo Mining Emas',
    issueDate: '2024-03-10',
    expiryDate: '2027-03-10',
    status: 'VALID'
  },
  {
    id: 'doc-004',
    documentNumber: 'IUP-MINING-2024-009',
    title: 'Izin Usaha Pertambangan (IUP) Operasi Produksi Emas',
    category: 'Izin Usaha Tambang (IUP)',
    unitUsaha: 'PT Borneo Mining Emas',
    issueDate: '2024-01-15',
    expiryDate: '2034-01-15',
    status: 'VALID'
  },
  {
    id: 'doc-005',
    documentNumber: 'HALAL-BPOM-882199',
    title: 'Sertifikat Halal & Higiene Catering Massal',
    category: 'Izin Halal & BPOM',
    unitUsaha: 'Nusantara Culinary & Catering',
    issueDate: '2024-05-10',
    expiryDate: '2026-11-10',
    status: 'VALID'
  }
];
