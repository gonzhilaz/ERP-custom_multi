'use client';

import React from 'react';
import { Fuel, Plus } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface FuelFleetItem {
  id: string;
  fleetCode: string;
  fleetCategory: string;
  fuelType: string;
  fuelQuantityLiters: number;
  hourMeterHM: string;
  kirStatus: string;
}

const MOCK_FLEET_FUEL: FuelFleetItem[] = [
  { id: 'ff-01', fleetCode: 'EXC-CAT-777-01', fleetCategory: 'Heavy Excavator', fuelType: 'Solar HSD Industri', fuelQuantityLiters: 450, hourMeterHM: '14.250 HM', kirStatus: 'LULUS KIR DISHUB (Aktif)' }
];

export const MiningFuelFleetView = () => {
  const columns: ColumnDef<FuelFleetItem>[] = [
    { key: 'fleetCode', header: 'Kode Fleet Unit', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => i.fleetCode },
    { key: 'fleetCategory', header: 'Kategori Alat Berat', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.fleetCategory },
    { key: 'fuelType', header: 'Jenis Bahan Bakar', render: (i) => i.fuelType },
    { key: 'fuelQuantityLiters', header: 'Solar Diisi (Liter)', align: 'right', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => `${i.fuelQuantityLiters} Liter` },
    { key: 'hourMeterHM', header: 'Hour Meter (HM)', align: 'center', className: 'font-mono font-bold', render: (i) => i.hourMeterHM },
    { key: 'kirStatus', header: 'Status Uji KIR Dishub', align: 'center', render: (i) => <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 font-bold text-[10px] rounded-full">{i.kirStatus}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="BBM Solar & KIR Armada"
        icon={Fuel}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary BBM Solar & Maintenance KIR"
        glossaryItems={[{ term: 'Solar HSD Log', description: 'Pencatatan konsumsi solar industri HSD dan jam kerja mesin (Hour Meter).' }]}
        actions={
          <button onClick={() => alert('Log Pengisian BBM Baru')} className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Pengisian BBM Baru</span>
          </button>
        }
      />
      <DataTable headerTitle="Pencatatan Konsumsi BBM Solar HSD & Status Uji Berkala KIR Armada" columns={columns} data={MOCK_FLEET_FUEL} keyExtractor={(i) => i.id} />
    </div>
  );
};
