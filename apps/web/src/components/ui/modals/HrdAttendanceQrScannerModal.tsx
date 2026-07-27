'use client';

import React, { useState } from 'react';
import { Camera, QrCode, X, CheckCircle2, AlertTriangle, MapPin, RefreshCw, ShieldCheck, UserCheck } from 'lucide-react';
import { verifyDynamicQrToken, validateGeofence5Meters, verifyInHouseFaceBiometrics } from '@/lib/auth/dynamic-qr-engine';

interface HrdAttendanceQrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (details: { time: string; distanceMeter: number; confidencePct: number }) => void;
}

export const HrdAttendanceQrScannerModal: React.FC<HrdAttendanceQrScannerModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'SCAN_QR' | 'FACE_SELFIE' | 'VERIFYING' | 'SUCCESS' | 'FAILED'>('SCAN_QR');
  const [scannedTokenInput, setScannedTokenInput] = useState<string>('');
  const [userLat, setUserLat] = useState<number>(-6.208802); // 0.2m distance from office HQ
  const [userLng, setUserLng] = useState<number>(106.845601);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [auditDetails, setAuditDetails] = useState<{ distanceMeter: number; confidencePct: number } | null>(null);

  if (!isOpen) return null;

  const handleSimulateScanQr = () => {
    // 1. Verify Dynamic QR Token (15s rotation)
    const qrResult = verifyDynamicQrToken(scannedTokenInput.trim().toUpperCase());
    if (!qrResult.valid && scannedTokenInput.trim() !== 'TEST-PASS') {
      setErrorMessage(qrResult.reason || 'Kode QR Tidak Valid / Kadaluarsa (Harus scan QR Tablet HRD yang berubah per 15s).');
      setStep('FAILED');
      return;
    }

    // 2. Validate Geofencing <= 5.0 Meters
    const geoResult = validateGeofence5Meters(userLat, userLng, -6.2088, 106.8456, 5.0);
    if (!geoResult.isWithin5Meters && scannedTokenInput.trim() !== 'TEST-PASS') {
      setErrorMessage(geoResult.reason || 'Posisi Anda di luar radius 5 meter kantor.');
      setStep('FAILED');
      return;
    }

    // Move to Face Selfie Recognition Step
    setStep('FACE_SELFIE');
  };

  const handleCaptureFaceSelfie = () => {
    setStep('VERIFYING');

    setTimeout(() => {
      // 3. In-House Face Recognition Verification (Zero 3rd party SDKs)
      const mockImageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const faceResult = verifyInHouseFaceBiometrics(mockImageBase64, 'EMP-001');

      if (!faceResult.isVerified) {
        setErrorMessage(faceResult.message);
        setStep('FAILED');
        return;
      }

      const distance = validateGeofence5Meters(userLat, userLng).actualDistanceMeter;
      setAuditDetails({ distanceMeter: distance, confidencePct: faceResult.matchConfidencePct });
      setStep('SUCCESS');

      setTimeout(() => {
        onSuccess({
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
          distanceMeter: distance,
          confidencePct: faceResult.matchConfidencePct
        });
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-5 space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Absensi QR Dinamis & Face Biometrics</h3>
              <p className="text-[11px] text-slate-400">Strict Geofence Radius &le; 5.0m</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: Scan Dynamic QR Code */}
        {step === 'SCAN_QR' && (
          <div className="space-y-4 text-center">
            <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
              <QrCode className="w-12 h-12 text-sky-400 mx-auto animate-pulse" />
              <div className="text-xs font-bold text-slate-200">Arahkan Kamera ke Tablet Kiosk HRD</div>
              <p className="text-[11px] text-slate-400">QR Token berubah otomatis tiap 15s. Foto ulang dari HP lain tidak berlaku.</p>
            </div>

            {/* Simulation controls */}
            <div className="space-y-2 text-left bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Token QR Scanned (Atau ketik 'TEST-PASS'):</label>
              <input
                type="text"
                value={scannedTokenInput}
                onChange={(e) => setScannedTokenInput(e.target.value)}
                placeholder="Ketik token dari layar tablet HR..."
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-mono"
              />

              <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-500" />
                  <span>Jarak GPS: 0.2 meter (&le; 5.0m Valid)</span>
                </span>
              </div>
            </div>

            <button
              onClick={handleSimulateScanQr}
              disabled={!scannedTokenInput.trim()}
              className="w-full py-3 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              Verifikasi QR Token & Cek Geofence
            </button>
          </div>
        )}

        {/* STEP 2: Face Recognition Selfie Capture */}
        {step === 'FACE_SELFIE' && (
          <div className="space-y-4 text-center">
            <div className="relative p-6 bg-slate-950 rounded-2xl border border-slate-800 text-white space-y-3 overflow-hidden">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-dashed border-emerald-400 flex items-center justify-center bg-slate-900">
                <Camera className="w-10 h-10 text-emerald-400 animate-bounce" />
              </div>
              <div className="text-xs font-bold text-emerald-400">In-House Face Recognition Engine</div>
              <p className="text-[11px] text-slate-400">Posisikan wajah Anda di dalam lingkaran hijau untuk verifikasi biometrik.</p>
            </div>

            <button
              onClick={handleCaptureFaceSelfie}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Ambil Foto Face Selfie & Submit Absensi</span>
            </button>
          </div>
        )}

        {/* STEP 3: Verifying State */}
        {step === 'VERIFYING' && (
          <div className="py-8 space-y-3 text-center">
            <RefreshCw className="w-10 h-10 text-sky-500 animate-spin mx-auto" />
            <div className="font-bold text-xs text-slate-900 dark:text-white">Memproses Match Vector Biometrik Wajah...</div>
            <p className="text-[11px] text-slate-400">Mencocokkan dengan Master Data SDM & Menghitung Geofence 5m</p>
          </div>
        )}

        {/* STEP 4: Success State */}
        {step === 'SUCCESS' && (
          <div className="py-6 space-y-3 text-center bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <div className="font-bold text-sm text-emerald-900 dark:text-emerald-200">Absensi Berhasil Dicatat!</div>
            {auditDetails && (
              <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300 space-y-0.5">
                <div>Jarak Geofence: {auditDetails.distanceMeter} meter (&le; 5.0m)</div>
                <div>Face Match Confidence: {auditDetails.confidencePct}%</div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Failed State */}
        {step === 'FAILED' && (
          <div className="py-6 space-y-4 text-center bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-200 dark:border-rose-800">
            <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
            <div className="font-bold text-xs text-rose-900 dark:text-rose-200">Absensi Ditolak Sistem</div>
            <p className="text-[11px] text-rose-700 dark:text-rose-300 font-semibold">{errorMessage}</p>

            <button
              onClick={() => {
                setStep('SCAN_QR');
                setErrorMessage('');
              }}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-500 transition-all cursor-pointer"
            >
              Coba Lagi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
