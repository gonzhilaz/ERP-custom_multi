export interface BomComponent {
  rawItemId: string;
  rawItemCode: string;
  rawItemName: string;
  requiredQty: number;
  unitUom: string;
  costPerUnit: number;
  wastePercentage: number;
}

export interface BomOverheadCost {
  id: string;
  costType: string;
  amount: number;
  coaAccount: string;
}

export interface BomRecipeItem {
  id: string;
  code: string;
  name: string;
  category: 'BAKERY' | 'RESTO' | 'MINING' | 'HOTEL' | 'RETAIL_ASSEMBLY';
  outputItemId: string;
  outputItemName: string;
  outputQty: number;
  outputUom: string;
  components: BomComponent[];
  overheads: BomOverheadCost[];
  estimatedCogmPerUnit: number;
  suggestedSellingPrice: number;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  updatedAt: string;
}

export interface WorkOrderItem {
  id: string;
  woNumber: string;
  bomId: string;
  bomName: string;
  category: 'BAKERY' | 'RESTO' | 'MINING' | 'HOTEL' | 'RETAIL_ASSEMBLY';
  targetOutputQty: number;
  outputUom: string;
  totalEstimatedCogm: number;
  startDate: string;
  completionDate?: string;
  status: 'DRAFT' | 'RELEASED' | 'IN_PRODUCTION' | 'COMPLETED' | 'CANCELLED';
  warehouseSource: string;
  warehouseTarget: string;
  executedBy: string;
}

export interface ManufacturingAuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: 'CREATE_BOM' | 'EDIT_BOM' | 'RELEASE_WO' | 'COMPLETE_WO' | 'ARCHIVE_BOM';
  targetId: string;
  details: string;
}

export const MOCK_BOM_RECIPES: BomRecipeItem[] = [
  {
    id: 'bom-bakery-01',
    code: 'BOM-BKR-001',
    name: 'Roti Tawar Premium (Batch 50 Pcs)',
    category: 'BAKERY',
    outputItemId: 'pos-rtl-01',
    outputItemName: 'Roti Tawar Super Toast (500g)',
    outputQty: 50,
    outputUom: 'Pcs',
    components: [
      { rawItemId: 'raw-bkr-1', rawItemCode: 'RAW-FLR-01', rawItemName: 'Tepung Terigu Cakra Kembar', requiredQty: 10, unitUom: 'Kg', costPerUnit: 14000, wastePercentage: 2 },
      { rawItemId: 'raw-bkr-2', rawItemCode: 'RAW-SGR-01', rawItemName: 'Gula Pasir Industri', requiredQty: 2, unitUom: 'Kg', costPerUnit: 16000, wastePercentage: 1 },
      { rawItemId: 'raw-bkr-3', rawItemCode: 'RAW-BTR-01', rawItemName: 'Mentega Wijsman Premium', requiredQty: 1.5, unitUom: 'Kg', costPerUnit: 120000, wastePercentage: 0 },
      { rawItemId: 'raw-bkr-4', rawItemCode: 'RAW-YST-01', rawItemName: 'Ragi Instan Fermipan', requiredQty: 0.2, unitUom: 'Kg', costPerUnit: 85000, wastePercentage: 0 }
    ],
    overheads: [
      { id: 'ovh-1', costType: 'Beban Listrik Oven & Mixer', amount: 45000, coaAccount: '5-10201 - Beban Listrik Pabrik' },
      { id: 'ovh-2', costType: 'Beban Tenaga Kerja Baker (Langsung)', amount: 120000, coaAccount: '5-10202 - Upah Tenaga Kerja Langsung' }
    ],
    estimatedCogmPerUnit: 10700,
    suggestedSellingPrice: 22000,
    status: 'ACTIVE',
    updatedAt: '2026-07-24 06:30'
  },
  {
    id: 'bom-mining-01',
    code: 'BOM-MNG-001',
    name: 'Peleburan Bijih Emas (Batch 1 Kg Emas Murni)',
    category: 'MINING',
    outputItemId: 'min-gold-bar-01',
    outputItemName: 'Emas Batangan Murni 99.99%',
    outputQty: 1,
    outputUom: 'Kg',
    components: [
      { rawItemId: 'raw-mng-1', rawItemCode: 'RAW-ORE-01', rawItemName: 'Bijih Emas Mentah (Raw Gold Ore)', requiredQty: 85, unitUom: 'Ton', costPerUnit: 650000, wastePercentage: 5 },
      { rawItemId: 'raw-mng-2', rawItemCode: 'RAW-CHM-01', rawItemName: 'Natrium Sianida Pelarut Emas', requiredQty: 250, unitUom: 'Kg', costPerUnit: 48000, wastePercentage: 2 },
      { rawItemId: 'raw-mng-3', rawItemCode: 'RAW-CRB-01', rawItemName: 'Karbon Aktif Granular', requiredQty: 100, unitUom: 'Kg', costPerUnit: 35000, wastePercentage: 1 }
    ],
    overheads: [
      { id: 'ovh-m1', costType: 'Beban Bahan Bakar Heavy Smelter', amount: 12500000, coaAccount: '5-10203 - Beban Energi & BBM Tambang' },
      { id: 'ovh-m2', costType: 'Upah Metallurgist & Operator Smelter', amount: 18000000, coaAccount: '5-10202 - Upah Tenaga Kerja Langsung' }
    ],
    estimatedCogmPerUnit: 1010000000,
    suggestedSellingPrice: 1350000000,
    status: 'ACTIVE',
    updatedAt: '2026-07-23 18:15'
  },
  {
    id: 'bom-resto-01',
    code: 'BOM-RST-001',
    name: 'Formulasi Sate Sapi Ribeye (Batch 10 Porsi)',
    category: 'RESTO',
    outputItemId: 'pos-02',
    outputItemName: 'Sate Sapi Ribeye Bumbu Kacang',
    outputQty: 10,
    outputUom: 'Porsi',
    components: [
      { rawItemId: 'raw-rst-1', rawItemCode: 'RAW-MEAT-01', rawItemName: 'Daging Ribeye Meltique', requiredQty: 2.5, unitUom: 'Kg', costPerUnit: 145000, wastePercentage: 3 },
      { rawItemId: 'raw-rst-2', rawItemCode: 'RAW-SPICE-01', rawItemName: 'Bumbu Kacang & Kecap Nusantara', requiredQty: 1, unitUom: 'Kg', costPerUnit: 38000, wastePercentage: 0 }
    ],
    overheads: [
      { id: 'ovh-r1', costType: 'Gas LPG Dapur & Arang Pembakaran', amount: 25000, coaAccount: '5-10201 - Beban Listrik & Gas Resto' }
    ],
    estimatedCogmPerUnit: 42550,
    suggestedSellingPrice: 95000,
    status: 'ACTIVE',
    updatedAt: '2026-07-24 05:10'
  },
  {
    id: 'bom-hotel-01',
    code: 'BOM-HTL-001',
    name: 'Laundry & Penyiapan Linen Kamar (Batch 20 Set)',
    category: 'HOTEL',
    outputItemId: 'htl-linen-clean',
    outputItemName: 'Sprei & Bed Cover Clean Standard',
    outputQty: 20,
    outputUom: 'Set',
    components: [
      { rawItemId: 'raw-htl-1', rawItemCode: 'RAW-DET-01', rawItemName: 'Detergen Cair Industri Laundry', requiredQty: 4, unitUom: 'Liter', costPerUnit: 18000, wastePercentage: 0 },
      { rawItemId: 'raw-htl-2', rawItemCode: 'RAW-SOF-01', rawItemName: 'Pelembut & Pewangi Micro-Capsule', requiredQty: 2, unitUom: 'Liter', costPerUnit: 24000, wastePercentage: 0 }
    ],
    overheads: [
      { id: 'ovh-h1', costType: 'Biaya Air & Listrik Mesin Cuci Steam', amount: 65000, coaAccount: '5-10201 - Beban Operasional Laundry' }
    ],
    estimatedCogmPerUnit: 9250,
    suggestedSellingPrice: 25000,
    status: 'ACTIVE',
    updatedAt: '2026-07-22 14:20'
  }
];

export const MOCK_WORK_ORDERS: WorkOrderItem[] = [
  {
    id: 'wo-bakery-101',
    woNumber: 'WO-BKR-202607-001',
    bomId: 'bom-bakery-01',
    bomName: 'Roti Tawar Premium (Batch 50 Pcs)',
    category: 'BAKERY',
    targetOutputQty: 100,
    outputUom: 'Pcs',
    totalEstimatedCogm: 1070000,
    startDate: '2026-07-24 07:00',
    status: 'IN_PRODUCTION',
    warehouseSource: 'Gudang Bahan Baku Roti',
    warehouseTarget: 'Gudang Barang Jadi Outlet Retail',
    executedBy: 'Baker Master Hendra'
  },
  {
    id: 'wo-mining-102',
    woNumber: 'WO-MNG-202607-002',
    bomId: 'bom-mining-01',
    bomName: 'Peleburan Bijih Emas (Batch 1 Kg Emas Murni)',
    category: 'MINING',
    targetOutputQty: 2,
    outputUom: 'Kg',
    totalEstimatedCogm: 2020000000,
    startDate: '2026-07-23 09:00',
    status: 'RELEASED',
    warehouseSource: 'Gudang Ore & Bahan Kimia Braxit',
    warehouseTarget: 'Vault Khusus Emas Murni',
    executedBy: 'Chief Engineer Metallurgist'
  },
  {
    id: 'wo-resto-103',
    woNumber: 'WO-RST-202607-003',
    bomId: 'bom-resto-01',
    bomName: 'Formulasi Sate Sapi Ribeye (Batch 10 Porsi)',
    category: 'RESTO',
    targetOutputQty: 30,
    outputUom: 'Porsi',
    totalEstimatedCogm: 1276500,
    startDate: '2026-07-24 06:00',
    completionDate: '2026-07-24 06:45',
    status: 'COMPLETED',
    warehouseSource: 'Gudang Chiller Bahan Makanan',
    warehouseTarget: 'Dapur Saji Resto',
    executedBy: 'Chef Utama Resto'
  }
];

export const MOCK_MANUFACTURING_AUDIT_LOGS: ManufacturingAuditLog[] = [
  {
    id: 'mlog-1',
    timestamp: '2026-07-24 07:00:12',
    user: 'Baker Master Hendra',
    role: 'PRODUCTION_MANAGER',
    action: 'RELEASE_WO',
    targetId: 'WO-BKR-202607-001',
    details: 'Peluncuran Work Order Produksi 100 Pcs Roti Tawar. Potong Stok Terigu 20kg, Gula 4kg, Mentega 3kg.'
  },
  {
    id: 'mlog-2',
    timestamp: '2026-07-24 06:45:00',
    user: 'Chef Utama Resto',
    role: 'HEAD_CHEF',
    action: 'COMPLETE_WO',
    targetId: 'WO-RST-202607-003',
    details: 'Work Order Selesai. 30 Porsi Sate Sapi Ribeye ditambahkan ke Stok Dapur. Jurnal COGM Rp 1.276.500 terposting.'
  },
  {
    id: 'mlog-3',
    timestamp: '2026-07-24 06:30:15',
    user: 'System Admin',
    role: 'ADMIN',
    action: 'CREATE_BOM',
    targetId: 'BOM-BKR-001',
    details: 'Formulasi BOM Baru [Roti Tawar Premium (Batch 50 Pcs)] berhasil didaftarkan.'
  }
];
