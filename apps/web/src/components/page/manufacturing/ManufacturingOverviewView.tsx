'use client';

import React from 'react';
import { Factory, Play, Boxes, ShieldCheck, AlertTriangle, BarChart3, PieChart } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const ManufacturingOverviewView = () => {
  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Pusat Analitik & Operasional Pabrikasi (Manufacturing Overview)"
        icon={Factory}
        iconBgColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        glossaryTitle="Glossary Manufaktur & Resep Produksi"
        glossaryItems={[{ term: 'Work Order Efficiency', description: 'Metrik persentase penyelesaian WO dibanding target jadwal pabrikasi.' }]}
        badges={[
          { label: 'OEE Line 1 & Line 2 Active', variant: 'emerald' },
          { label: 'ISO 9001 Quality Control', variant: 'sky' }
        ]}
      />

      {/* Warning Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-xs">Peringatan Pabrikasi: Stock Material BOM Low & Servis Mesin Roll</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300">
              Stok Gula Halus Kemasan 50kg mendekati batas minimum produksi WO-88 dan Mesin Mixer Line-02 dijadwalkan maintenance.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold shrink-0">
          <span className="px-2 py-1 bg-amber-500/20 rounded-lg">Low BOM Stock</span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Active Work Orders" value="14 WO" subtitle="Dalam Proses Produksi Line" icon={Play} iconBgColor="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50" />
        <KpiCard title="Total Resep BOM" value="28 Formulir" subtitle="Standar Hasil Produksi" icon={Factory} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Bahan Baku Terpakai" value="1.850 Kg" subtitle="Pemotongan Stok Gudang" icon={Boxes} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Rasio Yield QC" value="98.5%" subtitle="Standar Mutu Lulus Pass" icon={ShieldCheck} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Production Output Chart */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              <span>Volume Output Produksi Pabrik (Pcs/Hari)</span>
            </h3>
            <span className="font-mono text-[10px] text-indigo-600 font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md">OEE: 88.4%</span>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-slate-800">
            {[
              { day: 'Shift-1', val: 4200 },
              { day: 'Shift-2', val: 4800 },
              { day: 'Shift-3', val: 3900 },
              { day: 'Shift-4', val: 5100 },
              { day: 'Shift-5', val: 4600 }
            ].map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full bg-indigo-500 rounded-t-md transition-all group-hover:bg-indigo-400" style={{ height: `${(d.val / 6000) * 100}%` }} />
                <span className="text-[10px] font-mono text-slate-400 font-medium">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-slate-500">Target Shift Output: 5.000 Pcs</span>
            <span className="font-mono text-indigo-600 font-bold">Total: 22.600 Pcs</span>
          </div>
        </div>

        {/* BOM Consumption Breakdown Progress Bars */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-500" />
              <span>Efisiensi Material BOM & Scrap Rate</span>
            </h3>
            <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">Scrap Rate: 1.5%</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Tepung Terigu & Mentega Utama (BOM-01)', kg: '1.200 Kg', pct: 65, color: 'bg-indigo-500' },
              { name: 'Gula Halus & Chocolate Compound (BOM-02)', kg: '450 Kg', pct: 24, color: 'bg-sky-500' },
              { name: 'Kemasan Plastik Vacuum & Carton Box', kg: '200 Kg', pct: 11, color: 'bg-emerald-500' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{item.kg} ({item.pct}%)</span>
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

