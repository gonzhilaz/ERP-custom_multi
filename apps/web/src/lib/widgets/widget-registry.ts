export interface WidgetDefinition {
  id: string;
  code: string;
  name: string;
  moduleCode: 'POS' | 'INVENTORY' | 'MANUFACTURING' | 'FINANCE' | 'HRD' | 'HOTELIER' | 'CRM' | 'VENDOR' | 'CATERING' | 'MINING' | 'ASSET' | 'ESS' | 'MANAGERIAL' | 'HEALTH' | 'USERS' | 'AI';
  moduleName: string;
  category: string;
  description: string;
  defaultColSpan: 1 | 2 | 3;
  iconName: string;
}

export const WIDGET_REGISTRY: WidgetDefinition[] = [
  {
    id: 'wgt-pos-sales',
    code: 'POS_SALES_SUMMARY',
    name: 'Kasir POS Omset & Sales',
    moduleCode: 'POS',
    moduleName: 'POS Cashier & Retail',
    category: 'Sales & Front Office',
    description: 'Ringkasan omset penjualan kasir harian, transaksi selesai, & metode pembayaran.',
    defaultColSpan: 1,
    iconName: 'ShoppingCart'
  },
  {
    id: 'wgt-stock-alert',
    code: 'STOCK_REORDER_ALERT',
    name: 'Peringatan Stok Kritis & Reorder',
    moduleCode: 'INVENTORY',
    moduleName: 'Inventory Gudang',
    category: 'Supply Chain',
    description: 'Daftar item persediaan yang menyentuh batas minimum re-order point di gudang.',
    defaultColSpan: 1,
    iconName: 'Boxes'
  },
  {
    id: 'wgt-mfg-wo',
    code: 'PRODUCTION_WORK_ORDERS',
    name: 'Status Batch Work Order Produksi',
    moduleCode: 'MANUFACTURING',
    moduleName: 'Manufaktur & Resep BOM',
    category: 'Production',
    description: 'Status batch produksi berjalan (Toko Roti, Resto, Peleburan Tambang) & auto-post COGM.',
    defaultColSpan: 2,
    iconName: 'Factory'
  },
  {
    id: 'wgt-fin-cashflow',
    code: 'FINANCE_CASHFLOW',
    name: 'Cashflow & Serapan Anggaran',
    moduleCode: 'FINANCE',
    moduleName: 'Finance & Accounting',
    category: 'Financial Intelligence',
    description: 'Grafik serapan anggaran belanja operasional, pendapatan, & realisasi pengeluaran.',
    defaultColSpan: 2,
    iconName: 'Wallet'
  },
  {
    id: 'wgt-hrd-attendance',
    code: 'STAFF_ATTENDANCE',
    name: 'Presensi Staff & Shift Kerja',
    moduleCode: 'HRD',
    moduleName: 'HRD & Payroll',
    category: 'Human Capital',
    description: 'Status kehadiran staff shift toko, dapur, site tambang, & hotel hari ini.',
    defaultColSpan: 1,
    iconName: 'Users'
  },
  {
    id: 'wgt-htl-occupancy',
    code: 'HOTEL_OCCUPANCY',
    name: 'Tingkat Okupansi Kamar Hotel',
    moduleCode: 'HOTELIER',
    moduleName: 'Hotel PMS',
    category: 'Hospitality',
    description: 'Persentase terisi kamar hotel, status housekeeping clean/dirty, & reservasi.',
    defaultColSpan: 1,
    iconName: 'BedDouble'
  },
  {
    id: 'wgt-crm-pipeline',
    code: 'CRM_SALES_PIPELINE',
    name: 'Pipeline Penjualan & Deal CRM',
    moduleCode: 'CRM',
    moduleName: 'CRM 360° & Sales',
    category: 'Sales & Commercial',
    description: 'Pergerakan deal penjualan B2B, estimasi nilai pipeline, & win rate %.',
    defaultColSpan: 2,
    iconName: 'Target'
  },
  {
    id: 'wgt-vendor-po',
    code: 'VENDOR_PROCUREMENT_PO',
    name: 'Purchase Orders & AP Vendor',
    moduleCode: 'VENDOR',
    moduleName: 'Vendor & Procurement',
    category: 'Procurement',
    description: 'Status PO pembelian bahan baku, evaluasi supplier rating, & utang AP aging.',
    defaultColSpan: 1,
    iconName: 'Truck'
  },
  {
    id: 'wgt-cat-fleet',
    code: 'CATERING_EVENT_FLEET',
    name: 'Pesanan Katering & Armada Dispatch',
    moduleCode: 'CATERING',
    moduleName: 'Catering Massal',
    category: 'Event Operations',
    description: 'Status pesanan katering masif, kesiapan dapur pusat, & jadwal pengiriman armada.',
    defaultColSpan: 2,
    iconName: 'UtensilsCrossed'
  },
  {
    id: 'wgt-mne-production',
    code: 'MINING_DAILY_TONNES',
    name: 'Hasil Produksi Tambang & BBM',
    moduleCode: 'MINING',
    moduleName: 'Pertambangan Emas',
    category: 'Heavy Operations',
    description: 'Volume kerukan batuan emas (ton), penggunaan BBM solar fleet, & status K3/HSE.',
    defaultColSpan: 2,
    iconName: 'Pickaxe'
  },
  {
    id: 'wgt-ast-depreciation',
    code: 'ASSET_VALUATION_RUN',
    name: 'Valuasi Aset & Depresiasi Fiskal',
    moduleCode: 'ASSET',
    moduleName: 'Manajemen Aset',
    category: 'Asset Intelligence',
    description: 'Total nilai kapitalisasi aset tetap, akumulasi penyusutan, & status perbaikan.',
    defaultColSpan: 1,
    iconName: 'Building'
  },
  {
    id: 'wgt-ess-leave',
    code: 'ESS_STAFF_REQUESTS',
    name: 'Pengajuan Cuti & Overtime ESS',
    moduleCode: 'ESS',
    moduleName: 'Employee Self-Service',
    category: 'Human Capital',
    description: 'Status permohonan cuti mandiri, lembur, & klaim reimbursement karyawan.',
    defaultColSpan: 1,
    iconName: 'Calendar'
  },
  {
    id: 'wgt-mgt-profit',
    code: 'MANAGERIAL_UNIT_PROFIT',
    name: 'Profitabilitas Unit Usaha (EBITDA)',
    moduleCode: 'MANAGERIAL',
    moduleName: 'Managerial BI',
    category: 'Executive Insights',
    description: 'Perbandingan margin laba bersih & kontribusi revenue antar 5 domain unit usaha.',
    defaultColSpan: 2,
    iconName: 'BarChart3'
  },
  {
    id: 'wgt-sys-health',
    code: 'SYSTEM_HEALTH_POOLS',
    name: 'Status Engine & PostgreSQL Pools',
    moduleCode: 'HEALTH',
    moduleName: 'System Health',
    category: 'Infrastructure',
    description: 'Kesehatan database PostgreSQL master & tenant, latensi API, & WebSocket status.',
    defaultColSpan: 1,
    iconName: 'Activity'
  }
];

export const ROLE_PRESET_WIDGETS: Record<string, string[]> = {
  HOLDING_EXECUTIVE: ['wgt-fin-cashflow', 'wgt-mgt-profit', 'wgt-crm-pipeline', 'wgt-sys-health'],
  RETAIL_STORE_MANAGER: ['wgt-pos-sales', 'wgt-mfg-wo', 'wgt-stock-alert', 'wgt-hrd-attendance'],
  SITE_MANAGER_MINING: ['wgt-mne-production', 'wgt-stock-alert', 'wgt-fin-cashflow', 'wgt-hrd-attendance'],
  HOTEL_GENERAL_MANAGER: ['wgt-htl-occupancy', 'wgt-stock-alert', 'wgt-fin-cashflow', 'wgt-hrd-attendance'],
  CATERING_MANAGER: ['wgt-cat-fleet', 'wgt-stock-alert', 'wgt-vendor-po', 'wgt-hrd-attendance'],
  FINANCE_DIRECTOR: ['wgt-fin-cashflow', 'wgt-mgt-profit', 'wgt-ast-depreciation', 'wgt-vendor-po'],
  CRM_DIRECTOR: ['wgt-crm-pipeline', 'wgt-pos-sales', 'wgt-fin-cashflow', 'wgt-mgt-profit'],
  SYS_ADMIN: ['wgt-sys-health', 'wgt-fin-cashflow', 'wgt-hrd-attendance', 'wgt-stock-alert']
};
