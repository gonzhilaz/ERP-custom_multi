import React from 'react';
import { EmployeeItem } from '@/lib/mock/hrd';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';

interface EmployeeTableProps {
  items: EmployeeItem[];
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ items }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Daftar Karyawan Holding & Subsidiaries</span>
        <span className="text-[11px] text-slate-400">Total {items.length} Karyawan</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3 px-4">NIK</th>
              <th className="py-3 px-4">Nama Karyawan</th>
              <th className="py-3 px-4">Unit Usaha & Departemen</th>
              <th className="py-3 px-4">Skema Gaji</th>
              <th className="py-3 px-4 text-right">Gaji Pokok / Rate</th>
              <th className="py-3 px-4 text-center">PPh 21 TER</th>
              <th className="py-3 px-4 text-right">THP Net Salary</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {items.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{emp.nik}</td>
                <td className="py-3 px-4 font-semibold">
                  <div>{emp.fullName}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{emp.role}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-slate-800 dark:text-slate-200">{emp.unitUsaha}</div>
                  <div className="text-[10px] text-slate-400">{emp.department}</div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    emp.salaryType === 'MONTHLY' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300' :
                    emp.salaryType === 'DAILY' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' :
                    'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                  }`}>
                    {emp.salaryType === 'MONTHLY' ? 'Gaji Bulanan' : emp.salaryType === 'DAILY' ? 'Gaji Harian' : 'Borongan / Komisi'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-semibold">
                  Rp {emp.baseSalary.toLocaleString('id-ID')}
                </td>
                <td className="py-3 px-4 text-center font-mono text-[11px] text-sky-600 dark:text-sky-400 font-bold">
                  {emp.pph21Rate}% TER
                </td>
                <td className="py-3 px-4 text-right font-bold text-emerald-600">
                  Rp {emp.netSalary.toLocaleString('id-ID')}
                </td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge type={emp.status} label={emp.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
