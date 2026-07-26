'use client';

import React from 'react';
import { HardHat, Fuel, Boxes, Truck, Activity, ShieldAlert, Sparkles } from 'lucide-react';
import { HeavyFleetItem, OreProductionLog } from '@/lib/mock/mining';

interface Props {
  fleets: HeavyFleetItem[];
  oreLogs: OreProductionLog[];
  totalOreTonnage: number;
  totalFuelDispersed: number;
  operationalFleetCount: number;
}

export const MiningOverviewTab = ({
  fleets,
  oreLogs,
  totalOreTonnage,
  totalFuelDispersed,
  operationalFleetCount
}: Props) => {
  const avgGrade =
    oreLogs.length > 0
      ? (oreLogs.reduce((acc, curr) => acc + curr.oreGradeGramsPerTon, 0) / oreLogs.length).toFixed(2)
      : '0.00';

  return (
    <div className="space-y-4 text-xs">
      {/* Header Banner */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-2xl border border-amber-800/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
            <HardHat className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Pertambangan Emas PT. Braxit</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 font-mono">
                Site Pit Block 4 Kutai & Berau
              </span>
            </h2>
            <p className="text-[11px] text-slate-300">
              Pengawasan tonase galian bijih emas (ore), konsumsi solar HSD heavy fleet, & kesiapan armada tambang.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Kadar Emas Rata-rata: {avgGrade} g/t
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex justify-between">
            <span>Total Tonase Bijih Emas (Ore)</span>
            <Boxes className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">
            {totalOreTonnage.toLocaleString('id-ID')} Ton
          </div>
          <div className="text-[11px] text-slate-500">Terangkut dari Pit ke Stockpile Yard</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex justify-between">
            <span>Pengeluaran Solar HSD</span>
            <Fuel className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-xl font-bold text-sky-600 dark:text-sky-400 font-mono">
            {totalFuelDispersed.toLocaleString('id-ID')} Liter
          </div>
          <div className="text-[11px] text-slate-500">Konsumsi BBM Alat Berat Site</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex justify-between">
            <span>Armada Operasional (Ready)</span>
            <Truck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {operationalFleetCount} / {fleets.length} Unit
          </div>
          <div className="text-[11px] text-slate-500">Excavator & Dump Truck Active</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex justify-between">
            <span>Rata-Rata Gold Ore Grade</span>
            <Activity className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-mono">
            {avgGrade} Gram / Ton
          </div>
          <div className="text-[11px] text-slate-500">Hasil Tes Lab Kadar Emas Pit</div>
        </div>
      </div>

      {/* Fleet Readiness Status List */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-500" />
            <span>Kesiapan Alat Berat & Level BBM Site</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Heavy Fleet Telematics</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {fleets.map((f) => {
            const fuelPct = Math.round((f.currentFuelLevel / f.maxTankCapacity) * 100);
            return (
              <div key={f.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">{f.code}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    f.status === 'OPERATIONAL' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800 animate-pulse'
                  }`}>
                    {f.status}
                  </span>
                </div>

                <div className="font-bold text-slate-900 dark:text-white truncate">{f.name}</div>
                <div className="text-[10px] text-slate-400">{f.siteLocation} • Op: {f.operatorName}</div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500">Level Tangki Solar:</span>
                    <span className="font-mono font-bold text-sky-600">{f.currentFuelLevel} / {f.maxTankCapacity} L ({fuelPct}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${fuelPct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
