'use client';

import React, { useState } from 'react';
import { CreditCard, Plus, Link, Building2, Eye } from 'lucide-react';
import { CorporateBankAccount } from '@/lib/mock/bank-accounts';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

interface Props {
  bankAccounts: CorporateBankAccount[];
  totalBankBalance: number;
  addBankAccount: (account: Omit<CorporateBankAccount, 'id' | 'bankCode'>) => void;
}

export const BankAccountsMasterTab = ({ bankAccounts, totalBankBalance, addBankAccount }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAcc, setSelectedAcc] = useState<CorporateBankAccount | null>(null);
  const [formData, setFormData] = useState({
    bankName: 'PT Bank Central Asia Tbk (BCA)',
    accountNumber: '8830-990-112',
    accountHolderName: 'PT Nusantara Enterprise Holding',
    branchName: 'KCU Sudirman Jakarta',
    swiftCode: 'CENAIDJA',
    currency: 'IDR',
    currentBalance: 500000000,
    linkedCoaAccountCode: '1-1102',
    linkedCoaAccountName: 'Bank BCA Corporate Holding',
    status: 'ACTIVE' as CorporateBankAccount['status']
  });

  const handleOpenCreate = () => {
    setFormData({
      bankName: '',
      accountNumber: '',
      accountHolderName: '',
      branchName: 'KCU Sudirman Jakarta',
      swiftCode: 'CENAIDJA',
      currency: 'IDR',
      currentBalance: 0,
      linkedCoaAccountCode: '1-1102',
      linkedCoaAccountName: 'Bank BCA Corporate Holding',
      status: 'ACTIVE'
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.bankName || !formData.accountNumber) return;

    addBankAccount(formData);
    alert(`Rekening Bank Corporate Baru [${formData.bankName} - ${formData.accountNumber}] Berhasil Ditautkan ke COA ${formData.linkedCoaAccountCode}!`);
    setShowModal(false);
  };

  const columns: ColumnDef<CorporateBankAccount>[] = [
    {
      key: 'bankName',
      header: 'Nama Bank & Cabang',
      className: 'font-bold text-slate-900 dark:text-white',
      render: (acc) => (
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-sky-500 shrink-0" />
          <div>
            <div className="font-bold">{acc.bankName}</div>
            <div className="text-[10px] text-slate-400 font-normal">{acc.branchName} • SWIFT: {acc.swiftCode}</div>
          </div>
        </div>
      )
    },
    {
      key: 'accountNumber',
      header: 'No. Rekening',
      className: 'font-mono font-bold text-sky-600 dark:text-sky-400',
      render: (acc) => acc.accountNumber
    },
    {
      key: 'accountHolderName',
      header: 'Atas Nama',
      className: 'font-medium',
      render: (acc) => acc.accountHolderName
    },
    {
      key: 'currentBalance',
      header: 'Saldo Kas Bank',
      align: 'right',
      className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400',
      render: (acc) => `${acc.currency} ${acc.currentBalance.toLocaleString('id-ID')}`
    },
    {
      key: 'linkedCoaAccountCode',
      header: 'Tautan COA ERP',
      align: 'center',
      render: (acc) => (
        <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded flex items-center gap-1 w-fit mx-auto">
          <Link className="w-3 h-3" /> {acc.linkedCoaAccountCode} - {acc.linkedCoaAccountName}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status Account',
      align: 'center',
      render: (acc) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${acc.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-500/10 text-slate-600'}`}>
          {acc.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Detail',
      align: 'center',
      render: (acc) => (
        <button
          onClick={() => setSelectedAcc(acc)}
          className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
          title="Lihat Detail Rekening Bank"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <DataTable
        headerTitle="Daftar Rekening Bank Corporate & Tautan Akun COA GL"
        columns={columns}
        data={bankAccounts}
        keyExtractor={(acc) => acc.id}
      />

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedAcc !== null}
        onClose={() => setSelectedAcc(null)}
        title="Detail Rekening Bank Corporate"
        subtitle={selectedAcc ? `${selectedAcc.bankName} • ${selectedAcc.accountNumber}` : ''}
        badgeLabel={selectedAcc?.status}
        badgeType="ACTIVE"
        summaryCards={[
          { label: 'Saldo Kas Bank', value: selectedAcc ? `${selectedAcc.currency} ${selectedAcc.currentBalance.toLocaleString('id-ID')}` : '0', color: 'text-emerald-600' },
          { label: 'Mata Uang', value: selectedAcc?.currency || 'IDR' },
          { label: 'SWIFT Code', value: selectedAcc?.swiftCode || '-' }
        ]}
        metadata={[
          { label: 'Nama Lembaga Bank', value: selectedAcc?.bankName, highlight: true },
          { label: 'Nomor Rekening', value: selectedAcc?.accountNumber, mono: true, highlight: true },
          { label: 'Atas Nama Pemilik', value: selectedAcc?.accountHolderName },
          { label: 'Cabang Pembuka', value: selectedAcc?.branchName },
          { label: 'Akun COA ERP Tautan', value: selectedAcc ? `${selectedAcc.linkedCoaAccountCode} - ${selectedAcc.linkedCoaAccountName}` : '-', mono: true }
        ]}
        footerNotes="Seluruh mutasi pada rekening bank disinkronkan otomatis dengan laporan Kas & Rekonsiliasi Bank."
      />

      {/* Modal Form Tambah Rekening Bank */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-sky-500" />
              <span>Tambah Rekening Bank Baru</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nama Bank Resmi</label>
                <input type="text" value={formData.bankName} onChange={(e) => setFormData({ ...formData, bankName: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs" placeholder="Contoh: PT Bank Central Asia Tbk (BCA)" required />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">No. Rekening</label>
                  <input type="text" value={formData.accountNumber} onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Mata Uang</label>
                  <input type="text" value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono uppercase" required />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Atas Nama Rekening</label>
                <input type="text" value={formData.accountHolderName} onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs" required />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Cabang Bank</label>
                  <input type="text" value={formData.branchName} onChange={(e) => setFormData({ ...formData, branchName: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Kode SWIFT</label>
                  <input type="text" value={formData.swiftCode} onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Saldo Awal (Rp)</label>
                <input type="number" value={formData.currentBalance} onChange={(e) => setFormData({ ...formData, currentBalance: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold" required />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Kode Tautan COA Akuntansi</label>
                <input type="text" value={formData.linkedCoaAccountCode} onChange={(e) => setFormData({ ...formData, linkedCoaAccountCode: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold" required />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer">Batal</button>
                <button type="submit" className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs cursor-pointer">Simpan & Tautkan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
