/**
 * Dynamic Tenant & User Access Template Engine.
 * Allows HR/Admin to create, customize, and assign module access templates per tenant domain and per user.
 */

export interface ModuleAccessItem {
  id: string;
  name: string;
  href: string;
  category: 'CORE' | 'OPERATIONAL' | 'MANAGERIAL' | 'SYSTEM';
  iconName: string;
  isAllowed: boolean;
}

export interface AccessTemplate {
  id: string;
  templateName: string;
  targetType: 'TENANT' | 'USER_ROLE';
  tenantDomain?: 'HOLDING' | 'RESTO' | 'MINING' | 'HOTEL' | 'RETAIL';
  allowedModules: string[]; // Module IDs allowed
  customRoutes?: string[];
  isCustomized: boolean;
}

export const DEFAULT_ACCESS_MODULES: ModuleAccessItem[] = [
  { id: 'FINANCE', name: 'Finance & COA', href: '/finance', category: 'CORE', iconName: 'Wallet', isAllowed: true },
  { id: 'INVENTORY', name: 'Inventory & Storage', href: '/inventory', category: 'CORE', iconName: 'Boxes', isAllowed: true },
  { id: 'VENDOR', name: 'Vendor & PO', href: '/vendor', category: 'OPERATIONAL', iconName: 'Truck', isAllowed: true },
  { id: 'HRD', name: 'HRD & Payroll', href: '/hrd', category: 'OPERATIONAL', iconName: 'Users', isAllowed: true },
  { id: 'ESS', name: 'Employee Portal (ESS)', href: '/ess', category: 'OPERATIONAL', iconName: 'UserCheck', isAllowed: true },
  { id: 'POS', name: 'Kasir & POS', href: '/pos', category: 'OPERATIONAL', iconName: 'ShoppingCart', isAllowed: true },
  { id: 'HOTELIER', name: 'Hotel & MICE PMS', href: '/hotelier', category: 'OPERATIONAL', iconName: 'Building', isAllowed: true },
  { id: 'CATERING', name: 'Mass Catering', href: '/catering', category: 'OPERATIONAL', iconName: 'Utensils', isAllowed: true },
  { id: 'MINING', name: 'Mining Operations', href: '/mining', category: 'OPERATIONAL', iconName: 'HardHat', isAllowed: true },
  { id: 'CRM', name: 'CRM & Field Sales', href: '/crm', category: 'OPERATIONAL', iconName: 'PhoneCall', isAllowed: true },
  { id: 'MANAGERIAL', name: 'Managerial & Budgeting', href: '/managerial', category: 'MANAGERIAL', iconName: 'BarChart3', isAllowed: true },
  { id: 'HEALTH', name: 'System Health', href: '/system-health', category: 'SYSTEM', iconName: 'Activity', isAllowed: true },
  { id: 'USERS', name: 'User Management', href: '/users/management', category: 'SYSTEM', iconName: 'ShieldCheck', isAllowed: true }
];

export const DEFAULT_TENANT_TEMPLATES: AccessTemplate[] = [
  {
    id: 'tmpl-tenant-holding',
    templateName: 'Template Access Holding Enterprise (Full Access)',
    targetType: 'TENANT',
    tenantDomain: 'HOLDING',
    allowedModules: DEFAULT_ACCESS_MODULES.map((m) => m.id),
    isCustomized: false
  },
  {
    id: 'tmpl-tenant-resto',
    templateName: 'Template Access Resto F&B & Catering',
    targetType: 'TENANT',
    tenantDomain: 'RESTO',
    allowedModules: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'POS', 'CATERING', 'MANAGERIAL'],
    isCustomized: false
  },
  {
    id: 'tmpl-tenant-mining',
    templateName: 'Template Access Site Pertambangan',
    targetType: 'TENANT',
    tenantDomain: 'MINING',
    allowedModules: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'MINING', 'MANAGERIAL'],
    isCustomized: false
  },
  {
    id: 'tmpl-tenant-hotel',
    templateName: 'Template Access Hotel PMS & Resort',
    targetType: 'TENANT',
    tenantDomain: 'HOTEL',
    allowedModules: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'HOTELIER', 'MANAGERIAL'],
    isCustomized: false
  }
];

const ACCESS_TEMPLATES_STORAGE_KEY = 'erp_access_templates_v2';

export function getStoredAccessTemplates(): AccessTemplate[] {
  if (typeof window === 'undefined') return DEFAULT_TENANT_TEMPLATES;
  try {
    const raw = localStorage.getItem(ACCESS_TEMPLATES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_TENANT_TEMPLATES;
  } catch (e) {
    console.error('Error loading access templates', e);
    return DEFAULT_TENANT_TEMPLATES;
  }
}

export function saveAccessTemplate(template: AccessTemplate): AccessTemplate[] {
  const templates = getStoredAccessTemplates();
  const existingIdx = templates.findIndex((t) => t.id === template.id);

  let updated: AccessTemplate[];
  if (existingIdx >= 0) {
    updated = [...templates];
    updated[existingIdx] = { ...template, isCustomized: true };
  } else {
    updated = [template, ...templates];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCESS_TEMPLATES_STORAGE_KEY, JSON.stringify(updated));
  }

  return updated;
}
