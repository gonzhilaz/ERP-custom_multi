'use client';

import { useState, useEffect } from 'react';
import { MOCK_BUDGETS, MOCK_LEGAL_DOCUMENTS, BudgetItem, LegalDocumentItem } from '@/lib/mock/managerial';

export function useManagerial() {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [documents, setDocuments] = useState<LegalDocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'BUDGET' | 'DMS'>('BUDGET');

  useEffect(() => {
    const timer = setTimeout(() => {
      setBudgets(MOCK_BUDGETS);
      setDocuments(MOCK_LEGAL_DOCUMENTS);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const totalBudgetAllocated = budgets.reduce((acc, b) => acc + b.budgetAllocated, 0);
  const totalActualSpent = budgets.reduce((acc, b) => acc + b.actualSpent, 0);
  const overallUtilization = ((totalActualSpent / (totalBudgetAllocated || 1)) * 100).toFixed(1);

  return {
    budgets,
    documents,
    loading,
    activeTab,
    setActiveTab,
    totalBudgetAllocated,
    totalActualSpent,
    overallUtilization
  };
}
