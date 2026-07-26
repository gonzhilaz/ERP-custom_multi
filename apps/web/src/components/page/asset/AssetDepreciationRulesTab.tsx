'use client';

import React, { useState } from 'react';
import { ShieldCheck, Plus, BookOpen, X, Sparkles } from 'lucide-react';
import { TaxDepreciationRule } from '@/lib/mock/asset-depreciation';

interface Props {
  taxRules: TaxDepreciationRule[];
  addTaxRule: (rule: Omit<TaxDepreciationRule, 'id'>) => void;
}

export const AssetDepreciationRulesTab = ({ taxRules, addTaxRule }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    groupCode: 'KEL-CUSTOM',
    groupName: 'Kelompok Khusus Baru (PMK 2026)',
    assetClassification: 'NON_BUILDING' as TaxDepreciationRule['assetClassification'],
    usefulLifeYears: 4,
    straightLineRatePct: 25.0,
    decliningBalanceRatePct: 50.0,
    examples: 'Perangkat teknologi AI server, robotik manufaktur'
  });

  const handleOpenCreate = () => {
    setFormData({
      groupCode: '',
      groupName: '',
      assetClassification: 'NON_BUILDING' as TaxDepreciationRule['assetClassification'],
      usefulLifeYears: 4,
      straightLineRatePct: 25.0,
      decliningBalanceRatePct: 50.0,
      examples: ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTaxRule(formData);
    alert(`Aturan Depresiasi Pajak Baru [${formData.groupName}] Berhasil Ditambahkan!`);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>Aturan Pajak</span>
          </h2>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kelompok</span>
        </button>
      </div>

      {/* Rules Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4 font-mono">Kode Kelompok</th>
                <th className="py-3 px-4">Nama Kelompok Aset Pajak</th>
                <th className="py-3 px-4 text-center font-bold text-sky-600">Masa Manfaat (Tahun)</th>
                <th className="py-3 px-4 text-center font-bold text-emerald-600">Tarif Garis Lurus (%)</th>
                <th className="py-3 px-4 text-center font-bold text-amber-600">Tarif Saldo Menurun (%)</th>
                <th className="py-3 px-4">Contoh Jenis Aset Terdapat Dalam PMK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {taxRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{rule.groupCode}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{rule.groupName}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-base text-sky-600">
                    {rule.usefulLifeYears} Thn
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {rule.straightLineRatePct}% / thn
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-amber-600">
                    {rule.decliningBalanceRatePct ? `${rule.decliningBalanceRatePct}% / thn` : 'N/A (Bangunan)'}
                  </td>
                  <td className="py-3 px-4 text-[11px] text-slate-500 italic">{rule.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Tax Rule */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Tambah Kelompok Pajak</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kode Kelompok</label>
                  <input
                    type="text"
                    required
                    value={formData.groupCode}
                    onChange={(e) => setFormData({ ...formData, groupCode: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sky-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Masa Manfaat (Tahun)</label>
                  <input
                    type="number"
                    required
                    value={formData.usefulLifeYears}
                    onChange={(e) => setFormData({ ...formData, usefulLifeYears: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Kelompok Aset</label>
                <input
                  type="text"
                  required
                  value={formData.groupName}
                  onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Tarif Garis Lurus (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.straightLineRatePct}
                    onChange={(e) => setFormData({ ...formData, straightLineRatePct: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Tarif Saldo Menurun (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.decliningBalanceRatePct}
                    onChange={(e) => setFormData({ ...formData, decliningBalanceRatePct: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Contoh Jenis Aset</label>
                <textarea
                  rows={2}
                  value={formData.examples}
                  onChange={(e) => setFormData({ ...formData, examples: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 text-xs"
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
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Simpan Aturan Pajak
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
