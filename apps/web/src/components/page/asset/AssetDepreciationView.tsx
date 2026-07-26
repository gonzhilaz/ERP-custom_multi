'use client';

import React, { useState } from 'react';
import { Calculator, Calendar, CheckCircle2, TrendingDown, HelpCircle, X, ShieldCheck, History } from 'lucide-react';
import { useAssetDepreciation } from '@/hooks/asset/useAssetDepreciation';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { AssetDepreciationScheduleTab } from './AssetDepreciationScheduleTab';
import { AssetDepreciationRulesTab } from './AssetDepreciationRulesTab';
import { AssetDepreciationAuditTab } from './AssetDepreciationAuditTab';

export const AssetDepreciationView = () => {
  const [activeTab, setActiveTab] = useState<'SCHEDULE' | 'RULES' | 'AUDIT'>('SCHEDULE');
  const [showGlossary, setShowGlossary] = useState(false);

  const {
    assets,
    taxRules,
    auditLogs,
    selectedPeriod,
    setSelectedPeriod,
    isPosting,
    totalAcquisitionCost,
    totalAccumulatedDepreciation,
    totalNetBookValue,
    totalMonthlyDepreciationExpense,
    addTaxRule,
    postMonthlyDepreciationJournal
  } = useAssetDepreciation();

  const subTabs: SubTabItem[] = [
    { id: 'SCHEDULE', label: 'Jadwal', icon: Calculator, count: assets.length },
    { id: 'RULES', label: 'Aturan Pajak', icon: ShieldCheck, count: taxRules.length },
    { id: 'AUDIT', label: 'Audit Log', icon: History, count: auditLogs.length }
  ];

  return (
    <div className="space-y-4">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Penyusutan Aset"
        icon={Calculator}
        iconBgColor="bg-rose-500/10 text-rose-600 dark:text-rose-400"
        glossaryTitle="Glossary Penyusutan Aset"
        glossaryItems={[
          { term: 'Garislurus (Straight-Line)', description: '(Harga Perolehan - Nilai Sisa) / Masa Manfaat.' },
          { term: 'PMK 72/2023', description: 'Pengelompokan masa manfaat aset pajak (Kelompok 1, 2, 3, 4, Bangunan).' }
        ]}
        actions={
          <>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="2026-07">📅 Periode Penyusutan: Juli 2026</option>
              <option value="2026-06">📅 Periode Penyusutan: Juni 2026</option>
            </select>

            <button
              disabled={isPosting}
              onClick={() => postMonthlyDepreciationJournal()}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Auto-Post GL</span>
            </button>
          </>
        }
      />

      {/* Top Asset Executive KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-400 font-semibold">Total Harga Perolehan Aset</div>
          <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">
            Rp {totalAcquisitionCost.toLocaleString('id-ID')}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-400 font-semibold">Total Akumulasi Penyusutan</div>
          <div className="text-lg font-bold text-rose-600 dark:text-rose-400 font-mono">
            Rp {totalAccumulatedDepreciation.toLocaleString('id-ID')}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-400 font-semibold">Nilai Buku Bersih (Net Book Value)</div>
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            Rp {totalNetBookValue.toLocaleString('id-ID')}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-400 font-semibold">Beban Penyusutan Bulanan</div>
          <div className="text-lg font-bold text-amber-600 dark:text-amber-400 font-mono">
            Rp {totalMonthlyDepreciationExpense.toLocaleString('id-ID')} / bln
          </div>
        </div>
      </div>

      {/* SubTab Navigation */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab as any}
        tabs={subTabs}
        colorScheme="emerald"
      />

      {/* Dynamic SubTab Views */}
      {activeTab === 'SCHEDULE' && (
        <AssetDepreciationScheduleTab
          assets={assets}
          selectedPeriod={selectedPeriod}
          isPosting={isPosting}
          postMonthlyDepreciationJournal={postMonthlyDepreciationJournal}
        />
      )}

      {activeTab === 'RULES' && (
        <AssetDepreciationRulesTab
          taxRules={taxRules}
          addTaxRule={addTaxRule}
        />
      )}

      {activeTab === 'AUDIT' && (
        <AssetDepreciationAuditTab
          auditLogs={auditLogs}
        />
      )}
    </div>
  );
};
