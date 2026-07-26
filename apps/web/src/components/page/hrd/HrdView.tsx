'use client';

import React, { useState } from 'react';
import { Users, UserPlus, HelpCircle, X } from 'lucide-react';
import { useHrd } from '@/hooks/hrd/useHrd';
import { EmployeeTable } from '@/components/ui/tables/EmployeeTable';
import { SkeletonTable } from '@/components/ui/loader/skeleton/SkeletonTable';

export const HrdView = () => {
  const { employees, loading, filterSalaryType, setFilterSalaryType } = useHrd();
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-500" />
            <span>HRD & Payroll</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary HRD & Payroll"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary HRD & Payroll Engine</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>PPh 21 TER 2026</strong>: Pemotongan Pajak Penghasilan Karyawan berdasarkan Tarif Efektif Rata-rata A/B/C.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Status Pekerja</strong>: PKWTT (Tetap), PKWT (Kontrak/Harian &lt; 21 hari), & Outsourcing.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Integration COA</strong>: Penggajian otomatis menjurnal ke COA Beban Gaji & Utang PPh 21 / BPJS.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
            <UserPlus className="w-4 h-4" />
            <span>Tambah Karyawan</span>
          </button>
        </div>
      </div>

      {/* Filter Controls & Table */}
      {loading ? (
        <SkeletonTable />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter Skema Gaji:</span>
              <select
                value={filterSalaryType}
                onChange={(e) => setFilterSalaryType(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs focus:outline-none"
              >
                <option value="ALL">Semua Skema Gaji</option>
                <option value="MONTHLY">Gaji Bulanan (Monthly)</option>
                <option value="DAILY">Gaji Harian (Daily)</option>
                <option value="PIECEWORK_COMMISSION">Gaji Borongan / Komisi</option>
              </select>
            </div>
          </div>

          <EmployeeTable items={employees} />
        </div>
      )}
    </div>
  );
};
