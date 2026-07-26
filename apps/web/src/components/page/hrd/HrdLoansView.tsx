'use client';

import React, { useState } from 'react';
import { DollarSign, Plus, CheckCircle, HelpCircle, X, CreditCard } from 'lucide-react';
import { useHrExtended } from '@/hooks/hrd/useHrExtended';

export const HrdLoansView = () => {
  const { loans, processPayrollLoanDeduction, addLoan } = useHrExtended();
  const [showGlossary, setShowGlossary] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    employeeName: 'Budi Santoso',
    departmentName: 'Operasional Site Tambang',
    totalAmount: 6000000,
    tenorMonths: 6
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const loanCode = `LOAN-2026-${Math.floor(100 + Math.random() * 900)}`;
    const monthlyDeduction = Math.round(form.totalAmount / form.tenorMonths);
    addLoan({
      loanCode,
      employeeName: form.employeeName,
      departmentName: form.departmentName,
      totalAmount: form.totalAmount,
      tenorMonths: form.tenorMonths,
      monthlyDeduction
    });
    alert(`Pengajuan Kasbon Karyawan [${form.employeeName}] Rp ${form.totalAmount.toLocaleString('id-ID')} Disetujui!`);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Pinjaman & Kasbon</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-emerald-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-emerald-400">
                  <span>Pinjaman & Kasbon Karyawan</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Pengelolaan pinjaman darurat/kasbon karyawan dengan fitur pemotongan otomatis per bulan pada Payroll Engine.
                </p>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setShowModal(true)} className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Pengajuan Kasbon</span>
        </button>
      </div>

      {/* Loans Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500">
              <th className="p-3 font-semibold">Kode Kasbon</th>
              <th className="p-3 font-semibold">Nama Karyawan</th>
              <th className="p-3 font-semibold">Total Pinjaman</th>
              <th className="p-3 font-semibold text-center">Cicilan / Bulan</th>
              <th className="p-3 font-semibold text-center">Sisa Pinjaman</th>
              <th className="p-3 font-semibold text-center">Status</th>
              <th className="p-3 font-semibold text-center">Aksi Payroll</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {loans.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-bold font-mono text-emerald-600">{l.loanCode}</td>
                <td className="p-3 font-bold text-slate-900 dark:text-white">{l.employeeName}</td>
                <td className="p-3 font-bold text-slate-700 dark:text-slate-300">Rp {l.totalAmount.toLocaleString('id-ID')}</td>
                <td className="p-3 text-center text-slate-600 dark:text-slate-300">Rp {l.monthlyDeduction.toLocaleString('id-ID')} ({l.tenorMonths} Bln)</td>
                <td className="p-3 text-center font-bold text-rose-600">Rp {l.remainingAmount.toLocaleString('id-ID')}</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    l.status === 'PAID_OFF' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {l.status === 'PAID_OFF' ? 'LUNAS' : 'AKTIF'}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {l.status === 'ACTIVE' ? (
                    <button onClick={() => processPayrollLoanDeduction(l.id)} className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-[10px] cursor-pointer">
                      Potong Gaji Bulan Ini
                    </button>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-white dark:bg-slate-900 w-full max-w-md p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Form Pengajuan Kasbon Karyawan</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Nama Karyawan:</label>
                <input type="text" value={form.employeeName} onChange={(e) => setForm({ ...form, employeeName: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Total Nominal Pinjaman (Rp):</label>
                <input type="number" value={form.totalAmount} onChange={(e) => setForm({ ...form, totalAmount: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none font-bold text-emerald-600" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Tenor Cicilan (Bulan):</label>
                <input type="number" value={form.tenorMonths} onChange={(e) => setForm({ ...form, tenorMonths: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" />
              </div>
            </div>
            <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md cursor-pointer">
              Setujui & Terbitkan Kasbon
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
