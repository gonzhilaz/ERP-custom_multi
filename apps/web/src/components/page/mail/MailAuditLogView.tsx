'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface MailAuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: string;
  targetEntity: string;
  details: string;
}

const MOCK_MAIL_AUDIT: MailAuditLogItem[] = [
  { id: 'mla-01', timestamp: '2026-07-25 08:30:00', userName: 'Sekretaris HO', userRole: 'SECRETARY', actionType: 'REGISTER_MAIL_IN', targetEntity: 'SR-HO-2026-081', details: 'Registrasi nomor agenda surat masuk dan pengiriman notifikasi disposisi ke Direksi' }
];

export const MailAuditLogView = () => {
  const columns: ColumnDef<MailAuditLogItem>[] = [
    { key: 'timestamp', header: 'Waktu Transaksi', className: 'font-mono text-slate-500', render: (i) => i.timestamp },
    { key: 'userName', header: 'User Sekretariat', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.userName },
    { key: 'userRole', header: 'Role Hak Akses', render: (i) => <span className="px-2 py-0.5 bg-slate-500/10 text-slate-600 font-bold font-mono text-[10px] rounded">{i.userRole}</span> },
    { key: 'actionType', header: 'Jenis Tindakan', align: 'center', className: 'font-mono font-bold', render: (i) => i.actionType },
    { key: 'targetEntity', header: 'Target Agenda ID', className: 'font-mono font-bold text-slate-700 dark:text-slate-300', render: (i) => i.targetEntity },
    { key: 'details', header: 'Rincian Perubahan', render: (i) => i.details }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Audit Log"
        icon={ShieldCheck}
        iconBgColor="bg-slate-500/10 text-slate-600 dark:text-slate-400"
        glossaryTitle="Glossary Audit Log Korespondensi"
        glossaryItems={[{ term: 'Disposisi Audit', description: 'Catatan jejak digital pimpinan yang mendisposisikan dokumen surat resmi.' }]}
      />
      <DataTable headerTitle="Catatan Jejak Audit Permanent Surat Disposisi & QR e-Sign" columns={columns} data={MOCK_MAIL_AUDIT} keyExtractor={(i) => i.id} />
    </div>
  );
};
