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
    clientName: 'Pernikahan Megah Royal Hall',
    eventName: 'Wedding Reception Prasmanan 1.000 Tamu',
    contractStartDate: '2026-08-10',
    contractEndDate: '2026-08-10',
    portionCountPerDay: 1000,
    pricePerPortion: 120000,
    totalContractValue: 120000000,
    status: 'PENDING'
  }
];

export const MOCK_DELIVERY_SCHEDULES: DeliveryScheduleItem[] = [
  {
    id: 'del-01',
    dispatchCode: 'DSP-202607-001',
    destinationLocation: 'Mess Karyawan Pit Block 4 Kutai',
    portionQuantity: 750,
    deliveryTime: '06:00 (Breakfast)',
    driverName: 'Sulaeman Delivery',
    vehiclePlate: 'B 9981 CTR',
    status: 'DELIVERED'
  },
  {
    id: 'del-02',
    dispatchCode: 'DSP-202607-002',
    destinationLocation: 'Mess Karyawan Pit Block 4 Kutai',
    portionQuantity: 750,
    deliveryTime: '12:00 (Lunch)',
    driverName: 'Rahmat Fleet Ops',
    vehiclePlate: 'B 9982 CTR',
    status: 'IN_TRANSIT'
  }
];
