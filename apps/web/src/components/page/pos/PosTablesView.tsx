'use client';

import React, { useState } from 'react';
import { UtensilsCrossed, Users, CheckCircle2, Scissors, HelpCircle, X, Clock } from 'lucide-react';
import { useTables } from '@/hooks/pos/useTables';
import { DiningTable } from '@/lib/mock/tables';

export const PosTablesView = () => {
  const { tables, filterZone, setFilterZone, totalOccupied, occupancyPercentage, updateTableStatus, splitBillTable } = useTables();
  const [selectedTable, setSelectedTable] = useState<DiningTable | null>(null);
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [splitCount, setSplitCount] = useState(2);

  const handleOpenSplit = (table: DiningTable) => {
    setSelectedTable(table);
    setShowSplitModal(true);
  };

  const handleExecuteSplit = () => {
    if (selectedTable) {
      splitBillTable(selectedTable.id, splitCount);
      setShowSplitModal(false);
    }
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              Denah Meja
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
            className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold focus:outline-none"
          >
            <option value="ALL">Semua Zona Resto ({tables.length} Meja)</option>
            <option value="MAIN_HALL">Main Dining Hall</option>
            <option value="VIP_ROOM">VIP Room</option>
            <option value="OUTDOOR_TERRACE">Outdoor Terrace</option>
          </select>

          <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold font-mono">
            Okupansi: {occupancyPercentage}% ({totalOccupied} Meja Terisi)
          </span>
        </div>
      </div>

      {/* Tables Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tables.map((tbl) => (
          <div
            key={tbl.id}
            className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
              tbl.status === 'OCCUPIED'
                ? 'bg-sky-50/50 dark:bg-slate-800 border-sky-500/50 shadow-sm ring-1 ring-sky-500/20'
                : tbl.status === 'BILL_PRINTED'
                ? 'bg-purple-50/50 dark:bg-slate-800 border-purple-500/50 shadow-sm'
                : tbl.status === 'RESERVED'
                ? 'bg-amber-50/50 dark:bg-slate-800 border-amber-500/50 shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">{tbl.tableNumber}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    tbl.status === 'OCCUPIED'
                      ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                      : tbl.status === 'BILL_PRINTED'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                      : tbl.status === 'RESERVED'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {tbl.status}
                </span>
              </div>

              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>Zona: {tbl.sectionZone}</span>
                <span>Kapasitas: {tbl.capacitySeats} Kursi</span>
              </div>

              {tbl.activeSubtotal && (
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Order: {tbl.activeOrderCode}</span>
                    <span>Tamu: {tbl.currentGuestCount} Org</span>
                  </div>
                  <div className="font-bold text-sky-600 dark:text-sky-400 font-mono text-sm">
                    Rp {tbl.activeSubtotal.toLocaleString('id-ID')}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between gap-2">
              {tbl.status === 'OCCUPIED' && (
                <button
                  onClick={() => handleOpenSplit(tbl)}
                  className="w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Split Bill Nota</span>
                </button>
              )}

              {tbl.status === 'AVAILABLE' && (
                <button
                  onClick={() => updateTableStatus(tbl.id, 'OCCUPIED', 2)}
                  className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Duduki Meja Ini</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Split Bill Modal */}
      {showSplitModal && selectedTable && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Scissors className="w-4 h-4 text-purple-500" />
                <span>Split Bill {selectedTable.tableNumber}</span>
              </h3>
              <button onClick={() => setShowSplitModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-purple-50 dark:bg-slate-800 rounded-xl space-y-1">
                <div className="text-[10px] text-slate-400">Total Tagihan Meja:</div>
                <div className="font-bold text-purple-600 dark:text-purple-400 font-mono text-base">
                  Rp {(selectedTable.activeSubtotal || 0).toLocaleString('id-ID')}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Pisah Menjadi Berapa Nota Tagihan?</label>
                <input
                  type="number"
                  min={2}
                  max={5}
                  value={splitCount}
                  onChange={(e) => setSplitCount(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-purple-600"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSplitModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleExecuteSplit}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold shadow-sm transition-all cursor-pointer"
              >
                Cetak Split Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
