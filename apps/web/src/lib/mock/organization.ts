export interface HoldingEnterprise {
  id: string;
  holdingCode: string;
  name: string;
  taxIdNpwp: string;
  holdingAdminUser: string;
  holdingAdminEmail: string;
  createdDate: string;
}

export interface BranchSite {
  id: string;
  branchCode: string;
  tenantDomain: 'HOLDING' | 'MINING' | 'RESTO' | 'HOTEL' | 'RETAIL';
  name: string;
  cityLocation: string;
  headOfBranch: string;
}

export interface DepartmentItem {
  id: string;
  branchId: string;
  deptCode: string;
  name: string;
}

export interface AccessTemplate {
  id: string;
  templateName: string;
  description: string;
  allowedModules: string[];
}

export interface UserAccessRule {
  id: string;
  userName: string;
  userEmail: string;
  role: 'SUPER_ADMIN' | 'HOLDING_ADMIN' | 'UNIT_ADMIN' | 'OPERATIONAL_USER';
  tenantDomain: string;
  branchName: string;
  departmentName: string;
  assignedTemplateId?: string;
  customAllowedModules: string[];
}

export const MOCK_HOLDINGS: HoldingEnterprise[] = [
  {
    id: 'hold-01',
    holdingCode: 'HOLD-ENT-001',
    name: 'PT Antigravity Multi-Industry Enterprise Group',
    taxIdNpwp: '01.882.912.8-012.000',
    holdingAdminUser: 'Irfan Ariessaputra',
    holdingAdminEmail: 'irfan.ariessaputra@gmail.com',
    createdDate: '2024-01-01'
  }
];

export const MOCK_BRANCHES: BranchSite[] = [
  {
    id: 'br-01',
    branchCode: 'BR-JKT-HQ',
    tenantDomain: 'HOLDING',
    name: 'Kantor Pusat Holding Jakarta',
    cityLocation: 'Jakarta Selatan',
    headOfBranch: 'Budi Santoso'
  },
  {
    id: 'br-02',
    branchCode: 'BR-KALTIM-MINING',
    tenantDomain: 'MINING',
    name: 'Site Pertambangan Emas Kutai',
    cityLocation: 'Samarinda, Kaltim',
    headOfBranch: 'Ir. Hendra'
  },
  {
    id: 'br-03',
    branchCode: 'BR-BDG-RESTO',
    tenantDomain: 'RESTO',
    name: 'Outlet Resto & Catering Central',
    cityLocation: 'Bandung, Jawa Barat',
    headOfBranch: 'Chef Arnold'
  }
];

export const MOCK_ACCESS_TEMPLATES: AccessTemplate[] = [
  {
    id: 'tmpl-01',
    templateName: 'Finance & Accounting Manager',
    description: 'Akses penuh ke modul Rekonsiliasi, Kas Kecil, Pajak e-SPT, AP/AR, & Reports',
    allowedModules: ['/finance/overview', '/finance/reconciliation', '/finance/petty-cash', '/finance/tax-reports', '/finance/ap', '/finance/ar']
  },
  {
    id: 'tmpl-02',
    templateName: 'Site Mining Operations',
    description: 'Akses terbatas ke Inventory Alat Berat, Presensi Site, & Safety Certifications SIO',
    allowedModules: ['/inventory/assets', '/hrd/certifications', '/ess/attendance']
  },
  {
    id: 'tmpl-03',
    templateName: 'Resto & F&B Cashier',
    description: 'Akses ke POS Cashier, KDS Dapur, & Setoran Kasir',
    allowedModules: ['/pos/cashier', '/pos/kds']
  }
];

export const MOCK_USER_ACCESS_RULES: UserAccessRule[] = [
  {
    id: 'usr-01',
    userName: 'Irfan Ariessaputra',
    userEmail: 'irfan.ariessaputra@gmail.com',
    role: 'SUPER_ADMIN',
    tenantDomain: 'HOLDING',
    branchName: 'Kantor Pusat Holding Jakarta',
    departmentName: 'Direksi & Executive Management',
    customAllowedModules: ['ALL']
  },
  {
    id: 'usr-02',
    userName: 'Siti Rahma',
    userEmail: 'siti.rahma@company.com',
    role: 'UNIT_ADMIN',
    tenantDomain: 'RESTO',
    branchName: 'Outlet Resto & Catering Central',
    departmentName: 'Finance & Administration',
    assignedTemplateId: 'tmpl-01',
    customAllowedModules: ['/finance/overview', '/finance/petty-cash', '/hrd/payroll-disbursement']
  }
];
