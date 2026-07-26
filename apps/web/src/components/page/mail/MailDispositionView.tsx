'use client';

import React, { useState } from 'react';
import { Send, Plus, CheckCircle2, UserCheck, ShieldAlert } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

interface DispositionRow {
  dispositionNo: string;
  date: string;
  mailRefNo: string;
  senderOrigin: string;
  subject: string;
  instructionBy: string; // Direktur Utama / Direktur Keuangan
  assignedToDept: string; // Legal / Finance / HRD
  actionDirective: string;
  deadline: string;
  status: 'PENDING_ACTION' | 'IN_PROGRESS' | 'COMPLETED';
}

export const MailDispositionView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dispositions, setDispositions] = useState<DispositionRow[]>([
    { dispositionNo: 'DSP-MAIL-2026-044', date: '2026-07-24', mailRefNo: '551/ESDM-SK/VII/2026', senderOrigin: 'Kementerian ESDM RI', subject: 'Undangan Rapat Evaluasi Izin Usaha Pertambangan (IUP) Khusus', instructionBy: 'Direktur Utama', assignedToDept: 'Legal & Mining Ops', actionDirective: 'Siapkan dokumen IUP & hadir dalam rapat pleno 29 Juli 2026', deadline: '2026-07-28', status: 'IN_PROGRESS' },
    { dispositionNo: 'DSP-MAIL-2026-042', date: '2026-07-22', mailRefNo: 'TAX-AUD-0092/2026', senderOrigin: 'KPP Pratama Kebayoran Baru', subject: 'Surat Permintaan Penjelasan atas Data (SP2DK) PPN 2025', instructionBy: 'Direktur Keuangan', assignedToDept: 'Finance & Tax Division', actionDirective: 'Lakukan rekonsiliasi e-Faktur Keluaran & selesaikan tanggapan SP2DK', deadline: '2026-07-30', status: 'IN_PROGRESS' }
  ]);

  const filtered = dispositions.filter(
    (d) =>
      d.dispositionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.mailRefNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<DispositionRow>[] = [
    { key: 'dispositionNo', header: 'No. Lembar Disposisi', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.dispositionNo },
    { key: 'date', header: 'Tanggal Disposisi', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'mailRefNo', header: 'No. Surat Asal', className: 'font-mono font-bold text-slate-700 dark:text-slate-300', render: (i) => i.mailRefNo },
    { key: 'senderOrigin', header: 'Pengirim Surat', render: (i) => i.senderOrigin },
    { key: 'subject', header: 'Perihal Surat', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.subject },
    { key: 'instructionBy', header: 'Pengarah (Direksi)', className: 'font-bold text-amber-600', render: (i) => i.instructionBy },
    { key: 'assignedToDept', header: 'Target Pelaksana (Dept)', className: 'font-bold text-sky-600', render: (i) => i.assignedToDept },
    { key: 'actionDirective', header: 'Instruksi Arahan Direksi', render: (i) => i.actionDirective },
    { key: 'deadline', header: 'Tenggat Waktu', className: 'font-mono font-bold text-rose-600', render: (i) => i.deadline },
    {
      key: 'status',
      header: 'Status Disposisi',
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
        title="Alur Disposisi Direksi & Lembar Penugasan Surat"
        icon={Send}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Disposisi Persuratan"
        glossaryItems={[
          { term: 'Disposisi Surat', description: 'Petunjuk tertulis dari Direksi mengenai tindak lanjut penanganan surat masuk oleh divisi terkait.' },
          { term: 'Tenggat Waktu Disposisi', description: 'Batas akhir penyelesaian tugas yang diinstruksikan Direksi.' }
        ]}
        badges={[
          { label: `${dispositions.length} Disposisi Active`, variant: 'sky' },
          { label: 'Role Restrict: Sekretaris & Direksi', variant: 'slate' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari no disposisi, pengirim, atau perihal..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Register Lembar Disposisi Direksi Holding (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.dispositionNo}
      />
    </div>
  );
};
