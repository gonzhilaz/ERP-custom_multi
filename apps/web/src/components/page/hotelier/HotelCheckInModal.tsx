'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Key, AlertTriangle, Clock, UserCheck } from 'lucide-react';
import { HotelReservationItem } from './HotelierReservationsView';

interface Props {
  reservation: HotelReservationItem | null;
  onClose: () => void;
  onConfirmCheckIn: (res: HotelReservationItem, details: CheckInDetails) => void;
}

export interface CheckInDetails {
  actualCheckInTime: string;
  idCardNumber: string;
  securityDepositAmount: number;
  depositPaymentMethod: 'CASH' | 'DEBIT_CARD' | 'CREDIT_CARD_PREAUTH';
  assignedRoomNo: string;
  earlyCheckInFee: number;
  isKeycardRfidEncoded: boolean;
  notes: string;
}

export const HotelCheckInModal: React.FC<Props> = ({ reservation, onClose, onConfirmCheckIn }) => {
  if (!reservation) return null;

  const [idCardNumber, setIdCardNumber] = useState('3174091802880001');
  const [assignedRoomNo, setAssignedRoomNo] = useState(reservation.assignedRoomNo || 'RM-101');
  const [depositAmount, setDepositAmount] = useState(250000);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'DEBIT_CARD' | 'CREDIT_CARD_PREAUTH'>('CASH');
  const [isKeycardEncoded, setIsKeycardEncoded] = useState(false);
  const [notes, setNotes] = useState('Tamu menyertakan deposit tunai Rp 250.000');

  // Time check simulation (Standard 14:00)
  const currentHour = new Date().getHours();
  const isEarlyCheckIn = currentHour < 14;
  const earlyCheckInFee = isEarlyCheckIn ? 150000 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCardNumber) {
      alert('Nomor KTP / Paspor Tamu wajib diisi!');
      return;
    }
    onConfirmCheckIn(reservation, {
      actualCheckInTime: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      idCardNumber,
      securityDepositAmount: depositAmount,
      depositPaymentMethod: paymentMethod,
      assignedRoomNo,
      earlyCheckInFee,
      isKeycardRfidEncoded: isKeycardEncoded,
      notes
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 w-full max-w-lg space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Standar Express Check-in Tamu</h3>
              <p className="text-[11px] font-mono text-sky-600 dark:text-sky-400">Kode Reservasi: {reservation.resNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Status Early Check-in Notice */}
          {isEarlyCheckIn && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-2.5 text-amber-700 dark:text-amber-300">
              <Clock className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Notifikasi Early Check-in (Sebelum 14:00 WIB)</div>
                <div className="text-[11px]">Check-in dilakukan sebelum jam standar 14:00. Sistem mengenakan biaya Early Check-in Rp 150.000 ke Folio.</div>
              </div>
            </div>
          )}

          {/* Guest Identity & Room Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Tamu</label>
              <input type="text" value={reservation.guestName} readOnly className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">No. KTP / Paspor (Mandatori)</label>
              <input type="text" value={idCardNumber} onChange={(e) => setIdCardNumber(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-sky-600 dark:text-sky-400" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Alokasi Unit Kamar</label>
              <select value={assignedRoomNo} onChange={(e) => setAssignedRoomNo(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-slate-900 dark:text-white">
                <option value="RM-101">RM-101 (Deluxe King - VC Clean)</option>
                <option value="RM-102">RM-102 (Executive Suite - VC Clean)</option>
                <option value="RM-201">RM-201 (Grand Deluxe - VC Clean)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Durasi Menginap</label>
              <input type="text" value={`${reservation.numNights} Malam (${reservation.checkInDate} - ${reservation.checkOutDate})`} readOnly className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-700 dark:text-slate-300" />
            </div>
          </div>

          {/* Security Deposit Collection */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Security Deposit Jaminan Kamar</span>
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">Rp {depositAmount.toLocaleString('id-ID')}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Nominal Deposit (Rp)</label>
                <input type="number" value={depositAmount} onChange={(e) => setDepositAmount(Number(e.target.value))} className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-xs" />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Metode Bayar Deposit</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as any)} className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-xs">
                  <option value="CASH">Tunai (Cash Desk)</option>
                  <option value="DEBIT_CARD">Kartu Debit EDC</option>
                  <option value="CREDIT_CARD_PREAUTH">Pre-Auth Kartu Kredit</option>
                </select>
              </div>
            </div>
          </div>

          {/* RFID Keycard Encoder Simulation */}
          <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <div>
                <div className="font-bold text-sky-900 dark:text-sky-200">Encoder Keycard RFID Smart Lock</div>
                <div className="text-[10px] text-sky-700 dark:text-sky-300">Enkripsi RFID kamar {assignedRoomNo}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsKeycardEncoded(true);
                alert(`Keycard RFID Kamar ${assignedRoomNo} Berhasil Di-Encode! Kode Enkripsi RFID Aktif.`);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                isKeycardEncoded ? 'bg-emerald-600 text-white' : 'bg-sky-600 hover:bg-sky-500 text-white'
              }`}
            >
              {isKeycardEncoded ? '✓ RFID Encodered' : '🔑 Encode Keycard RFID'}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer">Batal</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Proses Check-in Resmi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
