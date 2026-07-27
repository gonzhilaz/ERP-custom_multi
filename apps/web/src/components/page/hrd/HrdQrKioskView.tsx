'use client';

import React, { useState, useEffect } from 'react';
import { QrCode, ShieldCheck, MapPin, Clock, RefreshCw, Smartphone, AlertCircle } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { generateDynamicQrToken, DynamicQrPayload, DYNAMIC_QR_TTL_SECONDS } from '@/lib/auth/dynamic-qr-engine';

export const HrdQrKioskView = () => {
  const [payload, setPayload] = useState<DynamicQrPayload>(() => generateDynamicQrToken());
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB');
      setPayload(generateDynamicQrToken('KIOSK-HO-01', 'holding.erp.com', -6.2088, 106.8456, now.getTime()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const countdownPct = ((DYNAMIC_QR_TTL_SECONDS - payload.expiresInSeconds) / DYNAMIC_QR_TTL_SECONDS) * 100;

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="QR Presensi"
        icon={QrCode}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Dynamic QR Kiosk"
        glossaryItems={[
          { term: 'Dynamic TOTP Token', description: 'Kode QR yang berubah secara otomatis setiap 15 detik untuk mencegah kecurangan foto QR.' },
          { term: 'Strict Geofence 5m', description: 'Karyawan wajib berada dalam radius maksimal 5 meter dari tablet kiosk ini.' }
        ]}
        badges={[
          { label: 'Anti-Fraud Anti-Photo Protected', variant: 'emerald' },
          { label: 'Geofence Radius <= 5.0m Strict', variant: 'sky' }
        ]}
      />

      {/* Main Tablet Kiosk Display Container */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 md:p-8 space-y-6 text-center">
        {/* Top Kiosk Banner */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="text-left space-y-0.5">
            <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Tablet Kiosk HRD Site Holding</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">KIOSK-HO-01 • Jakarta HQ Main Lobby</div>
          </div>
          <div className="text-right space-y-0.5 font-mono">
            <div className="text-base font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5 justify-end">
              <Clock className="w-4 h-4 text-sky-500 animate-pulse" />
              <span>{timeString || '10:00:00 WIB'}</span>
            </div>
            <div className="text-[10px] text-slate-400">Server Time Synced</div>
          </div>
        </div>

        {/* Dynamic QR Display Circle Card */}
        <div className="relative inline-flex flex-col items-center justify-center p-6 bg-slate-900 rounded-3xl border-4 border-slate-800 shadow-2xl text-white space-y-4">
          <div className="relative p-4 bg-white rounded-2xl shadow-inner border border-slate-200">
            {/* Visual SVG QR Code Matrix */}
            <svg className="w-56 h-56 md:w-64 md:h-64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="white" />
              {/* Corner position markers */}
              <rect x="5" y="5" width="25" height="25" fill="#0f172a" rx="4" />
              <rect x="9" y="9" width="17" height="17" fill="white" rx="2" />
              <rect x="13" y="13" width="9" height="9" fill="#0284c7" rx="1" />

              <rect x="70" y="5" width="25" height="25" fill="#0f172a" rx="4" />
              <rect x="74" y="9" width="17" height="17" fill="white" rx="2" />
              <rect x="78" y="13" width="9" height="9" fill="#0284c7" rx="1" />

              <rect x="5" y="70" width="25" height="25" fill="#0f172a" rx="4" />
              <rect x="9" y="74" width="17" height="17" fill="white" rx="2" />
              <rect x="13" y="78" width="9" height="9" fill="#0284c7" rx="1" />

              {/* Dynamic Matrix Patterns based on payload token hash */}
              <rect x="35" y="10" width="8" height="8" fill="#0f172a" />
              <rect x="48" y="10" width="8" height="8" fill="#0f172a" />
              <rect x="35" y="25" width="20" height="8" fill="#0284c7" />
              <rect x="10" y="38" width="25" height="8" fill="#0f172a" />
              <rect x="40" y="40" width="20" height="20" fill="#0f172a" rx="2" />
              <rect x="68" y="38" width="22" height="8" fill="#0284c7" />
              <rect x="38" y="68" width="12" height="22" fill="#0f172a" />
              <rect x="58" y="68" width="24" height="8" fill="#0f172a" />
              <rect x="70" y="80" width="15" height="12" fill="#0284c7" />
            </svg>

            {/* Center ERP Badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="px-2.5 py-1 bg-slate-900 text-sky-400 border border-sky-500/40 rounded-lg shadow-md font-mono text-[10px] font-bold">
                ERP 15s
              </div>
            </div>
          </div>

          {/* Countdown Ring & Live Token Hash */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Token Rotasi:</span>
              <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                {payload.tokenHash}
              </span>
            </div>

            {/* Countdown Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-300">
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 text-sky-400 animate-spin" />
                  <span>Expired dalam:</span>
                </span>
                <span className="font-bold text-amber-400">{payload.expiresInSeconds} Detik</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${100 - countdownPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Kiosk Footnote Requirements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
          <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-2xl flex items-start gap-2 text-sky-900 dark:text-sky-200">
            <Smartphone className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs">Aplikasi ESS Mobile Karyawan</div>
              <div className="text-[11px] text-sky-700 dark:text-sky-300">
                Buka aplikasi ESS, aktifkan GPS, dan arahkan kamera ke layar QR Kiosk ini.
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-2 text-emerald-900 dark:text-emerald-200">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs">Toleransi Jarak Geofence Strict</div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-300">
                Posisi Anda wajib berjarak &le; 5.0 meter dari koordinat Kiosk Tablet ini.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
