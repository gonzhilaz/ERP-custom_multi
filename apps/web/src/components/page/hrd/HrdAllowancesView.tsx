'use client';

import React, { useState } from 'react';
import { Award, Plus, Trash2, HelpCircle, X } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface AllowanceItem {
  id: string;
  code: string;
  name: string;
  type: string;
  amount: number;
  isTaxable: boolean;
}

export const HrdAllowancesView = () => {
  const { user } = useAuth();
  const [allowances, setAllowances] = useState<AllowanceItem[]>([
    { id: 'al-01', code: 'TUNJ-JABATAN', name: 'Tunjangan Jabatan & Structural', type: 'FIXED_MONTHLY', amount: 5000000, isTaxable: true },
    { id: 'al-02', code: 'TUNJ-MAKAN', name: 'Tunjangan Uang Makan & Transp', type: 'DAILY_ATTENDANCE', amount: 50000, isTaxable: false },
    { id: 'al-03', code: 'INSENTIF-KPI', name: 'Insentif Performa & KPI Achievement', type: 'PERFORMANCE_BASED', amount: 2000000, isTaxable: true }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'FIXED_MONTHLY',
    amount: 1000000,
    isTaxable: true
  });

  const canMutate = (user?.systemRole as string) === 'COMPANY_ADMIN' || (user?.systemRole as string) === 'HOLDING_EXECUTIVE' || (user?.systemRole as string) === 'ADMIN';

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setAllowances([...allowances, { id: `al-${Date.now()}`, ...formData }]);
    alert(`Tunjangan [${formData.name}] Berhasil Ditambahkan!`);
    setIsModalOpen(false);
  };

  const columns: ColumnDef<AllowanceItem>[] = [
    { key: 'code', header: 'Kode', className: 'font-mono font-bold text-emerald-600', render: (al) => al.code },
    { key: 'name', header: 'Nama Tunjangan', className: 'font-bold text-slate-900 dark:text-white', render: (al) => al.name },
    { key: 'type', header: 'Tipe Kalkulasi', align: 'center', className: 'font-mono text-[10px]', render: (al) => al.type },
    { key: 'amount', header: 'Nominal / Tarif', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (al) => `Rp ${al.amount.toLocaleString('id-ID')}` },
    {
      key: 'isTaxable',
      header: 'Pajak PPh 21',
      align: 'center',
      render: (al) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${al.isTaxable ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
          {al.isTaxable ? 'Kena Pajak' : 'Bebas Pajak'}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      sortable: false,
      render: (al) => (
        canMutate ? (
          <button
            onClick={() => setAllowances((prev) => prev.filter((a) => a.id !== al.id))}
            className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
            title="Hapus Tunjangan"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        ) : null
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Tunjangan</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-emerald-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-emerald-400">
                  <span>Glossary Jenis Tunjangan</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Konfigurasi jenis tunjangan tetap, tunjangan harian kehadiran, serta insentif performa KPI yang dimasukkan pada kalkulasi Gross Salary.
                </p>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-sm flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Tambah Tunjangan</span>
        </button>
      </div>

      <DataTable
        headerTitle={`Master Komponen Tunjangan (${allowances.length})`}
        columns={columns}
        data={allowances}
        keyExtractor={(al) => al.id}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>Tambah Tunjangan Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Kode Tunjangan</label>
                <input type="text" required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} placeholder="TUNJ-MAKAN" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-mono font-bold text-emerald-600" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Nama Tunjangan</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Tunjangan Makan Harian" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-semibold" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Nominal (Rp)</label>
                <input type="number" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-mono font-bold" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold">Batal</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold">Simpan Tunjangan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
