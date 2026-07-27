export interface DeepSeekTrainingItem {
  id: string;
  category: 'FINANCE_TAX' | 'INVENTORY_SUPPLY' | 'HRD_PAYROLL' | 'MINING_FLEET' | 'HOTEL_RESTO' | 'PLANTATION_AGRI' | 'DEV_STACK_INFRA' | 'GOVERNANCE_SECURITY';
  promptInstruction: string;
  expectedThoughtReasoning: string;
  expectedOutputResponse: string;
  datasetVersion: string;
}

export const DEEPSEEK_ERP_TRAINING_CORPUS: DeepSeekTrainingItem[] = [
  {
    id: 'dt-001',
    category: 'FINANCE_TAX',
    promptInstruction: 'Hitung total kewajiban PPN dan PB1 yang harus disetorkan holding dari transaksi Resto dan Hotel bulan ini.',
    expectedThoughtReasoning: 'Menganalisis transaksi terpisah antara PPN 11% (Objek Pajak Pusat) dan PB1 10% (Pajak Daerah Restoran/Hotel). PB1 tidak dikenakan PPN ganda.',
    expectedOutputResponse: 'Rekomendasi Fiskal: Total PB1 Resto & Hotel (Pajak Daerah 10%): Rp 42.500.000 (Setor ke Bapenda setempat). Total PPN Keluaran Retail (11%): Rp 18.700.000 (Setor via e-Faktur DJP). Jurnal Otomatis terposting di COA 2-10300 Utang Pajak.',
    datasetVersion: 'v2.4-Enterprise'
  },
  {
    id: 'dt-002',
    category: 'INVENTORY_SUPPLY',
    promptInstruction: 'Deteksi bahan baku persediaan catering yang berada di bawah buffer stock minimum dan buatkan draft PO otomatis.',
    expectedThoughtReasoning: 'Memeriksa kolom current_stock vs min_threshold pada tabel SKU Master Gudang Utama Catering.',
    expectedOutputResponse: 'Peringatan Stok Kritis: 2 SKU di bawah buffer point: (1) Tepung Terigu Cakra 25kg (Sisa: 4 Karung, Min: 10 Karung), (2) Minyak Goreng Bimoli 18L (Sisa: 2 Jerigen, Min: 5 Jerigen). Draft PO #PO/2026/07/0089 telah disiapkan untuk Supplier PT Indofood dengan estimasi nilai Rp 8.400.000.',
    datasetVersion: 'v2.4-Enterprise'
  },
  {
    id: 'dt-003',
    category: 'MINING_FLEET',
    promptInstruction: 'Analisis efisiensi konsumsi BBM unit Dump Truck Volvo FMX di Site Tambang Emas Borneo minggu ini.',
    expectedThoughtReasoning: 'Menghitung rasio BBM per Ritase Hauling. Total Solar dikonsumsi / Total Jarak Km & Ritase Cargo Tonase.',
    expectedOutputResponse: 'Analisis Fleet Mining: Unit DT-104 (Volvo FMX) mencatatkan konsumsi solar 28.5 Liter/Jam (Efisiensi 94% vs Target 30L/Jam). Total Cargo Terangkut: 701.5 Ton Ore Kadar Tinggi (Au 4.8 g/t). Rekomendasi: Unit aman untuk rotasi shift 2 malam ini.',
    datasetVersion: 'v2.4-Enterprise'
  },
  {
    id: 'dt-007',
    category: 'PLANTATION_AGRI',
    promptInstruction: 'Analisis hasil panen Tandan Buah Segar (TBS) Kelapa Sawit Blok A2 & estimasi Rendemen CPO Pabrik Kelapa Sawit (PKS) minggu ini.',
    expectedThoughtReasoning: 'Menganalisis hasil timbangan TBS Tonase, Berat Jenjang Rata-rata (BJR), & estimasi Rendemen CPO (Target 21.5%).',
    expectedOutputResponse: 'Analisis Perkebunan Kelapa Sawit: Panen TBS Blok A2 (Luas 150 Ha): 245.8 Ton TBS (BJR Rata-rata: 18.4 kg/jenjang). Estimasi Rendemen CPO PKS: 22.1% (Hasil CPO: 54.3 Ton). Estimasi Pendapatan Penjualan CPO: Rp 651.600.000 (Harga CPO Rp 12.000/kg). Jadwal Pemupukan NPK berikutnya: 10 Agustus 2026.',
    datasetVersion: 'v2.5-Plantation'
  },
  {
    id: 'dt-008',
    category: 'PLANTATION_AGRI',
    promptInstruction: 'Berikan panduan perawatan, penyerbukan, dan estimasi hasil panen Kebun Durian Musang King & Black Thorn 5 Hektar.',
    expectedThoughtReasoning: 'Menganalisis kebutuhan nutrisi pupuk Kalsium/Kalium tinggi saat fase pembuahan, sistem pengairan drip, & proyeksi kg/pohon.',
    expectedOutputResponse: 'Analisis Perkebunan Durian Premium: Populas 750 Pohon Durian (Musang King 60%, Black Thorn 40%). Proyeksi Hasil Panen: 4.5 Ton Durian Grade A (Rata-rata 60 kg/pohon produktif). Estimasi Omset Panen: Rp 900.000.000 (Harga Musang King Rp 200.000/kg). Tindakan Presisi: Lakukan pengocoran Pupuk KNO3 Merah & Pembungkusan Buah untuk mencegah serangga penggerek.',
    datasetVersion: 'v2.5-Plantation'
  },
  {
    id: 'dt-009',
    category: 'DEV_STACK_INFRA',
    promptInstruction: 'Tuliskan schema Prisma ORM & SQL Query PostgreSQL untuk penatausahaan Multi-Tenant Sales Invoice dengan audit soft-delete.',
    expectedThoughtReasoning: 'Merancang skema Prisma model SalesInvoice dengan relasi Tenant, indeks pencarian, & filter soft-delete isDeleted boolean.',
    expectedOutputResponse: 'Prisma Schema & PostgreSQL SQL: \nmodel SalesInvoice {\n  id String @id @default(uuid())\n  tenantId String\n  invoiceNo String @unique\n  totalAmount Decimal @db.Decimal(18,2)\n  isDeleted Boolean @default(false)\n  createdAt DateTime @default(now())\n  @@index([tenantId, isDeleted])\n}\nQuery PostgreSQL: SELECT * FROM "SalesInvoice" WHERE "tenantId" = \'tenant-resto-01\' AND "isDeleted" = false ORDER BY "createdAt" DESC;',
    datasetVersion: 'v2.6-DevStack'
  },
  {
    id: 'dt-010',
    category: 'DEV_STACK_INFRA',
    promptInstruction: 'Berikan konfigurasi Nginx Reverse Proxy & SSL Let\'s Encrypt untuk VPS Ubuntu Server 24.04 melayani Next.js App Router & Node.js API.',
    expectedThoughtReasoning: 'Merancang konfigurasi Nginx server block dengan proxy_pass ke localhost:3000 (Next.js) & localhost:5000 (Express API).',
    expectedOutputResponse: 'Konfigurasi Nginx VPS Ubuntu 24.04:\nserver {\n    server_name erp.domain.com;\n    location / {\n        proxy_pass http://127.0.0.1:3000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n    location /api {\n        proxy_pass http://127.0.0.1:5000;\n    }\n}\nCommand SSL Certbot: sudo certbot --nginx -d erp.domain.com',
    datasetVersion: 'v2.6-DevStack'
  },
  {
    id: 'dt-004',
    category: 'HRD_PAYROLL',
    promptInstruction: 'Simulasikan perhitungan THP Payroll Karyawan Tetap (PKWTT) Gaji Rp 12.000.000 dengan aturan BPJS dan PPh 21 TER 2026.',
    expectedThoughtReasoning: 'Menggunakan Formula Engine HRD ERP: Pokok Rp 12jt, BPJS TK 2% + BPJS Kes 1%, PPh 21 TER Kategori B (Tarif 4.5%).',
    expectedOutputResponse: 'Simulasi Payroll THP: Gaji Pokok: Rp 12.000.000. Potongan BPJS TK (2%): Rp 240.000. Potongan BPJS Kes (1%): Rp 120.000. Potongan PPh 21 TER (4.5%): Rp 540.000. Take Home Pay (THP Net): Rp 11.100.000.',
    datasetVersion: 'v2.4-Enterprise'
  },
  {
    id: 'dt-005',
    category: 'GOVERNANCE_SECURITY',
    promptInstruction: 'Bagaimana penanganan transaksi akuntansi jika staf mencoba mencatat tanggal jurnal pada bulan yang sudah ditutup (Backdate Transaction)?',
    expectedThoughtReasoning: 'Memeriksa status Backdate Lock pada User Profile & System Parameters.',
    expectedOutputResponse: 'Aturan Keamanan Backdate: Jika indikator Gembok Backdate [LOCKED 🔒] aktif, transaksi otomatis ditolak oleh validasi backend. Pengguna harus meminta unblock sementara dari Direksi / Super Admin (Bayu Yanuar), yang mana pembukaan kunci akan mencatat Log Audit Keamanan resmi dengan ID jejak permanen.',
    datasetVersion: 'v2.4-Enterprise'
  }
];
