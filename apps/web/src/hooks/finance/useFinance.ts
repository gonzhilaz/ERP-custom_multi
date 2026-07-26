import { useState, useEffect } from 'react';
import { COA_DATA, TENANT_COA_MAP, MOCK_COA_CATEGORIES, CoaItem, CoaCategory } from '@/lib/mock/finance';
import { useTenantContext } from '@/context/TenantContext';

export function useFinance() {
  const { activeUnit } = useTenantContext();
  const initialCoa = TENANT_COA_MAP[activeUnit.code] || COA_DATA;

  const [coaList, setCoaList] = useState<CoaItem[]>(initialCoa);
  const [coaCategories, setCoaCategories] = useState<CoaCategory[]>(MOCK_COA_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'COA' | 'JOURNAL'>('COA');

  // Sync COA accounts when user switches active Tenant unit
  useEffect(() => {
    const tenantCoa = TENANT_COA_MAP[activeUnit.code] || TENANT_COA_MAP['HOLDING-HO'] || COA_DATA;
    setCoaList(tenantCoa);
  }, [activeUnit.code]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const addCoaItem = (newItem: Omit<CoaItem, 'id'>) => {
    const created: CoaItem = {
      ...newItem,
      id: `coa-${Date.now()}`
    };
    setCoaList((prev) => [created, ...prev]);
  };

  const deleteCoaItem = (id: string) => {
    setCoaList((prev) => prev.filter((c) => c.id !== id));
  };

  const addCoaCategory = (newCat: Omit<CoaCategory, 'id' | 'accountCount'>) => {
    const created: CoaCategory = {
      ...newCat,
      id: `coa-cat-${Date.now()}`,
      accountCount: 0
    };
    setCoaCategories((prev) => [created, ...prev]);
  };

  const updateCoaCategory = (id: string, updatedCat: Partial<CoaCategory>) => {
    setCoaCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedCat } : c))
    );
  };

  const deleteCoaCategory = (id: string) => {
    setCoaCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    coaList,
    coaCategories,
    loading,
    activeTab,
    setActiveTab,
    addCoaItem,
    deleteCoaItem,
    addCoaCategory,
    updateCoaCategory,
    deleteCoaCategory
  };
}
