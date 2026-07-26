'use client';

import React from 'react';
import { History } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface PosAuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  actionType: string;
  receiptNo: string;
  details: string;
}

const MOCK_POS_AUDIT: PosAuditLogItem[] = [
  { id: 'pal-01', timestamp: '2026-07-25 14:45:00', user: 'kasir_01', actionType: 'ORDER_VOID', receiptNo: 'TRX-POS-8812', details: 'Batal pesanan item Nasi Goreng Spesial (Alasan: Pembatalan Tamu Meja 04)' },
  { id: 'pal-02', timestamp: '2026-07-25 12:10:30', user: 'supervisor_resto', actionType: 'DISCOUNT_OVERRIDE', receiptNo: 'TRX-POS-8799', details: 'Aplikasi diskon manual 15% VIP Member' }
];

export const PosAuditLogView = () => {
  const columns: ColumnDef<PosAuditLogItem>[] = [
    { key: 'timestamp', header: 'Timestamp', className: 'font-mono text-slate-500 dark:text-slate-400', render: (i) => i.timestamp },
    { key: 'user', header: 'User Kasir / Spv', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.user },
    { key: 'actionType', header: 'Tipe Aksi Audit', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-rose-500/10 text-rose-600 font-bold font-mono text-[10px] rounded">{i.actionType}</span> },
    { key: 'receiptNo', header: 'Nomor Struk Target', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.receiptNo },
    { key: 'details', header: 'Rincian Aktivitas', className: 'text-slate-600 dark:text-slate-300', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log POS"
        icon={History}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Audit Log POS Kasir"
        glossaryItems={[{ term: 'Order Void Audit', description: 'Log pembatalan pesanan kasir setelah struk tercetak.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Void Order & Diskon Kasir POS" columns={columns} data={MOCK_POS_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
