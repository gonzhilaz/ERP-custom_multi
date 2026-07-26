'use client';

import React, { useState } from 'react';
import { FileText, Printer, Plus, HelpCircle, X, Download } from 'lucide-react';
import { useHrExtended } from '@/hooks/hrd/useHrExtended';
import { HrLetterTemplate } from '@/lib/mock/hr-extended';

export const HrdLettersView = () => {
  const { letters } = useHrExtended();
  const [showGlossary, setShowGlossary] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<HrLetterTemplate | null>(letters[0]);

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Surat Resmi HR</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-sky-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Generator Surat Resmi 1-Click</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Pembuatan otomatis Surat Keterangan Kerja (Paklaring), SK Pengangkatan Karyawan Tetap, Surat Peringatan (SP), & Surat Tugas Dinas.
                </p>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => alert('Terbitkan Surat Resmi Baru...')} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Terbitkan Surat</span>
        </button>
      </div>

      {/* Main Grid: Letters List & Preview Document */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Letters List */}
        <div className="space-y-2 md:col-span-1">
          {letters.map((l) => (
            <div
              key={l.id}
              onClick={() => setSelectedLetter(l)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                selectedLetter?.id === l.id ? 'bg-sky-50 border-sky-500 dark:bg-sky-950/50 dark:border-sky-700' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="font-bold text-slate-900 dark:text-white">{l.title}</div>
              <div className="font-mono text-[10px] text-sky-600 dark:text-sky-400">{l.letterNumber}</div>
              <div className="text-[11px] text-slate-500">Karyawan: <strong>{l.employeeName}</strong></div>
            </div>
          ))}
        </div>

        {/* Letter Preview Box */}
        {selectedLetter && (
          <div className="md:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{selectedLetter.title}</h3>
                <span className="font-mono text-xs text-sky-600">{selectedLetter.letterNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => window.print()} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl font-semibold flex items-center gap-1 cursor-pointer">
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak</span>
                </button>
                <button onClick={() => alert('Downloading PDF...')} className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold flex items-center gap-1 cursor-pointer">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Document Content Sample */}
            <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-serif leading-relaxed space-y-4 text-xs">
              <div className="text-center font-bold text-sm uppercase underline">
                {selectedLetter.title}
              </div>
              <div className="text-center font-mono text-[11px]">
                Nomor: {selectedLetter.letterNumber}
              </div>
              <p>
                Yang bertanda tangan di bawah ini, Direktur Utama PT Nusantara Group Enterprise, menerangkan bahwa:
              </p>
              <div className="pl-4 space-y-1 font-mono text-[11px]">
                <div>Nama Lengkap : {selectedLetter.employeeName}</div>
                <div>Jabatan      : {selectedLetter.position}</div>
                <div>Tanggal SK   : {selectedLetter.issueDate}</div>
              </div>
              <p>
                Demikian surat resmi ini diterbitkan untuk dipergunakan sebagaimana mestinya.
              </p>
              <div className="pt-8 text-right font-bold">
                Jakarta, {selectedLetter.issueDate}<br />
                <strong>Direksi Nusantara Group</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
