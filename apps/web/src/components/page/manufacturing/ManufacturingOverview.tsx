'use client';

import React from 'react';
import { Factory, Layers, PlayCircle, CheckCircle2, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { BomRecipeItem, WorkOrderItem } from '@/lib/mock/manufacturing';

interface Props {
  recipes: BomRecipeItem[];
  workOrders: WorkOrderItem[];
  activeWorkOrdersCount: number;
  completedWorkOrdersCount: number;
}

export const ManufacturingOverview = ({
  recipes,
  workOrders,
  activeWorkOrdersCount,
  completedWorkOrdersCount
}: Props) => {
  const totalCogmInProduction = workOrders
    .filter((w) => w.status === 'IN_PRODUCTION' || w.status === 'RELEASED')
    .reduce((acc, curr) => acc + curr.totalEstimatedCogm, 0);

  const domainCounts = {
    BAKERY: recipes.filter((r) => r.category === 'BAKERY').length,
    RESTO: recipes.filter((r) => r.category === 'RESTO').length,
    MINING: recipes.filter((r) => r.category === 'MINING').length,
    HOTEL: recipes.filter((r) => r.category === 'HOTEL').length,
    RETAIL_ASSEMBLY: recipes.filter((r) => r.category === 'RETAIL_ASSEMBLY').length
  };

  return (
    <div className="space-y-4">
      {/* Dynamic Multi-Domain Banner */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl border border-sky-800/40 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-800/40 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Manufaktur & Formulasi Universal</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 font-mono">
                  Zero Hardcoded
                </span>
              </h2>
              <p className="text-[11px] text-slate-300">
                Sistem formulasi BOM & batch produksi otomatis untuk Toko Roti, Restoran, Tambang Emas, Hotel, & Retail Packaging.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono">
            <span className="px-2.5 py-1 bg-amber-500/10 text-amber-300 rounded-lg border border-amber-500/30 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Auto COGM Journal
            </span>
          </div>
        </div>

        {/* Domain Recipe Distribution Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 pr-1">Formulasi Aktif:</span>
          <span className="px-2.5 py-1 bg-amber-500/10 text-amber-300 rounded-lg border border-amber-500/20 font-semibold">
            🍞 Toko Roti ({domainCounts.BAKERY})
          </span>
          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-300 rounded-lg border border-emerald-500/20 font-semibold">
            🍲 Resto & F&B ({domainCounts.RESTO})
          </span>
          <span className="px-2.5 py-1 bg-yellow-500/10 text-yellow-300 rounded-lg border border-yellow-500/20 font-semibold">
            ⛏️ Tambang Emas ({domainCounts.MINING})
          </span>
          <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 rounded-lg border border-indigo-500/20 font-semibold">
            🏨 Hotel Laundry ({domainCounts.HOTEL})
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Master Formulasi BOM</span>
            <Layers className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{recipes.length}</div>
          <div className="text-[11px] text-slate-500">Resep & Formulasi Aktif</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Work Order Produksi</span>
            <PlayCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono">{activeWorkOrdersCount}</div>
          <div className="text-[11px] text-slate-500">Batch Dalam Proses (WIP)</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Batch Produksi Selesai</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">{completedWorkOrdersCount}</div>
          <div className="text-[11px] text-slate-500">Siap Masuk Stok Gudang</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Estimasi Nilai COGM Active</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 font-mono truncate">
            Rp {totalCogmInProduction.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-500">Total HPP Batch Berjalan</div>
        </div>
      </div>

      {/* Progress Bars & Active WO Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center justify-between">
            <span>Kemajuan Produksi Hari Ini</span>
            <span className="font-mono text-[10px] text-sky-600 font-bold">
              {completedWorkOrdersCount} / {workOrders.length} Completed
            </span>
          </h3>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${workOrders.length > 0 ? (completedWorkOrdersCount / workOrders.length) * 100 : 0}%`
              }}
            />
          </div>

          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Stok Bahan Baku Terpotong Otomatis</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Terposting ke Finance COA `1-10210`</span>
          </div>
        </div>

        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-amber-800 dark:text-amber-300">Peringatan Pemakaian Bahan Baku (Raw Material Reorder)</h4>
            <p className="text-[11px] text-amber-700 dark:text-amber-400">
              Peluncuran Work Order Toko Roti & Peleburan Tambang Emas membutuhkan ketersediaan persediaan Tepung Terigu, Gula, & Bahan Kimia Sianida di Gudang Utama.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
