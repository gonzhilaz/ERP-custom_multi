'use client';

import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Layers } from 'lucide-react';
import { IncomeStatementLine } from '@/lib/mock/financial-reports';

interface Props {
  incomeStatement: IncomeStatementLine[];
  totalRevenue: number;
  totalCogs: number;
  grossProfit: number;
  totalOperatingExpenses: number;
  netIncome: number;
  grossMarginPercentage: string;
  netMarginPercentage: string;
}

export const ProfitLossReportTab = ({
  incomeStatement,
  totalRevenue,
  totalCogs,
  grossProfit,
  totalOperatingExpenses,
  netIncome,
  grossMarginPercentage,
  netMarginPercentage
}: Props) => {
  const revenueLines = incomeStatement.filter((i) => i.category === 'REVENUE');
  const cogsLines = incomeStatement.filter((i) => i.category === 'COGS');
  const opexLines = incomeStatement.filter((i) => i.category === 'OPERATING_EXPENSE');

  return (
    <div className="space-y-4 text-xs">
      {/* P&L Executive Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-400 font-semibold">Total Pendapatan Konsolidasi</div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-slate-400 font-semibold">Semua Unit Bisnis</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-400 font-semibold">Total HPP / COGM Produksi</div>
          <div className="text-xl font-bold text-rose-600 dark:text-rose-400 font-mono">
            Rp {totalCogs.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-slate-400 font-semibold">Bahan Baku & Produksi</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-400 font-semibold">Laba Kotor (Gross Profit)</div>
          <div className="text-xl font-bold text-sky-600 dark:text-sky-400 font-mono">
            Rp {grossProfit.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-emerald-600 font-bold">Margin Kotor: {grossMarginPercentage}%</div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="text-[10px] text-slate-400 font-semibold">Laba Bersih Konsolidasi (Net Income)</div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            Rp {netIncome.toLocaleString('id-ID')}
          </div>
          <div className="text-[10px] text-emerald-600 font-bold">Margin Bersih: {netMarginPercentage}%</div>
        </div>
      </div>

      {/* Main Income Statement Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white flex justify-between">
          <span>Laporan Laba Rugi Konsolidasi vs Segmen Unit Usaha (P&L Multi-Unit)</span>
          <span className="font-mono text-slate-400 text-[10px]">Mata Uang: IDR (Rp)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-4 font-mono">Kode Rekening & Nama Akun</th>
                <th className="py-2.5 px-4 text-right">Holding Total</th>
                <th className="py-2.5 px-4 text-right">Toko Roti & Retail</th>
                <th className="py-2.5 px-4 text-right">Resto & Catering</th>
                <th className="py-2.5 px-4 text-right">Hotelier PMS</th>
                <th className="py-2.5 px-4 text-right">Tambang Emas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {/* REVENUE SECTION */}
              <tr className="bg-emerald-500/10 font-bold text-emerald-800 dark:text-emerald-300">
                <td colSpan={6} className="py-2 px-4 uppercase text-[10px]">I. PENDAPATAN USAHA (REVENUE)</td>
              </tr>
              {revenueLines.map((line) => (
                <tr key={line.accountCode} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-2.5 px-4 font-mono">
                    <span className="font-bold text-sky-600 mr-2">{line.accountCode}</span>
                    <span>{line.accountName}</span>
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-600">Rp {line.holdingTotal.toLocaleString('id-ID')}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-500">{line.bakeryRetail ? `Rp ${line.bakeryRetail.toLocaleString('id-ID')}` : '-'}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-500">{line.restoFnB ? `Rp ${line.restoFnB.toLocaleString('id-ID')}` : '-'}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-500">{line.hotelPms ? `Rp ${line.hotelPms.toLocaleString('id-ID')}` : '-'}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-500">{line.miningOps ? `Rp ${line.miningOps.toLocaleString('id-ID')}` : '-'}</td>
                </tr>
              ))}

              {/* COGS SECTION */}
              <tr className="bg-rose-500/10 font-bold text-rose-800 dark:text-rose-300">
                <td colSpan={6} className="py-2 px-4 uppercase text-[10px]">II. HARGA POKOK PENJUALAN / COGM (COGS)</td>
              </tr>
              {cogsLines.map((line) => (
                <tr key={line.accountCode} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-2.5 px-4 font-mono">
                    <span className="font-bold text-rose-600 mr-2">{line.accountCode}</span>
                    <span>{line.accountName}</span>
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-rose-600">Rp {line.holdingTotal.toLocaleString('id-ID')}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-500">{line.bakeryRetail ? `Rp ${line.bakeryRetail.toLocaleString('id-ID')}` : '-'}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-500">{line.restoFnB ? `Rp ${line.restoFnB.toLocaleString('id-ID')}` : '-'}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-500">{line.hotelPms ? `Rp ${line.hotelPms.toLocaleString('id-ID')}` : '-'}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-500">{line.miningOps ? `Rp ${line.miningOps.toLocaleString('id-ID')}` : '-'}</td>
                </tr>
              ))}

              {/* OPERATING EXPENSE SECTION */}
              <tr className="bg-amber-500/10 font-bold text-amber-800 dark:text-amber-300">
                <td colSpan={6} className="py-2 px-4 uppercase text-[10px]">III. BEBAN OPERASIONAL (OPERATING EXPENSES)</td>
              </tr>
              {opexLines.map((line) => (
                <tr key={line.accountCode} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-2.5 px-4 font-mono">
                    <span className="font-bold text-amber-600 mr-2">{line.accountCode}</span>
                    <span>{line.accountName}</span>
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-amber-600">Rp {line.holdingTotal.toLocaleString('id-ID')}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-500">{line.bakeryRetail ? `Rp ${line.bakeryRetail.toLocaleString('id-ID')}` : '-'}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-500">{line.restoFnB ? `Rp ${line.restoFnB.toLocaleString('id-ID')}` : '-'}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-500">{line.hotelPms ? `Rp ${line.hotelPms.toLocaleString('id-ID')}` : '-'}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-500">{line.miningOps ? `Rp ${line.miningOps.toLocaleString('id-ID')}` : '-'}</td>
                </tr>
              ))}

              {/* NET INCOME SUMMARY ROW */}
              <tr className="bg-slate-900 text-white font-bold text-sm">
                <td className="py-3 px-4 uppercase font-mono">LABA BERSIH KONSOLIDASI (NET INCOME)</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400">Rp {netIncome.toLocaleString('id-ID')}</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400">Rp 168.000.000</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400">Rp 232.000.000</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400">Rp 195.000.000</td>
                <td className="py-3 px-4 text-right font-mono text-emerald-400">Rp 2.385.000.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
