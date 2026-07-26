'use client';

import { useState } from 'react';
import { GuestFolioItem, NightAuditLogItem, MOCK_GUEST_FOLIOS, MOCK_NIGHT_AUDIT_LOGS } from '@/lib/mock/hotelier';

export function useHotelFolio() {
  const [folios, setFolios] = useState<GuestFolioItem[]>(MOCK_GUEST_FOLIOS);
  const [auditLogs, setAuditLogs] = useState<NightAuditLogItem[]>(MOCK_NIGHT_AUDIT_LOGS);

  const addExtraCharge = (folioId: string, chargeType: 'ROOM_SERVICE' | 'LAUNDRY', amount: number) => {
    setFolios((prev) =>
      prev.map((f) => {
        if (f.id === folioId) {
          const roomServiceTotal = chargeType === 'ROOM_SERVICE' ? f.roomServiceTotal + amount : f.roomServiceTotal;
          const laundryTotal = chargeType === 'LAUNDRY' ? f.laundryTotal + amount : f.laundryTotal;
          const totalBill = f.roomChargeTotal + roomServiceTotal + laundryTotal;
          return { ...f, roomServiceTotal, laundryTotal, totalBill };
        }
        return f;
      })
    );
  };

  const runNightAudit = () => {
    const today = new Date().toISOString().substring(0, 10);
    const newLog: NightAuditLogItem = {
      id: `na-${Date.now()}`,
      auditCode: `NA-${today.replace(/-/g, '').substring(0, 6)}-${Math.floor(10 + Math.random() * 90)}`,
      auditDate: `${today} 23:59`,
      executedBy: 'Night Audit Manager',
      totalOccupiedRooms: 42,
      totalRoomRevenue: 52000000,
      totalFnBRevenue: 14500000,
      systemStatus: 'SUCCESS_COMPLETED'
    };

    setAuditLogs((prev) => [newLog, ...prev]);
    alert(`Proses Night Audit Hotel Tanggal [${today}] Berhasil Dieksekusi 100%! Jurnal Penjualan Kamar Ter-Post.`);
  };

  return {
    folios,
    auditLogs,
    addExtraCharge,
    runNightAudit
  };
}
