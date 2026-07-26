'use client';

import React from 'react';
import { History } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface VendorAuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  actionType: string;
  poNumber: string;
  details: string;
}

const MOCK_VENDOR_AUDIT: VendorAuditLogItem[] = [
  { id: 'val-01', timestamp: '2026-07-25 15:00:12', user: 'holding_ceo', actionType: 'PO_EXECUTIVE_ACC', poNumber: 'PO-2026-0891', details: 'Persetujuan ACC Direksi untuk PO Pembelian Sparepart Heavy Fleet Rp 850.000.000' }
];

export const VendorAuditLogView = () => {
  const columns: ColumnDef<VendorAuditLogItem>[] = [
    { key: 'timestamp', header: 'Timestamp', className: 'font-mono text-slate-500 dark:text-slate-400', render: (i) => i.timestamp },
    { key: 'user', header: 'User Operational', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.user },
    { key: 'actionType', header: 'Tipe Aksi Audit', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.actionType}</span> },
    { key: 'poNumber', header: 'Nomor PO Target', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.poNumber },
    { key: 'details', header: 'Rincian Aktivitas', className: 'text-slate-600 dark:text-slate-300', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log Procurement"
        icon={History}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Audit Log Procurement"
        glossaryItems={[{ term: 'Executive ACC Audit', description: 'Log persetujuan Direksi untuk PO bernilai di atas Rp 50 Juta.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Procurement & Purchase Orders" columns={columns} data={MOCK_VENDOR_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
