'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit3, FileSpreadsheet } from 'lucide-react';
import { DepartmentCategory } from '@/lib/mock/hrd';

interface Props {
  departments: DepartmentCategory[];
  addDepartment: (newDept: Omit<DepartmentCategory, 'id' | 'employeeCount'>) => void;
  updateDepartment: (id: string, updatedDept: Partial<DepartmentCategory>) => void;
  deleteDepartment: (id: string) => void;
}

export const EmployeeDepartmentsTab: React.FC<Props> = ({
  departments,
  addDepartment,
  updateDepartment,
  deleteDepartment
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<DepartmentCategory | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    salaryCoaCode: '501-100',
    salaryCoaName: 'Beban Gaji Direksi & Executive',
    description: ''
  });

  const handleSalaryCoaChange = (code: string) => {
    const coaMap: Record<string, string> = {
      '501-100': 'Beban Gaji Direksi & Executive',
      '501-200': 'Beban Gaji Operator & Technicians Mining',
      '501-300': 'Beban Gaji Chef & Staf Resto',
      '501-400': 'Beban Gaji Staf Operasional & Front Office'
    };
    setFormData((prev) => ({
      ...prev,
      salaryCoaCode: code,
      salaryCoaName: coaMap[code] || 'Beban Gaji Pegawai'
    }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    addDepartment(formData);
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDept) return;
    updateDepartment(editingDept.id, formData);
    setEditingDept(null);
  };

  const openEditModal = (dept: DepartmentCategory) => {
    setEditingDept(dept);
    setFormData({
      code: dept.code,
      name: dept.name,
      salaryCoaCode: dept.salaryCoaCode,
      salaryCoaName: dept.salaryCoaName,
      description: dept.description
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Action */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-sky-500" />
            <span>Master Departemen & Taksonomi Penggajian (HO COA Mapping)</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Daftar akun COA disusun resmi oleh HO (Holding Central) untuk konsistensi pembukuan seluruh tenants.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              code: '',
              name: '',
              salaryCoaCode: '501-100',
              salaryCoaName: 'Beban Gaji Direksi & Executive',
              description: ''
            });
            setIsCreateModalOpen(true);
          }}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-sky-600/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Departemen Baru</span>
        </button>
      </div>

      {/* Department Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Daftar Master Departemen Terdaftar ({departments.length} Departemen)
          </span>
          <span className="text-[11px] text-slate-400">Strict HO COA Bound Table</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Kode Departemen</th>
                <th className="py-3.5 px-4">Nama Departemen</th>
                <th className="py-3.5 px-4">Terikat HO COA Beban Gaji</th>
                <th className="py-3.5 px-4 text-center">Jumlah Karyawan</th>
                <th className="py-3.5 px-4">Deskripsi</th>
                <th className="py-3.5 px-4 text-center">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{dept.code}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{dept.name}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <span className="font-mono text-sky-600 dark:text-sky-400">{dept.salaryCoaCode}</span>
                      <span className="text-[11px] text-slate-500">{dept.salaryCoaName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold font-mono">{dept.employeeCount} Pegawai</td>
                  <td className="py-3.5 px-4 text-slate-500">{dept.description}</td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEditModal(dept)}
                        className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-lg transition-all"
                        title="Edit Departemen"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteDepartment(dept.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all"
                        title="Hapus Departemen"
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

      {/* Modal Form Add / Edit Department */}
      {(isCreateModalOpen || editingDept) && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <h3 className="text-base font-bold">
              {editingDept ? 'Edit Master Departemen' : 'Tambah Master Departemen Baru'}
            </h3>
            <form onSubmit={editingDept ? handleEditSubmit : handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Kode Departemen</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. DEPT-HRD"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Departemen</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Human Resources & Legal"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              {/* Strict Select Registered HO COA Salary Account */}
              <div>
                <label className="block font-semibold mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
                    <FileSpreadsheet className="w-3.5 h-3.5" /> Terikat Akun COA Beban Gaji Resmi HO
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Strict HO COA Binding</span>
                </label>
                <select
                  value={formData.salaryCoaCode}
                  onChange={(e) => handleSalaryCoaChange(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
                >
                  <option value="501-100">501-100 - Beban Gaji Direksi & Executive</option>
                  <option value="501-200">501-200 - Beban Gaji Operator & Technicians Mining</option>
                  <option value="501-300">501-300 - Beban Gaji Chef & Staf Resto</option>
                  <option value="501-400">501-400 - Beban Gaji Staf Operasional & Front Office</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Deskripsi Departemen</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Keterangan fungsi & divisi..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingDept(null);
                  }}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold">
                  {editingDept ? 'Simpan Perubahan' : 'Simpan Departemen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
