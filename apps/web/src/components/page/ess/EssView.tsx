'use client';

import React, { useState } from 'react';
import { UserCheck, Camera, MapPin, ShieldCheck, CheckCircle2, HelpCircle, X, Calendar as CalendarIcon, Clock, Printer, AlertTriangle, FileText, Download } from 'lucide-react';
import { useEss } from '@/hooks/ess/useEss';
import { MOCK_DETAILED_CALENDAR_ATTENDANCES, DetailedCalendarAttendance } from '@/lib/mock/ess-schedule';

export const EssView = () => {
  const {
    attendances,
    loading,
    isFaceScanning,
    lastScanResult,
    simulateFaceRecognitionClockIn
  } = useEss();

  const [showGlossary, setShowGlossary] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState<string>('2026-07-24');
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showMissedAttendanceModal, setShowMissedAttendanceModal] = useState(false);

  // PDF Export Filter State
  const [pdfFilter, setPdfFilter] = useState({
    timePeriod: 'MONTHLY' as 'YEARLY' | 'MONTHLY' | 'DAILY',
    year: '2026',
    month: 'Juli',
    userScope: 'MYSELF' as 'MYSELF' | 'ROLE' | 'DEPARTMENT' | 'TENANT',
    department: 'Semua Departemen / Divisi'
  });

  // Missed Attendance Correction Form State
  const [correctionForm, setCorrectionForm] = useState({
    date: '2026-07-22',
    missedType: 'CLOCK_IN',
    reason: 'Lupa scan selfie presensi saat pemadaman listrik site',
    attachmentFile: 'Surat_Keterangan_Atasan.pdf'
  });

  const selectedAttendanceDetail: DetailedCalendarAttendance = MOCK_DETAILED_CALENDAR_ATTENDANCES[selectedDateKey] || {
    date: selectedDateKey,
    dayNumber: parseInt(selectedDateKey.split('-')[2]),
    clockIn: '08:00:00',
    clockOut: '17:00:00',
    breakStart: '12:00:00',
    breakEnd: '13:00:00',
    shiftAssigned: 'OFFICE-01 Regular (08:00 - 17:00)',
    status: 'PRESENT',
    gpsLocation: 'HQ Nusantara Group (-6.208, 106.845)',
    faceMatchScore: 98.5
  };

  const daysInJuly = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const dateKey = `2026-07-${day < 10 ? '0' + day : day}`;
    const record = MOCK_DETAILED_CALENDAR_ATTENDANCES[dateKey];
    return { day, dateKey, record };
  });

  const handleCorrectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Pengajuan Koreksi Presensi Backdate (${correctionForm.date}) Berhasil Dikirim ke HRD!`);
    setShowMissedAttendanceModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-sky-500" />
            <span>Presensi & Kalender Riwayat</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Presensi & Kalender"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Presensi & Cetak PDF</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Cetak PDF Presensi Multi-Level</strong>: Cetak PDF per-tahun, per-bulan, per-hari, per-divisi, atau seluruh user tenant.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Koreksi Lupa Absen / Backdate</strong>: Karyawan dapat mengajukan laporan lupa absen backdate untuk diapprove oleh HRD.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMissedAttendanceModal(true)}
            className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Lupa Absen / Koreksi HRD</span>
          </button>

          <button
            onClick={() => setShowPdfModal(true)}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak PDF Presensi</span>
          </button>
        </div>
      </div>

      {/* Clock-In Widget */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AI Face & GPS Radius Validated</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Presensi Masuk (Clock-In) Hari Ini</h3>
          {lastScanResult && (
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 text-xs rounded-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{lastScanResult}</span>
            </div>
          )}
        </div>

        <button
          onClick={simulateFaceRecognitionClockIn}
          disabled={isFaceScanning}
          className={`px-5 py-3 rounded-2xl text-xs font-bold text-white shadow-lg transition-all flex items-center gap-3 shrink-0 cursor-pointer ${
            isFaceScanning
              ? 'bg-amber-500 animate-pulse'
              : 'bg-sky-600 hover:bg-sky-500 shadow-sky-600/30'
          }`}
        >
          <Camera className="w-5 h-5" />
          <span>{isFaceScanning ? 'Scanning Face...' : 'Ambil Selfie & Presensi'}</span>
        </button>
      </div>

      {/* Kalender Riwayat Presensi Interaktif */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calendar Grid Box */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-sky-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">Kalender Riwayat Presensi (Juli 2026)</span>
            </div>
            <span className="text-[11px] text-sky-600 font-semibold">Klik tanggal untuk rincian jam</span>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
              <div key={d} className="font-bold text-slate-400 py-1 text-[11px] uppercase">
                {d}
              </div>
            ))}

            {daysInJuly.map(({ day, dateKey, record }) => {
              const isSelected = selectedDateKey === dateKey;
              const hasRecord = !!record;

              return (
                <button
                  key={dateKey}
                  onClick={() => setSelectedDateKey(dateKey)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-sky-500 ring-2 ring-sky-500/30 bg-sky-50 dark:bg-sky-950/80 font-bold'
                      : hasRecord
                      ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-slate-800/60 hover:bg-emerald-100/50'
                      : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className={`text-xs ${isSelected ? 'text-sky-600 font-bold' : 'text-slate-800 dark:text-slate-200'}`}>
                    {day}
                  </span>
                  {hasRecord && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" title={record.status} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Attendance Detail Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-500" />
                <span>Detail Presensi Tanggal</span>
              </span>
              <span className="text-xs font-mono font-bold text-sky-600">{selectedDateKey}</span>
            </div>

            <div className="p-3 bg-sky-50/50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs border border-sky-100 dark:border-sky-900/40">
              <span className="text-slate-400 text-[10px]">Jadwal Shift Ditugaskan:</span>
              <div className="font-bold text-slate-900 dark:text-white">{selectedAttendanceDetail.shiftAssigned}</div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Jam Masuk (Clock-In):</span>
                <span className="font-mono font-bold text-emerald-600 text-sm">{selectedAttendanceDetail.clockIn || '-'}</span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Jam Istirahat (Break):</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300 text-xs">
                  {selectedAttendanceDetail.breakStart} - {selectedAttendanceDetail.breakEnd}
                </span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Jam Keluar (Clock-Out):</span>
                <span className="font-mono font-bold text-sky-600 text-sm">{selectedAttendanceDetail.clockOut || '-'}</span>
              </div>

              {selectedAttendanceDetail.missedCorrectionReason && (
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-[11px] space-y-0.5 border border-amber-200 dark:border-amber-900/40">
                  <span className="font-bold text-amber-700 dark:text-amber-300">Catatan Koreksi HRD:</span>
                  <div className="text-slate-600 dark:text-slate-300">{selectedAttendanceDetail.missedCorrectionReason}</div>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl text-center text-xs font-bold text-emerald-800 dark:text-emerald-200">
            STATUS: {selectedAttendanceDetail.status}
          </div>
        </div>
      </div>

      {/* Modal Cetak PDF Presensi Multi-Filter */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Printer className="w-4 h-4 text-sky-500" />
                <span>Export & Cetak Laporan PDF Presensi</span>
              </h3>
              <button onClick={() => setShowPdfModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Filter Periode Waktu</label>
                  <select
                    value={pdfFilter.timePeriod}
                    onChange={(e) => setPdfFilter({ ...pdfFilter, timePeriod: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                  >
                    <option value="YEARLY">Per-Tahun (Yearly Log)</option>
                    <option value="MONTHLY">Per-Bulan (Monthly Log)</option>
                    <option value="DAILY">Per-Hari (Daily Harian)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Filter Scope Pengguna / HRD</label>
                  <select
                    value={pdfFilter.userScope}
                    onChange={(e) => setPdfFilter({ ...pdfFilter, userScope: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                  >
                    <option value="MYSELF">Karyawan Saya (Per-User)</option>
                    <option value="DEPARTMENT">Per-Divisi / Departemen</option>
                    <option value="ROLE">Per-Role Jabatan</option>
                    <option value="TENANT">Seluruh Karyawan (1 Tenant)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1 text-[11px] font-mono border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-sky-600">Preview Filter Laporan PDF:</div>
                <div>Periode: {pdfFilter.timePeriod} ({pdfFilter.month} {pdfFilter.year})</div>
                <div>Cakupan Target: {pdfFilter.userScope}</div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    alert(`Laporan Presensi PDF [${pdfFilter.timePeriod} - ${pdfFilter.userScope}] Berhasil Dicetak!`);
                    setShowPdfModal(false);
                  }}
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Unduh Laporan PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Lupa Absen / Koreksi Presensi Backdate ke HRD */}
      {showMissedAttendanceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Pengajuan Koreksi Presensi Lupa Absen / Backdate</span>
              </h3>
              <button onClick={() => setShowMissedAttendanceModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCorrectionSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Tanggal Lupa Absen (Backdate)</label>
                <input
                  type="date"
                  required
                  value={correctionForm.date}
                  onChange={(e) => setCorrectionForm({ ...correctionForm, date: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Alasan Lupa Absen / Koreksi</label>
                <input
                  type="text"
                  required
                  value={correctionForm.reason}
                  onChange={(e) => setCorrectionForm({ ...correctionForm, reason: e.target.value })}
                  placeholder="e.g. Lupa scan selfie presensi saat pemadaman listrik site"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-[11px] text-amber-800 dark:text-amber-300">
                ⚠️ Pengajuan koreksi ini akan dikirimkan ke HRD untuk ditinjau & disetujui.
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowMissedAttendanceModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg font-bold shadow-md transition-all cursor-pointer"
                >
                  Kirim Koreksi ke HRD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
