'use client';

import React from 'react';
import { UtensilsCrossed, Calendar, Truck, DollarSign } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const CateringOverviewView = () => {
  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Catering Overview"
        icon={UtensilsCrossed}
        iconBgColor="bg-orange-500/10 text-orange-600 dark:text-orange-400"
        glossaryTitle="Glossary Catering Massal"
        glossaryItems={[{ term: 'Mass Catering', description: 'Pengelolaan suplai makanan porsi besar (1.000+ pax) untuk event & site tambang.' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Porsi Bulan Ini" value="45.800 Pax" subtitle="Event & Mess Hall" icon={UtensilsCrossed} iconBgColor="bg-orange-50 text-orange-600 dark:bg-orange-950/50" />
        <KpiCard title="Kontrak Active" value="12 Event" subtitle="Catering Massal" icon={Calendar} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Ekspedisi Delivery" value="18 Rute" subtitle="Surat Jalan Terbit" icon={Truck} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Pendapatan Catering" value="Rp 1.374.000.000" subtitle="Bulan Ini" icon={DollarSign} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
      </div>
    </div>
  );
};
