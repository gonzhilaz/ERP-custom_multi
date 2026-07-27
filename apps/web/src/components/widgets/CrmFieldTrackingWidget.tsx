'use client';

import React, { useState } from 'react';
import { Navigation, MapPin, Truck, Users, Battery, ShieldCheck, Activity, Eye, Search } from 'lucide-react';

interface FieldAgentLocation {
  id: string;
  name: string;
  role: 'SALES' | 'DRIVER';
  branch: string;
  currentLocation: string;
  lat: number;
  lng: number;
  speedKmH: number;
  batteryPct: number;
  lastUpdate: string;
  status: 'ACTIVE_MOVING' | 'CLIENT_MEETING' | 'IDLE';
}

export const CrmFieldTrackingWidget = () => {
  const [agents] = useState<FieldAgentLocation[]>([
    {
      id: 'agt-01',
      name: 'Budi Santoso',
      role: 'SALES',
      branch: 'Jakarta HQ',
      currentLocation: 'Kawasan Industri Pulogadung Blok C',
      lat: -6.189,
      lng: 106.912,
      speedKmH: 25,
      batteryPct: 88,
      lastUpdate: '10 Detik Lalu',
      status: 'CLIENT_MEETING'
    },
    {
      id: 'agt-02',
      name: 'Eko Prasetyo (Driver Fleet #04)',
      role: 'DRIVER',
      branch: 'Site Tambang Samarinda',
      currentLocation: 'Jalur Hauling KM 14 towards Stockpile',
      lat: -0.502,
      lng: 117.153,
      speedKmH: 42,
      batteryPct: 95,
      lastUpdate: '5 Detik Lalu',
      status: 'ACTIVE_MOVING'
    },
    {
      id: 'agt-03',
      name: 'Dewi Lestari',
      role: 'SALES',
      branch: 'Resort Hotel Bali',
      currentLocation: 'Nusa Dua Convention Center VIP Lounge',
      lat: -8.798,
      lng: 115.228,
      speedKmH: 0,
      batteryPct: 74,
      lastUpdate: '1 Menit Lalu',
      status: 'CLIENT_MEETING'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'ALL' | 'SALES' | 'DRIVER'>('ALL');

  const filteredAgents = agents.filter((a) => (activeTab === 'ALL' ? true : a.role === activeTab));

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl">
            <Navigation className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Peta Tracking GPS Real-Time Sales & Driver</h3>
            <p className="text-[11px] text-slate-400">Pemantauan Posisi Presisi Staf Lapangan & Ekspedisi</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(['ALL', 'SALES', 'DRIVER'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                activeTab === tab ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500'
              }`}
            >
              {tab === 'ALL' ? 'Semua Staf' : tab === 'SALES' ? 'Sales Marketing' : 'Driver Armada'}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Live GPS Map Viewport */}
      <div className="relative h-48 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
        {/* Map Grid Pattern background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 w-full flex items-center justify-between text-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-mono text-xs font-bold text-emerald-400">LIVE GPS FEED CONNECTED</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">Satellite Constellation: GPS + GLONASS (Accurate 1.2m)</div>
          </div>

          <div className="text-right font-mono text-[11px] text-sky-400">
            <div>Active Tracked: {filteredAgents.length} Units</div>
            <div className="text-slate-400">Update Interval: 5s</div>
          </div>
        </div>
      </div>

      {/* Agents Live Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filteredAgents.map((agt) => (
          <div key={agt.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                {agt.role === 'DRIVER' ? <Truck className="w-4 h-4 text-amber-500" /> : <Users className="w-4 h-4 text-sky-500" />}
                <span>{agt.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-sky-500/10 text-sky-600 border border-sky-500/30">
                {agt.role}
              </span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                <span className="truncate">{agt.currentLocation}</span>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                <span>Kecepatan: {agt.speedKmH} km/jam</span>
                <span className="flex items-center gap-1 text-emerald-600">
                  <Battery className="w-3 h-3" /> {agt.batteryPct}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
