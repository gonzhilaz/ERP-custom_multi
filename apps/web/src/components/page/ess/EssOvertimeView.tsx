'use client';

import React, { useState } from 'react';
import { Clock, Plus, CheckCircle2, HelpCircle, X, AlertTriangle, Bell, ThumbsUp, ThumbsDown } from 'lucide-react';
import { MOCK_OVERTIME_CLAIMS, OvertimeClaim } from '@/lib/mock/ess-schedule';

export const EssOvertimeView = () => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [otClaims, setOtClaims] = useState<OvertimeClaim[]>(MOCK_OVERTIME_CLAIMS);

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    hours: 2,
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.reason) return;

    const newClaim: OvertimeClaim = {
      id: `ot-${Date.now()}`,
      otCode: `OT-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: form.date,
      hours: form.hours,
      rateMultiplier: '1.5x Rate PerMenaker',
      reason: form.reason,
      supervisorApproval: 'Pending Approval SPV',
      status: 'PENDING',
      warningMessage: '⚠️ Pengajuan lembur ini masih Menunggu Approval Atasan (Hendra Wijaya - SPV). Notifikasi aktif di dashboard atasan.'
    };

    setOtClaims([newClaim, ...otClaims]);
    alert(`Pengajuan Lembur Kerja (${form.hours} Jam) Berhasil Dikirim! Menunggu Approval SPV.`);
    setShowModal(false);
  };

  const handleSupervisorAction = (id: string, action: 'APPROVE' | 'REJECT') => {
    setOtClaims(
      otClaims.map((claim) => {
        if (claim.id === id) {
          if (action === 'APPROVE') {
            return {
              ...claim,
              status: 'APPROVED',
              supervisorApproval: 'Approved by Hendra Wijaya (SPV)',
              warningMessage: undefined
            };
          } else {
            return {
              ...claim,
              status: 'REJECTED',
              supervisorApproval: 'Rejected by Hendra Wijaya (SPV)',
              warningMessage: undefined
            };
          }
        }
        return claim;
      })
    );
  };

  const pendingClaimsCount = otClaims.filter((c) => c.status === 'PENDING').length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-500" />
            <span>Pengajuan Lembur</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Pengajuan Lembur"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Overtime & Status Approval</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Status PENDING & Warning Banner</strong>: Pengajuan lembur yang belum disetujui akan menampilkan peringatan dan notifikasi aktif di atasan.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Pengajuan Ditolak (REJECTED)</strong>: Jika ditolak atasan, status berubah REJECTED dan otomatis hilang dari antrean notifikasi aktif.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Ajukan Lembur</span>
        </button>
      </div>

      {/* Active Pending Warning Banner */}
      {pendingClaimsCount > 0 && (
        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/60 rounded-2xl border border-amber-200 dark:border-amber-900/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-amber-600 animate-bounce shrink-0" />
            <div>
              <span className="font-bold text-amber-900 dark:text-amber-200">
                ⚠️ Peringatan Status Lembur Pending ({pendingClaimsCount} Pengajuan):
              </span>
              <span className="text-amber-800 dark:text-amber-300">
                 Pengajuan lembur Anda sedang aktif di antrean notifikasi atasan (Hendra Wijaya - SPV) menunggu persetujuan.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Overtime Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Riwayat Pengajuan Lembur Saya ({otClaims.length})</span>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Auto Calculation Ready
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Kode Overtime</th>
                <th className="py-3 px-4">Tanggal Lembur</th>
                <th className="py-3 px-4 text-center">Durasi Lembur</th>
                <th className="py-3 px-4">Skema Rate Multiplier</th>
                <th className="py-3 px-4">Alasan Pekerjaan</th>
                <th className="py-3 px-4 text-center">Status Approval</th>
                <th className="py-3 px-4 text-center">Aksi SPV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {otClaims.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-600">{item.otCode}</td>
                  <td className="py-3 px-4 font-mono">{item.date}</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-600 font-mono">{item.hours} Jam</td>
                  <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-300">{item.rateMultiplier}</td>
                  <td className="py-3 px-4 text-slate-500">
                    <div>{item.reason}</div>
                    {item.warningMessage && (
                      <div className="text-[10px] font-bold text-amber-600 mt-0.5">{item.warningMessage}</div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      item.status === 'PENDING' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse' :
                      'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.status === 'PENDING' ? (
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => handleSupervisorAction(item.id, 'APPROVE')}
                          className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded cursor-pointer"
                          title="Approve Lembur"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleSupervisorAction(item.id, 'REJECT')}
                          className="p-1 bg-red-600 hover:bg-red-500 text-white rounded cursor-pointer"
                          title="Reject Lembur"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">Selesai</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Overtime */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-500" />
                <span>Form Pengajuan Lembur Kerja</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Tanggal Lembur</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Jumlah Jam Lembur</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    required
                    value={form.hours}
                    onChange={(e) => setForm({ ...form, hours: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Alasan / Rincian Pekerjaan Lembur</label>
                <input
                  type="text"
                  required
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  placeholder="e.g. Closing Laporan Operasional Outlet / Maintenance Mesin"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-md transition-all cursor-pointer"
                >
                  Kirim Pengajuan Lembur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
