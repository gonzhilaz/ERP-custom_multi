'use client';

import React, { useState } from 'react';
import { CalendarDays, Plus, Trash2, HelpCircle, X } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

interface LeaveItem {
  id: string;
  code: string;
  name: string;
  defaultQuota: number;
  isPaid: boolean;
  requiresDoctorNote: boolean;
}

export const HrdLeavesView = () => {
  const { user } = useAuth();
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'PAID' | 'UNPAID'>('ALL');
  const [leaves, setLeaves] = useState<LeaveItem[]>([
    { id: 'lv-01', code: 'CUTI-TAHUNAN', name: 'Cuti Tahunan Karyawan (12 Hari)', defaultQuota: 12, isPaid: true, requiresDoctorNote: false },
    { id: 'lv-02', code: 'IZIN-SAKIT', name: 'Izin Sakit Dengan Surat Dokter', defaultQuota: 30, isPaid: true, requiresDoctorNote: true },
    { id: 'lv-03', code: 'CUTI-HAMIL', name: 'Cuti Melahirkan / Hamil (3 Bulan)', defaultQuota: 90, isPaid: true, requiresDoctorNote: true },
    { id: 'lv-04', code: 'IZIN-MENIKAH', name: 'Izin Pernikahan Karyawan (3 Hari)', defaultQuota: 3, isPaid: true, requiresDoctorNote: false }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    defaultQuota: 12,
    isPaid: true,
    requiresDoctorNote: false
  });

  const canMutate = (user?.systemRole as string) === 'COMPANY_ADMIN' || (user?.systemRole as string) === 'HOLDING_EXECUTIVE' || (user?.systemRole as string) === 'ADMIN';

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaves([...leaves, { id: `lv-${Date.now()}`, ...formData }]);
    alert(`Kategori Cuti/Izin [${formData.name}] Berhasil Ditambahkan!`);
    setIsModalOpen(false);
  };

  const columns: ColumnDef<LeaveItem>[] = [
    { key: 'code', header: 'Kode', className: 'font-mono font-bold text-emerald-600', render: (lv) => lv.code },
    { key: 'name', header: 'Nama Kategori Cuti / Izin', className: 'font-bold text-slate-900 dark:text-white', render: (lv) => lv.name },
    { key: 'defaultQuota', header: 'Kuota Standar', align: 'center', className: 'font-mono font-bold text-purple-600', render: (lv) => `${lv.defaultQuota} Hari` },
    {
      key: 'isPaid',
      header: 'Status Gaji',
      align: 'center',
      render: (lv) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${lv.isPaid ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
          {lv.isPaid ? 'Paid Leave (Bergaji)' : 'Unpaid Leave'}
        </span>
      )
    },
    { key: 'requiresDoctorNote', header: 'Surat Dokter / Lampiran', align: 'center', className: 'font-medium', render: (lv) => (lv.requiresDoctorNote ? 'Wajib Lampiran' : 'Tidak Wajib') },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      sortable: false,
      render: (lv) => (
        canMutate ? (
          <button onClick={() => setLeaves((prev) => prev.filter((item) => item.id !== lv.id))} className="p-1 text-slate-400 hover:text-red-600 cursor-pointer" title="Hapus Kategori">
            <Trash2 className="w-4 h-4" />
          </button>
        ) : null
      )
    }
  ];

  const filteredLeaves = leaves.filter((lv) => {
    if (typeFilter === 'PAID' && !lv.isPaid) return false;
    if (typeFilter === 'UNPAID' && lv.isPaid) return false;
    return true;
  });

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
            <CalendarDays className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Cuti & Izin</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-emerald-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-emerald-400">
                  <span>Glossary Kategori Izin & Cuti</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Master kategori perizinan & cuti karyawan (Sakit, Cuti Tahunan, Hamil, Pernikahan) yang diterima perusahaan. ESS mengonsumsi master ini tanpa perlu konfigurasi tambahan.
                </p>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-sm flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Tambah Kategori Cuti</span>
        </button>
      </div>



      <DataTable
        headerTitle={`Master Kategori Cuti & Izin Perusahaan (${filteredLeaves.length})`}
        columns={columns}
        data={filteredLeaves}
        filterComponent={
          <SearchableSelect
            value={typeFilter}
            onChange={(val) => setTypeFilter(val as any)}
            options={[
              { id: 'ALL', label: 'Semua Status Gaji' },
              { id: 'PAID', label: 'Paid Leave (Bergaji)' },
              { id: 'UNPAID', label: 'Unpaid Leave (Tanpa Gaji)' }
            ]}
            className="w-48"
          />
        }
        keyExtractor={(lv) => lv.id}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-emerald-500" />
                <span>Tambah Kategori Cuti / Izin Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Kode Kategori</label>
                <input type="text" required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} placeholder="CUTI-TAHUNAN" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-mono font-bold text-emerald-600" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Nama Kategori Cuti / Izin</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Cuti Tahunan (12 Hari)" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-semibold" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Kuota Standar (Hari)</label>
                <input type="number" required value={formData.defaultQuota} onChange={(e) => setFormData({ ...formData, defaultQuota: Number(e.target.value) })} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-mono font-bold" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold">Batal</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold">Simpan Kategori Cuti</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
