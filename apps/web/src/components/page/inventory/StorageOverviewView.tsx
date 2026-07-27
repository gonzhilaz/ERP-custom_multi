'use client';

import React from 'react';
import { Warehouse, ArrowLeftRight, Thermometer, ShieldAlert, AlertTriangle, Boxes, Layers } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { useInventory } from '@/hooks/inventory/useInventory';

interface StockTransferLog {
  id: string;
  date: string;
  itemName: string;
  qty: number;
  uom: string;
  source: string;
  destination: string;
  operator: string;
}

export const StorageOverviewView = () => {
  const { allStorages } = useInventory();

  const mockStockTransferLogs: StockTransferLog[] = [
    {
      id: 'tf-01',
      date: '2026-07-23 14:30',
      itemName: 'Tepung Terigu Cakra Kembar Premium (25kg)',
      qty: 50,
      uom: 'Karung',
      source: 'Gudang Utama Sudirman',
      destination: 'Cabang Mall Kelapa Gading',
      operator: 'Eko Stok'
    },
    {
      id: 'tf-02',
      date: '2026-07-22 10:15',
      itemName: 'Daging Sapi Ribeye Wagyu MB5',
      qty: 25,
      uom: 'Kg',
      source: 'Gudang Utama Resto (Cold Storage)',
      destination: 'Cold Storage Senopati',
      operator: 'Budi Resto'
    }
  ];

  const columns: ColumnDef<StockTransferLog>[] = [
    { key: 'date', header: 'Waktu Mutasi', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'itemName', header: 'Nama Barang', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.itemName },
    { key: 'qty', header: 'Jumlah Transfer', align: 'center', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => `${i.qty} ${i.uom}` },
    { key: 'source', header: 'Storage Asal', className: 'text-slate-500', render: (i) => i.source },
    { key: 'destination', header: 'Storage Tujuan', className: 'text-slate-500', render: (i) => i.destination },
    { key: 'operator', header: 'Operator', align: 'center', className: 'font-semibold', render: (i) => i.operator }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Module Header */}
      <ModuleHeader
        title="Ringkasan Analitik Kapasitas & Lokasi Storage (Storage Overview)"
        icon={Warehouse}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Storage Management"
        glossaryItems={[
          { term: 'Storage Capacity %', description: 'Persentase rasio volume fisik barang terpakai vs kapasitas maksimum gudang.' },
          { term: 'Cold Chain Monitoring', description: 'Pengawasan sensor suhu freezer real-time untuk bahan pangan perishable.' }
        ]}
        badges={[
          { label: 'IoT Temperature Sensor Online', variant: 'emerald' },
          { label: 'Multi-Warehouse Location', variant: 'sky' }
        ]}
      />

      {/* Warning Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-xs">Peringatan Kapasitas Gudang & Sensor Suhu Cold Storage</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300">
              Gudang Utama Sudirman mendekati batas kritis (88% Okupansi) dan Cold Storage Resto memerlukan inspeksi filter pendingin.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold shrink-0">
          <span className="px-2 py-1 bg-amber-500/20 rounded-lg">88% Capacity Limit</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Lokasi Storage" value={`${allStorages.length} Gudang`} subtitle="Holding & Cabang" icon={Warehouse} iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50" />
        <KpiCard title="Rata-rata Okupansi" value="76.4%" subtitle="Kapasitas Fisik" icon={Layers} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Cold Storage Active" value="2 Freezer Unit" subtitle="Suhu Normal (-18.5°C)" icon={Thermometer} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Mutasi Stok Hari Ini" value="14 Transfer" subtitle="Surat Jalan Terbit" icon={ArrowLeftRight} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
      </div>

      {/* Storage Environmental & Capacity Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allStorages.map((str) => {
          const usedPct = Math.round((str.capacityUsed / str.capacityMax) * 100);
          const isHighAlert = usedPct >= 85;

          return (
            <div
              key={str.id}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">{str.code}</span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{str.name}</h3>
                  <div className="text-[11px] text-slate-500">{str.branchName}</div>
                </div>
                {isHighAlert && (
                  <span className="px-2 py-1 bg-red-500/10 text-red-600 border border-red-500/30 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    <span>Kapasitas Kritis</span>
                  </span>
                )}
              </div>

              {/* Progress Bar Okupansi */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Okupansi:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {str.capacityUsed} / {str.capacityMax} {str.uom} ({usedPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${usedPct > 85 ? 'bg-red-500' : 'bg-emerald-500'}`}
                    style={{ width: `${usedPct}%` }}
                  ></div>
                </div>
              </div>

              {/* Sensor Lingkungan (Cold Storage Sensor) */}
              {str.type === 'COLD_STORAGE' && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1 text-sky-600 font-semibold">
                    <Thermometer className="w-4 h-4 text-sky-500" />
                    <span>Suhu Freezer: -18.5°C</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">Optimal</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stock Transfer Log Table */}
      <DataTable headerTitle="Riwayat Transfer & Mutasi Antar Gudang" columns={columns} data={mockStockTransferLogs} keyExtractor={(i) => i.id} />
    </div>
  );
};

