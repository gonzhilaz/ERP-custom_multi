import {
  LayoutDashboard,
  Wallet,
  Boxes,
  Truck,
  Users,
  UserCheck,
  BarChart3,
  ShieldCheck,
  Mail,
  Building,
  Warehouse,
  Factory,
  Bot,
  UtensilsCrossed,
  ShoppingCart,
  Hotel,
  Pickaxe
} from 'lucide-react';
import { ModuleCategory } from '../navigation';

export const holdingCategories: ModuleCategory[] = [
  {
    id: 'dashboard',
    name: 'Overview & Dashboard',
    icon: LayoutDashboard,
    subMenus: [
      { name: 'Dashboard Enterprise', href: '/' }
    ]
  },
  {
    id: 'finance',
    name: 'Finance & Akuntansi',
    icon: Wallet,
    subMenus: [
      { name: 'Overview Finance', href: '/finance/overview' },
      { name: 'Chart of Accounts', href: '/finance/catalog' },
      { name: 'Master Rekening Bank', href: '/finance/bank' },
      
      // SUB-KATEGORI 1: JURNAL & BUKU BESAR AKUNTANSI (FULL ACCOUNTING LEDGER SUITE)
      { name: 'Sub-Kategori: Jurnal & Buku Besar', href: '#', isSectionHeader: true },
      { name: 'Jurnal Umum (General)', href: '/finance/journals' },
      { name: 'Jurnal Buku Besar (GL)', href: '/finance/gl' },
      { name: 'Buku Besar Pembantu', href: '/finance/subsidiary-ledger' },
      { name: 'Buku Besar Pembantu AR', href: '/finance/ar-subsidiary' },
      { name: 'Buku Besar Pembantu AP', href: '/finance/ap-subsidiary' },
      { name: 'Neraca Saldo (Trial Balance)', href: '/finance/trial-balance' },

      // SUB-KATEGORI 2: OPERASIONAL KEUANGAN
      { name: 'Sub-Kategori: Operasional Keuangan', href: '#', isSectionHeader: true },
      { name: 'Kas Utama & Giro', href: '/finance/cash' },
      { name: 'Hutang Dagang (AP)', href: '/finance/ap' },
      { name: 'Piutang Dagang (AR)', href: '/finance/ar' },
      { name: 'Kas Kecil Ops', href: '/finance/petty-cash' },
      { name: 'Rekonsiliasi Bank', href: '/finance/reconciliation' },

      // SUB-KATEGORI 3: ATURAN & PARAMETER KEUANGAN
      { name: 'Sub-Kategori: Aturan & Parameter', href: '#', isSectionHeader: true },
      { name: 'Overview Parameter', href: '/finance/parameters' },
      { name: 'Aturan Pajak', href: '/finance/parameters/aturanPajak' },
      { name: 'Formula GL', href: '/finance/parameters/formulaGL' },
      { name: 'Kategori COA', href: '/finance/parameters/coaType' },
      { name: 'Param Bank', href: '/finance/parameters/bankAcc' },

      // SUB-KATEGORI 4: LAPORAN & AUDIT
      { name: 'Sub-Kategori: Laporan & Audit', href: '#', isSectionHeader: true },
      { name: 'Laporan Keuangan', href: '/finance/reports' },
      { name: 'Audit Pajak & e-Faktur', href: '/finance/tax-reports' },
      { name: 'Audit Log', href: '/finance/audit-log' }
    ]
  },
  {
    id: 'inventory-management',
    name: 'Modul Inventory',
    icon: Boxes,
    subMenus: [
      // SUB-KATEGORI 1: INVENTORY BARANG
      { name: 'Sub-Kategori: Inventory', href: '#', isSectionHeader: true },
      { name: 'Overview Inventory', href: '/inventory/overview' },
      { name: 'Daftar Barang', href: '/inventory/items' },
      { name: 'Permintaan Internal', href: '/inventory/requisitions' },
      { name: 'Mutasi Stok', href: '/inventory/movements' },
      { name: 'Aturan & Parameter', href: '/inventory/parameters' },
      { name: 'Laporan Inventory', href: '/inventory/reports' },
      { name: 'Audit Log Inventory', href: '/inventory/audit-log' },

      // SUB-KATEGORI 2: ASET TETAP (ASSETS)
      { name: 'Sub-Kategori: Assets', href: '#', isSectionHeader: true },
      { name: 'Overview Aset', href: '/inventory/assets/overview' },
      { name: 'Daftar Aset', href: '/inventory/assets/catalog' },
      { name: 'Penyusutan Aset', href: '/inventory/assets/depreciation' },
      { name: 'Status Maintenance', href: '/inventory/assets/maintenance' },
      { name: 'Manage Lokasi Aset', href: '/inventory/assets/parameters/location' },
      { name: 'Manage Kategori Aset', href: '/inventory/assets/parameters/category' },
      { name: 'Laporan Aset', href: '/inventory/assets/reports' },
      { name: 'Audit Log Aset', href: '/inventory/assets/audit-log' },

      // SUB-KATEGORI 3: GUDANG & STORAGE (WAREHOUSES)
      { name: 'Sub-Kategori: Warehouse', href: '#', isSectionHeader: true },
      { name: 'Overview Storage', href: '/inventory/warehouses/overview' },
      { name: 'Daftar Gudang', href: '/inventory/warehouses/catalog' },
      { name: 'Manage Lokasi Gudang', href: '/inventory/warehouses/parameters/location' },
      { name: 'Manage Kategori Gudang', href: '/inventory/warehouses/parameters/category' },
      { name: 'Laporan Gudang', href: '/inventory/warehouses/reports' },
      { name: 'Audit Log Gudang', href: '/inventory/warehouses/audit-log' }
    ]
  },
  {
    id: 'hotelier',
    name: 'Hotelier PMS',
    icon: Hotel,
    subMenus: [
      { name: 'Overview Hotel', href: '/hotelier/overview' },
      { name: 'Reservasi & Folio', href: '/hotelier/reservations' },
      { name: 'Room Grid & Status', href: '/hotelier/rooms' },
      { name: 'Housekeeping & Linen', href: '/hotelier/housekeeping' },
      { name: 'Banquet & MICE', href: '/hotelier/mice' },
      { name: 'Airport Shuttle', href: '/hotelier/shuttles' },
      { name: 'Aturan & Parameter', href: '/hotelier/parameters' },
      { name: 'Laporan Hotel', href: '/hotelier/reports' },
      { name: 'Audit Log', href: '/hotelier/audit-log' }
    ]
  },
  {
    id: 'pos',
    name: 'Kasir & POS',
    icon: ShoppingCart,
    subMenus: [
      { name: 'Overview POS', href: '/pos' },
      { name: 'Kasir Touchscreen', href: '/pos/cashier' },
      { name: 'Kitchen Display (KDS)', href: '/pos/kds' },
      { name: 'Layout Meja', href: '/pos/tables' },
      { name: 'Blind Cash Audit', href: '/pos/cash-audit' },
      { name: 'Katalog Menu', href: '/pos/menu' },
      { name: 'Aturan & Parameter', href: '/pos/parameters' },
      { name: 'Laporan POS', href: '/pos/reports' },
      { name: 'Audit Log', href: '/pos/audit-log' }
    ]
  },
  {
    id: 'catering',
    name: 'Catering Massal',
    icon: UtensilsCrossed,
    subMenus: [
      { name: 'Overview Catering', href: '/catering/overview' },
      { name: 'Kontrak Event Massal', href: '/catering/events' },
      { name: 'Surat Jalan Delivery', href: '/catering/expeditions' },
      { name: 'Peralatan Banquet', href: '/catering/equipment' },
      { name: 'Aturan & Parameter', href: '/catering/parameters' },
      { name: 'Laporan Catering', href: '/catering/reports' },
      { name: 'Audit Log', href: '/catering/audit-log' }
    ]
  },
  {
    id: 'mining',
    name: 'Operasional Tambang',
    icon: Pickaxe,
    subMenus: [
      { name: 'Overview Site Tambang', href: '/mining/overview' },
      { name: 'Hauling Ritase Truck', href: '/mining/hauling' },
      { name: 'Solar HSD & KIR Heavy Fleet', href: '/mining/fuel-fleet' },
      { name: 'Mess Hall & Kantin EDR', href: '/mining/mess-hall' },
      { name: 'Lab Ore Testing', href: '/mining/ore-testing' },
      { name: 'Aturan & Parameter', href: '/mining/parameters' },
      { name: 'Laporan Tambang', href: '/mining/reports' },
      { name: 'Audit Log', href: '/mining/audit-log' }
    ]
  },
  {
    id: 'manufacturing',
    name: 'Manufaktur & Produksi',
    icon: Factory,
    subMenus: [
      { name: 'Overview Manufaktur', href: '/manufacturing/overview' },
      { name: 'Resep & BOM', href: '/manufacturing' },
      { name: 'Aturan & Parameter', href: '/manufacturing/parameters' },
      { name: 'Laporan Produksi', href: '/manufacturing/reports' },
      { name: 'Audit Log', href: '/manufacturing/audit-log' }
    ]
  },
  {
    id: 'crm',
    name: 'CRM & Penjualan',
    icon: Users,
    subMenus: [
      { name: 'Overview CRM', href: '/crm/overview' },
      { name: 'Visual Sales Pipeline', href: '/crm' },
      { name: 'Master Pelanggan & Contacts', href: '/crm/customers' },
      { name: 'Surat Penawaran (SPH)', href: '/crm/quotations' },
      { name: 'Log Aktivitas Sales', href: '/crm/activities' },
      { name: 'Campaign Marketing', href: '/crm/campaigns' },
      { name: 'Aturan & Parameter', href: '/crm/parameters' },
      { name: 'Laporan CRM', href: '/crm/reports' },
      { name: 'Audit Log', href: '/crm/audit-log' }
    ]
  },
  {
    id: 'vendor',
    name: 'Procurement & Vendor',
    icon: Truck,
    subMenus: [
      { name: 'Overview Procurement', href: '/vendor/overview' },
      { name: 'Direktori Vendor', href: '/vendor/suppliers' },
      { name: 'Purchase Order', href: '/vendor/purchase-orders' },
      { name: 'Verifikasi 3-Way', href: '/vendor/matching' },
      { name: 'Aturan & Parameter', href: '/vendor/parameters' },
      { name: 'Laporan Procurement', href: '/vendor/reports' },
      { name: 'Audit Log', href: '/vendor/audit-log' }
    ]
  },
  {
    id: 'hrd',
    name: 'HRD & Payroll',
    icon: Users,
    subMenus: [
      { name: 'Overview HRD', href: '/hrd/overview' },
      { name: 'Karyawan', href: '/hrd/employees' },
      { name: 'Payroll & Pajak', href: '/hrd/payroll' },
      { name: 'Persetujuan HRD', href: '/hrd/approvals' },
      { name: 'Rekap Presensi', href: '/hrd/attendance-summary' },
      { name: 'Perjalanan Dinas', href: '/hrd/travel' },
      { name: 'Aturan & Parameter', href: '/hrd/parameters' },
      { name: 'Laporan HRD', href: '/hrd/reports' },
      { name: 'Audit Log', href: '/hrd/audit-log' }
    ]
  },
  {
    id: 'ess',
    name: 'Employee Self Service',
    icon: UserCheck,
    subMenus: [
      { name: 'Overview ESS', href: '/ess/overview' },
      { name: 'Presensi Saya', href: '/ess/attendance' },
      { name: 'Pengajuan Cuti', href: '/ess/leaves' },
      { name: 'Pengajuan Lembur', href: '/ess/overtime' },
      { name: 'Klaim Struk', href: '/ess/claims' },
      { name: 'Aturan & Parameter', href: '/ess/parameters' },
      { name: 'Laporan ESS', href: '/ess/reports' },
      { name: 'Audit Log', href: '/ess/audit-log' }
    ]
  },
  {
    id: 'mail',
    name: 'Surat & Korespondensi',
    icon: Mail,
    subMenus: [
      { name: 'Overview Korespondensi', href: '/mail-management/overview' },
      { name: 'Aturan & Parameter', href: '/mail-management/parameters' },
      { name: 'Laporan Surat', href: '/mail-management/reports' },
      { name: 'Audit Log', href: '/mail-management/audit-log' }
    ]
  },
  {
    id: 'managerial',
    name: 'Managerial & Executive',
    icon: BarChart3,
    subMenus: [
      { name: 'Overview Executive', href: '/managerial/overview' },
      { name: 'Budgeting Enterprise', href: '/managerial/budgeting' },
      { name: 'Analytics HR & Finance', href: '/managerial/hr-finance-analytics' },
      { name: 'DMS Arsip Direksi', href: '/managerial/dms' },
      { name: 'Aturan & Parameter', href: '/managerial/parameters' },
      { name: 'Laporan Konsolidasi', href: '/managerial/reports' },
      { name: 'Audit Log', href: '/managerial/audit-log' }
    ]
  },
  {
    id: 'system-settings',
    name: 'Pengaturan Sistem',
    icon: ShieldCheck,
    subMenus: [
      { name: 'Hierarki Organisasi', href: '/settings/organization-hierarchy' },
      { name: 'Approval Matrix', href: '/settings/approval-matrix' },
      { name: 'Hak Akses & Peran', href: '/settings/access-control' },
      { name: 'Document Designer', href: '/settings/document-designer' },
      { name: 'Aturan & Parameter', href: '/settings/parameters' },
      { name: 'Laporan Sistem', href: '/settings/reports' },
      { name: 'Audit Log', href: '/settings/audit-log' }
    ]
  }
];
