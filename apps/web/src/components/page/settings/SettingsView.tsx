'use client';

import React, { useState } from 'react';
import { Settings, Building2, ShieldCheck, Building } from 'lucide-react';
import { useSettings } from '@/hooks/settings/useSettings';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ParentCompanyProfileTab } from './ParentCompanyProfileTab';
import { ModuleSubscriptionTab } from './ModuleSubscriptionTab';
import { TenantUnitManagementTab } from './TenantUnitManagementTab';

export const SettingsView = () => {
  const {
    companyProfile,
    subscriptions,
    activeTab,
    setActiveTab,
    totalActiveModules,
    totalMonthlySubscriptionCost,
    updateProfile,
    toggleModuleStatus
  } = useSettings();

  const subTabs: SubTabItem[] = [
    { id: 'PROFILE', label: 'Profil Holding & Branding', icon: Building2 },
    { id: 'SUBSCRIPTIONS', label: 'Lisensi Modul SaaS', icon: ShieldCheck, count: totalActiveModules },
    { id: 'UNITS', label: 'Unit Bisnis & Cabang', icon: Building }
  ];

  return (
    <div className="space-y-4">
      {/* Page Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl shrink-0">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              Pengaturan
            </h1>
          </div>
        </div>
      </div>

      {/* SubTab Navigation */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab as any}
        tabs={subTabs}
        colorScheme="sky"
      />

      {/* Dynamic Tab Content */}
      {activeTab === 'PROFILE' && (
        <ParentCompanyProfileTab profile={companyProfile} updateProfile={updateProfile} />
      )}

      {activeTab === 'SUBSCRIPTIONS' && (
        <ModuleSubscriptionTab
          subscriptions={subscriptions}
          totalActiveModules={totalActiveModules}
          totalMonthlySubscriptionCost={totalMonthlySubscriptionCost}
          toggleModuleStatus={toggleModuleStatus}
        />
      )}

      {activeTab === 'UNITS' && <TenantUnitManagementTab />}
    </div>
  );
};
