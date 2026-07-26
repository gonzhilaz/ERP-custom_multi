'use client';

import React from 'react';
import { BarChart3, PieChart, TrendingUp, DollarSign } from 'lucide-react';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const ManagerialOverviewView = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-sky-500" />
          <span>Managerial Dashboard</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Return on Equity (ROE)"
          value="24.8%"
          subtitle="+4.2% vs target"
          icon={TrendingUp}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50"
        />
        <KpiCard
          title="EBITDA Konsolidasi"
          value="Rp 2,850.000.000"
          subtitle="Margin Operasional"
          icon={PieChart}
          iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50"
        />
        <KpiCard
          title="Serapan Anggaran"
          value="93.1%"
          subtitle="Efisien"
          icon={DollarSign}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50"
        />
      </div>
    </div>
  );
};
