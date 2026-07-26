'use client';

import React from 'react';
import { Sliders, Plus } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface AssetRuleParam {
  id: string;
  categoryCode: string;
  categoryName: string;
  usefulLifeYears: number;
  depreciationRateStraightLine: string;
  taxLawRule: string;
}

const MOCK_ASSET_PARAMS: AssetRuleParam[] = [
  { id: 'ap-01', categoryCode: 'AST-CAT-01', categoryName: 'Kelompok 1 (Mebel, Peralatan Ringan)', usefulLifeYears: 4, depreciationRateStraightLine: '25.0% / Tahun', taxLawRule: 'PMK 72/2023 Pasal 1' },
  { id: 'ap-02', categoryCode: 'AST-CAT-02', categoryName: 'Kelompok 2 (Kendaraan, Fleet, Mesin)', usefulLifeYears: 8, depreciationRateStraightLine: '12.5% / Tahun', taxLawRule: 'PMK 72/2023 Pasal 2' }
];

export const AssetParametersView = () => {
  const columns: ColumnDef<AssetRuleParam>[] = [
    { key: 'categoryCode', header: 'Kode Kelompok Aset', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.categoryCode },
    { key: 'categoryName', header: 'Nama Kelompok Aset', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.categoryName },
    { key: 'usefulLifeYears', header: 'Masa Manfaat (Tahun)', align: 'center', className: 'font-mono font-bold', render: (i) => `${i.usefulLifeYears} Tahun` },
    { key: 'depreciationRateStraightLine', header: 'Tarif Garis Lurus', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => i.depreciationRateStraightLine },
    { key: 'taxLawRule', header: 'Acuan Aturan Pajak', className: 'font-mono text-slate-500', render: (i) => i.taxLawRule }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Aturan Aset"
        icon={Sliders}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Aturan Depresiasi Fiskal PMK 72/2023"
        glossaryItems={[{ term: 'Depresiasi Fiskal', description: 'Penetapan masa manfaat aset & metode garis lurus/saldo menurun sesuai PMK 72/2023.' }]}
        actions={
          <button onClick={() => alert('Tambah Aturan Depresiasi Baru')} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Aturan Aset Baru</span>
          </button>
        }
      />
      <DataTable headerTitle="Master Aturan Penyusutan Fiskal & Masa Manfaat Kelompok Aset" columns={columns} data={MOCK_ASSET_PARAMS} keyExtractor={(i) => i.id} />
    </div>
  );
};
