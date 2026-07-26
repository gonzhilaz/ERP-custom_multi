import {
  LayoutDashboard,
  Wallet,
  Boxes,
  Truck,
  Users,
  UserCheck,
  Pickaxe,
  UtensilsCrossed,
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import { ModuleCategory } from '../navigation';

export const miningCategories: ModuleCategory[] = [
  {
    id: 'dashboard',
    name: 'Overview & Dashboard',
    icon: LayoutDashboard,
    subMenus: [
      { name: 'Dashboard Tambang', href: '/' }
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
    id: 'crm',
    name: 'CRM Sales & Offtaker',
    icon: Users,
    subMenus: [
      { name: 'Overview CRM', href: '/crm/overview' },
      { name: 'Visual Sales Pipeline', href: '/crm' },
      { name: 'Master Pelanggan & Contacts', href: '/crm/customers' },
      { name: 'Surat Penawaran Kontrak Ore', href: '/crm/quotations' },
      { name: 'Log Aktivitas Sales', href: '/crm/activities' },
      { name: 'Campaign Marketing', href: '/crm/campaigns' },
      { name: 'Aturan & Parameter', href: '/crm/parameters' },
      { name: 'Laporan CRM', href: '/crm/reports' },
      { name: 'Audit Log', href: '/crm/audit-log' }
    ]
  },
  {
    id: 'catering',
    name: 'Catering Site Mess',
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
    id: 'inventory-management',
    name: 'Inventory Site',
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
    id: 'finance',
    name: 'Finance & Cost Site',
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
    name: 'HRD & Roster Site',
    icon: Users,
    subMenus: [
      { name: 'Overview HRD', href: '/hrd/overview' },
      { name: 'Karyawan', href: '/hrd/employees' },
      { name: 'Payroll & Pajak', href: '/hrd/payroll' },
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
