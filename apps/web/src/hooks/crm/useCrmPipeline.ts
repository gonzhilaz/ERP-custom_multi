'use client';

import { useState } from 'react';
import { CrmDealItem, QuotationItem, MOCK_CRM_DEALS, MOCK_QUOTATIONS } from '@/lib/mock/crm';

export function useCrmPipeline() {
  const [deals, setDeals] = useState<CrmDealItem[]>(MOCK_CRM_DEALS);
  const [quotations, setQuotations] = useState<QuotationItem[]>(MOCK_QUOTATIONS);

  const moveDealStage = (dealId: string, newStage: CrmDealItem['stage']) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: newStage } : d))
    );
  };

  const addDeal = (newDeal: Omit<CrmDealItem, 'id' | 'dealCode'>) => {
    const created: CrmDealItem = {
      ...newDeal,
      id: `deal-${Date.now()}`,
      dealCode: `DEAL-2026-${Math.floor(100 + Math.random() * 900)}`
    };

    setDeals((prev) => [created, ...prev]);
  };

  const totalPipelineValue = deals.reduce((acc, curr) => acc + curr.dealValue, 0);
  const totalClosedWonValue = deals
    .filter((d) => d.stage === 'CLOSED_WON')
    .reduce((acc, curr) => acc + curr.dealValue, 0);

  return {
    deals,
    quotations,
    totalPipelineValue,
    totalClosedWonValue,
    moveDealStage,
    addDeal
  };
}
