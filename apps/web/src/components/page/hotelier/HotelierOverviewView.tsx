'use client';

import React, { useState } from 'react';
import { BedDouble, TrendingUp, DollarSign, Sparkles, RefreshCw, AlertTriangle, Users, Wine, CalendarCheck, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const HotelierOverviewView = () => {
  const [isAuditing, setIsAuditing] = useState(false);

  const handleRunNightAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      alert('Proses Night Audit Hotel Selesai!\n\n- Daily Room Charge Posted to GL: Rp 45.200.000\n- Restaurant & Minibar Charge Settled: Rp 12.800.000\n- Tax & Service Charge (10%+10%) Posted: Rp 11.600.000\n- Status Room Grid Updated & Transaksi Folio Harian Ditutup Resmi.');
    }, 1200);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Module Header */}
      <ModuleHeader
        title="Pusat Analitik & Operasional Hotelier PMS"
        icon={BedDouble}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Metrics Hotelier PMS"
        glossaryItems={[
          { term: 'Occupancy Rate %', description: 'Persentase tingkat keterisian unit kamar terisi (OC/OD) vs total kapasitas kamar.' },
          { term: 'RevPAR', description: 'Revenue Per Available Room atau rata-rata pendapatan per unit kamar yang tersedia.' },
          { term: 'Night Audit Engine', description: 'Proses penutupan pembukuan harian hotel & auto-posting pendapatan ke General Ledger.' }
        ]}
        badges={[
          { label: 'Live Property Performance', variant: 'emerald' },
          { label: 'Traveloka & Booking.com API Active', variant: 'sky' }
        ]}
        actions={
          <button
            onClick={handleRunNightAudit}
            disabled={isAuditing}
            className="px-3.5 py-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Eksekusi Night Audit...' : 'Jalankan Night Audit Manual'}</span>
          </button>
        }
      />

      {/* Operational Warning Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-xs">Peringatan Operasional Housekeeping & VIP Check-in</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300">
              Terdapat 3 kamar Vacant Dirty (VD) membutuhkan sanitasi, dan 2 Tamu Platinum VIP dijadwalkan Check-in jam 14:00 WIB.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold shrink-0">
          <span className="px-2 py-1 bg-amber-500/20 rounded-lg">3 VD Rooms</span>
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-lg">2 VIP Arrivals</span>
        </div>
      </div>

      {/* Key Analytical Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <KpiCard
          title="Tingkat Keterisian (Occupancy)"
          value="85.4%"
          subtitle="42 dari 49 Unit Terisi"
          icon={BedDouble}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50"
        />
        <KpiCard
          title="Average Daily Rate (ADR)"
          value="Rp 1.450.000"
          subtitle="Rata-rata Tarif Kamar"
          icon={DollarSign}
          iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50"
        />
        <KpiCard
          title="RevPAR (Rev Per Room)"
          value="Rp 1.238.300"
          subtitle="Revenue Per Available Unit"
          icon={TrendingUp}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50"
        />
        <KpiCard
          title="Omset Bulan Ini"
          value="Rp 890.500.000"
          subtitle="+14% vs Bulan Lalu"
          icon={Sparkles}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50"
        />
      </div>

      {/* Analytical Charts & Visual Progress Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Room Status Matrix Breakdown */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-sky-500" />
              <span>Matriks Distribusi Status Kamar</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Total: 49 Unit</span>
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-emerald-600 font-bold">Occupied Clean (OC) & Vacant Clean (VC)</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">42 Unit (85.7%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85.7%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-amber-600 font-bold">Vacant Dirty (VD) Pembersihan</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">4 Unit (8.1%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '8.1%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-rose-600 font-bold">Out of Order (OOO Maintenance)</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">3 Unit (6.2%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '6.2%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Distribution by Channel */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3.5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span>Sumber Kontribusi Pendapatan</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">Real-time OTA Sync</span>
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-sky-600 font-bold">Kanal OTA (Traveloka, Booking, Agoda)</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">Rp 410M (46.0%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: '46.0%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-purple-600 font-bold">Corporate B2B & Govt Contract</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">Rp 320M (35.9%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '35.9%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-emerald-600 font-bold">Direct Walk-In & Website Hotel</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">Rp 160.5M (18.1%)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '18.1%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Operations Hub */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Akses Operasional Cepat</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <a href="/hotelier/reservations" className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700/60 rounded-xl flex items-center justify-between transition-colors">
              <span className="font-bold text-slate-800 dark:text-slate-200">Express Check-in & Checkout</span>
              <ArrowUpRight className="w-4 h-4 text-sky-500" />
            </a>
            <a href="/hotelier/housekeeping" className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700/60 rounded-xl flex items-center justify-between transition-colors">
              <span className="font-bold text-slate-800 dark:text-slate-200">Housekeeping & Minibar Inspection</span>
              <ArrowUpRight className="w-4 h-4 text-amber-500" />
            </a>
            <a href="/hotelier/mice" className="p-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-slate-700/60 rounded-xl flex items-center justify-between transition-colors">
              <span className="font-bold text-slate-800 dark:text-slate-200">Banquet & MICE Event Sheet (BEO)</span>
              <ArrowUpRight className="w-4 h-4 text-purple-500" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

