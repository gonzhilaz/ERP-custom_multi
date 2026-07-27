'use client';

import React from 'react';
import { Building, CheckCircle2, Wrench, DollarSign, History, AlertTriangle, BarChart3, PieChart } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { useInventory } from '@/hooks/inventory/useInventory';

interface MaintenanceLog {
  id: string;
  date: string;
  assetCode: string;
  assetName: string;
  technician: string;
  actionCost: number;
  description: string;
}

export const AssetOverviewView = () => {
  const { allAssets } = useInventory();

  const totalDepreciation = allAssets.reduce((acc, curr) => acc + curr.accumulatedDepreciation, 0);
  const bepAssets = allAssets.filter((a) => a.bookValue <= 0 || a.accumulatedDepreciation >= a.purchaseCost * 0.9);
  const operationalCount = allAssets.filter((a) => a.status === 'OPERATIONAL').length;
  const maintenanceCount = allAssets.filter((a) => a.status !== 'OPERATIONAL').length;

  const mockMaintenanceLogs: MaintenanceLog[] = [
    {
      id: 'log-01',
      date: '2026-07-20',
      assetCode: 'AST-OVEN-001',
      assetName: 'Mesin Oven Deck Commercial 3-Deck',
      technician: 'Bambang Service Center',
      actionCost: 1500000,
      description: 'Penggantian elemen pemanas (thermostat) & kalibrasi suhu oven'
    },
    {
      id: 'log-02',
      date: '2026-07-15',
      assetCode: 'AST-CAT777-04',
      assetName: 'Excavator Heavy Fleet Caterpillar CAT 777D',
      technician: 'Traktor Nusantara Technical Support',
      actionCost: 12500000,
      description: 'Perbaikan sistem hidrolik swing motor & penggantian seal oli'
    }
  ];

  const columns: ColumnDef<MaintenanceLog>[] = [
    { key: 'date', header: 'Tanggal Servis', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'assetCode', header: 'Kode Aset', className: 'font-mono font-bold text-sky-600', render: (i) => i.assetCode },
    { key: 'assetName', header: 'Nama Aset Tetap', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.assetName },
    { key: 'technician', header: 'Teknisi / Vendor Servis', className: 'text-slate-500', render: (i) => i.technician },
    { key: 'actionCost', header: 'Biaya Servis (Rp)', align: 'right', className: 'font-mono font-bold text-rose-600', render: (i) => `Rp ${i.actionCost.toLocaleString('id-ID')}` },
    { key: 'description', header: 'Rincian Perbaikan', render: (i) => i.description }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Module Header */}
      <ModuleHeader
        title="Aset Overview"
        icon={Building}
        iconBgColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        glossaryTitle="Glossary Fixed Asset Management"
        glossaryItems={[
          { term: 'Nilai Buku (Book Value)', description: 'Harga perolehan aset dikurangi akumulasi penyusutan fiskal & komersial.' },
          { term: 'Aset BEP / Fully Depreciated', description: 'Aset yang telah lunas masa manfaatnya namun masih produktif secara fisik.' }
        ]}
        badges={[
          { label: 'PMK 72/2023 Compliant', variant: 'emerald' },
          { label: 'Asset Barcode Tracking Active', variant: 'sky' }
        ]}
      />

      {/* Warning Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-xs">Peringatan Maintenance Aset & Garansi Overdue</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300">
              Excavator CAT 777D memerlukan perbaikan berkala 500 jam kerja dan 1 unit Oven Resto membutuhkan servis garansi.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold shrink-0">
          <span className="px-2 py-1 bg-amber-500/20 rounded-lg">2 Service Due</span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Aset BEP / Lunas" value={`${bepAssets.length} Item BEP`} subtitle="Masa Manfaat Maksimal" icon={DollarSign} iconBgColor="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50" />
        <KpiCard title="Operasional Aktif" value={`${operationalCount} Aset`} subtitle="Ready for Production" icon={CheckCircle2} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Aset dlm Perbaikan" value={`${maintenanceCount} Unit`} subtitle="Servis & Maintenance" icon={Wrench} iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50" />
        <KpiCard title="Akumulasi Penyusutan" value={`Rp ${(totalDepreciation / 1000000).toLocaleString('id-ID')} Jt`} subtitle="Penyusutan GL Posted" icon={Building} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Asset Value vs Accumulated Depreciation */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              <span>Komposisi Nilai Perolehan vs Nilai Buku Aset</span>
            </h3>
            <span className="font-mono text-[10px] text-indigo-600 font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md">4 Sektor Usaha</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Kategori Alat Berat & Armada Tambang', cost: 'Rp 4.20 M', pct: 65, color: 'bg-indigo-500' },
              { name: 'Bangunan & Gedung Hotel Resort', cost: 'Rp 1.80 M', pct: 45, color: 'bg-sky-500' },
              { name: 'Mesin Kitchen & Kitchen Utensils', cost: 'Rp 450 Jt', pct: 80, color: 'bg-emerald-500' },
              { name: 'Perangkat IT, Server & POS Terminal', cost: 'Rp 280 Jt', pct: 90, color: 'bg-amber-500' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{item.cost} (Ter-penyusutan: {item.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Log Table */}
        <DataTable headerTitle="Riwayat Servis & Pemeliharaan Aset" columns={columns} data={mockMaintenanceLogs} keyExtractor={(i) => i.id} />
      </div>
    </div>
  );
};
