'use client';

import React from 'react';
import { Calculator, CheckCircle2, TrendingDown, RefreshCw } from 'lucide-react';
import { FixedAssetDepreciationItem } from '@/lib/mock/asset-depreciation';

interface Props {
  assets: FixedAssetDepreciationItem[];
  selectedPeriod: string;
  isPosting: boolean;
  postMonthlyDepreciationJournal: (assetId?: string) => void;
}

export const AssetDepreciationScheduleTab = ({
  assets,
  selectedPeriod,
  isPosting,
  postMonthlyDepreciationJournal
}: Props) => {
  return (
    <div className="space-y-4 text-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white flex justify-between items-center">
          <span>Jadwal Penyusutan Aset</span>
          <span className="font-mono text-slate-400 text-[10px]">Auto-Post to GL (`6-2001` / `1-2901`)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4 font-mono">Kode Aset</th>
                <th className="py-3 px-4">Nama Aset & Kategori</th>
                <th className="py-3 px-4 text-right">Harga Perolehan (Rp)</th>
                <th className="py-3 px-4 text-right font-bold text-rose-600">Penyusutan / Bln (Rp)</th>
                <th className="py-3 px-4 text-right">Akumulasi Penyusutan (Rp)</th>
                <th className="py-3 px-4 text-right font-bold text-emerald-600">Nilai Buku Bersih (NBV)</th>
                <th className="py-3 px-4 text-center">Periode Terakhir Posted</th>
                <th className="py-3 px-4 text-center">Aksi Post Jurnal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {assets.map((ast) => {
                const isPostedThisPeriod = ast.lastJournalPostedPeriod === selectedPeriod;

                return (
                  <tr key={ast.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{ast.assetCode}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{ast.assetName}</div>
                      <div className="text-[10px] text-slate-400">
                        {ast.category} • Masa Manfaat: {ast.usefulLifeYears} Thn
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold">
                      Rp {ast.acquisitionCost.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-rose-600">
                      Rp {ast.monthlyDepreciationAmount.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-500">
                      Rp {ast.accumulatedDepreciationTotal.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      Rp {ast.netBookValue.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-center font-mono">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isPostedThisPeriod ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {ast.lastJournalPostedPeriod || 'Belum'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        disabled={isPosting || isPostedThisPeriod}
                        onClick={() => postMonthlyDepreciationJournal(ast.id)}
                        className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white font-bold text-[10px] rounded-lg transition-all flex items-center gap-1 mx-auto cursor-pointer disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isPostedThisPeriod ? '✓ Posted' : 'Post GL'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
