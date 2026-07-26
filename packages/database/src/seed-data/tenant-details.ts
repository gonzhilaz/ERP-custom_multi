import { AccountType } from '../../generated/tenant-client';

export interface BranchSeed {
  code: string;
  name: string;
  address: string;
  phone: string;
}

export interface AccountSeed {
  code: string;
  name: string;
  type: AccountType;
  balance: number;
}

export interface BankAccountSeed {
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  branchName: string;
  swiftCode: string;
  currency: string;
  balance: number;
  linkedCoaCode: string;
}

export interface VendorSeed {
  code: string;
  name: string;
  category: string;
  phone: string;
  email: string;
  address: string;
}

export interface ItemSeed {
  code: string;
  name: string;
  category: string;
  unit: string;
  unitPrice: number;
  stockQty: number;
  minStockAlert: number;
}

export const SEED_BRANCHES: BranchSeed[] = [
  { code: 'HO-JKT-01', name: 'Head Office Jakarta Tower', address: 'Jl. Jend. Sudirman No. 88, Jakarta', phone: '021-5550100' },
  { code: 'SITE-EAST-01', name: 'Site East Borneo Facility', address: 'Kutai Kartanegara, Kaltim (-0.923, 116.821)', phone: '0541-777099' }
];

// Industry-Specific COA Mapping for 5 Business Units + Holding
export const TENANT_COA_MAP: Record<string, AccountSeed[]> = {
  'TOKO-ROTI': [
    { code: '1-10101', name: 'Kas Utama Toko Roti Sudirman', type: AccountType.ASSET, balance: 25000000 },
    { code: '1-10102', name: 'Petty Cash Kasir Mall Kelapa Gading', type: AccountType.ASSET, balance: 5000000 },
    { code: '1-10103', name: 'Petty Cash Kasir Supermal Karawaci', type: AccountType.ASSET, balance: 5000000 },
    { code: '1-10201', name: 'Bank BCA Operational Retail (157-074-7-190)', type: AccountType.ASSET, balance: 185000000 },
    { code: '1-10202', name: 'Bank Mandiri QRIS Settlement (122-00-9988-11)', type: AccountType.ASSET, balance: 65000000 },
    { code: '1-10300', name: 'Piutang Usaha Konsinyasi Retail', type: AccountType.ASSET, balance: 42000000 },
    { code: '1-10400', name: 'Persediaan Bahan Baku (Terigu, Gula, Mentega)', type: AccountType.ASSET, balance: 110000000 },
    { code: '1-10401', name: 'Persediaan Barang Jadi (Roti & Pastry)', type: AccountType.ASSET, balance: 35000000 },
    { code: '2-10100', name: 'Utang Supplier Bahan Roti (Bogasari/Indofood)', type: AccountType.LIABILITY, balance: 48000000 },
    { code: '3-10100', name: 'Modal Disetor Toko Roti Chain', type: AccountType.EQUITY, balance: 300000000 },
    { code: '4-10100', name: 'Pendapatan Penjualan Roti & Pastry Kasir', type: AccountType.REVENUE, balance: 500000000 },
    { code: '5-10100', name: 'Beban HPP (COGM) Bahan Baku Roti', type: AccountType.EXPENSE, balance: 220000000 },
    { code: '5-10200', name: 'Beban Gaji Baker & Shift Staff Toko', type: AccountType.EXPENSE, balance: 95000000 }
  ],
  'RESTO-ALAM-RINDU': [
    { code: '1-10101', name: 'Kas Kasir Senopati Flagship Outlet', type: AccountType.ASSET, balance: 35000000 },
    { code: '1-10102', name: 'Kas Kasir Bandara Soetta Terminal 3', type: AccountType.ASSET, balance: 20000000 },
    { code: '1-10103', name: 'Petty Cash Bar & Dapur Saji', type: AccountType.ASSET, balance: 10000000 },
    { code: '1-10201', name: 'Bank Mandiri Resto Utama (118-00-7766-00)', type: AccountType.ASSET, balance: 340000000 },
    { code: '1-10202', name: 'Bank BCA Settlement EDC Kasir (245-099-881-2)', type: AccountType.ASSET, balance: 125000000 },
    { code: '1-10400', name: 'Persediaan Daging, Sayur, & Bahan Saji Resto', type: AccountType.ASSET, balance: 85000000 },
    { code: '2-10301', name: 'Utang Pajak Restoran PB1 (10%)', type: AccountType.LIABILITY, balance: 38000000 },
    { code: '2-10100', name: 'Utang Supplier Daging Sapi & Poultry', type: AccountType.LIABILITY, balance: 62000000 },
    { code: '3-10100', name: 'Modal Disetor Resto Alam Rindu', type: AccountType.EQUITY, balance: 500000000 },
    { code: '4-10100', name: 'Pendapatan Penjualan Dine-in & Takeaway', type: AccountType.REVENUE, balance: 680000000 },
    { code: '5-10100', name: 'Beban HPP Bahan Masakan Dapur', type: AccountType.EXPENSE, balance: 260000000 },
    { code: '5-10200', name: 'Beban Gaji Chef & Waiter Restoran', type: AccountType.EXPENSE, balance: 110000000 }
  ],
  'CATERING-SURYA': [
    { code: '1-10101', name: 'Kas Dapur Pusat Industrial Cikarang', type: AccountType.ASSET, balance: 50000000 },
    { code: '1-10102', name: 'Petty Cash Hub Catering Surabaya Ops', type: AccountType.ASSET, balance: 15000000 },
    { code: '1-10103', name: 'Cash on Hand Coordinator Event Banquet', type: AccountType.ASSET, balance: 10000000 },
    { code: '1-10201', name: 'Bank BNI Corporate Catering (089-777-654-1)', type: AccountType.ASSET, balance: 480000000 },
    { code: '1-10202', name: 'Bank Mandiri Escrow Project B2B (118-00-4433-22)', type: AccountType.ASSET, balance: 220000000 },
    { code: '1-10300', name: 'Piutang Usaha Kontrak Katering Pabrik B2B', type: AccountType.ASSET, balance: 240000000 },
    { code: '1-10400', name: 'Persediaan Stok Masakan Massal & Kemasan Pax', type: AccountType.ASSET, balance: 140000000 },
    { code: '2-10100', name: 'Utang Supplier Sayur & Bahan Katering Massal', type: AccountType.LIABILITY, balance: 95000000 },
    { code: '3-10100', name: 'Modal Disetor Catering Surya Kencana', type: AccountType.EQUITY, balance: 600000000 },
    { code: '4-10100', name: 'Pendapatan Kontrak Katering Karyawan & Event', type: AccountType.REVENUE, balance: 920000000 },
    { code: '5-10100', name: 'Beban HPP Bahan Masakan & Kemasan Pax', type: AccountType.EXPENSE, balance: 390000000 },
    { code: '5-10200', name: 'Beban Gaji Tim Cook & Armada Mobil Box', type: AccountType.EXPENSE, balance: 140000000 }
  ],
  'HOTEL-ALAM-PAKUAN': [
    { code: '1-10101', name: 'Kas Front Desk Receptionist Resort Bogor', type: AccountType.ASSET, balance: 30000000 },
    { code: '1-10102', name: 'Kas Front Office Suites Seminyak Bali', type: AccountType.ASSET, balance: 25000000 },
    { code: '1-10103', name: 'Petty Cash Housekeeping & Engineering', type: AccountType.ASSET, balance: 8000000 },
    { code: '1-10201', name: 'Bank BCA Corporate Hotelier (008-999-123-4)', type: AccountType.ASSET, balance: 750000000 },
    { code: '1-10202', name: 'Bank Mandiri OTA Deposit Agoda/Traveloka', type: AccountType.ASSET, balance: 310000000 },
    { code: '1-10300', name: 'Piutang Travel Agent (OTA & Corporate Booking)', type: AccountType.ASSET, balance: 190000000 },
    { code: '1-10400', name: 'Persediaan Linen, Amenities, & Minibar Kamar', type: AccountType.ASSET, balance: 95000000 },
    { code: '2-10301', name: 'Utang Pajak Hotel & MICE PB1 (10%)', type: AccountType.LIABILITY, balance: 68000000 },
    { code: '3-10100', name: 'Modal Disetor Hotel Alam Pakuan Resort', type: AccountType.EQUITY, balance: 1200000000 },
    { code: '4-10100', name: 'Pendapatan Sewa Kamar & Paket MICE Meeting', type: AccountType.REVENUE, balance: 1450000000 },
    { code: '5-10100', name: 'Beban Operational Kamar, Linen & Housekeeping', type: AccountType.EXPENSE, balance: 480000000 },
    { code: '5-10200', name: 'Beban Gaji Staff Hotel, FOM, & Housekeeper', type: AccountType.EXPENSE, balance: 240000000 }
  ],
  'MINING-BRAXIT': [
    { code: '1-10101', name: 'Kas Field Office Site Kutai Kartanegara', type: AccountType.ASSET, balance: 150000000 },
    { code: '1-10102', name: 'Kas Operational Hub Berau Site B', type: AccountType.ASSET, balance: 75000000 },
    { code: '1-10103', name: 'Petty Cash Emergency K3 & Sparepart Field', type: AccountType.ASSET, balance: 25000000 },
    { code: '1-10201', name: 'Bank Mandiri Escrow Mining (122-00-1111-99)', type: AccountType.ASSET, balance: 2450000000 },
    { code: '1-10202', name: 'Bank BRI Operational Site (034-01-000222-30-1)', type: AccountType.ASSET, balance: 980000000 },
    { code: '1-10300', name: 'Piutang Penjualan Ore Emas International Buyer', type: AccountType.ASSET, balance: 1250000000 },
    { code: '1-10400', name: 'Persediaan Solar HSD & Sparepart Fleet Heavy', type: AccountType.ASSET, balance: 680000000 },
    { code: '1-13001', name: 'Aset Tetap Heavy Fleet Excavator CAT 777D', type: AccountType.ASSET, balance: 12500000000 },
    { code: '2-10100', name: 'Utang Supplier Solar Pertamina & Heavy Fleet', type: AccountType.LIABILITY, balance: 850000000 },
    { code: '3-10100', name: 'Modal Disetor PT Braxit Mining Gold', type: AccountType.EQUITY, balance: 8500000000 },
    { code: '4-10100', name: 'Pendapatan Penjualan Batuan Ore Emas', type: AccountType.REVENUE, balance: 5400000000 },
    { code: '5-10100', name: 'Beban HPP Fuel Solar & Kerukan Heavy Fleet', type: AccountType.EXPENSE, balance: 1850000000 },
    { code: '5-10200', name: 'Beban Gaji Operator Heavy Equipment & Engineer', type: AccountType.EXPENSE, balance: 650000000 }
  ],
  'HOLDING-HO': [
    { code: '1-10101', name: 'Kas Utama Head Office Sudirman', type: AccountType.ASSET, balance: 450000000 },
    { code: '1-10201', name: 'Bank Mandiri Utama Holding (122-00-9988-771)', type: AccountType.ASSET, balance: 3450000000 },
    { code: '1-10202', name: 'Bank BCA Corporate Holding (8830-192-111)', type: AccountType.ASSET, balance: 2850000000 },
    { code: '1-10300', name: 'Piutang Antar Perusahaan (Intercompany AR)', type: AccountType.ASSET, balance: 640000000 },
    { code: '2-10100', name: 'Utang Antar Perusahaan (Intercompany AP)', type: AccountType.LIABILITY, balance: 410000000 },
    { code: '3-10100', name: 'Modal Disetor Holding Ecosystem', type: AccountType.EQUITY, balance: 15000000000 },
    { code: '4-10100', name: 'Pendapatan Management Fee Sub-Holdings', type: AccountType.REVENUE, balance: 3800000000 },
    { code: '5-10100', name: 'Beban Gaji Direksi & Operational Holding', type: AccountType.EXPENSE, balance: 850000000 }
  ]
};

export const SEED_COA_ACCOUNTS: AccountSeed[] = TENANT_COA_MAP['HOLDING-HO'];

// Vendors mapped per business unit
export const TENANT_VENDOR_MAP: Record<string, VendorSeed[]> = {
  'TOKO-ROTI': [
    { code: 'VND-BGS-01', name: 'PT Bogasari Flour Mills', category: 'Bahan Baku Terigu', phone: '021-4301111', email: 'sales@bogasari.com', address: 'Tanjung Priok, Jakarta' },
    { code: 'VND-IND-02', name: 'PT Indofood Sukses Makmur Tbk', category: 'Gula & Margarin', phone: '021-57958822', email: 'procurement@indofood.com', address: 'Sudirman Plaza, Jakarta' }
  ],
  'RESTO-ALAM-RINDU': [
    { code: 'VND-CP-01', name: 'PT Charoen Pokphand Indonesia Tbk', category: 'Daging Ayam Fresh', phone: '021-6919999', email: 'poultry@cp.co.id', address: 'Ancol, Jakarta Utara' },
    { code: 'VND-MEAT-02', name: 'PT Indoguna Utama Meat Importer', category: 'Daging Sapi Ribeye', phone: '021-8092222', email: 'orders@indoguna.com', address: 'Pondok Bambu, Jakarta Timur' }
  ],
  'CATERING-SURYA': [
    { code: 'VND-AGRO-01', name: 'PT Tunas Agro Fresh Vegetables', category: 'Sayur Segar Massal', phone: '021-8901234', email: 'supply@tunasagro.com', address: 'Cikarang Barat, Bekasi' },
    { code: 'VND-BOX-02', name: 'PT Packindo Kemasan Foodgrade', category: 'Kemasan Box Pax', phone: '031-7890123', email: 'sales@packindo.com', address: 'Rungkut Industri, Surabaya' }
  ],
  'HOTEL-ALAM-PAKUAN': [
    { code: 'VND-LINEN-01', name: 'PT Linen Clean Hospitality Supplier', category: 'Linen & Handuk Hotel', phone: '0251-8321111', email: 'orders@linenclean.co.id', address: 'Pajajaran, Bogor' },
    { code: 'VND-AMN-02', name: 'PT Luxury Amenities Resort', category: 'Amenities & Soap Kit', phone: '0361-778899', email: 'info@baliamenities.com', address: 'Seminyak, Bali' }
  ],
  'MINING-BRAXIT': [
    { code: 'VND-PERT-01', name: 'PT Pertamina Patra Niaga', category: 'Solar HSD Industri', phone: '021-3815111', email: 'solar.industri@pertamina.com', address: 'Rasuna Said, Jakarta' },
    { code: 'VND-CAT-02', name: 'PT Trakindo Utama (Caterpillar)', category: 'Spareparts Fleet CAT', phone: '0541-789123', email: 'mining.support@trakindo.co.id', address: 'Kutai Kartanegara, Kaltim' }
  ],
  'HOLDING-HO': [
    { code: 'VND-TEL-01', name: 'PT Telkom Indonesia Tbk', category: 'Dedicated Fiber Internet', phone: '021-147', email: 'enterprise@telkom.co.id', address: 'Gatot Subroto, Jakarta' }
  ]
};

// Master items mapped per business unit
export const TENANT_ITEM_MAP: Record<string, ItemSeed[]> = {
  'TOKO-ROTI': [
    { code: 'SKU-FLR-01', name: 'Tepung Terigu Cakra Kembar (Karung 25kg)', category: 'Bahan Baku', unit: 'Karung', unitPrice: 245000, stockQty: 18, minStockAlert: 50 },
    { code: 'SKU-SGR-01', name: 'Gula Pasir Industri Gulaku (Karung 50kg)', category: 'Bahan Baku', unit: 'Karung', unitPrice: 680000, stockQty: 12, minStockAlert: 40 },
    { code: 'SKU-BKR-01', name: 'Roti Tawar Premium Special', category: 'Produk Jadi', unit: 'Pack', unitPrice: 28000, stockQty: 150, minStockAlert: 30 }
  ],
  'RESTO-ALAM-RINDU': [
    { code: 'SKU-BEEF-01', name: 'Daging Sapi Ribeye Meltique (1 Kg)', category: 'Dapur Utama', unit: 'Kg', unitPrice: 195000, stockQty: 45, minStockAlert: 20 },
    { code: 'SKU-CHKN-01', name: 'Daging Ayam Fillet Dada Fresh (1 Kg)', category: 'Dapur Utama', unit: 'Kg', unitPrice: 58000, stockQty: 80, minStockAlert: 30 },
    { code: 'SKU-MENU-01', name: 'Sate Sapi Ribeye Bumbu Rindu (30 Porsi)', category: 'Menu Olahan', unit: 'Porsi', unitPrice: 120000, stockQty: 60, minStockAlert: 15 }
  ],
  'CATERING-SURYA': [
    { code: 'SKU-CAT-NASI', name: 'Paket Katering Nasi Kotak Ayam Bakar VIP', category: 'Catering Pax', unit: 'Pax', unitPrice: 45000, stockQty: 1200, minStockAlert: 200 },
    { code: 'SKU-CAT-BUFF', name: 'Paket Prasmanan Buffet Event Corporate', category: 'Catering Buffet', unit: 'Porsi', unitPrice: 85000, stockQty: 500, minStockAlert: 100 }
  ],
  'HOTEL-ALAM-PAKUAN': [
    { code: 'SKU-RM-DLX', name: 'Kamar Deluxe Garden View Resort', category: 'Kamar Hotel', unit: 'Malam', unitPrice: 850000, stockQty: 40, minStockAlert: 5 },
    { code: 'SKU-RM-STE', name: 'Kamar Executive Suite Ocean View', category: 'Kamar Hotel', unit: 'Malam', unitPrice: 1650000, stockQty: 15, minStockAlert: 2 }
  ],
  'MINING-BRAXIT': [
    { code: 'SKU-FUEL-HSD', name: 'Solar HSD High Speed Diesel (Liter)', category: 'BBM Heavy Fleet', unit: 'Liter', unitPrice: 16500, stockQty: 45000, minStockAlert: 10000 },
    { code: 'SKU-ORE-GOLD', name: 'Batuan Emas Ore Unrefined (Ton)', category: 'Hasil Tambang', unit: 'Ton', unitPrice: 4500000, stockQty: 14850, minStockAlert: 1000 }
  ],
  'HOLDING-HO': [
    { code: 'SKU-HO-PAPER', name: 'Kertas HVS A4 80gr PaperOne', category: 'ATK Holding', unit: 'Rim', unitPrice: 55000, stockQty: 100, minStockAlert: 20 }
  ]
};

export const SEED_CHAT_CHANNELS = [
  { name: 'General Announcements', description: 'Group announcement channel for all employees', type: 'GROUP_CHANNEL' },
  { name: 'Finance & Accounting', description: 'Financial reports, AP/AR coordination, and night audit logs', type: 'GROUP_CHANNEL' },
  { name: 'Operational Site Desk', description: 'Live operational coordination, logistics & KDS alerts', type: 'GROUP_CHANNEL' }
];

