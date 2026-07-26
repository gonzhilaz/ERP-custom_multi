'use client';

import React, { useState } from 'react';
import { PlayCircle, Plus, CheckCircle2, Clock, Warehouse, X, Sparkles, BookOpen } from 'lucide-react';
import { WorkOrderItem, BomRecipeItem } from '@/lib/mock/manufacturing';

interface Props {
  workOrders: WorkOrderItem[];
  recipes: BomRecipeItem[];
  createWorkOrder: (wo: Omit<WorkOrderItem, 'id' | 'woNumber' | 'status' | 'totalEstimatedCogm'>) => void;
  completeWorkOrder: (woId: string) => void;
}

export const WorkOrderTab = ({
  workOrders,
  recipes,
  createWorkOrder,
  completeWorkOrder
}: Props) => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    bomId: recipes[0]?.id || '',
    targetOutputQty: 50,
    warehouseSource: 'Gudang Utama Bahan Baku',
    warehouseTarget: 'Gudang Barang Jadi Outlet',
    executedBy: 'Manajer Produksi'
  });

  const selectedRecipe = recipes.find((r) => r.id === formData.bomId);

  const handleOpenCreate = () => {
    if (recipes.length > 0) {
      setFormData({
        bomId: recipes[0].id,
        targetOutputQty: recipes[0].outputQty,
        warehouseSource: 'Gudang Utama Bahan Baku',
        warehouseTarget: 'Gudang Barang Jadi Outlet',
        executedBy: 'Manajer Produksi'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecipe) return;

    createWorkOrder({
      bomId: selectedRecipe.id,
      bomName: selectedRecipe.name,
      category: selectedRecipe.category,
      targetOutputQty: formData.targetOutputQty,
      outputUom: selectedRecipe.outputUom,
      startDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      warehouseSource: formData.warehouseSource,
      warehouseTarget: formData.warehouseTarget,
      executedBy: formData.executedBy
    });

    alert(
      `Work Order Produksi [${selectedRecipe.name}] Berhasil Dirilis!\n\nStatus: RELEASED\n- Pemotongan Stok Bahan Baku Otomatis dari [${formData.warehouseSource}]\n- Terposting ke Jurnal COGM Finance (/finance/journals)`
    );
    setShowModal(false);
  };

  const handleComplete = (wo: WorkOrderItem) => {
    completeWorkOrder(wo.id);
    alert(
      `Work Order Batch [${wo.woNumber}] SELESAI!\n\n- ${wo.targetOutputQty} ${wo.outputUom} Barang Jadi telah didaftarkan ke [${wo.warehouseTarget}].\n- Stok siap dijual di Kasir POS!`
    );
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-amber-500" />
            <span>Work Order ({workOrders.length})</span>
          </h2>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Rilis Work Order Baru</span>
        </button>
      </div>

      {/* Main Work Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">No. Work Order</th>
                <th className="py-3 px-4">Formulasi Resep & Output Target</th>
                <th className="py-3 px-4">Gudang Asal ➔ Tujuan</th>
                <th className="py-3 px-4 text-right">Estimasi COGM Batch</th>
                <th className="py-3 px-4 text-center">Status Produksi</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {workOrders.map((wo) => (
                <tr key={wo.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">
                    <div>{wo.woNumber}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{wo.startDate}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{wo.bomName}</div>
                    <div className="text-[11px] text-sky-600 font-mono font-semibold">
                      Target: {wo.targetOutputQty} {wo.outputUom}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <Warehouse className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{wo.warehouseSource}</span>
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold pl-4">
                      ➔ {wo.warehouseTarget}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Rp {wo.totalEstimatedCogm.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        wo.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : wo.status === 'IN_PRODUCTION' || wo.status === 'RELEASED'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {wo.status === 'COMPLETED' ? 'COMPLETED' : 'IN PRODUCTION'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {wo.status !== 'COMPLETED' ? (
                      <button
                        onClick={() => handleComplete(wo)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 mx-auto cursor-pointer shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Selesai</span>
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Finished
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Create Work Order */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-amber-500" />
                <span>Rilis Work Order Batch Produksi Baru</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Pilih Formulasi Resep BOM</label>
                <select
                  value={formData.bomId}
                  onChange={(e) => setFormData({ ...formData, bomId: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
                >
                  {recipes.map((r) => (
                    <option key={r.id} value={r.id}>
                      [{r.category}] {r.name} - COGM Rp {r.estimatedCogmPerUnit.toLocaleString('id-ID')}/{r.outputUom}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Target Jumlah Produksi ({selectedRecipe?.outputUom || 'Pcs'})</label>
                <input
                  type="number"
                  required
                  value={formData.targetOutputQty}
                  onChange={(e) => setFormData({ ...formData, targetOutputQty: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Gudang Asal (Bahan Baku)</label>
                  <input
                    type="text"
                    required
                    value={formData.warehouseSource}
                    onChange={(e) => setFormData({ ...formData, warehouseSource: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Gudang Tujuan (Barang Jadi)</label>
                  <input
                    type="text"
                    required
                    value={formData.warehouseTarget}
                    onChange={(e) => setFormData({ ...formData, warehouseTarget: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold text-emerald-600"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900/40 space-y-1">
                <div className="font-bold text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Output Jurnal COGM Otomatis:
                </div>
                <div className="text-[10px] font-mono text-amber-700 dark:text-amber-400">
                  Total Estimasi: Rp {((selectedRecipe?.estimatedCogmPerUnit || 0) * formData.targetOutputQty).toLocaleString('id-ID')}
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
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Rilis Batch Produksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
