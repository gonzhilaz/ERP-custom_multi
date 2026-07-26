'use client';

import React, { useState } from 'react';
import { Calendar, Plus, CheckCircle2, HelpCircle, X, Paperclip, Coins, AlertCircle } from 'lucide-react';
import { useEss } from '@/hooks/ess/useEss';

export const EssLeavesView = () => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const { leaves, addLeaveRequest } = useEss();

  // HR Leave Policy Config State (Encashment vs Forfeiture)
  const [leavePolicy] = useState<{ mode: 'ENCASHMENT' | 'FORFEITURE'; ratePerDay: number }>({
    mode: 'ENCASHMENT', // Diganti Sejumlah Uang di Payroll
    ratePerDay: 450000
  });

  const [leaveForm, setLeaveForm] = useState({
    type: 'Cuti Tahunan (Annual Leave)',
    startDate: '2026-08-10',
    endDate: '2026-08-12',
    reason: '',
    attachmentFile: 'Surat_Keterangan_Dokter.pdf'
  });

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveForm.reason) return;
    addLeaveRequest(leaveForm);
    alert(`Pengajuan [${leaveForm.type}] Berhasil Dikirim!`);
    setShowLeaveModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sky-500" />
            <span>Cuti & Izin Mandiri</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Kebijakan Cuti"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Kebijakan Sisa Cuti HR</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Kebijakan Encashment Cuti</strong>: Sisa cuti yang tidak terpakai di akhir tahun diganti dengan uang tunai pada slip gaji payroll.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Kebijakan Forfeiture Cuti</strong>: Sisa cuti hangus otomatis di akhir tahun sesuai regulasi internal HRD.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowLeaveModal(true)}
          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Ajukan Cuti / Izin</span>
        </button>
      </div>

      {/* HR Leave Policy Banner */}
      <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <Coins className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold text-emerald-900 dark:text-emerald-200">Kebijakan Sisa Cuti Perusahaan (HR Policy): </span>
            <span className="text-emerald-700 dark:text-emerald-300">
              {leavePolicy.mode === 'ENCASHMENT'
                ? `ENCASHMENT (Sisa cuti tidak terpakai diganti uang Rp ${leavePolicy.ratePerDay.toLocaleString('id-ID')}/hari di Payroll)`
                : 'FORFEITURE (Sisa cuti hangus otomatis di akhir tahun)'}
            </span>
          </div>
        </div>
      </div>

      {/* Leave History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Riwayat Pengajuan Cuti Saya ({leaves.length})</span>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Sisa Kuota Cuti: 12 Hari
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Jenis Pengajuan</th>
                <th className="py-3 px-4">Tgl Mulai</th>
                <th className="py-3 px-4">Tgl Selesai</th>
                <th className="py-3 px-4">Alasan Cuti</th>
                <th className="py-3 px-4">Dokumen Lampiran</th>
                <th className="py-3 px-4 text-center">Status Approval</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {leaves.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{item.type}</td>
                  <td className="py-3 px-4 font-mono">{item.startDate}</td>
                  <td className="py-3 px-4 font-mono">{item.endDate}</td>
                  <td className="py-3 px-4 text-slate-500">{item.reason}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-sky-600 dark:text-sky-400">
                    {item.attachmentFile || 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Request Form Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-500" />
                <span>Pengajuan Cuti / Izin Mandiri</span>
              </h3>
              <button onClick={() => setShowLeaveModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLeaveSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Jenis Cuti / Izin</label>
                <select
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                >
                  <option value="Cuti Tahunan (Annual Leave)">Cuti Tahunan (Annual Leave)</option>
                  <option value="Izin Sakit dengan Surat Dokter">Izin Sakit (Dokter)</option>
                  <option value="Izin Khusus / Melahirkan">Izin Khusus / Melahirkan</option>
                  <option value="Izin Menikah / Duka">Izin Menikah / Duka</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Tanggal Selesai</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Alasan Pengajuan</label>
                <input
                  type="text"
                  required
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  placeholder="e.g. Cuti tahunan keluarga / Demam sakit"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Upload Lampiran PDF (Dokumen/Surat Dokter)</label>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-mono">
                    <Paperclip className="w-4 h-4 text-sky-500" />
                    <span>{leaveForm.attachmentFile}</span>
                  </div>
                  <span className="text-[10px] font-bold text-sky-600 bg-sky-100 px-2 py-0.5 rounded">Uploaded</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-md transition-all cursor-pointer"
                >
                  Kirim Pengajuan Cuti
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
