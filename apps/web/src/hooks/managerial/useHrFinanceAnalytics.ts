'use client';

import { useState } from 'react';
import {
  MOCK_TENANT_PAYROLL_RATIOS,
  TenantPayrollRatioItem
} from '@/lib/mock/hr-finance-analytics';

export function useHrFinanceAnalytics() {
  const [ratios] = useState<TenantPayrollRatioItem[]>(MOCK_TENANT_PAYROLL_RATIOS);

  const totalHoldingHeadcount = ratios.reduce((sum, r) => sum + r.totalHeadcount, 0);
  const totalHoldingRevenue = ratios.reduce((sum, r) => sum + r.totalMonthlyRevenue, 0);
  const totalHoldingPayroll = ratios.reduce((sum, r) => sum + r.totalMonthlyPayrollCost, 0);
  const averagePayrollRatio = Number(((totalHoldingPayroll / totalHoldingRevenue) * 100).toFixed(1));

  return {
    ratios,
    totalHoldingHeadcount,
    totalHoldingRevenue,
    totalHoldingPayroll,
    averagePayrollRatio
  };
}
