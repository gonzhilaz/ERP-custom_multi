'use client';

import React, { useState } from 'react';
import { Trash2, Eye, X, User, Briefcase, Building2, CreditCard, ShieldCheck } from 'lucide-react';
import { DepartmentCategory, EmployeeItem } from '@/lib/mock/hrd';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

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

  const columns: ColumnDef<EmployeeItem>[] = [
    { key: 'nik', header: 'NIK Pegawai', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (e) => e.nik },
    { key: 'fullName', header: 'Nama Lengkap', className: 'font-semibold text-slate-900 dark:text-white', render: (e) => e.fullName },
    { key: 'department', header: 'Departemen', className: 'text-slate-500', render: (e) => e.department },
    { key: 'role', header: 'Jabatan (Role)', className: 'text-slate-500', render: (e) => e.role },
    {
      key: 'workerTypeId',
      header: 'Tipe Pekerja',
      align: 'center',
      render: (e) => (
        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-[10px] text-slate-600 dark:text-slate-300">
          {e.workerTypeId === 'wt-01' ? 'PKWTT Tetap' : e.workerTypeId === 'wt-02' ? 'Kontrak Proyek' : 'Expat Special'}
        </span>
      )
    },
    { key: 'baseSalary', header: 'Gaji Base', align: 'right', className: 'font-mono text-slate-900 dark:text-white font-bold', render: (e) => `Rp ${e.baseSalary.toLocaleString('id-ID')}` },
    { key: 'takeHomePay', header: 'Take Home Pay', align: 'right', className: 'font-mono text-emerald-600 dark:text-emerald-400 font-bold', render: (e) => `Rp ${Math.round(e.baseSalary * 1.25).toLocaleString('id-ID')}` },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (e) => (
        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold">
          {e.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      sortable: false,
      render: (e) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => setSelectedEmployee(e)}
            className="p-1 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-lg transition-all cursor-pointer"
            title="Lihat Profile"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteEmployee(e.id)}
            className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all cursor-pointer"
            title="Hapus Pegawai"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {/* Universal Search & Dynamic Category Filter */}
      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari NIK, nama karyawan, jabatan..."
        categoryValue={selectedDept}
        onCategoryChange={setSelectedDept}
        categoryOptions={departments.map((d) => ({ value: d.name, label: d.name }))}
        categoryPlaceholder="Semua Departemen"
      />

      <DataTable
        headerTitle={`Direktori Pegawai Terdaftar (${filteredEmployees.length} Pegawai)`}
        columns={columns}
        data={filteredEmployees}
        keyExtractor={(e) => e.id}
      />

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
