'use client';

import React, { useState } from 'react';
import { Wrench, Plus, CheckCircle2, AlertTriangle, Truck, Clock } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

interface WorkOrderBengkelRow {
  jobOrderNo: string;
  date: string;
  unitFleetCode: string;
  unitFleetName: string;
  serviceType: 'REGULAR_SERVICE' | 'HEAVY_OVERHAUL' | 'TIRE_CHANGE' | 'EMERGENCY_REPAIR';
  mechanicName: string;
  sparepartsUsed: string; // e.g. "Oli Meditran 20L, Filter Solar x2"
  sparepartCost: number;
  laborHours: number;
  downtimeDays: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'WAITING_SPAREPART';
}

export const WorkshopServiceOrderView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobOrders, setJobOrders] = useState<WorkOrderBengkelRow[]>([
    { jobOrderNo: 'WO-BKG-2026-088', date: '2026-07-24', unitFleetCode: 'TRK-MNG-012', unitFleetName: 'Dump Truck Scania P410 (6x4)', serviceType: 'HEAVY_OVERHAUL', mechanicName: 'Agus & Team Bengkel Fleet', sparepartsUsed: 'Kit Piston, Packing Set Engine, Filter Oli x2', sparepartCost: 35000000, laborHours: 24, downtimeDays: 3, status: 'IN_PROGRESS' },
    { jobOrderNo: 'WO-BKG-2026-085', date: '2026-07-22', unitFleetCode: 'EXC-CAT-004', unitFleetName: 'Excavator CAT 320DD', serviceType: 'REGULAR_SERVICE', mechanicName: 'Bambang (Chief Mechanic)', sparepartsUsed: 'Oli Hydraulic 200L, Filter Solar, Element Air Cleaner', sparepartCost: 12500000, laborHours: 6, downtimeDays: 1, status: 'COMPLETED' }
  ]);

  const filtered = jobOrders.filter(
    (j) =>
      j.jobOrderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.unitFleetCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.unitFleetName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<WorkOrderBengkelRow>[] = [
    { key: 'jobOrderNo', header: 'No. Work Order Bengkel', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.jobOrderNo },
    { key: 'date', header: 'Tanggal Servis', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'unitFleetName', header: 'Unit Armada / Fleet', render: (i) => <div><p className="font-bold text-slate-900 dark:text-white">{i.unitFleetName}</p><p className="font-mono text-[10px] text-sky-600">{i.unitFleetCode}</p></div> },
    {
      key: 'serviceType',
      header: 'Jenis Pekerjaan Bengkel',
      align: 'center',
      render: (i) => (
        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold font-mono text-[10px] rounded border border-slate-200 dark:border-slate-700">
          {i.serviceType}
        </span>
      )
    },
    { key: 'mechanicName', header: 'Teknisi / Mekanik', className: 'font-semibold text-slate-700 dark:text-slate-300', render: (i) => i.mechanicName },
    { key: 'sparepartsUsed', header: 'Sparepart Dikeluarkan (Gudang Bengkel)', render: (i) => i.sparepartsUsed },
    { key: 'sparepartCost', header: 'Biaya Sparepart (Rp)', align: 'right', className: 'font-mono font-bold text-rose-600 dark:text-rose-400', render: (i) => `Rp ${i.sparepartCost.toLocaleString('id-ID')}` },
    { key: 'downtimeDays', header: 'Downtime', align: 'center', className: 'font-mono font-bold text-amber-600', render: (i) => `${i.downtimeDays} Hari` },
    {
      key: 'status',
      header: 'Status Perbaikan',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
        }`}>
          {i.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Bengkel Fleet & Pool Maintenance Job Order"
        icon={Wrench}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Maintenance Bengkel Pool"
        glossaryItems={[
          { term: 'Job Order Bengkel', description: 'Perintah kerja perbaikan truk/alat berat yang memotong stok sparepart gudang bengkel.' },
          { term: 'Downtime Fleet', description: 'Durasi waktu unit armada non-aktif karena proses servis overhaul.' }
        ]}
        badges={[
          { label: `${jobOrders.length} Repair Orders Active`, variant: 'amber' },
          { label: 'Auto-Deduct Sparepart Stock', variant: 'emerald' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari no WO, armada truk, atau sparepart..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Register Pekerjaan Servis Bengkel Fleet & Pool Armada (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.jobOrderNo}
      />
    </div>
  );
};
