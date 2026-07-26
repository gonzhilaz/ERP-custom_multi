'use client';

import React, { useState } from 'react';
import { Users, Activity, Building2, FileText, PhoneCall, Target } from 'lucide-react';
import { useCrmPipeline } from '@/hooks/crm/useCrmPipeline';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { CrmKanbanPipelineTab } from './CrmKanbanPipelineTab';
import { CrmCustomersView } from './CrmCustomersView';
import { CrmQuotationsView } from './CrmQuotationsView';
import { CrmActivitiesView } from './CrmActivitiesView';
import { CrmCampaignsView } from './CrmCampaignsView';

export const CrmView = () => {
  const [activeTab, setActiveTab] = useState<'PIPELINE' | 'CUSTOMERS' | 'QUOTATIONS' | 'ACTIVITIES' | 'CAMPAIGNS'>('PIPELINE');
  const { deals, moveDealStage, addDeal } = useCrmPipeline();

  const subTabs: SubTabItem[] = [
    { id: 'PIPELINE', label: 'Visual Sales Pipeline (Kanban)', icon: Activity, count: deals.length },
    { id: 'CUSTOMERS', label: 'Master Pelanggan & Contacts', icon: Building2 },
    { id: 'QUOTATIONS', label: 'Surat Penawaran (SPH)', icon: FileText },
    { id: 'ACTIVITIES', label: 'Log Aktivitas Sales', icon: PhoneCall },
    { id: 'CAMPAIGNS', label: 'Marketing Campaign & ROI', icon: Target }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="CRM 360° & Sales Pipeline Management"
        icon={Users}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary CRM & Sales Suite"
        glossaryItems={[
          { term: 'Sales Pipeline Kanban', description: 'Visualisasi alur proses penjualan dari Lead ➔ Qualification ➔ SPH ➔ Contract ➔ Won.' },
          { term: 'Sales Quotation (SPH)', description: 'Surat Penawaran Harga resmi kepada calon pelanggan B2B.' },
          { term: 'Sales Activity Log', description: 'Rekam jejak meeting, call, dan site visit yang dilakukan oleh tim Sales Executive.' }
        ]}
        badges={[
          { label: `${deals.length} Active Deals in Pipeline`, variant: 'sky' },
          { label: 'Role Restrict: Sales & Marketing', variant: 'slate' }
        ]}
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="sky"
      />

      {activeTab === 'PIPELINE' && (
        <CrmKanbanPipelineTab
          deals={deals}
          moveDealStage={moveDealStage}
          addDeal={addDeal}
        />
      )}

      {activeTab === 'CUSTOMERS' && <CrmCustomersView />}
      {activeTab === 'QUOTATIONS' && <CrmQuotationsView />}
      {activeTab === 'ACTIVITIES' && <CrmActivitiesView />}
      {activeTab === 'CAMPAIGNS' && <CrmCampaignsView />}
    </div>
  );
};
