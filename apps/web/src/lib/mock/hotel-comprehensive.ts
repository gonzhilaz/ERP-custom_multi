export interface GuestInHouseItem {
  id: string;
  roomNumber: string;
  guestName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  breakfastEligiblePax: number;
  folioTotalAmount: number;
  vipStatus: boolean;
}

export interface BanquetEventOrder {
  id: string;
  beoCode: string;
  eventName: string;
  clientCompany: string;
  eventDate: string;
  paxCount: number;
  venueHall: string;
  menuPackage: string;
  specialRequests: string;
  status: 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface HousekeepingTask {
  id: string;
  roomNumber: string;
  attendantName: string;
  taskType: 'ROOM_CLEANING' | 'PUBLIC_AREA' | 'GARDEN_MAINTENANCE';
  roomStatus: 'CLEAN' | 'DIRTY' | 'INSPECTED' | 'OUT_OF_ORDER';
  timestamp: string;
}

export interface EngineeringWorkOrder {
  id: string;
  woCode: string;
  category: 'MECHANICAL' | 'ELECTRICAL' | 'PLUMBING' | 'CIVIL_BUILDING';
  location: string;
  description: string;
  technicianName: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface SecurityPatrolItem {
  id: string;
  patrolPoint: string;
  guardName: string;
  timestamp: string;
  conditionStatus: 'SAFE' | 'INCIDENT_REPORTED';
  notes: string;
}

export const MOCK_GUEST_IN_HOUSE: GuestInHouseItem[] = [
  {
    id: 'g-101',
    roomNumber: '101',
    guestName: 'Bapak Irfan Ariessaputra',
    roomType: 'EXECUTIVE SUITE',
    checkInDate: '2026-07-24',
    checkOutDate: '2026-07-27',
    breakfastEligiblePax: 2,
    folioTotalAmount: 3850000,
    vipStatus: true
  },
  {
    id: 'g-204',
    roomNumber: '204',
    guestName: 'Ibu Maria Ulfa',
    roomType: 'DELUXE ROOM',
    checkInDate: '2026-07-25',
    checkOutDate: '2026-07-26',
    breakfastEligiblePax: 1,
    folioTotalAmount: 1250000,
    vipStatus: false
  }
];

export const MOCK_BEO_EVENTS: BanquetEventOrder[] = [
  {
    id: 'beo-01',
    beoCode: 'BEO-2026-07-009',
    eventName: 'Pernikahan Agung Royal Wedding',
    clientCompany: 'Keluarga Budi Santoso',
    eventDate: '2026-08-01',
    paxCount: 500,
    venueHall: 'Grand Ballroom Level 2',
    menuPackage: 'Buffet International Royal + Live Cooking Stall',
    specialRequests: 'Karpet Merah VIP & Sound System Stage 10.000 Watt',
    status: 'CONFIRMED'
  }
];

export const MOCK_HOUSEKEEPING_TASKS: HousekeepingTask[] = [
  {
    id: 'hk-01',
    roomNumber: '102',
    attendantName: 'Agus (Room Attendant)',
    taskType: 'ROOM_CLEANING',
    roomStatus: 'DIRTY',
    timestamp: '2026-07-25 11:00'
  },
  {
    id: 'hk-02',
    roomNumber: 'Lobby & Corridor',
    attendantName: 'Budi (Public Area / OB)',
    taskType: 'PUBLIC_AREA',
    roomStatus: 'CLEAN',
    timestamp: '2026-07-25 08:00'
  }
];

export const MOCK_ENGINEERING_WO: EngineeringWorkOrder[] = [
  {
    id: 'wo-eng-01',
    woCode: 'WO-ENG-2026-044',
    category: 'MECHANICAL',
    location: 'Kamar #204 - AC Central',
    description: 'AC kurang dingin / freon habis',
    technicianName: 'Ir. Hendra (Teknisi M&E)',
    status: 'IN_PROGRESS',
    priority: 'HIGH'
  }
];

export const MOCK_SECURITY_PATROLS: SecurityPatrolItem[] = [
  {
    id: 'sec-01',
    patrolPoint: 'Pos Utama & Parkir Basement',
    guardName: 'Sertu Joko (Security)',
    timestamp: '2026-07-25 12:00',
    conditionStatus: 'SAFE',
    notes: 'Kondisi aman terkendali, 42 mobil terparkir'
  }
];
