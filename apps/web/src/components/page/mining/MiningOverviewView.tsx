'use client';

import React from 'react';
import { Pickaxe, Truck, Fuel, ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const MiningOverviewView = () => {
  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Mining Site Overview"
        icon={Pickaxe}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Operasional Site Tambang"
        glossaryItems={[{ term: 'Stripping Ratio', description: 'Rasio batas pengupasan tanah penutup (OB) terhadap tonnase ore emas.' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Production Ore Yield" value="23.250 Ton" subtitle="Bulan Ini" icon={Pickaxe} iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50" />
        <KpiCard title="Total Hauling Ritase" value="1.420 Rit" subtitle="Dump Truck CAT 777" icon={Truck} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Konsumsi Solar HSD" value="64.120 Liter" subtitle="Solar Industri Site" icon={Fuel} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Heavy Fleet Uptime" value="94.2%" subtitle="KIR & Service Readiness" icon={ShieldCheck} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
      </div>
    </div>
  );
};
