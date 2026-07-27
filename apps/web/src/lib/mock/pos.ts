export interface PosMenuItem {
  id: string;
  code: string;
  name: string;
  category: 'FOOD' | 'BEVERAGE' | 'DESSERT' | 'BAKERY' | 'PACKAGED_GOODS' | string;
  categoryId?: string;
  price: number;
  costPrice?: number;
  cogsHpp: number;
  stock?: number;
  stockQty?: number;
  unitUom?: string;
  imageUrl?: string;
  isAvailable: boolean;
}

export interface MenuCategoryItem {
  id: string;
  code: string;
  name: string;
  itemCount: number;
  description: string;
}

export interface PosOrderItem {
  id: string;
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  item: PosMenuItem;
}

export interface PosOrderTransaction {
  id: string;
  orderNumber: string;
  orderType: 'DINE_IN' | 'TAKE_AWAY' | 'DELIVERY' | 'ROOM_CHARGE';
  tableNumber?: string;
  roomNumber?: string;
  totalItems: number;
  subtotal: number;
  taxAmount: number; // PB1 10%
  grandTotal: number;
  paymentMethod: 'CASH' | 'EDC_MANDIRI' | 'QRIS' | 'ROOM_CHARGE';
  cashierName: string;
  timestamp: string;
  status: 'COMPLETED' | 'CANCELLED';
}

export const MOCK_POS_MENU_ITEMS: PosMenuItem[] = [
  {
    id: 'menu-01',
    code: 'FB-NG-WGY',
    name: 'Nasi Goreng Wagyu Top Grade',
    category: 'FOOD',
    price: 65000,
    costPrice: 28000,
    cogsHpp: 28000,
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop',
    isAvailable: true
  },
  {
    id: 'menu-02',
    code: 'FB-SAPI-LADA',
    name: 'Daging Sapi Lada Hitam Rice Bowl',
    category: 'FOOD',
    price: 55000,
    costPrice: 24000,
    cogsHpp: 24000,
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    isAvailable: true
  },
  {
    id: 'menu-03',
    code: 'FB-ES-ESPRESSO',
    name: 'Single Origin Iced Espresso Latte',
    category: 'BEVERAGE',
    price: 32000,
    costPrice: 9500,
    cogsHpp: 9500,
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop',
    isAvailable: true
  },
  {
    id: 'menu-04',
    code: 'BK-ROTI-TAWAR',
    name: 'Roti Tawar Gandum Premium Bakery',
    category: 'BAKERY',
    price: 25000,
    costPrice: 11000,
    cogsHpp: 11000,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
    isAvailable: true
  },
  {
    id: 'menu-05',
    code: 'BK-CROISSANT',
    name: 'French Butter Croissant Fresh Baked',
    category: 'BAKERY',
    price: 22000,
    costPrice: 8500,
    cogsHpp: 8500,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop',
    isAvailable: true
  }
];

export const MOCK_POS_MENU = MOCK_POS_MENU_ITEMS;

export const MOCK_MENU_CATEGORIES: MenuCategoryItem[] = [
  { id: 'mc-01', code: 'FOOD', name: 'Makanan Utama Restoran', itemCount: 24, description: 'Nasi goreng, sapi lada hitam, & olahan dapur utama' },
  { id: 'mc-02', code: 'BEVERAGE', name: 'Minuman Espresso & Cold Drinks', itemCount: 18, description: 'Single origin espresso, latte, & es cendol durian' },
  { id: 'mc-03', code: 'BAKERY', name: 'Roti & Pastry Fresh Baked', itemCount: 15, description: 'Croissant, roti gandum, & pastry mentega' }
];

export const MOCK_POS_TRANSACTIONS: PosOrderTransaction[] = [
  {
    id: 'pos-01',
    orderNumber: 'POS-202607-0098',
    orderType: 'DINE_IN',
    tableNumber: 'Meja 04',
    totalItems: 3,
    subtotal: 152000,
    taxAmount: 15200, // PB1 10%
    grandTotal: 167200,
    paymentMethod: 'QRIS',
    cashierName: 'Siti Resto Cashier',
    timestamp: '2026-07-26 12:45',
    status: 'COMPLETED'
  },
  {
    id: 'pos-02',
    orderNumber: 'POS-202607-0099',
    orderType: 'ROOM_CHARGE',
    roomNumber: 'Kamar 101 (Deluxe Suite)',
    totalItems: 2,
    subtotal: 120000,
    taxAmount: 12000,
    grandTotal: 132000,
    paymentMethod: 'ROOM_CHARGE',
    cashierName: 'Siti Resto Cashier',
    timestamp: '2026-07-26 13:10',
    status: 'COMPLETED'
  }
];
