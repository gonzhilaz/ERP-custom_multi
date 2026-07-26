'use client';

import React, { useState } from 'react';
import { Plus, CheckCircle2, Tag } from 'lucide-react';
import { DepartmentCategory, EmployeeItem, MOCK_WORKER_TYPES } from '@/lib/mock/hrd';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

interface Props {
  departments: DepartmentCategory[];
  addEmployee: (newEmp: Omit<EmployeeItem, 'id' | 'netSalary'>) => void;
  onSuccess: () => void;
}

export const CreateEmployeeTab: React.FC<Props> = ({ departments, addEmployee, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    departmentId: departments[0]?.id || 'dept-01',
    departmentName: departments[0]?.name || 'Finance & Akuntansi',
    role: 'Senior Financial Accountant',
    workerTypeId: MOCK_WORKER_TYPES[0].id,
    workerTypeName: MOCK_WORKER_TYPES[0].name,
    employmentCategory: MOCK_WORKER_TYPES[0].category,
    joinDate: new Date().toISOString().split('T')[0],
    basicSalary: 8500000,
    salaryType: 'MONTHLY' as const,
    terTaxCategory: 'TER_A' as const,
    status: 'ACTIVE' as const
  });

  const handleDepartmentChange = (deptId: string) => {
    const selected = departments.find((d) => d.id === deptId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        departmentId: selected.id,
        departmentName: selected.name
      }));
    }
  };

  const handleWorkerTypeChange = (workerTypeId: string) => {
    const selected = MOCK_WORKER_TYPES.find((w) => w.id === workerTypeId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        workerTypeId: selected.id,
        workerTypeName: selected.name,
        employmentCategory: selected.category
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName) return;
    addEmployee({
      nik: `NIK-2026-${Math.floor(100 + Math.random() * 900)}`,
      fullName: formData.fullName,
      departmentId: formData.departmentId,
      department: formData.departmentName,
      workerTypeId: formData.workerTypeId,
      workerTypeName: formData.workerTypeName,
      unitUsaha: 'HO Jakarta Enterprise',
      role: formData.role,
      salaryType: formData.salaryType,
      baseSalary: formData.basicSalary,
      bpjsKesehatan: 85000,
      bpjsKetenagakerjaan: 170000,
      pph21Rate: 5,
      status: 'ACTIVE'
    });
    alert(`Karyawan [${formData.fullName}] berhasil mendaftarkan akun HRD & Payroll!`);
    onSuccess();
  };

  const workerTypeOptions = MOCK_WORKER_TYPES.map((w) => ({
    id: w.id,
    label: w.name,
    subLabel: `Kategori: ${w.category}`,
    badge: w.code
  }));

  const departmentOptions = departments.map((d) => ({
    id: d.id,
    label: d.name,
    subLabel: `${d.code} — COA Gaji: ${d.salaryCoaCode}`,
    badge: d.code
  }));

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-4 text-xs">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-sky-500" />
          <span>Form Registrasi Karyawan & Staf Baru</span>
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-slate-900 dark:text-white">
        <div>
          <label className="block font-semibold mb-1">Nama Lengkap Karyawan</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Ahmad Suherman"
            className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
          />
        </div>

        {/* Universal Searchable Worker Type Dropdown */}
        <div>
          <label className="block font-semibold mb-1 text-purple-600 dark:text-purple-400">Pilih Tipe Pekerja</label>
          <SearchableSelect
            options={workerTypeOptions}
            value={formData.workerTypeId}
            onChange={(selectedId) => handleWorkerTypeChange(selectedId)}
            placeholder="Cari atau pilih tipe pekerja..."
          />
        </div>

        {/* Universal Searchable Department Dropdown */}
        <div>
          <label className="block font-semibold mb-1 flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
            <Tag className="w-3.5 h-3.5" /> Pilih Master Departemen Terdaftar
          </label>
          <SearchableSelect
            options={departmentOptions}
            value={formData.departmentId}
            onChange={(selectedId) => handleDepartmentChange(selectedId)}
            placeholder="Cari atau pilih departemen..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Jabatan / Role Kerja</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Senior Financial Analyst"
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Gaji Pokok (Rp)</label>
            <input
              type="number"
              value={formData.basicSalary}
              onChange={(e) => setFormData({ ...formData, basicSalary: Number(e.target.value) })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Daftarkan Karyawan Baru</span>
          </button>
        </div>
      </form>
    </div>
  );
};
