'use client';

import { useState } from 'react';
import {
  MOCK_ATK_REQUISITIONS,
  MOCK_CAR_POOL_BOOKINGS,
  MOCK_FACILITY_APARS,
  MOCK_DAILY_WORKERS,
  MOCK_CAMP_BOSS_MEALS,
  AtkRequisitionItem,
  CarPoolBooking,
  FacilityAparStatus,
  DailyWorkerItem,
  CampBossMealLog
} from '@/lib/mock/general-affairs';

export function useGeneralAffairs() {
  const [atkReqs, setAtkReqs] = useState<AtkRequisitionItem[]>(MOCK_ATK_REQUISITIONS);
  const [carBookings, setCarBookings] = useState<CarPoolBooking[]>(MOCK_CAR_POOL_BOOKINGS);
  const [facilityApars] = useState<FacilityAparStatus[]>(MOCK_FACILITY_APARS);
  const [dailyWorkers, setDailyWorkers] = useState<DailyWorkerItem[]>(MOCK_DAILY_WORKERS);
  const [campMeals, setCampMeals] = useState<CampBossMealLog[]>(MOCK_CAMP_BOSS_MEALS);

  const addCarPoolBooking = (purpose: CarPoolBooking['purpose'], vehicle: string, driver: string, destination: string) => {
    const booking: CarPoolBooking = {
      id: `car-${Date.now()}`,
      bookingCode: `POOL-2026-${Math.floor(100 + Math.random() * 900)}`,
      vehiclePlateNumber: vehicle,
      vehicleModel: vehicle,
      driverName: driver,
      destination,
      purpose,
      fuelVoucherAmount: 200000,
      tollCardAmount: 50000,
      status: 'BOOKED'
    };
    setCarBookings([booking, ...carBookings]);
    alert(`Pemesanan Kendaraan Pool GA [${booking.bookingCode}] Penugasan ${purpose} Berhasil Diterbitkan!`);
  };

  const addAtkRequisition = (departmentName: string, itemName: string, qty: number) => {
    const req: AtkRequisitionItem = {
      id: `atk-${Date.now()}`,
      reqCode: `ATK-2026-07-${Math.floor(100 + Math.random() * 900)}`,
      departmentName,
      itemCategory: 'Alat Tulis Kantor',
      itemName,
      requestedQty: qty,
      unit: 'Pcs/Rim',
      status: 'PENDING',
      requestDate: new Date().toISOString().split('T')[0]
    };
    setAtkReqs([req, ...atkReqs]);
    alert(`Pengajuan Permintaan ATK [${itemName}] Berhasil Diterbitkan!`);
  };

  const addCampMealScan = (nik: string, name: string, mealType: CampBossMealLog['mealType']) => {
    const log: CampBossMealLog = {
      id: `meal-${Date.now()}`,
      employeeNik: nik,
      employeeName: name,
      departmentOrCompany: 'PT Borneo Mining Emas',
      mealType,
      canteenLocation: 'Mess Hall Site Pit East #01',
      timestamp: new Date().toLocaleString()
    };
    setCampMeals([log, ...campMeals]);
    alert(`Scan Headcount Camp Boss [${name} - ${mealType}] Berhasil Teratat!`);
  };

  return {
    atkReqs,
    carBookings,
    facilityApars,
    dailyWorkers,
    campMeals,
    addCarPoolBooking,
    addAtkRequisition,
    addCampMealScan
  };
}
