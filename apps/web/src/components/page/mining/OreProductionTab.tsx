'use client';

import React, { useState } from 'react';
import { Boxes, Plus, CheckCircle2, X, HardHat } from 'lucide-react';
import { OreProductionLog } from '@/lib/mock/mining';

interface Props {
  oreLogs: OreProductionLog[];
  addOreLog: (log: Omit<OreProductionLog, 'id' | 'logCode' | 'date'>) => void;
}

export const OreProductionTab = ({ oreLogs, addOreLog }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    shift: 'SHIFT_1_DAY' as OreProductionLog['shift'],
    pitSite: 'Pit East Block 4 Kutai',
    targetStockpile: 'Stockpile Ore Yard 1 (High Grade)',
    oreGradeGramsPerTon: 4.5,
    tonnageExtracted: 1500,
    haulingTrucksCount: 12,
    supervisor: 'Ir. Hidayat Mining'
  });

  const handleOpenCreate = () => {
    setFormData({
      shift: 'SHIFT_1_DAY',
      pitSite: 'Pit East Block 4 Kutai',
      targetStockpile: 'Stockpile Ore Yard 1 (High Grade)',
      oreGradeGramsPerTon: 4.5,
      tonnageExtracted: 1500,
      haulingTrucksCount: 12,
      supervisor: 'Ir. Hidayat Mining'
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOreLog(formData);
    alert(`Log Produksi Galian Ore [${formData.tonnageExtracted} Ton] Berhasil Dicatat!`);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Boxes className="w-5 h-5 text-amber-500" />
            <span>Produksi Ore ({oreLogs.length})</span>
          </h2>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Catat Produksi Ore Baru</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Kode Log</th>
                <th className="py-3 px-4">Tanggal & Shift</th>
                <th className="py-3 px-4">Lokasi Pit ➔ Stockpile</th>
                <th className="py-3 px-4 text-right">Tonase Galian (Ton)</th>
                <th className="py-3 px-4 text-center">Kadar Emas (g/t)</th>
                <th className="py-3 px-4">Armada Truck & Supervisor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {oreLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">{log.logCode}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold">{log.date}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{log.shift}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{log.pitSite}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">➔ {log.targetStockpile}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-lg text-amber-600 dark:text-amber-400">
                    {log.tonnageExtracted.toLocaleString('id-ID')} Ton
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {log.oreGradeGramsPerTon} g/t
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold">{log.haulingTrucksCount} Units Hauling Dump Trucks</div>
                    <div className="text-[10px] text-slate-400">Supervised by: {log.supervisor}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Ore Log */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Boxes className="w-4 h-4 text-amber-500" />
                <span>Pencatatan Hasil Galian Ore Tambang Baru</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Shift Kerja Tambang</label>
                  <select
                    value={formData.shift}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold text-amber-600"
                  >
                    <option value="SHIFT_1_DAY">SHIFT 1 (SIANG / DAY)</option>
                    <option value="SHIFT_2_NIGHT">SHIFT 2 (MALAM / NIGHT)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Tonase Galian (Ton)</label>
                  <input
                    type="number"
                    required
                    value={formData.tonnageExtracted}
                    onChange={(e) => setFormData({ ...formData, tonnageExtracted: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Lokasi Pit Tambang</label>
                  <input
                    type="text"
                    required
                    value={formData.pitSite}
                    onChange={(e) => setFormData({ ...formData, pitSite: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Target Stockpile Yard</label>
                  <input
                    type="text"
                    required
                    value={formData.targetStockpile}
                    onChange={(e) => setFormData({ ...formData, targetStockpile: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold text-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Kadar Emas Lab (g/t)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.oreGradeGramsPerTon}
                    onChange={(e) => setFormData({ ...formData, oreGradeGramsPerTon: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-indigo-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Jumlah Hauling Truck</label>
                  <input
                    type="number"
                    required
                    value={formData.haulingTrucksCount}
                    onChange={(e) => setFormData({ ...formData, haulingTrucksCount: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                  />
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
                  Simpan Log Galian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
