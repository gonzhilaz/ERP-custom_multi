'use client';

import React, { useState } from 'react';
import { Layers, Download } from 'lucide-react';

export const EquityReportTab = () => {
  const [period, setPeriod] = useState('2026-07');

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center">
        <span className="font-bold text-slate-900 dark:text-white">Laporan Perubahan Ekuitas (Statement of Changes in Equity)</span>
        <div className="flex items-center gap-2">
          <input type="month" value={period} onChange={(e) => setPeriod(e.target.value)} className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-slate-900 dark:text-white font-bold" />
          <button className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Download className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
        <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wide">PT HOLDING ENTERPRISE INDONESIA TBD</h2>
          <h3 className="text-sm font-extrabold text-sky-600 dark:text-sky-400 uppercase">LAPORAN PERUBAHAN EKUITAS (STATEMENT OF CHANGES IN EQUITY)</h3>
          <p className="text-[11px] text-slate-500 font-mono">Untuk Periode Yang Berakhir Pada 31 Juli 2026 (Dalam Rupiah)</p>
        </div>

        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Uraian Komponen Ekuitas</th>
                <th className="p-3 text-right">Modal Saham Disetor (Rp)</th>
                <th className="p-3 text-right">Tambahan Modal (Agio) (Rp)</th>
                <th className="p-3 text-right">Laba Ditahan (Retained Earnings) (Rp)</th>
                <th className="p-3 text-right font-extrabold">Total Ekuitas (Rp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-white">Saldo Awal per 1 Juli 2026</td>
                <td className="p-3 text-right font-mono">1.000.000.000</td>
                <td className="p-3 text-right font-mono">150.000.000</td>
                <td className="p-3 text-right font-mono">420.000.000</td>
                <td className="p-3 text-right font-mono font-bold text-sky-600 dark:text-sky-400">1.570.000.000</td>
              </tr>
              <tr>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+ Setoran Modal Pemegang Saham Baru</td>
                <td className="p-3 text-right font-mono text-emerald-600">200.000.000</td>
                <td className="p-3 text-right font-mono">0</td>
                <td className="p-3 text-right font-mono">0</td>
                <td className="p-3 text-right font-mono text-emerald-600 font-bold">200.000.000</td>
              </tr>
              <tr>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">+ Laba Bersih Periode Berjalan (Net Income Juli 2026)</td>
                <td className="p-3 text-right font-mono">0</td>
                <td className="p-3 text-right font-mono">0</td>
                <td className="p-3 text-right font-mono text-emerald-600">485.200.000</td>
                <td className="p-3 text-right font-mono text-emerald-600 font-bold">485.200.000</td>
              </tr>
              <tr>
                <td className="p-3 text-rose-600 dark:text-rose-400 font-bold">- Pembagian Dividen Tunai Pemegang Saham</td>
                <td className="p-3 text-right font-mono">0</td>
                <td className="p-3 text-right font-mono">0</td>
                <td className="p-3 text-right font-mono text-rose-600">(50.000.000)</td>
                <td className="p-3 text-right font-mono text-rose-600 font-bold">(50.000.000)</td>
              </tr>
              <tr className="bg-sky-500/10 font-bold border-t-2 border-slate-300 dark:border-slate-700">
                <td className="p-3 text-slate-900 dark:text-white uppercase font-extrabold">Saldo Akhir Ekuitas per 31 Juli 2026</td>
                <td className="p-3 text-right font-mono text-sky-600 dark:text-sky-400">1.200.000.000</td>
                <td className="p-3 text-right font-mono text-sky-600 dark:text-sky-400">150.000.000</td>
                <td className="p-3 text-right font-mono text-sky-600 dark:text-sky-400">855.200.000</td>
                <td className="p-3 text-right font-mono text-sky-600 dark:text-sky-400 text-sm font-extrabold">2.205.200.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
