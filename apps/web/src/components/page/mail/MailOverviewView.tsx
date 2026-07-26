'use client';

import React from 'react';
import { Mail, Send, Inbox, ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const MailOverviewView = () => {
  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Mail Overview"
        icon={Mail}
        iconBgColor="bg-slate-500/10 text-slate-600 dark:text-slate-400"
        glossaryTitle="Glossary Korespondensi & Surat Resmi"
        glossaryItems={[{ term: 'Disposition Rate', description: 'Kecepatan disposisi pimpinan terhadap surat masuk yang memerlukan tindak lanjut.' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Surat Masuk (Bulan Ini)" value="42 Surat" subtitle="Dokumen Eksternal" icon={Inbox} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Surat Keluar Terbit" value="38 Surat" subtitle="Nomor Agenda HO" icon={Send} iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50" />
        <KpiCard title="Pending Disposisi" value="5 Surat" subtitle="Menunggu Direksi" icon={Mail} iconBgColor="bg-rose-50 text-rose-600 dark:bg-rose-950/50" />
        <KpiCard title="Tanda Tangan Digital" value="100% Valid" subtitle="Verifikasi QR e-Sign" icon={ShieldCheck} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
      </div>
    </div>
  );
};
