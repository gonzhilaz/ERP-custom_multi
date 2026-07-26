'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Edit, Trash2 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface MiningParameterItem {
  id: string;
  category: string;
  paramKey: string;
  paramValue: string;
  description: string;
}

const MOCK_MINING_PARAMS: MiningParameterItem[] = [
  {
    id: 'mp-01',
    category: 'Solar HSD Benchmark',
    paramKey: 'HEAVY_EQUIPMENT_FUEL_BENCHMARK_LPH',
    paramValue: '45 Liter / Jam (Excavator CAT 777)',
    description: 'Batas maksimum rasio konsumsi solar per jam kerja mesin sebelum alert kebocoran BBM'
  },
  {
    id: 'mp-02',
    category: 'Lab Ore Testing',
    paramKey: 'MINIMUM_GOLD_ORE_GRADE_CUTOFF_PPM',
    paramValue: '2.50 Gram / Ton (PPM)',
    description: 'Kadar emas minimum hasil tes laboratorium pit untuk dikategorikan High Grade Ore'
  },
  {
    id: 'mp-03',
    category: 'Stripping Ratio',
    paramKey: 'TARGET_STRIPPING_RATIO_BCM_PER_TON',
    paramValue: '4.5 : 1 (Overburden vs Ore)',
    description: 'Rasio batas maksimal pengupasan tanah penutup (OB) terhadap tonnase ore emas'
  }
];

export const MiningParametersView = () => {
  const [params, setParams] = useState<MiningParameterItem[]>(MOCK_MINING_PARAMS);

  const columns: ColumnDef<MiningParameterItem>[] = [
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
      header: 'Nilai Acuan Benchmark',
      className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400',
      render: (item) => item.paramValue
    },
    {
      key: 'description',
      header: 'Keterangan Site Operasional',
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
        title="Parameter Tambang"
        icon={Sliders}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Parameter Operasional Tambang"
        glossaryItems={[
          { term: 'Fuel Benchmark L/Jam', description: 'Rasio acuan konsumsi BBM solar per jam mesin alat berat.' },
          { term: 'Stripping Ratio', description: 'Rasio batas maksimal pengupasan overburden terhadap tonnase ore.' }
        ]}
        actions={
          <button
            onClick={() => alert('Tambah Parameter Tambang Baru')}
            className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Parameter</span>
          </button>
        }
      />

      {/* Universal DataTable */}
      <DataTable
        headerTitle="Aturan & Parameter Dinamis Mining Site Operations"
        columns={columns}
        data={params}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
};
