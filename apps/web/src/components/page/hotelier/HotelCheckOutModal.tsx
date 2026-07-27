'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, DollarSign, Receipt, Printer, AlertCircle, LogOut } from 'lucide-react';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { HotelReservationItem } from './HotelierReservationsView';

interface Props {
  reservation: HotelReservationItem | null;
  onClose: () => void;
  onConfirmCheckOut: (res: HotelReservationItem, settlementDetails: CheckOutSettlement) => void;
}

export interface CheckOutSettlement {
  actualCheckOutTime: string;
  roomChargeTotal: number;
  minibarCharge: number;
  laundryCharge: number;
  lateCheckOutFee: number;
  securityDepositRefund: number;
  grandTotalPaid: number;
  paymentMethod: string;
  notes: string;
}

export const HotelCheckOutModal: React.FC<Props> = ({ reservation, onClose, onConfirmCheckOut }) => {
  if (!reservation) return null;

  const [minibarCharge, setMinibarCharge] = useState(75000); // Charges from minibar inspection
  const [laundryCharge, setLaundryCharge] = useState(50000); // Charges from guest laundry
  const [securityDeposit, setSecurityDeposit] = useState(250000);
  const [paymentMethod, setPaymentMethod] = useState('DEBIT_CARD');
  const [isFolioSettled, setIsFolioSettled] = useState(false);

  // Time check for Late Checkout (Standard 12:00)
  const currentHour = new Date().getHours();
  const isLateCheckout = currentHour >= 13;
  const lateCheckOutFee = isLateCheckout ? 100000 : 0;

  const roomChargeTotal = reservation.totalAmount;
  const subtotalCharges = roomChargeTotal + minibarCharge + laundryCharge + lateCheckOutFee;
  const grandTotalPaid = Math.max(0, subtotalCharges - securityDeposit);
  const depositRefundAmount = Math.max(0, securityDeposit - subtotalCharges);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmCheckOut(reservation, {
      actualCheckOutTime: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      roomChargeTotal,
      minibarCharge,
      laundryCharge,
      lateCheckOutFee,
      securityDepositRefund: depositRefundAmount,
      grandTotalPaid,
      paymentMethod,
      notes: 'Folio Lunas & Checkout Sukses. Status Kamar di-set ke Vacant Dirty.'
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 w-full max-w-lg space-y-4 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Standar Checkout & Pelunasan Folio</h3>
              <p className="text-[11px] font-mono text-sky-600 dark:text-sky-400">Kamar: {reservation.assignedRoomNo || 'RM-101'} • {reservation.guestName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCheckout} className="space-y-3 text-xs">
          {/* Late Checkout Warning */}
          {isLateCheckout && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-start gap-2.5 text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Notifikasi Denda Late Checkout (Melewati 12:00 WIB)</div>
                <div className="text-[11px]">Checkout dilakukan setelah jam standar 12:00. Denda keterlambatan Rp 100.000 otomatis dimasukkan ke tagihan.</div>
              </div>
            </div>
          )}

          {/* Folio Billing Itemized Summary */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-sky-500" />
                <span>Rincian Folio Tagihan Menginap</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Bill ID: FOL-{reservation.resNumber}</span>
            </h4>

            <div className="space-y-1.5 pt-1 border-t border-slate-200 dark:border-slate-700 font-mono">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>1. Biaya Sewa Kamar ({reservation.numNights} Malam)</span>
                <span className="font-bold text-slate-900 dark:text-white">Rp {roomChargeTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>2. Inspeksi Minibar (Konsumsi)</span>
                <span className="font-bold text-slate-900 dark:text-white">Rp {minibarCharge.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>3. Layanan Laundry Tamu Express</span>
                <span className="font-bold text-slate-900 dark:text-white">Rp {laundryCharge.toLocaleString('id-ID')}</span>
              </div>
              {lateCheckOutFee > 0 && (
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>4. Denda Late Checkout (/Jam)</span>
                  <span>Rp {lateCheckOutFee.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="flex justify-between text-emerald-600 font-bold border-t border-slate-200 dark:border-slate-700 pt-1">
                <span>Kredit Security Deposit Jaminan</span>
                <span>- Rp {securityDeposit.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700 font-bold text-sm">
              <span className="text-slate-900 dark:text-white">Total Akhir Pelunasan Folio</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">Rp {grandTotalPaid.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Payment Method Settlement */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Metode Pelunasan</label>
              <SearchableSelect
                value={paymentMethod}
                onChange={(val) => setPaymentMethod(val)}
                options={[
                  { id: 'DEBIT_CARD', label: 'Kartu Debit EDC' },
                  { id: 'CREDIT_CARD', label: 'Kartu Kredit Visa/Master' },
                  { id: 'CASH', label: 'Tunai (Cash Desk)' },
                  { id: 'QRIS', label: 'QRIS Statis/Dinamis' }
                ]}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Pengembalian Deposit (Sisa)</label>
              <input type="text" value={`Rp ${depositRefundAmount.toLocaleString('id-ID')}`} readOnly className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-sky-600 dark:text-sky-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button type="button" onClick={() => alert(`Folio Cetak Bukti Bayar Kamar ${reservation.assignedRoomNo} Berhasil Dicetak!`)} className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Guest Folio</span>
            </button>
            <div className="flex gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Proses Express Checkout</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
