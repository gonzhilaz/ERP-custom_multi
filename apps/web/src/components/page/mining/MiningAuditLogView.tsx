'use client';

import React from 'react';
import { History } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface MiningAuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  actionType: string;
  fleetId: string;
  details: string;
}

const MOCK_MINING_AUDIT: MiningAuditLogItem[] = [
  { id: 'mal-01', timestamp: '2026-07-25 11:30:00', user: 'fuel_man_01', actionType: 'FUEL_DISPENSE', fleetId: 'DT-CAT-777-04', details: 'Pengisian Solar HSD 450 Liter (Meteran Awal: 12.450 L, Akhir: 12.900 L)' }
];

export const MiningAuditLogView = () => {
  const columns: ColumnDef<MiningAuditLogItem>[] = [
    { key: 'timestamp', header: 'Timestamp', className: 'font-mono text-slate-500 dark:text-slate-400', render: (i) => i.timestamp },
    { key: 'user', header: 'User Site Operator', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.user },
    { key: 'actionType', header: 'Tipe Aksi Audit', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 font-bold font-mono text-[10px] rounded">{i.actionType}</span> },
    { key: 'fleetId', header: 'Kode Fleet Alat Berat', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.fleetId },
    { key: 'details', header: 'Rincian Aktivitas Site', className: 'text-slate-600 dark:text-slate-300', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log Tambang"
        icon={History}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Audit Log Mining Site"
        glossaryItems={[{ term: 'Fuel Dispense Audit', description: 'Log pengisian bahan bakar solar HSD ke tangki armada dump truck.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Fuel Solar & Operasional Site Tambang" columns={columns} data={MOCK_MINING_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
