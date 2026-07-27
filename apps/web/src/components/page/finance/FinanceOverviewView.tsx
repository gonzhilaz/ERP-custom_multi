'use client';

import React from 'react';
import { Wallet, TrendingUp, DollarSign, Globe, AlertTriangle, ArrowUpRight, ArrowDownRight, PieChart, ShieldAlert, BarChart3 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const FinanceOverviewView = () => {
  return (
    <div className="space-y-4 text-xs">
      {/* Module Header */}
      <ModuleHeader
        title="Keuangan & Kas"
        icon={DollarSign}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Finance Overview"
        glossaryItems={[
          { term: 'Cash Flow Net', description: 'Surplus/Defisit arus kas dari aktivitas operasional, investasi, & pendanaan.' },
          { term: 'AR/AP Ratio', description: 'Rasio kesehatan perbandingan piutang usaha (AR) terhadap utang usaha (AP).' }
        ]}
        badges={[
          { label: 'Real-time Consolidated GL', variant: 'emerald' },
          { label: 'Multi-Currency Active', variant: 'sky' }
        ]}
      />

      {/* Warning Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-xs">Peringatan Keuangan: Pelaporan PPh 21 & Invoice AP Overdue</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300">
              Terdapat 2 invoice AP sebesar Rp 185.000.000 mendekati jatuh tempo 3 hari lagi, dan batas SPT Masa PPh 21 tanggal 20.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold shrink-0">
          <span className="px-2 py-1 bg-amber-500/20 rounded-lg">2 Overdue AP</span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Kas & Bank"
          value="Rp 1.700.000.000"
          subtitle="Mandiri & Petty Cash (+12.4%)"
          icon={Wallet}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50"
        />
        <KpiCard
          title="Saldo Valas (USD)"
          value="$ 25,000.00 USD"
          subtitle="Rate Rp 16.200 / USD"
          icon={Globe}
          iconBgColor="bg-blue-50 text-blue-600 dark:bg-blue-950/50"
        />
        <KpiCard
          title="Piutang Usaha (AR)"
          value="Rp 340.000.000"
          subtitle="Aging < 30 Hari (High Liquidity)"
          icon={TrendingUp}
          iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50"
        />
        <KpiCard
          title="Utang Usaha (AP)"
          value="Rp 210.000.000"
          subtitle="Jatuh Tempo Bulan Ini"
          icon={DollarSign}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50"
        />
      </div>

      {/* Analytical Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cash In vs Cash Out Monthly Trend Chart */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-500" />
              <span>Tren Arus Kas (Cash In vs Cash Out)</span>
            </h3>
            <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">+14.2% Net Inflow</span>
          </div>

          {/* Responsive Visual Bar Chart */}
          <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-slate-800">
            {[
              { month: 'Jan', inVal: 65, outVal: 45 },
              { month: 'Feb', inVal: 78, outVal: 52 },
              { month: 'Mar', inVal: 85, outVal: 60 },
              { month: 'Apr', inVal: 70, outVal: 55 },
              { month: 'Mei', inVal: 92, outVal: 68 },
              { month: 'Jun', inVal: 100, outVal: 72 }
            ].map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div className="w-3/7 bg-emerald-500 rounded-t-md transition-all group-hover:bg-emerald-400" style={{ height: `${d.inVal}%` }} />
                  <div className="w-3/7 bg-rose-400 rounded-t-md transition-all group-hover:bg-rose-300" style={{ height: `${d.outVal}%` }} />
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-medium">{d.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span>Kas Masuk (Inflow)</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400" /><span>Kas Keluar (Outflow)</span></div>
            </div>
            <span className="font-mono text-slate-500 font-semibold">Total Net: Rp 840 Jt</span>
          </div>
        </div>

        {/* Liquid Asset Allocation Progress Bars */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-sky-500" />
              <span>Distribusi Alokasi Likuiditas Kas & Bank</span>
            </h3>
            <span className="font-mono text-[10px] text-sky-600 font-bold bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-md">Total: Rp 1.70 M</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Bank Mandiri Corporate (IDR)', amount: 'Rp 1.100.000.000', pct: 64.7, color: 'bg-emerald-500' },
              { name: 'Bank BCA Giro Operational', amount: 'Rp 420.000.000', pct: 24.7, color: 'bg-sky-500' },
              { name: 'Kas Valas USD (Mandiri)', amount: 'Rp 150.000.000', pct: 8.8, color: 'bg-indigo-500' },
              { name: 'Petty Cash Holding HQ', amount: 'Rp 30.000.000', pct: 1.8, color: 'bg-amber-500' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{item.amount} ({item.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

