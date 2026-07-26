export interface MasterTaxItem {
  id: string;
  code: string;
  name: string;
  ratePercentage: number;
  coaAccount: string;
  applicableModules: string[]; // e.g. ['POS Retail', 'Hotel PMS', 'Resto POS', 'Vendor PO']
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaxAuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: 'CREATE' | 'EDIT' | 'DELETE' | 'SOFT_DELETE';
  taxCode: string;
  details: string;
}

export const MOCK_TAX_ITEMS: MasterTaxItem[] = [
  {
    id: 'tax-01',
    code: 'TAX-PPN-11',
    name: 'PPN 11% Standar Retail',
    ratePercentage: 11,
    coaAccount: '2-10300 - Utang PPN Keluaran Retail',
    applicableModules: ['POS Retail', 'Vendor PO'],
    status: 'ACTIVE',
    isDeleted: false,
    createdAt: '2026-01-01 08:00',
    updatedAt: '2026-07-20 10:30'
  },
  {
    id: 'tax-02',
    code: 'TAX-PPN-12',
    name: 'PPN 12% Regulasi Terbaru 2026',
    ratePercentage: 12,
    coaAccount: '2-10300 - Utang PPN Keluaran Retail',
    applicableModules: ['POS Retail', 'Vendor PO'],
    status: 'ACTIVE',
    isDeleted: false,
    createdAt: '2026-01-01 08:00',
    updatedAt: '2026-07-20 10:30'
  },
  {
    id: 'tax-03',
    code: 'TAX-PB1-10',
    name: 'Pajak Restoran & Hotel (PB1 10%)',
    ratePercentage: 10,
    coaAccount: '2-10301 - Utang Pajak Restoran & Hotel PB1',
    applicableModules: ['Hotel PMS', 'Resto POS'],
    status: 'ACTIVE',
    isDeleted: false,
    createdAt: '2026-01-01 08:00',
    updatedAt: '2026-07-20 10:30'
  },
  {
    id: 'tax-04',
    code: 'TAX-ZERO-0',
    name: 'Bebas Pajak / Non-Taxable (0%)',
    ratePercentage: 0,
    coaAccount: 'N/A - Non Taxable Account',
    applicableModules: ['POS Retail', 'Hotel PMS', 'Resto POS', 'Vendor PO'],
    status: 'ACTIVE',
    isDeleted: false,
    createdAt: '2026-01-01 08:00',
    updatedAt: '2026-07-20 10:30'
  }
];

export const MOCK_TAX_AUDIT_LOGS: TaxAuditLog[] = [
  {
    id: 'audit-t-01',
    timestamp: '2026-07-20 10:30:15',
    user: 'Bambang Soetjipto',
    role: 'IT / TOP MANAGEMENT',
    action: 'EDIT',
    taxCode: 'TAX-PPN-12',
    details: 'Pembaruan tarif PPN dari 11% menjadi 12% sesuai PMK 2026 & Linkage COA 2-10300'
  },
  {
    id: 'audit-t-02',
    timestamp: '2026-06-15 14:20:00',
    user: 'Super Admin IT',
    role: 'IT_ADMIN',
    action: 'CREATE',
    taxCode: 'TAX-PB1-10',
    details: 'Registrasi Master Pajak PB1 10% untuk Unit Usaha Hotel & Restoran'
  }
];
