'use client';

import React, { useState } from 'react';
import { FileText, Plus, Download, Printer, CheckCircle2, Building2 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

interface QuotationRow {
  quotationNo: string;
  date: string;
  customerName: string;
  projectName: string;
  totalAmount: number;
  validUntil: string;
  salesPerson: string;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED';
}

export const CrmQuotationsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuotation, setSelectedQuotation] = useState<QuotationRow | null>(null);

  const [quotations, setQuotations] = useState<QuotationRow[]>([
    { quotationNo: 'QUO-2026-07-0091', date: '2026-07-20', customerName: 'PT Freeport Supplier Partner', projectName: 'Pengadaan Katering Massal Staff Site Mining 3 Bulan', totalAmount: 420000000, validUntil: '2026-08-20', salesPerson: 'Irfan Aries', status: 'SENT' },
    { quotationNo: 'QUO-2026-07-0088', date: '2026-07-18', customerName: 'Kementerian ESDM Event Reserve', projectName: 'Sewa Ruang MICE & Gala Dinner VIP 500 Pax', totalAmount: 185000000, validUntil: '2026-08-18', salesPerson: 'Siti Rahma', status: 'ACCEPTED' }
  ]);

  const filtered = quotations.filter(
    (q) =>
      q.quotationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<QuotationRow>[] = [
    { key: 'quotationNo', header: 'No. Surat Penawaran (SPH)', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.quotationNo },
    { key: 'date', header: 'Tanggal Terbit', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'customerName', header: 'Perusahaan Client', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.customerName },
    { key: 'projectName', header: 'Deskripsi Proyek / Pengadaan', render: (i) => i.projectName },
    { key: 'totalAmount', header: 'Total Penawaran (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => `Rp ${i.totalAmount.toLocaleString('id-ID')}` },
    { key: 'validUntil', header: 'Masa Berlaku SPH', className: 'font-mono text-amber-600 font-bold', render: (i) => i.validUntil },
    {
      key: 'status',
      header: 'Status SPH',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-600' : i.status === 'SENT' ? 'bg-sky-500/10 text-sky-600' : 'bg-slate-100 text-slate-600'
        }`}>
          {i.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Cetak SPH',
      align: 'center',
      render: (i) => (
        <button onClick={() => setSelectedQuotation(i)} className="px-2.5 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 font-bold rounded-lg flex items-center gap-1 mx-auto cursor-pointer text-[10px]">
          <Printer className="w-3 h-3" />
          <span>Lihat SPH</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Penawaran Sales"
        icon={FileText}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Sales Quotations (SPH)"
        glossaryItems={[
          { term: 'Sales Quotation (SPH)', description: 'Surat penawaran harga resmi kepada calon client B2B sebelum terbit Kontrak/PO Sales.' },
          { term: 'Masa Berlaku SPH', description: 'Batas tanggal penawaran harga berlaku sebelum re-evaluasi komponen HPP.' }
        ]}
        badges={[
          { label: `${quotations.length} Quotation Generated`, variant: 'sky' },
          { label: 'Official SPH PDF Generator', variant: 'emerald' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari SPH No, nama client, atau proyek..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Register Surat Penawaran Harga / SPH (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.quotationNo}
      />

      {/* SPH Preview Modal */}
      {selectedQuotation && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-xs">
            <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase">PT HOLDING ENTERPRISE INDONESIA TBD</h2>
              <h3 className="text-sm font-extrabold text-sky-600 dark:text-sky-400 uppercase">SURAT PENAWARAN HARGA (SALES QUOTATION)</h3>
              <p className="text-[11px] font-mono text-slate-500">Nomor SPH: {selectedQuotation.quotationNo}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
              <div>
                <span className="text-slate-400 text-[10px]">Kepada Yth:</span>
                <p className="font-bold text-slate-900 dark:text-white">{selectedQuotation.customerName}</p>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px]">Tanggal & Masa Berlaku:</span>
                <p className="font-mono text-slate-700 dark:text-slate-300">{selectedQuotation.date} (Berlaku s.d {selectedQuotation.validUntil})</p>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">Deskripsi Proyek:</span>
              <p className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium">{selectedQuotation.projectName}</p>
            </div>

            <div className="p-3 bg-sky-500/10 rounded-2xl flex justify-between items-center font-bold">
              <span>Total Nilai Penawaran (Inc. PPN 12%):</span>
              <span className="font-mono text-sky-600 text-sm">Rp {selectedQuotation.totalAmount.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button onClick={() => setSelectedQuotation(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 font-bold rounded-xl text-xs cursor-pointer">
                Tutup
              </button>
              <button onClick={() => alert('Fungsi cetak SPH PDF resmi berhasil dieksekusi!')} className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer flex items-center gap-1.5">
                <Printer className="w-4 h-4" />
                <span>Cetak Dokumen SPH PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
