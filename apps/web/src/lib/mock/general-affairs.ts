export interface AtkRequisitionItem {
  id: string;
  reqCode: string;
  departmentName: string;
  itemCategory: string;
  itemName: string;
  requestedQty: number;
  unit: string;
  status: 'PENDING' | 'APPROVED' | 'DISBURSED';
  requestDate: string;
}

export interface CarPoolBooking {
  id: string;
  bookingCode: string;
  vehiclePlateNumber: string;
  vehicleModel: string;
  driverName: string;
  destination: string;
  purpose: 'AIRPORT_SHUTTLE' | 'PURCHASING_PICKUP' | 'LAUNDRY_TRANSFER' | 'EXECUTIVE_TRAVEL';
  fuelVoucherAmount: number;
  tollCardAmount: number;
  status: 'BOOKED' | 'IN_TRANSIT' | 'COMPLETED';
}

export interface FacilityAparStatus {
  id: string;
  unitCode: string;
  location: string;
  equipmentType: 'APAR_FIRE_EXTINGUISHER' | 'FIRST_AID_BOX' | 'AC_CENTRAL';
  lastServiceDate: string;
  nextExpiryDate: string;
  conditionStatus: 'GOOD' | 'EXPIRED_WARNING' | 'NEEDS_REFILL';
}

export interface DailyWorkerItem {
  id: string;
  workerName: string;
  assignedEvent: string;
  role: 'BANQUET_SERVER' | 'KITCHEN_HELPER' | 'CLEANING_CASUAL';
  dailyRate: number;
  shiftHours: number;
  totalDailyPay: number;
  paymentStatus: 'PAID' | 'UNPAID';
}

export interface CampBossMealLog {
  id: string;
  employeeNik: string;
  employeeName: string;
  departmentOrCompany: string;
  mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'NIGHT_SHIFT_MEAL';
  canteenLocation: string; // e.g. "Mess Hall Site East #01"
  timestamp: string;
}

export const MOCK_ATK_REQUISITIONS: AtkRequisitionItem[] = [
  {
    id: 'atk-01',
    reqCode: 'ATK-2026-07-012',
    departmentName: 'Front Office & Housekeeping',
    itemCategory: 'Kertas & Alat Tulis',
    itemName: 'Kertas HVS A4 80gr PaperOne (5 Rim)',
    requestedQty: 5,
    unit: 'Rim',
    status: 'APPROVED',
    requestDate: '2026-07-24'
  }
];

export const MOCK_CAR_POOL_BOOKINGS: CarPoolBooking[] = [
  {
    id: 'car-01',
    bookingCode: 'POOL-2026-088',
    vehiclePlateNumber: 'B 1988 EDB (Toyota HiAce)',
    vehicleModel: 'Toyota HiAce Premio Executive',
    driverName: 'Pak Joko (Driver Shuttle Hotel)',
    destination: 'Bandara Soekarno Hatta Terminal 3 ➔ Hotel',
    purpose: 'AIRPORT_SHUTTLE',
    fuelVoucherAmount: 250000,
    tollCardAmount: 75000,
    status: 'IN_TRANSIT'
  },
  {
    id: 'car-02',
    bookingCode: 'POOL-2026-089',
    vehiclePlateNumber: 'B 9234 SDU (Isuzu Traga)',
    vehicleModel: 'Isuzu Traga Box',
    driverName: 'Pak Bambang (Driver Purchasing)',
    destination: 'Pasar Induk Kramat Jati ➔ Dapur Central',
    purpose: 'PURCHASING_PICKUP',
    fuelVoucherAmount: 150000,
    tollCardAmount: 30000,
    status: 'BOOKED'
  }
];

export const MOCK_FACILITY_APARS: FacilityAparStatus[] = [
  {
    id: 'apar-01',
    unitCode: 'APAR-FO-01',
    location: 'Lobby Front Office & Resto',
    equipmentType: 'APAR_FIRE_EXTINGUISHER',
    lastServiceDate: '2025-08-10',
    nextExpiryDate: '2026-08-10',
    conditionStatus: 'EXPIRED_WARNING'
  },
  {
    id: 'apar-02',
    unitCode: 'AC-BALLROOM-02',
    location: 'Grand Ballroom Level 2',
    equipmentType: 'AC_CENTRAL',
    lastServiceDate: '2026-06-01',
    nextExpiryDate: '2026-09-01',
    conditionStatus: 'GOOD'
  }
];

export const MOCK_DAILY_WORKERS: DailyWorkerItem[] = [
  {
    id: 'dw-01',
    workerName: 'Rian Hidayat (Casual Staff)',
    assignedEvent: 'Banquet Royal Wedding (500 Pax)',
    role: 'BANQUET_SERVER',
    dailyRate: 200000,
    shiftHours: 8,
    totalDailyPay: 200000,
    paymentStatus: 'PAID'
  }
];

export const MOCK_CAMP_BOSS_MEALS: CampBossMealLog[] = [
  {
    id: 'meal-01',
    employeeNik: 'NIK-2026-8801',
    employeeName: 'Rudi Operator Heavy Fleet',
    departmentOrCompany: 'PT Borneo Mining Emas',
    mealType: 'LUNCH',
    canteenLocation: 'Mess Hall Site Pit East #01',
    timestamp: '2026-07-25 12:30'
  }
];
