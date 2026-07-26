'use client';

import React, { useState } from 'react';
import { DollarSign, Tag, Plus, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface RatePlanItem {
  id: string;
  code: string;
  name: string;
  category: 'BAR' | 'CORPORATE' | 'GOVERNMENT' | 'PROMOTIONAL';
  baseRatePerNight: number;
  breakfastIncluded: boolean;
  minNights: number;
  cancellationPolicy: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export const RatePlansManagementTab = () => {
  const [ratePlans] = useState<RatePlanItem[]>([
    { id: 'rate-01', code: 'RATE-BAR-01', name: 'Best Available Rate (BAR Standard)', category: 'BAR', baseRatePerNight: 850000, breakfastIncluded: true, minNights: 1, cancellationPolicy: 'Free Cancellation 24h Prior', status: 'ACTIVE' },
    { id: 'rate-02', code: 'RATE-CORP-30', name: 'Corporate Contract Rate (30% Discount)', category: 'CORPORATE', baseRatePerNight: 650000, breakfastIncluded: true, minNights: 1, cancellationPolicy: 'Corporate Direct Billing AR', status: 'ACTIVE' },
    { id: 'rate-03', code: 'RATE-GOVT-DIPA', name: 'Government Standard Rate (Tax Exempt)', category: 'GOVERNMENT', baseRatePerNight: 550000, breakfastIncluded: true, minNights: 2, cancellationPolicy: 'Official DIPA Travel Order', status: 'ACTIVE' },
    { id: 'rate-04', code: 'RATE-WKND-SUR', name: 'Weekend Peak Dynamic Surcharge', category: 'PROMOTIONAL', baseRatePerNight: 1050000, breakfastIncluded: true, minNights: 2, cancellationPolicy: 'Non-Refundable', status: 'ACTIVE' }
  ]);

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Rate Plans & Pricing Strategy</h2>
            <p className="text-[11px] text-slate-500">Tarif Kamar Best Available Rate (BAR), Kontrak Korporat, & Dynamic Pricing</p>
          </div>
        </div>

        <button className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Buat Skema Rate Plan Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ratePlans.map((r) => (
          <div key={r.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-emerald-500 transition-all">
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                {r.code}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {r.category}
              </span>
            </div>

            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{r.name}</h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
                <div className="text-[10px] text-slate-400 font-semibold">Tarif Dasar / Malam</div>
                <div className="font-mono font-bold text-emerald-600 text-sm mt-0.5">
                  Rp {r.baseRatePerNight.toLocaleString('id-ID')}
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
                <div className="text-[10px] text-slate-400 font-semibold">Fasilitas Sarapan</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{r.breakfastIncluded ? 'Free Breakfast 2 Pax' : 'Room Only'}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
              <span>Policy: {r.cancellationPolicy}</span>
              <span className="font-mono font-bold text-slate-600 dark:text-slate-300">Min {r.minNights} Malam</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
