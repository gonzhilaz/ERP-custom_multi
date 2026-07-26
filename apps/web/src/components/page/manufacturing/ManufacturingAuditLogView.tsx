'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface ManufacturingAuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: string;
  targetEntity: string;
  details: string;
}

const MOCK_MFG_AUDIT: ManufacturingAuditLogItem[] = [
  { id: 'ma-01', timestamp: '2026-07-25 10:15:30', userName: 'Agus Pabrik Manager', userRole: 'PLANT_MANAGER', actionType: 'RELEASE_WO', targetEntity: 'WO-2026-0991', details: 'Penerbitan Work Order Roti Tawar 1.000 Pcs & pemotongan otomatis 450kg Terigu di Gudang' }
];

export const ManufacturingAuditLogView = () => {
  const columns: ColumnDef<ManufacturingAuditLogItem>[] = [
    { key: 'timestamp', header: 'Waktu Transaksi', className: 'font-mono text-slate-500', render: (i) => i.timestamp },
    { key: 'userName', header: 'User Pabrik', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.userName },
    { key: 'userRole', header: 'Role Hak Akses', render: (i) => <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-600 font-bold font-mono text-[10px] rounded">{i.userRole}</span> },
    { key: 'actionType', header: 'Jenis Tindakan', align: 'center', className: 'font-mono font-bold', render: (i) => i.actionType },
    { key: 'targetEntity', header: 'Target Kode WO/BOM', className: 'font-mono font-bold text-indigo-600 dark:text-indigo-400', render: (i) => i.targetEntity },
    { key: 'details', header: 'Rincian Perubahan', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log"
        icon={ShieldCheck}
        iconBgColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        glossaryTitle="Glossary Audit Log Manufaktur"
        glossaryItems={[{ term: 'Work Order Audit', description: 'Pencatatan permanen pengeluaran bahan baku, rilis WO, & persetujuan BOM.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Permanent Alokasi Bahan Baku & WO Produksi" columns={columns} data={MOCK_MFG_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
