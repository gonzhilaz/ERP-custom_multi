import React from 'react';
import { CoaItem } from '@/lib/mock/finance';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';

interface CoaTableProps {
  items: CoaItem[];
}

export const CoaTable: React.FC<CoaTableProps> = ({ items }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Struktur Kode Akun Seragam Holding</span>
        <span className="text-[11px] text-emerald-600 font-semibold">Multi-Currency Enabled</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3 px-4">Kode Akun</th>
              <th className="py-3 px-4">Nama Akun</th>
              <th className="py-3 px-4">Tipe Akun</th>
              <th className="py-3 px-4">Mata Uang</th>
              <th className="py-3 px-4 text-right">Saldo Saat Ini</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {items.map((item) => (
              <tr key={item.code} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{item.code}</td>
                <td className="py-3 px-4 font-medium">{item.name}</td>
                <td className="py-3 px-4">
                  <StatusBadge type={item.type} />
                </td>
                <td className="py-3 px-4 font-semibold">{item.currency}</td>
                <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white">{item.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
