'use client';

import React, { useState } from 'react';
import { DollarSign, ArrowDownLeft, ArrowUpRight, TrendingUp, Download, RefreshCw } from 'lucide-react';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

export const CashFlowReportTab = () => {
  const [method, setMethod] = useState<'DIRECT' | 'INDIRECT'>('INDIRECT');
  const [period, setPeriod] = useState('2026-07');

  const methodOptions = [
    { id: 'INDIRECT', label: 'Metode Tidak Langsung (Indirect Method)', subLabel: 'Standard IAS 7 / PSAK 2 (Reconcile Net Income)' },
    { id: 'DIRECT', label: 'Metode Langsung (Direct Method)', subLabel: 'Standard IAS 7 / PSAK 2 (Gross Cash Receipts & Payments)' }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Control Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="w-full sm:w-80">
          <label className="block text-[10px] font-bold text-sky-600 dark:text-sky-400 mb-1">Metode Laporan Arus Kas:</label>
          <SearchableSelect
            options={methodOptions}
            value={method}
            onChange={(val) => setMethod(val as any)}
            placeholder="Pilih Metode Cash Flow..."
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <input type="month" value={period} onChange={(e) => setPeriod(e.target.value)} className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-slate-900 dark:text-white font-bold" />
          <button className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Download className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Main Cash Flow Statement Document */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
        <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wide">PT HOLDING ENTERPRISE INDONESIA TBD</h2>
          <h3 className="text-sm font-extrabold text-sky-600 dark:text-sky-400 uppercase">LAPORAN ARUS KAS (STATEMENT OF CASH FLOWS)</h3>
          <p className="text-[11px] text-slate-500 font-mono">Untuk Periode Yang Berakhir Pada 31 Juli 2026 (Dalam Rupiah)</p>
        </div>

        {method === 'INDIRECT' ? (
          <div className="space-y-6">
            {/* SECTION 1: OPERATING ACTIVITIES */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase border-b pb-1 border-slate-200 dark:border-slate-800 flex justify-between">
                <span>1. ARUS KAS DARI AKTIVITAS OPERASIONAL</span>
                <span>(IDR)</span>
              </h4>
              <div className="space-y-1.5 pl-3 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between font-bold text-sky-600 dark:text-sky-400">
                  <span>Laba Bersih Setelah Pajak (Net Income)</span>
                  <span className="font-mono">Rp 485.200.000</span>
                </div>
                <div className="pl-3 space-y-1 text-slate-500">
                  <div className="flex justify-between">
                    <span>+ Penyusutan & Amortisasi Aset Tetap</span>
                    <span className="font-mono">Rp 42.500.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>( + / - ) Kerugian / Keuntungan Penjualan Aset</span>
                    <span className="font-mono">Rp 0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>( + / - ) Perubahan Piutang Usaha (AR)</span>
                    <span className="font-mono text-rose-500">(Rp 35.000.000)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>( + / - ) Perubahan Persediaan Barang (Inventory)</span>
                    <span className="font-mono text-rose-500">(Rp 18.200.000)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>( + / - ) Perubahan Utang Usaha (AP)</span>
                    <span className="font-mono text-emerald-500">Rp 24.800.000</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-slate-900 dark:text-white border-t border-dashed border-slate-200 dark:border-slate-800 pt-1">
                  <span>Kas Bersih Dihasilkan dari Aktivitas Operasional</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">Rp 499.300.000</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: INVESTING ACTIVITIES */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase border-b pb-1 border-slate-200 dark:border-slate-800 flex justify-between">
                <span>2. ARUS KAS DARI AKTIVITAS INVESTASI</span>
                <span>(IDR)</span>
              </h4>
              <div className="space-y-1.5 pl-3 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between text-slate-500">
                  <span>Pembelian Aset Tetap Kendaraan & Peralatan Tambang</span>
                  <span className="font-mono text-rose-500">(Rp 150.000.000)</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Penerimaan Hasil Penjualan Aset Bekas</span>
                  <span className="font-mono text-emerald-500">Rp 15.000.000</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 dark:text-white border-t border-dashed border-slate-200 dark:border-slate-800 pt-1">
                  <span>Kas Bersih Used for Aktivitas Investasi</span>
                  <span className="font-mono text-rose-600 dark:text-rose-400">(Rp 135.000.000)</span>
                </div>
              </div>
            </div>

            {/* SECTION 3: FINANCING ACTIVITIES */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase border-b pb-1 border-slate-200 dark:border-slate-800 flex justify-between">
                <span>3. ARUS KAS DARI AKTIVITAS PENDANAAN</span>
                <span>(IDR)</span>
              </h4>
              <div className="space-y-1.5 pl-3 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between text-slate-500">
                  <span>Penerimaan Setoran Modal Pemegang Saham</span>
                  <span className="font-mono text-emerald-500">Rp 200.000.000</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Pembayaran Pembagian Dividen Tunai</span>
                  <span className="font-mono text-rose-500">(Rp 50.000.000)</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 dark:text-white border-t border-dashed border-slate-200 dark:border-slate-800 pt-1">
                  <span>Kas Bersih Dihasilkan dari Aktivitas Pendanaan</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">Rp 150.000.000</span>
                </div>
              </div>
            </div>

            {/* NET CASH SUMMARY */}
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl space-y-2 border border-slate-200 dark:border-slate-700 font-bold">
              <div className="flex justify-between text-slate-900 dark:text-white">
                <span>KENAIKAN (PENURUNAN) BERSIH KAS & SETARA KAS</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">Rp 514.300.000</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>SALDO KAS & SETARA KAS AWAL PERIODE</span>
                <span className="font-mono">Rp 742.000.000</span>
              </div>
              <div className="flex justify-between text-sky-600 dark:text-sky-400 text-sm border-t border-slate-300 dark:border-slate-600 pt-2">
                <span>SALDO KAS & SETARA KAS AKHIR PERIODE</span>
                <span className="font-mono font-extrabold">Rp 1.256.300.000</span>
              </div>
            </div>
          </div>
        ) : (
          /* DIRECT METHOD */
          <div className="space-y-4">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase border-b pb-1 border-slate-200 dark:border-slate-800">
              1. ARUS KAS MASUK & KELUAR OPERASIONAL (DIRECT METHOD)
            </h4>
            <div className="space-y-2 pl-3">
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Penerimaan Kas dari Pelanggan (Customer Receipts)</span>
                <span className="font-mono text-emerald-600 font-bold">Rp 1.450.000.000</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Pembayaran Kas Kepada Supplier / Vendor Persediaan</span>
                <span className="font-mono text-rose-600 font-bold">(Rp 620.000.000)</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Pembayaran Kas Gaji Karyawan & BPJS Payroll</span>
                <span className="font-mono text-rose-600 font-bold">(Rp 210.000.000)</span>
              </div>
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Pembayaran Kas Pajak DJP (PPh & PPN)</span>
                <span className="font-mono text-rose-600 font-bold">(Rp 120.700.000)</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 dark:text-white border-t border-dashed border-slate-200 dark:border-slate-800 pt-2">
                <span>Kas Bersih Dihasilkan dari Aktivitas Operasional (Direct)</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">Rp 499.300.000</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
