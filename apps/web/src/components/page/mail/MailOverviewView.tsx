'use client';

import React from 'react';
import { Mail, Send, Inbox, ShieldCheck, AlertTriangle, BarChart3, PieChart } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const MailOverviewView = () => {
  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Persuratan Overview"
        icon={Mail}
        iconBgColor="bg-slate-500/10 text-slate-600 dark:text-slate-400"
        glossaryTitle="Glossary Korespondensi & Surat Resmi"
        glossaryItems={[{ term: 'Disposition Rate', description: 'Kecepatan disposisi pimpinan terhadap surat masuk yang memerlukan tindak lanjut.' }]}
        badges={[
          { label: 'e-Sign BSrE Verified', variant: 'emerald' },
          { label: 'Automatic Agenda Numbering Active', variant: 'sky' }
        ]}
      />

      {/* Warning Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-xs">Peringatan Disposisi Surat Masuk & Kurir Ekspres Unread</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300">
              Terdapat 5 Surat Masuk (termasuk Dokumen Perizinan ESDM) menunggu disposisi Direktur Operasional lebih dari 24 jam.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold shrink-0">
          <span className="px-2 py-1 bg-amber-500/20 rounded-lg">5 Pending Disposisi</span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Surat Masuk (Bulan Ini)" value="42 Surat" subtitle="Dokumen Eksternal Resmi" icon={Inbox} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Surat Keluar Terbit" value="38 Surat" subtitle="Nomor Agenda HO Auto-Post" icon={Send} iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50" />
        <KpiCard title="Pending Disposisi" value="5 Surat" subtitle="Menunggu Action Direksi" icon={Mail} iconBgColor="bg-rose-50 text-rose-600 dark:bg-rose-950/50" />
        <KpiCard title="Tanda Tangan Digital" value="100% Valid" subtitle="Verifikasi QR e-Sign Audit" icon={ShieldCheck} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Document Volume Chart */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sky-500" />
              <span>Volume Surat Masuk vs Surat Keluar (Harian)</span>
            </h3>
            <span className="font-mono text-[10px] text-sky-600 font-bold bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-md">Total: 80 Dokumen</span>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-100 dark:border-slate-800">
            {[
              { day: 'Sen', inDoc: 12, outDoc: 10 },
              { day: 'Sel', inDoc: 15, outDoc: 14 },
              { day: 'Rab', inDoc: 18, outDoc: 16 },
              { day: 'Kam', inDoc: 14, outDoc: 12 },
              { day: 'Jum', inDoc: 20, outDoc: 18 }
            ].map((d, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div className="w-3/7 bg-sky-500 rounded-t-md transition-all group-hover:bg-sky-400" style={{ height: `${(d.inDoc / 25) * 100}%` }} />
                  <div className="w-3/7 bg-amber-400 rounded-t-md transition-all group-hover:bg-amber-300" style={{ height: `${d.outDoc / 25 * 100}%` }} />
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-medium">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /><span>Surat Masuk</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /><span>Surat Keluar</span></div>
            </div>
          </div>
        </div>

        {/* Document Processing Progress Bars */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-500" />
              <span>Status Pengolahan & Terarsip Dokumen</span>
            </h3>
            <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">Terdisposisi: 88.1%</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Selesai Terdisposisi & Tindak Lanjut', count: '37 Dokumen', pct: 88, color: 'bg-emerald-500' },
              { name: 'Pending Review & Approval Direksi', count: '5 Dokumen', pct: 12, color: 'bg-amber-500' },
              { name: 'Arsip Permanen Vault E-Document', count: '42 Dokumen', pct: 100, color: 'bg-sky-500' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{item.count} ({item.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

