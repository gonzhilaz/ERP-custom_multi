'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  DollarSign,
  Building2,
  PieChart,
  Sparkles,
  Zap,
  Layers
} from 'lucide-react';
import { KpiCard } from '@/components/ui/cards/KpiCard';
import { UnitPerformanceCard } from '@/components/ui/cards/UnitPerformanceCard';
import { SkeletonCard } from '@/components/ui/loader/skeleton/SkeletonCard';
import { MOCK_UNITS } from '@/lib/mock/units';

export const DashboardView = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 p-5 rounded-2xl text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-sky-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Juli 2026</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Dashboard Holding</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-semibold shadow-lg transition-all flex items-center gap-2 cursor-pointer">
            <Zap className="w-4 h-4" />
            <span>AI Executive Briefing</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Omset Holding"
          value="Rp 5.46 M"
          subtitle="+18.4% vs bulan lalu"
          icon={TrendingUp}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600"
        />
        <KpiCard
          title="Beban Pengeluaran"
          value="Rp 3.11 M"
          subtitle="Efisiensi 92%"
          icon={DollarSign}
          iconBgColor="bg-amber-50 dark:bg-amber-950/50 text-amber-600"
        />
        <KpiCard
          title="Laba Bersih"
          value="Rp 2.35 M"
          subtitle="Margin 43%"
          icon={PieChart}
          iconBgColor="bg-sky-50 dark:bg-sky-950/50 text-sky-600"
          valueColor="text-sky-600 dark:text-sky-400"
        />
        <KpiCard
          title="Unit Usaha"
          value="4 Unit"
          subtitle="DB Normal"
          icon={Building2}
          iconBgColor="bg-purple-50 dark:bg-purple-950/50 text-purple-600"
        />
      </div>

      {/* Unit Usaha Performance Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-500" />
            <span>Kinerja Unit Usaha</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_UNITS.map((unit) => (
            <UnitPerformanceCard key={unit.tenantId} unit={unit} />
          ))}
        </div>
      </div>
    </div>
  );
};
