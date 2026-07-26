'use client';

import { useState } from 'react';
import {
  MOCK_BLIND_CASH_AUDITS,
  MOCK_COLD_STORAGE_BATCHES,
  MOCK_CONSOLIDATED_PNL,
  BlindCashAudit,
  ColdStorageBatch,
  ConsolidatedPnlData
} from '@/lib/mock/six-pillars-extended';

export function useSixPillarsExtended() {
  const [cashAudits, setCashAudits] = useState<BlindCashAudit[]>(MOCK_BLIND_CASH_AUDITS);
  const [coldBatches] = useState<ColdStorageBatch[]>(MOCK_COLD_STORAGE_BATCHES);
  const [pnlData] = useState<ConsolidatedPnlData[]>(MOCK_CONSOLIDATED_PNL);

  const submitBlindCashAudit = (cashierName: string, physicalCount: number) => {
    const expected = 4500000;
    const variance = physicalCount - expected;

    const audit: BlindCashAudit = {
      id: `csh-${Date.now()}`,
      cashierName,
      shiftPeriod: 'Shift Siang (08:00 - 16:00)',
      systemExpectedCash: expected,
      physicalCashCounted: physicalCount,
      varianceAmount: variance,
      status: variance === 0 ? 'EXACT_MATCH' : 'DISCREPANCY_WARNING',
      auditTimestamp: new Date().toLocaleString()
    };

    setCashAudits([audit, ...cashAudits]);
    if (variance === 0) {
      alert('Blind Cash Audit Berhasil! Uang Fisik Sesuai 100% dengan Sistem.');
    } else {
      alert(`Peringatan Blind Cash Audit: Terjadi Selisih Uang Kasir Sebesar Rp ${variance.toLocaleString('id-ID')}! Peringatan Dikirim ke Finance.`);
    }
  };

  const totalHoldingRevenue = pnlData.reduce((sum, p) => sum + p.revenue, 0);
  const totalHoldingNetProfit = pnlData.reduce((sum, p) => sum + p.netProfit, 0);

  return {
    cashAudits,
    coldBatches,
    pnlData,
    totalHoldingRevenue,
    totalHoldingNetProfit,
    submitBlindCashAudit
  };
}
