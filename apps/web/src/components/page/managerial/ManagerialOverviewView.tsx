'use client';

import React from 'react';
import { BarChart3, PieChart, TrendingUp, DollarSign, AlertTriangle, ShieldCheck, Building2 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const ManagerialOverviewView = () => {
  return (
    <div className="space-y-4 text-xs">
      {/* Module Header */}
      <ModuleHeader
        title="Dashboard Eksekutif & Intelijen Konsolidasi (Managerial Overview)"
        icon={BarChart3}
        iconBgColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        glossaryTitle="Glossary Managerial Intelligence"
        glossaryItems={[
          { term: 'EBITDA Group', description: 'Pendapatan sebelum bunga, pajak, depresiasi, & amortisasi seluruh unit usaha.' },
          { term: 'Budget Variance', description: 'Persentase selisih realisasi belanja vs batas anggaran holding yang disetujui.' }
        ]}
        badges={[
          { label: '5 Tenant Business Units', variant: 'emerald' },
          { label: 'Real-time Group Consolidation', variant: 'sky' }
        ]}
      />

      {/* Warning Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-xs">Peringatan Manajemen: Variance Anggaran Sektor Retail Roti</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300">
              Pengeluaran bahan baku sektor Retail Roti melebihi target anggaran bulanan (+8.2%), memerlukan audit efisiensi HPP.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold shrink-0">
          <span className="px-2 py-1 bg-amber-500/20 rounded-lg">+8.2% Budget Variance</span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Return on Equity (ROE)" value="24.8%" subtitle="+4.2% vs Target Q3" icon={TrendingUp} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="EBITDA Konsolidasi" value="Rp 2.850.000.000" subtitle="Margin Operasional 32%" icon={PieChart} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Serapan Anggaran" value="93.1%" subtitle="Efisien & Terkendali" icon={DollarSign} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
        <KpiCard title="Total Omset Group" value="Rp 8.920.000.000" subtitle="5 Sektor Usaha" icon={Building2} iconBgColor="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50" />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Business Unit Revenue & Profit Bar Chart */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-500" />
              <span>Kontribusi Omset & Net Profit per Sektor Usaha</span>
            </h3>
            <span className="font-mono text-[10px] text-purple-600 font-bold bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-md">Konsolidasi</span>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-slate-800">
            {[
              { unit: 'Pertambangan', rev: 95, profit: 45 },
              { unit: 'Hotelier', rev: 75, profit: 32 },
              { unit: 'Resto & Catering', rev: 82, profit: 38 },
              { unit: 'Retail Roti', rev: 55, profit: 22 },
              { unit: 'Holding HQ', rev: 40, profit: 18 }
            ].map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div className="w-3/7 bg-indigo-500 rounded-t-md transition-all group-hover:bg-indigo-400" style={{ height: `${d.rev}%` }} />
                  <div className="w-3/7 bg-emerald-400 rounded-t-md transition-all group-hover:bg-emerald-300" style={{ height: `${d.profit}%` }} />
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-medium truncate max-w-full">{d.unit}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /><span>Omset (Revenue)</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /><span>Laba Bersih (Net Profit)</span></div>
            </div>
          </div>
        </div>

        {/* Budget Serapan Progress Bars */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-sky-500" />
              <span>Kepatuhan Realisasi Anggaran (Budget Variance)</span>
            </h3>
            <span className="font-mono text-[10px] text-sky-600 font-bold bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-md">Target: &lt; 95%</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Sektor Pertambangan Batu Bara & Fleet', spent: 'Rp 2.40 M', pct: 92, color: 'bg-indigo-500' },
              { name: 'Sektor Hotelier & Resort Hospitality', spent: 'Rp 1.15 M', pct: 88, color: 'bg-sky-500' },
              { name: 'Sektor Catering Massal & Resto', spent: 'Rp 1.45 M', pct: 94, color: 'bg-emerald-500' },
              { name: 'Sektor Retail Bakery & Store', spent: 'Rp 420 Jt', pct: 108, color: 'bg-rose-500' },
              { name: 'Beban Operasional Holding HQ', spent: 'Rp 650 Jt', pct: 85, color: 'bg-purple-500' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{item.spent} ({item.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${Math.min(item.pct, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

