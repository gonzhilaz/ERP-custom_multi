export interface MenuCategoryItem {
  id: string;
  code: string;
  name: string;
  itemCount: number;
  description: string;
}

export interface PosMenuItem {
  id: string;
  code: string;
  name: string;
  categoryId: string;
  category: string;
  price: number;
  cogsHpp: number;
  stockQty?: number;
  unitUom?: string;
  image?: string;
  isAvailable: boolean;
}

export interface PosOrderItem {
  item: PosMenuItem;
  quantity: number;
  notes?: string;
}

export const MOCK_MENU_CATEGORIES: MenuCategoryItem[] = [
  {
    id: 'mcat-retail-01',
    code: 'CAT-RTL-01',
    name: 'Sembako & Pangan Retail',
    itemCount: 3,
    description: 'Beras super, gula pasir, minyak goreng kemasan 2L, & bahan kebutuhan pokok.'
  },
  {
    id: 'mcat-retail-02',
    code: 'CAT-RTL-02',
    name: 'Snack, Biscuit & Minuman',
    itemCount: 3,
    description: 'Minuman dingin botol, biskuit kaleng, makanan ringan, & snack kemasan.'
  },
  {
    id: 'mcat-retail-03',
    code: 'CAT-RTL-03',
    name: 'Elektronik & Perangkat',
    itemCount: 2,
    description: 'Kabel data fast charge, lampu LED hemat energi, & perlengkapan listrik.'
  },
  {
    id: 'mcat-01',
    code: 'MCAT-MAIN',
    name: 'Resto & Kuliner Saji',
    itemCount: 2,
    description: 'Nasi goreng wagyu, sate ribeye, & masakan saji kuliner.'
  }
];

export const MOCK_POS_MENU: PosMenuItem[] = [
  {
    id: 'pos-rtl-01',
    code: 'SKU-RTL-001',
    name: 'Beras Premium Ramos Super (5 Kg)',
    categoryId: 'mcat-retail-01',
    category: 'Sembako & Pangan Retail',
    price: 78000,
    cogsHpp: 64000,
    stockQty: 85,
    unitUom: 'Pouch',
    isAvailable: true
  },
  {
    id: 'pos-rtl-02',
    code: 'SKU-RTL-002',
    name: 'Minyak Goreng Sawit Bimoli Refill (2 Liter)',
    categoryId: 'mcat-retail-01',
    category: 'Sembako & Pangan Retail',
    price: 36500,
    cogsHpp: 31000,
    stockQty: 120,
    unitUom: 'Pouch',
    isAvailable: true
  },
  {
    id: 'pos-rtl-03',
    code: 'SKU-RTL-003',
    name: 'Gula Pasir Industri Gulaku Premium (1 Kg)',
    categoryId: 'mcat-retail-01',
    category: 'Sembako & Pangan Retail',
    price: 17500,
    cogsHpp: 14200,
    stockQty: 240,
    unitUom: 'Bungkus',
    isAvailable: true
  },
  {
    id: 'pos-rtl-04',
    code: 'SKU-RTL-004',
    name: 'Air Mineral Coca-Cola / Aqua Botol (600ml)',
    categoryId: 'mcat-retail-02',
    category: 'Snack, Biscuit & Minuman',
    price: 5000,
    cogsHpp: 3200,
    stockQty: 350,
    unitUom: 'Botol',
    isAvailable: true
  },
  {
    id: 'pos-rtl-05',
    code: 'SKU-RTL-005',
    name: 'Biskuit Khong Guan Assorted Kaleng (1600g)',
    categoryId: 'mcat-retail-02',
    category: 'Snack, Biscuit & Minuman',
    price: 112000,
    cogsHpp: 95000,
    stockQty: 45,
    unitUom: 'Kaleng',
    isAvailable: true
  },
  {
    id: 'pos-rtl-06',
    code: 'SKU-RTL-006',
    name: 'Lampu LED Philips MyCare 12W White',
    categoryId: 'mcat-retail-03',
    category: 'Elektronik & Perangkat',
    price: 49500,
    cogsHpp: 38000,
    stockQty: 60,
    unitUom: 'Unit',
    isAvailable: true
  },
  {
    id: 'pos-01',
    code: 'MENU-FNB-01',
    name: 'Nasi Goreng Wagyu Spesial Nusantara',
    categoryId: 'mcat-01',
    category: 'Resto & Kuliner Saji',
    price: 65000,
    cogsHpp: 22000,
    stockQty: 30,
    unitUom: 'Porsi',
    isAvailable: true
  },
  {
    id: 'pos-02',
    code: 'MENU-FNB-02',
    name: 'Sate Sapi Ribeye Bumbu Kacang (10 Tusuk)',
    categoryId: 'mcat-01',
    category: 'Resto & Kuliner Saji',
    price: 95000,
    cogsHpp: 34000,
    stockQty: 25,
    unitUom: 'Porsi',
    isAvailable: true
  }
];
