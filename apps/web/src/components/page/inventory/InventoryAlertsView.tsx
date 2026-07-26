'use client';

import React, { useState } from 'react';
import { AlertTriangle, ShoppingCart, HelpCircle, X } from 'lucide-react';
import { useInventory } from '@/hooks/inventory/useInventory';

export const InventoryAlertsView = () => {
  const { alertItems } = useInventory();
  const [showGlossary, setShowGlossary] = useState(false);

  const handleGeneratePR = () => {
    alert(`Auto-Generate Purchase Request (PR) berhasil dibuat untuk ${alertItems.length} item kritis! Diteruskan ke Vendor & Procurement.`);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Peringatan Stok</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-amber-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Peringatan Stok"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-amber-400">
                  <span>Glossary Peringatan Stok</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Re-Order Threshold</strong>: Deteksi otomatis persediaan barang di bawah stok minimum.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Auto-PR Trigger</strong>: Pembuatan otomatis draft Purchase Request untuk barang kritis.
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleGeneratePR}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Auto-Generate PR</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-amber-50/50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
          <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
            Kritis / Low Stock ({alertItems.length} SKU)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Kode Item</th>
                <th className="py-3.5 px-4">Nama Barang</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Lokasi Gudang</th>
                <th className="py-3.5 px-4 text-center">Stok Saat Ini</th>
                <th className="py-3.5 px-4 text-center">Batas Min. Stok</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {alertItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">{item.code}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{item.name}</td>
                  <td className="py-3.5 px-4 text-slate-500">{item.category}</td>
                  <td className="py-3.5 px-4 text-slate-500">{item.warehouse}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-red-600 dark:text-red-400 font-mono">
                    {item.stockQty} {item.uom}
                  </td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-500 font-mono">
                    {item.minStockLevel} {item.uom}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-1 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 rounded-full text-[10px] font-bold">
                      RE-ORDER NOW
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => alert(`Pengajuan Purchase Order (PO) untuk [${item.name}] telah dibuat!`)}
                      className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 rounded-lg text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      Buat PO Restock
                    </button>
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
