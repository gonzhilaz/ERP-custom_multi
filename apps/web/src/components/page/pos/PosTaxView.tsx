'use client';

import React, { useState } from 'react';
import { Percent, Plus, Edit2, Trash2, ShieldCheck, HelpCircle, X, CheckCircle2, History, BookOpen, Lock } from 'lucide-react';
import { useTaxMaster } from '@/hooks/pos/useTaxMaster';
import { MasterTaxItem } from '@/lib/mock/tax';

export const PosTaxView = () => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTax, setEditingTax] = useState<MasterTaxItem | null>(null);

  const { taxes, auditLogs, userRole, createTax, updateTax, softDeleteTax } = useTaxMaster();

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    ratePercentage: 11,
    coaAccount: '2-10300 - Utang PPN Keluaran Retail',
    applicableModules: ['POS Retail', 'Hotel PMS', 'Resto POS'],
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE'
  });

  const registeredCoaAccounts = [
    '2-10300 - Utang PPN Keluaran Retail',
    '2-10301 - Utang Pajak Restoran & Hotel PB1',
    '2-10302 - Utang Pajak Penjualan PPh 22/23',
    'N/A - Non Taxable Account'
  ];

  const handleOpenCreate = () => {
    setEditingTax(null);
    setFormData({
      code: `TAX-REG-${Math.floor(10 + Math.random() * 90)}`,
      name: '',
      ratePercentage: 11,
      coaAccount: registeredCoaAccounts[0],
      applicableModules: ['POS Retail', 'Hotel PMS'],
      status: 'ACTIVE'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (tax: MasterTaxItem) => {
    setEditingTax(tax);
    setFormData({
      code: tax.code,
      name: tax.name,
      ratePercentage: tax.ratePercentage,
      coaAccount: tax.coaAccount,
      applicableModules: tax.applicableModules,
      status: tax.status === 'ARCHIVED' ? 'ACTIVE' : tax.status
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;

    if (editingTax) {
      updateTax(editingTax.id, formData);
      alert(`Master Pajak [${formData.name}] berhasil diperbarui!`);
    } else {
      createTax(formData);
      alert(`Master Pajak Baru [${formData.name}] berhasil terdaftar!`);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus (Soft-Delete) Master Pajak [${name}]?\nData historis pembukuan tetap tersimpan di Audit Trail Log.`)) {
      softDeleteTax(id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Percent className="w-5 h-5 text-amber-500" />
            <span>Master Pajak POS & Hotel</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-amber-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Master Pajak"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-amber-400">
                  <span>Glossary Master Pajak Multi-Modul</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Multi-Modul Tax</strong>: Tarif pajak terpusat yang dikonsumsi oleh POS Retail, Hotel PMS, Resto, & Vendor PO.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Linkage COA Utang Pajak</strong>: Setiap skema pajak terikat ke akun COA Utang PPN / PB1 resmi.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Soft-Delete & Role Restriction</strong>: Edit & hapus khusus IT/Admin dengan log audit lengkap.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Aturan Pajak Baru</span>
        </button>
      </div>

      {/* Main Tax Master Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Daftar Skema Pajak Terdaftar ({taxes.length})</span>
          <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1">
            <Lock className="w-3 h-3" /> Restricted Edit (IT / ADMIN)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Kode Pajak</th>
                <th className="py-3 px-4">Nama Skema Pajak</th>
                <th className="py-3 px-4 text-center">Tarif (%)</th>
                <th className="py-3 px-4">Linkage COA Utang Pajak</th>
                <th className="py-3 px-4">Modul Pengguna</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {taxes.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">{t.code}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{t.name}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-lg text-emerald-600 dark:text-emerald-400">
                    {t.ratePercentage}%
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                    {t.coaAccount}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {t.applicableModules.map((m) => (
                        <span key={m} className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(t)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer"
                        title="Edit Master Pajak"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id, t.name)}
                        className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg cursor-pointer"
                        title="Soft Delete Master Pajak"
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

      {/* Audit Trail History Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <History className="w-4 h-4 text-amber-500" />
            <span>Audit Trail Log Mutasi Master Pajak (Governance History)</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Immutable Audit Logs</span>
        </div>

        <div className="space-y-2">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400">{log.timestamp}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{log.user}</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    {log.role}
                  </span>
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px]">{log.details}</div>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                log.action === 'CREATE' ? 'bg-emerald-100 text-emerald-800' :
                log.action === 'EDIT' ? 'bg-sky-100 text-sky-800' :
                'bg-red-100 text-red-800'
              }`}>
                {log.action}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal CRUD Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Percent className="w-4 h-4 text-amber-500" />
                <span>{editingTax ? 'Edit Master Pajak' : 'Tambah Master Pajak Baru'}</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kode Pajak</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-amber-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Tarif Pajak (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.ratePercentage}
                    onChange={(e) => setFormData({ ...formData, ratePercentage: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Skema Pajak</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. PPN 11% Standar Retail / PB1 10% Hotel"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-indigo-600 dark:text-indigo-400">Linkage Akun COA Utang Pajak</label>
                <select
                  value={formData.coaAccount}
                  onChange={(e) => setFormData({ ...formData, coaAccount: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-semibold"
                >
                  {registeredCoaAccounts.map((coa) => (
                    <option key={coa} value={coa}>
                      {coa}
                    </option>
                  ))}
                </select>
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
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Simpan Master Pajak
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
