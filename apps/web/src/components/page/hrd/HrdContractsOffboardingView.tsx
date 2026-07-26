'use client';

import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Calculator, FileCheck, HelpCircle, X } from 'lucide-react';
import { useHrExtended } from '@/hooks/hrd/useHrExtended';

export const HrdContractsOffboardingView = () => {
  const { contracts, calculatePesangonUUCiptaKerja } = useHrExtended();
  const [activeTab, setActiveTab] = useState<'CONTRACTS' | 'PESANGON' | 'CLEARANCE'>('CONTRACTS');
  const [showGlossary, setShowGlossary] = useState(false);

  // Pesangon Calculator Form State
  const [calcBaseSalary, setCalcBaseSalary] = useState(12000000);
  const [calcYears, setCalcYears] = useState(5);
  const [calcResult, setCalcResult] = useState<ReturnType<typeof calculatePesangonUUCiptaKerja> | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculatePesangonUUCiptaKerja(calcBaseSalary, calcYears);
    setCalcResult(result);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Kontrak & Offboarding</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-amber-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-amber-400">
                  <span>Kontrak & Offboarding Engine</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Modul pemantauan masa berlaku kontrak PKWT (H-60/H-30 alerts), clearance sheet inventaris, dan kalkulator pesangon UU Cipta Kerja No 6/2023.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('CONTRACTS')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === 'CONTRACTS' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Kontrak Expiring ({contracts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('PESANGON')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === 'PESANGON' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Kalkulator Pesangon</span>
          </button>
          <button
            onClick={() => setActiveTab('CLEARANCE')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === 'CLEARANCE' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Clearance Sheet</span>
          </button>
        </div>
      </div>

      {/* Tab: Contracts */}
      {activeTab === 'CONTRACTS' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500">
                <th className="p-3 font-semibold">Nama Karyawan</th>
                <th className="p-3 font-semibold">Departemen</th>
                <th className="p-3 font-semibold">Tipe Kontrak</th>
                <th className="p-3 font-semibold">Periode Kontrak</th>
                <th className="p-3 font-semibold text-center">Sisa Hari</th>
                <th className="p-3 font-semibold text-center">Aksi HRD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {contracts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{c.employeeName}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{c.departmentName}</td>
                  <td className="p-3 font-semibold text-amber-600">{c.contractType}</td>
                  <td className="p-3 text-slate-500">{c.startDate} s/d {c.endDate}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse">
                      {c.daysRemaining} Hari Lagi
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button onClick={() => alert(`Memproses perpanjangan/pengangkatan ${c.employeeName}`)} className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg text-[10px] cursor-pointer">
                      Perpanjang / Angkat Tetap
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Pesangon Calculator */}
      {activeTab === 'PESANGON' && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Kalkulator Pesangon (UU Cipta Kerja No 6/2023)</h3>
          <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300">Gaji Pokok + Tunjangan Tetap (Rp):</label>
              <input type="number" value={calcBaseSalary} onChange={(e) => setCalcBaseSalary(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none font-bold text-amber-600 mt-1" />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300">Masa Kerja (Tahun):</label>
              <input type="number" value={calcYears} onChange={(e) => setCalcYears(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none font-bold mt-1" />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md cursor-pointer">
                Hitung Pesangon UU Cipta Kerja
              </button>
            </div>
          </form>

          {calcResult && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900/60 space-y-2 text-xs">
              <div className="font-bold text-amber-800 dark:text-amber-300 text-sm">Hasil Rincian Hak Offboarding:</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div>Uang Pesangon (UP): <strong className="block text-slate-900 dark:text-white">Rp {calcResult.upAmount.toLocaleString('id-ID')}</strong></div>
                <div>Uang Penghargaan Masa Kerja (UPMK): <strong className="block text-slate-900 dark:text-white">Rp {calcResult.upmkAmount.toLocaleString('id-ID')}</strong></div>
                <div>Uang Penggantian Hak (UPH 15%): <strong className="block text-slate-900 dark:text-white">Rp {calcResult.uphAmount.toLocaleString('id-ID')}</strong></div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold">Total Hak Diterima: <strong className="block text-base">Rp {calcResult.totalPesangon.toLocaleString('id-ID')}</strong></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Clearance Sheet */}
      {activeTab === 'CLEARANCE' && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Checklist Clearance Sheet Karyawan Resign</h3>
          <div className="space-y-2 text-slate-600 dark:text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked /> <span>Pengembalian Laptop & Charger Inventaris IT</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked /> <span>Serah Terima ID Card & Access Card Gedung</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked /> <span>Pengembalian Kunci Kendaraan Operational Site</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" /> <span>Pelunasan Sisa Pinjaman / Kasbon Karyawan</span></label>
          </div>
        </div>
      )}
    </div>
  );
};
