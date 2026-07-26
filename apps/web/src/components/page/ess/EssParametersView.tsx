'use client';

import React from 'react';
import { Sliders, Plus } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface EssParamItem {
  id: string;
  claimCategory: string;
  maxClaimPerMonth: string;
  receiptRequired: string;
  autoApprovalMax: string;
}

const MOCK_ESS_PARAMS: EssParamItem[] = [
  { id: 'ep-01', claimCategory: 'Bensin & BBM Dinas (Reimburse)', maxClaimPerMonth: 'Rp 1.500.000', receiptRequired: 'WAJIB_FOTO_NOTA', autoApprovalMax: 'Rp 200.000' }
];

export const EssParametersView = () => {
  const columns: ColumnDef<EssParamItem>[] = [
    { key: 'claimCategory', header: 'Kategori Klaim Struk', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.claimCategory },
    { key: 'maxClaimPerMonth', header: 'Batas Pagu Per Bulan', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.maxClaimPerMonth },
    { key: 'receiptRequired', header: 'Persyaratan Lampiran Struk', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded">{i.receiptRequired}</span> },
    { key: 'autoApprovalMax', header: 'Batas Auto-Approve Supervisor', align: 'right', className: 'font-mono text-sky-600 dark:text-sky-400', render: (i) => i.autoApprovalMax }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Aturan ESS"
        icon={Sliders}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Parameter Mandiri Karyawan"
        glossaryItems={[{ term: 'Pagu Klaim Mandiri', description: 'Batas plafon klaim pengeluaran dinas & aturan lampiran nota fisik.' }]}
        actions={
          <button onClick={() => alert('Tambah Aturan Klaim Baru')} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Aturan Klaim Baru</span>
          </button>
        }
      />
      <DataTable headerTitle="Master Parameter Plafon Klaim Reimbursement & Cuti Mandiri Karyawan" columns={columns} data={MOCK_ESS_PARAMS} keyExtractor={(i) => i.id} />
    </div>
  );
};
