export interface ClientParentCompany {
  id: string;
  clientCode: string;
  companyName: string;
  industryGroup: string;
  contactPerson: string;
  email: string;
  phone: string;
  subscriptionPlan: 'ENTERPRISE_UNLIMITED' | 'PROFESSIONAL' | 'STARTER';
  monthlyFee: number;
  activeModulesCount: number;
  totalTenantUnits: number;
  totalBranches: number;
  status: 'ACTIVE' | 'TRIAL' | 'SUSPENDED' | 'EXPIRED';
  licenseKey: string;
  validUntil: string;
  joinedDate: string;
}

export interface LicenseKeyItem {
  id: string;
  licenseKey: string;
  clientName: string;
  plan: string;
  issuedDate: string;
  expiryDate: string;
  status: 'UNUSED' | 'ACTIVATED' | 'REVOKED';
}

export interface SaaSDeveloperMetrics {
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  totalActiveHoldingClients: number;
  totalOperatingTenants: number;
  totalGlobalUsers: number;
  systemUptimePercentage: number;
}

export const MOCK_DEVELOPER_METRICS: SaaSDeveloperMetrics = {
  monthlyRecurringRevenue: 48500000,
  annualRecurringRevenue: 582000000,
  totalActiveHoldingClients: 6,
  totalOperatingTenants: 28,
  totalGlobalUsers: 342,
  systemUptimePercentage: 99.98
};

export const MOCK_CLIENT_PARENT_COMPANIES: ClientParentCompany[] = [
  {
    id: 'client-01',
    clientCode: 'CLT-NUSANTARA-01',
    companyName: 'Nusantara Enterprise Holding Group',
    industryGroup: 'Conglomerate Multi-Industry',
    contactPerson: 'Bpk. Rayhan Prasetya (CEO)',
    email: 'corporate@nusantara-holding.co.id',
    phone: '+62 21 5558 9900',
    subscriptionPlan: 'ENTERPRISE_UNLIMITED',
    monthlyFee: 12500000,
    activeModulesCount: 9,
    totalTenantUnits: 6,
    totalBranches: 14,
    status: 'ACTIVE',
    licenseKey: 'SaaS-ENT-2026-NUSA-9981-X',
    validUntil: '2027-12-31',
    joinedDate: '2025-01-01'
  },
  {
    id: 'client-02',
    clientCode: 'CLT-MAHKOTA-02',
    companyName: 'Mahkota Bakery & Culinary Group',
    industryGroup: 'Retail Bakery & FnB Chain',
    contactPerson: 'Ibu Siska Mahkota',
    email: 'contact@mahkota-bakery.com',
    phone: '+62 21 4432 1100',
    subscriptionPlan: 'PROFESSIONAL',
    monthlyFee: 6800000,
    activeModulesCount: 5,
    totalTenantUnits: 3,
    totalBranches: 8,
    status: 'ACTIVE',
    licenseKey: 'SaaS-PRO-2026-MHKT-4412-B',
    validUntil: '2026-11-30',
    joinedDate: '2025-06-15'
  },
  {
    id: 'client-03',
    clientCode: 'CLT-BORNEO-03',
    companyName: 'PT Borneo Resources & Mining',
    industryGroup: 'Pertambangan Emas & Energi',
    contactPerson: 'Ir. Hidayat Mining',
    email: 'info@borneo-resources.co.id',
    phone: '+62 541 7766 221',
    subscriptionPlan: 'ENTERPRISE_UNLIMITED',
    monthlyFee: 15000000,
    activeModulesCount: 8,
    totalTenantUnits: 4,
    totalBranches: 6,
    status: 'ACTIVE',
    licenseKey: 'SaaS-ENT-2026-BRNO-7719-M',
    validUntil: '2028-06-30',
    joinedDate: '2024-11-01'
  },
  {
    id: 'client-04',
    clientCode: 'CLT-ROYAL-04',
    companyName: 'Grand Royal Hotel & Resorts Ltd',
    industryGroup: 'Hotel & Hospitality',
    contactPerson: 'David Chen (Managing Director)',
    email: 'management@grandroyal-hotels.com',
    phone: '+62 361 8899 001',
    subscriptionPlan: 'PROFESSIONAL',
    monthlyFee: 7200000,
    activeModulesCount: 6,
    totalTenantUnits: 2,
    totalBranches: 4,
    status: 'ACTIVE',
    licenseKey: 'SaaS-PRO-2026-ROYL-1102-H',
    validUntil: '2026-09-30',
    joinedDate: '2025-02-10'
  }
];

export const MOCK_LICENSE_KEYS: LicenseKeyItem[] = [
  {
    id: 'lic-101',
    licenseKey: 'SaaS-ENT-2026-NUSA-9981-X',
    clientName: 'Nusantara Enterprise Holding Group',
    plan: 'ENTERPRISE_UNLIMITED',
    issuedDate: '2025-01-01',
    expiryDate: '2027-12-31',
    status: 'ACTIVATED'
  },
  {
    id: 'lic-102',
    licenseKey: 'SaaS-PRO-2026-NEW-9980-Z',
    clientName: 'Calon Klien Katering Massal Surabaya',
    plan: 'PROFESSIONAL',
    issuedDate: '2026-07-24',
    expiryDate: '2027-07-24',
    status: 'UNUSED'
  }
];
