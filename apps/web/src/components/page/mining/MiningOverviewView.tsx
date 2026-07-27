'use client';

import React from 'react';
import { Pickaxe, Truck, Fuel, ShieldCheck, AlertTriangle, BarChart3, PieChart } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const MiningOverviewView = () => {
  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Pusat Operasional & Analitik Tambang (Mining Site Overview)"
        icon={Pickaxe}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Operasional Site Tambang"
        glossaryItems={[{ term: 'Stripping Ratio', description: 'Rasio batas pengupasan tanah penutup (OB) terhadap tonnase ore emas.' }]}
        badges={[
          { label: 'K3LL & Safety Zero Incident', variant: 'emerald' },
          { label: 'Heavy Fleet Telematics Active', variant: 'amber' }
        ]}
      />

      {/* Warning Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-xs">Peringatan Operasional Site Tambang: Cuaca Hujan & Fleet Service</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300">
              Jalur Hauling KM 12 licin akibat hujan lebat 2 jam lalu (Slick Road Warning) dan Excavator CAT-04 dalam jadwal servis berkala.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold shrink-0">
          <span className="px-2 py-1 bg-amber-500/20 rounded-lg">Slow Hauling Speed</span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Production Ore Yield" value="23.250 Ton" subtitle="Target Bulan Ini 25.000 Ton" icon={Pickaxe} iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50" />
        <KpiCard title="Total Hauling Ritase" value="1.420 Rit" subtitle="Dump Truck CAT 777" icon={Truck} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Konsumsi Solar HSD" value="64.120 Liter" subtitle="Solar Industri Site" icon={Fuel} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Heavy Fleet Uptime" value="94.2%" subtitle="KIR & Service Readiness" icon={ShieldCheck} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Hauling Output Chart */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-500" />
              <span>Volume Tonase Hauling Harian (Pit ke Stockpile)</span>
            </h3>
            <span className="font-mono text-[10px] text-amber-600 font-bold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">Avg: 775 Ton/Hari</span>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-slate-800">
            {[
              { day: 'Sen', tons: 720 },
              { day: 'Sel', tons: 810 },
              { day: 'Rab', tons: 850 },
              { day: 'Kam', tons: 790 },
              { day: 'Jum', tons: 880 },
              { day: 'Sab', tons: 690 },
              { day: 'Min', tons: 600 }
            ].map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full bg-amber-500 rounded-t-md transition-all group-hover:bg-amber-400" style={{ height: `${(d.tons / 1000) * 100}%` }} />
                <span className="text-[10px] font-mono text-slate-400 font-medium">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-500">Kapasitas Maksimal Crusher: 1.200 Ton/Hari</span>
            <span className="font-mono text-amber-600 font-bold">Effisiensi: 80.5%</span>
          </div>
        </div>

        {/* Fleet Fuel & Ore Quality Breakdown */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-500" />
              <span>Efisiensi Konsumsi Solar Fleet & Kualitas Ore</span>
            </h3>
            <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">Lab Pass Rate: 98.6%</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Dump Truck CAT 777 (Hauling Main)', liters: '38.400 L', pct: 60, color: 'bg-amber-500' },
              { name: 'Excavator Heavy Digging Pit-A', liters: '16.000 L', pct: 25, color: 'bg-sky-500' },
              { name: 'Genset & Power Plant Site Camp', liters: '6.400 L', pct: 10, color: 'bg-emerald-500' },
              { name: 'Kendaraan Support LV Hilux Patrol', liters: '3.320 L', pct: 5, color: 'bg-purple-500' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{item.liters} ({item.pct}%)</span>
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

