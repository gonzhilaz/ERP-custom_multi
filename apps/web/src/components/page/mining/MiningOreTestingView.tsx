'use client';

import React from 'react';
import { Pickaxe, Plus } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface OreLabTest {
  id: string;
  sampleCode: string;
  pitSource: string;
  goldGradePpm: string;
  strippingRatio: string;
  classification: string;
  testDate: string;
}

const MOCK_ORE_TESTS: OreLabTest[] = [
  { id: 'olt-01', sampleCode: 'SPL-LAB-8812', pitSource: 'Pit Alpha North (Bench 4)', goldGradePpm: '3.85 Gram / Ton (PPM)', strippingRatio: '4.1 : 1 OB vs Ore', classification: 'HIGH_GRADE_ORE', testDate: '2026-07-25' }
];

export const MiningOreTestingView = () => {
  const columns: ColumnDef<OreLabTest>[] = [
    { key: 'sampleCode', header: 'Kode Sampel Lab', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => i.sampleCode },
    { key: 'pitSource', header: 'Sumber Pit & Bench', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.pitSource },
    { key: 'goldGradePpm', header: 'Kadar Emas (PPM)', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.goldGradePpm },
    { key: 'strippingRatio', header: 'Stripping Ratio', align: 'center', className: 'font-mono font-bold', render: (i) => i.strippingRatio },
    { key: 'classification', header: 'Klasifikasi Ore Lab', align: 'center', render: (i) => <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 font-bold text-[10px] rounded-full">{i.classification}</span> },
    { key: 'testDate', header: 'Tanggal Uji Lab', className: 'font-mono text-slate-500', render: (i) => i.testDate }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Lab Ore Testing"
        icon={Pickaxe}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Lab Ore Testing & Stripping Ratio"
        glossaryItems={[{ term: 'Cut-off Grade', description: 'Kadar emas minimum sampel batuan laboratorium untuk dikategorikan ore bernilai ekonomis.' }]}
        actions={
          <button onClick={() => alert('Input Hasil Uji Lab Sampel Baru')} className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Hasil Uji Lab Baru</span>
          </button>
        }
      />
      <DataTable headerTitle="Hasil Pengujian Laboratorium Kadar Emas (PPM) & Stripping Ratio Site" columns={columns} data={MOCK_ORE_TESTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
