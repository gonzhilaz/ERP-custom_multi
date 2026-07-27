'use client';

import React from 'react';
import { WorkerTypeItem } from '@/lib/mock/hrd';
import { Users, Trash2 } from 'lucide-react';

interface Props {
  workerTypes: WorkerTypeItem[];
  canMutate: boolean;
  onSoftDeleteWorkerType: (id: string, name: string) => void;
}

import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

export const HrdPayrollWorkerTypesTab = ({
  workerTypes,
  canMutate,
  onSoftDeleteWorkerType
}: Props) => {
  return (
    <DataTable
      headerTitle={`Tipe Pekerja & Formula Penggajian (${workerTypes.length})`}
      columns={[
        { key: 'code', header: 'Kode', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (wt) => wt.code },
        { key: 'name', header: 'Nama Tipe Pekerja', className: 'font-bold text-slate-900 dark:text-white', render: (wt) => wt.name },
        {
          key: 'category',
          header: 'Kategori',
          render: (wt) => (
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-[10px] text-slate-600 dark:text-slate-300">
              {wt.category}
            </span>
          )
        },
        {
          key: 'expression',
          header: 'Formula Penggajian',
          className: 'font-mono text-[11px] text-emerald-600 dark:text-emerald-400',
          render: (wt) => (
            <span className="bg-emerald-50/50 dark:bg-emerald-950/20 px-2 py-1 rounded border border-emerald-200/50 dark:border-emerald-800/50 block">
              {wt.expression}
            </span>
          )
        },
        { key: 'salaryCoa', header: 'Tautan COA Beban Gaji', className: 'font-mono text-[10px] text-slate-500', render: (wt) => wt.salaryCoa },
        {
          key: 'actions',
          header: 'Aksi',
          align: 'center',
          sortable: false,
          render: (wt) => (
            <button
              onClick={() => onSoftDeleteWorkerType(wt.id, wt.name)}
              className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
              title="Soft-Delete Tipe Pekerja"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )
        }
      ]}
      data={workerTypes}
      keyExtractor={(wt) => wt.id}
    />
  );
};
