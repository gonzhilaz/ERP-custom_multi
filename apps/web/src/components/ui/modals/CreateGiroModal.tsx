'use client';

import React, { useState } from 'react';
import { X, FileText, CheckCircle2, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { SearchableSelect, SearchSelectOption } from '@/components/ui/dropdowns/SearchableSelect';
import { COA_DATA } from '@/lib/mock/finance';

export interface CreateGiroProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newGiro: {
    giroNumber: string;
    type: 'GIRO_MASUK' | 'GIRO_KELUAR';
    bankName: string;
    issueDate: string;
    dueDate: string;
    issuerOrPayee: string;
    amount: number;
    description: string;
    status: 'DITERIMA' | 'DIENDAPKAN' | 'CAIR' | 'DITOLAK';
  }) => void;
}

export const CreateGiroModal: React.FC<CreateGiroProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [type, setType] = useState<'GIRO_MASUK' | 'GIRO_KELUAR'>('GIRO_MASUK');
  const [giroNumber, setGiroNumber] = useState('');
  const [bankName, setBankName] = useState('Bank BCA');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]);
  const [issuerOrPayee, setIssuerOrPayee] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState('');

  React.useEffect(() => {
    const prefix = type === 'GIRO_MASUK' ? 'GM' : 'GK';
    const rand = Math.floor(Math.random() * 900000 + 100000);
    setGiroNumber(`${prefix}-${rand}`);
  }, [type, isOpen]);

  if (!isOpen) return null;

  const bankOptions: SearchSelectOption[] = [
    { id: 'Bank BCA', label: 'Bank Central Asia (BCA)' },
    { id: 'Bank Mandiri', label: 'Bank Mandiri (Persero)' },
    { id: 'Bank BRI', label: 'Bank Rakyat Indonesia (BRI)' },
    { id: 'Bank BNI', label: 'Bank Negara Indonesia (BNI)' },
    { id: 'Bank CIMB Niaga', label: 'Bank CIMB Niaga' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giroNumber.trim() || amount <= 0 || !issuerOrPayee.trim()) {
      alert('Mohon lengkapi seluruh data Warkat Giro dengan benar!');
      return;
    }

    onSubmit({
      giroNumber,
      type,
      bankName,
      issueDate,
      dueDate,
      issuerOrPayee,
      amount,
      description,
      status: 'DIENDAPKAN'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Penerbitan Warkat Cek / Giro Baru
              </h3>
              <p className="text-[11px] text-slate-400">Pencatatan Giro Masuk (GM) / Giro Keluar (GK) & Kliring Perbankan</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Giro Type Radio Selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setType('GIRO_MASUK')}
              className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                type === 'GIRO_MASUK'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Giro Masuk (Diterima)</span>
            </button>
            <button
              type="button"
              onClick={() => setType('GIRO_KELUAR')}
              className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                type === 'GIRO_KELUAR'
                  ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Giro Keluar (Diterbitkan)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nomor Seri Warkat Giro</label>
              <input type="text" value={giroNumber} onChange={(e) => setGiroNumber(e.target.value)} placeholder="Contoh: GM-981240" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-sky-600 text-xs" required />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-sky-600 dark:text-sky-400 mb-1">Bank Penerbit Warkat:</label>
              <SearchableSelect
                options={bankOptions}
                value={bankName}
                onChange={setBankName}
                placeholder="Pilih Bank..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Tanggal Terbit Warkat</label>
              <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-slate-900 dark:text-white" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Tanggal Jatuh Tempo Kliring</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-slate-900 dark:text-white" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {type === 'GIRO_MASUK' ? 'Penarik Giro (Customer / Issuer)' : 'Penerima Giro (Payee / Vendor)'}
              </label>
              <input type="text" value={issuerOrPayee} onChange={(e) => setIssuerOrPayee(e.target.value)} placeholder="Contoh: PT Kalimantan Mining Resources" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-medium" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nominal Warkat (Rp)</label>
              <input type="number" value={amount || ''} onChange={(e) => setAmount(Number(e.target.value))} placeholder="0" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-emerald-600 text-xs" required />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Keterangan / Tujuan Warkat</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Contoh: Pembayaran Jaminan Kontrak Sewa Alat Berat Mining Juli 2026" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white" required />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Warkat {type}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
