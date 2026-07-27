'use client';

import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, QrCode, FileText } from 'lucide-react';
import { SppdOrder } from '@/lib/hrd/sppd-governance';

interface SppdDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: SppdOrder | null;
}

export const SppdDocumentModal: React.FC<SppdDocumentModalProps> = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Dokumen Resmi Surat Perintah Perjalanan Dinas (SPPD)</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-500 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto font-sans text-slate-900 dark:text-slate-100 text-xs">
          {/* Header Kop Surat */}
          <div className="border-b-2 border-slate-900 dark:border-slate-100 pb-4 text-center space-y-1">
            <div className="text-base font-extrabold tracking-widest uppercase">HOLDING ENTERPRISE MULTI TENANT GROUP</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Jl. Jendral Sudirman Kav 88, Jakarta Pusat • Email: hrd@holding.erp.com</div>
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 pt-2 tracking-wider uppercase underline">
              SURAT PERINTH PERJALANAN DINAS (SPPD)
            </div>
            <div className="font-mono text-slate-500 font-bold">Nomor: {order.sppdNumber}</div>
          </div>

          {/* Assigned Employee Details Table */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase text-slate-500 tracking-wider">I. Diberikan Perintah Kepada Pegawai:</div>
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-slate-400 text-[10px] block">Nama Karyawan:</span>
                <span className="font-bold text-sm text-slate-900 dark:text-white">{order.employeeName}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">NIP / Kode Pegawai:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{order.employeeId}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Jabatan / Posisi:</span>
                <span className="font-semibold">{order.employeePosition}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Departemen / Sektor:</span>
                <span className="font-semibold">{order.department}</span>
              </div>
            </div>
          </div>

          {/* Out of Office Assignment Logic & Locations */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase text-slate-500 tracking-wider">II. Rincian Instruksi Tugas Perjalanan Dinas Antar Cabang:</div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 text-[10px] block">Unit Usaha Asal (Origin):</span>
                  <span className="font-bold text-slate-900 dark:text-white">{order.originBranch}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Unit Usaha Tujuan (Destination):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{order.destinationBranch}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Maksud & Tujuan Perintah Perjalanan Dinas:</span>
                <p className="font-medium text-slate-700 dark:text-slate-200 mt-0.5 leading-relaxed bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  {order.purpose}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div>
                  <span className="text-slate-400 text-[10px] block">Tanggal Berangkat:</span>
                  <span className="font-mono font-bold">{order.startDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Tanggal Kembali:</span>
                  <span className="font-mono font-bold">{order.endDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Lama Dinas:</span>
                  <span className="font-mono font-bold text-indigo-600">{order.daysCount} Hari Kerja</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Allowance Breakdown */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase text-slate-500 tracking-wider">III. Alokasi Uang Saku & Biaya Perjalanan Dinas:</div>
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Uang Saku Per Diem ({order.daysCount} Hari):</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">Rp {order.allowancePerDiem.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Biaya Transportasi & Tiket Inter-Branch:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">Rp {order.transportAllowance.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center border-t border-indigo-200 dark:border-indigo-800 pt-2 font-bold text-slate-900 dark:text-white">
                <span>Total Biaya Dinas Disetujui:</span>
                <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
                  Rp {(order.allowancePerDiem + order.transportAllowance).toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Signatures & QR Token Code */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="space-y-8">
              <span className="text-slate-400 text-[10px] block">Pegawai Terperintah</span>
              <div className="font-bold underline">{order.employeeName}</div>
            </div>

            <div className="space-y-8">
              <span className="text-slate-400 text-[10px] block">Persetujuan Supervisor</span>
              <div className="font-bold text-emerald-600 dark:text-emerald-400">{order.approvedBySpv || '(Pending Approval)'}</div>
            </div>

            <div className="space-y-2 flex flex-col items-center justify-center">
              <div className="p-2 bg-slate-900 rounded-xl text-white">
                <QrCode className="w-10 h-10 text-sky-400" />
              </div>
              <span className="font-mono text-[9px] text-slate-400 font-bold">{order.qrVerificationToken}</span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Verifikasi QR Sah
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
