'use client';

import React from 'react';
import { Boxes, AlertTriangle, ArrowRight } from 'lucide-react';

export const StockAlertWidget = () => {
  const lowStockItems = [
    { code: 'SKU-FLR-01', name: 'Tepung Terigu Cakra Kembar', qty: 18, minQty: 50, uom: 'Karung' },
    { code: 'SKU-SGR-01', name: 'Gula Pasir Industri Gulaku', qty: 12, minQty: 40, uom: 'Kg' }
  ];

  return (
    <div className="p-4 bg-amber-500/5 dark:bg-amber-950/20 rounded-2xl border border-amber-500/30 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span className="font-bold text-amber-900 dark:text-amber-200">Alert Stok Kritis ({lowStockItems.length} SKU)</span>
        </div>
        <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">Reorder Needed</span>
      </div>

      <div className="space-y-1.5">
        {lowStockItems.map((item) => (
          <div key={item.code} className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-amber-500/20 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</div>
              <div className="text-[10px] text-slate-400 font-mono">{item.code}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-red-600 dark:text-red-400 font-mono">
                {item.qty} {item.uom}
              </div>
              <div className="text-[9px] text-slate-400">Min: {item.minQty}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
