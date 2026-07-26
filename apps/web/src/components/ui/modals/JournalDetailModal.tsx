'use client';

import React from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';

export interface JournalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  journal: {
    jvNumber: string;
    date: string;
    description: string;
    debitAmount: number;
    creditAmount: number;
    postedBy: string;
    status: string;
    lineItems?: {
      coaCode: string;
      accountName: string;
      debit: number;
      credit: number;
    }[];
  } | null;
}

export const JournalDetailModal: React.FC<JournalDetailProps> = ({ isOpen, onClose, journal }) => {
  if (!isOpen || !journal) return null;

  const defaultLines = journal.lineItems || [
    { coaCode: '101-100', accountName: 'Kas Utama Holding Mandiri', debit: journal.debitAmount, credit: 0 },
    { coaCode: '401-200', accountName: 'Pendapatan Penjualan Catering Massal', debit: 0, credit: journal.creditAmount }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-500" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Voucher Jurnal Audit & Debit/Kredit Ledger</h3>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{journal.jvNumber} • Tanggal: {journal.date}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voucher Header Meta */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1 text-xs">
          <div className="text-slate-400">Keterangan Transaksi:</div>
          <div className="font-bold text-slate-900 dark:text-white">{journal.description}</div>
          <div className="flex justify-between text-[11px] text-slate-500 pt-1">
            <span>Diposting oleh: <strong className="text-slate-700 dark:text-slate-300">{journal.postedBy || 'Budi Santoso (Accounting)'}</strong></span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> BALANCED & POSTED
            </span>
          </div>
        </div>

        {/* Breakdown Debit vs Kredit Table */}
        <div className="space-y-2">
          <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Rincian Pos Kode Akun (COA Breakdown)</h4>
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Kode Akun (COA)</th>
                  <th className="py-2.5 px-3">Nama Akun Buku Besar</th>
                  <th className="py-2.5 px-3 text-right">Debet (Rp)</th>
                  <th className="py-2.5 px-3 text-right">Kredit (Rp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {defaultLines.map((line, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-mono font-bold text-sky-600">{line.coaCode}</td>
                    <td className="py-2.5 px-3 font-semibold">{line.accountName}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600">
                      {line.debit > 0 ? `Rp ${line.debit.toLocaleString('id-ID')}` : '-'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600">
                      {line.credit > 0 ? `Rp ${line.credit.toLocaleString('id-ID')}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-800/80 font-bold border-t border-slate-200 dark:border-slate-800">
                <tr>
                  <td colSpan={2} className="py-2.5 px-3 text-right">TOTAL JURNAL:</td>
                  <td className="py-2.5 px-3 text-right text-emerald-600">Rp {journal.debitAmount.toLocaleString('id-ID')}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-600">Rp {journal.creditAmount.toLocaleString('id-ID')}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-between items-center pt-2">
          <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5">
            <Printer className="w-4 h-4" />
            <span>Cetak Voucher Jurnal</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/20 transition-all"
          >
            Tutup (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
