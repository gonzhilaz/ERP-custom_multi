'use client';

import React, { useState } from 'react';
import { FileCheck, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, X } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

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
      <DataTable
        headerTitle={`Daftar Verifikasi 3-Way Match AP & Tagihan (${matches.length})`}
        columns={[
          { key: 'matchCode', header: 'Kode Audit AP', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (m) => m.matchCode },
          { key: 'supplierName', header: 'Vendor Supplier', className: 'font-bold text-slate-900 dark:text-white', render: (m) => m.supplierName },
          {
            key: 'poNumber',
            header: 'Nomor PO & Nilai',
            className: 'font-semibold',
            render: (m) => (
              <div>
                <span className="text-sky-600 dark:text-sky-400 font-mono block text-[11px]">{m.poNumber}</span>
                <span>Rp {m.poAmount.toLocaleString('id-ID')}</span>
              </div>
            )
          },
          {
            key: 'grnNumber',
            header: 'Surat Jalan (GRN)',
            align: 'center',
            render: (m) => (
              <div>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md font-mono font-bold text-slate-700 dark:text-slate-300 text-[11px] block">
                  {m.grnNumber}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">Qty Sesuai</span>
              </div>
            )
          },
          {
            key: 'invoiceNumber',
            header: 'Invoice Vendor & Nilai',
            className: 'font-semibold',
            render: (m) => (
              <div>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono block text-[11px]">{m.invoiceNumber}</span>
                <span className={m.invoiceAmount !== m.poAmount ? 'text-red-600 font-bold' : ''}>
                  Rp {m.invoiceAmount.toLocaleString('id-ID')}
                </span>
              </div>
            )
          },
          {
            key: 'status',
            header: 'Status Audit',
            align: 'center',
            render: (m) => (
              m.status === 'VERIFIED_MATCH' ? (
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Matching</span>
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Selisih Tagihan</span>
                </span>
              )
            )
          },
          {
            key: 'actions',
            header: 'Aksi Verifikasi AP',
            align: 'center',
            sortable: false,
            render: (m) => (
              m.status === 'DISCREPANCY_FLAGGED' ? (
                <button
                  onClick={() => handleApproveMatch(m.id)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-[11px] cursor-pointer transition-colors shadow-sm"
                >
                  Approve Diskon
                </button>
              ) : (
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg font-mono text-[10px] font-bold">
                  POSTED TO AP
                </span>
              )
            )
          }
        ]}
        data={matches}
        keyExtractor={(m) => m.id}
      />
    </div>
  );
};
