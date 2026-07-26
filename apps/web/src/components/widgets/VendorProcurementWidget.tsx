'use client';

import React from 'react';
import { Truck, ArrowUpRight, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const VendorProcurementWidget = () => {
  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Vendor & Procurement PO</h3>
            <p className="text-[10px] text-slate-400">Pembelian & AP Aging Supplier</p>
          </div>
        </div>
        <Link
          href="/vendor"
          className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-colors"
          title="Buka Vendor Suite"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-2 border border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>PO Menunggu Delivery (3 PO)</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            In Transit
          </span>
        </div>
        <div className="text-[11px] text-slate-500 font-semibold line-clamp-1">
          PT Bogasari Flour Mills • 50 Karang Terigu Cakra
        </div>
      </div>

      <div className="flex justify-between items-center pt-1 text-[11px]">
        <span className="text-slate-500">Total Utang AP Aging &lt; 30 Hari:</span>
        <span className="font-mono font-bold text-slate-900 dark:text-white">Rp 210.000.000</span>
      </div>
    </div>
  );
};
