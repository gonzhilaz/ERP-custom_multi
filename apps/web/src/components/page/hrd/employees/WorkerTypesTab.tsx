import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ShieldAlert, Briefcase, X, CheckCircle2 } from 'lucide-react';
import { WorkerTypeItem, MOCK_WORKER_TYPES } from '@/lib/mock/hrd';
import { useAuth } from '@/hooks/auth/useAuth';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

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

  const columns: ColumnDef<WorkerTypeItem>[] = [
    {
      key: 'code',
      header: 'Kode & Nama Tipe Pekerja',
      className: 'font-semibold',
      render: (wt) => (
        <div>
          <span className="text-purple-600 dark:text-purple-400 font-mono block text-[11px] font-bold">{wt.code}</span>
          <span className="font-bold text-slate-900 dark:text-white">{wt.name}</span>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Kategori Klasifikasi',
      render: (wt) => (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
          wt.category === 'TETAP' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
          wt.category === 'KONTRAK' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300' :
          wt.category === 'HARIAN_LEPAS' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
          'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
        }`}>
          {wt.category}
        </span>
      )
    },
    { key: 'maxDaysPerMonth', header: 'Maks Hari/Bln', align: 'center', className: 'font-mono font-bold text-slate-800 dark:text-slate-200', render: (wt) => `${wt.maxDaysPerMonth || 30} Hari` },
    { key: 'description', header: 'Deskripsi Peraturan', className: 'text-slate-500', render: (wt) => wt.description },
    {
      key: 'actions',
      header: 'Aksi (Admin/IT)',
      align: 'center',
      sortable: false,
      render: (wt) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => handleOpenEdit(wt)}
            className="p-1.5 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 rounded-lg transition-all cursor-pointer"
            title="Edit Tipe Pekerja"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleSoftDelete(wt.id, wt.name)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all cursor-pointer"
            title="Soft-Delete Record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tipe Pekerja</h3>
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

      <DataTable
        headerTitle={`Kelola Tipe Pekerja (${workerTypes.length} Items)`}
        columns={columns}
        data={workerTypes}
        keyExtractor={(wt) => wt.id}
      />

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
                  <SearchableSelect
                    options={[
                      { id: 'TETAP', label: 'TETAP (PKWTT)' },
                      { id: 'KONTRAK', label: 'KONTRAK (PKWT)' },
                      { id: 'HARIAN_LEPAS', label: 'HARIAN LEPAS (< 21 Hari)' },
                      { id: 'OUTSOURCING', label: 'OUTSOURCING (Pihak 3)' }
                    ]}
                    value={formData.category}
                    onChange={(val) => setFormData({ ...formData, category: val as any })}
                    placeholder="Pilih Kategori..."
                  />
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
