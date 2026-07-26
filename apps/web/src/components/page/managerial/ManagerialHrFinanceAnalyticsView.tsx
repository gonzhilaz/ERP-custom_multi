'use client';

import React, { useState } from 'react';
import { BarChart3, HelpCircle, X, Users, DollarSign, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useHrFinanceAnalytics } from '@/hooks/managerial/useHrFinanceAnalytics';

export const ManagerialHrFinanceAnalyticsView = () => {
  const { ratios, totalHoldingHeadcount, totalHoldingRevenue, totalHoldingPayroll, averagePayrollRatio } = useHrFinanceAnalytics();
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Analitik SDM & Finance</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-purple-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-purple-400">
                  <span>Executive HR-Finance Analytics</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Analisis rasio efisiensi biaya SDM (Payroll + Tunjangan) terhadap Omset Pendapatan (*Payroll-to-Revenue Ratio*) serta produktivitas *Revenue Per Employee*.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overview Executive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Total Karyawan Holding</div>
          <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-500" />
            <span>{totalHoldingHeadcount} Orang</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Total Omset Bulanan</div>
          <div className="text-lg font-bold text-emerald-600 font-mono">
            Rp {(totalHoldingRevenue / 1000000000).toFixed(1)} Miliar
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Total Beban Payroll</div>
          <div className="text-lg font-bold text-rose-600 font-mono">
            Rp {(totalHoldingPayroll / 1000000000).toFixed(2)} Miliar
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Rasio Payroll vs Omset</div>
          <div className="text-lg font-bold text-purple-600 font-mono">
            {averagePayrollRatio}% (SEHAT)
          </div>
        </div>
      </div>

      {/* Unit Usaha Ratio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ratios.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-mono">
                {item.domainCategory}
              </span>
              <span className="text-xs font-bold text-slate-500">{item.totalHeadcount} Karyawan</span>
            </div>

            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.tenantName}</h4>

            {/* Visual Ratio Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Rasio Gaji vs Omset:</span>
                <strong className={item.status === 'WARNING' ? 'text-amber-600 font-mono font-bold' : 'text-emerald-600 font-mono font-bold'}>
                  {item.payrollToRevenueRatio}% (Maks Ambang: {item.targetRatioThreshold}%)
                </strong>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    item.status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (item.payrollToRevenueRatio / item.targetRatioThreshold) * 100)}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Revenue per Employee: <strong className="text-slate-900 dark:text-white font-mono">Rp {item.revenuePerEmployee.toLocaleString('id-ID')}</strong></span>
              {item.status === 'WARNING' ? (
                <span className="text-amber-600 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 animate-pulse" /> OVER THRESHOLD
                </span>
              ) : (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> EFEKTIF
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
