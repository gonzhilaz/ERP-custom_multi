'use client';

import React, { useState } from 'react';
import { HeartPulse, ShieldCheck, Search, Edit, X } from 'lucide-react';
import { MOCK_EMPLOYEES, EmployeeItem } from '@/lib/mock/hrd';
import { useAuth } from '@/hooks/auth/useAuth';

export const HrdBpjsView = () => {
  const { user } = useAuth();
  const [employees] = useState<EmployeeItem[]>(MOCK_EMPLOYEES);
  const [search, setSearch] = useState('');
  const [selectedEmp, setSelectedEmp] = useState<EmployeeItem | null>(null);
  const [bpjsForm, setBpjsForm] = useState({
    bpjsKesehatanNo: '00012398401',
    bpjsKetenagakerjaanNo: '99201948120'
  });

  const canManage = Boolean(user);

  const filtered = employees.filter(emp =>
    emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
    emp.unitUsaha.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenEdit = (emp: EmployeeItem) => {
    setSelectedEmp(emp);
    setBpjsForm({
      bpjsKesehatanNo: `BPJS-KES-${emp.id.substring(0, 5).toUpperCase()}`,
      bpjsKetenagakerjaanNo: `BPJS-TK-${emp.id.substring(0, 5).toUpperCase()}`
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmp) return;

    alert(`Nomor kartu BPJS ${selectedEmp.fullName} berhasil diperbarui!`);
    setSelectedEmp(null);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-purple-500" />
            <span>BPJS</span>
          </h1>
          <p className="text-[11px] text-slate-500">Pengelolaan Iuran BPJS Kesehatan (1%) & Ketenagakerjaan (3%) Terintegrasi Payroll</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari karyawan / unit usaha..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* BPJS Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Rincian Iuran BPJS Karyawan</span>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Regulasi TER 2026 Ready
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Nama Karyawan</th>
                <th className="py-3 px-4">Unit Usaha</th>
                <th className="py-3 px-4 text-right">Gaji Pokok Basis</th>
                <th className="py-3 px-4 text-right">BPJS Kes (1%)</th>
                <th className="py-3 px-4 text-right">BPJS TK (3%)</th>
                <th className="py-3 px-4 text-right">Total Potongan</th>
                <th className="py-3 px-4 text-center">Status Card</th>
                {canManage && <th className="py-3 px-4 text-center">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{emp.fullName}</td>
                  <td className="py-3 px-4 text-slate-500">{emp.unitUsaha}</td>
                  <td className="py-3 px-4 text-right font-semibold">Rp {emp.baseSalary.toLocaleString('id-ID')}</td>
                  <td className="py-3 px-4 text-right font-mono text-purple-600 font-bold">Rp {emp.bpjsKesehatan.toLocaleString('id-ID')}</td>
                  <td className="py-3 px-4 text-right font-mono text-purple-600 font-bold">Rp {emp.bpjsKetenagakerjaan.toLocaleString('id-ID')}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white">
                    Rp {(emp.bpjsKesehatan + emp.bpjsKetenagakerjaan).toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      AKTIF
                    </span>
                  </td>
                  {canManage && (
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenEdit(emp)}
                        className="p-1 text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
                        title="Edit Nomor BPJS"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {selectedEmp && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-purple-500" />
                <span>Kartu BPJS - {selectedEmp.fullName}</span>
              </h3>
              <button onClick={() => setSelectedEmp(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">No. BPJS Kesehatan</label>
                <input
                  type="text"
                  required
                  value={bpjsForm.bpjsKesehatanNo}
                  onChange={(e) => setBpjsForm({ ...bpjsForm, bpjsKesehatanNo: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">No. BPJS Ketenagakerjaan</label>
                <input
                  type="text"
                  required
                  value={bpjsForm.bpjsKetenagakerjaanNo}
                  onChange={(e) => setBpjsForm({ ...bpjsForm, bpjsKetenagakerjaanNo: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEmp(null)}
                  className="px-3 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-500 shadow-sm"
                >
                  Simpan Kartu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
