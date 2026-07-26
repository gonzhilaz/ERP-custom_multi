'use client';

import { useState } from 'react';
import {
  MOCK_INCOME_STATEMENT,
  MOCK_BALANCE_SHEET,
  MOCK_COGM_BREAKDOWN,
  MOCK_UNIT_PROFITABILITY,
  IncomeStatementLine,
  BalanceSheetLine,
  CogmBreakdownLine,
  UnitProfitabilitySegment
} from '@/lib/mock/financial-reports';

export function useFinancialReports() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2026-07');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<string>('ALL');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const totalRevenue = MOCK_INCOME_STATEMENT
    .filter((i) => i.category === 'REVENUE')
    .reduce((acc, curr) => acc + curr.holdingTotal, 0);

  const totalCogs = MOCK_INCOME_STATEMENT
    .filter((i) => i.category === 'COGS')
    .reduce((acc, curr) => acc + curr.holdingTotal, 0);

  const totalOperatingExpenses = MOCK_INCOME_STATEMENT
    .filter((i) => i.category === 'OPERATING_EXPENSE')
    .reduce((acc, curr) => acc + curr.holdingTotal, 0);

  const grossProfit = totalRevenue - totalCogs;
  const netIncome = grossProfit - totalOperatingExpenses;
  const grossMarginPercentage = totalRevenue > 0 ? ((grossProfit / totalRevenue) * 100).toFixed(1) : '0';
  const netMarginPercentage = totalRevenue > 0 ? ((netIncome / totalRevenue) * 100).toFixed(1) : '0';

  const totalAssets = MOCK_BALANCE_SHEET
    .filter((b) => b.classification === 'CURRENT_ASSET' || b.classification === 'NON_CURRENT_ASSET')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalLiabilities = MOCK_BALANCE_SHEET
    .filter((b) => b.classification === 'SHORT_TERM_LIABILITY' || b.classification === 'LONG_TERM_LIABILITY')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalEquity = MOCK_BALANCE_SHEET
    .filter((b) => b.classification === 'EQUITY')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const simulateExport = (reportName: string, format: 'PDF' | 'EXCEL') => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Laporan [${reportName}] Berhasil Di-export ke Format ${format}! Dokumen tersimpan di folder Download.`);
    }, 800);
  };

  return {
    incomeStatement: MOCK_INCOME_STATEMENT,
    balanceSheet: MOCK_BALANCE_SHEET,
    cogmBreakdown: MOCK_COGM_BREAKDOWN,
    unitProfitability: MOCK_UNIT_PROFITABILITY,
    selectedPeriod,
    setSelectedPeriod,
    selectedUnitFilter,
    setSelectedUnitFilter,
    isExporting,
    totalRevenue,
    totalCogs,
    grossProfit,
    totalOperatingExpenses,
    netIncome,
    grossMarginPercentage,
    netMarginPercentage,
    totalAssets,
    totalLiabilities,
    totalEquity,
    simulateExport
  };
}
