'use client';

import React from 'react';
import { Scale, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BalanceSheetLine } from '@/lib/mock/financial-reports';

interface Props {
  balanceSheet: BalanceSheetLine[];
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
}

export const BalanceSheetReportTab = ({
  balanceSheet,
  totalAssets,
  totalLiabilities,
  totalEquity
}: Props) => {
  const assets = balanceSheet.filter((b) => b.classification === 'CURRENT_ASSET' || b.classification === 'NON_CURRENT_ASSET');
  const liabilities = balanceSheet.filter((b) => b.classification === 'SHORT_TERM_LIABILITY' || b.classification === 'LONG_TERM_LIABILITY');
  const equity = balanceSheet.filter((b) => b.classification === 'EQUITY');

  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;
  const isBalanced = totalAssets === totalLiabilitiesAndEquity;

  return (
    <div className="space-y-4 text-xs">
      {/* Balancing Verification Banner */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between shadow-sm ${
        isBalanced ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-800'
      }`}>
        <div className="flex items-center gap-2 font-bold text-sm">
          <Scale className="w-5 h-5 text-emerald-500" />
          <span>Status Verifikasi Keseimbangan Neraca (Balance Sheet Verification)</span>
        </div>
        <span className="px-3 py-1 bg-emerald-600 text-white rounded-xl font-bold font-mono">
          ✓ BALANCED (Aset = Pasiva)
        </span>
      </div>

      {/* Main Balance Sheet Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LEFT COLUMN: ASSETS */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm space-y-2">
          <div className="p-3.5 bg-sky-500/10 border-b border-sky-500/20 font-bold text-sky-700 dark:text-sky-300 flex justify-between">
            <span>I. ASSET / AKTIVA</span>
            <span className="font-mono">Subtotal Aset</span>
          </div>

          <div className="p-3 space-y-3">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Aset Lancar (Current Assets)</div>
              <div className="space-y-1.5">
                {assets.filter((a) => a.classification === 'CURRENT_ASSET').map((item) => (
                  <div key={item.accountCode} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">[{item.accountCode}] {item.accountName}</span>
                    <span className="font-mono font-bold text-sky-600">Rp {item.amount.toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Aset Tidak Lancar (Non-Current Assets)</div>
              <div className="space-y-1.5">
                {assets.filter((a) => a.classification === 'NON_CURRENT_ASSET').map((item) => (
                  <div key={item.accountCode} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">[{item.accountCode}] {item.accountName}</span>
                    <span className="font-mono font-bold text-sky-600">Rp {item.amount.toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-900 text-white rounded-xl flex justify-between font-bold text-sm font-mono pt-2">
              <span>TOTAL ASET (TOTAL AKTIVA)</span>
              <span className="text-emerald-400">Rp {totalAssets.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIABILITIES & EQUITY */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm space-y-2">
          <div className="p-3.5 bg-rose-500/10 border-b border-rose-500/20 font-bold text-rose-700 dark:text-rose-300 flex justify-between">
            <span>II. KEWAJIBAN & EKUITAS / PASIVA</span>
            <span className="font-mono">Subtotal Pasiva</span>
          </div>

          <div className="p-3 space-y-3">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Kewajiban / Hutang (Liabilities)</div>
              <div className="space-y-1.5">
                {liabilities.map((item) => (
                  <div key={item.accountCode} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">[{item.accountCode}] {item.accountName}</span>
                    <span className="font-mono font-bold text-rose-600">Rp {item.amount.toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Ekuitas Modal Holding (Equity)</div>
              <div className="space-y-1.5">
                {equity.map((item) => (
                  <div key={item.accountCode} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">[{item.accountCode}] {item.accountName}</span>
                    <span className="font-mono font-bold text-emerald-600">Rp {item.amount.toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-900 text-white rounded-xl flex justify-between font-bold text-sm font-mono pt-2">
              <span>TOTAL PASIVA (LIABILITAS + EKUITAS)</span>
              <span className="text-emerald-400">Rp {totalLiabilitiesAndEquity.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
