'use client';

import React from 'react';
import { X, Printer, FileText, QrCode, DollarSign, CheckCircle2, ShieldCheck } from 'lucide-react';

interface BillingInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: {
    invoiceNumber: string;
    invoiceType: 'COMMERCIAL_INVOICE' | 'PROFORMA_INVOICE' | 'DP_RECEIPT' | 'AR_STATEMENT';
    clientName: string;
    clientAddress: string;
    taxIdNpwp: string;
    issueDate: string;
    dueDate: string;
    items: { description: string; qty: number; unitPrice: number; totalPrice: number }[];
    subtotal: number;
    ppn11Pct: number;
    grandTotal: number;
    bankAccountInfo: string;
  } | null;
}

export const BillingInvoiceModal: React.FC<BillingInvoiceModalProps> = ({ isOpen, onClose, invoiceData }) => {
  if (!isOpen || !invoiceData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Surat Billing & Tagihan Resmi (Commercial Invoice)</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-500 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Invoice</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Body Document */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto font-sans text-slate-900 dark:text-slate-100 text-xs">
          {/* Header Kop Perusahaan */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 dark:border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="text-base font-extrabold tracking-widest uppercase">HOLDING ENTERPRISE ERP GROUP</div>
              <div className="text-[11px] text-slate-500">Jl. Jendral Sudirman Kav 88, Jakarta Pusat • NPWP: 01.345.678.9-012.000</div>
              <div className="text-[11px] text-slate-500">Telp: (021) 555-8890 • Email: billing@holding.erp.com</div>
            </div>

            <div className="text-right space-y-1 font-mono">
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 underline uppercase">
                {invoiceData.invoiceType}
              </div>
              <div className="font-bold text-slate-900 dark:text-white">No: {invoiceData.invoiceNumber}</div>
              <div className="text-slate-400 text-[10px]">Tanggal: {invoiceData.issueDate}</div>
              <div className="text-rose-600 font-bold text-[10px]">Jatuh Tempo: {invoiceData.dueDate}</div>
            </div>
          </div>

          {/* Billed To Client Grid */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 text-[10px] block font-bold uppercase">Ditagihkan Kepada (Billed To):</span>
            <div className="font-bold text-sm text-slate-900 dark:text-white">{invoiceData.clientName}</div>
            <div className="text-slate-600 dark:text-slate-300">{invoiceData.clientAddress}</div>
            <div className="text-[10px] text-slate-400 font-mono">NPWP Klien: {invoiceData.taxIdNpwp}</div>
          </div>

          {/* Items Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Deskripsi Produk / Layanan</th>
                  <th className="py-2.5 px-4 text-center">Qty</th>
                  <th className="py-2.5 px-4 text-right">Harga Satuan (Rp)</th>
                  <th className="py-2.5 px-4 text-right">Total (Rp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {invoiceData.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 font-medium">{item.description}</td>
                    <td className="py-3 px-4 text-center font-mono">{item.qty}</td>
                    <td className="py-3 px-4 text-right font-mono">Rp {item.unitPrice.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold">Rp {item.totalPrice.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Breakdown */}
          <div className="flex justify-between items-end pt-2">
            <div className="space-y-1 text-[11px] p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 block">Metode Pembayaran Transfer Bank:</span>
              <div className="font-mono text-emerald-700 dark:text-emerald-300 font-semibold">{invoiceData.bankAccountInfo}</div>
            </div>

            <div className="w-64 space-y-1.5 font-mono text-xs text-right">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span>Rp {invoiceData.subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>PPN 11%:</span>
                <span>Rp {invoiceData.ppn11Pct.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-emerald-600 dark:text-emerald-400 border-t border-slate-200 dark:border-slate-800 pt-1.5">
                <span>TOTAL TAGIHAN:</span>
                <span>Rp {invoiceData.grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Signatures & QR Code */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="space-y-8">
              <span className="text-slate-400 text-[10px] block">Hormat Kami, Finance Dept</span>
              <div className="font-bold underline">Bambang S. (Finance Manager)</div>
            </div>
            <div className="space-y-8">
              <span className="text-slate-400 text-[10px] block">Penerima / Klien</span>
              <div className="font-bold">{invoiceData.clientName}</div>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
              <div className="p-2 bg-slate-900 rounded-xl text-white">
                <QrCode className="w-8 h-8 text-emerald-400" />
              </div>
              <span className="font-mono text-[9px] text-slate-400 font-bold">INVOICE-VERIFIED-SAH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
