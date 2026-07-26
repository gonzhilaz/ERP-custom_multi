'use client';

import React from 'react';
import { Calculator } from 'lucide-react';

interface Props {
  cutoffDay: number;
  setCutoffDay: (d: number) => void;
  paymentDay: number;
  setPaymentDay: (d: number) => void;
  prorataForm: {
    employeeName: string;
    baseSalary: number;
    resignationDate: string;
    unpaidDays: number;
    workingDaysInMonth: number;
  };
  setProrataForm: React.Dispatch<React.SetStateAction<any>>;
  prorataResult: number | null;
  onCalculateProrata: (e: React.FormEvent) => void;
}

export const HrdPayrollProrataTab = ({
  cutoffDay,
  setCutoffDay,
  paymentDay,
  setPaymentDay,
  prorataForm,
  setProrataForm,
  prorataResult,
  onCalculateProrata
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      {/* Box 1: Cut-off Schedule */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
          Jadwal Cut-off & Tanggal Pembayaran Gaji
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Tanggal Cut-off Absensi & Lembur Setiap Bulan</label>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white">Tanggal</span>
              <input
                type="number"
                min={1}
                max={31}
                value={cutoffDay}
                onChange={(e) => setCutoffDay(Number(e.target.value))}
                className="w-20 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-center"
              />
              <span className="text-slate-400 text-[11px]">(Default: Tanggal 25)</span>
            </div>
          </div>

          <div>
            <label className="block text-slate-500 font-semibold mb-1">Tanggal Disbursment Gaji / Payroll Payment</label>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white">Tanggal</span>
              <input
                type="number"
                min={1}
                max={31}
                value={paymentDay}
                onChange={(e) => setPaymentDay(Number(e.target.value))}
                className="w-20 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-center"
              />
              <span className="text-slate-400 text-[11px]">(Default: Tanggal 1 Bulan Berikut)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Box 2: Prorata Resign Calculator */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
          Kalkulator Prorata Gaji Terhutang Resign
        </h3>
        <form onSubmit={onCalculateProrata} className="space-y-3">
          <div>
            <label className="block text-slate-500 font-semibold mb-1">Pilih Karyawan Resign</label>
            <input
              type="text"
              value={prorataForm.employeeName}
              onChange={(e) => setProrataForm({ ...prorataForm, employeeName: e.target.value })}
              className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Hari Kerja Terhutang (Sisa Cutoff)</label>
              <input
                type="number"
                value={prorataForm.unpaidDays}
                onChange={(e) => setProrataForm({ ...prorataForm, unpaidDays: Number(e.target.value) })}
                className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Gaji Pokok Resign (Rp)</label>
              <input
                type="number"
                value={prorataForm.baseSalary}
                onChange={(e) => setProrataForm({ ...prorataForm, baseSalary: Number(e.target.value) })}
                className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Calculator className="w-4 h-4" />
            <span>Kalkulasi Gaji Prorata</span>
          </button>

          {prorataResult !== null && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-slate-500 text-[11px] block">Nominal Prorata Gaji Terhutang:</span>
              <span className="font-mono text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                Rp {prorataResult.toLocaleString('id-ID')}
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
