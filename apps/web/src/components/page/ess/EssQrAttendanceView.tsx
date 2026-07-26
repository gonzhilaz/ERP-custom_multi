'use client';

import React, { useState, useEffect } from 'react';
import { QrCode, MapPin, Camera, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Smartphone } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { SearchableSelect, SearchSelectOption } from '@/components/ui/dropdowns/SearchableSelect';

interface AttendanceQrRecord {
  id: string;
  timestamp: string;
  employeeId: string;
  employeeName: string;
  department: string;
  scanType: 'IN' | 'OUT';
  officeLocation: string;
  gpsCoordinates: string; // e.g. -6.2088, 106.8456
  geoFenceStatus: 'VALID_OFFICE_RADIUS' | 'OUT_OF_BOUNDS';
  faceMatchScore: string; // e.g. 99.8% Match
  deviceKioskId: string; // e.g. Android Tablet Kiosk #01 (Lobby HO)
}

export const EssQrAttendanceView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [qrToken, setQrToken] = useState('QR-DYN-889021');
  const [countdown, setCountdown] = useState(15);

  const [records, setRecords] = useState<AttendanceQrRecord[]>([
    { id: 'att-01', timestamp: '2026-07-25 07:54:12', employeeId: 'EMP-HO-004', employeeName: 'Irfan Aries Saputra', department: 'IT & System Division', scanType: 'IN', officeLocation: 'Head Office Jakarta (Gedung Perencana)', gpsCoordinates: '-6.2088, 106.8456', geoFenceStatus: 'VALID_OFFICE_RADIUS', faceMatchScore: '99.8% Match', deviceKioskId: 'Android Kiosk Tablet #01 (Main Lobby)' },
    { id: 'att-02', timestamp: '2026-07-25 07:58:45', employeeId: 'EMP-MNG-088', employeeName: 'Budi Santoso', department: 'Mining Operations Site 1', scanType: 'IN', officeLocation: 'Site Office Tambang Timika', gpsCoordinates: '-4.5412, 136.8871', geoFenceStatus: 'VALID_OFFICE_RADIUS', faceMatchScore: '99.5% Match', deviceKioskId: 'Android Kiosk Tablet #04 (Pit Stop Gate)' }
  ]);

  // Dynamic QR Auto-Refresh Timer (15 Seconds Security Cycle)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setQrToken(`QR-DYN-${Math.floor(100000 + Math.random() * 900000)}`);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate Skeleton Loader
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => {
      clearInterval(timer);
      clearTimeout(loadTimer);
    };
  }, []);

  const filterOptions: SearchSelectOption[] = [
    { id: 'ALL', label: 'Semua Tipe Presensi (In & Out)' },
    { id: 'IN', label: 'Absen Masuk (Check-In)' },
    { id: 'OUT', label: 'Absen Pulang (Check-Out)' }
  ];

  const filtered = records.filter((r) => {
    const matchesSearch =
      r.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.officeLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'ALL' || r.scanType === filterType;
    return matchesSearch && matchesFilter;
  });

  const columns: ColumnDef<AttendanceQrRecord>[] = [
    { key: 'timestamp', header: 'Waktu Presensi', className: 'font-mono text-slate-500', render: (i) => i.timestamp },
    { key: 'employeeName', header: 'Karyawan', render: (i) => <div><p className="font-bold text-slate-900 dark:text-white">{i.employeeName}</p><p className="font-mono text-[10px] text-sky-600">{i.employeeId} - {i.department}</p></div> },
    {
      key: 'scanType',
      header: 'Tipe',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${i.scanType === 'IN' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
          {i.scanType === 'IN' ? 'CHECK-IN' : 'CHECK-OUT'}
        </span>
      )
    },
    { key: 'officeLocation', header: 'Lokasi Kantor Geofence', render: (i) => <div><p className="font-bold text-slate-800 dark:text-slate-200">{i.officeLocation}</p><p className="font-mono text-[10px] text-slate-400">GPS: {i.gpsCoordinates}</p></div> },
    {
      key: 'geoFenceStatus',
      header: 'Radius Geotag (GPS)',
      align: 'center',
      render: (i) => (
        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded border border-emerald-500/20 flex items-center gap-1 mx-auto w-fit">
          <MapPin className="w-3 h-3" />
          <span>Valid Radius (&lt;50m)</span>
        </span>
      )
    },
    {
      key: 'faceMatchScore',
      header: 'Scan Wajah AI',
      align: 'center',
      render: (i) => (
        <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded flex items-center gap-1 mx-auto w-fit">
          <Camera className="w-3 h-3" />
          <span>{i.faceMatchScore}</span>
        </span>
      )
    },
    { key: 'deviceKioskId', header: 'Kiosk Android Tablet Device', className: 'font-mono text-slate-500 text-[10px]', render: (i) => i.deviceKioskId }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Dynamic QR & AI Face Geofence Attendance"
        icon={QrCode}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Dynamic QR Attendance"
        glossaryItems={[
          { term: 'Dynamic QR Security', description: 'Kode QR presensi berubah otomatis setiap 15 detik pada Tablet Android Kiosk untuk mencegah kecurangan foto/screenshot.' },
          { term: 'Geofence GPS Validation', description: 'Memastikan posisi fisik perangkat presensi berada tepat di radius koordinat lokasi kantor yang sah.' }
        ]}
        badges={[
          { label: 'Android Tablet Kiosk Active', variant: 'emerald' },
          { label: 'AI Face Biometric Active', variant: 'sky' }
        ]}
      />

      {/* Android Tablet Kiosk Preview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900 text-white rounded-3xl border border-slate-800 space-y-3 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="font-bold text-sky-400 flex items-center gap-1.5 text-xs">
              <Smartphone className="w-4 h-4" />
              <span>Android Kiosk Tablet #01</span>
            </span>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold rounded">ONLINE</span>
          </div>

          <div className="text-center py-2 space-y-2">
            <div className="inline-block p-4 bg-white rounded-2xl shadow-inner border-4 border-sky-500/30">
              <QrCode className="w-24 h-24 text-slate-900 mx-auto" />
            </div>
            <p className="font-mono text-xs font-bold text-sky-400">{qrToken}</p>
            <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin text-sky-400" />
              <span>Refresh otomatis dalam <strong>{countdown}s</strong></span>
            </p>
          </div>

          <div className="p-2.5 bg-slate-800/60 rounded-xl text-[10px] space-y-1 text-slate-300 border border-slate-700">
            <div className="flex justify-between">
              <span>Geofence Office GPS:</span>
              <span className="font-mono text-emerald-400 font-bold">-6.2088, 106.8456</span>
            </div>
            <div className="flex justify-between">
              <span>Biometric Face Scan:</span>
              <span className="font-mono text-sky-400 font-bold">READY (Camera ON)</span>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="md:col-span-2 p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Filter & Search Audit Log Presensi</h3>
            <p className="text-slate-400 text-[11px] mb-3">Filter presensi karyawan berbasis lokasi GPS geofence & verifikasi AI wajah</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-sky-600 dark:text-sky-400 mb-1">Pilih Tipe Scan Presensi:</label>
                <SearchableSelect
                  options={filterOptions}
                  value={filterType}
                  onChange={setFilterType}
                  placeholder="Filter Tipe Presensi..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Pencarian Universal</label>
                <UniversalSearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Cari nama karyawan, NIK, atau lokasi..."
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-sky-500/10 rounded-2xl flex items-center justify-between text-xs font-bold text-sky-700 dark:text-sky-300">
            <span>Total Log Presensi Terdaftar:</span>
            <span className="font-mono text-sm">{filtered.length} Transaksi</span>
          </div>
        </div>
      </div>

      {/* Skeleton Loader vs Data Table */}
      {isLoading ? (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4 animate-pulse"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-slate-100 dark:bg-slate-800/60 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      ) : (
        <DataTable
          headerTitle={`Register Audit Presensi Dynamic QR & Geofence GPS (${filtered.length})`}
          columns={columns}
          data={filtered}
          keyExtractor={(i) => i.id}
        />
      )}
    </div>
  );
};
