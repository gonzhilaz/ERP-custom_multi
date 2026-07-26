'use client';

import { useState } from 'react';
import {
  FixedAssetDepreciationItem,
  TaxDepreciationRule,
  DepreciationAuditLog,
  MOCK_FIXED_ASSETS_DEPRECIATION,
  MOCK_TAX_DEPRECIATION_RULES,
  MOCK_DEPRECIATION_AUDIT_LOGS
} from '@/lib/mock/asset-depreciation';

export function useAssetDepreciation() {
  const [assets, setAssets] = useState<FixedAssetDepreciationItem[]>(MOCK_FIXED_ASSETS_DEPRECIATION);
  const [taxRules, setTaxRules] = useState<TaxDepreciationRule[]>(MOCK_TAX_DEPRECIATION_RULES);
  const [auditLogs, setAuditLogs] = useState<DepreciationAuditLog[]>(MOCK_DEPRECIATION_AUDIT_LOGS);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2026-07');
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const totalAcquisitionCost = assets.reduce((acc, curr) => acc + curr.acquisitionCost, 0);
  const totalAccumulatedDepreciation = assets.reduce((acc, curr) => acc + curr.accumulatedDepreciationTotal, 0);
  const totalNetBookValue = assets.reduce((acc, curr) => acc + curr.netBookValue, 0);
  const totalMonthlyDepreciationExpense = assets.reduce((acc, curr) => acc + curr.monthlyDepreciationAmount, 0);

  const addTaxRule = (newRule: Omit<TaxDepreciationRule, 'id'>) => {
    const created: TaxDepreciationRule = {
      ...newRule,
      id: `tax-rule-${Date.now()}`
    };
    setTaxRules((prev) => [...prev, created]);
  };

  const postMonthlyDepreciationJournal = (assetId?: string) => {
    setIsPosting(true);

    setTimeout(() => {
      setIsPosting(false);
      setAssets((prev) =>
        prev.map((ast) => {
          if (!assetId || ast.id === assetId) {
            const newAccumulated = ast.accumulatedDepreciationTotal + ast.monthlyDepreciationAmount;
            const newNetBook = Math.max(0, ast.acquisitionCost - newAccumulated);
            return {
              ...ast,
              accumulatedDepreciationTotal: newAccumulated,
              netBookValue: newNetBook,
              lastJournalPostedPeriod: selectedPeriod
            };
          }
          return ast;
        })
      );

      const newLog: DepreciationAuditLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        postedPeriod: selectedPeriod,
        executedBy: 'Bpk. Rayhan Prasetya (Senior Accountant)',
        totalAssetsCount: assetId ? 1 : assets.length,
        totalJournalAmount: assetId ? assets.find((a) => a.id === assetId)?.monthlyDepreciationAmount || 0 : totalMonthlyDepreciationExpense,
        journalReference: `JRN-DEP-${selectedPeriod.replace('-', '')}-${Math.floor(100 + Math.random() * 900)}`,
        notes: `Posting Jurnal Penyusutan Bulanan Periode [${selectedPeriod}] (Debit 6-2001, Kredit 1-2901)`
      };

      setAuditLogs((prev) => [newLog, ...prev]);

      alert(
        `Jurnal Penyusutan Aset Tetap Periode [${selectedPeriod}] BERHASIL DIPOSTING ke General Ledger!\n\n` +
        `• Debit: 6-2001 Beban Penyusutan Aset Tetap\n` +
        `• Kredit: 1-2901 Akumulasi Penyusutan Aset Tetap`
      );
    }, 600);
  };

  return {
    assets,
    taxRules,
    auditLogs,
    selectedPeriod,
    setSelectedPeriod,
    isPosting,
    totalAcquisitionCost,
    totalAccumulatedDepreciation,
    totalNetBookValue,
    totalMonthlyDepreciationExpense,
    addTaxRule,
    postMonthlyDepreciationJournal
  };
}
