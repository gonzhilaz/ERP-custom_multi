export interface CateringContract {
  id: string;
  contractCode: string;
  clientName: string;
  eventName: string;
  contractStartDate: string;
  contractEndDate: string;
  portionCountPerDay: number;
  pricePerPortion: number;
  totalContractValue: number;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED';
}

export interface DeliveryScheduleItem {
  id: string;
  dispatchCode: string;
  destinationLocation: string;
  portionQuantity: number;
  deliveryTime: string;
  driverName: string;
  vehiclePlate: string;
  status: 'PREPARING' | 'IN_TRANSIT' | 'DELIVERED';
}

export interface RecipeBomItem {
  id: string;
  recipeCode: string;
  recipeName: string;
  category: 'MAIN_COURSE' | 'APPETIZER' | 'DESSERT' | 'BEVERAGE';
  portionYield: number;
  rawMaterialCost: number; // HPP per portion
  sellingPrice: number;
  grossMarginPct: number;
  ingredientsCount: number;
}

export const MOCK_CATERING_CONTRACTS: CateringContract[] = [
  {
    id: 'cat-01',
    contractCode: 'CTR-2026-001',
    clientName: 'PT Freeport Indonesia Site Timika',
    eventName: 'Katering Massal Mess Karyawan Shift Pagi/Malam',
    contractStartDate: '2026-01-01',
    contractEndDate: '2026-12-31',
    portionCountPerDay: 1500,
    pricePerPortion: 45000,
    totalContractValue: 24300000000,
    status: 'ACTIVE'
  },
  {
    id: 'cat-02',
    contractCode: 'CTR-2026-002',
    clientName: 'Pernikahan Megah Royal Ballroom',
    eventName: 'Wedding Reception Prasmanan 1.000 Tamu VIP',
    contractStartDate: '2026-08-10',
    contractEndDate: '2026-08-10',
    portionCountPerDay: 1000,
    pricePerPortion: 120000,
    totalContractValue: 120000000,
    status: 'PENDING'
  },
  {
    id: 'cat-03',
    contractCode: 'CTR-2026-003',
    clientName: 'PT Kaltim Prima Coal Mess Hall',
    eventName: 'Suplai Makanan Nutrisi Karyawan Tambang 2,500 Pax',
    contractStartDate: '2026-03-01',
    contractEndDate: '2027-02-28',
    portionCountPerDay: 2500,
    pricePerPortion: 38000,
    totalContractValue: 34675000000,
    status: 'ACTIVE'
  }
];

export const MOCK_DELIVERY_SCHEDULES: DeliveryScheduleItem[] = [
  {
    id: 'del-01',
    dispatchCode: 'DSP-202607-001',
    destinationLocation: 'Mess Karyawan Pit Block 4 Kutai',
    portionQuantity: 750,
    deliveryTime: '06:00 (Breakfast Shift 1)',
    driverName: 'Sulaeman Delivery',
    vehiclePlate: 'B 9981 CTR',
    status: 'DELIVERED'
  },
  {
    id: 'del-02',
    dispatchCode: 'DSP-202607-002',
    destinationLocation: 'Mess Karyawan Pit Block 4 Kutai',
    portionQuantity: 750,
    deliveryTime: '12:00 (Lunch Shift 1)',
    driverName: 'Rahmat Fleet Ops',
    vehiclePlate: 'B 9982 CTR',
    status: 'IN_TRANSIT'
  },
  {
    id: 'del-03',
    dispatchCode: 'DSP-202607-003',
    destinationLocation: 'Mess Karyawan Pit West Berau',
    portionQuantity: 1250,
    deliveryTime: '18:00 (Dinner Shift 2)',
    driverName: 'Budi Logistics',
    vehiclePlate: 'B 9983 CTR',
    status: 'PREPARING'
  }
];

export const MOCK_RECIPE_BOM: RecipeBomItem[] = [
  {
    id: 'rcp-01',
    recipeCode: 'RCP-SAPI-LADA',
    recipeName: 'Daging Sapi Lada Hitam (Nutrisi High Protein)',
    category: 'MAIN_COURSE',
    portionYield: 100,
    rawMaterialCost: 18500,
    sellingPrice: 35000,
    grossMarginPct: 47.1,
    ingredientsCount: 8
  },
  {
    id: 'rcp-02',
    recipeCode: 'RCP-AYAM-BETUTU',
    recipeName: 'Ayam Betutu Bali Khas Catering',
    category: 'MAIN_COURSE',
    portionYield: 100,
    rawMaterialCost: 14200,
    sellingPrice: 28000,
    grossMarginPct: 49.2,
    ingredientsCount: 12
  }
];
