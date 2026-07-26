'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Edit, Trash2 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface CrmParameterItem {
  id: string;
  category: string;
  paramKey: string;
  paramValue: string;
  description: string;
}

const MOCK_CRM_PARAMS: CrmParameterItem[] = [
  {
    id: 'crm-01',
    category: 'Pipeline Stages',
    paramKey: 'DEAL_PIPELINE_STAGES_LIST',
    paramValue: 'Prospect ➔ Proposal ➔ Negotiation ➔ Closed Won',
    description: 'Tahapan corong penjualan deals prospek klien B2B holding'
  },
  {
    id: 'crm-02',
    category: 'Discount Cap Limit',
    paramKey: 'MAXIMUM_SALES_DISCOUNT_PERCENTAGE',
    paramValue: '15.00 % (Di atas 15% butuh ACC Direksi)',
    description: 'Batas persentase diskon maksimal yang boleh disetujui Account Executive'
  }
];

export const CrmParametersView = () => {
  const [params, setParams] = useState<CrmParameterItem[]>(MOCK_CRM_PARAMS);

  const columns: ColumnDef<CrmParameterItem>[] = [
    {
      key: 'category',
      header: 'Kategori Parameter',
      className: 'font-bold text-slate-900 dark:text-white',
      render: (item) => item.category
    },
    {
      key: 'paramKey',
      header: 'Kode Parameter System',
      className: 'font-mono text-sky-600 dark:text-sky-400 font-semibold',
      render: (item) => item.paramKey
    },
    {
      key: 'paramValue',
      header: 'Nilai Acuan',
      className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400',
      render: (item) => item.paramValue
    },
    {
      key: 'description',
      header: 'Keterangan Sales Governance',
      className: 'text-slate-600 dark:text-slate-300',
      render: (item) => item.description
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      render: (item) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => alert(`Edit Parameter ${item.paramKey}`)}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-sky-500 cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setParams((prev) => prev.filter((p) => p.id !== item.id))}
            className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Parameter CRM"
        icon={Sliders}
        iconBgColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        glossaryTitle="Glossary Parameter CRM & Client Sales"
        glossaryItems={[
          { term: 'Pipeline Stages', description: 'Tahapan corong prospek deal sales B2B.' },
          { term: 'Discount Cap', description: 'Batas diskon harga penjualan sebelum butuh persetujuan CFO/CEO.' }
        ]}
        actions={
          <button
            onClick={() => alert('Tambah Parameter CRM Baru')}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Parameter</span>
          </button>
        }
      />

      {/* Universal DataTable */}
      <DataTable
        headerTitle="Aturan & Parameter Dinamis CRM & Sales Governance"
        columns={columns}
        data={params}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
};
