export interface ModuleActionPermission {
  moduleCode: string;
  moduleName: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean; // Soft Delete
  canApprove: boolean;
}

export interface RolePermissionTemplate {
  id: string;
  code: string;
  name: string;
  description: string;
  isSystemPreset: boolean; // True = Main Developer Default, False = Custom Parent Template
  tenantTypeTarget: string; // e.g. All, Toko Roti, Resto, Mining, Hotel
  permissions: ModuleActionPermission[];
  userCount: number;
  updatedAt: string;
}

export const DEFAULT_MODULE_PERMISSIONS: ModuleActionPermission[] = [
  { moduleCode: 'POS', moduleName: 'POS Cashier & Retail Operations', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false },
  { moduleCode: 'INVENTORY', moduleName: 'Inventory & Multi-Warehouse', canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
  { moduleCode: 'MANUFACTURING', moduleName: 'Manufaktur & Resep BOM', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
  { moduleCode: 'FINANCE', moduleName: 'Finance & Accounting Engine', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
  { moduleCode: 'VENDOR', moduleName: 'Procurement & Vendor Directory', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
  { moduleCode: 'HRD', moduleName: 'HRD & Payroll Engine', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
  { moduleCode: 'HOTELIER', moduleName: 'Hotel PMS & Hospitality', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
  { moduleCode: 'MANAGERIAL', moduleName: 'Executive Managerial & DMS', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
  { moduleCode: 'ESS', moduleName: 'Employee Self Service (ESS)', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false }
];

export const MOCK_ROLE_TEMPLATES: RolePermissionTemplate[] = [
  {
    id: 'tmpl-exec-01',
    code: 'TPL-HOLDING-EXEC',
    name: 'Holding Executive & Board (All Access)',
    description: 'Akses penuh ke seluruh modul, laporan keuangan konsolidasi, & manajemen holding.',
    isSystemPreset: true,
    tenantTypeTarget: 'Parent Company / HO',
    userCount: 4,
    updatedAt: '2026-07-24',
    permissions: DEFAULT_MODULE_PERMISSIONS.map((m) => ({
      ...m,
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canApprove: true
    }))
  },
  {
    id: 'tmpl-bakery-01',
    code: 'TPL-BAKERY-PROD',
    name: 'Baker Master & Dapur Toko Roti',
    description: 'Akses khusus Dapur Produksi Roti, Formulasi Resep BOM, Gudang Bahan Baku, & ESS.',
    isSystemPreset: true,
    tenantTypeTarget: 'Retail Bakery Chain',
    userCount: 6,
    updatedAt: '2026-07-23',
    permissions: [
      { moduleCode: 'POS', moduleName: 'POS Cashier & Retail Operations', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'INVENTORY', moduleName: 'Inventory & Multi-Warehouse', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: false },
      { moduleCode: 'MANUFACTURING', moduleName: 'Manufaktur & Resep BOM', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: true },
      { moduleCode: 'FINANCE', moduleName: 'Finance & Accounting Engine', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'VENDOR', moduleName: 'Procurement & Vendor Directory', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'HRD', moduleName: 'HRD & Payroll Engine', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'HOTELIER', moduleName: 'Hotel PMS & Hospitality', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'MANAGERIAL', moduleName: 'Executive Managerial & DMS', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'ESS', moduleName: 'Employee Self Service (ESS)', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false }
    ]
  },
  {
    id: 'tmpl-cashier-01',
    code: 'TPL-STORE-CASHIER',
    name: 'Kasir Toko Roti & Resto',
    description: 'Akses transaksi Kasir POS, Barcode Scanner, Thermal Print Receipt, & Absensi ESS.',
    isSystemPreset: true,
    tenantTypeTarget: 'Retail Chain / FnB',
    userCount: 18,
    updatedAt: '2026-07-22',
    permissions: [
      { moduleCode: 'POS', moduleName: 'POS Cashier & Retail Operations', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'INVENTORY', moduleName: 'Inventory & Multi-Warehouse', canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'MANUFACTURING', moduleName: 'Manufaktur & Resep BOM', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'FINANCE', moduleName: 'Finance & Accounting Engine', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'VENDOR', moduleName: 'Procurement & Vendor Directory', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'HRD', moduleName: 'HRD & Payroll Engine', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'HOTELIER', moduleName: 'Hotel PMS & Hospitality', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'MANAGERIAL', moduleName: 'Executive Managerial & DMS', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'ESS', moduleName: 'Employee Self Service (ESS)', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false }
    ]
  },
  {
    id: 'tmpl-custom-01',
    code: 'TPL-ROTI-LEADER',
    name: 'Template Shift Leader Toko Roti',
    description: 'Custom Template Parent: Kasir POS, Stock Transfer Etalase, & Purchase Request Supplier.',
    isSystemPreset: false,
    tenantTypeTarget: 'Retail Bakery Chain',
    userCount: 3,
    updatedAt: '2026-07-24',
    permissions: [
      { moduleCode: 'POS', moduleName: 'POS Cashier & Retail Operations', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: true },
      { moduleCode: 'INVENTORY', moduleName: 'Inventory & Multi-Warehouse', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: true },
      { moduleCode: 'MANUFACTURING', moduleName: 'Manufaktur & Resep BOM', canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'FINANCE', moduleName: 'Finance & Accounting Engine', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'VENDOR', moduleName: 'Procurement & Vendor Directory', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'HRD', moduleName: 'HRD & Payroll Engine', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'HOTELIER', moduleName: 'Hotel PMS & Hospitality', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'MANAGERIAL', moduleName: 'Executive Managerial & DMS', canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false },
      { moduleCode: 'ESS', moduleName: 'Employee Self Service (ESS)', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false }
    ]
  }
];
