'use client';

import React from 'react';
import { History, CheckCircle2, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { DepreciationAuditLog } from '@/lib/mock/asset-depreciation';

interface Props {
  auditLogs: DepreciationAuditLog[];
}

export const AssetDepreciationAuditTab = ({ auditLogs }: Props) => {
  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-sky-500" />
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Audit Log</h2>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Waktu Eksekusi</th>
                <th className="py-3 px-4 font-mono">Periode Disusutkan</th>
                <th className="py-3 px-4">Eksekutor Accountant</th>
                <th className="py-3 px-4 font-mono">No. Referensi Jurnal GL</th>
                <th className="py-3 px-4 text-center">Jumlah Aset</th>
                <th className="py-3 px-4 text-right font-bold text-rose-600">Total Nominal Jurnal (Rp)</th>
                <th className="py-3 px-4">Catatan Keterangan Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{log.timestamp}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-600">{log.postedPeriod}</td>
                  <td className="py-3 px-4 font-semibold">{log.executedBy}</td>
                  <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{log.journalReference}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold">{log.totalAssetsCount} Aset</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-rose-600">
                    Rp {log.totalJournalAmount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-4 text-[11px] text-slate-500">{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
