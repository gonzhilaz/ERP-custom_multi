import { IndustryType } from '../../generated/master-client';

export interface TenantSeedConfig {
  code: string;
  name: string;
  industryType: IndustryType;
  modules: string[];
  dbName: string;
}

export const SEED_TENANTS: TenantSeedConfig[] = [
  {
    code: 'RESTO-ALAM-RINDU',
    name: 'Resto Alam Rindu',
    industryType: IndustryType.RESTAURANT_CATERING,
    modules: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'POS'],
    dbName: 'resto_alam_rindu_db'
  },
  {
    code: 'CATERING-SURYA',
    name: 'Catering Surya Kencana',
    industryType: IndustryType.RESTAURANT_CATERING,
    modules: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'POS'],
    dbName: 'catering_surya_db'
  },
  {
    code: 'HOTEL-ALAM-PAKUAN',
    name: 'Hotel Alam Pakuan',
    industryType: IndustryType.HOTEL_HOSPITALITY,
    modules: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'HOTELIER'],
    dbName: 'hotel_alam_pakuan_db'
  },
  {
    code: 'MINING-BRAXIT',
    name: 'Tambang PT. Braxit',
    industryType: IndustryType.GOLD_MINING,
    modules: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'MANAGERIAL'],
    dbName: 'mining_braxit_db'
  },
  {
    code: 'TOKO-ROTI',
    name: 'Toko Roti',
    industryType: IndustryType.RETAIL,
    modules: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'POS'],
    dbName: 'toko_roti_db'
  }
];
