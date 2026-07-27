'use client';

import React from 'react';
import { UtensilsCrossed, Calendar, Truck, DollarSign, AlertTriangle, BarChart3, PieChart } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const CateringOverviewView = () => {
  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Catering Overview"
        icon={UtensilsCrossed}
        iconBgColor="bg-orange-500/10 text-orange-600 dark:text-orange-400"
        glossaryTitle="Glossary Catering Massal"
        glossaryItems={[{ term: 'Mass Catering', description: 'Pengelolaan suplai makanan porsi besar (1.000+ pax) untuk event & site tambang.' }]}
        badges={[
          { label: 'HACCP & Halal Certified', variant: 'emerald' },
          { label: 'Site & Event Delivery Active', variant: 'sky' }
        ]}
      />

      {/* Warning Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-xs">Peringatan Ekspedisi Delivery Site & Perishable Ingredients</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300">
              Jadwal pengiriman 1.500 pax ke Mess Hall Site Braxit Tambang diajukan 30 menit awal (05:30 WITA) antisipasi cuaca hujan.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold shrink-0">
          <span className="px-2 py-1 bg-amber-500/20 rounded-lg">1.500 Pax Prepared</span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Porsi Bulan Ini" value="45.800 Pax" subtitle="Event & Mess Hall (+8.5%)" icon={UtensilsCrossed} iconBgColor="bg-orange-50 text-orange-600 dark:bg-orange-950/50" />
        <KpiCard title="Kontrak Active" value="12 Event" subtitle="Catering Massal Corporate" icon={Calendar} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Ekspedisi Delivery" value="18 Rute" subtitle="Surat Jalan Terbit" icon={Truck} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Pendapatan Catering" value="Rp 1.374.000.000" subtitle="Gross Revenue Margin 34%" icon={DollarSign} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Pax Production Chart */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-orange-500" />
              <span>Volume Produksi Porsi Catering (Harian)</span>
            </h3>
            <span className="font-mono text-[10px] text-orange-600 font-bold bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-md">Avg: 1.520 Pax/Hari</span>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-slate-800">
            {[
              { day: 'Sen', pax: 1400 },
              { day: 'Sel', pax: 1550 },
              { day: 'Rab', pax: 1600 },
              { day: 'Kam', pax: 1480 },
              { day: 'Jum', pax: 1720 },
              { day: 'Sab', pax: 1350 },
              { day: 'Min', pax: 1200 }
            ].map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full bg-orange-500 rounded-t-md transition-all group-hover:bg-orange-400" style={{ height: `${(d.pax / 1800) * 100}%` }} />
                <span className="text-[10px] font-mono text-slate-400 font-medium">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-500">Kapasitas Kitchen Utama: 2.500 Pax/Shift</span>
            <span className="font-mono text-orange-600 font-bold">Utilisasi: 68.8%</span>
          </div>
        </div>

        {/* Food Cost Margin Breakdown */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-500" />
              <span>Komposisi HPP Biaya Produksi Catering</span>
            </h3>
            <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">Food Cost: 42%</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Bahan Daging & Seafood Utama', amount: 'Rp 384 Jt', pct: 42, color: 'bg-orange-500' },
              { name: 'Sayur, Beras, & Bumbu Dapur', amount: 'Rp 220 Jt', pct: 24, color: 'bg-emerald-500' },
              { name: 'Kemasan Catering & Food Box', amount: 'Rp 145 Jt', pct: 16, color: 'bg-sky-500' },
              { name: 'Logistik Bensin Delivery Truck', amount: 'Rp 110 Jt', pct: 12, color: 'bg-purple-500' },
              { name: 'Gas LPG & Utility Kitchen', amount: 'Rp 55 Jt', pct: 6, color: 'bg-amber-500' }
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

