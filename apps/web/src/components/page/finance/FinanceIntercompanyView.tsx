'use client';

import React, { useState } from 'react';
import { Building2, CheckCircle2, Plus, X } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';

interface EliminationTx {
  id: string;
  txCode: string;
  sellerUnit: string;
  buyerUnit: string;
  description: string;
  amount: number;
  eliminationStatus: string;
  eliminationDate: string;
}

const INITIAL_ELIMINATIONS: EliminationTx[] = [
  {
    id: 'ic-001',
    txCode: 'IC-TX-2026-0044',
    sellerUnit: 'Nusantara Culinary & Catering',
    buyerUnit: 'PT Borneo Mining Emas',
    description: 'Pasokan Katering Makan Siang Lapangan Site Tambang Gold-01',
    amount: 120000000,
    eliminationStatus: 'ELIMINATED_IN_CONSOLIDATION',
    eliminationDate: '2026-07-23'
  },
  {
    id: 'ic-002',
    txCode: 'IC-TX-2026-0045',
    sellerUnit: 'Nusantara Bakery & Resto',
    buyerUnit: 'Hotel Grand Nusantara',
    description: 'Pasokan Roti Sarapan Pagi & Pastry Executive Lounge',
    amount: 45000000,
    eliminationStatus: 'ELIMINATED_IN_CONSOLIDATION',
    eliminationDate: '2026-07-24'
  }
];

export const FinanceIntercompanyView = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<EliminationTx[]>(INITIAL_ELIMINATIONS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    sellerUnit: 'Nusantara Culinary & Catering',
    buyerUnit: 'PT Borneo Mining Emas',
    description: '',
    amount: 50000000
  });

  const canManage = Boolean(user);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || form.amount <= 0) return;

    const newTx: EliminationTx = {
      id: `ic-${Date.now()}`,
      txCode: `IC-TX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      sellerUnit: form.sellerUnit,
      buyerUnit: form.buyerUnit,
      description: form.description,
      amount: form.amount,
      eliminationStatus: 'ELIMINATED_IN_CONSOLIDATION',
      eliminationDate: new Date().toISOString().split('T')[0]
    };

    setItems([newTx, ...items]);
    setShowModal(false);
    setForm({
      sellerUnit: 'Nusantara Culinary & Catering',
      buyerUnit: 'PT Borneo Mining Emas',
      description: '',
      amount: 50000000
    });
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-500" />
            <span>Inter-Company</span>
          </h1>
          <p className="text-[11px] text-slate-500">Eliminasi Otomatis Transaksi Antar Anak Perusahaan dalam Laporan Konsolidasi Holding</p>
        </div>

        {canManage && (
          <button
            onClick={() => setShowModal(true)}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Catatan Transaksi</span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="font-bold text-slate-700 dark:text-slate-300">Daftar Transaksi Antar-Unit Ter-Eliminasi</span>
          <span className="text-[11px] text-sky-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Eliminated in Consolidation P&L
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Kode Ref</th>
                <th className="py-3 px-4">Unit Penjual (Seller)</th>
                <th className="py-3 px-4">Unit Pembeli (Buyer)</th>
                <th className="py-3 px-4">Keterangan Transaksi</th>
                <th className="py-3 px-4 text-right">Nominal Eliminasi</th>
                <th className="py-3 px-4 text-center">Status Laporan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-600">{item.txCode}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{item.sellerUnit}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{item.buyerUnit}</td>
                  <td className="py-3 px-4 text-slate-500">{item.description}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                    Rp {item.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      TER-ELIMINASI
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-500" />
                <span>Transaksi Inter-Company Baru</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit Usaha Penjual (Seller)</label>
                <select
                  value={form.sellerUnit}
                  onChange={(e) => setForm({ ...form, sellerUnit: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold"
                >
                  <option value="Nusantara Culinary & Catering">Nusantara Culinary & Catering</option>
                  <option value="Nusantara Bakery & Resto">Nusantara Bakery & Resto</option>
                  <option value="Hotel Grand Nusantara">Hotel Grand Nusantara</option>
                  <option value="PT Borneo Mining Emas">PT Borneo Mining Emas</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit Usaha Pembeli (Buyer)</label>
                <select
                  value={form.buyerUnit}
                  onChange={(e) => setForm({ ...form, buyerUnit: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold"
                >
                  <option value="PT Borneo Mining Emas">PT Borneo Mining Emas</option>
                  <option value="Hotel Grand Nusantara">Hotel Grand Nusantara</option>
                  <option value="Nusantara Culinary & Catering">Nusantara Culinary & Catering</option>
                  <option value="Nusantara Bakery & Resto">Nusantara Bakery & Resto</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Transaksi Inter-Company</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pasokan Suplai Bahan Baku / Servis Armada"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nominal Transaksi (Rp)</label>
                <input
                  type="number"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-500 shadow-sm"
                >
                  Simpan & Auto-Eliminasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
