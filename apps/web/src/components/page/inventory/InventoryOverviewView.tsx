'use client';

import React from 'react';
import { Boxes, AlertTriangle, PackageCheck, TrendingUp, ShieldAlert, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { KpiCard } from '@/components/ui/cards/KpiCard';
import { useInventory } from '@/hooks/inventory/useInventory';

export const InventoryOverviewView = () => {
  const { allItems, alertItems } = useInventory();
  const totalValuation = allItems.reduce((acc, i) => acc + i.costPerUnit * i.stockQty, 0);

  return (
    <div className="space-y-4">
      {/* Ultra-Clean Header Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Boxes className="w-5 h-5 text-sky-500" />
          <span>Inventory Overview</span>
        </h1>
      </div>

      {/* Top 4 Key KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Valuasi Stok"
          value={`Rp ${totalValuation.toLocaleString('id-ID')}`}
          subtitle="HPP FIFO & Average"
          icon={Boxes}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50"
        />
        <KpiCard
          title="Batas Kritis Minimum"
          value={`${alertItems.length} SKU`}
          subtitle="Memerlukan Re-Order"
          icon={AlertTriangle}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50"
        />
        <KpiCard
          title="Total SKU"
          value={`${allItems.length} SKU`}
          subtitle="Multi-Unit UOM"
          icon={PackageCheck}
          iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50"
        />
        <KpiCard
          title="Rotasi Stok"
          value="84% Optimum"
          subtitle="Turnover Rate"
          icon={TrendingUp}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50"
        />
      </div>

      {/* Inventory Health & Stock Movement Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Fast Moving vs Slow Moving Items */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Analisis Perputaran Stok</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 space-y-1">
              <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-300 font-bold">
                <span>Fast Moving</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <p className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">14 SKU</p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-bold">
                <span>Slow Moving</span>
                <ArrowDownRight className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">2 SKU</p>
            </div>
          </div>
        </div>

        {/* Stock Level Warning Banner */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Status Safety Stock</span>
            </h3>
            <span className="text-[10px] text-amber-600 font-bold bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-full">
              Buffer Active
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-medium">
              <span>Stok Dalam Kondisi Aman</span>
              <span className="font-mono font-bold text-emerald-600">85% SKU</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
            </div>

            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-medium pt-1">
              <span>Stok Dalam Re-Order Minimum</span>
              <span className="font-mono font-bold text-amber-600">15% SKU</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[15%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
