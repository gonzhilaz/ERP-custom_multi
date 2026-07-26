'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, Sparkles, DollarSign, Layers } from 'lucide-react';
import { ModuleSubscriptionItem } from '@/lib/mock/settings';

interface Props {
  subscriptions: ModuleSubscriptionItem[];
  totalActiveModules: number;
  totalMonthlySubscriptionCost: number;
  toggleModuleStatus: (id: string) => void;
}

export const ModuleSubscriptionTab = ({
  subscriptions,
  totalActiveModules,
  totalMonthlySubscriptionCost,
  toggleModuleStatus
}: Props) => {
  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-500" />
            <span>Paket Modul ({totalActiveModules})</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-500/20 font-bold">
            Biaya Langganan: Rp {totalMonthlySubscriptionCost.toLocaleString('id-ID')}/Bulan
          </div>
        </div>
      </div>

      {/* Modules Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {subscriptions.map((mod) => (
          <div
            key={mod.id}
            className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
              mod.isEnabled
                ? 'bg-white dark:bg-slate-900 border-sky-500/40 shadow-sm ring-1 ring-sky-500/10'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-75'
            }`}
          >
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {mod.category}
                </span>
                <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400 font-bold">{mod.code}</span>
              </div>

              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{mod.name}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{mod.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Rp {mod.monthlyFee.toLocaleString('id-ID')}/bln
              </div>

              <button
                onClick={() => toggleModuleStatus(mod.id)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1 cursor-pointer ${
                  mod.isEnabled
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {mod.isEnabled ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Aktif</span>
                  </>
                ) : (
                  <span>Non-Aktif</span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
