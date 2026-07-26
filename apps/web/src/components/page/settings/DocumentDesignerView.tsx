'use client';

import React, { useState } from 'react';
import { Palette, Save, HelpCircle, X } from 'lucide-react';

export const DocumentDesignerView = () => {
  const [docType, setDocType] = useState<'INVOICE' | 'PURCHASE_ORDER' | 'PAYSLIP'>('INVOICE');
  const [accentColor, setAccentColor] = useState('#0284c7');
  const [showTaxId, setShowTaxId] = useState(true);
  const [footerTerms, setFooterTerms] = useState('Pembayaran transfer ke Rekening Mandiri 123-000-8899 a/n PT Nusantara Group.');
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-sky-500" />
            <span>Designer Dokumen</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Designer Dokumen"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Document Designer</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Brand Customization</strong>: Pengaturan logo, warna aksen brand, NPWP, & footer cetak pada Invoice, PO, & Slip Gaji.
                </p>
              </div>
            )}
          </div>
        </div>

        <button className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer">
          <Save className="w-4 h-4" />
          <span>Simpan Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Designer Controls (Left Column) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Pengaturan Template</h3>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Pilih Jenis Dokumen:</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
            >
              <option value="INVOICE">Billing Invoice Penjualan (AR)</option>
              <option value="PURCHASE_ORDER">Purchase Order (PO Vendor)</option>
              <option value="PAYSLIP">Slip Gaji Karyawan (Payroll)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Warna Aksen Brand Dokumen:</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border-0"
              />
              <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{accentColor}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="taxId"
              checked={showTaxId}
              onChange={(e) => setShowTaxId(e.target.checked)}
              className="rounded text-sky-600 focus:ring-sky-500"
            />
            <label htmlFor="taxId" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              Tampilkan NPWP Resmi Perusahaan di Header
            </label>
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-xs font-medium text-slate-500">Catatan Footer / Rekening Pembayaran:</label>
            <textarea
              rows={3}
              value={footerTerms}
              onChange={(e) => setFooterTerms(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs focus:outline-none"
            />
          </div>
        </div>

        {/* Live Preview Document (Right Column) */}
        <div className="lg:col-span-7 bg-slate-100 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-center items-center">
          <div className="w-full max-w-md bg-white text-slate-900 p-6 rounded-xl shadow-lg border border-slate-200 space-y-4 text-xs">
            {/* Header Live Preview */}
            <div className="flex justify-between items-start border-b pb-3" style={{ borderColor: accentColor }}>
              <div>
                <h2 className="font-bold text-base text-slate-900">Nusantara Group</h2>
                <p className="text-[10px] text-slate-500">Jl. Jendral Sudirman No. 88, Jakarta</p>
                {showTaxId && <p className="text-[9px] text-slate-400 font-mono">NPWP: 01.234.567.8-012.000</p>}
              </div>
              <div className="text-right">
                <span className="font-bold text-sm uppercase px-2 py-0.5 rounded text-white" style={{ backgroundColor: accentColor }}>
                  {docType}
                </span>
                <p className="text-[10px] font-mono text-slate-400 mt-1">#INV-2026-07-0099</p>
              </div>
            </div>

            {/* Document Body Preview */}
            <div className="space-y-2 py-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Detail Transaksi</div>
              <table className="w-full text-left text-[11px]">
                <thead className="border-b">
                  <tr>
                    <th className="py-1">Deskripsi Item</th>
                    <th className="py-1 text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">Katering Event Massal (100 Pax)</td>
                    <td className="py-1 text-right font-bold">Rp 15.000.000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Live Preview */}
            <div className="border-t pt-3 text-[10px] text-slate-500 italic">
              {footerTerms}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
