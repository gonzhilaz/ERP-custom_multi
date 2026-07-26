'use client';

import React, { useState } from 'react';
import { FileText, TrendingUp, Scale, Factory, PieChart, DollarSign, Layers } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { useFinancialReports } from '@/hooks/finance/useFinancialReports';
import { ProfitLossReportTab } from './ProfitLossReportTab';
import { BalanceSheetReportTab } from './BalanceSheetReportTab';
import { CogmReportTab } from './CogmReportTab';
import { UnitProfitabilityReportTab } from './UnitProfitabilityReportTab';
import { CashFlowReportTab } from './CashFlowReportTab';
import { EquityReportTab } from './EquityReportTab';

export const FinancialReportsView = () => {
  const [activeTab, setActiveTab] = useState<'PROFIT_LOSS' | 'BALANCE_SHEET' | 'CASH_FLOW' | 'EQUITY' | 'COGM' | 'UNIT_PROFITABILITY'>('PROFIT_LOSS');

  const {
    incomeStatement,
    balanceSheet,
    cogmBreakdown,
    unitProfitability,
    totalRevenue,
    totalCogs,
    grossProfit,
    totalOperatingExpenses,
    netIncome,
    grossMarginPercentage,
    netMarginPercentage,
    totalAssets,
    totalLiabilities,
    totalEquity
  } = useFinancialReports();

  const subTabs: SubTabItem[] = [
    { id: 'PROFIT_LOSS', label: 'Laba Rugi (P&L)', icon: TrendingUp },
    { id: 'BALANCE_SHEET', label: 'Neraca (Balance Sheet)', icon: Scale },
    { id: 'CASH_FLOW', label: 'Arus Kas (Cash Flow)', icon: DollarSign },
    { id: 'EQUITY', label: 'Perubahan Ekuitas', icon: Layers },
    { id: 'COGM', label: 'Harga Pokok Produksi (COGM)', icon: Factory },
    { id: 'UNIT_PROFITABILITY', label: 'Profitabilitas Unit', icon: PieChart }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Pusat Laporan Keuangan Enterprise"
        icon={FileText}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Financial Reports"
        glossaryItems={[
          { term: 'Laba Rugi (Profit & Loss)', description: 'Laporan pendapatan, HPP, beban operasional, dan laba bersih perusahaan.' },
          { term: 'Neraca (Balance Sheet)', description: 'Laporan posisi keuangan aset, kewajiban liabilitas, dan ekuitas.' },
          { term: 'Arus Kas (Cash Flow Statement)', description: 'Laporan mutasi kas dari aktivitas operasional, investasi, dan pendanaan.' },
          { term: 'Perubahan Ekuitas (Changes in Equity)', description: 'Laporan perkembangan modal disetor, laba ditahan, dan dividen.' },
          { term: 'Harga Pokok Produksi (COGM)', description: 'Rincian biaya bahan baku, tenaga kerja langsung, dan overhead pabrik.' }
        ]}
        badges={[
          { label: 'Standard PSAK / IFRS Compliant', variant: 'emerald' },
          { label: 'Multi-Tenant Consolidated', variant: 'sky' }
        ]}
      />

      {/* SubTab Navigation */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="sky"
      />

      {/* Dynamic Report View Render */}
      {activeTab === 'PROFIT_LOSS' && (
        <ProfitLossReportTab
          incomeStatement={incomeStatement}
          totalRevenue={totalRevenue}
          totalCogs={totalCogs}
          grossProfit={grossProfit}
          totalOperatingExpenses={totalOperatingExpenses}
          netIncome={netIncome}
          grossMarginPercentage={grossMarginPercentage}
          netMarginPercentage={netMarginPercentage}
        />
      )}
      {activeTab === 'BALANCE_SHEET' && (
        <BalanceSheetReportTab
          balanceSheet={balanceSheet}
          totalAssets={totalAssets}
          totalLiabilities={totalLiabilities}
          totalEquity={totalEquity}
        />
      )}
      {activeTab === 'CASH_FLOW' && <CashFlowReportTab />}
      {activeTab === 'EQUITY' && <EquityReportTab />}
      {activeTab === 'COGM' && <CogmReportTab cogmBreakdown={cogmBreakdown} />}
      {activeTab === 'UNIT_PROFITABILITY' && <UnitProfitabilityReportTab unitProfitability={unitProfitability} />}
    </div>
  );
};
