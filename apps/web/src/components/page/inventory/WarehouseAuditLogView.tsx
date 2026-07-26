'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface WarehouseAuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: string;
  targetEntity: string;
  details: string;
}

const MOCK_WAREHOUSE_AUDIT: WarehouseAuditLogItem[] = [
  { id: 'wha-01', timestamp: '2026-07-25 13:40:10', userName: 'Rudi Kepala Gudang', userRole: 'WAREHOUSE_HEAD', actionType: 'TRANSFER_INTER_WAREHOUSE', targetEntity: 'STR-JKT-01 ➔ STR-BDG-02', details: 'Mutasi antar-gudang 50 Karton Daging Sapi Premium via Cold Truck No Pol B 8821 SKS' }
];

export const WarehouseAuditLogView = () => {
  const columns: ColumnDef<WarehouseAuditLogItem>[] = [
    { key: 'timestamp', header: 'Waktu Transaksi', className: 'font-mono text-slate-500', render: (i) => i.timestamp },
    { key: 'userName', header: 'User Gudang', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.userName },
    { key: 'userRole', header: 'Role Hak Akses', render: (i) => <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 font-bold font-mono text-[10px] rounded">{i.userRole}</span> },
    { key: 'actionType', header: 'Jenis Mutasi Gudang', align: 'center', className: 'font-mono font-bold', render: (i) => i.actionType },
    { key: 'targetEntity', header: 'Target Asal ➔ Tujuan', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => i.targetEntity },
    { key: 'details', header: 'Rincian Perubahan', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log"
        icon={ShieldCheck}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Audit Log Gudang"
        glossaryItems={[{ term: 'Storage Audit Trail', description: 'Pelacakan permanen mutasi stok barang antar-gudang, opname, & selisih pencatatan.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Permanent Transfer Antar Gudang & Stock Opname" columns={columns} data={MOCK_WAREHOUSE_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
