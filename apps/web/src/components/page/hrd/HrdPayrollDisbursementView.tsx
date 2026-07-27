'use client';

import React, { useState } from 'react';
import { DollarSign, Download, Send, HelpCircle, X } from 'lucide-react';
import { usePayrollDisbursement } from '@/hooks/hrd/usePayrollDisbursement';
import { PayrollDisbursementItem } from '@/lib/mock/payroll-disburse';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

export const HrdPayrollDisbursementView = () => {
  const { batches, employees, isSendingWa, downloadBankExportFile, sendMassWaPayslips } = usePayrollDisbursement();
  const [showGlossary, setShowGlossary] = useState(false);

  const columns: ColumnDef<PayrollDisbursementItem>[] = [
    { key: 'employeeName', header: 'Nama Karyawan', className: 'font-bold text-slate-900 dark:text-white', render: (e) => e.employeeName },
    { key: 'bankAccount', header: 'Bank & No Rekening', className: 'font-mono text-slate-600 dark:text-slate-300', render: (e) => `${e.bankName} - ${e.bankAccount}` },
    { key: 'takeHomePay', header: 'Take Home Pay', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (e) => `Rp ${e.takeHomePay.toLocaleString('id-ID')}` },
    {
      key: 'waStatus',
      header: 'Status WhatsApp Slip',
      align: 'center',
      render: (e) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
          e.waStatus === 'SENT' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
        }`}>
          {e.waStatus === 'SENT' ? 'TERKIRIM WA' : 'MENUNGGU WA'}
        </span>
      )
    },
    { key: 'waSendTimestamp', header: 'Waktu Kirim WA', align: 'center', className: 'font-mono text-slate-400', render: (e) => e.waSendTimestamp || '-' }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Transfer Gaji Massal</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-emerald-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-emerald-400">
                  <span>Transfer Bank & Distribution Slip WA</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Generator file transfer gaji massal format resmi BCA KlikBisnis (.TXT) & Mandiri MCM (.CSV), serta fitur distribusi Slip Gaji WA OpenClaw 1-Klik.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={sendMassWaPayslips}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{isSendingWa ? 'Mengirim WA Slip...' : 'Kirim Slip Gaji WA Massal'}</span>
        </button>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {batches.map((b) => (
          <div key={b.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
                {b.bankName}
              </span>
              <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">{b.batchCode}</span>
            </div>

            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Batch Transfer Gaji Periode {b.periodMonth}</h4>
            <div className="text-xs text-slate-500">Total Karyawan: <strong>{b.totalEmployees} Orang</strong> | Nominal: <strong className="text-emerald-600">Rp {b.totalAmount.toLocaleString('id-ID')}</strong></div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-slate-400">{b.exportFormatFileName}</span>
              <button
                onClick={() => downloadBankExportFile(b)}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export File Bank</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <DataTable
        headerTitle={`Status Transfer Gaji & Distribusi Slip WA (${employees.length})`}
        columns={columns}
        data={employees}
        keyExtractor={(e) => e.id}
      />
    </div>
  );
};
