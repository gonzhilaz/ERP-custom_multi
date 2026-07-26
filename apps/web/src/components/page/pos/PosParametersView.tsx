'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Edit, Trash2 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface PosParameterItem {
  id: string;
  category: string;
  paramKey: string;
  paramValue: string;
  description: string;
}

const MOCK_POS_PARAMS: PosParameterItem[] = [
  {
    id: 'pp-01',
    category: 'Pajak & Service Charge',
    paramKey: 'RESTO_PB1_TAX_AND_SERVICE_PCT',
    paramValue: 'PB1 10% + Service 5%',
    description: 'Beban persentase Pajak Resto PB1 DJP dan Service Charge pada struk cetak kasir'
  },
  {
    id: 'pp-02',
    category: 'Blind Cash Closing',
    paramKey: 'ALLOW_CASHIER_VIEW_SYSTEM_EXPECTED_TOTAL',
    paramValue: 'FALSE (Mandatory Blind Audit)',
    description: 'Mencegah kasir melihat total fisik uang kas di sistem sebelum penghitungan fisik shift selesai'
  },
  {
    id: 'pp-03',
    category: 'Printer Thermal',
    paramKey: 'KITCHEN_KDS_PRINT_AUTO_CUT',
    paramValue: '80mm Thermal Auto-Cut',
    description: 'Ukuran kertas dan konfigurasi potong otomatis struk antrean dapur'
  }
];

export const PosParametersView = () => {
  const [params, setParams] = useState<PosParameterItem[]>(MOCK_POS_PARAMS);

  const columns: ColumnDef<PosParameterItem>[] = [
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
      header: 'Keterangan Kasir & Resto',
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
        title="Parameter Kasir & POS"
        icon={Sliders}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Parameter POS Kasir & Resto"
        glossaryItems={[
          { term: 'Blind Cash Closing', description: 'Aturan penutupan shift kasir tanpa intip acuan sistem.' },
          { term: 'Service Charge & PB1', description: 'Pengaturan persentase beban servis & pajak daerah resto.' }
        ]}
        actions={
          <button
            onClick={() => alert('Tambah Parameter POS Baru')}
            className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Parameter</span>
          </button>
        }
      />

      {/* Universal DataTable */}
      <DataTable
        headerTitle="Aturan & Parameter Dinamis POS & Restoran"
        columns={columns}
        data={params}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
};
