'use client';

import React, { useState } from 'react';
import { Boxes, AlertTriangle, Plus, Warehouse, HelpCircle, X } from 'lucide-react';
import { useInventory } from '@/hooks/inventory/useInventory';
import { SkeletonTable } from '@/components/ui/loader/skeleton/SkeletonTable';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';

export const InventoryView = () => {
  const {
    items,
    loading,
    filterWarehouse,
    setFilterWarehouse,
    showAlertsOnly,
    setShowAlertsOnly,
    reorderAlertCount
  } = useInventory();
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Boxes className="w-5 h-5 text-sky-500" />
            <span>Inventory Gudang</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Inventory"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Inventory & Stok</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Multi-Warehouse Tracking</strong>: Pemantauan persediaan barang di berbagai lokasi gudang unit bisnis.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>FIFO / Moving Average</strong>: Metode penilaian HPP persediaan barang.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Item Barang</span>
          </button>
        </div>
      </div>

      {/* Alert Banner if any minimum stock triggered */}
      {reorderAlertCount > 0 && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-white rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-amber-900 dark:text-amber-200">
                Stok Minimum ({reorderAlertCount} SKU Re-order)
              </h4>
            </div>
          </div>

          <button
            onClick={() => setShowAlertsOnly(!showAlertsOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              showAlertsOnly ? 'bg-amber-600 text-white' : 'bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
            }`}
          >
            {showAlertsOnly ? 'Semua Barang' : 'Barang Kritis'}
          </button>
        </div>
      )}

      {/* Table & Controls */}
      {loading ? (
        <SkeletonTable />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Persediaan Gudang</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter Gudang:</span>
              <select
                value={filterWarehouse}
                onChange={(e) => setFilterWarehouse(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs focus:outline-none"
              >
                <option value="ALL">Semua Gudang & Site</option>
                <option value="Resto">Gudang Resto</option>
                <option value="Tambang">Gudang Site Tambang</option>
                <option value="Hotel">Gudang Hotel</option>
                <option value="Retail">Gudang Retail</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Kode Item</th>
                  <th className="py-3 px-4">Nama Barang</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Lokasi Gudang</th>
                  <th className="py-3 px-4">HPP Method</th>
                  <th className="py-3 px-4 text-center">Stok Saat Ini</th>
                  <th className="py-3 px-4 text-center">Min. Level</th>
                  <th className="py-3 px-4 text-right">Harga Satuan</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{item.code}</td>
                    <td className="py-3 px-4 font-semibold">{item.name}</td>
                    <td className="py-3 px-4 text-slate-500">{item.category}</td>
                    <td className="py-3 px-4">{item.warehouse}</td>
                    <td className="py-3 px-4 font-mono text-[11px]">{item.valuationMethod}</td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900 dark:text-white">
                      {item.stockQty} <span className="text-[10px] text-slate-400 font-normal">{item.uom}</span>
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-500">{item.minStockLevel} {item.uom}</td>
                    <td className="py-3 px-4 text-right font-semibold">Rp {item.costPerUnit.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 text-center">
                      {item.isAlert ? (
                        <StatusBadge type="ALERT" label="RE-ORDER NOW" />
                      ) : (
                        <StatusBadge type="ACTIVE" label="AMAN" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
