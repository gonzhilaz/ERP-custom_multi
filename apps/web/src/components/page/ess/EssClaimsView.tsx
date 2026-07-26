'use client';

import React, { useState } from 'react';
import { DollarSign, Plus, CheckCircle2, HelpCircle, X, Paperclip, Bell, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useEss } from '@/hooks/ess/useEss';

export const EssClaimsView = () => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { reimbursements, addReimbursementClaim } = useEss();
  const [claimsList, setClaimsList] = useState(reimbursements);

  const [form, setForm] = useState({
    category: 'TRANSPORT' as 'MEDIS' | 'TRANSPORT' | 'DINAS' | 'PERLENGKAPAN',
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 350000,
    receiptFile: 'Struk_Bukti_Pengeluaran_Bensin.pdf'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description) return;

    const newItem = {
      id: `rmb-${Date.now()}`,
      claimCode: `RMB-2026-${Math.floor(100 + Math.random() * 900)}`,
      category: form.category,
      date: form.date,
      description: form.description,
      amount: form.amount,
      receiptFile: form.receiptFile,
      status: 'PENDING' as any
    };

    setClaimsList([newItem, ...claimsList]);
    alert(`Pengajuan Klaim Reimbursement [${form.description}] Berhasil Dikirim! Status PENDING menunggu approval.`);
    setShowModal(false);
  };

  const handleClaimAction = (id: string, action: 'APPROVE' | 'REJECT') => {
    setClaimsList(
      claimsList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED'
          };
        }
        return item;
      })
    );
  };

  const pendingClaimsCount = claimsList.filter((c) => c.status.startsWith('PENDING')).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            <span>Klaim & Reimbursement</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-emerald-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Klaim & Reimbursement"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-emerald-400">
                  <span>Glossary Reimbursement & Approval</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Status PENDING Active Queue</strong>: Pengajuan klaim baru berstatus PENDING dan aktif di antrean notifikasi atasan.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Sistem REJECTED</strong>: Pengajuan yang ditolak berubah status REJECTED dan otomatis hilang dari antrean aktif atasan.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Ajukan Klaim Baru</span>
        </button>
      </div>

      {/* Pending Claims Notification Banner */}
      {pendingClaimsCount > 0 && (
        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/60 rounded-2xl border border-amber-200 dark:border-amber-900/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-amber-600 animate-bounce shrink-0" />
            <div>
              <span className="font-bold text-amber-900 dark:text-amber-200">
                ⚠️ Antrean Klaim Pending ({pendingClaimsCount} Pengajuan Active):
              </span>
              <span className="text-amber-800 dark:text-amber-300">
                 Klaim belum disetujui akan terus berada di antrean notifikasi atasan hingga disetujui / ditolak.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Claims Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Daftar Pengajuan Klaim Saya ({claimsList.length})</span>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verification Fast-Track
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Kode Klaim</th>
                <th className="py-3 px-4">Tanggal Klaim</th>
                <th className="py-3 px-4">Kategori Klaim</th>
                <th className="py-3 px-4">Keterangan Biaya</th>
                <th className="py-3 px-4 text-right">Nominal (Rp)</th>
                <th className="py-3 px-4">Struk Lampiran</th>
                <th className="py-3 px-4 text-center">Status Approval</th>
                <th className="py-3 px-4 text-center">Aksi Manager</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {claimsList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-600">{item.claimCode}</td>
                  <td className="py-3 px-4 font-mono">{item.date}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{item.category}</td>
                  <td className="py-3 px-4 text-slate-500">{item.description}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600">Rp {item.amount.toLocaleString('id-ID')}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-sky-600">{item.receiptFile}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      item.status.startsWith('PENDING') ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse' :
                      'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {item.status.startsWith('PENDING') ? (
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => handleClaimAction(item.id, 'APPROVE')}
                          className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded cursor-pointer"
                          title="Approve Klaim"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleClaimAction(item.id, 'REJECT')}
                          className="p-1 bg-red-600 hover:bg-red-500 text-white rounded cursor-pointer"
                          title="Reject Klaim"
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

      {/* Modal Form Reimbursement */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span>Form Pengajuan Klaim Reimbursement</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Kategori Biaya Klaim</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                >
                  <option value="TRANSPORT">Perjalanan Dinas / Bensin & Tol</option>
                  <option value="MEDIS">Kesehatan / Kacamata Resep Dokter</option>
                  <option value="DINAS">Meeting Klien & Konsumsi Dinas</option>
                  <option value="PERLENGKAPAN">Perlengkapan Kerja / Tools</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Rincian / Keterangan Biaya</label>
                <input
                  type="text"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g. Pembelian Bensin & Tol Kunjungan Site"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nominal Biaya (Rp)</label>
                <input
                  type="number"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Upload Struk Bukti Kwitansi (PDF)</label>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-mono">
                    <Paperclip className="w-4 h-4 text-emerald-500" />
                    <span>{form.receiptFile}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Uploaded</span>
                </div>
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
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-md transition-all cursor-pointer"
                >
                  Kirim Pengajuan Klaim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
