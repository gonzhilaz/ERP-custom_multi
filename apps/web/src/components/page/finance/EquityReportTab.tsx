'use client';

import React, { useState } from 'react';
import { Layers, Download, Eye } from 'lucide-react';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

export const EquityReportTab = () => {
  const [period, setPeriod] = useState('2026-07');
  const [selectedEquityItem, setSelectedEquityItem] = useState<{ title: string; shareCapital: string; additionalPaidIn: string; retainedEarnings: string; total: string } | null>(null);

  const equityRows = [
    { title: 'Saldo Awal per 1 Juli 2026', shareCapital: '1.000.000.000', additionalPaidIn: '150.000.000', retainedEarnings: '420.000.000', total: '1.570.000.000', isPositive: true },
    { title: '+ Setoran Modal Pemegang Saham Baru', shareCapital: '200.000.000', additionalPaidIn: '0', retainedEarnings: '0', total: '200.000.000', isPositive: true },
    { title: '+ Laba Bersih Periode Berjalan (Net Income)', shareCapital: '0', additionalPaidIn: '0', retainedEarnings: '485.200.000', total: '485.200.000', isPositive: true },
    { title: '- Pembagian Dividen Tunai Pemegang Saham', shareCapital: '0', additionalPaidIn: '0', retainedEarnings: '(50.000.000)', total: '(50.000.000)', isPositive: false }
  ];

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
                <th className="p-3 text-center">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {equityRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className={`p-3 font-bold ${row.isPositive ? 'text-slate-900 dark:text-white' : 'text-rose-600 dark:text-rose-400'}`}>{row.title}</td>
                  <td className="p-3 text-right font-mono">{row.shareCapital}</td>
                  <td className="p-3 text-right font-mono">{row.additionalPaidIn}</td>
                  <td className="p-3 text-right font-mono">{row.retainedEarnings}</td>
                  <td className="p-3 text-right font-mono font-bold text-sky-600 dark:text-sky-400">{row.total}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedEquityItem(row)}
                      className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
                      title="Lihat Detail Ekuitas"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-sky-500/10 font-bold border-t-2 border-slate-300 dark:border-slate-700">
                <td className="p-3 text-slate-900 dark:text-white uppercase font-extrabold">Saldo Akhir Ekuitas per 31 Juli 2026</td>
                <td className="p-3 text-right font-mono text-sky-600 dark:text-sky-400">1.200.000.000</td>
                <td className="p-3 text-right font-mono text-sky-600 dark:text-sky-400">150.000.000</td>
                <td className="p-3 text-right font-mono text-sky-600 dark:text-sky-400">855.200.000</td>
                <td className="p-3 text-right font-mono text-sky-600 dark:text-sky-400 text-sm font-extrabold">2.205.200.000</td>
                <td className="p-3 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedEquityItem !== null}
        onClose={() => setSelectedEquityItem(null)}
        title="Drilldown Perubahan Ekuitas Modal"
        subtitle={selectedEquityItem?.title}
        badgeLabel="EQUITY RECORD"
        badgeType="ACTIVE"
        summaryCards={[
          { label: 'Total Perubahan Ekuitas', value: `Rp ${selectedEquityItem?.total || '0'}`, color: 'text-sky-600' },
          { label: 'Modal Saham Disetor', value: `Rp ${selectedEquityItem?.shareCapital || '0'}` },
          { label: 'Laba Ditahan', value: `Rp ${selectedEquityItem?.retainedEarnings || '0'}` }
        ]}
        metadata={[
          { label: 'Uraian Komponen Ekuitas', value: selectedEquityItem?.title, highlight: true },
          { label: 'Modal Saham Disetor (Rp)', value: selectedEquityItem?.shareCapital, mono: true },
          { label: 'Tambahan Modal / Agio (Rp)', value: selectedEquityItem?.additionalPaidIn, mono: true },
          { label: 'Laba Ditahan / Retained Earnings (Rp)', value: selectedEquityItem?.retainedEarnings, mono: true },
          { label: 'Total Ekuitas (Rp)', value: selectedEquityItem?.total, mono: true }
        ]}
        footerNotes="Perubahan ekuitas merekam setoran modal, akumulasi laba bersih, dan pembagian dividen tunai."
      />
    </div>
  );
};

