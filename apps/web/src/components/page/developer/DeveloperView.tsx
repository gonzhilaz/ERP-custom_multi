'use client';

import React, { useState } from 'react';
import { ShieldCheck, Building2, Key, Activity } from 'lucide-react';
import { useDeveloper } from '@/hooks/developer/useDeveloper';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { DeveloperOverviewTab } from './DeveloperOverviewTab';
import { ClientDirectoryTab } from './ClientDirectoryTab';
import { LicenseGeneratorTab } from './LicenseGeneratorTab';

export const DeveloperView = () => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CLIENTS' | 'LICENSES'>('OVERVIEW');

  const {
    clients,
    licenseKeys,
    metrics,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    addClient,
    generateNewLicenseKey,
    updateClientStatus
  } = useDeveloper();

  const subTabs: SubTabItem[] = [
    { id: 'OVERVIEW', label: 'Overview SaaS Developer', icon: Activity },
    { id: 'CLIENTS', label: 'Direktori Klien Holding', icon: Building2, count: clients.length },
    { id: 'LICENSES', label: 'Generator Lisensi SaaS', icon: Key, count: licenseKeys.length }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              Portal Developer & SaaS Level-1 Control Center
            </h1>
            <p className="text-[11px] text-slate-500">Pusat Pengelolaan Klien Parent Company & Lisensi SaaS</p>
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
      {activeTab === 'OVERVIEW' && (
        <DeveloperOverviewTab metrics={metrics} clients={clients} />
      )}

      {activeTab === 'CLIENTS' && (
        <ClientDirectoryTab
          clients={clients}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          addClient={addClient}
          updateClientStatus={updateClientStatus}
        />
      )}

      {activeTab === 'LICENSES' && (
        <LicenseGeneratorTab
          licenseKeys={licenseKeys}
          generateNewLicenseKey={generateNewLicenseKey}
        />
      )}
    </div>
  );
};
