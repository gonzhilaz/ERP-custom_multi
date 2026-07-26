'use client';

import React, { useState } from 'react';
import { Plane, Plus, CheckCircle2, HelpCircle, X, DollarSign, Calculator } from 'lucide-react';
import { useTravelExpenses } from '@/hooks/hrd/useTravelExpenses';

export const HrdTravelExpensesView = () => {
  const { expenses, calculatePerDiem, settleTravelExpense, addTravelRequest } = useTravelExpenses();
  const [showGlossary, setShowGlossary] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    employeeName: 'Budi Santoso',
    departmentName: 'Operasional Site Tambang',
    destinationCity: 'Samarinda, Kaltim',
    purpose: 'Inspeksi Maintenance Heavy Machinery Site Gold-01',
    startDate: '2026-08-05',
    endDate: '2026-08-09',
    daysCount: 5,
    hotelFlightAdvance: 3500000,
    actualSpentReceipts: 6000000
  });

  const { ratePerDay, perDiemTotal } = calculatePerDiem(form.daysCount, form.destinationCity);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addTravelRequest({
      employeeName: form.employeeName,
      departmentName: form.departmentName,
      destinationCity: form.destinationCity,
      purpose: form.purpose,
      startDate: form.startDate,
      endDate: form.endDate,
      daysCount: form.daysCount,
      perDiemRatePerDay: ratePerDay,
      perDiemTotal,
      hotelFlightAdvance: form.hotelFlightAdvance,
      actualSpentReceipts: form.actualSpentReceipts
    });
    alert(`Surat Perjalanan Dinas (SPD) [${form.employeeName}] Berhasil Diterbitkan! Uang Saku Per Diem: Rp ${perDiemTotal.toLocaleString('id-ID')}`);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0">
            <Plane className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Perjalanan Dinas</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-indigo-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-indigo-400">
                  <span>Perjalanan Dinas & Per Diem Allowance</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Pengelolaan Surat Perjalanan Dinas (SPD), kalkulator otomatis uang saku harian (*per diem*), dan penyelesaian (*settlement*) nota penerbangan/hotel dengan Finance AP.
                </p>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setShowModal(true)} className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Pengajuan SPD</span>
        </button>
      </div>

      {/* Table Expenses */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500">
              <th className="p-3 font-semibold">Kode SPD</th>
              <th className="p-3 font-semibold">Nama Karyawan</th>
              <th className="p-3 font-semibold">Tujuan & Maksud</th>
              <th className="p-3 font-semibold text-center">Durasi Dinas</th>
              <th className="p-3 font-semibold text-right">Uang Saku Per Diem</th>
              <th className="p-3 font-semibold text-center">Status Settlement</th>
              <th className="p-3 font-semibold text-center">Aksi Finance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {expenses.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-bold font-mono text-indigo-600">{e.spdCode}</td>
                <td className="p-3 font-bold text-slate-900 dark:text-white">{e.employeeName}</td>
                <td className="p-3 text-slate-600 dark:text-slate-300">
                  <strong className="block text-slate-800 dark:text-slate-200">{e.destinationCity}</strong>
                  <span className="text-[11px] text-slate-400">{e.purpose}</span>
                </td>
                <td className="p-3 text-center text-slate-500">{e.daysCount} Hari ({e.startDate} s/d {e.endDate})</td>
                <td className="p-3 text-right font-mono font-bold text-emerald-600">Rp {e.perDiemTotal.toLocaleString('id-ID')}</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    e.status === 'SETTLED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {e.status === 'SETTLED' ? 'SETTLED 100%' : 'UANG MUKA CAIR'}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {e.status !== 'SETTLED' ? (
                    <button onClick={() => settleTravelExpense(e.id)} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-[10px] cursor-pointer">
                      Final Settlement
                    </button>
                  ) : (
                    <span className="text-emerald-600 font-bold text-[11px]">Selesai</span>
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
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Form Pengajuan Surat Perjalanan Dinas (SPD)</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Nama Karyawan:</label>
                <input type="text" value={form.employeeName} onChange={(e) => setForm({ ...form, employeeName: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Kota Tujuan:</label>
                <input type="text" value={form.destinationCity} onChange={(e) => setForm({ ...form, destinationCity: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Jumlah Hari Dinas:</label>
                <input type="number" value={form.daysCount} onChange={(e) => setForm({ ...form, daysCount: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none font-bold" />
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-700 dark:text-indigo-300 font-bold">
                Kalkulasi Uang Saku Per Diem: Rp {perDiemTotal.toLocaleString('id-ID')} ({ratePerDay.toLocaleString('id-ID')}/Hari)
              </div>
            </div>
            <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md cursor-pointer">
              Terbitkan SPD & Cairkan Uang Saku
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
