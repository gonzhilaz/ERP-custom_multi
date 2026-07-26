'use client';

import React, { useState } from 'react';
import { Receipt, FileText, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface PpnReconciliationRow {
  period: string;
  ppnMasukan: number; // Input VAT (Purchases)
  ppnKeluaran: number; // Output VAT (Sales)
  netVatStatus: 'KURANG_BAYAR' | 'LEBIH_BAYAR' | 'NIHIL';
  netVatAmount: number;
  status: string;
}

interface TaxAuditRow {
  taxType: string;
  objectCode: string;
  taxPayerName: string;
  npwp: string;
  grossAmount: number;
  taxRate: string;
  taxAmount: number;
  bupotNumber: string;
  status: string;
}

export const FinanceTaxReportsView = () => {
  const [activeTab, setActiveTab] = useState<'SUMMARY' | 'PPN_RECONCILE' | 'PPH_AUDIT'>('SUMMARY');

  const ppnData: PpnReconciliationRow[] = [
    { period: '2026-07 (Juli)', ppnMasukan: 114500000, ppnKeluaran: 168900000, netVatStatus: 'KURANG_BAYAR', netVatAmount: 54400000, status: 'AUDITED' },
    { period: '2026-06 (Juni)', ppnMasukan: 98000000, ppnKeluaran: 122000000, netVatStatus: 'KURANG_BAYAR', netVatAmount: 24000000, status: 'POSTED_DJP' }
  ];

  const pphData: TaxAuditRow[] = [
    { taxType: 'PPh 23 (Jasa)', objectCode: '24-104-01', taxPayerName: 'CV Buana Jaya Freight', npwp: '01.345.678.9-012.000', grossAmount: 12500000, taxRate: '2%', taxAmount: 250000, bupotNumber: 'BP-23/2026/07/0088', status: 'VALIDATED' },
    { taxType: 'PPh 4(2) (Sewa)', objectCode: '28-401-02', taxPayerName: 'PT Gedung Plaza HQ', npwp: '02.998.112.4-045.000', grossAmount: 45000000, taxRate: '10%', taxAmount: 4500000, bupotNumber: 'BP-42/2026/07/0012', status: 'VALIDATED' },
    { taxType: 'PPh 21 TER (Gaji)', objectCode: '21-100-01', taxPayerName: 'Payroll Karyawan HO (54 Staf)', npwp: '00.000.000.0-000.000', grossAmount: 210000000, taxRate: 'Variabel TER A/B/C', taxAmount: 18500000, bupotNumber: 'BP-21/2026/07/0054', status: 'VALIDATED' }
  ];

  const subTabs: SubTabItem[] = [
    { id: 'SUMMARY', label: 'Ringkasan Pajak Enterprise', icon: Receipt },
    { id: 'PPN_RECONCILE', label: 'Rekonsiliasi PPN (e-Faktur)', icon: FileText },
    { id: 'PPH_AUDIT', label: 'Audit PPh (e-Bupot Unifikasi)', icon: ShieldCheck }
  ];

  const ppnColumns: ColumnDef<PpnReconciliationRow>[] = [
    { key: 'period', header: 'Masa Pajak', className: 'font-mono font-bold text-slate-900 dark:text-white', render: (i) => i.period },
    { key: 'ppnMasukan', header: 'PPN Masukan (Input VAT)', align: 'right', className: 'font-mono text-emerald-600 font-bold', render: (i) => `Rp ${i.ppnMasukan.toLocaleString('id-ID')}` },
    { key: 'ppnKeluaran', header: 'PPN Keluaran (Output VAT)', align: 'right', className: 'font-mono text-sky-600 font-bold', render: (i) => `Rp ${i.ppnKeluaran.toLocaleString('id-ID')}` },
    {
      key: 'netVatStatus',
      header: 'Status PPN Net',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.netVatStatus === 'KURANG_BAYAR' ? 'bg-rose-500/10 text-rose-600' : 'bg-emerald-500/10 text-emerald-600'
        }`}>
          {i.netVatStatus}
        </span>
      )
    },
    { key: 'netVatAmount', header: 'Nominal Selisih Kurang Bayar', align: 'right', className: 'font-mono font-extrabold text-rose-600', render: (i) => `Rp ${i.netVatAmount.toLocaleString('id-ID')}` },
    { key: 'status', header: 'Status SPT Masa', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.status}</span> }
  ];

  const pphColumns: ColumnDef<TaxAuditRow>[] = [
    { key: 'bupotNumber', header: 'No. Bukti Potong', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.bupotNumber },
    { key: 'taxType', header: 'Jenis Pajak PPh', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.taxType },
    { key: 'taxPayerName', header: 'Wajib Pajak (Penerima)', render: (i) => i.taxPayerName },
    { key: 'npwp', header: 'NPWP / NIK', className: 'font-mono text-slate-500', render: (i) => i.npwp },
    { key: 'grossAmount', header: 'DPP / Bruto (Rp)', align: 'right', className: 'font-mono font-bold text-slate-900 dark:text-white', render: (i) => `Rp ${i.grossAmount.toLocaleString('id-ID')}` },
    { key: 'taxRate', header: 'Tarif', align: 'center', className: 'font-mono font-bold text-amber-600', render: (i) => i.taxRate },
    { key: 'taxAmount', header: 'PPh Dipotong (Rp)', align: 'right', className: 'font-mono font-extrabold text-emerald-600', render: (i) => `Rp ${i.taxAmount.toLocaleString('id-ID')}` },
    { key: 'status', header: 'Status e-Bupot', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.status}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Pusat Audit Pajak & e-Faktur / e-Bupot Fiskal"
        icon={Receipt}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Tax & Fiscal Audit"
        glossaryItems={[
          { term: 'PPN Masukan / Keluaran', description: 'Pajak Pertambahan Nilai 12% atas pembelian vs penjualan barang/jasa Kena Pajak (BKP/JKP).' },
          { term: 'e-Faktur Pajak DJP', description: 'Faktur pajak elektronik yang diunggah ke portal Web DJP Online.' },
          { term: 'e-Bupot Unifikasi', description: 'Bukti pemotongan PPh Pasal 23, 22, 15, dan 4 ayat (2) terpadu.' }
        ]}
        badges={[
          { label: 'UU HPP & PMK Compliant', variant: 'emerald' },
          { label: 'DJP Online Format Export', variant: 'amber' }
        ]}
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="amber"
      />

      {activeTab === 'SUMMARY' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
            <span className="text-slate-500 font-bold uppercase text-[10px]">Kurang Bayar PPN Masa Juli 2026</span>
            <h3 className="font-mono font-extrabold text-xl text-rose-600">Rp 54.400.000</h3>
            <p className="text-[11px] text-slate-400">PPN Keluaran (168,9M) - PPN Masukan (114,5M)</p>
          </div>
          <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
            <span className="text-slate-500 font-bold uppercase text-[10px]">Total Dipotong PPh 21 TER (Payroll)</span>
            <h3 className="font-mono font-extrabold text-xl text-sky-600">Rp 18.500.000</h3>
            <p className="text-[11px] text-slate-400">Terpotong otomatis dari disburse gaji karyawan</p>
          </div>
          <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-2">
            <span className="text-slate-500 font-bold uppercase text-[10px]">Total PPh 23 & 4(2) Warkat Bupot</span>
            <h3 className="font-mono font-extrabold text-xl text-emerald-600">Rp 4.750.000</h3>
            <p className="text-[11px] text-slate-400">Siap diimpor ke e-Bupot Unifikasi DJP</p>
          </div>
        </div>
      )}

      {activeTab === 'PPN_RECONCILE' && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center">
            <span className="font-bold text-slate-900 dark:text-white">Rekonsiliasi PPN Masukan vs PPN Keluaran (e-Faktur DJP)</span>
            <button className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
              <Download className="w-4 h-4" />
              <span>Export e-Faktur CSV DJP</span>
            </button>
          </div>
          <DataTable
            headerTitle="Tabel Audit Masa PPN (Input VAT VS Output VAT)"
            columns={ppnColumns}
            data={ppnData}
            keyExtractor={(i) => i.period}
          />
        </div>
      )}

      {activeTab === 'PPH_AUDIT' && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center">
            <span className="font-bold text-slate-900 dark:text-white">Register Bukti Pemotongan PPh Unifikasi (e-Bupot DJP)</span>
            <button className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
              <Download className="w-4 h-4" />
              <span>Export e-Bupot XML Unifikasi</span>
            </button>
          </div>
          <DataTable
            headerTitle="Register Warkat Bukti Potong PPh 21 / 23 / 4(2)"
            columns={pphColumns}
            data={pphData}
            keyExtractor={(i) => i.bupotNumber}
          />
        </div>
      )}
    </div>
  );
};
