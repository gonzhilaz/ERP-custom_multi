'use client';

import React, { useState } from 'react';
import { FileCheck, Plus, ArrowDownLeft, ArrowUpRight, Eye } from 'lucide-react';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { CreateBankVoucherModal } from '@/components/ui/modals/CreateBankVoucherModal';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

interface BankVoucherRow {
  voucherNumber: string;
  date: string;
  voucherType: 'BKM' | 'BKK';
  bankAccount: string;
  payeeOrPayer: string;
  amount: number;
  description: string;
  contraAccountCode: string;
  contraAccountName: string;
  status: string;
}

export const BankVouchersTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<BankVoucherRow | null>(null);

  const [vouchers, setVouchers] = useState<BankVoucherRow[]>([
    { voucherNumber: 'BKM/2026/07/0081', date: '2026-07-24', voucherType: 'BKM', bankAccount: '122-00-988277-1 (Bank Mandiri)', payeeOrPayer: 'PT Nusantara Jaya Mandiri', amount: 45000000, description: 'Penerimaan Pelunasan Invoice Katering Event', contraAccountCode: '1-10400', contraAccountName: 'Piutang Usaha AR Customer', status: 'POSTED' },
    { voucherNumber: 'BKK/2026/07/0104', date: '2026-07-23', voucherType: 'BKK', bankAccount: '122-00-988277-1 (Bank Mandiri)', payeeOrPayer: 'PT Meat Prima Indonesia', amount: 94350000, description: 'Pembayaran Utang Supplier Pembelian Daging Import', contraAccountCode: '2-10100', contraAccountName: 'Utang Usaha AP Supplier', status: 'POSTED' },
    { voucherNumber: 'BKM/2026/07/0082', date: '2026-07-22', voucherType: 'BKM', bankAccount: '880-112-9900 (Bank BCA)', payeeOrPayer: 'Kasir Outlet Retail HO', amount: 15400000, description: 'Setoran Uang Kas Penjualan Retail POS', contraAccountCode: '1-10100', contraAccountName: 'Kas Kasir Outlet Retail', status: 'POSTED' }
  ]);

  const handleAddVoucher = (newVoucher: BankVoucherRow) => {
    setVouchers([newVoucher, ...vouchers]);
  };

  const filteredVouchers = vouchers.filter(
    (v) =>
      v.voucherNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.payeeOrPayer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<BankVoucherRow>[] = [
    { key: 'voucherNumber', header: 'No. Voucher Bank', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.voucherNumber },
    { key: 'date', header: 'Tanggal', className: 'font-mono text-slate-500', render: (i) => i.date },
    {
      key: 'voucherType',
      header: 'Tipe Voucher',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded flex items-center justify-center gap-1 ${
          i.voucherType === 'BKM' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
        }`}>
          {i.voucherType === 'BKM' ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
          {i.voucherType === 'BKM' ? 'Bank Masuk (BKM)' : 'Bank Keluar (BKK)'}
        </span>
      )
    },
    { key: 'payeeOrPayer', header: 'Penerima / Pembayar', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.payeeOrPayer },
    { key: 'description', header: 'Uraian Transaksi Voucher', render: (i) => i.description },
    { key: 'amount', header: 'Nominal (Rp)', align: 'right', className: 'font-mono font-bold text-slate-900 dark:text-white', render: (i) => `Rp ${i.amount.toLocaleString('id-ID')}` },
    { key: 'status', header: 'Status', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.status}</span> },
    {
      key: 'actions',
      header: 'Detail',
      align: 'center',
      render: (i) => (
        <button
          onClick={() => setSelectedVoucher(i)}
          className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
          title="Lihat Detail Voucher Bank"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari voucher ID, nama penerima, atau uraian..."
          />
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs shrink-0">
          <Plus className="w-4 h-4" />
          <span>Terbitkan Voucher Bank</span>
        </button>
      </div>

      <DataTable
        headerTitle={`Register Voucher Bank Masuk & Keluar (${filteredVouchers.length} Voucher)`}
        columns={columns}
        data={filteredVouchers}
        keyExtractor={(i) => i.voucherNumber}
      />

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedVoucher !== null}
        onClose={() => setSelectedVoucher(null)}
        title={`Detail Voucher ${selectedVoucher?.voucherType === 'BKM' ? 'Bank Masuk (BKM)' : 'Bank Keluar (BKK)'}`}
        subtitle={selectedVoucher ? `${selectedVoucher.voucherNumber} • Tanggal: ${selectedVoucher.date}` : ''}
        badgeLabel={selectedVoucher?.status}
        badgeType="ACTIVE"
        summaryCards={[
          { label: 'Nominal Voucher', value: selectedVoucher ? `Rp ${selectedVoucher.amount.toLocaleString('id-ID')}` : '0', color: selectedVoucher?.voucherType === 'BKM' ? 'text-emerald-600' : 'text-rose-600' },
          { label: 'Tipe Voucher', value: selectedVoucher?.voucherType || '-' },
          { label: 'Rekening Bank', value: selectedVoucher?.bankAccount || '-' }
        ]}
        metadata={[
          { label: 'No. Voucher Bank', value: selectedVoucher?.voucherNumber, mono: true, highlight: true },
          { label: 'Pihak Terkait', value: selectedVoucher?.payeeOrPayer },
          { label: 'Uraian Transaksi', value: selectedVoucher?.description },
          { label: 'Akun Kontra (COA)', value: selectedVoucher ? `${selectedVoucher.contraAccountCode} - ${selectedVoucher.contraAccountName}` : '-', mono: true }
        ]}
        lineItemsHeader="Posting Jurnal Otomatis (GL Breakdown)"
        columns={[
          { header: 'Kode COA', accessor: 'coaCode', mono: true },
          { header: 'Nama Akun Buku Besar', accessor: 'accountName' },
          { header: 'Debet (Rp)', accessor: 'debit', align: 'right', isCurrency: true },
          { header: 'Kredit (Rp)', accessor: 'credit', align: 'right', isCurrency: true }
        ]}
        lineItems={[
          {
            coaCode: selectedVoucher?.voucherType === 'BKM' ? '1-10101' : (selectedVoucher?.contraAccountCode || '2-10100'),
            accountName: selectedVoucher?.voucherType === 'BKM' ? 'Kas Bank Utama HO' : (selectedVoucher?.contraAccountName || 'Utang Vendor'),
            debit: selectedVoucher?.amount || 0,
            credit: 0
          },
          {
            coaCode: selectedVoucher?.voucherType === 'BKM' ? (selectedVoucher?.contraAccountCode || '1-10400') : '1-10101',
            accountName: selectedVoucher?.voucherType === 'BKM' ? (selectedVoucher?.contraAccountName || 'Piutang') : 'Kas Bank Utama HO',
            debit: 0,
            credit: selectedVoucher?.amount || 0
          }
        ]}
        footerNotes="Voucher Bank memicu mutasi kas perbankan & bukti posting ledger resmi."
      />

      {/* Modal Terbitkan Voucher Bank */}
      <CreateBankVoucherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddVoucher}
      />
    </div>
  );
};

