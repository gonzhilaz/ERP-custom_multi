'use client';

import React, { useState } from 'react';
import { Truck, Plus, Wrench, Fuel, ShieldCheck, Activity, Search, AlertTriangle } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface FleetVehicle {
  id: string;
  vehicleCode: string;
  vehicleName: string;
  category: 'DUMP_TRUCK' | 'HEAVY_EXCAVATOR' | 'LV_PATROL' | 'CATERING_VAN' | 'HOTEL_SHUTTLE';
  licensePlate: string;
  odometerHm: number;
  fuelConsumptionLiter: number;
  assignedDriver: string;
  status: 'OPERATIONAL' | 'IN_SERVICE' | 'STANDBY';
  nextServiceDue: string;
}

export const FleetManagementView = () => {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([
    {
      id: 'v-01',
      vehicleCode: 'FLT-CAT777-04',
      vehicleName: 'Dump Truck Caterpillar CAT 777D (50 Ton)',
      category: 'DUMP_TRUCK',
      licensePlate: 'B 9842 XBB',
      odometerHm: 4850,
      fuelConsumptionLiter: 1250,
      assignedDriver: 'Eko Prasetyo (NIP: DRV-004)',
      status: 'OPERATIONAL',
      nextServiceDue: '5.000 Jam HM (150 Jam Lagi)'
    },
    {
      id: 'v-02',
      vehicleCode: 'FLT-EXC330-01',
      vehicleName: 'Excavator Heavy Fleet CAT 330D',
      category: 'HEAVY_EXCAVATOR',
      licensePlate: 'N/A (Heavy Fleet)',
      odometerHm: 6200,
      fuelConsumptionLiter: 890,
      assignedDriver: 'Rudi Hermawan (NIP: DRV-012)',
      status: 'IN_SERVICE',
      nextServiceDue: 'DALAM PERBAIKAN MOTOR SWING'
    },
    {
      id: 'v-03',
      vehicleCode: 'FLT-VAN-002',
      vehicleName: 'Toyota HiAce Premio Catering Van',
      category: 'CATERING_VAN',
      licensePlate: 'B 7721 SAK',
      odometerHm: 42100,
      fuelConsumptionLiter: 340,
      assignedDriver: 'Budi Santoso (NIP: DRV-018)',
      status: 'OPERATIONAL',
      nextServiceDue: '45.000 KM (Ganti Oli Mesin)'
    }
  ]);

  const columns: ColumnDef<FleetVehicle>[] = [
    { key: 'vehicleCode', header: 'Kode Armada', className: 'font-mono font-bold text-sky-600', render: (i) => i.vehicleCode },
    { key: 'vehicleName', header: 'Nama Fleet & Plat Nomor', render: (i) => <div><div className="font-bold text-slate-900 dark:text-white">{i.vehicleName}</div><div className="text-[10px] text-slate-400 font-mono">Plat: {i.licensePlate}</div></div> },
    { key: 'category', header: 'Kategori Unit', className: 'font-mono text-slate-500', render: (i) => i.category },
    { key: 'assignedDriver', header: 'Driver Penanggung Jawab', className: 'font-semibold text-slate-700 dark:text-slate-200', render: (i) => i.assignedDriver },
    { key: 'odometerHm', header: 'Odometer / HM', align: 'right', className: 'font-mono font-bold text-indigo-600', render: (i) => `${i.odometerHm.toLocaleString('id-ID')} ${i.category === 'HEAVY_EXCAVATOR' || i.category === 'DUMP_TRUCK' ? 'HM' : 'KM'}` },
    { key: 'nextServiceDue', header: 'Jadwal Servis', className: 'text-slate-500 text-[11px]', render: (i) => i.nextServiceDue },
    {
      key: 'status',
      header: 'Status Operasional',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded-full ${i.status === 'OPERATIONAL' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-600 border border-amber-500/30 animate-pulse'}`}>
          {i.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Kelola Armada Fleet"
        icon={Truck}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Management Fleet"
        glossaryItems={[
          { term: 'Hour Meter (HM)', description: 'Total jam kerja operasional mesin alat berat pertambangan.' },
          { term: 'Service Due', description: 'Jadwal pemeliharaan oli & filter berkala berdasarkan KM/HM.' }
        ]}
        badges={[
          { label: 'GPS Fleet Telematics Active', variant: 'emerald' },
          { label: 'KIR Readiness Verified', variant: 'sky' }
        ]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Armada Operasional" value={`${vehicles.length} Unit`} subtitle="Seluruh Sektor Usaha" icon={Truck} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Armada Siap Jalan" value={`${vehicles.filter((v) => v.status === 'OPERATIONAL').length} Ready`} subtitle="Ready for Dispatch" icon={ShieldCheck} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Armada dlm Servis" value={`${vehicles.filter((v) => v.status === 'IN_SERVICE').length} Unit`} subtitle="Perbaikan Workshop" icon={Wrench} iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50" />
        <KpiCard title="Total Konsumsi Solar" value="2.480 Liter" subtitle="Penggunaan Bulan Ini" icon={Fuel} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
      </div>

      <DataTable headerTitle="Daftar Master Armada & Fleet Kendaraan Enterprise" columns={columns} data={vehicles} keyExtractor={(i) => i.id} />
    </div>
  );
};
