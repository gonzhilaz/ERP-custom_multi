'use client';

import React, { useState } from 'react';
import { Layers, TrendingUp, DollarSign, Building2, Eye } from 'lucide-react';
import { UnitProfitabilitySegment } from '@/lib/mock/financial-reports';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

interface Props {
  unitProfitability: UnitProfitabilitySegment[];
}

export const UnitProfitabilityReportTab = ({ unitProfitability }: Props) => {
  const [selectedUnit, setSelectedUnit] = useState<UnitProfitabilitySegment | null>(null);

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Profitabilitas Unit</h2>
          </div>
        </div>
      </div>

      {/* Main Unit Profitability Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {unitProfitability.map((unit) => (
          <div key={unit.unitCode} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <span className="font-mono text-[10px] text-sky-600 font-bold">{unit.unitCode}</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{unit.unitName}</h3>
                <span className="text-[10px] text-slate-400 font-medium">{unit.industry}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl text-xs font-bold font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Net Margin: {unit.netMarginPct}%
                </span>
                <button
                  onClick={() => setSelectedUnit(unit)}
                  className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
                  title="Lihat Detail Profitabilitas Unit"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-0.5">
                <div className="text-[10px] text-slate-400">Total Omset Pendapatan</div>
                <div className="font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  Rp {unit.revenue.toLocaleString('id-ID')}
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-0.5">
                <div className="text-[10px] text-slate-400">Laba Bersih (Net Profit)</div>
                <div className="font-bold font-mono text-sky-600 dark:text-sky-400">
                  Rp {unit.netProfit.toLocaleString('id-ID')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedUnit !== null}
        onClose={() => setSelectedUnit(null)}
        title="Detail Profitabilitas Unit Bisnis (Segment Intelligence)"
        subtitle={selectedUnit ? `${selectedUnit.unitCode} • ${selectedUnit.unitName}` : ''}
        badgeLabel={`Margin: ${selectedUnit?.netMarginPct}%`}
        badgeType="ACTIVE"
        summaryCards={[
          { label: 'Omset Pendapatan', value: selectedUnit ? `Rp ${selectedUnit.revenue.toLocaleString('id-ID')}` : '0', color: 'text-emerald-600' },
          { label: 'Laba Bersih (Net Profit)', value: selectedUnit ? `Rp ${selectedUnit.netProfit.toLocaleString('id-ID')}` : '0', color: 'text-sky-600' },
          { label: 'Net Profit Margin', value: `${selectedUnit?.netMarginPct}%` }
        ]}
        metadata={[
          { label: 'Kode Unit Usaha', value: selectedUnit?.unitCode, mono: true, highlight: true },
          { label: 'Nama Unit Bisnis / Tenant', value: selectedUnit?.unitName },
          { label: 'Sektor Industri Domain', value: selectedUnit?.industry },
          { label: 'Total Omset Gross (Rp)', value: selectedUnit ? `Rp ${selectedUnit.revenue.toLocaleString('id-ID')}` : 'Rp 0', mono: true },
          { label: 'Laba Net Bersih (Rp)', value: selectedUnit ? `Rp ${selectedUnit.netProfit.toLocaleString('id-ID')}` : 'Rp 0', mono: true }
        ]}
        footerNotes="Metrik profitabilitas unit bisnis dihitung dari jurnal akumulasi transaksi riil per tenant."
      />
    </div>
  );
};

