'use client';

import React from 'react';
import { Calendar, RefreshCw, CheckCircle2, Sliders } from 'lucide-react';
import { EmployeeItem } from '@/lib/mock/hrd';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface Props {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  employees: EmployeeItem[];
  isPayrollProcessed: boolean;
  onOpenDetailModal: (emp: EmployeeItem) => void;
}

export const HrdPayrollTableTab = ({
  selectedPeriod,
  setSelectedPeriod,
  employees,
  isPayrollProcessed,
  onOpenDetailModal
}: Props) => {
  const columns: ColumnDef<EmployeeItem>[] = [
    {
      key: 'fullName',
      header: 'Karyawan',
      render: (emp) => (
        <div>
          <p className="font-bold text-slate-900 dark:text-white">{emp.fullName}</p>
          <p className="text-[10px] text-slate-400 font-mono">{emp.nik} • {emp.department}</p>
        </div>
      )
    },
    {
      key: 'workerTypeId',
      header: 'Tipe Pekerja',
      render: (emp) => (
        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-[10px] text-slate-600 dark:text-slate-300">
          {emp.workerTypeId === 'wt-01' ? 'PKWTT Tetap' : emp.workerTypeId === 'wt-02' ? 'Kontrak Proyek' : 'Expat Special'}
        </span>
      )
    },
    {
      key: 'baseSalary',
      header: 'Gaji Pokok (Rp)',
      align: 'right',
      className: 'font-mono font-semibold',
      render: (emp) => `Rp ${emp.baseSalary.toLocaleString('id-ID')}`
    },
    {
      key: 'allowance',
      header: 'Tunjangan & Lembur',
      align: 'right',
      className: 'font-mono text-emerald-600 dark:text-emerald-400 font-semibold',
      render: (emp) => `+ Rp ${Math.round(emp.baseSalary * 0.25).toLocaleString('id-ID')}`
    },
    {
      key: 'takeHomePay',
      header: 'Take Home Pay',
      align: 'right',
      className: 'font-mono font-bold text-slate-900 dark:text-white',
      render: (emp) => `Rp ${Math.round(emp.baseSalary * 1.25).toLocaleString('id-ID')}`
    },
    {
      key: 'actions',
      header: 'Rincian Komponen',
      align: 'center',
      render: (emp) => (
        <button
          onClick={() => onOpenDetailModal(emp)}
          className="px-2.5 py-1 bg-sky-50 dark:bg-sky-950/40 text-sky-600 hover:bg-sky-100 dark:hover:bg-sky-900/60 rounded-lg font-bold text-[10px] transition-all flex items-center gap-1 mx-auto cursor-pointer"
        >
          <Sliders className="w-3 h-3" />
          <span>Adjust Komponen</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-3">
      {/* Top Period Selector Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-500" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Riwayat Periode Payroll:</span>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-900 dark:text-white"
          >
            <option value="JULI_2026">Juli 2026 (Periode Aktif)</option>
            <option value="JUNI_2026">Juni 2026 (Historical - Closed)</option>
            <option value="MEI_2026">Mei 2026 (Historical - Closed)</option>
            <option value="APRIL_2026">April 2026 (Historical - Closed)</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Auto-Filled: {employees.length} Karyawan Aktif Loaded</span>
        </div>
      </div>

      {/* Universal DataTable Component */}
      <DataTable
        headerTitle={`Daftar Payroll Run: Periode ${selectedPeriod.replace('_', ' ')}`}
        headerRightContent={
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isPayrollProcessed ? 'Status: Jurnal Processed & Posted' : 'Status: Ready for Calculation'}
          </span>
        }
        columns={columns}
        data={employees}
        keyExtractor={(emp) => emp.id}
      />
    </div>
  );
};
