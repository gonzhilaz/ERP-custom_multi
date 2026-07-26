'use client';

import React from 'react';
import { Factory, PieChart, Boxes } from 'lucide-react';
import { CogmBreakdownLine } from '@/lib/mock/financial-reports';

interface Props {
  cogmBreakdown: CogmBreakdownLine[];
}

export const CogmReportTab = ({ cogmBreakdown }: Props) => {
  const totalCogm = cogmBreakdown.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
            <Factory className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Laporan HPP</h2>
          </div>
        </div>

        <div className="font-mono text-right">
          <div className="text-[10px] text-slate-400 font-semibold">Total Biaya Produksi (COGM)</div>
          <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
            Rp {totalCogm.toLocaleString('id-ID')}
          </div>
        </div>
      </div>

      {/* COGM Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Komponen Biaya Produksi</th>
                <th className="py-3 px-4">Deskripsi Rincian Biaya</th>
                <th className="py-3 px-4 text-right">Nominal (Rp)</th>
                <th className="py-3 px-4 text-center">Persentase (%) Total HPP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {cogmBreakdown.map((line, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-600 font-mono">
                      {line.costCategory}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold">{line.description}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                    Rp {line.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-sky-600">
                    {line.percentageOfTotal}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
