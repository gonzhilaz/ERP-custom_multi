'use client';

import React, { useState } from 'react';
import { AlertTriangle, ShoppingCart, HelpCircle, X } from 'lucide-react';
import { useInventory } from '@/hooks/inventory/useInventory';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

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

      {/* Alerts Table */}
      <DataTable
        headerTitle={`Katalog Peringatan Restok Minimum (${alertItems.length})`}
        columns={[
          { key: 'code', header: 'Kode Barang', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (item) => item.code },
          { key: 'name', header: 'Nama Barang SKU', className: 'font-bold text-slate-900 dark:text-white', render: (item) => item.name },
          { key: 'category', header: 'Kategori', className: 'text-slate-500', render: (item) => item.category },
          { key: 'warehouse', header: 'Lokasi Gudang', className: 'text-slate-500', render: (item) => item.warehouse },
          { key: 'stockQty', header: 'Stok Sisa Saat Ini', align: 'center', className: 'font-bold text-red-600 dark:text-red-400 font-mono', render: (item) => `${item.stockQty} ${item.uom}` },
          { key: 'minStockLevel', header: 'Batas Stok Minimum', align: 'center', className: 'font-semibold text-slate-500 font-mono', render: (item) => `${item.minStockLevel} ${item.uom}` },
          {
            key: 'status',
            header: 'Status',
            align: 'center',
            render: () => (
              <span className="px-2 py-1 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 rounded-full text-[10px] font-bold">
                RE-ORDER NOW
              </span>
            )
          },
          {
            key: 'actions',
            header: 'Aksi Restock',
            align: 'center',
            sortable: false,
            render: (item) => (
              <button
                onClick={() => alert(`Pengajuan Purchase Order (PO) untuk [${item.name}] telah dibuat!`)}
                className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 rounded-lg text-[11px] font-semibold transition-all cursor-pointer"
              >
                Buat PO Restock
              </button>
            )
          }
        ]}
        data={alertItems}
        keyExtractor={(item) => item.id}
      />
    </div>
  );
};
