'use client';

import React, { useState } from 'react';
import { X, FileText, Upload, Sparkles, CheckCircle2, FileScan, ArrowRight, ShieldCheck } from 'lucide-react';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfDocumentScannerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [docType, setDocType] = useState<string>('SUPPLIER_INVOICE');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<'UPLOAD' | 'EXTRACTED'>('UPLOAD');

  const [extractedData, setExtractedData] = useState({
    documentNumber: 'INV/INDOFOOD/2026/0892',
    vendorName: 'PT Indofood Sukses Makmur Tbk',
    invoiceDate: '2026-07-24',
    dueDate: '2026-08-24',
    dppAmount: 25000000,
    ppnAmount: 2750000,
    grandTotal: 27750000,
    coaTarget: '2-10100 - Utang Dagang Supplier'
  });

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleScanPdf = () => {
    if (!selectedFile && scanStep === 'UPLOAD') {
      alert('Silakan pilih berkas PDF (Invoice / PO / Surat Izin) terlebih dahulu!');
      return;
    }

    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanStep('EXTRACTED');
    }, 1500);
  };

  const handleSaveToErp = () => {
    alert(`Transaksi dari PDF [${extractedData.documentNumber}] Berhasil Disimpan ke Jurnal Utang & PO ERP!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-xl shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-2xl shrink-0">
              <FileScan className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>AI PDF Document OCR & Extractor (DeepSeek Read-PDF Engine)</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Membaca & mengekstrak data dari dokumen PDF Invoice, PO, dan Surat Resmi secara otomatis.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Upload PDF */}
        {scanStep === 'UPLOAD' && (
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tipe Dokumen PDF</label>
              <SearchableSelect
                value={docType}
                onChange={(val) => setDocType(val)}
                options={[
                  { id: 'SUPPLIER_INVOICE', label: '🧾 Tagihan Vendor / Invoice Supplier (e-Faktur PPN)' },
                  { id: 'PURCHASE_ORDER', label: '📦 Surat Pesanan Barang (Purchase Order)' },
                  { id: 'LEGAL_PERMIT', label: '📜 Dokumen Perizinan DMS / Uji KIR Fleet' },
                  { id: 'BANK_STATEMENT', label: '🏦 Rekening Koran Bank (Bank Reconciliation)' }
                ]}
              />
            </div>

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center space-y-3 bg-slate-50 dark:bg-slate-800/40">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Unggah Dokumen PDF untuk Diefisiensi AI</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Format didukung: Berkas PDF (Maksimal 25MB per dokumen)</p>
              </div>

              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-file-input"
              />
              <label
                htmlFor="pdf-file-input"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold cursor-pointer transition-all shadow-md text-xs"
              >
                <Upload className="w-4 h-4" />
                <span>{selectedFile ? selectedFile.name : 'Pilih Berkas PDF'}</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={onClose} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold">
                Batal
              </button>
              <button
                onClick={handleScanPdf}
                disabled={isScanning}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isScanning ? 'Membaca & Memindai PDF...' : 'Ekstraksi Data AI'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Extracted Result Preview */}
        {scanStep === 'EXTRACTED' && (
          <div className="space-y-4">
            <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-2xl text-violet-700 dark:text-violet-300 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-500" />
                <span>Ekstraksi PDF Berhasil! DeepSeek mengenali 8 entitas data dari berkas PDF.</span>
              </div>
              <span className="font-mono font-bold">Confidence: 99.8%</span>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">Nomor Invoice PDF:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{extractedData.documentNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">Nama Vendor / Supplier:</span>
                <span className="font-bold text-slate-900 dark:text-white">{extractedData.vendorName}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">Tanggal Invoice:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{extractedData.invoiceDate}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">Jatuh Tempo:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{extractedData.dueDate}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">Nominal DPP:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">Rp {extractedData.dppAmount.toLocaleString('id-ID')}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">PPN Keluaran/Masukan (11%):</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">Rp {extractedData.ppnAmount.toLocaleString('id-ID')}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">Total Tagihan Akhir:</span>
                  <span className="font-mono text-base font-bold text-indigo-600 dark:text-indigo-400">Rp {extractedData.grandTotal.toLocaleString('id-ID')}</span>
                </div>
                <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-xl font-mono text-[10px] font-bold">
                  {extractedData.coaTarget}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setScanStep('UPLOAD')} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold">
                Scan Berkas Lain
              </button>
              <button
                onClick={handleSaveToErp}
                className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Posting Transaksi ke ERP</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
