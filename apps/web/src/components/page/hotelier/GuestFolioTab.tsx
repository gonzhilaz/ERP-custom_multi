'use client';

import React, { useState } from 'react';
import { BedDouble, Plus, Receipt, CheckCircle2, X } from 'lucide-react';
import { GuestFolioItem } from '@/lib/mock/hotelier';

interface Props {
  folios: GuestFolioItem[];
  addExtraCharge: (folioId: string, chargeType: 'ROOM_SERVICE' | 'LAUNDRY', amount: number) => void;
}

export const GuestFolioTab = ({ folios, addExtraCharge }: Props) => {
  const [selectedFolio, setSelectedFolio] = useState<GuestFolioItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [chargeType, setChargeType] = useState<'ROOM_SERVICE' | 'LAUNDRY'>('ROOM_SERVICE');
  const [amount, setAmount] = useState(150000);

  const handleOpenAddCharge = (folio: GuestFolioItem) => {
    setSelectedFolio(folio);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFolio) {
      addExtraCharge(selectedFolio.id, chargeType, amount);
      alert(`Biaya Tambahan [${chargeType}] Rp ${amount.toLocaleString('id-ID')} Berhasil Ditambahkan ke Folio ${selectedFolio.folioNumber}!`);
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Receipt className="w-5 h-5 text-rose-500" />
            <span>Tagihan Folio & Split Bill ({folios.length} Folios)</span>
          </h2>
          <p className="text-[11px] text-slate-500">
            Folio A (Corporate Room Rate & Routing Rule ke CRM AR) & Folio B (Personal Incidentals/Minibar).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-600 font-bold font-mono text-xs rounded-xl border border-sky-500/20">
            Split Folio Active
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">No. Folio</th>
                <th className="py-3 px-4">Nama Tamu & Kamar</th>
                <th className="py-3 px-4">Periode Menginap</th>
                <th className="py-3 px-4 text-right">Sewa Kamar</th>
                <th className="py-3 px-4 text-right">Room Service & Laundry</th>
                <th className="py-3 px-4 text-right font-bold text-rose-600">Total Tagihan (Net)</th>
                <th className="py-3 px-4 text-center">Aksi Extra Charge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {folios.map((f) => {
                const netPayable = f.totalBill - f.depositAmount;
                return (
                  <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-rose-600 dark:text-rose-400">{f.folioNumber}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{f.guestName}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{f.roomNumber}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {f.checkInDate} s/d {f.checkOutDate}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-700 dark:text-slate-200">
                      Rp {f.roomChargeTotal.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-500">
                      Rp {(f.roomServiceTotal + f.laundryTotal).toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
                      Rp {netPayable.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenAddCharge(f)}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold text-[10px] transition-all flex items-center gap-1 mx-auto cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Extra Charge</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Charge */}
      {showModal && selectedFolio && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-rose-500" />
                <span>Extra Charge Folio {selectedFolio.guestName}</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Kategori Biaya Tambahan</label>
                <select
                  value={chargeType}
                  onChange={(e) => setChargeType(e.target.value as any)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold text-rose-600"
                >
                  <option value="ROOM_SERVICE">Restaurant Room Service</option>
                  <option value="LAUNDRY">Express Laundry & Dry Cleaning</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-rose-600">Nominal Biaya (Rp)</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-rose-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Posting ke Folio Tamu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
