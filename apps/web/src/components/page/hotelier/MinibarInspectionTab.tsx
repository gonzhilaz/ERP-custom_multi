'use client';

import React, { useState } from 'react';
import { Wine, Plus, CheckCircle2, ShoppingBag, Receipt, AlertCircle } from 'lucide-react';

interface MinibarItem {
  id: string;
  name: string;
  category: 'SNACK' | 'BEVERAGE' | 'ALCOHOL';
  price: number;
  stockInRoom: number;
}

interface MinibarAuditRecord {
  id: string;
  roomNo: string;
  guestName: string;
  consumedItems: { name: string; qty: number; price: number }[];
  totalCharge: number;
  status: 'PENDING_INSPECTION' | 'CHARGED_TO_FOLIO' | 'COMPLIMENTARY_FREE';
  inspectedBy: string;
  inspectedTime: string;
}

export const MinibarInspectionTab = () => {
  const [minibarCatalog] = useState<MinibarItem[]>([
    { id: 'mb-01', name: 'Pringles Potato Chips Original 42g', category: 'SNACK', price: 35000, stockInRoom: 2 },
    { id: 'mb-02', name: 'Coca Cola Can 330ml', category: 'BEVERAGE', price: 25000, stockInRoom: 2 },
    { id: 'mb-03', name: 'Heineken Premium Beer Can 330ml', category: 'ALCOHOL', price: 65000, stockInRoom: 2 },
    { id: 'mb-04', name: 'Silverqueen Chocolate Bar 58g', category: 'SNACK', price: 30000, stockInRoom: 2 },
    { id: 'mb-05', name: 'Equil Natural Sparkling Water 380ml', category: 'BEVERAGE', price: 45000, stockInRoom: 2 }
  ]);

  const [auditLogs, setAuditLogs] = useState<MinibarAuditRecord[]>([
    {
      id: 'mba-101',
      roomNo: 'RM-101',
      guestName: 'Mr. Johnathan Smith',
      consumedItems: [
        { name: 'Pringles Potato Chips Original 42g', qty: 1, price: 35000 },
        { name: 'Coca Cola Can 330ml', qty: 2, price: 25000 }
      ],
      totalCharge: 85000,
      status: 'CHARGED_TO_FOLIO',
      inspectedBy: 'Dewi Lestari (Housekeeping)',
      inspectedTime: '2026-07-26 10:45'
    },
    {
      id: 'mba-102',
      roomNo: 'RM-301',
      guestName: 'Ir. Hendra Wijaya',
      consumedItems: [
        { name: 'Equil Natural Sparkling Water 380ml', qty: 1, price: 45000 }
      ],
      totalCharge: 45000,
      status: 'PENDING_INSPECTION',
      inspectedBy: 'Ahmad Subagyo (Housekeeping)',
      inspectedTime: '2026-07-26 11:30'
    }
  ]);

  const handleChargeToFolio = (logId: string) => {
    setAuditLogs(
      auditLogs.map((l) => (l.id === logId ? { ...l, status: 'CHARGED_TO_FOLIO' } : l))
    );
    alert('Biaya konsumsi Minibar berhasil di-post langsung ke Guest Folio & Pengurangan Stok Gudang!');
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl">
            <Wine className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Minibar Inventory & Inspeksi Housekeeping</h2>
            <p className="text-[11px] text-slate-500">Audit Konsumsi Minibar Kamar & Auto-Post Extra Charge ke Guest Folio</p>
          </div>
        </div>

        <button onClick={() => alert('Input Hasil Check-Out Minibar Baru')} className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Input Inspeksi Minibar Kamar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Katalog Standar Minibar per Kamar */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <ShoppingBag className="w-4 h-4 text-rose-500" />
            <span>Katalog Standard Minibar Kamar</span>
          </h3>

          <div className="space-y-2">
            {minibarCatalog.map((item) => (
              <div key={item.id} className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-[11px]">{item.name}</div>
                  <div className="text-[9px] text-slate-400">Stock per kamar: {item.stockInRoom} Pcs</div>
                </div>
                <div className="font-mono font-bold text-rose-600 text-xs">
                  Rp {item.price.toLocaleString('id-ID')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Konsumsi Minibar */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Receipt className="w-4 h-4 text-sky-500" />
            <span>Log Inspeksi & Tagihan Minibar Terkini</span>
          </h3>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-mono font-bold text-sky-600 dark:text-sky-400 text-xs">{log.roomNo} - {log.guestName}</div>
                    <div className="text-[10px] text-slate-400">Inspeksi: {log.inspectedBy} ({log.inspectedTime})</div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                    log.status === 'CHARGED_TO_FOLIO' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                  }`}>
                    {log.status === 'CHARGED_TO_FOLIO' ? 'CHARGED TO FOLIO' : 'PENDING POSTING'}
                  </span>
                </div>

                <div className="space-y-1 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="text-[9px] font-bold text-slate-400 uppercase">Item Minibar Terkonsumsi:</div>
                  {log.consumedItems.map((ci, idx) => (
                    <div key={idx} className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-700 dark:text-slate-300">{ci.qty}x {ci.name}</span>
                      <span className="font-bold text-slate-900 dark:text-white">Rp {(ci.qty * ci.price).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                  <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-xs">
                    <span className="text-slate-900 dark:text-white">Total Charge Minibar:</span>
                    <span className="font-mono text-rose-600">Rp {log.totalCharge.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {log.status === 'PENDING_INSPECTION' && (
                  <button onClick={() => handleChargeToFolio(log.id)} className="w-full py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-all text-xs cursor-pointer flex items-center justify-center gap-1.5">
                    <Receipt className="w-3.5 h-3.5" />
                    <span>Post Charge ke Guest Folio ({log.roomNo})</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
