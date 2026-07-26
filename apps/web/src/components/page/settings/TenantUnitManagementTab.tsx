'use client';

import React, { useState } from 'react';
import { Building, Plus, MapPin, CheckCircle2, X, Store } from 'lucide-react';
import { useTenantContext } from '@/context/TenantContext';
import { TenantUnit } from '@/lib/mock/units';

export const TenantUnitManagementTab = () => {
  const { availableUnits, switchUnit } = useTenantContext();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    industryCategory: 'Retail Bakery Chain',
    type: 'Retail Chain'
  });

  const handleOpenCreate = () => {
    setFormData({
      code: `UNIT-${Math.floor(10 + Math.random() * 90)}`,
      name: '',
      industryCategory: 'Retail Bakery Chain',
      type: 'Retail Chain'
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    alert(`Unit Bisnis Baru [${formData.name}] Berhasil Didaftarkan di Bawah Holding!`);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building className="w-5 h-5 text-sky-500" />
            <span>Unit Bisnis ({availableUnits.length})</span>
          </h2>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Unit Bisnis</span>
        </button>
      </div>

      {/* Grid of Units */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableUnits.map((u) => (
          <div
            key={u.tenantId}
            className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400 font-bold">{u.code}</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{u.name}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-600 border border-sky-500/20">
                {u.type}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-slate-400" />
                <span>Daftar Cabang / Outlets ({u.branches.length} Cabang):</span>
              </div>
              <div className="space-y-1 pl-2">
                {u.branches.map((b) => (
                  <div key={b.id} className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{b.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{b.city}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => switchUnit(u.tenantId)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-bold transition-all cursor-pointer"
              >
                Beralih ke Unit Ini
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Unit */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-sky-500" />
                <span>Pendaftaran Unit Bisnis Baru (Tenant)</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Kode Unit / Tenant</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sky-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Unit Bisnis / Anak Perusahaan</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Toko Roti Mahkota / Resto Sunda"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Kategori Industri</label>
                <select
                  value={formData.industryCategory}
                  onChange={(e) => setFormData({ ...formData, industryCategory: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
                >
                  <option value="Retail Bakery Chain">🍞 Toko Roti & Bakery Chain</option>
                  <option value="FnB & Resto">🍲 Restoran & Catering</option>
                  <option value="Hotelier & Hospitality">🏨 Hotel & Hospitality</option>
                  <option value="Pertambangan Emas">⛏️ Pertambangan Emas</option>
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
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Daftarkan Unit Bisnis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
