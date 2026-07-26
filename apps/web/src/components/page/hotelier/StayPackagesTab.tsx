'use client';

import React, { useState } from 'react';
import { Gift, Plus, CheckCircle2, Utensils, Sparkles, Car, Coffee, DollarSign } from 'lucide-react';

interface StayPackageItem {
  id: string;
  packageCode: string;
  packageName: string;
  totalPricePerNight: number;
  revenueSplit: {
    roomRevenue: number;
    fnbRevenue: number;
    spaRevenue: number;
    transportRevenue: number;
  };
  inclusions: string[];
  status: 'ACTIVE' | 'INACTIVE';
}

export const StayPackagesTab = () => {
  const [packages] = useState<StayPackageItem[]>([
    {
      id: 'pkg-01',
      packageCode: 'PKG-HONEYMOON-VIP',
      packageName: 'Honeymoon Romantic Package',
      totalPricePerNight: 2500000,
      revenueSplit: {
        roomRevenue: 1600000,
        fnbRevenue: 300000,
        spaRevenue: 400000,
        transportRevenue: 200000
      },
      inclusions: [
        'Executive Suite Bed Decor & Rose Petals',
        'Romantic Candlelight Dinner 2 Pax (Resto)',
        'Couples Massage 60 Mins (Spa)',
        'Free Airport Pickup Shuttle (Luxury Van)'
      ],
      status: 'ACTIVE'
    },
    {
      id: 'pkg-02',
      packageCode: 'PKG-MEET-STAY-B2B',
      packageName: 'Corporate Executive Meeting & Stay',
      totalPricePerNight: 1850000,
      revenueSplit: {
        roomRevenue: 1200000,
        fnbRevenue: 450000,
        spaRevenue: 0,
        transportRevenue: 200000
      },
      inclusions: [
        'Deluxe Room Single Occupancy',
        'Full Board Meals (Breakfast, Lunch, Dinner)',
        'Meeting Room Access 4 Hours + Projector',
        'Free Shuttle to Industrial Area'
      ],
      status: 'ACTIVE'
    },
    {
      id: 'pkg-03',
      packageCode: 'PKG-FAMILY-WEEKEND',
      packageName: 'Weekend Family Fun Staycation',
      totalPricePerNight: 1950000,
      revenueSplit: {
        roomRevenue: 1400000,
        fnbRevenue: 350000,
        spaRevenue: 200000,
        transportRevenue: 0
      },
      inclusions: [
        'Grand Deluxe Twin Room',
        'Buffet Breakfast 4 Pax (2 Adult + 2 Kids)',
        'Complimentary Kids Spa & Pool Floats',
        'Free Minibar Snacks Allowance Rp 100.000'
      ],
      status: 'ACTIVE'
    }
  ]);

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Paket Menginap & Revenue Split Engine</h2>
            <p className="text-[11px] text-slate-500">Skema Bundling Kamar, F&B, Spa, Transport & Auto-Split COA Pendapatan</p>
          </div>
        </div>

        <button className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Buat Paket Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm hover:border-purple-500 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-purple-500/10 text-purple-600 border border-purple-500/20">
                  {pkg.packageCode}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                  Active Package
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{pkg.packageName}</h3>

              <div className="p-3 bg-purple-50/50 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900/40">
                <div className="text-[10px] text-purple-600 dark:text-purple-300 font-semibold">Harga Paket Net / Malam</div>
                <div className="font-mono font-extrabold text-purple-600 dark:text-purple-400 text-base mt-0.5">
                  Rp {pkg.totalPricePerNight.toLocaleString('id-ID')}
                </div>
              </div>

              {/* Automatic Revenue Split Breakdown */}
              <div className="space-y-1.5 text-[11px]">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Automatic Revenue Breakdown (COA Split)</div>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                  <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-400">Kamar:</span> <span className="font-bold text-sky-600">Rp {pkg.revenueSplit.roomRevenue.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-400">F&B:</span> <span className="font-bold text-amber-600">Rp {pkg.revenueSplit.fnbRevenue.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-400">Spa:</span> <span className="font-bold text-purple-600">Rp {pkg.revenueSplit.spaRevenue.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-slate-400">Shuttle:</span> <span className="font-bold text-emerald-600">Rp {pkg.revenueSplit.transportRevenue.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* Package Inclusions Checklist */}
              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-slate-400">Fasilitas Inklusi Paket</div>
                <ul className="space-y-1">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
