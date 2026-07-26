export type SystemRole =
  | 'HOLDING_EXECUTIVE'
  | 'COMPANY_ADMIN'
  | 'RESTO_MANAGER'
  | 'RESTO_CHEF'
  | 'RESTO_CASHIER'
  | 'HOTEL_GENERAL_MANAGER'
  | 'FRONT_OFFICE_RECEPTIONIST'
  | 'EXECUTIVE_HOUSEKEEPER'
  | 'SITE_MANAGER_MINING'
  | 'SITE_MECHANIC_SUPERVISOR'
  | 'RETAIL_STORE_MANAGER'
  | 'RETAIL_CASHIER';

export interface UserRoleProfile {
  role: SystemRole;
  label: string;
  department: string;
  allowedSubMenuHrefs: string[];
}

export const USER_ROLE_PROFILES: Record<SystemRole, UserRoleProfile> = {
  HOLDING_EXECUTIVE: {
    role: 'HOLDING_EXECUTIVE',
    label: 'Holding Executive Board',
    department: 'Holding Board of Directors',
    allowedSubMenuHrefs: ['*'] // Access all
  },
  COMPANY_ADMIN: {
    role: 'COMPANY_ADMIN',
    label: 'Company Admin / Manager',
    department: 'Executive Management',
    allowedSubMenuHrefs: ['*']
  },
  RESTO_MANAGER: {
    role: 'RESTO_MANAGER',
    label: 'Resto Unit Manager',
    department: 'F&B Operations',
    allowedSubMenuHrefs: ['*']
  },
  RESTO_CHEF: {
    role: 'RESTO_CHEF',
    label: 'Head Catering Chef',
    department: 'FnB Product (Kitchen)',
    allowedSubMenuHrefs: ['/pos/kds', '/inventory/overview', '/inventory/items', '/inventory/warehouses', '/inventory/requisitions', '/ess/overview', '/ess/attendance', '/ess/schedule', '/ess/leaves', '/ess/overtime', '/ess/claims']
  },
  RESTO_CASHIER: {
    role: 'RESTO_CASHIER',
    label: 'Resto Cashier Officer',
    department: 'FnB Service',
    allowedSubMenuHrefs: ['/pos/cashier', '/ess/overview', '/ess/attendance', '/ess/schedule', '/ess/leaves', '/ess/overtime', '/ess/claims']
  },
  HOTEL_GENERAL_MANAGER: {
    role: 'HOTEL_GENERAL_MANAGER',
    label: 'Hotel General Manager',
    department: 'Executive Hotelier',
    allowedSubMenuHrefs: ['*']
  },
  FRONT_OFFICE_RECEPTIONIST: {
    role: 'FRONT_OFFICE_RECEPTIONIST',
    label: 'Front Office Receptionist',
    department: 'Front Office',
    allowedSubMenuHrefs: ['/hotelier/rooms', '/ess/overview', '/ess/attendance', '/ess/schedule', '/ess/leaves', '/ess/overtime', '/ess/claims']
  },
  EXECUTIVE_HOUSEKEEPER: {
    role: 'EXECUTIVE_HOUSEKEEPER',
    label: 'Executive Housekeeper',
    department: 'Housekeeping',
    allowedSubMenuHrefs: ['/inventory/overview', '/inventory/items', '/inventory/assets', '/inventory/warehouses', '/ess/overview', '/ess/attendance', '/ess/schedule', '/ess/leaves', '/ess/overtime', '/ess/claims']
  },
  SITE_MANAGER_MINING: {
    role: 'SITE_MANAGER_MINING',
    label: 'Mining Site Manager',
    department: 'Site Operations',
    allowedSubMenuHrefs: ['*']
  },
  SITE_MECHANIC_SUPERVISOR: {
    role: 'SITE_MECHANIC_SUPERVISOR',
    label: 'Site Fleet Mechanic Supervisor',
    department: 'Engineering & Heavy Machinery',
    allowedSubMenuHrefs: ['/inventory/overview', '/inventory/assets', '/inventory/assets/maintenance', '/inventory/items', '/inventory/warehouses', '/ess/overview', '/ess/attendance', '/ess/schedule', '/ess/leaves', '/ess/overtime', '/ess/claims']
  },
  RETAIL_STORE_MANAGER: {
    role: 'RETAIL_STORE_MANAGER',
    label: 'Retail Store Manager',
    department: 'Retail Store Operations',
    allowedSubMenuHrefs: ['*']
  },
  RETAIL_CASHIER: {
    role: 'RETAIL_CASHIER',
    label: 'Retail Store Cashier',
    department: 'Store Front',
    allowedSubMenuHrefs: ['/pos/cashier', '/ess/overview', '/ess/attendance', '/ess/schedule', '/ess/leaves', '/ess/overtime', '/ess/claims']
  }
};

export const isSubMenuAllowedForRole = (userRole: SystemRole, href: string): boolean => {
  const profile = USER_ROLE_PROFILES[userRole];
  if (!profile) return true;
  if (profile.allowedSubMenuHrefs.includes('*')) return true;
  return profile.allowedSubMenuHrefs.includes(href);
};
