'use client';

import React, { useState } from 'react';
import { Sprout, Plus, CheckCircle2, Truck, TreePine } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

interface PlantationHarvestRow {
  harvestNo: string;
  date: string;
  estateAfdeling: string; // Afdeling 1 Block B-12
  cropType: string; // Tandan Buah Segar (TBS) Kelapa Sawit
  harvestWeightTons: number;
  bunchCount: number;
  fertilizerUsedCost: number;
  transportVehicleNo: string;
  destinationFactory: string; // Pabrik Kelapa Sawit (PKS) Utama
  status: 'DELIVERED_PKS' | 'IN_TRANSIT' | 'WEIGHED';
}

export const PlantationHarvestView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [harvestLogs, setHarvestLogs] = useState<PlantationHarvestRow[]>([
    { harvestNo: 'HVT-SAWIT-2026-112', date: '2026-07-24', estateAfdeling: 'Estate Riau Afdeling 3 - Blok B14', cropType: 'Tandan Buah Segar (TBS) Sawit', harvestWeightTons: 18.5, bunchCount: 1420, fertilizerUsedCost: 4500000, transportVehicleNo: 'BM 8890 TU (Truk Fuso)', destinationFactory: 'PKS PT Holding Palm Oil', status: 'WEIGHED' },
    { harvestNo: 'HVT-SAWIT-2026-115', date: '2026-07-25', estateAfdeling: 'Estate Riau Afdeling 1 - Blok A08', cropType: 'Tandan Buah Segar (TBS) Sawit', harvestWeightTons: 22.1, bunchCount: 1680, fertilizerUsedCost: 5200000, transportVehicleNo: 'BM 9122 AB (Truk Dump)', destinationFactory: 'PKS PT Holding Palm Oil', status: 'IN_TRANSIT' }
  ]);

  const filtered = harvestLogs.filter(
    (h) =>
      h.harvestNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.estateAfdeling.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.cropType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<PlantationHarvestRow>[] = [
    { key: 'harvestNo', header: 'No. Surat Jalan Panen', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => i.harvestNo },
    { key: 'date', header: 'Tanggal Panen', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'estateAfdeling', header: 'Lokasi Afdeling / Blok Lahan', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.estateAfdeling },
    { key: 'cropType', header: 'Komoditas Hasil Kebun', render: (i) => i.cropType },
    { key: 'harvestWeightTons', header: 'Tonase Hasil (Ton)', align: 'center', className: 'font-mono font-extrabold text-emerald-600', render: (i) => `${i.harvestWeightTons} Ton` },
    { key: 'bunchCount', header: 'Jumlah Janjang', align: 'center', className: 'font-mono font-bold text-sky-600', render: (i) => `${i.bunchCount} Janjang` },
    { key: 'transportVehicleNo', header: 'Armada Pengangkut', className: 'font-mono font-bold text-slate-700', render: (i) => i.transportVehicleNo },
    { key: 'destinationFactory', header: 'Target Pabrik Pengolahan (PKS)', className: 'font-bold text-slate-900', render: (i) => i.destinationFactory },
    {
      key: 'status',
      header: 'Status Pengiriman',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.status === 'WEIGHED' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
        }`}>
          {i.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Plantation & Agro-Industry Harvest Hub"
        icon={Sprout}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Manajemen Perkebunan"
        glossaryItems={[
          { term: 'Afdeling Lahan', description: 'Pembagian wilayah area kebun kelapa sawit/karet per blok hektar.' },
          { term: 'Timbangan PKS', description: 'Verifikasi berat netto tonase hasil panen saat tiba di Pabrik Kelapa Sawit.' }
        ]}
        badges={[
          { label: `${harvestLogs.length} Harvest Transit Logs`, variant: 'emerald' },
          { label: 'Estate Agro Management', variant: 'sky' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari no panen, afdeling, atau komoditas..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Register Hasil Panen Kebun & Transit Tonase PKS (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.harvestNo}
      />
    </div>
  );
};
