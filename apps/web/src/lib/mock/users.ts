export interface SystemUserItem {
  id: string;
  fullName: string;
  email: string;
  systemRole: 'SUPER_ADMIN' | 'HOLDING_EXECUTIVE' | 'TENANT_USER';
  assignedTenants: {
    tenantId: string;
    code: string;
    name: string;
    roleInTenant: string;
  }[];
  grantedPermissions: string[];
  status: 'ACTIVE' | 'SUSPENDED';
  lastLogin: string;
}

export const MOCK_USERS_LIST: SystemUserItem[] = [
  {
    id: 'user-bayu-001',
    fullName: 'Bayu Yanuar',
    email: 'gonzhilaz@gmail.com',
    systemRole: 'SUPER_ADMIN',
    assignedTenants: [
      { tenantId: 'holding', code: 'HOLDING-HQ', name: 'Holding Enterprise Headquarter', roleInTenant: 'SUPER_ADMIN' },
      { tenantId: 'tenant-resto-01', code: 'RESTO-01', name: 'Nusantara Culinary & Catering', roleInTenant: 'SUPER_ADMIN' },
      { tenantId: 'tenant-gold-01', code: 'GOLD-MINE-01', name: 'PT Borneo Mining Emas', roleInTenant: 'SUPER_ADMIN' },
      { tenantId: 'tenant-hotel-01', code: 'HOTEL-01', name: 'Grand Royal Hotel & Resort', roleInTenant: 'SUPER_ADMIN' },
      { tenantId: 'tenant-retail-01', code: 'RETAIL-01', name: 'Nusa Mart Retail Chain', roleInTenant: 'SUPER_ADMIN' }
    ],
    grantedPermissions: ['*'],
    status: 'ACTIVE',
    lastLogin: '2026-07-27 18:00:00'
  },
  {
    id: 'user-001',
    fullName: 'Budi Santoso',
    email: 'admin@holding.com',
    systemRole: 'HOLDING_EXECUTIVE',
    assignedTenants: [
      { tenantId: 'tenant-resto-01', code: 'RESTO-01', name: 'Nusantara Culinary & Catering', roleInTenant: 'DIREKSI' },
      { tenantId: 'tenant-gold-01', code: 'GOLD-MINE-01', name: 'PT Borneo Mining Emas', roleInTenant: 'DIREKSI' },
      { tenantId: 'tenant-hotel-01', code: 'HOTEL-01', name: 'Grand Royal Hotel & Resort', roleInTenant: 'DIREKSI' },
      { tenantId: 'tenant-retail-01', code: 'RETAIL-01', name: 'Nusa Mart Retail Chain', roleInTenant: 'DIREKSI' }
    ],
    grantedPermissions: ['finance:full', 'inventory:full', 'po:approve_executive', 'hrd:payroll', 'system:all'],
    status: 'ACTIVE',
    lastLogin: '2026-07-23 10:55:00'
  },
  {
    id: 'user-002',
    fullName: 'Siti Aminah',
    email: 'manager.resto@holding.com',
    systemRole: 'TENANT_USER',
    assignedTenants: [
      { tenantId: 'tenant-resto-01', code: 'RESTO-01', name: 'Nusantara Culinary & Catering', roleInTenant: 'UNIT_MANAGER' }
    ],
    grantedPermissions: ['finance:view', 'inventory:manage', 'pos:cashier', 'hrd:view'],
    status: 'ACTIVE',
    lastLogin: '2026-07-23 09:12:00'
  },
  {
    id: 'user-003',
    fullName: 'Rudi Hermawan',
    email: 'rudi.mining@holding.com',
    systemRole: 'TENANT_USER',
    assignedTenants: [
      { tenantId: 'tenant-gold-01', code: 'GOLD-MINE-01', name: 'PT Borneo Mining Emas', roleInTenant: 'SITE_SUPERVISOR' }
    ],
    grantedPermissions: ['inventory:manage', 'ess:clock_in', 'safety:report'],
    status: 'ACTIVE',
    lastLogin: '2026-07-22 16:40:00'
  }
];
