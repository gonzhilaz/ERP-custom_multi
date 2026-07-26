'use client';

import React from 'react';
import { Sliders, Plus } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface ManagerialParamItem {
  id: string;
  paramCode: string;
  paramName: string;
  thresholdLimit: string;
  autoEscalationRole: string;
}

const MOCK_MGR_PARAMS: ManagerialParamItem[] = [
  { id: 'mp-01', paramCode: 'LIMIT-BUDGET-EXCEED', paramName: 'Batas Deviasi Anggaran Operasional (%)', thresholdLimit: '> 5.0% Over Budget', autoEscalationRole: 'VP_FINANCE' }
];

export const ManagerialParametersView = () => {
  const columns: ColumnDef<ManagerialParamItem>[] = [
    { key: 'paramCode', header: 'Kode Parameter Limits', className: 'font-mono font-bold text-purple-600 dark:text-purple-400', render: (i) => i.paramCode },
    { key: 'paramName', header: 'Nama Aturan Manajerial', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.paramName },
    { key: 'thresholdLimit', header: 'Batas Threshold', align: 'center', className: 'font-mono font-bold text-rose-600 dark:text-rose-400', render: (i) => i.thresholdLimit },
    { key: 'autoEscalationRole', header: 'Role Eskalasi Pimpinan', render: (i) => i.autoEscalationRole }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Aturan Manajerial"
        icon={Sliders}
        iconBgColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        glossaryTitle="Glossary Parameter Manajerial & KPI Threshold"
        glossaryItems={[{ term: 'Managerial Risk Escalation', description: 'Konfigurasi ambang batas risiko keuangan & eskalasi otomatis ke direksi.' }]}
        actions={
          <button onClick={() => alert('Tambah Threshold Baru')} className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Threshold Baru</span>
          </button>
        }
      />
      <DataTable headerTitle="Master Parameter Ambang Batas Risiko Manajerial & Anggaran HO" columns={columns} data={MOCK_MGR_PARAMS} keyExtractor={(i) => i.id} />
    </div>
  );
};
