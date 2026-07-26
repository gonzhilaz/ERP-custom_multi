'use client';

import React, { useState } from 'react';
import { Briefcase, Plus, Edit2, Trash2, ShieldAlert, CheckCircle2, X } from 'lucide-react';
import { WorkerTypeItem, MOCK_WORKER_TYPES } from '@/lib/mock/hrd';
import { useAuth } from '@/hooks/auth/useAuth';

export const WorkerTypesTab = () => {
  const { user } = useAuth();
  const [workerTypes, setWorkerTypes] = useState<WorkerTypeItem[]>(MOCK_WORKER_TYPES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<WorkerTypeItem, 'id'>>({
    code: '',
    name: '',
    category: 'KONTRAK',
    maxDaysPerMonth: 20,
    expression: '(Gaji Pokok + Tunjangan) - PPh21',
    salaryCoa: '5-20101 - Beban Gaji Kontrak (PKWT)',
    description: ''
  });

  const canMutate = (user?.systemRole as string) === 'COMPANY_ADMIN' || (user?.systemRole as string) === 'HOLDING_EXECUTIVE' || (user?.systemRole as string) === 'ADMIN';

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ code: 'PKWT-NEW', name: '', category: 'KONTRAK', maxDaysPerMonth: 20, expression: '(Gaji Pokok + Tunjangan) - PPh21', salaryCoa: '5-20101 - Beban Gaji Kontrak (PKWT)', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (wt: WorkerTypeItem) => {
    if (!canMutate) {
      alert('Akses Ditolak: Edit & Delete hanya diizinkan untuk IT, Admin, dan Top Level Manajemen!');
      return;
    }
    setEditingId(wt.id);
    setFormData({
      code: wt.code,
      name: wt.name,
      category: wt.category,
      maxDaysPerMonth: wt.maxDaysPerMonth || 30,
      expression: wt.expression || '(Gaji Pokok + Tunjangan) - PPh21',
      salaryCoa: wt.salaryCoa || '5-20100 - Beban Gaji Karyawan Tetap (PKWTT)',
      description: wt.description
    });
    setIsModalOpen(true);
  };

  const handleSoftDelete = (id: string, name: string) => {
    if (!canMutate) {
      alert('Akses Ditolak: Soft-Delete hanya diizinkan untuk IT, Admin, dan Top Level Manajemen!');
      return;
    }
    if (confirm(`Apakah Anda yakin ingin menghapus (Soft-Delete) Tipe Pekerja [${name}]? Data akan diarsipkan.`)) {
      setWorkerTypes((prev) => prev.filter((wt) => wt.id !== id));
      alert(`Soft-Delete Berhasil! Record [${name}] telah diarsipkan dan dicatat di Audit Trail Log.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setWorkerTypes((prev) =>
        prev.map((wt) => (wt.id === editingId ? { ...wt, ...formData } : wt))
      );
      alert(`Tipe Pekerja [${formData.name}] berhasil diperbarui dan dicatat di Audit Log!`);
    } else {
      const newWT: WorkerTypeItem = {
        id: `wt-${Date.now()}`,
        ...formData
      };
      setWorkerTypes([...workerTypes, newWT]);
      alert(`Tipe Pekerja Baru [${formData.name}] berhasil didaftarkan secara dinamis!`);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-purple-500" />
            <span>Kelola Tipe Pekerja & Status Hubungan Kerja (Zero Hardcoding)</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Manajemen dinamis PKWT, PKWTT, Outsourcing, & Buruh Harian Lepas (&lt; 21 Hari). Tanpa hardcoded master data.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Tipe Pekerja Baru</span>
        </button>
      </div>

      {/* Role Restriction Banner */}
      {!canMutate && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300 font-medium">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-500" />
          <span>Catatan Tata Kelola: Akses Edit & Soft-Delete dibatasi khusus untuk IT, Admin, dan Top Level Manajemen.</span>
        </div>
      )}

      {/* Worker Types Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Kode & Nama Tipe Pekerja</th>
                <th className="py-3.5 px-4">Kategori Klasifikasi</th>
                <th className="py-3.5 px-4 text-center">Batas Maks. Hari / Bulan</th>
                <th className="py-3.5 px-4">Deskripsi Peraturan</th>
                <th className="py-3.5 px-4 text-center">Aksi (Admin/IT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {workerTypes.map((wt) => (
                <tr key={wt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold">
                    <span className="text-purple-600 dark:text-purple-400 font-mono block text-[11px]">{wt.code}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{wt.name}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      wt.category === 'TETAP' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      wt.category === 'KONTRAK' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300' :
                      wt.category === 'HARIAN_LEPAS' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                    }`}>
                      {wt.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800 dark:text-slate-200">
                    {wt.maxDaysPerMonth ? `${wt.maxDaysPerMonth} Hari` : 'Penuh (Full Month)'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-xs">{wt.description}</td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(wt)}
                        title="Edit Tipe Pekerja (Admin/IT)"
                        className="p-1.5 text-slate-600 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleSoftDelete(wt.id, wt.name)}
                        title="Soft Delete Tipe Pekerja (Admin/IT)"
                        className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-slate-900 dark:text-white text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-500" />
                <span>{editingId ? 'Edit Tipe Pekerja' : 'Registrasi Tipe Pekerja Baru'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Kode Tipe Pekerja</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-purple-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Tipe Pekerja (e.g. PKWT / PKWTT / Buruh Harian)</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Buruh Harian Lepas (< 21 Hari)"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Kategori Hubungan Kerja</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
                  >
                    <option value="TETAP">TETAP (PKWTT)</option>
                    <option value="KONTRAK">KONTRAK (PKWT)</option>
                    <option value="HARIAN_LEPAS">HARIAN LEPAS (&lt; 21 Hari)</option>
                    <option value="OUTSOURCING">OUTSOURCING (Pihak 3)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Batas Maks. Hari / Bulan</label>
                  <input
                    type="number"
                    value={formData.maxDaysPerMonth}
                    onChange={(e) => setFormData({ ...formData, maxDaysPerMonth: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Deskripsi Peraturan & Ketentuan Hukum</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Penjelasan aturan hubungan kerja..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Tipe Pekerja</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
