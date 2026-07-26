import React from 'react';
import { TenantUnit } from '@/lib/mock/units';

interface UnitPerformanceCardProps {
  unit: TenantUnit;
}

export const UnitPerformanceCard: React.FC<UnitPerformanceCardProps> = ({ unit }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 hover:border-sky-500/50 transition-all shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
            {unit.industryCategory}
          </span>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1">{unit.name}</h3>
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg">
          {unit.profitGrowth} Profit
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div>
          <div className="text-slate-400 text-[10px]">Omset</div>
          <div className="font-bold">Rp {(unit.monthlyRevenue / 1000000).toLocaleString('id-ID')} Jt</div>
        </div>
        <div>
          <div className="text-slate-400 text-[10px]">Beban</div>
          <div className="font-bold">Rp {(unit.monthlyExpense / 1000000).toLocaleString('id-ID')} Jt</div>
        </div>
        <div>
          <div className="text-slate-400 text-[10px]">Laba Bersih</div>
          <div className="font-bold text-emerald-600">Rp {(unit.netProfit / 1000000).toLocaleString('id-ID')} Jt</div>
        </div>
      </div>
    </div>
  );
};
