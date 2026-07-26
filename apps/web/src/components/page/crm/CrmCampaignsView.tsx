'use client';

import React, { useState } from 'react';
import { Target, Plus, BarChart2, CheckCircle2, TrendingUp } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

interface CampaignRow {
  campaignCode: string;
  campaignName: string;
  channel: string;
  budget: number;
  leadsAcquired: number;
  dealsWon: number;
  revenueGenerated: number;
  roiPercentage: string;
  status: string;
}

export const CrmCampaignsView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [campaigns, setCampaigns] = useState<CampaignRow[]>([
    { campaignCode: 'CMP-2026-01', campaignName: 'Exhibition Mining & Energy Expo Jakarta 2026', channel: 'Event & Tradeshow', budget: 150000000, leadsAcquired: 42, dealsWon: 8, revenueGenerated: 1450000000, roiPercentage: '866%', status: 'COMPLETED' },
    { campaignCode: 'CMP-2026-02', campaignName: 'Digital Ads B2B Procurement Google & LinkedIn', channel: 'Digital Marketing', budget: 50000000, leadsAcquired: 85, dealsWon: 12, revenueGenerated: 620000000, roiPercentage: '1140%', status: 'RUNNING' }
  ]);

  const filtered = campaigns.filter(
    (c) =>
      c.campaignCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<CampaignRow>[] = [
    { key: 'campaignCode', header: 'Kode Campaign', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.campaignCode },
    { key: 'campaignName', header: 'Nama Program Campaign Marketing', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.campaignName },
    { key: 'channel', header: 'Saluran Marketing', render: (i) => <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px] rounded">{i.channel}</span> },
    { key: 'budget', header: 'Anggaran / Budget (Rp)', align: 'right', className: 'font-mono font-bold text-rose-600 dark:text-rose-400', render: (i) => `Rp ${i.budget.toLocaleString('id-ID')}` },
    { key: 'leadsAcquired', header: 'Leads Didapat', align: 'center', className: 'font-mono font-bold text-sky-600', render: (i) => `${i.leadsAcquired} Leads` },
    { key: 'revenueGenerated', header: 'Revenue Diperoleh (Rp)', align: 'right', className: 'font-mono font-extrabold text-emerald-600 dark:text-emerald-400', render: (i) => `Rp ${i.revenueGenerated.toLocaleString('id-ID')}` },
    { key: 'roiPercentage', header: 'ROI (%)', align: 'center', className: 'font-mono font-extrabold text-amber-600', render: (i) => i.roiPercentage },
    { key: 'status', header: 'Status', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.status}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Marketing Campaign & Lead Gen ROI Tracker"
        icon={Target}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Campaign Management"
        glossaryItems={[
          { term: 'Marketing Campaign', description: 'Program promosi dan pameran industri untuk akuisisi prospek (Leads).' },
          { term: 'ROI Lead Gen', description: 'Rasio imbal hasil pendapatan proyek yang didapat dibanding biaya kampanye.' }
        ]}
        badges={[
          { label: `${campaigns.length} Campaign Active`, variant: 'amber' },
          { label: 'Role Restrict: Marketing Executive', variant: 'slate' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari campaign, channel, atau promo..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Register Campaign Marketing & Perhitungan ROI Lead (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.campaignCode}
      />
    </div>
  );
};
