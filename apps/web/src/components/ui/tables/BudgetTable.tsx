import React from 'react';
import { BudgetItem } from '@/lib/mock/managerial';

interface BudgetTableProps {
  items: BudgetItem[];
}

export const BudgetTable: React.FC<BudgetTableProps> = ({ items }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Alokasi Budgeting vs Realisasi Actual Keuangan</span>
        <span className="text-[11px] text-slate-400">Total {items.length} Pos Anggaran</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3 px-4">Unit Usaha</th>
              <th className="py-3 px-4">Pos Anggaran (Category)</th>
              <th className="py-3 px-4 text-right">Alokasi Anggaran</th>
              <th className="py-3 px-4 text-right">Realisasi Actual</th>
              <th className="py-3 px-4 text-right">Selisih (Variance)</th>
              <th className="py-3 px-4 text-center">% Penggunaan</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {items.map((bgt) => (
              <tr key={bgt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{bgt.unitUsaha}</td>
                <td className="py-3 px-4 font-medium">{bgt.category}</td>
                <td className="py-3 px-4 text-right font-semibold">Rp {bgt.budgetAllocated.toLocaleString('id-ID')}</td>
                <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white">Rp {bgt.actualSpent.toLocaleString('id-ID')}</td>
                <td className={`py-3 px-4 text-right font-semibold ${bgt.variance < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  Rp {bgt.variance.toLocaleString('id-ID')}
                </td>
                <td className="py-3 px-4 text-center font-bold font-mono">
                  {bgt.utilizationPercentage}%
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    bgt.status === 'ON_TRACK' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' :
                    'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                  }`}>
                    {bgt.status === 'ON_TRACK' ? 'ON TRACK' : 'OVER BUDGET'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
