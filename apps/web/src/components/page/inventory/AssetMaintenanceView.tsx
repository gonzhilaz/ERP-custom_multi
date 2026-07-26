'use client';

import React, { useState } from 'react';
import { Wrench, CheckCircle2, Clock, Plus, HelpCircle, X } from 'lucide-react';
import { useInventory } from '@/hooks/inventory/useInventory';

export const AssetMaintenanceView = () => {
  const { allAssets } = useInventory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const [maintenanceItems, setMaintenanceItems] = useState([
    {
      id: 'maint-01',
      assetCode: 'AST-FREEZER-02',
      assetName: 'Commercial Walk-In Cold Room Deep Freezer',
      branch: 'Cabang Senopati Flagship',
      technician: 'PT ColdTech Solution',
      startDate: '2026-07-21',
      estimatedCompletion: '2026-07-25',
      status: 'IN_PROGRESS',
      notes: 'Penggantian Freon R404a & perbaikan kompresor pendingin'
    },
    {
      id: 'maint-02',
      assetCode: 'AST-CAT777-04',
      assetName: 'Excavator Heavy Fleet Caterpillar CAT 777D',
      branch: 'Site Kutai Kartanegara',
      technician: 'Traktor Nusantara Support',
      startDate: '2026-07-18',
      estimatedCompletion: '2026-07-24',
      status: 'IN_PROGRESS',
      notes: 'Overhaul transmisi otomatis & ganti oli hidrolik'
    }
  ]);

  const [formData, setFormData] = useState({
    assetId: allAssets[0]?.id || '',
    technician: '',
    estimatedCompletion: '2026-08-01',
    notes: ''
  });

  const handleCompleteMaintenance = (id: string) => {
    setMaintenanceItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'COMPLETED' } : item))
    );
    alert('Asset selesai dirawat dan statusnya kembali AKTIF OPERASIONAL!');
  };

  const handleCreateWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAsset = allAssets.find((a) => a.id === formData.assetId) || allAssets[0];
    const newWorkOrder = {
      id: `maint-${Date.now()}`,
      assetCode: selectedAsset?.code || 'AST-NEW-01',
      assetName: selectedAsset?.name || 'Asset Tetap',
      branch: selectedAsset?.branchLocation || 'Cabang Utama',
      technician: formData.technician || 'Tim Maintenance Internal',
      startDate: new Date().toISOString().split('T')[0],
      estimatedCompletion: formData.estimatedCompletion,
      status: 'IN_PROGRESS',
      notes: formData.notes
    };
    setMaintenanceItems((prev) => [newWorkOrder, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-500" />
            <span>Asset Status</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1"
              title="Informasi & Glossary Asset Status"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Asset Maintenance</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Work Order Servis</strong>: Penugasan perbaikan asset tetap ke teknisi/vendor.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Status Maintenance</strong>: Melacak aset yang sedang dalam perbaikan (*In Repair*) dan aset siap pakai (*Active*).
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Work Order</span>
        </button>
      </div>

      {/* Maintenance Work Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-amber-50/50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
          <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
            Work Order Service ({maintenanceItems.length})
          </span>
          <span className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold">Real-Time Progress</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Kode & Nama Asset</th>
                <th className="py-3.5 px-4">Lokasi Cabang</th>
                <th className="py-3.5 px-4">Teknisi PJ</th>
                <th className="py-3.5 px-4 text-center">Tgl Masuk</th>
                <th className="py-3.5 px-4 text-center">Estimasi Selesai</th>
                <th className="py-3.5 px-4">Catatan Perbaikan</th>
                <th className="py-3.5 px-4 text-center">Status Service</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {maintenanceItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    <span className="text-amber-600 dark:text-amber-400 font-mono block text-[11px]">{item.assetCode}</span>
                    <span>{item.assetName}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{item.branch}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">{item.technician}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-slate-500">{item.startDate}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-600 dark:text-amber-400">
                    {item.estimatedCompletion}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{item.notes}</td>
                  <td className="py-3.5 px-4 text-center">
                    {item.status === 'COMPLETED' ? (
                      <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Selesai & Aktif</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Proses Repair</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {item.status !== 'COMPLETED' && (
                      <button
                        onClick={() => handleCompleteMaintenance(item.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-semibold shadow-sm transition-all cursor-pointer"
                      >
                        Selesai & Aktifkan
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form New Work Order */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-slate-900 dark:text-white text-xs">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-500" />
              <span>Input Work Order Asset Baru</span>
            </h3>

            <form onSubmit={handleCreateWorkOrder} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Pilih Asset Tetap</label>
                <select
                  value={formData.assetId}
                  onChange={(e) => setFormData({ ...formData, assetId: e.target.value })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
                >
                  {allAssets.map((ast) => (
                    <option key={ast.id} value={ast.id}>
                      {ast.code} - {ast.name} ({ast.branchLocation})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Teknisi / Vendor Penanggung Jawab</label>
                <input
                  type="text"
                  required
                  value={formData.technician}
                  onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                  placeholder="e.g. PT ColdTech Solution / Tim Internal"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Estimasi Tanggal Selesai</label>
                <input
                  type="date"
                  required
                  value={formData.estimatedCompletion}
                  onChange={(e) => setFormData({ ...formData, estimatedCompletion: e.target.value })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Catatan Kerusakan & Perbaikan</label>
                <textarea
                  rows={3}
                  required
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Deskripsikan masalah & sparepart..."
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
                <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-semibold">
                  Simpan Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
