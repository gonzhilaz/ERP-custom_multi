'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Edit, Trash2 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface MailParameterItem {
  id: string;
  category: string;
  paramKey: string;
  paramValue: string;
  description: string;
}

const MOCK_MAIL_PARAMS: MailParameterItem[] = [
  {
    id: 'mp-01',
    category: 'Format Penomoran Surat',
    paramKey: 'MAIL_AUTO_NUMBERING_PATTERN',
    paramValue: '{SEQ}/HO-SK/{DEPT}/{MONTH_ROMAN}/{YEAR}',
    description: 'Format penomoran otomatis surat resmi terbitan holding & unit usaha'
  },
  {
    id: 'mp-02',
    category: 'Disposisi SLA Time',
    paramKey: 'DISPOSITION_EXECUTIVE_SLA_HOURS',
    paramValue: '24 Jam (Priority / Urgensi Tinggi)',
    description: 'Batas waktu maksimal eksekusi tindak lanjut surat disposisi Direksi'
  }
];

export const MailParametersView = () => {
  const [params, setParams] = useState<MailParameterItem[]>(MOCK_MAIL_PARAMS);

  const columns: ColumnDef<MailParameterItem>[] = [
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
      header: 'Keterangan GA Goveransi',
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
        title="Parameter Persuratan"
        icon={Sliders}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Parameter Persuratan & GA"
        glossaryItems={[
          { term: 'Penomoran Otomatis', description: 'Pattern otomatisasi format nomor surat resmi.' },
          { term: 'SLA Disposisi', description: 'Target waktu tindak lanjut disposisi surat Direksi.' }
        ]}
        actions={
          <button
            onClick={() => alert('Tambah Parameter Surat Baru')}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Parameter</span>
          </button>
        }
      />

      {/* Universal DataTable */}
      <DataTable
        headerTitle="Aturan & Parameter Dinamis Surat & General Affairs (GA)"
        columns={columns}
        data={params}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
};
