export interface InventoryItem {
  id: string;
  sku?: string;
  code: string;
  name: string;
  category: string;
  categoryId?: string;
  warehouseLocation?: string;
  warehouse: string;
  currentStock?: number;
  stockQty: number;
  minThreshold?: number;
  minStockLevel: number;
  maxStockBudget?: number;
  unit?: string;
  uom: string;
  unitCostPrice?: number;
  costPerUnit: number;
  totalAssetValue?: number;
  valuationMethod?: 'FIFO' | 'AVERAGE' | 'LIFO';
  isAlert?: boolean;
  status?: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}

export interface InventoryCategory {
  id: string;
  code: string;
  name: string;
  itemCount: number;
  description: string;
  coaAccountCode?: string;
  coaAccountName?: string;
}

export interface AssetItem {
  id: string;
  code: string;
  name: string;
  category: string;
  categoryId?: string;
  acquisitionDate?: string;
  purchaseDate?: string;
  acquisitionCost?: number;
  purchaseCost: number;
  currentBookValue?: number;
  bookValue: number;
  accumulatedDepreciation: number;
  monthlyDepreciation: number;
  salvageValue?: number;
  usefulLifeYears?: number;
  location?: string;
  branchLocation: string;
  status: 'OPERATIONAL' | 'MAINTENANCE' | 'DISPOSED' | 'UNDER_REPAIR';
}

export interface AssetCategory {
  id: string;
  code: string;
  name: string;
  usefulLifeYears?: number;
  usefulLifeYearsDefault: number;
  depreciationMethod?: 'STRAIGHT_LINE' | 'DECLINING_BALANCE';
  assetCoaCode: string;
  assetCoaName: string;
  depreciationCoaCode: string;
  depreciationCoaName: string;
  description: string;
  assetCount: number;
}

export interface StorageLocation {
  id: string;
  code: string;
  name: string;
  type: string;
  typeId?: string;
  typeName?: string;
  capacityTon?: number;
  capacityMax: number;
  capacityUsed: number;
  currentUsagePct?: number;
  manager?: string;
  managerName?: string;
  branchName: string;
  isAlert?: boolean;
  uom?: string;
  ownershipStatus?: 'OWNED' | 'LEASED';
}

export interface StorageTypeItem {
  id: string;
  code: string;
  name: string;
  temperatureControl?: string;
  description: string;
  type: string;
  ownershipStatus: 'OWNED' | 'LEASED';
  storageCount?: number;
  coaAccountCode?: string;
  coaAccountName?: string;
  linkedAssetId?: string;
  tempControl?: boolean;
  targetTempCelsius?: number;
}

export interface InventoryMovement {
  id: string;
  movementCode: string;
  itemSku: string;
  itemName: string;
  type: 'INBOUND_RECEIPT' | 'OUTBOUND_DISPATCH' | 'TRANSFER_INTER_BRANCH';
  quantity: number;
  sourceLocation: string;
  destinationLocation: string;
  timestamp: string;
  operator: string;
}

export const MOCK_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'inv-01',
    sku: 'SKU-TERIGU-CKR',
    code: 'SKU-TERIGU-CKR',
    name: 'Tepung Terigu Cakra Kembar Premium 25kg',
    category: 'BAKERY_CATERING_RAW',
    warehouseLocation: 'Gudang Utama Central Kitchen HQ',
    warehouse: 'Gudang Utama Central Kitchen HQ',
    currentStock: 4,
    stockQty: 4,
    minThreshold: 10,
    minStockLevel: 10,
    unit: 'Karung',
    uom: 'Karung',
    unitCostPrice: 245000,
    costPerUnit: 245000,
    totalAssetValue: 980000,
    valuationMethod: 'FIFO',
    isAlert: true,
    status: 'LOW_STOCK'
  },
  {
    id: 'inv-02',
    sku: 'SKU-MINYAK-BML',
    code: 'SKU-MINYAK-BML',
    name: 'Minyak Goreng Bimoli Jerigen 18 Liter',
    category: 'CATERING_RAW_MATERIAL',
    warehouseLocation: 'Gudang Utama Central Kitchen HQ',
    warehouse: 'Gudang Utama Central Kitchen HQ',
    currentStock: 2,
    stockQty: 2,
    minThreshold: 5,
    minStockLevel: 5,
    unit: 'Jerigen',
    uom: 'Jerigen',
    unitCostPrice: 320000,
    costPerUnit: 320000,
    totalAssetValue: 640000,
    valuationMethod: 'FIFO',
    isAlert: true,
    status: 'LOW_STOCK'
  },
  {
    id: 'inv-03',
    sku: 'SKU-SOLAR-B35',
    code: 'SKU-SOLAR-B35',
    name: 'Bahan Bakar Solar B35 Industry Grade',
    category: 'MINING_FLEET_FUEL',
    warehouseLocation: 'Gudang Pit Tanker Site Berau',
    warehouse: 'Gudang Pit Tanker Site Berau',
    currentStock: 45000,
    stockQty: 45000,
    minThreshold: 15000,
    minStockLevel: 15000,
    unit: 'Liter',
    uom: 'Liter',
    unitCostPrice: 13500,
    costPerUnit: 13500,
    totalAssetValue: 607500000,
    valuationMethod: 'AVERAGE',
    isAlert: false,
    status: 'IN_STOCK'
  },
  {
    id: 'inv-04',
    sku: 'SKU-DAGING-SAPI',
    code: 'SKU-DAGING-SAPI',
    name: 'Daging Sapi Sirloin Striploin Aus Impor 1kg',
    category: 'RESTO_CATERING_MEAT',
    warehouseLocation: 'Cold Storage Cold-Room Resto',
    warehouse: 'Cold Storage Cold-Room Resto',
    currentStock: 85,
    stockQty: 85,
    minThreshold: 20,
    minStockLevel: 20,
    unit: 'Kg',
    uom: 'Kg',
    unitCostPrice: 145000,
    costPerUnit: 145000,
    totalAssetValue: 12325000,
    valuationMethod: 'FIFO',
    isAlert: false,
    status: 'IN_STOCK'
  },
  {
    id: 'inv-05',
    sku: 'SKU-LINEN-SPREI',
    code: 'SKU-LINEN-SPREI',
    name: 'Sprei Linen Hotel Cotton TC-300 King Size',
    category: 'HOTEL_HOUSEKEEPING',
    warehouseLocation: 'Gudang Linen Hotel Grand Royal',
    warehouse: 'Gudang Linen Hotel Grand Royal',
    currentStock: 150,
    stockQty: 150,
    minThreshold: 30,
    minStockLevel: 30,
    unit: 'Set',
    uom: 'Set',
    unitCostPrice: 280000,
    costPerUnit: 280000,
    totalAssetValue: 42000000,
    valuationMethod: 'AVERAGE',
    isAlert: false,
    status: 'IN_STOCK'
  }
];

export const MOCK_CATEGORIES: InventoryCategory[] = [
  { id: 'cat-01', code: 'BAKERY_RAW', name: 'Bahan Baku Bakery & Roti', itemCount: 42, description: 'Tepung, ragi, mentega, dan gula khusus pabrikasi bakery' },
  { id: 'cat-02', code: 'MINING_FUEL', name: 'BBM & Pelumas Heavy Fleet', itemCount: 15, description: 'Solar B35, Oli Mesin HD, & Grease Hydrolic Tambang' },
  { id: 'cat-03', code: 'CATERING_MEAT', name: 'Daging & Bahan Segar Catering', itemCount: 68, description: 'Daging sapi, ayam, dan sayuran segar mess hall' }
];

export const MOCK_ASSETS: AssetItem[] = [
  { id: 'ast-01', code: 'AST-CAT-390F', name: 'Caterpillar 390F Excavator (90 Ton)', category: 'HEAVY_EQUIPMENT', acquisitionDate: '2024-03-15', acquisitionCost: 4500000000, purchaseCost: 4500000000, currentBookValue: 3375000000, bookValue: 3375000000, accumulatedDepreciation: 1125000000, monthlyDepreciation: 46875000, location: 'Site Pit East Block 4 Kutai', branchLocation: 'Site Kutai', status: 'OPERATIONAL' },
  { id: 'ast-02', code: 'AST-VOL-FMX', name: 'Volvo FMX 440 Rigid Dump Hauler', category: 'FLEET_TRUCK', acquisitionDate: '2025-01-10', acquisitionCost: 1800000000, purchaseCost: 1800000000, currentBookValue: 1575000000, bookValue: 1575000000, accumulatedDepreciation: 225000000, monthlyDepreciation: 30000000, location: 'Hauling Road Berau', branchLocation: 'Site Berau', status: 'OPERATIONAL' }
];

export const MOCK_ASSET_CATEGORIES: AssetCategory[] = [
  { id: 'acat-01', code: 'HEAVY_EQUIPMENT', name: 'Alat Berat Pertambangan', usefulLifeYears: 8, usefulLifeYearsDefault: 8, depreciationMethod: 'STRAIGHT_LINE', assetCoaCode: '1-10701', assetCoaName: 'Aset Tetap Alat Berat', depreciationCoaCode: '1-10702', depreciationCoaName: 'Akumulasi Depresiasi Alat Berat', description: 'Excavator, Bulldozer & Drilling Rigs', assetCount: 12 },
  { id: 'acat-02', code: 'FLEET_TRUCK', name: 'Armada Dump Truck & Fleet', usefulLifeYears: 5, usefulLifeYearsDefault: 5, depreciationMethod: 'STRAIGHT_LINE', assetCoaCode: '1-10703', assetCoaName: 'Aset Tetap Kendaraan Fleet', depreciationCoaCode: '1-10704', depreciationCoaName: 'Akumulasi Depresiasi Fleet', description: 'Rigid Dump Haulers & Volvo FMX', assetCount: 25 }
];

export const MOCK_STORAGE_LOCATIONS: StorageLocation[] = [
  { id: 'loc-01', code: 'WH-HQ-CGK', name: 'Gudang Utama Central Kitchen HQ', type: 'COLD_AMBIENT', capacityTon: 250, capacityMax: 250, capacityUsed: 170, currentUsagePct: 68, manager: 'Siti Warehouse Officer', branchName: 'HQ Jakarta', isAlert: false, uom: 'Ton' },
  { id: 'loc-02', code: 'WH-PIT-BERAU', name: 'Gudang Pit Tanker Site Berau', type: 'FUEL_STATION', capacityTon: 1000, capacityMax: 1000, capacityUsed: 450, currentUsagePct: 45, manager: 'Bambang Fuel Ops', branchName: 'Site Berau', isAlert: false, uom: 'Liter' }
];

export const MOCK_STORAGE_TYPES: StorageTypeItem[] = [
  { id: 'st-01', code: 'COLD_ROOM', name: 'Cold Room Chiller (-18°C)', temperatureControl: '-18°C', description: 'Penyimpanan daging impor & produk dairy perishable', type: 'COLD_ROOM', ownershipStatus: 'OWNED' },
  { id: 'st-02', code: 'FUEL_TANK', name: 'BBM Solar Storage Tank', temperatureControl: 'Ambient', description: 'Tangki BBM kapasitas 1,000 Ton untuk armada tambang', type: 'FUEL_TANK', ownershipStatus: 'OWNED' }
];

export const MOCK_INVENTORY_MOVEMENTS: InventoryMovement[] = [
  {
    id: 'mov-01',
    movementCode: 'MOV-202607-0045',
    itemSku: 'SKU-SOLAR-B35',
    itemName: 'Bahan Bakar Solar B35 Industry Grade',
    type: 'OUTBOUND_DISPATCH',
    quantity: 1200,
    sourceLocation: 'Gudang Pit Tanker Site Berau',
    destinationLocation: 'Fuel Tanker Unit DT-KOM-785',
    timestamp: '2026-07-26 07:15',
    operator: 'Bambang Fuel Ops'
  },
  {
    id: 'mov-02',
    movementCode: 'MOV-202607-0046',
    itemSku: 'SKU-TERIGU-CKR',
    itemName: 'Tepung Terigu Cakra Kembar Premium 25kg',
    type: 'INBOUND_RECEIPT',
    quantity: 20,
    sourceLocation: 'Supplier PT Indofood',
    destinationLocation: 'Gudang Utama Central Kitchen HQ',
    timestamp: '2026-07-26 09:30',
    operator: 'Siti Warehouse Officer'
  }
];
