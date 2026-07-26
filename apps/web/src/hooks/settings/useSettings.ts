'use client';

import { useState } from 'react';
import {
  ParentCompanyProfile,
  ModuleSubscriptionItem,
  INITIAL_PARENT_COMPANY,
  INITIAL_MODULE_SUBSCRIPTIONS
} from '@/lib/mock/settings';

export function useSettings() {
  const [companyProfile, setCompanyProfile] = useState<ParentCompanyProfile>(INITIAL_PARENT_COMPANY);
  const [subscriptions, setSubscriptions] = useState<ModuleSubscriptionItem[]>(INITIAL_MODULE_SUBSCRIPTIONS);
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'SUBSCRIPTIONS' | 'UNITS'>('PROFILE');

  const updateProfile = (updated: Partial<ParentCompanyProfile>) => {
    setCompanyProfile((prev) => ({
      ...prev,
      ...updated
    }));
  };

  const toggleModuleStatus = (moduleId: string) => {
    setSubscriptions((prev) =>
      prev.map((mod) => (mod.id === moduleId ? { ...mod, isEnabled: !mod.isEnabled } : mod))
    );
  };

  const totalActiveModules = subscriptions.filter((m) => m.isEnabled).length;
  const totalMonthlySubscriptionCost = subscriptions
    .filter((m) => m.isEnabled)
    .reduce((acc, curr) => acc + curr.monthlyFee, 0);

  return {
    companyProfile,
    subscriptions,
    activeTab,
    setActiveTab,
    totalActiveModules,
    totalMonthlySubscriptionCost,
    updateProfile,
    toggleModuleStatus
  };
}
