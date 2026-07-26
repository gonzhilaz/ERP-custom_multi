'use client';

import React from 'react';
import { History } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface InventoryAuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  actionType: string;
  skuCode: string;
  details: string;
}

const MOCK_INVENTORY_AUDIT: InventoryAuditLogItem[] = [
  { id: 'ial-01', timestamp: '2026-07-25 13:20:10', user: 'warehouse_admin', actionType: 'STOCK_ADJUSTMENT', skuCode: 'SKU-MEAT-092', details: 'Penyesuaian stok opname +5 KG daging (Selisih timbang)' },
  { id: 'ial-02', timestamp: '2026-07-25 10:15:00', user: 'logistics_lead', actionType: 'REQUISITION_DISPATCH', skuCode: 'SKU-OIL-101', details: 'Pengeluaran 20 Jeriken Minyak Goreng ke Central Kitchen' }
];

export const InventoryAuditLogView = () => {
  const columns: ColumnDef<InventoryAuditLogItem>[] = [
    { key: 'timestamp', header: 'Timestamp', className: 'font-mono text-slate-500 dark:text-slate-400', render: (i) => i.timestamp },
    { key: 'user', header: 'User Operational', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.user },
    { key: 'actionType', header: 'Tipe Aksi Audit', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded">{i.actionType}</span> },
    { key: 'skuCode', header: 'SKU Barang', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.skuCode },
    { key: 'details', header: 'Rincian Mutasi Data', className: 'text-slate-600 dark:text-slate-300', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log Inventory"
        icon={History}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Audit Log Inventory"
        glossaryItems={[{ term: 'Stock Adjustment Audit', description: 'Catatan jejak audit penyesuaian stok opname manual.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit & Mutasi Stok Gudang" columns={columns} data={MOCK_INVENTORY_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
