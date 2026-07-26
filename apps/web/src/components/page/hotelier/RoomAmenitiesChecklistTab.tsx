'use client';

import React, { useState } from 'react';
import { PackageCheck, CheckCircle2, AlertTriangle, ShieldCheck, Plus, RefreshCw } from 'lucide-react';

interface AmenitiesChecklistItem {
  id: string;
  itemName: string;
  category: 'LINEN' | 'ELECTRONIC' | 'AMENITY' | 'HARDWARE';
  requiredQty: number;
  unitPriceIfLost: number;
}

interface RoomInspectionRecord {
  roomNo: string;
  roomType: string;
  housekeeperName: string;
  inspectionDate: string;
  status: 'PASSED_VACANT_CLEAN' | 'MISSING_DAMAGED_ITEMS';
  missingItems?: { itemName: string; missingQty: number; totalPenalty: number }[];
}

export const RoomAmenitiesChecklistTab = () => {
  const [masterAmenities] = useState<AmenitiesChecklistItem[]>([
    { id: 'am-01', itemName: 'Handuk Mandi (Bath Towel)', category: 'LINEN', requiredQty: 2, unitPriceIfLost: 150000 },
    { id: 'am-02', itemName: 'Handuk Tangan (Hand Towel)', category: 'LINEN', requiredQty: 2, unitPriceIfLost: 75000 },
    { id: 'am-03', itemName: 'Sandal Hotel (Slippers)', category: 'AMENITY', requiredQty: 2, unitPriceIfLost: 25000 },
    { id: 'am-04', itemName: 'Baju Handuk (Bathrobe)', category: 'LINEN', requiredQty: 2, unitPriceIfLost: 350000 },
    { id: 'am-05', itemName: 'Pengering Rambut (Hairdryer)', category: 'ELECTRONIC', requiredQty: 1, unitPriceIfLost: 450000 },
    { id: 'am-06', itemName: 'Pemanas Air (Electric Kettle)', category: 'ELECTRONIC', requiredQty: 1, unitPriceIfLost: 350000 },
    { id: 'am-07', itemName: 'Remote Smart TV & AC', category: 'ELECTRONIC', requiredQty: 2, unitPriceIfLost: 200000 },
    { id: 'am-08', itemName: 'Gantungan Baju (Hangers)', category: 'HARDWARE', requiredQty: 6, unitPriceIfLost: 15000 }
  ]);

  const [inspections] = useState<RoomInspectionRecord[]>([
    {
      roomNo: 'RM-101',
      roomType: 'Deluxe King Room',
      housekeeperName: 'Dewi Lestari',
      inspectionDate: '2026-07-26 11:15',
      status: 'PASSED_VACANT_CLEAN'
    },
    {
      roomNo: 'RM-201',
      roomType: 'Executive Suite',
      housekeeperName: 'Ahmad Subagyo',
      inspectionDate: '2026-07-26 10:30',
      status: 'MISSING_DAMAGED_ITEMS',
      missingItems: [
        { itemName: 'Handuk Mandi (Bath Towel)', missingQty: 1, totalPenalty: 150000 },
        { itemName: 'Remote Smart TV & AC', missingQty: 1, totalPenalty: 200000 }
      ]
    }
  ]);

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <PackageCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Checklist Linen & Amenities Kamar</h2>
            <p className="text-[11px] text-slate-500">Verifikasi Kelengkapan Handuk, Sprei, & Fasilitas sebelum Status Vacant Clean (VC)</p>
          </div>
        </div>

        <button onClick={() => alert('Mulai Checklist Kamar Baru')} className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Audit Kelengkapan Kamar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Master Amenities Requirements */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Master Standard Amenities per Kamar</span>
          </h3>

          <div className="space-y-2">
            {masterAmenities.map((am) => (
              <div key={am.id} className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-[11px]">{am.itemName}</div>
                  <div className="text-[9px] text-slate-400">Standar: {am.requiredQty} Pcs</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] text-rose-600 font-bold">Penalty Hilang:</div>
                  <div className="font-mono text-[10px] text-slate-600 dark:text-slate-300 font-bold">Rp {am.unitPriceIfLost.toLocaleString('id-ID')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inspection History */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <PackageCheck className="w-4 h-4 text-sky-500" />
            <span>Hasil Audit Kelengkapan Kamar Housekeeping</span>
          </h3>

          <div className="space-y-3">
            {inspections.map((insp, idx) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-mono font-bold text-sky-600 dark:text-sky-400 text-xs">{insp.roomNo} ({insp.roomType})</div>
                    <div className="text-[10px] text-slate-400">Auditor: {insp.housekeeperName} ({insp.inspectionDate})</div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                    insp.status === 'PASSED_VACANT_CLEAN' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                  }`}>
                    {insp.status === 'PASSED_VACANT_CLEAN' ? 'PASSED - VACANT CLEAN (VC)' : 'MISSING / DAMAGED ITEMS'}
                  </span>
                </div>

                {insp.missingItems && (
                  <div className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/40 space-y-1.5">
                    <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Rincian Barang Hilang / Rusak Charged to Guest Folio:</span>
                    </div>
                    {insp.missingItems.map((mi, i) => (
                      <div key={i} className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-700 dark:text-slate-300">{mi.missingQty}x {mi.itemName}</span>
                        <span className="font-bold text-rose-600">Rp {mi.totalPenalty.toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
