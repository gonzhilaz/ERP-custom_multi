'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Edit, Trash2 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface VendorParameterItem {
  id: string;
  category: string;
  paramKey: string;
  paramValue: string;
  description: string;
}

const MOCK_VENDOR_PARAMS: VendorParameterItem[] = [
  {
    id: 'vp-01',
    category: 'PO Approval Threshold',
    paramKey: 'PO_MANDATORY_EXECUTIVE_ACC_LIMIT',
    paramValue: 'Rp 50.000.000',
    description: 'Batas nominal PO Purchasing yang wajib mendapat persetujuan Direktur Utama'
  },
  {
    id: 'vp-02',
    category: 'Term of Payment (TOP)',
    paramKey: 'DEFAULT_SUPPLIER_PAYMENT_TERMS_DAYS',
    paramValue: '30 Hari Net',
    description: 'Jangka waktu pembayaran jatuh tempo standar untuk tagihan vendor baru'
  },
  {
    id: 'vp-03',
    category: 'Rating Scoring Vendor',
    paramKey: 'VENDOR_PERFORMANCE_PASS_MIN_SCORE',
    paramValue: '80 / 100',
    description: 'Skor minimum evaluasi keandalan pengiriman & kualitas material supplier'
  }
];

export const VendorParametersView = () => {
  const [params, setParams] = useState<VendorParameterItem[]>(MOCK_VENDOR_PARAMS);

  const columns: ColumnDef<VendorParameterItem>[] = [
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
      header: 'Keterangan Goveransi',
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
        title="Parameter Procurement"
        icon={Sliders}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Parameter Procurement & Vendor"
        glossaryItems={[
          { term: 'PO Threshold', description: 'Batas nominal PO yang wajib disetujui Direksi.' },
          { term: 'Term of Payment', description: 'Jangka waktu pembayaran jatuh tempo standar tagihan vendor.' }
        ]}
        actions={
          <button
            onClick={() => alert('Tambah Parameter Procurement Baru')}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Parameter</span>
          </button>
        }
      />

      {/* Universal DataTable */}
      <DataTable
        headerTitle="Aturan & Parameter Dinamis Vendor & Purchasing"
        columns={columns}
        data={params}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
};
