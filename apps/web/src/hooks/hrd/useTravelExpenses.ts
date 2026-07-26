'use client';

import { useState } from 'react';
import {
  MOCK_TRAVEL_EXPENSES,
  TravelExpenseItem
} from '@/lib/mock/hr-finance-integration';

export function useTravelExpenses() {
  const [expenses, setExpenses] = useState<TravelExpenseItem[]>(MOCK_TRAVEL_EXPENSES);

  const calculatePerDiem = (days: number, city: string) => {
    const ratePerDay = city.toLowerCase().includes('site') || city.toLowerCase().includes('samarinda') ? 500000 : 350000;
    return {
      ratePerDay,
      perDiemTotal: ratePerDay * days
    };
  };

  const addTravelRequest = (newRequest: Omit<TravelExpenseItem, 'id' | 'spdCode' | 'status' | 'settlementDifference'>) => {
    const spdCode = `SPD-2026-${Math.floor(100 + Math.random() * 900)}`;
    const totalSpent = newRequest.perDiemTotal + newRequest.hotelFlightAdvance;
    const diff = newRequest.actualSpentReceipts - totalSpent;

    const item: TravelExpenseItem = {
      ...newRequest,
      id: `trv-${Date.now()}`,
      spdCode,
      settlementDifference: diff,
      status: 'ADVANCE_PAID'
    };

    setExpenses((prev) => [item, ...prev]);
  };

  const settleTravelExpense = (id: string) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'SETTLED' } : item))
    );
  };

  return {
    expenses,
    calculatePerDiem,
    addTravelRequest,
    settleTravelExpense
  };
}
