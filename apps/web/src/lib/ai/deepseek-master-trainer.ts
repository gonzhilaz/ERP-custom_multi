import { DEEPSEEK_ERP_TRAINING_CORPUS, DeepSeekTrainingItem } from './deepseek-training-corpus';

export interface ModuleKnowledgeSpec {
  moduleCode: string;
  moduleName: string;
  routesCount: number;
  coreEntities: string[];
  keyRules: string[];
  sampleTrainingPair: DeepSeekTrainingItem;
}

export const ERP_SYSTEM_KNOWLEDGE_SPECS: ModuleKnowledgeSpec[] = [
  {
    moduleCode: 'FINANCE',
    moduleName: 'Keuangan & Akuntansi Konsolidasi',
    routesCount: 19,
    coreEntities: ['COA Ledger', 'GL Journal', 'AP Subsidiary', 'AR Subsidiary', 'Petty Cash', 'Trial Balance', 'Tax PMK 72/2023'],
    keyRules: ['Keseimbangan Debit = Kredit 100%', 'Aturan Gembok Backdate 🔒', 'Soft Delete isDeleted: true'],
    sampleTrainingPair: {
      id: 'tr-fin-01',
      category: 'FINANCE_TAX',
      promptInstruction: 'Bagaimana jurnal otomatis saat pencatatan transaksi pembelian bahan baku catering dari vendor dengan PPN 11%?',
      expectedThoughtReasoning: 'Menganalisis pengakuan debit persediaan & PPN masukan vs kredit utang vendor.',
      expectedOutputResponse: 'Jurnal Otomatis ERP: (D) 1-10400 Persediaan Bahan Baku Catering Rp 10.000.000, (D) 1-10500 PPN Masukan (11%) Rp 1.100.000, (K) 2-10100 Utang Dagang Vendor Rp 11.100.000.',
      datasetVersion: 'v3.0-MasterCodebase'
    }
  },
  {
    moduleCode: 'INVENTORY_ASSETS',
    moduleName: 'Inventory, Gudang & Aset Tetap',
    routesCount: 22,
    coreEntities: ['SKU Items', 'Warehouse Stock', 'Movements', 'Requisitions', 'Fixed Assets', 'Depreciation PMK 72'],
    keyRules: ['Buffer Stock Threshold Notification', 'Pemberlakuan HPP FIFO/Average', 'Aturan Penyusutan Garis Lurus/Saldo Menurun'],
    sampleTrainingPair: {
      id: 'tr-inv-01',
      category: 'INVENTORY_SUPPLY',
      promptInstruction: 'Hitung penyusutan bulanan unit excavator mining senilai Rp 2.400.000.000 dengan masa manfaat 8 tahun (Garis Lurus).',
      expectedThoughtReasoning: 'Formula Depresiasi: Nilai Perolehan / (Masa Manfaat x 12 Bulan).',
      expectedOutputResponse: 'Kalkulasi Depresiasi Aset: Depresiasi Per Bulan = Rp 2.400.000.000 / 96 Bulan = Rp 25.000.000 / Bulan. Jurnal Auto-Post: (D) Beban Penyusutan Alat Berat Rp 25.000.000, (K) Akumulasi Penyusutan Alat Berat Rp 25.000.000.',
      datasetVersion: 'v3.0-MasterCodebase'
    }
  },
  {
    moduleCode: 'HRD_ESS',
    moduleName: 'SDM, Payroll, BPJS & ESS Self-Service',
    routesCount: 28,
    coreEntities: ['Employees PKWTT/PKWT', 'Payroll THP Engine', 'BPJS TK & Kes', 'SP 1/2/3 Warning Letters', 'SPPD Travel', 'QR Attendance'],
    keyRules: ['PPh 21 TER PMK 168/2023', 'Potongan BPJS TK 2% + Kes 1%', 'Approval Berjenjang Atasan ESS'],
    sampleTrainingPair: {
      id: 'tr-hrd-01',
      category: 'HRD_PAYROLL',
      promptInstruction: 'Berapa kompensasi pesangon & premi BPJS untuk karyawan yang menerima Surat Peringatan Ketiga (SP-3)?',
      expectedThoughtReasoning: 'Mengecek aturan warning letters HRD ERP & UU Cipta Kerja No 6/2023.',
      expectedOutputResponse: 'Aturan HRD ERP: Karyawan penerima SP-3 berstatus evaluasi kinerja 30 hari. Jika terjadi PHK karena pelanggaran disiplin berat, kompensasi mengacu pada Pasal 52 PP 35/2021 (1x UPMK + UPH). Hak BPJS Kesehatan tetap aktif hingga akhir bulan.',
      datasetVersion: 'v3.0-MasterCodebase'
    }
  },
  {
    moduleCode: 'MINING',
    moduleName: 'Operasional Tambang & Fleet Hauling',
    routesCount: 8,
    coreEntities: ['Hauling Cargo Tonase', 'Volvo FMX Fleet Solar', 'Ore Assay Au/Fe Testing', 'Mess Hall Catering'],
    keyRules: ['BBM Target <= 30L/Jam', 'Timbangan Digital Ritase', 'Kadar Emas Au g/t Validation'],
    sampleTrainingPair: {
      id: 'tr-mng-01',
      category: 'MINING_FLEET',
      promptInstruction: 'Berapa rasio efisiensi BBM Solar fleet hauling jika 5 Dump Truck mengonsumsi 1.200 Liter untuk 40 Ritase cargo?',
      expectedThoughtReasoning: 'Menghitung Liter per Ritase dan Liter per Tonase Cargo.',
      expectedOutputResponse: 'Rasio Fleet Mining: Konsumsi BBM = 30 Liter / Ritase Cargo. Dengan rata-rata tonase 18 Ton/Rit, efisiensi BBM = 1.66 Liter / Ton Cargo. Status Fleet: Sangat Efisien (Di bawah batas maksimum 35L/Rit).',
      datasetVersion: 'v3.0-MasterCodebase'
    }
  },
  {
    moduleCode: 'HOTELIER_RESTO',
    moduleName: 'Hotel PMS, Resto POS & Catering Massal',
    routesCount: 16,
    coreEntities: ['Room Reservations', 'Housekeeping Turnover', 'POS Cashier Settlement', 'Recipe BOM Costing', 'Catering Events'],
    keyRules: ['Pajak Daerah PB1 10%', 'Checkout Room Cleaning Automation', 'Food Waste Margin <= 3%'],
    sampleTrainingPair: {
      id: 'tr-htl-01',
      category: 'HOTEL_RESTO',
      promptInstruction: 'Bagaimana alur settlement kasir resto saat tamu hotel melakukan Room Charge (Post to Room)?',
      expectedThoughtReasoning: 'Memeriksa integrasi POS Resto ke Folio Kamar Hotel PMS.',
      expectedOutputResponse: 'Alur Room Charge ERP: Kasir POS memilih opsi "Post to Room Kamar #304" ➔ Validasi Nama Tamu & Limit Kredit Folio ➔ Otomatis memindahkan tagihan resto (termasuk PB1 10%) ke Folio Checkout Tamu Hotel tanpa perlu bayar tunai di kasir.',
      datasetVersion: 'v3.0-MasterCodebase'
    }
  },
  {
    moduleCode: 'PLANTATION',
    moduleName: 'Perkebunan Sawit, Durian & Agribisnis',
    routesCount: 6,
    coreEntities: ['Tandan Buah Segar (TBS)', 'PKS Rendemen CPO', 'Kebun Durian Musang King', 'Drip Irrigation', 'BJR Timbangan'],
    keyRules: ['Target Rendemen CPO >= 21.5%', 'BJR Jenjang Sawit', 'Pupuk Berkala NPK/KNO3'],
    sampleTrainingPair: {
      id: 'tr-plt-01',
      category: 'PLANTATION_AGRI',
      promptInstruction: 'Hitung omset penjualan CPO jika panen TBS minggu ini 500 Ton dengan rendemen PKS 22% dan harga CPO Rp 12.500/kg.',
      expectedThoughtReasoning: 'Total CPO = 500 Ton TBS x 22% = 110 Ton CPO (110.000 kg). Omset = 110.000 x Rp 12.500.',
      expectedOutputResponse: 'Perhitungan Hasil CPO: Total Produksi CPO = 110 Ton (110.000 kg). Total Omset Penjualan CPO = Rp 1.375.000.000. Jurnal ERP: (D) Kas/Piutang CPO Rp 1.375.000.000, (K) Pendapatan Hasil Perkebunan Rp 1.375.000.000.',
      datasetVersion: 'v3.0-MasterCodebase'
    }
  },
  {
    moduleCode: 'DEV_INFRA',
    moduleName: 'Full-Stack Engineering & Server Infrastructure',
    routesCount: 10,
    coreEntities: ['PostgreSQL 16', 'Prisma ORM', 'Next.js 16', 'Flutter', 'MCP Server', 'Nginx Reverse Proxy', 'Ubuntu VPS'],
    keyRules: ['Zero Native Select HTML', 'Dynamic SearchableSelect Governance', 'Strict RBAC Resolver Scoping'],
    sampleTrainingPair: {
      id: 'tr-dev-01',
      category: 'DEV_STACK_INFRA',
      promptInstruction: 'Mengapa seluruh dropdown pilihan master data di aplikasi ERP wajib menggunakan SearchableSelect?',
      expectedThoughtReasoning: 'Memeriksa Aturan AGENTS.md Rule 10 (Mandatory SearchableSelect Governance).',
      expectedOutputResponse: 'Kepatuhan Rule 10 AGENTS.md: Native HTML `<select>` DILARANG KERAS karena tidak mampu menangani data hingga jutaan baris dengan cepat. Komponen `<SearchableSelect />` wajib digunakan di 100% modul untuk menyediakan live quick-search input filter yang responsif dan ringan.',
      datasetVersion: 'v3.0-MasterCodebase'
    }
  }
];

export function compileFullCodebaseTrainingCorpus(): DeepSeekTrainingItem[] {
  const generatedPairs: DeepSeekTrainingItem[] = [];
  
  ERP_SYSTEM_KNOWLEDGE_SPECS.forEach((spec) => {
    generatedPairs.push(spec.sampleTrainingPair);
  });

  return [...generatedPairs, ...DEEPSEEK_ERP_TRAINING_CORPUS];
}
