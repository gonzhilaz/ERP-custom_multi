'use client';

import { useState } from 'react';
import {
  MOCK_GUEST_IN_HOUSE,
  MOCK_BEO_EVENTS,
  MOCK_HOUSEKEEPING_TASKS,
  MOCK_ENGINEERING_WO,
  MOCK_SECURITY_PATROLS,
  GuestInHouseItem,
  BanquetEventOrder,
  HousekeepingTask,
  EngineeringWorkOrder,
  SecurityPatrolItem
} from '@/lib/mock/hotel-comprehensive';

export function useHotelComprehensive() {
  const [inHouseGuests] = useState<GuestInHouseItem[]>(MOCK_GUEST_IN_HOUSE);
  const [beoEvents, setBeoEvents] = useState<BanquetEventOrder[]>(MOCK_BEO_EVENTS);
  const [hkTasks, setHkTasks] = useState<HousekeepingTask[]>(MOCK_HOUSEKEEPING_TASKS);
  const [engOrders, setEngOrders] = useState<EngineeringWorkOrder[]>(MOCK_ENGINEERING_WO);
  const [secPatrols] = useState<SecurityPatrolItem[]>(MOCK_SECURITY_PATROLS);

  const createBeoEvent = (eventName: string, client: string, pax: number, venue: string) => {
    const newBeo: BanquetEventOrder = {
      id: `beo-${Date.now()}`,
      beoCode: `BEO-2026-07-${Math.floor(100 + Math.random() * 900)}`,
      eventName,
      clientCompany: client,
      eventDate: '2026-08-15',
      paxCount: pax,
      venueHall: venue,
      menuPackage: 'Buffet Royal & Softdrinks',
      specialRequests: 'Lighting Stage & Projector',
      status: 'CONFIRMED'
    };
    setBeoEvents([newBeo, ...beoEvents]);
    alert(`Banquet Event Order (BEO) [${eventName}] Berhasil Diterbitkan untuk Dapur & Banquet!`);
  };

  const updateRoomCleaningStatus = (id: string, status: HousekeepingTask['roomStatus']) => {
    setHkTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, roomStatus: status } : t))
    );
  };

  return {
    inHouseGuests,
    beoEvents,
    hkTasks,
    engOrders,
    secPatrols,
    createBeoEvent,
    updateRoomCleaningStatus
  };
}
