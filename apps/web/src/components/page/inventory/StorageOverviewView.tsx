'use client';

import React from 'react';
import { Warehouse, ArrowLeftRight, Thermometer, ShieldAlert } from 'lucide-react';
import { useInventory } from '@/hooks/inventory/useInventory';

export const StorageOverviewView = () => {
  const { allStorages } = useInventory();

  const mockStockTransferLogs = [
    {
      id: 'tf-01',
      date: '2026-07-23 14:30',
      itemName: 'Tepung Terigu Cakra Kembar Premium (25kg)',
      qty: 50,
      uom: 'Karung',
      source: 'Gudang Utama Sudirman',
      destination: 'Cabang Mall Kelapa Gading',
      operator: 'Eko Stok'
    },
    {
      id: 'tf-02',
      date: '2026-07-22 10:15',
      itemName: 'Daging Sapi Ribeye Wagyu MB5',
      qty: 25,
      uom: 'Kg',
      source: 'Gudang Utama Resto (Cold Storage)',
      destination: 'Cold Storage Senopati',
      operator: 'Budi Resto'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Warehouse className="w-5 h-5 text-amber-500" />
          <span>Storage Overview</span>
        </h1>
      </div>

      {/* Storage Environmental & Capacity Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allStorages.map((str) => {
          const usedPct = Math.round((str.capacityUsed / str.capacityMax) * 100);
          const isHighAlert = usedPct >= 85;

          return (
            <div
              key={str.id}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">{str.code}</span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{str.name}</h3>
                  <div className="text-[11px] text-slate-500">{str.branchName}</div>
                </div>
                {isHighAlert && (
                  <span className="px-2 py-1 bg-red-500/10 text-red-600 border border-red-500/30 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    <span>Kapasitas Kritis</span>
                  </span>
                )}
              </div>

              {/* Progress Bar Okupansi */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Okupansi:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {str.capacityUsed} / {str.capacityMax} {str.uom} ({usedPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${usedPct > 85 ? 'bg-red-500' : 'bg-emerald-500'}`}
                    style={{ width: `${usedPct}%` }}
                  ></div>
                </div>
              </div>

              {/* Sensor Lingkungan (Cold Storage Sensor) */}
              {str.type === 'COLD_STORAGE' && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1 text-sky-600 font-semibold">
                    <Thermometer className="w-4 h-4 text-sky-500" />
                    <span>Suhu Freezer: -18.5°C</span>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">Optimal</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stock Transfer Log Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <ArrowLeftRight className="w-4 h-4 text-amber-500" />
            <span>Stock Transfer Log</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Waktu Mutasi</th>
                <th className="py-3.5 px-4">Nama Barang</th>
                <th className="py-3.5 px-4 text-center">Jumlah Transfer</th>
                <th className="py-3.5 px-4">Storage Asal</th>
                <th className="py-3.5 px-4">Storage Tujuan</th>
                <th className="py-3.5 px-4 text-center">Operator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {mockStockTransferLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{log.date}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">{log.itemName}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-600 dark:text-amber-400">
                    {log.qty} {log.uom}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{log.source}</td>
                  <td className="py-3.5 px-4 text-slate-500">{log.destination}</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-700 dark:text-slate-300">{log.operator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
