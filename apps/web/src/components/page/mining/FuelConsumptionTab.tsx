'use client';

import React, { useState } from 'react';
import { Fuel, Plus, CheckCircle2, X } from 'lucide-react';
import { FuelConsumptionLog, HeavyFleetItem } from '@/lib/mock/mining';

interface Props {
  fuelLogs: FuelConsumptionLog[];
  fleets: HeavyFleetItem[];
  addFuelLog: (fuel: Omit<FuelConsumptionLog, 'id' | 'refuelCode' | 'timestamp'>) => void;
}

export const FuelConsumptionTab = ({ fuelLogs, fleets, addFuelLog }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    equipmentCode: fleets[0]?.code || 'EXC-CAT-390F',
    equipmentName: fleets[0]?.name || 'Caterpillar 390F Heavy Excavator',
    fuelDispersedLiters: 500,
    sourceTank: 'Tangki BBM Solar HSD Utama Site (50.000L)',
    dispenserOperator: 'Joko Dispenser Ops'
  });

  const handleOpenCreate = () => {
    if (fleets.length > 0) {
      setFormData({
        equipmentCode: fleets[0].code,
        equipmentName: fleets[0].name,
        fuelDispersedLiters: 500,
        sourceTank: 'Tangki BBM Solar HSD Utama Site (50.000L)',
        dispenserOperator: 'Joko Dispenser Ops'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFuelLog(formData);
    alert(`Refuel BBM Solar HSD [${formData.fuelDispersedLiters} Liter] Berhasil Diterbitkan!`);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Fuel className="w-5 h-5 text-sky-500" />
            <span>Konsumsi BBM ({fuelLogs.length})</span>
          </h2>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Refuel Solar HSD</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Kode Transaksi</th>
                <th className="py-3 px-4">Waktu Refuel</th>
                <th className="py-3 px-4">Kode & Nama Alat Berat</th>
                <th className="py-3 px-4 text-right">Jumlah Solar (Liter)</th>
                <th className="py-3 px-4">Tangki Asal & Operator Dispenser</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {fuelLogs.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{f.refuelCode}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{f.timestamp}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{f.equipmentName}</div>
                    <div className="text-[10px] font-mono text-amber-600 font-bold">{f.equipmentCode}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-lg text-sky-600 dark:text-sky-400">
                    {f.fuelDispersedLiters.toLocaleString('id-ID')} Liter
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-700 dark:text-slate-300">{f.sourceTank}</div>
                    <div className="text-[10px] text-slate-400">Operator: {f.dispenserOperator}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Refuel */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Fuel className="w-4 h-4 text-sky-500" />
                <span>Pengisian Refuel Solar HSD Alat Berat</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Pilih Alat Berat Tambang</label>
                <select
                  value={formData.equipmentCode}
                  onChange={(e) => {
                    const selected = fleets.find((f) => f.code === e.target.value);
                    setFormData({
                      ...formData,
                      equipmentCode: e.target.value,
                      equipmentName: selected ? selected.name : formData.equipmentName
                    });
                  }}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
                >
                  {fleets.map((fl) => (
                    <option key={fl.id} value={fl.code}>
                      [{fl.code}] {fl.name} - Tangki Current: {fl.currentFuelLevel}L
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Jumlah Solar HSD (Liter)</label>
                <input
                  type="number"
                  required
                  value={formData.fuelDispersedLiters}
                  onChange={(e) => setFormData({ ...formData, fuelDispersedLiters: Number(e.target.value) })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sky-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tangki Utama Asal</label>
                <input
                  type="text"
                  required
                  value={formData.sourceTank}
                  onChange={(e) => setFormData({ ...formData, sourceTank: e.target.value })}
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
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Proses Pengisian Solar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
