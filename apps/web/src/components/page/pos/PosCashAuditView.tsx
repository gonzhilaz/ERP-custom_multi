'use client';

import React, { useState } from 'react';
import { DollarSign, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface CashAuditRecord {
  id: string;
  shiftCode: string;
  cashierName: string;
  physicalCountAmount: string;
  systemExpectedAmount: string;
  varianceAmount: string;
  auditStatus: string;
}

const MOCK_CASH_AUDITS: CashAuditRecord[] = [
  { id: 'ca-01', shiftCode: 'SHIFT-MORNING-2507', cashierName: 'Siti Rahma', physicalCountAmount: 'Rp 2.450.000', systemExpectedAmount: 'Rp 2.450.000', varianceAmount: 'Rp 0 (Balanced)', auditStatus: 'VERIFIED_MATCH' },
  { id: 'ca-02', shiftCode: 'SHIFT-NIGHT-2407', cashierName: 'Budi Santoso', physicalCountAmount: 'Rp 3.100.000', systemExpectedAmount: 'Rp 3.115.000', varianceAmount: '- Rp 15.000 (Selisih)', auditStatus: 'VARIANCE_FLAGGED' }
];

export const PosCashAuditView = () => {
  const [audits] = useState<CashAuditRecord[]>(MOCK_CASH_AUDITS);

  const columns: ColumnDef<CashAuditRecord>[] = [
    { key: 'shiftCode', header: 'Kode Shift Kasir', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => i.shiftCode },
    { key: 'cashierName', header: 'Nama Kasir Bertugas', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.cashierName },
    { key: 'physicalCountAmount', header: 'Input Fisik Kasir (Blind)', align: 'right', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.physicalCountAmount },
    { key: 'systemExpectedAmount', header: 'Acuan System GL', align: 'right', className: 'font-mono font-bold', render: (i) => i.systemExpectedAmount },
    { key: 'varianceAmount', header: 'Selisih Variance Audit', align: 'center', className: 'font-mono font-bold', render: (i) => i.varianceAmount },
    { key: 'auditStatus', header: 'Status Audit', align: 'center', render: (i) => <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 font-bold text-[10px] rounded-full">{i.auditStatus}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Blind Cash Audit"
        icon={DollarSign}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Blind Cash Audit Kasir"
        glossaryItems={[{ term: 'Blind Cash Closing', description: 'Metode penutupan shift kasir tanpa melihat total acuan kas di sistem untuk cegah selisih.' }]}
      />
      <DataTable headerTitle="Hasil Audit Kas Shift & Verifikasi Kebocoran Kas Resto" columns={columns} data={audits} keyExtractor={(i) => i.id} />
    </div>
  );
};
