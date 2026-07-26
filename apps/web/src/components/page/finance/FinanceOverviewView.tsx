'use client';

import React from 'react';
import { Wallet, TrendingUp, DollarSign, Globe } from 'lucide-react';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const FinanceOverviewView = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Wallet className="w-5 h-5 text-sky-500" />
          <span>Finance Overview</span>
        </h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Kas & Bank"
          value="Rp 1.700.000.000"
          subtitle="Mandiri & Petty Cash"
          icon={Wallet}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50"
        />
        <KpiCard
          title="Kas USD"
          value="$ 25,000.00 USD"
          subtitle="Auto Rate"
          icon={Globe}
          iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950/50"
        />
        <KpiCard
          title="Piutang Usaha (AR)"
          value="Rp 340.000.000"
          subtitle="Aging < 30 Hari"
          icon={TrendingUp}
          iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50"
        />
        <KpiCard
          title="Utang Usaha (AP)"
          value="Rp 210.000.000"
          subtitle="Jatuh Tempo 15 Hari"
          icon={DollarSign}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50"
        />
      </div>
    </div>
  );
};
