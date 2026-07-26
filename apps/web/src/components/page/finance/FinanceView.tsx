'use client';

import React, { useState } from 'react';
import { Wallet, Plus, BookOpen, FileSpreadsheet, Building, HelpCircle, X } from 'lucide-react';
import { useFinance } from '@/hooks/finance/useFinance';
import { CoaTable } from '@/components/ui/tables/CoaTable';
import { SkeletonTable } from '@/components/ui/loader/skeleton/SkeletonTable';

export const FinanceView = () => {
  const { coaList, loading, activeTab, setActiveTab } = useFinance();
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-sky-500" />
            <span>Finance & Akuntansi</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Finance & Akuntansi"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Financial Engine</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Standardized COA</strong>: Bagan akun standar holding untuk konsolidasi otomatis seluruh unit bisnis.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Inter-Company Journal</strong>: Jurnal otomatis pencatatan dan eliminasi transaksi antar unit usaha.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Buat Jurnal</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 text-xs font-medium">
        <button
          onClick={() => setActiveTab('COA')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'COA'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Chart of Accounts (COA)</span>
        </button>
        <button
          onClick={() => setActiveTab('JOURNAL')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'JOURNAL'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>General Ledger</span>
        </button>
      </div>

      {/* Main Content */}
      {loading ? (
        <SkeletonTable />
      ) : activeTab === 'COA' ? (
        <CoaTable items={coaList} />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between p-4 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-100 dark:border-sky-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-sky-600 text-white rounded-xl">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-sky-900 dark:text-sky-200">Inter-Company Elimination Active</h4>
                <p className="text-[11px] text-sky-700 dark:text-sky-400">
                  Transaksi internal antar anak perusahaan otomatis ditiadakan di konsolidasi Holding.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
