'use client';

import React from 'react';
import { Upload, Download, CheckCircle2 } from 'lucide-react';

interface Props {
  importFileName: string | null;
  isImportValidated: boolean;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProcessMassImport: () => void;
}

export const HrdPayrollMassImportTab = ({
  importFileName,
  isImportValidated,
  onFileUpload,
  onProcessMassImport
}: Props) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Mass Import Batch Payroll (Excel / CSV)</h3>
        <button
          onClick={() => alert('Template Excel Batch Payroll Auto-Downloaded!')}
          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Template CSV</span>
        </button>
      </div>

      <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center space-y-3 bg-slate-50/50 dark:bg-slate-800/20">
        <Upload className="w-8 h-8 text-sky-500 mx-auto" />
        <div>
          <p className="font-bold text-slate-900 dark:text-white">Upload File Batch Payroll (1.000+ Karyawan)</p>
          <p className="text-[11px] text-slate-400">Format didukung: .XLSX, .CSV (Maksimal 10MB per batch)</p>
        </div>

        <input
          type="file"
          id="payroll-batch-upload"
          accept=".xlsx, .csv"
          onChange={onFileUpload}
          className="hidden"
        />

        <label
          htmlFor="payroll-batch-upload"
          className="inline-block px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold cursor-pointer transition-all shadow-sm"
        >
          Pilih File Batch Payroll
        </label>

        {importFileName && (
          <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between max-w-md mx-auto">
            <span className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">{importFileName}</span>
            <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">1,248 Rows Ready</span>
          </div>
        )}
      </div>

      {isImportValidated && (
        <button
          onClick={onProcessMassImport}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Proses Import 1,248 Data Karyawan Ke Payroll Run</span>
        </button>
      )}
    </div>
  );
};
