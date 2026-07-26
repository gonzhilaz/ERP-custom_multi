export interface InventoryItem {
  id: string;
  code: string;
  name: string;
  categoryId: string;
  category: string;
  warehouse: string;
  stockQty: number;
  minStockLevel: number;
  maxStockBudget: number;
  uom: string;
  costPerUnit: number;
  valuationMethod: 'FIFO' | 'AVERAGE';
  isAlert: boolean;
}

export interface InventoryCategory {
  id: string;
  code: string;
  name: string;
  coaAccountCode: string;
  coaAccountName: string;
  itemCount: number;
  description: string;
}

export interface AssetCategory {
  id: string;
  code: string;
  name: string;
  assetCoaCode: string;
  assetCoaName: string;
  depreciationCoaCode: string;
  depreciationCoaName: string;
  usefulLifeYearsDefault: number;
  assetCount: number;
  description: string;
}

export interface StorageTypeItem {
  id: string;
  code: string;
  name: string;
  type: string; // Classification name (e.g. Gudang Kering Utama, Cold Freezer, Tangki Fuel)
  ownershipStatus: 'OWNED' | 'LEASED'; // Milik Sendiri (Asset) vs Disewa (Sewa)
  coaAccountCode: string; // Terikat COA Aset Tetap atau COA Beban Sewa
  coaAccountName: string;
  linkedAssetId?: string; // Link ke Master Asset Tetap jika milik sendiri
  tempControl: boolean;
  targetTempCelsius?: number;
  storageCount: number;
  description: string;
}

export interface AssetItem {
  id: string;
  code: string;
  name: string;
  categoryId: string;
  category: string;
  branchLocation: string;
  purchaseDate: string;
  purchaseCost: number;
  salvageValue: number;
  usefulLifeYears: number;
  monthlyDepreciation: number;
  accumulatedDepreciation: number;
  bookValue: number;
  status: 'OPERATIONAL' | 'MAINTENANCE' | 'UNDER_REPAIR';
}

export interface StorageLocation {
  id: string;
  code: string;
  name: string;
  typeId: string;
  type: string;
  typeName: string;
  ownershipStatus: 'OWNED' | 'LEASED';
  branchName: string;
  capacityMax: number;
  capacityUsed: number;
  uom: string;
  managerName: string;
}

export const MOCK_CATEGORIES: InventoryCategory[] = [
  {
    id: 'cat-01',
    code: 'CAT-RAW-FOOD',
    name: 'Bahan Baku & Dapur (Raw Material)',
    coaAccountCode: '102-100',
    coaAccountName: 'Persediaan Bahan Baku & Dapur Resto',
    itemCount: 3,
    description: 'Tepung terigu, mentega, gula, daging import, & bahan makanan mentah.'
  }
];

export const MOCK_ASSET_CATEGORIES: AssetCategory[] = [
  {
    id: 'ast-cat-01',
    code: 'AST-BUILDING',
    name: 'Gedung, Bangunan & Tanah',
    assetCoaCode: '150-100',
    assetCoaName: 'Aset Tetap Gedung & Kantor Holding',
    depreciationCoaCode: '155-100',
    depreciationCoaName: 'Akumulasi Depresiasi Bangunan',
    usefulLifeYearsDefault: 20,
    assetCount: 1,
    description: 'Bangunan toko retail, gedung kantor utama, resort hotel, gudang site.'
  }
];

export const MOCK_STORAGE_TYPES: StorageTypeItem[] = [
  {
    id: 'str-type-01',
    code: 'TYPE-COLD-ROOM',
    name: 'Cold Storage Freezer (-18°C)',
    type: 'Cold Storage Freezer',
    ownershipStatus: 'OWNED',
    coaAccountCode: '150-300',
    coaAccountName: 'Aset Tetap Mesin & Instalasi Cold Storage',
    linkedAssetId: 'ast-001',
    tempControl: true,
    targetTempCelsius: -18,
    storageCount: 1,
    description: 'Ruang penyimpanan dingin bersuhu beku untuk daging import, butter, & perishable food.'
  },
  {
    id: 'str-type-02',
    code: 'TYPE-MAIN-DRY',
    name: 'Gudang Utama Kering (Main Dry Warehouse)',
    type: 'Gudang Utama Kering',
    ownershipStatus: 'LEASED',
    coaAccountCode: '505-100',
    coaAccountName: 'Beban Sewa Gudang & Logistik Ops',
    tempControl: false,
    storageCount: 1,
    description: 'Gudang disewa untuk penyimpanan bahan baku kering, tepung terigu, kemasan, & stok toko.'
  },
  {
    id: 'str-type-03',
    code: 'TYPE-FUEL-TANK',
    name: 'Tangki BBM Solar Site (Fuel Depot Tank)',
    type: 'Depot Tangki Fuel BBM',
    ownershipStatus: 'OWNED',
    coaAccountCode: '150-200',
    coaAccountName: 'Aset Tetap Tangki & Heavy Equipment Site',
    tempControl: false,
    storageCount: 1,
    description: 'Tangki penampungan BBM Solar HSD milik perusahaan untuk operasional heavy fleet site tambang.'
  }
];

export const MOCK_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'inv-001',
    code: 'SKU-TERIGU-01',
    name: 'Tepung Terigu Cakra Kembar Premium 25kg',
    categoryId: 'cat-01',
    category: 'Bahan Baku & Dapur (Raw Material)',
    warehouse: 'Gudang Utama Sudirman',
    stockQty: 18,
    minStockLevel: 50,
    maxStockBudget: 200,
    uom: 'Karung',
    costPerUnit: 245000,
    valuationMethod: 'FIFO',
    isAlert: true
  }
];

export const MOCK_ASSETS: AssetItem[] = [
  {
    id: 'ast-001',
    code: 'AST-OVEN-001',
    name: 'Mesin Oven Deck Rotari Commercial 3-Deck',
    categoryId: 'ast-cat-01',
    category: 'Gedung, Bangunan & Tanah',
    branchLocation: 'Cabang Utama Sudirman',
    purchaseDate: '2024-01-15',
    purchaseCost: 145000000,
    salvageValue: 15000000,
    usefulLifeYears: 10,
    monthlyDepreciation: 1083333,
    accumulatedDepreciation: 26000000,
    bookValue: 119000000,
    status: 'OPERATIONAL'
  }
];

export const MOCK_STORAGE_LOCATIONS: StorageLocation[] = [
  {
    id: 'str-001',
    code: 'WH-SDR-MAIN',
    name: 'Gudang Utama Sudirman',
    typeId: 'str-type-02',
    type: 'Gudang Utama Kering',
    typeName: 'Gudang Utama Kering (Main Dry Warehouse)',
    ownershipStatus: 'LEASED',
    branchName: 'Cabang Utama Sudirman',
    capacityMax: 5000,
    capacityUsed: 3420,
    uom: 'Karung/Box',
    managerName: 'Eko Stok'
  },
  {
    id: 'str-002',
    code: 'WH-COLD-SNP',
    name: 'Cold Storage Room Freezer (-18°C)',
    typeId: 'str-type-01',
    type: 'Cold Storage Freezer',
    typeName: 'Cold Storage Freezer (-18°C)',
    ownershipStatus: 'OWNED',
    branchName: 'Cabang Senopati Flagship',
    capacityMax: 2000,
    capacityUsed: 1650,
    uom: 'Kg',
    managerName: 'Budi Resto'
  },
  {
    id: 'str-003',
    code: 'WH-RTL-DISPLAY',
    name: 'Gudang Display Etalase Outlet Retail',
    typeId: 'str-type-02',
    type: 'Gudang Display Toko',
    typeName: 'Display Etalase & Showcase Outlet (POS Linked)',
    ownershipStatus: 'OWNED',
    branchName: 'Outlet Retail Toko Roti Utama',
    capacityMax: 1000,
    capacityUsed: 450,
    uom: 'Pcs/Pack',
    managerName: 'Supervisor Kasir Retail'
  }
];
