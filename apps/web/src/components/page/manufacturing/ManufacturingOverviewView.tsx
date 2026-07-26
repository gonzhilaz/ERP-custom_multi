'use client';

import React from 'react';
import { Factory, Play, Boxes, ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const ManufacturingOverviewView = () => {
  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Manufacturing Overview"
        icon={Factory}
        iconBgColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        glossaryTitle="Glossary Manufaktur & Resep Produksi"
        glossaryItems={[{ term: 'Work Order Efficiency', description: 'Metrik persentase penyelesaian WO dibanding target jadwal pabrikasi.' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Active Work Orders" value="14 WO" subtitle="Dalam Proses Produksi" icon={Play} iconBgColor="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50" />
        <KpiCard title="Total Resep BOM" value="28 Formulir" subtitle="Standar Hasil Produksi" icon={Factory} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Bahan Baku Terpakai" value="1.850 Kg" subtitle="Pemotongan Stok Gudang" icon={Boxes} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Rasio Yield QC" value="98.5%" subtitle="Standar Mutu Lulus" icon={ShieldCheck} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
      </div>
    </div>
  );
};
