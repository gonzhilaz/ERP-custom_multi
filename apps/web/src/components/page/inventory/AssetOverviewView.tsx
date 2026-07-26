'use client';

import React from 'react';
import { Building, CheckCircle2, Wrench, DollarSign, History } from 'lucide-react';
import { useInventory } from '@/hooks/inventory/useInventory';

export const AssetOverviewView = () => {
  const { allAssets } = useInventory();

  const totalDepreciation = allAssets.reduce((acc, curr) => acc + curr.accumulatedDepreciation, 0);
  const bepAssets = allAssets.filter((a) => a.bookValue <= 0 || a.accumulatedDepreciation >= a.purchaseCost * 0.9);
  const operationalCount = allAssets.filter((a) => a.status === 'OPERATIONAL').length;
  const maintenanceCount = allAssets.filter((a) => a.status !== 'OPERATIONAL').length;

  const mockMaintenanceLogs = [
    {
      id: 'log-01',
      date: '2026-07-20',
      assetCode: 'AST-OVEN-001',
      assetName: 'Mesin Oven Deck Commercial 3-Deck',
      technician: 'Bambang Service Center',
      actionCost: 1500000,
      description: 'Penggantian elemen pemanas (thermostat) & kalibrasi suhu oven'
    },
    {
      id: 'log-02',
      date: '2026-07-15',
      assetCode: 'AST-CAT777-04',
      assetName: 'Excavator Heavy Fleet Caterpillar CAT 777D',
      technician: 'Traktor Nusantara Technical Support',
      actionCost: 12500000,
      description: 'Perbaikan sistem hidrolik swing motor & penggantian seal oli'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Building className="w-5 h-5 text-indigo-500" />
          <span>Asset Overview</span>
        </h1>
      </div>

      {/* KPI Cards Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Asset Lunas BEP</div>
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">{bepAssets.length} Item BEP</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Asset Operasional Aktif</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{operationalCount} Active</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Asset Dalam Perbaikan</div>
            <div className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-0.5">{maintenanceCount} Service</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Akumulasi Depresiasi</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Rp {totalDepreciation.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-500/10 text-slate-500 flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Maintenance History Log Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <History className="w-4 h-4 text-indigo-500" />
            <span>Maintenance Log</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Tanggal Service</th>
                <th className="py-3.5 px-4">Kode & Nama Asset</th>
                <th className="py-3.5 px-4">Teknisi PJ</th>
                <th className="py-3.5 px-4">Deskripsi Perbaikan</th>
                <th className="py-3.5 px-4 text-right">Biaya Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {mockMaintenanceLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{log.date}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono block text-[11px]">{log.assetCode}</span>
                    <span>{log.assetName}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-semibold">{log.technician}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{log.description}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                    Rp {log.actionCost.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
