export interface HotelRoom {
  id: string;
  roomNumber: string;
  type: string;
  typeName: string;
  floor: number;
  status: 'VACANT_CLEAN' | 'OCCUPIED' | 'VACANT_DIRTY' | 'MAINTENANCE';
  ratePerNight: number;
  guestName?: string;
  imageUrl?: string;
  amenities?: string[];
}

export interface RoomTypeCategory {
  id: string;
  code: string;
  name: string;
  basePricePerNight?: number;
  defaultRatePerNight: number;
  maxOccupancy: number;
  roomCount: number;
  description: string;
}

export interface GuestFolioItem {
  id: string;
  folioNumber: string;
  guestName: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  roomChargeTotal: number;
  roomServiceTotal: number;
  laundryTotal: number;
  depositAmount: number;
  totalBill: number;
  status: 'OPEN_ACTIVE' | 'CLOSED_CHECKED_OUT';
}

export interface NightAuditLogItem {
  id: string;
  auditCode: string;
  auditDate: string;
  executedBy: string;
  totalOccupiedRooms: number;
  totalRoomRevenue: number;
  totalFnBRevenue: number;
  systemStatus: 'SUCCESS_COMPLETED';
}

export const MOCK_ROOM_TYPES: RoomTypeCategory[] = [
  { id: 'rt-01', code: 'DLX-KNG', name: 'Deluxe King Suite', basePricePerNight: 850000, defaultRatePerNight: 850000, maxOccupancy: 2, roomCount: 12, description: 'Kamar mewah kasur King Size dengan Balkon Pemandangan City' },
  { id: 'rt-02', code: 'EXEC-STE', name: 'Executive Suite', basePricePerNight: 1200000, defaultRatePerNight: 1200000, maxOccupancy: 4, roomCount: 6, description: 'Kamar eksekutif dengan bathtub & ruang tamu terpisah' }
];

export const MOCK_HOTEL_ROOMS: HotelRoom[] = [
  {
    id: 'rm-101',
    roomNumber: '101',
    type: 'Deluxe King Suite',
    typeName: 'Deluxe King Suite',
    floor: 1,
    status: 'OCCUPIED',
    ratePerNight: 850000,
    guestName: 'Bpk. Hendra Wijaya',
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop',
    amenities: ['King Bed 180x200', 'Smart TV 55 Inch', 'High-Speed Wi-Fi', 'Coffee Machine', 'City View Balcony', 'Mini Bar']
  },
  {
    id: 'rm-102',
    roomNumber: '102',
    type: 'Deluxe King Suite',
    typeName: 'Deluxe King Suite',
    floor: 1,
    status: 'VACANT_CLEAN',
    ratePerNight: 850000,
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
    amenities: ['King Bed 180x200', 'Smart TV 55 Inch', 'High-Speed Wi-Fi', 'Coffee Machine', 'Garden View']
  },
  {
    id: 'rm-201',
    roomNumber: '201',
    type: 'Executive Suite',
    typeName: 'Executive Suite',
    floor: 2,
    status: 'VACANT_DIRTY',
    ratePerNight: 1200000,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
    amenities: ['Executive Work Desk', 'Jacuzzi Bathtub', 'Living Room Area', 'Smart TV 65 Inch', 'Premium Espresso Bar']
  }
];

export const MOCK_GUEST_FOLIOS: GuestFolioItem[] = [
  {
    id: 'fol-01',
    folioNumber: 'FOL-202607-0012',
    guestName: 'Bpk. Hendra Wijaya',
    roomNumber: 'KMR-101 (Deluxe Suite)',
    checkInDate: '2026-07-23',
    checkOutDate: '2026-07-26',
    roomChargeTotal: 2500000,
    roomServiceTotal: 450000,
    laundryTotal: 120000,
    depositAmount: 1000000,
    totalBill: 3070000,
    status: 'OPEN_ACTIVE'
  },
  {
    id: 'fol-02',
    folioNumber: 'FOL-202607-0014',
    guestName: 'Mrs. Sarah Jenkins',
    roomNumber: 'KMR-204 (Executive Suite)',
    checkInDate: '2026-07-24',
    checkOutDate: '2026-07-27',
    roomChargeTotal: 3600000,
    roomServiceTotal: 890000,
    laundryTotal: 250000,
    depositAmount: 1500000,
    totalBill: 4740000,
    status: 'OPEN_ACTIVE'
  }
];

export const MOCK_NIGHT_AUDIT_LOGS: NightAuditLogItem[] = [
  {
    id: 'na-01',
    auditCode: 'NA-202607-23',
    auditDate: '2026-07-23 23:59',
    executedBy: 'System Auto Night Audit',
    totalOccupiedRooms: 41,
    totalRoomRevenue: 48500000,
    totalFnBRevenue: 12400000,
    systemStatus: 'SUCCESS_COMPLETED'
  }
];
