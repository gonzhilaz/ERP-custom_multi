'use client';

import React, { useState } from 'react';
import { X, Building2, Plus, CheckCircle2, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { SearchableSelect, SearchSelectOption } from '@/components/ui/dropdowns/SearchableSelect';
import { COA_DATA } from '@/lib/mock/finance';
import { useBankAccounts } from '@/hooks/finance/useBankAccounts';

export interface CreateBankVoucherProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newVoucher: {
    voucherNumber: string;
    date: string;
    voucherType: 'BKM' | 'BKK'; // BKM: Bank Masuk, BKK: Bank Keluar
    bankAccount: string;
    payeeOrPayer: string;
    amount: number;
    description: string;
    contraAccountCode: string;
    contraAccountName: string;
    status: string;
  }) => void;
}

export const CreateBankVoucherModal: React.FC<CreateBankVoucherProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const { bankAccounts } = useBankAccounts();
  const [voucherType, setVoucherType] = useState<'BKM' | 'BKK'>('BKM');
  const [voucherNumber, setVoucherNumber] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [bankAccount, setBankAccount] = useState(bankAccounts[0]?.accountNumber || '122-00-988277-1');
  const [payeeOrPayer, setPayeeOrPayer] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [contraAccountCode, setContraAccountCode] = useState('1-10400');

  React.useEffect(() => {
    const prefix = voucherType === 'BKM' ? 'BKM' : 'BKK';
    const rand = Math.floor(Math.random() * 9000 + 1000);
    setVoucherNumber(`${prefix}/2026/07/${rand}`);
  }, [voucherType, isOpen]);

  if (!isOpen) return null;

  const bankAccountOptions: SearchSelectOption[] = bankAccounts.map((b) => ({
    id: b.accountNumber,
    label: `${b.bankName} - ${b.accountNumber}`,
    subLabel: `Saldo: Rp ${b.currentBalance.toLocaleString('id-ID')}`
  }));

  const coaOptions: SearchSelectOption[] = COA_DATA.map((item) => ({
    id: item.code,
    label: `[ ${item.code} ] ${item.name}`,
    subLabel: item.categoryName,
    badge: item.type
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || amount <= 0 || !payeeOrPayer.trim()) {
      alert('Mohon lengkapi seluruh data voucher bank dengan benar!');
      return;
    }

    const contra = COA_DATA.find((c) => c.code === contraAccountCode);

    onSubmit({
      voucherNumber,
      date,
      voucherType,
      bankAccount,
      payeeOrPayer,
      amount,
      description,
      contraAccountCode,
      contraAccountName: contra ? contra.name : 'Akun Lawan',
      status: 'POSTED'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${voucherType === 'BKM' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {voucherType === 'BKM' ? 'Penerbitan Voucher Bank Masuk (BKM)' : 'Penerbitan Voucher Bank Keluar (BKK)'}
              </h3>
              <p className="text-[11px] text-slate-400">Voucher resmi penerimaan / pengeluaran dana transfer perbankan holding</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Voucher Type Radio Selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setVoucherType('BKM')}
              className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                voucherType === 'BKM'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Voucher Bank Masuk (BKM)</span>
            </button>
            <button
              type="button"
              onClick={() => setVoucherType('BKK')}
              className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                voucherType === 'BKK'
                  ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Voucher Bank Keluar (BKK)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nomor Voucher Bank</label>
              <input type="text" value={voucherNumber} readOnly className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-sky-600 text-xs cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Tanggal Transaksi</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs text-slate-900 dark:text-white" required />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-sky-600 dark:text-sky-400 mb-1">Pilih Rekening Bank Perusahaan:</label>
            <SearchableSelect
              options={bankAccountOptions}
              value={bankAccount}
              onChange={setBankAccount}
              placeholder="Pilih Rekening Bank..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                {voucherType === 'BKM' ? 'Diterima Dari (Payer / Customer)' : 'Dibayarkan Kepada (Payee / Vendor)'}
              </label>
              <input type="text" value={payeeOrPayer} onChange={(e) => setPayeeOrPayer(e.target.value)} placeholder="Contoh: PT Nusantara Jaya Mandiri" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-medium" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nominal Transfer (Rp)</label>
              <input type="number" value={amount || ''} onChange={(e) => setAmount(Number(e.target.value))} placeholder="0" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-emerald-600 text-xs" required />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-sky-600 dark:text-sky-400 mb-1">Akun Lawan COA (Contra Account):</label>
            <SearchableSelect
              options={coaOptions}
              value={contraAccountCode}
              onChange={setContraAccountCode}
              placeholder="Pilih Akun Lawan COA..."
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Keterangan / Uraian Voucher Bank</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Contoh: Pelunasan Invoice Tagihan Katering Event Corporate Juli 2026" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white" required />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Terbitkan Voucher {voucherType}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
