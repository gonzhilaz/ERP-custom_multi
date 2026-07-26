'use client';

import React, { useState } from 'react';
import { AlertTriangle, Plus, Trash2, HelpCircle, X, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';

export const HrdWarningLettersView = () => {
  const { user } = useAuth();
  const [warningLetters, setWarningLetters] = useState([
    { id: 'sp-01', empName: 'Rudi Hermawan', dept: 'Mining Operations', spType: 'SP_1', reason: 'Keterlambatan Absensi Beruntun > 5x dalam Sebulan', issueDate: '2026-06-10', validUntil: '2026-12-10', status: 'ACTIVE' },
    { id: 'sp-02', empName: 'Ahmad Subagyo', dept: 'Retail Store', spType: 'SP_2', reason: 'Pelanggaran SOP Kasir & Ketidakcocokan Cash Count', issueDate: '2026-05-15', validUntil: '2026-11-15', status: 'ACTIVE' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const [formData, setFormData] = useState({
    empName: '',
    dept: 'Holding Central',
    spType: 'SP_1',
    reason: '',
    validDurationMonths: 6
  });

  const canMutate = (user?.systemRole as string) === 'COMPANY_ADMIN' || (user?.systemRole as string) === 'HOLDING_EXECUTIVE' || (user?.systemRole as string) === 'ADMIN';

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSp = {
      id: `sp-${Date.now()}`,
      empName: formData.empName,
      dept: formData.dept,
      spType: formData.spType,
      reason: formData.reason,
      issueDate: '2026-07-24',
      validUntil: '2027-01-24',
      status: 'ACTIVE'
    };
    setWarningLetters([...warningLetters, newSp]);
    alert(`Surat Peringatan [${formData.spType}] untuk [${formData.empName}] Berhasil Diterbitkan!`);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Surat Peringatan</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-amber-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-amber-400">
                  <span>Glossary Surat Peringatan (SP)</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Penatausahaan Surat Peringatan (SP 1, SP 2, SP 3) untuk pelanggaran disiplin kerja karyawan. SP aktif akan berdampak pada evaluasi kenaikan berkala & potongan bonus KPI.
                </p>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold shadow-sm flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Terbitkan SP Baru</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b font-bold">
          Daftar Surat Peringatan Aktif ({warningLetters.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 font-semibold border-b">
              <tr>
                <th className="py-3 px-4">Nama Karyawan</th>
                <th className="py-3 px-4 text-center">Tipe SP</th>
                <th className="py-3 px-4">Alasan Pelanggaran</th>
                <th className="py-3 px-4 text-center">Tanggal Terbit</th>
                <th className="py-3 px-4 text-center">Masa Berlaku</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {warningLetters.map((sp) => (
                <tr key={sp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{sp.empName}</div>
                    <div className="text-[10px] text-slate-400">{sp.dept}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-amber-600 font-mono">{sp.spType}</td>
                  <td className="py-3.5 px-4">{sp.reason}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-[11px]">{sp.issueDate}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-[11px] text-rose-600 font-bold">{sp.validUntil}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {sp.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {canMutate && (
                      <button onClick={() => setWarningLetters((prev) => prev.filter((item) => item.id !== sp.id))} className="p-1 text-slate-400 hover:text-red-600 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>Terbitkan Surat Peringatan (SP) Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Nama Karyawan</label>
                <input type="text" required value={formData.empName} onChange={(e) => setFormData({ ...formData, empName: e.target.value })} placeholder="e.g. Rudi Hermawan" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-semibold" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Tipe Surat Peringatan</label>
                <select value={formData.spType} onChange={(e) => setFormData({ ...formData, spType: e.target.value })} className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border font-bold text-amber-600">
                  <option value="SP_1">SP 1 (Peringatan Pertama - 6 Bulan)</option>
                  <option value="SP_2">SP 2 (Peringatan Kedua - 6 Bulan)</option>
                  <option value="SP_3">SP 3 (Peringatan Ketiga / Terakhir)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Alasan Pelanggaran Disiplin</label>
                <textarea required value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} placeholder="Penjelasan detail pelanggaran..." className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border h-20" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold">Batal</button>
                <button type="submit" className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl font-bold">Terbitkan SP</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
