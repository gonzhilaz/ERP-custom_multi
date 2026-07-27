'use client';

import React, { useState } from 'react';
import { Clock, Plus, Trash2, HelpCircle, X } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface ShiftItem {
  id: string;
  code: string;
  name: string;
  startTime: string;
  endTime: string;
  breakHours: number;
}

export const HrdShiftsView = () => {
  const { user } = useAuth();
  const [shifts, setShifts] = useState<ShiftItem[]>([
    { id: 'sh-01', code: 'SHIFT-MORNING', name: 'Shift Pagi (Office Normal)', startTime: '08:00', endTime: '17:00', breakHours: 1 },
    { id: 'sh-02', code: 'SHIFT-AFTERNOON', name: 'Shift Siang Operasional', startTime: '14:00', endTime: '22:00', breakHours: 1 },
    { id: 'sh-03', code: 'SHIFT-NIGHT', name: 'Shift Malam Tambang & Hotel', startTime: '22:00', endTime: '06:00', breakHours: 1 }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    startTime: '08:00',
    endTime: '17:00',
    breakHours: 1
  });

  const canMutate = (user?.systemRole as string) === 'COMPANY_ADMIN' || (user?.systemRole as string) === 'HOLDING_EXECUTIVE' || (user?.systemRole as string) === 'ADMIN';

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setShifts([...shifts, { id: `sh-${Date.now()}`, ...formData }]);
    alert(`Kode Shift Kerja [${formData.name}] Berhasil Ditambahkan!`);
    setIsModalOpen(false);
  };

  const columns: ColumnDef<ShiftItem>[] = [
    { key: 'code', header: 'Kode Shift', className: 'font-mono font-bold text-purple-600', render: (sh) => sh.code },
    { key: 'name', header: 'Nama Shift', className: 'font-bold text-slate-900 dark:text-white', render: (sh) => sh.name },
    { key: 'startTime', header: 'Jam Masuk', align: 'center', className: 'font-mono font-bold text-emerald-600', render: (sh) => `${sh.startTime} WIB` },
    { key: 'endTime', header: 'Jam Pulang', align: 'center', className: 'font-mono font-bold text-rose-600', render: (sh) => `${sh.endTime} WIB` },
    { key: 'breakHours', header: 'Istirahat', align: 'center', className: 'font-mono', render: (sh) => `${sh.breakHours} Jam` },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      sortable: false,
      render: (sh) => (
        canMutate ? (
          <button onClick={() => setShifts((prev) => prev.filter((item) => item.id !== sh.id))} className="p-1 text-slate-400 hover:text-red-600 cursor-pointer" title="Hapus Shift">
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
          <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Shift Kerja</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-purple-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-purple-400">
                  <span>Glossary Master Shift Kerja</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Pengaturan master kode shift & jam kerja operasional (Pagi, Siang, Malam, Flexible). Digunakan otomatis oleh ESS untuk pemantauan presensi karyawan.
                </p>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold shadow-sm flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Tambah Shift</span>
        </button>
      </div>

      <DataTable
        headerTitle={`Master Kode Shift & Jam Kerja (${shifts.length})`}
        columns={columns}
        data={shifts}
        keyExtractor={(sh) => sh.id}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span>Tambah Shift Kerja Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Kode Shift</label>
                <input type="text" required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} placeholder="SHIFT-MORNING" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-mono font-bold text-purple-600" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Nama Shift</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Shift Pagi Operational" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-semibold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Jam Masuk</label>
                  <input type="text" required value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} placeholder="08:00" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-mono font-bold" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Jam Pulang</label>
                  <input type="text" required value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} placeholder="17:00" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-mono font-bold" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold">Batal</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold">Simpan Shift</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
