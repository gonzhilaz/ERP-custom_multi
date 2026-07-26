'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface MailReportItem {
  id: string;
  agendaNumber: string;
  mailSubject: string;
  senderReceiver: string;
  mailType: string;
  statusDate: string;
}

const MOCK_MAIL_REPORTS: MailReportItem[] = [
  { id: 'mr-01', agendaNumber: 'SR-HO-2026-081', mailSubject: 'Permohonan Lisensi Operasional Tambang Site B', senderReceiver: 'Bupati Kutai Barat', mailType: 'SURAT_MASUK', statusDate: '2026-07-25' }
];

export const MailReportsView = () => {
  const columns: ColumnDef<MailReportItem>[] = [
    { key: 'agendaNumber', header: 'No. Agenda Surat', className: 'font-mono font-bold text-slate-700 dark:text-slate-300', render: (i) => i.agendaNumber },
    { key: 'mailSubject', header: 'Perihal Surat', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.mailSubject },
    { key: 'senderReceiver', header: 'Pengirim / Penerima', render: (i) => i.senderReceiver },
    { key: 'mailType', header: 'Kategori Surat', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-slate-500/10 text-slate-600 font-bold font-mono text-[10px] rounded">{i.mailType}</span> },
    { key: 'statusDate', header: 'Tanggal Agenda', className: 'font-mono text-slate-500', render: (i) => i.statusDate }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Laporan Korespondensi"
        icon={BarChart3}
        iconBgColor="bg-slate-500/10 text-slate-600 dark:text-slate-400"
        glossaryTitle="Glossary Rekapitulasi Surat Disposisi"
        glossaryItems={[{ term: 'Agenda Logbook', description: 'Arsip resmi registrasi surat keluar dan surat masuk holding.' }]}
      />
      <DataTable headerTitle="Pusat Rekapitulasi Logbook Agenda Surat Masuk & Keluar" columns={columns} data={MOCK_MAIL_REPORTS} keyExtractor={(i) => i.id} />
    </div>
  );
};
