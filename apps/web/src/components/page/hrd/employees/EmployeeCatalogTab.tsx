'use client';

import React, { useState } from 'react';
import { Search, Filter, Trash2, Eye, X, User, Briefcase, Building2, CreditCard, ShieldCheck } from 'lucide-react';
import { DepartmentCategory, EmployeeItem } from '@/lib/mock/hrd';

interface Props {
  employees: EmployeeItem[];
  departments: DepartmentCategory[];
  deleteEmployee: (id: string) => void;
}

export const EmployeeCatalogTab: React.FC<Props> = ({
  employees,
  departments,
  deleteEmployee
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeItem | null>(null);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.nik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || emp.department.includes(selectedDept);
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-4">
      {/* Search Input & Dynamic Department Filter */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari NIK, nama karyawan, jabatan..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <button
            onClick={() => setSelectedDept('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              selectedDept === 'ALL'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Semua Departemen
          </button>
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedDept === dept.name
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            Direktori Pegawai Terdaftar ({filteredEmployees.length} Pegawai)
          </span>
          <span className="text-[11px] text-slate-400">Klik baris tabel untuk melihat detail profil</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">NIK Pegawai</th>
                <th className="py-3.5 px-4">Nama Lengkap</th>
                <th className="py-3.5 px-4">Departemen</th>
                <th className="py-3.5 px-4">Jabatan (Role)</th>
                <th className="py-3.5 px-4 text-center">Tipe Pekerja</th>
                <th className="py-3.5 px-4 text-right">Gaji Base</th>
                <th className="py-3.5 px-4 text-right">Take Home Pay</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  onClick={() => setSelectedEmployee(emp)}
                  className="hover:bg-sky-50/50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{emp.nik}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{emp.fullName}</td>
                  <td className="py-3.5 px-4 text-slate-500">{emp.department}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">{emp.role}</td>
                  <td className="py-3.5 px-4 text-center font-bold">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px]">
                      {emp.workerTypeName || emp.salaryType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-semibold">
                    Rp {emp.baseSalary.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                    Rp {emp.netSalary.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                      Aktif
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setSelectedEmployee(emp)}
                        className="p-1.5 text-sky-600 hover:bg-sky-100 rounded-lg transition-all cursor-pointer"
                        title="Lihat Detail Profil"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteEmployee(emp.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all cursor-pointer"
                        title="Hapus Pegawai"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Karyawan (Setiap Klik Tabel Karyawan) */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 text-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-sm">
                  {selectedEmployee.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{selectedEmployee.fullName}</h3>
                  <p className="text-[10px] text-slate-400 font-mono">NIK: {selectedEmployee.nik} • {selectedEmployee.unitUsaha}</p>
                </div>
              </div>
              <button onClick={() => setSelectedEmployee(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
                <div className="text-[10px] text-slate-400 flex items-center gap-1"><Building2 className="w-3 h-3 text-sky-500" /> Departemen</div>
                <div className="font-bold">{selectedEmployee.department}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
                <div className="text-[10px] text-slate-400 flex items-center gap-1"><Briefcase className="w-3 h-3 text-purple-500" /> Jabatan (Role)</div>
                <div className="font-bold">{selectedEmployee.role}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
                <div className="text-[10px] text-slate-400 flex items-center gap-1"><User className="w-3 h-3 text-emerald-500" /> Tipe Pekerja</div>
                <div className="font-bold text-sky-600">{selectedEmployee.workerTypeName || 'PKWTT Tetap'}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border space-y-1">
                <div className="text-[10px] text-slate-400 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> Status Kontrak</div>
                <div className="font-bold text-emerald-600">Active Employment</div>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 space-y-2">
              <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                <span>Struktur Kompensasi & Gaji</span>
                <span className="font-mono text-sm">Rp {selectedEmployee.baseSalary.toLocaleString('id-ID')} /bln</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-700 dark:text-slate-300 border-t pt-2">
                <div>BPJS Kes (4%): Rp {selectedEmployee.bpjsKesehatan.toLocaleString('id-ID')}</div>
                <div>BPJS TK (4.24%): Rp {selectedEmployee.bpjsKetenagakerjaan.toLocaleString('id-ID')}</div>
                <div>PPh 21 TER: {selectedEmployee.pph21Rate}% TER</div>
                <div className="font-bold text-emerald-600">Net THP: Rp {selectedEmployee.netSalary.toLocaleString('id-ID')}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
