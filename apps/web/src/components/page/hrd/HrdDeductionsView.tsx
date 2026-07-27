'use client';

import React, { useState } from 'react';
import { MinusCircle, Plus, Trash2, HelpCircle, X } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface DeductionItem {
  id: string;
  code: string;
  name: string;
  type: string;
  amount: number;
}

export const HrdDeductionsView = () => {
  const { user } = useAuth();
  const [deductions, setDeductions] = useState<DeductionItem[]>([
    { id: 'ded-01', code: 'POT-TERLAMBAT', name: 'Potongan Keterlambatan Absensi', type: 'PER_MINUTE', amount: 5000 },
    { id: 'ded-02', code: 'POT-KASBON', name: 'Angsuran Kasbon / Pinjaman Karyawan', type: 'MONTHLY_INSTALLMENT', amount: 500000 },
    { id: 'ded-03', code: 'POT-ALPA', name: 'Potongan Mangkir / Tanpa Keterangan', type: 'DAILY_RATE', amount: 150000 }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'MONTHLY_INSTALLMENT',
    amount: 100000
  });

  const canMutate = (user?.systemRole as string) === 'COMPANY_ADMIN' || (user?.systemRole as string) === 'HOLDING_EXECUTIVE' || (user?.systemRole as string) === 'ADMIN';

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setDeductions([...deductions, { id: `ded-${Date.now()}`, ...formData }]);
    alert(`Daftar Potongan [${formData.name}] Berhasil Ditambahkan!`);
    setIsModalOpen(false);
  };

  const columns: ColumnDef<DeductionItem>[] = [
    { key: 'code', header: 'Kode', className: 'font-mono font-bold text-rose-600', render: (d) => d.code },
    { key: 'name', header: 'Nama Potongan', className: 'font-bold text-slate-900 dark:text-white', render: (d) => d.name },
    { key: 'type', header: 'Tipe Kalkulasi', align: 'center', className: 'font-mono text-[10px]', render: (d) => d.type },
    { key: 'amount', header: 'Tarif / Nominal', align: 'right', className: 'font-mono font-bold text-rose-600', render: (d) => `Rp ${d.amount.toLocaleString('id-ID')}` },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      sortable: false,
      render: (d) => (
        canMutate ? (
          <button onClick={() => setDeductions((prev) => prev.filter((item) => item.id !== d.id))} className="p-1 text-slate-400 hover:text-red-600 cursor-pointer" title="Hapus Potongan">
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
          <div className="p-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl shrink-0">
            <MinusCircle className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Potongan</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-rose-400">
                  <span>Glossary Potongan Gaji</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Master daftar jenis potongan gaji resmi: keterlambatan absensi, angsuran kasbon karyawan, dan denda ketidakhadiran (mangkir/alpa).
                </p>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow-sm flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Tambah Potongan</span>
        </button>
      </div>

      <DataTable
        headerTitle={`Master Jenis Potongan Gaji (${deductions.length})`}
        columns={columns}
        data={deductions}
        keyExtractor={(d) => d.id}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <MinusCircle className="w-4 h-4 text-rose-500" />
                <span>Tambah Potongan Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Kode Potongan</label>
                <input type="text" required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} placeholder="POT-KASBON" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-mono font-bold text-rose-600" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Nama Jenis Potongan</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Angsuran Kasbon Karyawan" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-semibold" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Nominal (Rp)</label>
                <input type="number" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-mono font-bold" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold">Batal</button>
                <button type="submit" className="px-4 py-2 bg-rose-600 text-white rounded-xl font-semibold">Simpan Potongan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
