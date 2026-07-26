import {
  LayoutDashboard,
  Wallet,
  Boxes,
  Truck,
  Users,
  UserCheck,
  Hotel,
  ShoppingCart,
  Building,
  ShieldCheck,
  Mail,
  BarChart3,
  Bot
} from 'lucide-react';
import { ModuleCategory } from '../navigation';

export const hotelCategories: ModuleCategory[] = [
  {
    id: 'dashboard',
    name: 'Overview & Dashboard',
    icon: LayoutDashboard,
    subMenus: [
      { name: 'Dashboard Hotel', href: '/' }
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
    id: 'crm',
    name: 'CRM Sales & Marketing',
    icon: Users,
    subMenus: [
      { name: 'Overview CRM', href: '/crm/overview' },
      { name: 'Visual Sales Pipeline', href: '/crm' },
      { name: 'Master Pelanggan & Contacts', href: '/crm/customers' },
      { name: 'Penawaran B2B & SPH', href: '/crm/quotations' },
      { name: 'Log Aktivitas Sales', href: '/crm/activities' },
      { name: 'Campaign Marketing', href: '/crm/campaigns' },
      { name: 'Aturan & Parameter', href: '/crm/parameters' },
      { name: 'Laporan CRM', href: '/crm/reports' },
      { name: 'Audit Log', href: '/crm/audit-log' }
    ]
  },
  {
    id: 'pos',
    name: 'Resto & F&B Hotel',
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
    id: 'inventory-management',
    name: 'Inventory Hotel',
    icon: Boxes,
    subMenus: [
      { name: 'Overview Inventory', href: '/inventory/overview' },
      { name: 'Daftar Barang', href: '/inventory/items' },
      { name: 'Permintaan Internal', href: '/inventory/requisitions' },
      { name: 'Mutasi Stok', href: '/inventory/movements' },
      { name: 'Aturan & Parameter', href: '/inventory/parameters' },
      { name: 'Laporan Inventory', href: '/inventory/reports' },
      { name: 'Audit Log', href: '/inventory/audit-log' }
    ]
  },
  {
    id: 'asset-management',
    name: 'Aset Hotel',
    icon: Building,
    subMenus: [
      { name: 'Overview Aset', href: '/inventory/assets/overview' },
      { name: 'Daftar Aset', href: '/inventory/assets' },
      { name: 'Penyusutan Aset', href: '/inventory/assets/depreciation' },
      { name: 'Status Aset', href: '/inventory/assets/maintenance' },
      { name: 'Aturan & Parameter', href: '/inventory/assets/parameters' },
      { name: 'Laporan Aset', href: '/inventory/assets/reports' },
      { name: 'Audit Log', href: '/inventory/assets/audit-log' }
    ]
  },
  {
    id: 'finance',
    name: 'Finance & Keuangan',
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
    id: 'hrd',
    name: 'HRD & Staf Hotel',
    icon: Users,
    subMenus: [
      { name: 'Overview HRD', href: '/hrd/overview' },
      { name: 'Karyawan', href: '/hrd/employees' },
      { name: 'Payroll & Pajak', href: '/hrd/payroll' },
      { name: 'Persetujuan HRD', href: '/hrd/approvals' },
      { name: 'Rekap Presensi', href: '/hrd/attendance-summary' },
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
      { name: 'Klaim Struk', href: '/ess/claims' },
      { name: 'Aturan & Parameter', href: '/ess/parameters' },
      { name: 'Laporan ESS', href: '/ess/reports' },
      { name: 'Audit Log', href: '/ess/audit-log' }
    ]
  }
];
