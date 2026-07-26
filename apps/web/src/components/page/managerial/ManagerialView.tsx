'use client';

import React, { useState } from 'react';
import { BarChart3, PieChart, FileText, HelpCircle, X } from 'lucide-react';
import { useManagerial } from '@/hooks/managerial/useManagerial';
import { BudgetTable } from '@/components/ui/tables/BudgetTable';
import { SkeletonTable } from '@/components/ui/loader/skeleton/SkeletonTable';

export const ManagerialView = () => {
  const {
    budgets,
    documents,
    loading,
    activeTab,
    setActiveTab,
    totalBudgetAllocated,
    totalActualSpent,
    overallUtilization
  } = useManagerial();
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-500" />
            <span>Manajerial & Budgeting</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Manajerial & Budgeting"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Manajerial</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Budgeting vs Actual</strong>: Pemantauan alokasi anggaran belanja operasional & modal per divisi unit bisnis.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Document Vault (DMS)</strong>: Arsip izin operasional (IUP Tambang, Sertifikat BPOM, HGB).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary KPI Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-400 font-medium">Total Anggaran Holding</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Rp {totalBudgetAllocated.toLocaleString('id-ID')}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-400 font-medium">Realisasi Pengeluaran</div>
          <div className="text-xl font-bold text-sky-600 dark:text-sky-400 mt-1">
            Rp {totalActualSpent.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            Serapan: {overallUtilization}%
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs text-slate-400 font-medium">Dokumen Legal DMS</div>
          <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">
            {documents.length} Dokumen
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Status Valid</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 text-xs font-medium">
        <button
          onClick={() => setActiveTab('BUDGET')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'BUDGET'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Budgeting vs Actual</span>
        </button>
        <button
          onClick={() => setActiveTab('DMS')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'DMS'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Dokumen Legal (DMS)</span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <SkeletonTable />
      ) : activeTab === 'BUDGET' ? (
        <BudgetTable items={budgets} />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Arsip Legalitas Usaha</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                    {doc.category}
                  </span>
                  <span className="text-[10px] font-mono text-sky-600 font-bold">{doc.documentNumber}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{doc.title}</h4>
                <div className="text-xs text-slate-500">Unit Usaha: {doc.unitUsaha}</div>
                <div className="text-[11px] text-slate-400">
                  Masa Berlaku: {doc.issueDate} s/d <span className="font-bold text-slate-700 dark:text-slate-200">{doc.expiryDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
