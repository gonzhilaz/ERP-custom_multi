export interface DiningTable {
  id: string;
  tableNumber: string;
  sectionZone: 'MAIN_HALL' | 'VIP_ROOM' | 'OUTDOOR_TERRACE';
  capacitySeats: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'BILL_PRINTED';
  currentGuestCount?: number;
  activeOrderCode?: string;
  activeSubtotal?: number;
  occupiedSince?: string;
}

export const MOCK_DINING_TABLES: DiningTable[] = [
  { id: 'tbl-01', tableNumber: 'MEJA-01', sectionZone: 'MAIN_HALL', capacitySeats: 4, status: 'OCCUPIED', currentGuestCount: 3, activeOrderCode: 'TRX-POS-9981', activeSubtotal: 225000, occupiedSince: '18:15' },
  { id: 'tbl-02', tableNumber: 'MEJA-02', sectionZone: 'MAIN_HALL', capacitySeats: 4, status: 'AVAILABLE' },
  { id: 'tbl-03', tableNumber: 'MEJA-03', sectionZone: 'MAIN_HALL', capacitySeats: 2, status: 'BILL_PRINTED', currentGuestCount: 2, activeOrderCode: 'TRX-POS-9985', activeSubtotal: 160000, occupiedSince: '18:40' },
  { id: 'tbl-04', tableNumber: 'MEJA-04', sectionZone: 'MAIN_HALL', capacitySeats: 6, status: 'RESERVED', occupiedSince: '19:30 (Reserved)' },
  { id: 'tbl-05', tableNumber: 'VIP-ROOM-A', sectionZone: 'VIP_ROOM', capacitySeats: 10, status: 'OCCUPIED', currentGuestCount: 8, activeOrderCode: 'TRX-POS-9990', activeSubtotal: 850000, occupiedSince: '17:50' },
  { id: 'tbl-06', tableNumber: 'TERRACE-01', sectionZone: 'OUTDOOR_TERRACE', capacitySeats: 4, status: 'AVAILABLE' }
];
