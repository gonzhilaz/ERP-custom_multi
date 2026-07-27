'use client';

import React, { useState } from 'react';
import { ShieldCheck, Search, Edit, X, HeartPulse } from 'lucide-react';
import { MOCK_EMPLOYEES, EmployeeItem } from '@/lib/mock/hrd';
import { useAuth } from '@/hooks/auth/useAuth';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

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
    alert(`Nomor BPJS Karyawan [${selectedEmp.fullName}] berhasil diperbarui!`);
    setSelectedEmp(null);
  };

  const columns: ColumnDef<EmployeeItem>[] = [
    { key: 'fullName', header: 'Nama Karyawan', className: 'font-bold text-slate-900 dark:text-white', render: (emp) => emp.fullName },
    { key: 'unitUsaha', header: 'Unit Usaha', className: 'text-slate-500', render: (emp) => emp.unitUsaha },
    { key: 'baseSalary', header: 'Gaji Pokok Basis', align: 'right', className: 'font-semibold', render: (emp) => `Rp ${emp.baseSalary.toLocaleString('id-ID')}` },
    { key: 'bpjsKesehatan', header: 'BPJS Kes (1%)', align: 'right', className: 'font-mono text-purple-600 font-bold', render: (emp) => `Rp ${emp.bpjsKesehatan.toLocaleString('id-ID')}` },
    { key: 'bpjsKetenagakerjaan', header: 'BPJS TK (3%)', align: 'right', className: 'font-mono text-purple-600 font-bold', render: (emp) => `Rp ${emp.bpjsKetenagakerjaan.toLocaleString('id-ID')}` },
    { key: 'totalBpjs', header: 'Total Potongan', align: 'right', className: 'font-bold text-slate-900 dark:text-white', render: (emp) => `Rp ${(emp.bpjsKesehatan + emp.bpjsKetenagakerjaan).toLocaleString('id-ID')}` },
    {
      key: 'status',
      header: 'Status Card',
      align: 'center',
      render: () => (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          AKTIF
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      sortable: false,
      render: (emp) => (
        canManage ? (
          <button
            onClick={() => handleOpenEdit(emp)}
            className="p-1 text-slate-400 hover:text-purple-600 transition-colors cursor-pointer"
            title="Edit Nomor BPJS"
          >
            <Edit className="w-4 h-4" />
          </button>
        ) : null
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">BPJS</h1>

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

      <DataTable
        headerTitle={`Rincian Iuran BPJS (${filtered.length})`}
        headerRightContent={
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> TER 2026 Ready
          </span>
        }
        columns={columns}
        data={filtered}
        keyExtractor={(emp) => emp.id}
      />

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
