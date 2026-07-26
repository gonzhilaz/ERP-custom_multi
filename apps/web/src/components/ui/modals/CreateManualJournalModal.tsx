'use client';

import React, { useState, useEffect } from 'react';
import { X, FileSpreadsheet, Plus, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SearchableSelect, SearchSelectOption } from '@/components/ui/dropdowns/SearchableSelect';
import { COA_DATA } from '@/lib/mock/finance';

export type JournalType = 'GENERAL' | 'SPECIAL' | 'ADJUSTING' | 'CLOSING' | 'REVERSING';

export interface CreateManualJournalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: JournalType;
  onSubmit: (newJournal: {
    jvNumber: string;
    date: string;
    type: JournalType;
    description: string;
    debitAmount: number;
    creditAmount: number;
    postedBy: string;
    status: string;
    lineItems: { coaCode: string; accountName: string; debit: number; credit: number }[];
  }) => void;
}

export const CreateManualJournalModal: React.FC<CreateManualJournalProps> = ({
  isOpen,
  onClose,
  initialType = 'GENERAL',
  onSubmit
}) => {
  const [journalType, setJournalType] = useState<JournalType>(initialType);
  const [jvNumber, setJvNumber] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [lineItems, setLineItems] = useState<
    { coaCode: string; accountName: string; debit: number; credit: number }[]
  >([
    { coaCode: '1-10101', accountName: 'Kas Bank Mandiri Utama Holding', debit: 15000000, credit: 0 },
    { coaCode: '600-70-12-001', accountName: 'Biaya Reparasi dan Pemeliharaan (Area Dapur)', debit: 0, credit: 15000000 }
  ]);

  useEffect(() => {
    if (isOpen) {
      setJournalType(initialType);
    }
  }, [isOpen, initialType]);

  useEffect(() => {
    const prefixMap: Record<JournalType, string> = {
      GENERAL: 'JV',
      SPECIAL: 'SJ',
      ADJUSTING: 'AJE',
      CLOSING: 'CJE',
      REVERSING: 'RJE'
    };
    const rand = Math.floor(Math.random() * 9000 + 1000);
    setJvNumber(`${prefixMap[journalType]}/2026/07/${rand}`);
  }, [journalType]);

  if (!isOpen) return null;

  const totalDebit = lineItems.reduce((sum, item) => sum + (item.debit || 0), 0);
  const totalCredit = lineItems.reduce((sum, item) => sum + (item.credit || 0), 0);
  const isBalanced = totalDebit > 0 && totalDebit === totalCredit;

  const journalTypeOptions: SearchSelectOption[] = [
    { id: 'GENERAL', label: 'Jurnal Umum (General Journal)', subLabel: 'Prefix: JV/...', badge: 'General' },
    { id: 'SPECIAL', label: 'Jurnal Khusus (Special Journal)', subLabel: 'Prefix: SJ/...', badge: 'Special' },
    { id: 'ADJUSTING', label: 'Jurnal Penyesuaian (Adjusting Entries AJE)', subLabel: 'Prefix: AJE/...', badge: 'Adjusting' },
    { id: 'CLOSING', label: 'Jurnal Penutup (Closing Entries CJE)', subLabel: 'Prefix: CJE/...', badge: 'Closing' },
    { id: 'REVERSING', label: 'Jurnal Pembalik (Reversing Entries RJE)', subLabel: 'Prefix: RJE/...', badge: 'Reversing' }
  ];

  const coaSelectOptions: SearchSelectOption[] = COA_DATA.map((item) => ({
    id: item.code,
    label: `[ ${item.code} ] ${item.name}`,
    subLabel: item.categoryName,
    badge: item.type
  }));

  const handleAddLine = () => {
    setLineItems([
      ...lineItems,
      { coaCode: '100-10-10-363', accountName: 'Cash On Hand Pak Ferry Lie - BCA 157-074-7-190 a.n Ferry Lie', debit: 0, credit: 0 }
    ]);
  };

  const handleRemoveLine = (index: number) => {
    if (lineItems.length <= 2) {
      alert('Minimal 2 baris jurnal (Debet & Kredit) untuk memenuhi entri double-entry.');
      return;
    }
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const handleAccountChange = (index: number, coaCode: string) => {
    const found = COA_DATA.find((a) => a.code === coaCode);
    const updated = [...lineItems];
    updated[index] = {
      ...updated[index],
      coaCode,
      accountName: found ? found.name : 'Akun COA'
    };
    setLineItems(updated);
  };

  const handleAmountChange = (index: number, field: 'debit' | 'credit', value: number) => {
    const updated = [...lineItems];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setLineItems(updated);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Keterangan transaksi wajib diisi!');
      return;
    }
    if (!isBalanced) {
      alert('Total Debet dan Total Kredit HARUS seimbang (Balanced) sebelum memposting jurnal!');
      return;
    }

    onSubmit({
      jvNumber,
      date,
      type: journalType,
      description,
      debitAmount: totalDebit,
      creditAmount: totalCredit,
      postedBy: 'Staf Finance (Manual Entry)',
      status: 'POSTED',
      lineItems
    });
    onClose();
  };

  const getJournalTitle = () => {
    switch (journalType) {
      case 'ADJUSTING': return 'Input Jurnal Penyesuaian (AJE) Baru';
      case 'CLOSING': return 'Input Jurnal Penutup (CJE) Baru';
      case 'REVERSING': return 'Input Jurnal Pembalik (RJE) Baru';
      case 'SPECIAL': return 'Input Jurnal Khusus (Special Journal) Baru';
      default: return 'Input Jurnal Umum (General Journal) Baru';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{getJournalTitle()}</h3>
              <p className="text-[11px] text-slate-400">Pilih Tipe Jurnal sasaran & posting entri double-entry seimbang</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitForm} className="space-y-4">
          {/* Form Meta Header with Tipe Jurnal Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-[11px] font-bold text-sky-600 dark:text-sky-400 mb-1">Tipe Jurnal Target:</label>
              <SearchableSelect
                options={journalTypeOptions}
                value={journalType}
                onChange={(val) => setJournalType(val as JournalType)}
                placeholder="Pilih Tipe Jurnal..."
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nomor Voucher</label>
              <input type="text" value={jvNumber} readOnly className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-sky-600 dark:text-sky-400 text-xs cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Tanggal Posting</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-slate-900 dark:text-white" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Pemosting / Petugas</label>
              <input type="text" value="Staf Finance (Manual Entry)" readOnly className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-500 cursor-not-allowed" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Keterangan / Deskripsi Transaksi</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Contoh: Biaya Reparasi Dapur Resto Pak Ferry Lie via Transfer Bank BCA" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-medium" required />
          </div>

          {/* Line Items Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Rincian Baris Debet & Kredit</span>
              <button type="button" onClick={handleAddLine} className="px-3 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 font-bold rounded-xl flex items-center gap-1 cursor-pointer text-[11px]">
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Baris</span>
              </button>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-visible">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                  <tr>
                    <th className="p-2.5">Pencarian Akun COA (Universal SearchableSelect)</th>
                    <th className="p-2.5 text-right w-36">Debet (Rp)</th>
                    <th className="p-2.5 text-right w-36">Kredit (Rp)</th>
                    <th className="p-2.5 text-center w-12">Hapus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {lineItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2 min-w-[340px]">
                        <SearchableSelect
                          options={coaSelectOptions}
                          value={item.coaCode}
                          onChange={(selectedCode) => handleAccountChange(idx, String(selectedCode))}
                          placeholder="Cari kode COA / nama akun..."
                        />
                      </td>
                      <td className="p-2">
                        <input type="number" value={item.debit || ''} onChange={(e) => handleAmountChange(idx, 'debit', Number(e.target.value))} placeholder="0" className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs" />
                      </td>
                      <td className="p-2">
                        <input type="number" value={item.credit || ''} onChange={(e) => handleAmountChange(idx, 'credit', Number(e.target.value))} placeholder="0" className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs" />
                      </td>
                      <td className="p-2 text-center">
                        <button type="button" onClick={() => handleRemoveLine(idx)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Validation Balance Banner */}
          <div className={`p-3 rounded-2xl border flex items-center justify-between ${isBalanced ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'}`}>
            <div className="flex items-center gap-2">
              {isBalanced ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span className="font-bold">
                {isBalanced ? `Jurnal ${journalType} Seimbang (Balanced Ledger)` : 'Jurnal Tidak Seimbang (Debet & Kredit Harus Sama)'}
              </span>
            </div>
            <div className="font-mono font-bold">
              Debet: Rp {totalDebit.toLocaleString('id-ID')} | Kredit: Rp {totalCredit.toLocaleString('id-ID')}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer">
              Batal
            </button>
            <button type="submit" disabled={!isBalanced} className={`px-5 py-2 font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5 ${isBalanced ? 'bg-sky-600 hover:bg-sky-500 text-white cursor-pointer' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}>
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan & Post Ke {journalType}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
