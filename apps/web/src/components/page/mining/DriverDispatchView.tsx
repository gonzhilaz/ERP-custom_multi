'use client';

import React, { useState } from 'react';
import { UserCheck, DollarSign, AlertTriangle, PhoneCall, MapPin, Truck, Plus, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface DriverDispatchRecord {
  id: string;
  dispatchNo: string;
  driverName: string;
  driverId: string;
  vehicleCode: string;
  originLocation: string;
  destinationLocation: string;
  tripAdvancePerDiem: number; // Uang Jalan
  completedTripsCount: number;
  totalTonnageCargo: number;
  status: 'ASSIGNED' | 'EN_ROUTE' | 'TROUBLE_ROADSIDE' | 'COMPLETED';
  troubleReport?: string;
  troubleGpsLocation?: string;
}

export const DriverDispatchView = () => {
  const [dispatches, setDispatches] = useState<DriverDispatchRecord[]>([
    {
      id: 'dsp-01',
      dispatchNo: 'DSP/2026/07/0088',
      driverName: 'Eko Prasetyo',
      driverId: 'DRV-004',
      vehicleCode: 'FLT-CAT777-04',
      originLocation: 'Pit-A Mining Site Samarinda',
      destinationLocation: 'Stockpile Crusher KM 14',
      tripAdvancePerDiem: 350000,
      completedTripsCount: 14,
      totalTonnageCargo: 700,
      status: 'EN_ROUTE'
    },
    {
      id: 'dsp-02',
      dispatchNo: 'DSP/2026/07/0091',
      driverName: 'Budi Santoso',
      driverId: 'DRV-018',
      vehicleCode: 'FLT-VAN-002',
      originLocation: 'Jakarta Bakery Kitchen',
      destinationLocation: 'Kawasan Industri Cikarang (Site Event)',
      tripAdvancePerDiem: 250000,
      completedTripsCount: 2,
      totalTonnageCargo: 1.5,
      status: 'TROUBLE_ROADSIDE',
      troubleReport: 'Ban Belakang Kiri Pecah di Tol Cikampek KM 31. Butuh Bantuan Mobil Derek / Ban Cadangan.',
      troubleGpsLocation: 'Lat: -6.321, Lng: 107.124 (Tol Cikampek KM 31)'
    }
  ]);

  const [showSosModal, setShowSosModal] = useState(false);
  const [sosForm, setSosForm] = useState({
    driverName: 'Budi Santoso (DRV-018)',
    vehicleCode: 'FLT-VAN-002',
    issueType: 'BAN_PECAH_OVERHEAT',
    description: 'Ban belakang pecah di Tol Cikampek KM 31, butuh bantuan ban serep & derek.',
    gpsLocation: '-6.3214, 107.1245 (Tol Cikampek KM 31)'
  });

  const handleSendEmergencySos = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`SINYAL EMERGENCY SOS TERKIRIM! Tim Mekanik Site & Supervisor telah menerima lokasi GPS [${sosForm.gpsLocation}].`);
    setShowSosModal(false);
  };

  const columns: ColumnDef<DriverDispatchRecord>[] = [
    { key: 'dispatchNo', header: 'No. Surug Tugas', className: 'font-mono font-bold text-sky-600', render: (i) => i.dispatchNo },
    { key: 'driverName', header: 'Nama Driver & Armada', render: (i) => <div><div className="font-bold text-slate-900 dark:text-white">{i.driverName}</div><div className="text-[10px] text-slate-400 font-mono">{i.vehicleCode}</div></div> },
    { key: 'originLocation', header: 'Rute Pengiriman', render: (i) => <div><div className="font-semibold text-slate-700 dark:text-slate-200">{i.originLocation}</div><div className="text-[10px] text-sky-600 font-mono">&rarr; {i.destinationLocation}</div></div> },
    { key: 'tripAdvancePerDiem', header: 'Uang Jalan (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (i) => `Rp ${i.tripAdvancePerDiem.toLocaleString('id-ID')}` },
    { key: 'completedTripsCount', header: 'Hasil Kerja (Ritase/Ton)', align: 'center', className: 'font-mono font-bold text-indigo-600', render: (i) => `${i.completedTripsCount} Rit (${i.totalTonnageCargo} Ton)` },
    {
      key: 'status',
      header: 'Status Penugasan',
      align: 'center',
      render: (i) => (
        <span
          className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded-full ${
            i.status === 'TROUBLE_ROADSIDE'
              ? 'bg-rose-500/10 text-rose-600 border border-rose-500/30 animate-pulse'
              : i.status === 'EN_ROUTE'
              ? 'bg-sky-500/10 text-sky-600 border border-sky-500/30'
              : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
          }`}
        >
          {i.status === 'TROUBLE_ROADSIDE' ? 'EMERGENCY TROUBLE' : i.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Operasional Driver & Dispatch"
        icon={UserCheck}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Disposisi Driver & Uang Jalan"
        glossaryItems={[
          { term: 'Uang Jalan Trip Advance', description: 'Dana kas tunai/transfer awal untuk tol, BBM, & uang saku driver.' },
          { term: 'Emergency SOS Trouble', description: 'Fitur sinyal darurat driver saat mengalami kendaraan mogok di jalan.' }
        ]}
        badges={[
          { label: 'Uang Jalan Instant Transfer', variant: 'emerald' },
          { label: 'GPS SOS Dispatch Active', variant: 'rose' }
        ]}
      />

      {/* Top Action Bar with Emergency SOS Trigger */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Daftar Penugasan Driver & Pencairan Uang Jalan</h2>
          <p className="text-[11px] text-slate-400">Kalkulasi Hasil Kerja Ritase & Komunikasi Darurat Driver</p>
        </div>

        <button
          onClick={() => setShowSosModal(true)}
          className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md animate-bounce"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Driver Emergency SOS Trouble</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Penugasan Driver" value={`${dispatches.length} Trip`} subtitle="Hari Ini" icon={Truck} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Total Uang Jalan" value="Rp 600.000" subtitle="Disbursed Trip Advance" icon={DollarSign} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="Hasil Kerja (Total Rit)" value="16 Rit" subtitle="Total Cargo 701.5 Ton" icon={UserCheck} iconBgColor="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50" />
        <KpiCard title="Laporan Trouble Jalan" value="1 Unit" subtitle="Tol Cikampek KM 31" icon={AlertTriangle} iconBgColor="bg-rose-50 text-rose-600 dark:bg-rose-950/50" />
      </div>

      <DataTable headerTitle="Tabel Penugasan Driver & Kalkulasi Uang Jalan" columns={columns} data={dispatches} keyExtractor={(i) => i.id} />

      {/* Emergency SOS Modal Form */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleSendEmergencySos} className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-rose-500/50 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-rose-100 dark:border-rose-900 pb-3">
              <h3 className="font-bold text-sm text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
                <span>Form Pelaporan Emergency SOS Trouble Driver di Jalan</span>
              </h3>
              <button type="button" onClick={() => setShowSosModal(false)} className="text-slate-400 hover:text-rose-500">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Driver & Armada:</label>
                <input type="text" value={sosForm.driverName} readOnly className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold" />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Rincian Kendala & Trouble Jalan:</label>
                <textarea
                  value={sosForm.description}
                  onChange={(e) => setSosForm({ ...sosForm, description: e.target.value })}
                  rows={3}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Lokasi GPS Mogok Real-Time:</label>
                <input type="text" value={sosForm.gpsLocation} readOnly className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-mono font-bold text-rose-600" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button type="button" onClick={() => setShowSosModal(false)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-xs">Batal</button>
              <button type="submit" className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs shadow-md flex items-center gap-1">
                <PhoneCall className="w-4 h-4" />
                <span>Kirim Sinyal SOS Darurat</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
