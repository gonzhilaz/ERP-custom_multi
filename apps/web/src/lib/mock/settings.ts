export interface ParentCompanyProfile {
  id: string;
  companyName: string;
  brandTagline: string;
  logoUrl?: string;
  headOfficeAddress: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  website: string;
  taxId: string; // NPWP Perusahaan Holding
  themeAccentColor: 'sky' | 'emerald' | 'indigo' | 'amber' | 'rose';
  subscriptionPlan: 'ENTERPRISE_UNLIMITED' | 'PROFESSIONAL' | 'STARTER';
  activeSince: string;
}

export interface ModuleSubscriptionItem {
  id: string;
  code: string;
  name: string;
  category: string;
  isPurchased: boolean;
  isEnabled: boolean;
  monthlyFee: number;
  description: string;
}

export const INITIAL_PARENT_COMPANY: ParentCompanyProfile = {
  id: 'holding-parent-01',
  companyName: 'Nusantara Enterprise Holding Group',
  brandTagline: 'Multi-Industry Conglomerate & Holding ERP System',
  logoUrl: '',
  headOfficeAddress: 'Treasury Tower Lt. 42, District 8 SCBD',
  city: 'Jakarta Selatan',
  province: 'DKI Jakarta',
  postalCode: '12190',
  phone: '+62 21 5558 9900',
  email: 'corporate@nusantara-holding.co.id',
  website: 'https://nusantara-holding.co.id',
  taxId: '01.345.678.9-012.000',
  themeAccentColor: 'sky',
  subscriptionPlan: 'ENTERPRISE_UNLIMITED',
  activeSince: '2025-01-01'
};

export const INITIAL_MODULE_SUBSCRIPTIONS: ModuleSubscriptionItem[] = [
  {
    id: 'mod-fin',
    code: 'FINANCE',
    name: 'Finance & Accounting Engine',
    category: 'Core Financial',
    isPurchased: true,
    isEnabled: true,
    monthlyFee: 1500000,
    description: 'Buku Besar, COA, Jurnal Umum, AP/AR, & Konsolidasi Holding Laporan Keuangan.'
  },
  {
    id: 'mod-inv',
    code: 'INVENTORY',
    name: 'Multi-Warehouse Inventory & Assets',
    category: 'Supply Chain',
    isPurchased: true,
    isEnabled: true,
    monthlyFee: 1200000,
    description: 'Master SKU, Multi-Warehouse Tracking, Requisition, & Management Aset.'
  },
  {
    id: 'mod-mfg',
    code: 'MANUFACTURING',
    name: 'Universal Manufacturing & Dynamic BOM',
    category: 'Production',
    isPurchased: true,
    isEnabled: true,
    monthlyFee: 1800000,
    description: 'Resep BOM, Batch Work Orders, & Auto-Post Jurnal COGM (Toko Roti, Tambang, Resto).'
  },
  {
    id: 'mod-pos',
    code: 'POS',
    name: 'POS Cashier & Retail Operations',
    category: 'Front-Office Sales',
    isPurchased: true,
    isEnabled: true,
    monthlyFee: 900000,
    description: 'Kasir Touchscreen, Barcode Scanner, Multi-Tax Master (PPN/PB1), & Thermal Receipt.'
  },
  {
    id: 'mod-proc',
    code: 'VENDOR',
    name: 'Procurement & Vendor Directory',
    category: 'Supply Chain',
    isPurchased: true,
    isEnabled: true,
    monthlyFee: 850000,
    description: 'Purchase Orders (PO), Supplier Directory, & 3-Way Matching Invoicing.'
  },
  {
    id: 'mod-hrd',
    code: 'HRD',
    name: 'HRD, Payroll & PPh 21 TER 2026 Engine',
    category: 'Human Capital',
    isPurchased: true,
    isEnabled: true,
    monthlyFee: 1350000,
    description: 'Manajemen Karyawan, Formula PPh 21 TER 2026, Payroll Slips, & ESS Self-Service.'
  },
  {
    id: 'mod-htl',
    code: 'HOTELIER',
    name: 'Hotel PMS & Hospitality System',
    category: 'Industry Vertical',
    isPurchased: true,
    isEnabled: true,
    monthlyFee: 1600000,
    description: 'Kamar Hotel, Housekeeping, Guest Folio, Check-In/Check-Out, & Occupancy Engine.'
  },
  {
    id: 'mod-mgr',
    code: 'MANAGERIAL',
    name: 'Executive Managerial & Legal DMS',
    category: 'Governance',
    isPurchased: true,
    isEnabled: true,
    monthlyFee: 1100000,
    description: 'Budgeting vs Actual, Document Management Vault (DMS), & Business Intelligence.'
  },
  {
    id: 'mod-ai',
    code: 'AI_ASSISTANT',
    name: 'Enterprise Copilot AI Assistant',
    category: 'Artificial Intelligence',
    isPurchased: true,
    isEnabled: true,
    monthlyFee: 2000000,
    description: 'Asisten cerdas analisis laporan, rekomendasi stok, & audit trail rasio otomatis.'
  }
];
