export interface VendorCategory {
  id: string;
  code: string;
  name: string;
  defaultTopDays: number;
  vendorCount: number;
  description: string;
}

export interface VendorItem {
  id: string;
  code: string;
  name: string;
  categoryId: string;
  category: string;
  rating: number; // 1 - 5 stars
  contactPerson: string;
  phone: string;
  payableBalance: number;
  status: 'ACTIVE' | 'INACTIVE';
  topDays: number;
  apCoaAccount: string; // Linkage to HO COA Accounts Payable
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorName: string;
  unitUsaha: string;
  date: string;
  totalAmount: number;
  status: 'DRAFT' | 'WAITING_APPROVAL_MANAGER' | 'WAITING_APPROVAL_DIREKTUR' | 'APPROVED' | 'REJECTED';
  requiresExecutiveApproval: boolean; // True if > 50 Juta
}

export const MOCK_VENDOR_CATEGORIES: VendorCategory[] = [
  {
    id: 'vnd-cat-01',
    code: 'VND-CAT-FOOD',
    name: 'Food & Raw Ingredient Supplier',
    defaultTopDays: 30,
    vendorCount: 1,
    description: 'Supplier bahan makanan mentah, mentega, tepung terigu, daging impor.'
  },
  {
    id: 'vnd-cat-02',
    code: 'VND-CAT-HEAVY',
    name: 'Heavy Equipment & Mining Spareparts',
    defaultTopDays: 60,
    vendorCount: 1,
    description: 'Supplier suku cadang alat berat, filter oli CAT, ban dump truck.'
  },
  {
    id: 'vnd-cat-03',
    code: 'VND-CAT-AMENITIES',
    name: 'Hotel Amenities & Linen Manufacturer',
    defaultTopDays: 14,
    vendorCount: 0,
    description: 'Produsen sprei linen hotel, peralatan kamar mandi, sabun/shampoo.'
  }
];

export const MOCK_VENDORS: VendorItem[] = [
  {
    id: 'v-001',
    code: 'VND-MEAT-01',
    name: 'PT Meat Prima Importindo',
    categoryId: 'vnd-cat-01',
    category: 'Food & Raw Ingredient Supplier',
    rating: 4.8,
    contactPerson: 'Hendra Setiawan',
    phone: '0812-9988-7766',
    payableBalance: 45000000,
    status: 'ACTIVE',
    topDays: 30,
    apCoaAccount: '2-10100 - Utang Dagang Vendor Utama'
  },
  {
    id: 'v-002',
    code: 'VND-HEAVY-09',
    name: 'PT Traktor Nusantara Spareparts',
    categoryId: 'vnd-cat-02',
    category: 'Heavy Equipment & Mining Spareparts',
    rating: 4.9,
    contactPerson: 'Bambang Utomo',
    phone: '0811-2233-4455',
    payableBalance: 165000000,
    status: 'ACTIVE',
    topDays: 60,
    apCoaAccount: '2-10100 - Utang Dagang Vendor Utama'
  }
];

export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'po-101',
    poNumber: 'PO/2026/07/0088',
    vendorName: 'PT Traktor Nusantara Spareparts',
    unitUsaha: 'PT Borneo Mining Emas',
    date: '2026-07-22',
    totalAmount: 185000000,
    status: 'WAITING_APPROVAL_DIREKTUR',
    requiresExecutiveApproval: true
  },
  {
    id: 'po-102',
    poNumber: 'PO/2026/07/0089',
    vendorName: 'PT Meat Prima Importindo',
    unitUsaha: 'Nusantara Culinary & Catering',
    date: '2026-07-23',
    totalAmount: 32000000,
    status: 'APPROVED',
    requiresExecutiveApproval: false
  }
];
