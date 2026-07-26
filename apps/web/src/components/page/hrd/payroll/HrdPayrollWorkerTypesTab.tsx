'use client';

import React from 'react';
import { WorkerTypeItem } from '@/lib/mock/hrd';
import { Users, Trash2 } from 'lucide-react';

interface Props {
  workerTypes: WorkerTypeItem[];
  canMutate: boolean;
  onSoftDeleteWorkerType: (id: string, name: string) => void;
}

export const HrdPayrollWorkerTypesTab = ({
  workerTypes,
  canMutate,
  onSoftDeleteWorkerType
}: Props) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm text-xs">
      <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-sky-500" />
          <span>Tipe Pekerja & Formula Penggajian (Zero Hardcoded)</span>
        </span>
        <span className="text-[11px] text-slate-400 font-mono">{workerTypes.length} Active Master Configs</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3 px-4">Kode</th>
              <th className="py-3 px-4">Nama Tipe Pekerja</th>
              <th className="py-3 px-4">Kategori</th>
              <th className="py-3 px-4 font-mono">Formula Penggajian</th>
              <th className="py-3 px-4 font-mono">Tautan COA Beban Gaji</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {workerTypes.map((wt) => (
              <tr key={wt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{wt.code}</td>
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{wt.name}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-[10px] text-slate-600 dark:text-slate-300">
                    {wt.category}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 px-2 py-1 rounded border border-emerald-200/50 dark:border-emerald-800/50">
                  {wt.expression}
                </td>
                <td className="py-3 px-4 font-mono text-[10px] text-slate-500">{wt.salaryCoa}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onSoftDeleteWorkerType(wt.id, wt.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Soft-Delete Tipe Pekerja"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
