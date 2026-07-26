'use client';

import React, { useState } from 'react';
import { FileCheck, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, X } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';

export const Vendor3WayMatchView = () => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [matches, setMatches] = useState([
    {
      id: 'match-01',
      matchCode: '3WAY/2026/07/004',
      supplierName: 'PT Indofood Sukses Makmur Tbk',
      poNumber: 'PO/2026/07/0088',
      poAmount: 45000000,
      grnNumber: 'GRN-SDR-8812',
      grnQtyMatched: true,
      invoiceNumber: 'INV/IND/2026/991',
      invoiceAmount: 45000000,
      status: 'VERIFIED_MATCH',
      apSynced: true,
      verifiedBy: 'Bambang Soetjipto (Finance Dir)'
    },
    {
      id: 'match-02',
      matchCode: '3WAY/2026/07/005',
      supplierName: 'Traktor Nusantara Heavy Machinery',
      poNumber: 'PO/2026/07/0091',
      poAmount: 85000000,
      grnNumber: 'GRN-SITE-004',
      grnQtyMatched: true,
      invoiceNumber: 'INV/TN/2026/410',
      invoiceAmount: 88500000,
      status: 'DISCREPANCY_WARNING',
      apSynced: false,
      verifiedBy: 'Agus Auditor'
    }
  ]);

  const handleApproveMatch = (id: string) => {
    setMatches((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: 'VERIFIED_MATCH', apSynced: true, invoiceAmount: m.poAmount } : m
      )
    );
    alert('3-Way Match Terverifikasi & Tagihan Utang AP Berhasil Diterbitkan ke Modul Akuntansi (/finance/ap)!');
  };

  return (
    <div className="space-y-4">
      {/* Universal Module Header */}
      <ModuleHeader
        title="3-Way Verification"
        icon={FileCheck}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary 3-Way Verification"
        glossaryItems={[
          { term: '3-Way Matching', description: 'Pencocokan tiga dokumen transaksi: Purchase Order (PO), Goods Receipt (GRN), dan Tagihan Vendor (Invoice).' },
          { term: 'Otodidak AP Sync', description: 'Pencocokan yang lolos verifikasi memicu penciptaan tagihan Utang Usaha (AP) di Modul Keuangan secara otomatis.' }
        ]}
        badges={[
          { label: `${matches.length} Transaksi`, variant: 'slate' }
        ]}
      />

      {/* 3-Way Match Verification Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
            Daftar Verifikasi 3-Way Match ({matches.length} Audit)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Kode Audit</th>
                <th className="py-3.5 px-4">Nama Vendor / Supplier</th>
                <th className="py-3.5 px-4">Nomor PO & Nilai</th>
                <th className="py-3.5 px-4 text-center">Surat Jalan (GRN)</th>
                <th className="py-3.5 px-4">Invoice Vendor & Nilai</th>
                <th className="py-3.5 px-4 text-center">Status Audit</th>
                <th className="py-3.5 px-4 text-center">Aksi Verifikasi AP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {matches.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{m.matchCode}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{m.supplierName}</td>
                  <td className="py-3.5 px-4 font-semibold">
                    <span className="text-sky-600 dark:text-sky-400 font-mono block text-[11px]">{m.poNumber}</span>
                    <span>Rp {m.poAmount.toLocaleString('id-ID')}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md font-mono font-bold text-slate-700 dark:text-slate-300 text-[11px] block">
                      {m.grnNumber}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Qty Sesuai</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold">
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono block text-[11px]">{m.invoiceNumber}</span>
                    <span className={m.invoiceAmount !== m.poAmount ? 'text-red-600 font-bold' : ''}>
                      Rp {m.invoiceAmount.toLocaleString('id-ID')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {m.status === 'VERIFIED_MATCH' ? (
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Matching</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Selisih Tagihan</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {m.status !== 'VERIFIED_MATCH' ? (
                      <button
                        onClick={() => handleApproveMatch(m.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-semibold transition-all shadow-sm flex items-center justify-center gap-1 mx-auto cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Setujui AP</span>
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        AP Synced
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
