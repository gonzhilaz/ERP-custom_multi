'use client';

import { useState } from 'react';
import { DiningTable, MOCK_DINING_TABLES } from '@/lib/mock/tables';

export function useTables() {
  const [tables, setTables] = useState<DiningTable[]>(MOCK_DINING_TABLES);
  const [filterZone, setFilterZone] = useState<string>('ALL');

  const updateTableStatus = (tableId: string, status: DiningTable['status'], guestCount?: number) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? {
              ...t,
              status,
              currentGuestCount: guestCount !== undefined ? guestCount : t.currentGuestCount
            }
          : t
      )
    );
  };

  const splitBillTable = (tableId: string, splitCount: number) => {
    const target = tables.find((t) => t.id === tableId);
    if (target && target.activeSubtotal) {
      const splitAmount = Math.round(target.activeSubtotal / splitCount);
      alert(`Split Bill Berhasil untuk ${target.tableNumber}!\n\n${splitCount} Nota Terpisah masing-masing Rp ${splitAmount.toLocaleString('id-ID')}.`);
    }
  };

  const filteredTables = tables.filter((t) => {
    if (filterZone === 'ALL') return true;
    return t.sectionZone === filterZone;
  });

  const totalOccupied = tables.filter((t) => t.status === 'OCCUPIED' || t.status === 'BILL_PRINTED').length;
  const occupancyPercentage = Math.round((totalOccupied / tables.length) * 100);

  return {
    tables: filteredTables,
    allTables: tables,
    filterZone,
    setFilterZone,
    totalOccupied,
    occupancyPercentage,
    updateTableStatus,
    splitBillTable
  };
}
