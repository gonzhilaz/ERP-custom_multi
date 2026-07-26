export interface BomRecipeItem {
  id: string;
  bomCode: string;
  finishedGoodName: string;
  unit: string;
  rawMaterials: { itemName: string; qty: number; unit: string }[];
  status: 'ACTIVE' | 'DRAFT';
}

export interface HotelRoomFolio {
  id: string;
  roomNumber: string;
  guestName: string;
  roomType: 'DELUXE' | 'SUITE' | 'EXECUTIVE';
  checkInDate: string;
  checkOutDate: string;
  status: 'OCCUPIED' | 'VACANT_CLEAN' | 'DIRTY';
  folioTotalAmount: number;
}

export interface MiningHaulingLog {
  id: string;
  haulingCode: string;
  truckNumber: string;
  driverName: string;
  pitLocation: string;
  tonnageTons: number;
  fuelConsumedLiters: number;
  shift: 'DAY' | 'NIGHT';
  timestamp: string;
}

export interface MailItem {
  id: string;
  mailNumber: string;
  mailType: 'SURAT_MASUK' | 'SURAT_KELUAR';
  subject: string;
  sender: string;
  recipient: string;
  dispositionNotes?: string;
  status: 'RECEIVED' | 'DISPOSED' | 'ARCHIVED';
  receivedDate: string;
}

export interface BudgetAllocationItem {
  id: string;
  budgetCode: string;
  departmentName: string;
  unitUsaha: string;
  allocatedAmount: number;
  actualSpent: number;
  varianceAmount: number;
  status: 'ON_TRACK' | 'WARNING_OVER';
}

export const MOCK_BOM_RECIPES: BomRecipeItem[] = [
  {
    id: 'bom-01',
    bomCode: 'BOM-RESTO-001',
    finishedGoodName: 'Paket Catering Nasi Kuning Royal (100 Porsi)',
    unit: 'Batch',
    rawMaterials: [
      { itemName: 'Beras Beras Cianjur Premium', qty: 15, unit: 'Kg' },
      { itemName: 'Daging Ayam Fillet', qty: 12, unit: 'Kg' },
      { itemName: 'Minyak Goreng SunCo', qty: 5, unit: 'Liter' }
    ],
    status: 'ACTIVE'
  }
];

export const MOCK_HOTEL_FOLIOS: HotelRoomFolio[] = [
  {
    id: 'rm-101',
    roomNumber: '101',
    guestName: 'Bapak Irfan Ariessaputra',
    roomType: 'EXECUTIVE',
    checkInDate: '2026-07-24',
    checkOutDate: '2026-07-27',
    status: 'OCCUPIED',
    folioTotalAmount: 3850000
  },
  {
    id: 'rm-102',
    roomNumber: '102',
    guestName: '-',
    roomType: 'DELUXE',
    checkInDate: '-',
    checkOutDate: '-',
    status: 'VACANT_CLEAN',
    folioTotalAmount: 0
  }
];

export const MOCK_MINING_HAULING: MiningHaulingLog[] = [
  {
    id: 'hl-01',
    haulingCode: 'HL-2026-081',
    truckNumber: 'DT-MINE-09 (Hino 500)',
    driverName: 'Budi Santoso',
    pitLocation: 'Pit East Gold-01',
    tonnageTons: 42.5,
    fuelConsumedLiters: 85,
    shift: 'DAY',
    timestamp: '2026-07-25 10:30'
  }
];

export const MOCK_MAILS: MailItem[] = [
  {
    id: 'ml-01',
    mailNumber: 'SURAT-DIR-2026-088',
    mailType: 'SURAT_MASUK',
    subject: 'Undangan Rapat Koordinasi Kementerian ESDM & Minerba',
    sender: 'Kementerian ESDM RI',
    recipient: 'Direksi PT Antigravity Enterprise',
    dispositionNotes: 'Harap ditindaklanjuti oleh Tim Legal & Operations Site',
    status: 'DISPOSED',
    receivedDate: '2026-07-24'
  }
];

export const MOCK_BUDGETS_ALLOCATION: BudgetAllocationItem[] = [
  {
    id: 'bgt-01',
    budgetCode: 'BGT-2026-MINING-OPS',
    departmentName: 'Operasional Site Tambang',
    unitUsaha: 'PT Borneo Mining Emas',
    allocatedAmount: 5000000000,
    actualSpent: 4200000000,
    varianceAmount: 800000000,
    status: 'ON_TRACK'
  },
  {
    id: 'bgt-02',
    budgetCode: 'BGT-2026-RESTO-MKT',
    departmentName: 'Pemasaran & Promosi Resto',
    unitUsaha: 'Nusantara Culinary & Catering',
    allocatedAmount: 150000000,
    actualSpent: 165000000,
    varianceAmount: -15000000,
    status: 'WARNING_OVER'
  }
];
