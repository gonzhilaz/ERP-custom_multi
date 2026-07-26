'use client';

import { useState } from 'react';
import {
  MOCK_BOM_RECIPES,
  MOCK_HOTEL_FOLIOS,
  MOCK_MINING_HAULING,
  MOCK_MAILS,
  MOCK_BUDGETS_ALLOCATION,
  BomRecipeItem,
  HotelRoomFolio,
  MiningHaulingLog,
  MailItem,
  BudgetAllocationItem
} from '@/lib/mock/specialized-industries';

export function useSpecializedIndustries() {
  const [boms, setBoms] = useState<BomRecipeItem[]>(MOCK_BOM_RECIPES);
  const [folios, setFolios] = useState<HotelRoomFolio[]>(MOCK_HOTEL_FOLIOS);
  const [haulings, setHaulings] = useState<MiningHaulingLog[]>(MOCK_MINING_HAULING);
  const [mails, setMails] = useState<MailItem[]>(MOCK_MAILS);
  const [budgets] = useState<BudgetAllocationItem[]>(MOCK_BUDGETS_ALLOCATION);

  const addWorkOrderFromBom = (bom: BomRecipeItem) => {
    alert(`Work Order Produksi [${bom.finishedGoodName}] Diterbitkan! Bahan Baku Otomatis Dipotong dari Gudang via Auto-Requisition.`);
  };

  const checkInGuest = (roomNumber: string, guestName: string) => {
    setFolios((prev) =>
      prev.map((f) => (f.roomNumber === roomNumber ? { ...f, guestName, status: 'OCCUPIED', checkInDate: new Date().toISOString().split('T')[0] } : f))
    );
    alert(`Check-In Kamar ${roomNumber} atas nama ${guestName} Berhasil! Folio Billing Aktif.`);
  };

  const addHaulingLog = (truckNumber: string, driverName: string, tons: number) => {
    const log: MiningHaulingLog = {
      id: `hl-${Date.now()}`,
      haulingCode: `HL-2026-${Math.floor(100 + Math.random() * 900)}`,
      truckNumber,
      driverName,
      pitLocation: 'Pit East Gold-01',
      tonnageTons: tons,
      fuelConsumedLiters: 90,
      shift: 'DAY',
      timestamp: new Date().toLocaleString()
    };
    setHaulings([log, ...haulings]);
    alert(`Ritase Hauling [${truckNumber}] Tonnase ${tons} Ton Berhasil Dicatat!`);
  };

  const addMailDisposition = (mailId: string, notes: string) => {
    setMails((prev) =>
      prev.map((m) => (m.id === mailId ? { ...m, dispositionNotes: notes, status: 'DISPOSED' } : m))
    );
    alert('Disposisi Surat Resmi Berhasil Diteruskan ke Unit Terkait!');
  };

  return {
    boms,
    folios,
    haulings,
    mails,
    budgets,
    addWorkOrderFromBom,
    checkInGuest,
    addHaulingLog,
    addMailDisposition
  };
}
