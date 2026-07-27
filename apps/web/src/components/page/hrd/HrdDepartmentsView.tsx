'use client';

import React, { useState } from 'react';
import { Building2, Plus, Trash2, HelpCircle, X } from 'lucide-react';
import { MOCK_DEPARTMENTS, DepartmentCategory } from '@/lib/mock/hrd';
import { useAuth } from '@/hooks/auth/useAuth';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

export const HrdDepartmentsView = () => {
  const { user } = useAuth();
  const [departments, setDepartments] = useState<DepartmentCategory[]>(MOCK_DEPARTMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    salaryCoaCode: '5-20100',
    salaryCoaName: 'Beban Gaji Operasional',
    description: ''
  });

  const canMutate = (user?.systemRole as string) === 'COMPANY_ADMIN' || (user?.systemRole as string) === 'HOLDING_EXECUTIVE' || (user?.systemRole as string) === 'ADMIN';

  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const newDept: DepartmentCategory = {
      id: `dept-${Date.now()}`,
      code: formData.code || `DEPT-${Date.now()}`,
      name: formData.name,
      employeeCount: 0,
      salaryCoaCode: formData.salaryCoaCode,
      salaryCoaName: formData.salaryCoaName,
      description: formData.description
    };
    setDepartments([...departments, newDept]);
    alert(`Departemen [${formData.name}] Berhasil Didaftarkan!`);
    setIsModalOpen(false);
  };

  const handleSoftDeleteDepartment = (id: string, name: string) => {
    if (!canMutate) {
      alert('Akses Ditolak: Edit & Delete hanya untuk IT, Admin, dan Top Level Manajemen!');
      return;
    }
    if (confirm(`Hapus (Soft-Delete) Departemen [${name}]?`)) {
      setDepartments((prev) => prev.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Departemen</span>
          </h1>

          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Departemen"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Departemen & Divisi</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Master struktur departemen/divisi perusahaan (Operations, Finance, Mining, F&B, HRD) terikat dengan akun COA Beban Gaji General Ledger.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Departemen</span>
        </button>
      </div>

      {/* Department Master Table */}
      <DataTable
        headerTitle={`Daftar Departemen & Bagian (${departments.length})`}
        columns={[
          { key: 'code', header: 'Kode', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (d) => d.code },
          { key: 'name', header: 'Nama Departemen', className: 'font-bold text-slate-900 dark:text-white', render: (d) => d.name },
          { key: 'employeeCount', header: 'Jumlah Karyawan', align: 'center', className: 'font-mono font-bold text-sky-600', render: (d) => `${d.employeeCount} Orang` },
          {
            key: 'salaryCoaCode',
            header: 'Mapping COA Beban Gaji',
            render: (d) => (
              <div>
                <span className="font-mono text-sky-600 font-bold block">{d.salaryCoaCode}</span>
                <span className="text-[10px] text-slate-400">{d.salaryCoaName}</span>
              </div>
            )
          },
          {
            key: 'actions',
            header: 'Aksi',
            align: 'center',
            sortable: false,
            render: (d) => (
              canMutate ? (
                <button
                  onClick={() => handleSoftDeleteDepartment(d.id, d.name)}
                  className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                  title="Hapus Departemen"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              ) : null
            )
          }
        ]}
        data={departments}
        keyExtractor={(d) => d.id}
      />

      {/* Modal Add Department */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-slate-900 dark:text-white text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-500" />
                <span>Tambah Departemen Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDepartment} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Kode Departemen</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. DEPT-LOGISTICS"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-sky-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Departemen / Divisi</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Logistics & Fleet Maintenance"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Mapping Akun COA Beban Gaji</label>
                <input
                  type="text"
                  value={formData.salaryCoaName}
                  onChange={(e) => setFormData({ ...formData, salaryCoaName: e.target.value })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold cursor-pointer shadow-sm">
                  Simpan Departemen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
