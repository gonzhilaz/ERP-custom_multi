export interface CoaCategory {
  id: string;
  code: string;
  name: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  accountCount: number;
  description: string;
}

export interface CoaItem {
  id: string;
  code: string;
  name: string;
  categoryId: string;
  categoryName: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  balance: number;
  currency: string;
}

export const COA_CATEGORIES: CoaCategory[] = [
  {
    id: 'coa-cat-01',
    code: 'CLASS-100',
    name: 'Aset Lancar & Kas Bank (Current Assets)',
    type: 'ASSET',
    accountCount: 8,
    description: 'Kas kasir toko retail, kasir hotel, rekening koran bank BCA/Mandiri, & persediaan.'
  },
  {
    id: 'coa-cat-02',
    code: 'CLASS-200',
    name: 'Liabilitas & Utang Pajak (Current Liabilities)',
    type: 'LIABILITY',
    accountCount: 6,
    description: 'Utang dagang AP supplier, utang PPN keluaran 12%, PPh 21 TER, & BPJS.'
  },
  {
    id: 'coa-cat-03',
    code: 'CLASS-300',
    name: 'Ekuitas & Modal (Owner Equity)',
    type: 'EQUITY',
    accountCount: 2,
    description: 'Modal disetor holding enterprise, laba ditahan, & dividen.'
  },
  {
    id: 'coa-cat-04',
    code: 'CLASS-400',
    name: 'Pendapatan Usaha (Operating Revenue)',
    type: 'REVENUE',
    accountCount: 5,
    description: 'Penjualan produk retail POS, pendapatan kamar hotel, & penjualan catering.'
  },
  {
    id: 'coa-cat-05',
    code: 'CLASS-500',
    name: 'Beban HPP & Operasional (Expenses & COGS)',
    type: 'EXPENSE',
    accountCount: 8,
    description: 'Beban pokok FIFO HPP, beban gaji karyawan PKWT/PKWTT, & biaya operasional.'
  }
];

export const MOCK_COA_CATEGORIES = COA_CATEGORIES;

export const TENANT_COA_MAP: Record<string, CoaItem[]> = {
  'TOKO-ROTI': [
    { id: 'coa-tr-01', code: '1-10101', name: 'Kas Utama Toko Roti Sudirman', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 25000000, currency: 'IDR' },
    { id: 'coa-tr-02', code: '1-10102', name: 'Petty Cash Kasir Mall Kelapa Gading', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 5000000, currency: 'IDR' },
    { id: 'coa-tr-03', code: '1-10103', name: 'Petty Cash Kasir Supermal Karawaci', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 5000000, currency: 'IDR' },
    { id: 'coa-tr-04', code: '1-10201', name: 'Bank BCA Operational Retail (157-074-7-190)', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 185000000, currency: 'IDR' },
    { id: 'coa-tr-05', code: '1-10202', name: 'Bank Mandiri QRIS Settlement (122-00-9988-11)', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 65000000, currency: 'IDR' },
    { id: 'coa-tr-06', code: '1-10400', name: 'Persediaan Terigu, Gula, & Butter Roti', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 110000000, currency: 'IDR' },
    { id: 'coa-tr-07', code: '2-10100', name: 'Utang Supplier Bahan Roti (Bogasari)', categoryId: 'coa-cat-02', categoryName: 'Liabilitas & Utang Pajak (Current Liabilities)', type: 'LIABILITY', balance: 48000000, currency: 'IDR' },
    { id: 'coa-tr-08', code: '3-10100', name: 'Modal Disetor Toko Roti Chain', categoryId: 'coa-cat-03', categoryName: 'Ekuitas & Modal (Owner Equity)', type: 'EQUITY', balance: 300000000, currency: 'IDR' },
    { id: 'coa-tr-09', code: '4-10100', name: 'Pendapatan Penjualan Roti & Pastry Kasir', categoryId: 'coa-cat-04', categoryName: 'Pendapatan Usaha (Operating Revenue)', type: 'REVENUE', balance: 500000000, currency: 'IDR' },
    { id: 'coa-tr-10', code: '5-10100', name: 'Beban HPP (COGM) Bahan Baku Roti', categoryId: 'coa-cat-05', categoryName: 'Beban HPP & Gaji Payroll (Expenses & COGS)', type: 'EXPENSE', balance: 220000000, currency: 'IDR' }
  ],
  'RESTO-ALAM-RINDU': [
    { id: 'coa-rst-01', code: '1-10101', name: 'Kas Kasir Senopati Flagship Outlet', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 35000000, currency: 'IDR' },
    { id: 'coa-rst-02', code: '1-10102', name: 'Kas Kasir Bandara Soetta Terminal 3', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 20000000, currency: 'IDR' },
    { id: 'coa-rst-03', code: '1-10103', name: 'Petty Cash Bar & Dapur Saji', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 10000000, currency: 'IDR' },
    { id: 'coa-rst-04', code: '1-10201', name: 'Bank Mandiri Resto Utama (118-00-7766-00)', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 340000000, currency: 'IDR' },
    { id: 'coa-rst-05', code: '1-10202', name: 'Bank BCA Settlement EDC Kasir (245-099-881-2)', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 125000000, currency: 'IDR' },
    { id: 'coa-rst-06', code: '1-10400', name: 'Persediaan Daging, Sayur, & Bahan Saji', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 85000000, currency: 'IDR' },
    { id: 'coa-rst-07', code: '2-10301', name: 'Utang Pajak Restoran PB1 (10%)', categoryId: 'coa-cat-02', categoryName: 'Liabilitas & Utang Pajak (Current Liabilities)', type: 'LIABILITY', balance: 38000000, currency: 'IDR' },
    { id: 'coa-rst-08', code: '4-10100', name: 'Pendapatan Penjualan Dine-in & Takeaway', categoryId: 'coa-cat-04', categoryName: 'Pendapatan Usaha (Operating Revenue)', type: 'REVENUE', balance: 680000000, currency: 'IDR' },
    { id: 'coa-rst-09', code: '5-10100', name: 'Beban HPP Bahan Masakan Dapur Resto', categoryId: 'coa-cat-05', categoryName: 'Beban HPP & Gaji Payroll (Expenses & COGS)', type: 'EXPENSE', balance: 260000000, currency: 'IDR' }
  ],
  'CATERING-SURYA': [
    { id: 'coa-cat-01', code: '1-10101', name: 'Kas Dapur Pusat Industrial Cikarang', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 50000000, currency: 'IDR' },
    { id: 'coa-cat-02', code: '1-10102', name: 'Petty Cash Hub Catering Surabaya Ops', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 15000000, currency: 'IDR' },
    { id: 'coa-cat-03', code: '1-10103', name: 'Cash on Hand Coordinator Event Banquet', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 10000000, currency: 'IDR' },
    { id: 'coa-cat-04', code: '1-10201', name: 'Bank BNI Corporate Catering (089-777-654-1)', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 480000000, currency: 'IDR' },
    { id: 'coa-cat-05', code: '1-10202', name: 'Bank Mandiri Escrow Project B2B (118-00-4433-22)', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 220000000, currency: 'IDR' },
    { id: 'coa-cat-06', code: '1-10300', name: 'Piutang Usaha Kontrak Katering Pabrik B2B', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 240000000, currency: 'IDR' },
    { id: 'coa-cat-07', code: '4-10100', name: 'Pendapatan Kontrak Katering Karyawan & Event', categoryId: 'coa-cat-04', categoryName: 'Pendapatan Usaha (Operating Revenue)', type: 'REVENUE', balance: 920000000, currency: 'IDR' },
    { id: 'coa-cat-08', code: '5-10100', name: 'Beban HPP Bahan Masakan & Kemasan Pax', categoryId: 'coa-cat-05', categoryName: 'Beban HPP & Gaji Payroll (Expenses & COGS)', type: 'EXPENSE', balance: 390000000, currency: 'IDR' }
  ],
  'HOTEL-ALAM-PAKUAN': [
    { id: 'coa-htl-01', code: '1-10101', name: 'Kas Front Desk Receptionist Resort Bogor', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 30000000, currency: 'IDR' },
    { id: 'coa-htl-02', code: '1-10102', name: 'Kas Front Office Suites Seminyak Bali', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 25000000, currency: 'IDR' },
    { id: 'coa-htl-03', code: '1-10103', name: 'Petty Cash Housekeeping & Engineering', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 8000000, currency: 'IDR' },
    { id: 'coa-htl-04', code: '1-10201', name: 'Bank BCA Corporate Hotelier (008-999-123-4)', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 750000000, currency: 'IDR' },
    { id: 'coa-htl-05', code: '1-10202', name: 'Bank Mandiri OTA Deposit Agoda/Traveloka', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 310000000, currency: 'IDR' },
    { id: 'coa-htl-06', code: '2-10301', name: 'Utang Pajak Hotel & MICE PB1 (10%)', categoryId: 'coa-cat-02', categoryName: 'Liabilitas & Utang Pajak (Current Liabilities)', type: 'LIABILITY', balance: 68000000, currency: 'IDR' },
    { id: 'coa-htl-07', code: '4-10100', name: 'Pendapatan Sewa Kamar & Paket MICE Meeting', categoryId: 'coa-cat-04', categoryName: 'Pendapatan Usaha (Operating Revenue)', type: 'REVENUE', balance: 1450000000, currency: 'IDR' },
    { id: 'coa-htl-08', code: '5-10100', name: 'Beban Operational Kamar, Linen & Housekeeping', categoryId: 'coa-cat-05', categoryName: 'Beban HPP & Gaji Payroll (Expenses & COGS)', type: 'EXPENSE', balance: 480000000, currency: 'IDR' }
  ],
  'MINING-BRAXIT': [
    { id: 'coa-mne-01', code: '1-10101', name: 'Kas Field Office Site Kutai Kartanegara', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 150000000, currency: 'IDR' },
    { id: 'coa-mne-02', code: '1-10102', name: 'Kas Operational Hub Berau Site B', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 75000000, currency: 'IDR' },
    { id: 'coa-mne-03', code: '1-10103', name: 'Petty Cash Emergency K3 & Sparepart Field', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 25000000, currency: 'IDR' },
    { id: 'coa-mne-04', code: '1-10201', name: 'Bank Mandiri Escrow Mining (122-00-1111-99)', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 2450000000, currency: 'IDR' },
    { id: 'coa-mne-05', code: '1-10202', name: 'Bank BRI Operational Site (034-01-000222-30-1)', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 980000000, currency: 'IDR' },
    { id: 'coa-mne-06', code: '1-13001', name: 'Aset Tetap Heavy Fleet Excavator CAT 777D', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 12500000000, currency: 'IDR' },
    { id: 'coa-mne-07', code: '4-10100', name: 'Pendapatan Penjualan Batuan Ore Emas', categoryId: 'coa-cat-04', categoryName: 'Pendapatan Usaha (Operating Revenue)', type: 'REVENUE', balance: 5400000000, currency: 'IDR' },
    { id: 'coa-mne-08', code: '5-10100', name: 'Beban HPP Fuel Solar & Kerukan Heavy Fleet', categoryId: 'coa-cat-05', categoryName: 'Beban HPP & Gaji Payroll (Expenses & COGS)', type: 'EXPENSE', balance: 1850000000, currency: 'IDR' }
  ],
  'HOLDING-HO': [
    { id: 'coa-ho-01', code: '1-10101', name: 'Kas Utama Head Office Sudirman', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 450000000, currency: 'IDR' },
    { id: 'coa-ho-02', code: '1-10201', name: 'Bank Mandiri Utama Holding (122-00-9988-771)', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 3450000000, currency: 'IDR' },
    { id: 'coa-ho-03', code: '1-10202', name: 'Bank BCA Corporate Holding (8830-192-111)', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 2850000000, currency: 'IDR' },
    { id: 'coa-ho-04', code: '1-10300', name: 'Piutang Antar Perusahaan (Intercompany AR)', categoryId: 'coa-cat-01', categoryName: 'Aset Lancar & Kas Bank (Current Assets)', type: 'ASSET', balance: 640000000, currency: 'IDR' },
    { id: 'coa-ho-05', code: '2-10100', name: 'Utang Antar Perusahaan (Intercompany AP)', categoryId: 'coa-cat-02', categoryName: 'Liabilitas & Utang Pajak (Current Liabilities)', type: 'LIABILITY', balance: 410000000, currency: 'IDR' },
    { id: 'coa-ho-06', code: '3-10100', name: 'Modal Disetor Holding Ecosystem', categoryId: 'coa-cat-03', categoryName: 'Ekuitas & Modal (Owner Equity)', type: 'EQUITY', balance: 15000000000, currency: 'IDR' },
    { id: 'coa-ho-07', code: '4-10100', name: 'Pendapatan Management Fee Sub-Holdings', categoryId: 'coa-cat-04', categoryName: 'Pendapatan Usaha (Operating Revenue)', type: 'REVENUE', balance: 3800000000, currency: 'IDR' },
    { id: 'coa-ho-08', code: '5-10100', name: 'Beban Gaji Direksi & Operational Holding', categoryId: 'coa-cat-05', categoryName: 'Beban HPP & Gaji Payroll (Expenses & COGS)', type: 'EXPENSE', balance: 850000000, currency: 'IDR' }
  ]
};

export const COA_DATA: CoaItem[] = TENANT_COA_MAP['HOLDING-HO'];

