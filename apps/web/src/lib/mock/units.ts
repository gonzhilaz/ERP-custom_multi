export interface BranchInfo {
  id: string;
  code: string;
  name: string;
  address: string;
  city: string;
}

export interface TenantUnit {
  tenantId: string;
  code: string;
  name: string;
  type: string;
  monthlyRevenue: number;
  monthlyExpense: number;
  netProfit: number;
  profitGrowth: string;
  industryCategory: string;
  branches: BranchInfo[];
}

export const MOCK_UNITS: TenantUnit[] = [
  {
    tenantId: 'holding',
    code: 'HOLDING-HO',
    name: 'Holding Parent Company (HO Central)',
    type: 'Parent Company / HO',
    monthlyRevenue: 8950000000,
    monthlyExpense: 4820000000,
    netProfit: 4130000000,
    profitGrowth: '+21.5%',
    industryCategory: 'Holding Board',
    branches: [
      { id: 'br-ho-01', code: 'HO-JKT', name: 'Head Office Tower Sudirman', address: 'Jl. Jend. Sudirman Lt. 42', city: 'Jakarta Selatan' },
      { id: 'br-ho-02', code: 'HO-BDG', name: 'Regional Office West Java', address: 'Jl. Asia Afrika No. 100', city: 'Bandung' },
      { id: 'br-ho-all', code: 'HO-ALL', name: 'Semua Cabang (Consolidated Group)', address: 'Consolidated View', city: 'National' }
    ]
  },
  {
    tenantId: 'tenant-toko-roti',
    code: 'TOKO-ROTI',
    name: 'Toko Roti',
    type: 'Retail Chain',
    monthlyRevenue: 500000000,
    monthlyExpense: 390000000,
    netProfit: 110000000,
    profitGrowth: '+9%',
    industryCategory: 'Retail Bakery Chain',
    branches: [
      { id: 'br-roti-01', code: 'BR-SDR', name: 'Cabang Utama Sudirman', address: 'Jl. Jend. Sudirman No. 12', city: 'Jakarta Pusat' },
      { id: 'br-roti-02', code: 'BR-MKG', name: 'Cabang Mall Kelapa Gading', address: 'Mall Kelapa Gading 3 Lt. GF', city: 'Jakarta Utara' },
      { id: 'br-roti-03', code: 'BR-SMK', name: 'Cabang Supermal Karawaci', address: 'Supermal Karawaci G-45', city: 'Tangerang' },
      { id: 'br-roti-all', code: 'BR-ALL', name: 'Semua Cabang (Store Manager Mode)', address: 'Multi-Store View', city: 'Jakarta & Area' }
    ]
  },
  {
    tenantId: 'tenant-resto-alam-rindu',
    code: 'RESTO-ALAM-RINDU',
    name: 'Resto Alam Rindu',
    type: 'Restoran & Catering',
    monthlyRevenue: 680000000,
    monthlyExpense: 390000000,
    netProfit: 290000000,
    profitGrowth: '+14%',
    industryCategory: 'FnB & Resto',
    branches: [
      { id: 'br-resto-01', code: 'BR-SNP', name: 'Cabang Senopati Flagship', address: 'Jl. Senopati No. 45', city: 'Jakarta Selatan' },
      { id: 'br-resto-02', code: 'BR-T3B', name: 'Cabang Bandara Soekarno-Hatta T3', address: 'Terminal 3 Departure Area', city: 'Tangerang' },
      { id: 'br-resto-all', code: 'BR-ALL', name: 'Semua Cabang Resto', address: 'All Outlets View', city: 'Jabodetabek' }
    ]
  },
  {
    tenantId: 'tenant-catering-surya',
    code: 'CATERING-SURYA',
    name: 'Catering Surya Kencana',
    type: 'Catering Massal',
    monthlyRevenue: 920000000,
    monthlyExpense: 580000000,
    netProfit: 340000000,
    profitGrowth: '+18%',
    industryCategory: 'Catering Industry',
    branches: [
      { id: 'br-cat-01', code: 'BR-CKR', name: 'Dapur Pusat Industrial Cikarang', address: 'Kawasan Industri Jababeka 2', city: 'Bekasi' },
      { id: 'br-cat-02', code: 'BR-KBD', name: 'Hub Catering Surabaya Ops', address: 'Jl. Rungkut Industri III', city: 'Surabaya' }
    ]
  },
  {
    tenantId: 'tenant-hotel-alam-pakuan',
    code: 'HOTEL-ALAM-PAKUAN',
    name: 'Hotel Alam Pakuan',
    type: 'Hotel & Hospitality',
    monthlyRevenue: 1450000000,
    monthlyExpense: 810000000,
    netProfit: 640000000,
    profitGrowth: '+16%',
    industryCategory: 'Hotelier & Hospitality',
    branches: [
      { id: 'br-hotel-01', code: 'BR-BGR', name: 'Hotel Alam Pakuan Resort Bogor', address: 'Jl. Raya Pajajaran No. 99', city: 'Bogor' },
      { id: 'br-hotel-02', code: 'BR-BAL', name: 'Hotel Alam Pakuan Suites Seminyak', address: 'Jl. Kayu Aya No. 18', city: 'Bali' }
    ]
  },
  {
    tenantId: 'tenant-mining-braxit',
    code: 'MINING-BRAXIT',
    name: 'Tambang PT. Braxit',
    type: 'Tambang Emas',
    monthlyRevenue: 5400000000,
    monthlyExpense: 2650000000,
    netProfit: 2750000000,
    profitGrowth: '+28%',
    industryCategory: 'Pertambangan Emas',
    branches: [
      { id: 'br-mine-01', code: 'SITE-KUTAI', name: 'Site Tambang Kutai Kartanegara', address: 'Kawasan Tambang Block 4', city: 'Kutai Kartanegara' },
      { id: 'br-mine-02', code: 'SITE-BERAU', name: 'Site Tambang Berau Site B', address: 'Kawasan Pesisir Berau', city: 'Berau' }
    ]
  }
];
