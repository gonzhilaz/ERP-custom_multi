'use client';

import React from 'react';
import { X, Printer, FileText, QrCode, CheckCircle2, DollarSign } from 'lucide-react';

interface CrmQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotationData: {
    quotationNumber: string;
    documentType: 'SURAT_PENAWARAN' | 'SURAT_KONFIRMASI_ORDER';
    clientCompany: string;
    clientContactPerson: string;
    subject: string;
    validUntilDate: string;
    totalProposedAmount: number;
    termsAndConditions: string;
  } | null;
}

export const CrmQuotationModal: React.FC<CrmQuotationModalProps> = ({ isOpen, onClose, quotationData }) => {
  if (!isOpen || !quotationData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {quotationData.documentType === 'SURAT_PENAWARAN' ? 'Surat Penawaran Harga Resmi' : 'Surat Konfirmasi Pesanan (Order Confirmation)'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-sky-600 text-white rounded-xl font-bold text-xs hover:bg-sky-500 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Dokumen</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quotation Body Document */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto font-sans text-slate-900 dark:text-slate-100 text-xs">
          {/* Header Kop Surat */}
          <div className="border-b-2 border-sky-600 pb-4 text-center space-y-1">
            <div className="text-base font-extrabold tracking-widest uppercase">HOLDING ENTERPRISE SALES & MARKETING</div>
            <div className="text-[11px] text-slate-500">Jl. Jendral Sudirman Kav 88, Jakarta Pusat • Email: sales@holding.erp.com</div>
            <div className="text-sm font-bold text-sky-600 dark:text-sky-400 pt-2 tracking-wider uppercase underline">
              {quotationData.documentType === 'SURAT_PENAWARAN' ? 'SURAT PENAWARAN HARGA (QUOTATION PROPOSAL)' : 'SURAT KONFIRMASI PESANAN (CONFIRMATION LETTER)'}
            </div>
            <div className="font-mono text-slate-500 font-bold">No: {quotationData.quotationNumber}</div>
          </div>

          {/* Client Info Grid */}
          <div className="p-4 bg-sky-50/50 dark:bg-sky-950/30 rounded-2xl border border-sky-200 dark:border-sky-800 space-y-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 text-[10px] block">Kepada Yth:</span>
                <span className="font-bold text-sm text-slate-900 dark:text-white">{quotationData.clientCompany}</span>
                <span className="text-slate-500 block text-[11px]">Up: {quotationData.clientContactPerson}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block">Masa Berlaku Penawaran:</span>
                <span className="font-mono font-bold text-rose-600">S/D {quotationData.validUntilDate}</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-slate-400 text-[10px] block uppercase font-bold">Perihal / Subject Penawaran:</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{quotationData.subject}</p>
          </div>

          {/* Proposed Nominal Box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-slate-400 text-[10px] block font-bold">ESTIMASI TOTAL PENAWARAN HARGA:</span>
              <span className="text-base font-extrabold text-sky-600 dark:text-sky-400 font-mono">
                Rp {quotationData.totalProposedAmount.toLocaleString('id-ID')}
              </span>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 font-bold font-mono rounded-lg border border-emerald-500/30">
              TERMASUK PPN 11%
            </span>
          </div>

          <div>
            <span className="text-slate-400 text-[10px] block font-bold uppercase mb-1">Syarat & Ketentuan Pembayaran (Terms):</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
              {quotationData.termsAndConditions}
            </p>
          </div>

          {/* Signatures & QR Code */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="space-y-8">
              <span className="text-slate-400 text-[10px] block">Sales Executive</span>
              <div className="font-bold underline">Budi Santoso</div>
            </div>
            <div className="space-y-8">
              <span className="text-slate-400 text-[10px] block">Disetujui Klien B2B</span>
              <div className="font-bold">{quotationData.clientCompany}</div>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
              <div className="p-2 bg-slate-900 rounded-xl text-white">
                <QrCode className="w-8 h-8 text-sky-400" />
              </div>
              <span className="font-mono text-[9px] text-slate-400 font-bold">QUOTATION-VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
