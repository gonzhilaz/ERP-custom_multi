'use client';

import React, { useState } from 'react';
import { DollarSign, HelpCircle, X, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useSpecializedIndustries } from '@/hooks/useSpecializedIndustries';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';

export const ManagerialBudgetingView = () => {
  const { budgets } = useSpecializedIndustries();
  const [showGlossary, setShowGlossary] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBudgets = budgets.filter((b) => b.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) || b.unitUsaha.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Anggaran & Budget</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-emerald-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-emerald-400">
                  <span>Corporate Budgeting & Variance</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Alokasi anggaran tahunan departemen vs realisasi pengeluaran kas operasional.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Search Filter Component */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Alokasi Anggaran Departemen</h3>
        <DynamicSearchFilter searchQuery={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Cari nama departemen atau unit usaha..." />
      </div>

      {/* Budget Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBudgets.map((b) => (
          <div key={b.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono">{b.budgetCode}</span>
              <span className="text-xs font-bold text-slate-500">{b.unitUsaha}</span>
            </div>

            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{b.departmentName}</h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] text-slate-400">Plafon Anggaran:</div>
                <div className="font-bold font-mono text-slate-900 dark:text-white">Rp {b.allocatedAmount.toLocaleString('id-ID')}</div>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] text-slate-400">Realisasi Pakai:</div>
                <div className="font-bold font-mono text-emerald-600">Rp {b.actualSpent.toLocaleString('id-ID')}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Sisa Variansi: <strong className={b.varianceAmount < 0 ? 'text-rose-600 font-mono' : 'text-emerald-600 font-mono'}>Rp {b.varianceAmount.toLocaleString('id-ID')}</strong></span>
              {b.status === 'WARNING_OVER' ? (
                <span className="text-rose-600 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> OVER BUDGET
                </span>
              ) : (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> ON TRACK
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
