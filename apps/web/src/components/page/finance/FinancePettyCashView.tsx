'use client';

import React, { useState } from 'react';
import { DollarSign, Plus, RefreshCw, Receipt } from 'lucide-react';
import { usePettyCash } from '@/hooks/finance/usePettyCash';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

interface PettyCashTx {
  id: string;
  date: string;
  requestedBy: string;
  category: string;
  description: string;
  amount: number;
  status: string;
  receiptFileName?: string;
}

export const FinancePettyCashView = () => {
  const { transactions, pettyCashBalance, totalSpent, currentRemaining, addTransaction, requestReplenishment } = usePettyCash();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.requestedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const [form, setForm] = useState({
    requestedBy: 'Siti Rahma (Admin GA)',
    category: 'ATK_KANTOR',
    description: 'Pembelian Kertas A4 & Tinta Printer Kantor',
    amount: 350000,
    receiptFileName: 'Struk_ATK_Kertas.pdf'
  });

  const categoryOptions = [
    { id: 'ATK_KANTOR', value: 'ATK_KANTOR', label: 'ATK & Office Supplies' },
    { id: 'KONSUMSI_RAPAT', value: 'KONSUMSI_RAPAT', label: 'Konsumsi Rapat & Tamu HO' },
    { id: 'BBM_OPERASIONAL', value: 'BBM_OPERASIONAL', label: 'BBM & Tol Operasional' },
    { id: 'PERBAIKAN_DARURAT', value: 'PERBAIKAN_DARURAT', label: 'Perbaikan Darurat Ops' }
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addTransaction({
      date: new Date().toISOString().split('T')[0],
      requestedBy: form.requestedBy,
      category: form.category as any,
      description: form.description,
      amount: form.amount,
      receiptFileName: form.receiptFileName
    });
    alert(`Pengeluaran Kas Kecil Rp ${form.amount.toLocaleString('id-ID')} Disetujui & Dicatat!`);
    setShowModal(false);
  };

  const columns: ColumnDef<PettyCashTx>[] = [
    { key: 'id', header: 'Voucher ID', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => i.id },
    { key: 'date', header: 'Tanggal', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'requestedBy', header: 'Pemohon Kas', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.requestedBy },
    { key: 'category', header: 'Kategori Biaya', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-slate-500/10 text-slate-600 dark:text-slate-300 font-bold font-mono text-[10px] rounded">{i.category}</span> },
    { key: 'description', header: 'Keterangan Pengeluaran Kas', render: (i) => i.description },
    { key: 'amount', header: 'Nominal Biaya', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => `Rp ${i.amount.toLocaleString('id-ID')}` },
    { key: 'status', header: 'Status Approval', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[10px] rounded">{i.status}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Kas Kecil Ops (Petty Cash Imprest)"
        icon={DollarSign}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Imprest Fund Kas Kecil"
        glossaryItems={[
          { term: 'Imprest System', description: 'Metode saldo kas kecil bernilai tetap dengan mekanisme klaim pengisian kembali (Replenishment).' },
          { term: 'Disbursement Voucher', description: 'Voucher resmi pengeluaran kas kecil dengan bukti fisik/struk terlampir.' }
        ]}
        badges={[
          { label: `Pagu Imprest: Rp ${pettyCashBalance.toLocaleString('id-ID')}`, variant: 'slate' },
          { label: `Sisa Kas: Rp ${currentRemaining.toLocaleString('id-ID')}`, variant: 'emerald' }
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button onClick={requestReplenishment} className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Isi Kembali Kas (Replenish)</span>
            </button>
            <button onClick={() => setShowModal(true)} className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
              <Plus className="w-4 h-4" />
              <span>Cairkan Kas Kecil</span>
            </button>
          </div>
        }
      />

      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari voucher ID, nama pemohon, atau keterangan..."
        categoryValue={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categoryOptions={[
          { label: 'ATK & Office Supplies', value: 'ATK_KANTOR' },
          { label: 'Konsumsi Rapat', value: 'KONSUMSI_RAPAT' },
          { label: 'BBM & Tol Operasional', value: 'BBM_OPERASIONAL' },
          { label: 'Perbaikan Darurat', value: 'PERBAIKAN_DARURAT' }
        ]}
        categoryPlaceholder="Semua Kategori Beban"
        colorScheme="emerald"
      />

      <DataTable
        headerTitle={`Buku Transaksi Pengeluaran Kas Kecil Operasional (${filteredTransactions.length})`}
        columns={columns}
        data={filteredTransactions}
        keyExtractor={(i) => i.id}
      />

      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pencairan Kas Kecil Baru</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Pemohon / Penanggung Jawab</label>
                <input type="text" value={form.requestedBy} onChange={(e) => setForm({ ...form, requestedBy: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs" required />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Kategori Beban</label>
                <SearchableSelect
                  options={categoryOptions}
                  value={form.category}
                  onChange={(val) => setForm({ ...form, category: val })}
                  placeholder="Pilih Kategori Beban Kas Kecil..."
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nominal (Rp)</label>
                <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold" required />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Keterangan Biaya</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs" rows={2} required />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer">Batal</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs cursor-pointer">Simpan & Cairkan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
