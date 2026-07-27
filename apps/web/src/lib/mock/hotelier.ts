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
  { id: 'rt-01', code: 'STD-TWN', name: 'Standard Twin Room', basePricePerNight: 550000, defaultRatePerNight: 550000, maxOccupancy: 2, roomCount: 40, description: 'Kamar nyaman dengan 2 Single Bed, AC, Smart TV 43 Inch, & Work Desk' },
  { id: 'rt-02', code: 'DLX-KNG', name: 'Deluxe King Suite', basePricePerNight: 850000, defaultRatePerNight: 850000, maxOccupancy: 2, roomCount: 50, description: 'Kamar mewah kasur King Size dengan Balkon Pemandangan City' },
  { id: 'rt-03', code: 'EXEC-STE', name: 'Executive Suite', basePricePerNight: 1400000, defaultRatePerNight: 1400000, maxOccupancy: 4, roomCount: 20, description: 'Kamar eksekutif dengan Jacuzzi Bathtub, Living Room, & Espresso Bar' },
  { id: 'rt-04', code: 'PRES-STE', name: 'Presidential Royal Suite', basePricePerNight: 3500000, defaultRatePerNight: 3500000, maxOccupancy: 6, roomCount: 10, description: 'Suite VVIP dengan 2 Kamar Tidur, Dapur Pribadi, Ruang Rapat, & Personal Butler' }
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
    amenities: ['King Bed 180x200', 'Smart TV 55 Inch', 'High-Speed Wi-Fi', 'Coffee Machine', 'City View Balcony']
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
    ratePerNight: 1400000,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop',
    amenities: ['Executive Work Desk', 'Jacuzzi Bathtub', 'Living Room Area', 'Smart TV 65 Inch', 'Espresso Bar']
  },
  {
    id: 'rm-202',
    roomNumber: '202',
    type: 'Executive Suite',
    typeName: 'Executive Suite',
    floor: 2,
    status: 'OCCUPIED',
    ratePerNight: 1400000,
    guestName: 'Ibu Dian Sastro (PT Petrokimia)',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop',
    amenities: ['Executive Work Desk', 'Jacuzzi Bathtub', 'Living Room Area', 'Smart TV 65 Inch']
  },
  {
    id: 'rm-301',
    roomNumber: '301',
    type: 'Standard Twin Room',
    typeName: 'Standard Twin Room',
    floor: 3,
    status: 'OCCUPIED',
    ratePerNight: 550000,
    guestName: 'Bpk. Irfan Pratama',
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop',
    amenities: ['Twin Beds 120x200', 'Wi-Fi 100Mbps', 'Air Conditioner', 'Hot Shower']
  },
  {
    id: 'rm-401',
    roomNumber: '401',
    type: 'Presidential Royal Suite',
    typeName: 'Presidential Royal Suite',
    floor: 4,
    status: 'OCCUPIED',
    ratePerNight: 3500000,
    guestName: 'Delegasi Direksi Holding HQ',
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop',
    amenities: ['Private Butler', 'Private Dining Room', 'Meeting Lounge', 'Jacuzzi & Sauna', 'Skyline View']
  }
];

export const MOCK_GUEST_FOLIOS: GuestFolioItem[] = [
  {
    id: 'fol-01',
    folioNumber: 'FOL-202607-0012',
    guestName: 'Bpk. Hendra Wijaya',
    roomNumber: '101 (Deluxe King)',
    checkInDate: '2026-07-23',
    checkOutDate: '2026-07-27',
    roomChargeTotal: 3400000,
    roomServiceTotal: 450000,
    laundryTotal: 120000,
    depositAmount: 1000000,
    totalBill: 3970000,
    status: 'OPEN_ACTIVE'
  },
  {
    id: 'fol-02',
    folioNumber: 'FOL-202607-0013',
    guestName: 'Ibu Dian Sastro (PT Petrokimia)',
    roomNumber: '202 (Executive Suite)',
    checkInDate: '2026-07-24',
    checkOutDate: '2026-07-28',
    roomChargeTotal: 5600000,
    roomServiceTotal: 890000,
    laundryTotal: 250000,
    depositAmount: 2000000,
    totalBill: 6740000,
    status: 'OPEN_ACTIVE'
  }
];

export const MOCK_NIGHT_AUDIT_LOGS: NightAuditLogItem[] = [
  {
    id: 'na-01',
    auditCode: 'NA-2026-07-26',
    auditDate: '2026-07-26',
    executedBy: 'System Auto-Audit (Night Manager)',
    totalOccupiedRooms: 101,
    totalRoomRevenue: 85850000,
    totalFnBRevenue: 18450000,
    systemStatus: 'SUCCESS_COMPLETED'
  }
];
