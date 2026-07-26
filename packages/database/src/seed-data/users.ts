import { UserSystemRole } from '../../generated/master-client';

export interface UserSeedDefinition {
  email: string;
  fullName: string;
  systemRole: UserSystemRole;
  tenantCode?: string;
  roleInTenant: string;
  department: string;
}

// Password hash for 'Password123!' (bcrypt)
export const DEFAULT_PASSWORD_HASH = '$2a$10$e8w.R6l.gBw5D4NfV3E/MeE00a9/o2W5G6E7H8I9J0K1L2M3N4O5P';

export const SEED_USERS: UserSeedDefinition[] = [
  // ==========================================
  // 🏢 1. PARENT COMPANY / HOLDING HO
  // ==========================================
  {
    email: 'admin@holding.com',
    fullName: 'Budi Santoso (Holding Executive)',
    systemRole: UserSystemRole.SUPER_ADMIN,
    roleInTenant: 'HOLDING_EXECUTIVE',
    department: 'Executive Governance'
  },
  {
    email: 'director.finance@holding.com',
    fullName: 'Bambang Soetjipto (Group Finance Director)',
    systemRole: UserSystemRole.HOLDING_EXECUTIVE,
    roleInTenant: 'FINANCIAL_DIRECTOR',
    department: 'Group Finance'
  },
  {
    email: 'director.hrd@holding.com',
    fullName: 'Dewi Lestari (Group HRD Director)',
    systemRole: UserSystemRole.HOLDING_EXECUTIVE,
    roleInTenant: 'HR_DIRECTOR',
    department: 'Group HRD'
  },
  {
    email: 'auditor.group@holding.com',
    fullName: 'Agus Auditor (Chief Internal Auditor)',
    systemRole: UserSystemRole.HOLDING_EXECUTIVE,
    roleInTenant: 'SENIOR_AUDITOR',
    department: 'Internal Audit'
  },

  // ==========================================
  // 🏨 2. HOTEL & HOSPITALITY (HOTEL-ALAM-PAKUAN)
  // ==========================================
  {
    email: 'hotel.gm@alampakuan.com',
    fullName: 'Rudi Hermawan (GM Hotel)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'HOTEL-ALAM-PAKUAN',
    roleInTenant: 'GENERAL_MANAGER',
    department: 'Executive Management'
  },
  {
    email: 'hotel.fom@alampakuan.com',
    fullName: 'Siska Indah (Front Office Manager)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'HOTEL-ALAM-PAKUAN',
    roleInTenant: 'FRONT_OFFICE_MANAGER',
    department: 'Front Office'
  },
  {
    email: 'hotel.reception1@alampakuan.com',
    fullName: 'Budi Reception (Front Desk Agent)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'HOTEL-ALAM-PAKUAN',
    roleInTenant: 'FRONT_DESK_AGENT',
    department: 'Front Office'
  },
  {
    email: 'hotel.hk.sup@alampakuan.com',
    fullName: 'Tri Cleaning (Housekeeping Supervisor)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'HOTEL-ALAM-PAKUAN',
    roleInTenant: 'HOUSEKEEPING_SUPERVISOR',
    department: 'Housekeeping'
  },
  {
    email: 'hotel.hk.staff1@alampakuan.com',
    fullName: 'Agus Housekeeper (Room Attendant)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'HOTEL-ALAM-PAKUAN',
    roleInTenant: 'ROOM_ATTENDANT',
    department: 'Housekeeping'
  },
  {
    email: 'hotel.finance@alampakuan.com',
    fullName: 'Ratna Finance (Hotel Accountant)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'HOTEL-ALAM-PAKUAN',
    roleInTenant: 'HOTEL_ACCOUNTANT',
    department: 'Finance'
  },
  {
    email: 'hotel.engineer@alampakuan.com',
    fullName: 'Doni Maintenance (Chief Engineer)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'HOTEL-ALAM-PAKUAN',
    roleInTenant: 'CHIEF_ENGINEER',
    department: 'Engineering'
  },

  // ==========================================
  // 🍞 3. RETAIL TOKO ROTI (TOKO-ROTI)
  // ==========================================
  {
    email: 'retail.storemanager@tokoroti.com',
    fullName: 'Maya Indah (Store Manager)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'TOKO-ROTI',
    roleInTenant: 'RETAIL_STORE_MANAGER',
    department: 'Store Management'
  },
  {
    email: 'retail.headcashier@tokoroti.com',
    fullName: 'Andi Kasir (Head Cashier)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'TOKO-ROTI',
    roleInTenant: 'HEAD_POS_CASHIER',
    department: 'Front Cashier'
  },
  {
    email: 'retail.cashier1@tokoroti.com',
    fullName: 'Linda Kasir (Shift Cashier)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'TOKO-ROTI',
    roleInTenant: 'SHIFT_CASHIER',
    department: 'Front Cashier'
  },
  {
    email: 'retail.headbaker@tokoroti.com',
    fullName: 'Chef Anton (Head Baker)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'TOKO-ROTI',
    roleInTenant: 'HEAD_BAKER',
    department: 'Production'
  },
  {
    email: 'retail.inventory@tokoroti.com',
    fullName: 'Eko Stok (Store Inventory Lead)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'TOKO-ROTI',
    roleInTenant: 'STORE_INVENTORY_LEAD',
    department: 'Warehouse'
  },

  // ==========================================
  // 🍲 4. CATERING MASSAL (CATERING-SURYA)
  // ==========================================
  {
    email: 'catering.manager@suryakencana.com',
    fullName: 'Hendra Wijaya (Catering Manager)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'CATERING-SURYA',
    roleInTenant: 'CATERING_MANAGER',
    department: 'Executive Management'
  },
  {
    email: 'catering.eventhead@suryakencana.com',
    fullName: 'Rian Event (Head of Event Ops)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'CATERING-SURYA',
    roleInTenant: 'EVENT_BANQUET_HEAD',
    department: 'Event Operations'
  },
  {
    email: 'catering.executivechef@suryakencana.com',
    fullName: 'Chef Supri (Executive Catering Chef)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'CATERING-SURYA',
    roleInTenant: 'EXECUTIVE_CATERING_CHEF',
    department: 'Central Kitchen'
  },
  {
    email: 'catering.logistics@suryakencana.com',
    fullName: 'Bambang Logistic (Armada Lead)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'CATERING-SURYA',
    roleInTenant: 'LOGISTICS_ARMADA_LEAD',
    department: 'Supply Chain'
  },
  {
    email: 'catering.billing@suryakencana.com',
    fullName: 'Nita Billing (Catering Billing Officer)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'CATERING-SURYA',
    roleInTenant: 'CATERING_BILLING_OFFICER',
    department: 'Finance'
  },

  // ==========================================
  // ⛏️ 5. MINING SITE (MINING-BRAXIT)
  // ==========================================
  {
    email: 'mining.sitemanager@braxit.com',
    fullName: 'Surya Pratama (Site Manager)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'MINING-BRAXIT',
    roleInTenant: 'SITE_MANAGER_MINING',
    department: 'Site Management'
  },
  {
    email: 'mining.chiefengineer@braxit.com',
    fullName: 'Ir. Heru Mining (Chief Mining Engineer)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'MINING-BRAXIT',
    roleInTenant: 'CHIEF_MINING_ENGINEER',
    department: 'Engineering'
  },
  {
    email: 'mining.fleethead@braxit.com',
    fullName: 'Edi Fleet (Heavy Equipment Superintendent)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'MINING-BRAXIT',
    roleInTenant: 'FLEET_SUPERINTENDENT',
    department: 'Heavy Fleet'
  },
  {
    email: 'mining.operator1@braxit.com',
    fullName: 'Joko Mining (Senior CAT 777 Operator)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'MINING-BRAXIT',
    roleInTenant: 'HEAVY_EQUIPMENT_OPERATOR',
    department: 'Field Operations'
  },
  {
    email: 'mining.hsehead@braxit.com',
    fullName: 'Dedi Safety (HSE & AMDAL Manager)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'MINING-BRAXIT',
    roleInTenant: 'HSE_AMDAL_MANAGER',
    department: 'HSE & Legal'
  },
  {
    email: 'mining.logistics@braxit.com',
    fullName: 'Yudi Warehouse (Spareparts & Fuel Lead)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'MINING-BRAXIT',
    roleInTenant: 'SPAREPARTS_FUEL_LEAD',
    department: 'Logistics'
  },
  {
    email: 'mining.hrsite@braxit.com',
    fullName: 'Tari HR (Site HR Specialist)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'MINING-BRAXIT',
    roleInTenant: 'SITE_HR_SPECIALIST',
    department: 'Site HRD'
  },

  // ==========================================
  // 🍽️ 6. RESTORAN & CULINARY (RESTO-ALAM-RINDU)
  // ==========================================
  {
    email: 'resto.manager@alamrindu.com',
    fullName: 'Siti Aminah (Restaurant Manager)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'RESTO-ALAM-RINDU',
    roleInTenant: 'RESTO_MANAGER',
    department: 'Management'
  },
  {
    email: 'resto.headcashier@alamrindu.com',
    fullName: 'Rina Kasir (Head POS Cashier)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'RESTO-ALAM-RINDU',
    roleInTenant: 'HEAD_POS_CASHIER',
    department: 'Front House'
  },
  {
    email: 'resto.supervisor@alamrindu.com',
    fullName: 'Aris Floor (Floor Supervisor)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'RESTO-ALAM-RINDU',
    roleInTenant: 'FLOOR_SUPERVISOR',
    department: 'Front House'
  },
  {
    email: 'resto.headchef@alamrindu.com',
    fullName: 'Chef Jaka (Head Kitchen Cook)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'RESTO-ALAM-RINDU',
    roleInTenant: 'HEAD_KITCHEN_COOK',
    department: 'Kitchen BOH'
  },
  {
    email: 'resto.inventory@alamrindu.com',
    fullName: 'Budi Resto (Cold Storage Lead)',
    systemRole: UserSystemRole.TENANT_USER,
    tenantCode: 'RESTO-ALAM-RINDU',
    roleInTenant: 'COLD_STORAGE_LEAD',
    department: 'Inventory'
  }
];
