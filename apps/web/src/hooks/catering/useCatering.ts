'use client';

import { useState } from 'react';
import { CateringContract, DeliveryScheduleItem, MOCK_CATERING_CONTRACTS, MOCK_DELIVERY_SCHEDULES } from '@/lib/mock/catering';

export function useCatering() {
  const [contracts, setContracts] = useState<CateringContract[]>(MOCK_CATERING_CONTRACTS);
  const [deliveries, setDeliveries] = useState<DeliveryScheduleItem[]>(MOCK_DELIVERY_SCHEDULES);

  const addContract = (newContract: Omit<CateringContract, 'id' | 'contractCode'>) => {
    const created: CateringContract = {
      ...newContract,
      id: `cat-${Date.now()}`,
      contractCode: `CTR-2026-${Math.floor(100 + Math.random() * 900)}`
    };

    setContracts((prev) => [created, ...prev]);
  };

  const updateDeliveryStatus = (dispatchId: string, status: DeliveryScheduleItem['status']) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === dispatchId ? { ...d, status } : d))
    );
  };

  return {
    contracts,
    deliveries,
    addContract,
    updateDeliveryStatus
  };
}
