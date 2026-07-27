'use client';

import React, { useState } from 'react';
import { MapPin, QrCode, ShieldCheck, Save, Plus, Navigation, RefreshCw, Layers } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { logAuditEvent } from '@/lib/audit/audit-logger';

interface BranchGeofenceConfig {
  id: string;
  branchName: string;
  kioskId: string;
  latitude: number;
  longitude: number;
  allowedRadiusMeter: number;
  qrRotationSeconds: number;
  faceMatchMinScorePct: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export const GeofenceQrSettingsTab = () => {
  const [configs, setConfigs] = useState<BranchGeofenceConfig[]>([
    {
      id: 'cfg-01',
      branchName: 'Jakarta HQ Main Office',
      kioskId: 'KIOSK-HO-01',
      latitude: -6.2088,
      longitude: 106.8456,
      allowedRadiusMeter: 5.0,
      qrRotationSeconds: 15,
      faceMatchMinScorePct: 85,
      status: 'ACTIVE'
    },
    {
      id: 'cfg-02',
      branchName: 'Samarinda Gold Mine Site',
      kioskId: 'KIOSK-SITE-SAMARINDA',
      latitude: -0.5021,
      longitude: 117.1536,
      allowedRadiusMeter: 10.0,
      qrRotationSeconds: 15,
      faceMatchMinScorePct: 85,
      status: 'ACTIVE'
    },
    {
      id: 'cfg-03',
      branchName: 'Resort Hotel Bali Branch',
      kioskId: 'KIOSK-HOTEL-BALI',
      latitude: -8.7984,
      longitude: 115.2281,
      allowedRadiusMeter: 5.0,
      qrRotationSeconds: 15,
      faceMatchMinScorePct: 85,
      status: 'ACTIVE'
    }
  ]);

  const [globalTrackingConfig, setGlobalTrackingConfig] = useState({
    trackingPingIntervalSec: 10,
    wakeLockEnabled: true,
    salesTrackingEnabled: true,
    driverTrackingEnabled: true
  });

  const [editingConfig, setEditingConfig] = useState<BranchGeofenceConfig>({
    id: `cfg-${Date.now()}`,
    branchName: 'Resto & Bakery Kitchen Surabaya',
    kioskId: 'KIOSK-RESTO-SBY',
    latitude: -7.2575,
    longitude: 112.7521,
    allowedRadiusMeter: 5.0,
    qrRotationSeconds: 15,
    faceMatchMinScorePct: 85,
    status: 'ACTIVE'
  });

  const [showModal, setShowModal] = useState(false);

  const handleSaveGlobal = (e: React.FormEvent) => {
    e.preventDefault();
    logAuditEvent({
      userName: 'Super Admin',
      userRole: 'HOLDING_EXECUTIVE',
      actionType: 'EDIT',
      targetEntity: 'GEOFENCE_GLOBAL_PARAMS',
      details: `Mengubah Konfigurasi Tracking GPS: Interval ${globalTrackingConfig.trackingPingIntervalSec}s, WakeLock: ${globalTrackingConfig.wakeLockEnabled}`
    });
    alert('Konfigurasi Parameter Master Geofencing & Dynamic QR Berhasil Disimpan!');
  };

  const handleSaveBranch = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigs([editingConfig, ...configs]);
    logAuditEvent({
      userName: 'Super Admin',
      userRole: 'HOLDING_EXECUTIVE',
      actionType: 'CREATE',
      targetEntity: `KIOSK_${editingConfig.kioskId}`,
      details: `Menambah Parameter Geofence Site: ${editingConfig.branchName} (${editingConfig.allowedRadiusMeter}m, ${editingConfig.qrRotationSeconds}s QR)`
    });
    setShowModal(false);
    alert(`Parameter Geofencing [${editingConfig.branchName}] Berhasil Disimpan!`);
  };

  const columns: ColumnDef<BranchGeofenceConfig>[] = [
    { key: 'branchName', header: 'Nama Cabang / Site Office', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.branchName },
    { key: 'kioskId', header: 'ID Tablet Kiosk', className: 'font-mono text-sky-600 font-bold', render: (i) => i.kioskId },
    { key: 'latitude', header: 'Koordinat GPS Lat/Lng', className: 'font-mono text-slate-500', render: (i) => `${i.latitude}, ${i.longitude}` },
    { key: 'allowedRadiusMeter', header: 'Batas Geofence', align: 'center', className: 'font-mono font-bold text-emerald-600', render: (i) => `≤ ${i.allowedRadiusMeter} Meter` },
    { key: 'qrRotationSeconds', header: 'Rotasi QR Code', align: 'center', className: 'font-mono font-bold text-amber-600', render: (i) => `${i.qrRotationSeconds} Detik` },
    { key: 'faceMatchMinScorePct', header: 'Pass Face Score', align: 'center', className: 'font-mono font-bold text-indigo-600', render: (i) => `≥ ${i.faceMatchMinScorePct}%` },
    {
      key: 'status',
      header: 'Status Kiosk',
      align: 'center',
      render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded-full">ACTIVE</span>
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Top Configuration Card */}
      <form onSubmit={handleSaveGlobal} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Pengaturan Global Geofencing, Dynamic QR 15s & GPS Tracking</h3>
              <p className="text-[11px] text-slate-400">Konfigurasi Master Admin Terpusat Seluruh Tenant & Cabang</p>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Parameter Global</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Default Radius Geofence (Meter):</label>
            <input
              type="number"
              step="0.1"
              value={5.0}
              readOnly
              className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-mono font-bold text-emerald-600"
            />
            <span className="text-[10px] text-slate-400 block">Strict Toleransi Absensi (&le; 5.0m)</span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Rotasi Dynamic QR (Detik):</label>
            <input
              type="number"
              value={15}
              readOnly
              className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-mono font-bold text-amber-600"
            />
            <span className="text-[10px] text-slate-400 block">TOTP Refresh Window (15 Detik)</span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Interval GPS Ping (Detik):</label>
            <input
              type="number"
              value={globalTrackingConfig.trackingPingIntervalSec}
              onChange={(e) => setGlobalTrackingConfig({ ...globalTrackingConfig, trackingPingIntervalSec: Number(e.target.value) })}
              className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-mono font-bold text-sky-600"
            />
            <span className="text-[10px] text-slate-400 block">Frekuensi Kirim Koordinat Browser</span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Pass Score Face Biometrics:</label>
            <input
              type="number"
              value={85}
              readOnly
              className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl font-mono font-bold text-indigo-600"
            />
            <span className="text-[10px] text-slate-400 block">Ambang Match Confidence (&ge; 85%)</span>
          </div>
        </div>
      </form>

      {/* Branch Geofencing Master Table */}
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Master Koordinat Geofence & Kiosk per Cabang</h3>
            <p className="text-[11px] text-slate-400">Daftar Titik Koordinat GPS Valid Kiosk Tablet HRD Seluruh Site</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Lokasi Kiosk Site</span>
          </button>
        </div>

        <DataTable headerTitle="Master Data Koordinat Geofencing Cabang" columns={columns} data={configs} keyExtractor={(i) => i.id} />
      </div>

      {/* Modal Add Branch Config */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <form onSubmit={handleSaveBranch} className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-500" />
                <span>Tambah Lokasi Geofence Kiosk Baru</span>
              </h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-rose-500">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Cabang / Unit Usaha:</label>
                <input
                  type="text"
                  value={editingConfig.branchName}
                  onChange={(e) => setEditingConfig({ ...editingConfig, branchName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">ID Kiosk Tablet:</label>
                  <input
                    type="text"
                    value={editingConfig.kioskId}
                    onChange={(e) => setEditingConfig({ ...editingConfig, kioskId: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Radius Geofence (Meter):</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingConfig.allowedRadiusMeter}
                    onChange={(e) => setEditingConfig({ ...editingConfig, allowedRadiusMeter: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Latitude GPS:</label>
                  <input
                    type="number"
                    step="any"
                    value={editingConfig.latitude}
                    onChange={(e) => setEditingConfig({ ...editingConfig, latitude: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Longitude GPS:</label>
                  <input
                    type="number"
                    step="any"
                    value={editingConfig.longitude}
                    onChange={(e) => setEditingConfig({ ...editingConfig, longitude: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs"
              >
                Batal
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-500 shadow-md">
                Simpan Kiosk Site
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
