'use client';

import React, { useState } from 'react';
import { Wallet, Plus, ArrowDownLeft, ArrowUpRight, CheckCircle2, FileText, Eye } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { CreateCashVoucherModal } from '@/components/ui/modals/CreateCashVoucherModal';
import { CreateGiroModal } from '@/components/ui/modals/CreateGiroModal';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

interface CashVoucherRow {
  voucherNumber: string;
  date: string;
  voucherType: 'VKM' | 'VKK';
  cashierName: string;
  payeeOrPayer: string;
  amount: number;
  description: string;
  contraAccountCode: string;
  contraAccountName: string;
  status: string;
}

interface GiroRow {
  giroNumber: string;
  type: 'GIRO_MASUK' | 'GIRO_KELUAR';
  bankName: string;
  issueDate: string;
  dueDate: string;
  issuerOrPayee: string;
  amount: number;
  description: string;
  status: 'DITERIMA' | 'DIENDAPKAN' | 'CAIR' | 'DITOLAK';
}

export const FinanceCashView = () => {
  const [activeTab, setActiveTab] = useState<'VKM' | 'VKK' | 'GIRO'>('VKM');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [isGiroModalOpen, setIsGiroModalOpen] = useState(false);
  const [selectedCash, setSelectedCash] = useState<CashVoucherRow | null>(null);
  const [selectedGiro, setSelectedGiro] = useState<GiroRow | null>(null);

  const [cashVouchers, setCashVouchers] = useState<CashVoucherRow[]>([
    { voucherNumber: 'VKM/2026/07/0014', date: '2026-07-24', voucherType: 'VKM', cashierName: 'Kasir Utama HO', payeeOrPayer: 'Bpk. H. Ahmad Fauzi', amount: 35000000, description: 'Setoran Tunai Hasil Penjualan Resto F&B Cabang Selatan', contraAccountCode: '4-10100', contraAccountName: 'Pendapatan Penjualan Resto', status: 'POSTED' },
    { voucherNumber: 'VKK/2026/07/0038', date: '2026-07-23', voucherType: 'VKK', cashierName: 'Kasir Utama HO', payeeOrPayer: 'CV Buana Jaya Freight', amount: 1250000, description: 'Pembayaran Ongkos Kirim Tunai Expedisi Logistik HQ', contraAccountCode: '6-10200', contraAccountName: 'Beban Pengiriman & Ekspedisi', status: 'POSTED' }
  ]);

  const [giros, setGiros] = useState<GiroRow[]>([
    { giroNumber: 'GM-981240', type: 'GIRO_MASUK', bankName: 'Bank BCA', issueDate: '2026-07-15', dueDate: '2026-07-30', issuerOrPayee: 'PT Kalimantan Mining Resources', amount: 250000000, description: 'Giro Masuk Pelunasan Tagihan Tambang Batu Bara', status: 'DIENDAPKAN' },
    { giroNumber: 'GK-441092', type: 'GIRO_KELUAR', bankName: 'Bank Mandiri', issueDate: '2026-07-10', dueDate: '2026-07-24', issuerOrPayee: 'PT Heavy Machinery Supply', amount: 180000000, description: 'Giro Keluar Pembayaran Sparepart Alat Berat', status: 'CAIR' }
  ]);

  const subTabs: SubTabItem[] = [
    { id: 'VKM', label: 'Kas Masuk (VKM)', icon: ArrowDownLeft, count: cashVouchers.filter(c => c.voucherType === 'VKM').length },
    { id: 'VKK', label: 'Kas Keluar (VKK)', icon: ArrowUpRight, count: cashVouchers.filter(c => c.voucherType === 'VKK').length },
    { id: 'GIRO', label: 'Manajemen Giro (Clearing)', icon: FileText, count: giros.filter(g => g.status === 'DIENDAPKAN').length }
  ];

  const handleAddCashVoucher = (newVoucher: CashVoucherRow) => {
    setCashVouchers([newVoucher, ...cashVouchers]);
  };

  const handleAddGiro = (newGiro: GiroRow) => {
    setGiros([newGiro, ...giros]);
  };

  const handleClearGiro = (giroNumber: string) => {
    setGiros(giros.map(g => g.giroNumber === giroNumber ? { ...g, status: 'CAIR' } : g));
  };

  const filteredCash = cashVouchers.filter(
    (c) =>
      c.voucherType === activeTab &&
      (c.voucherNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.payeeOrPayer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredGiros = giros.filter(
    (g) =>
      g.giroNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.issuerOrPayee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.bankName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cashColumns: ColumnDef<CashVoucherRow>[] = [
    { key: 'voucherNumber', header: 'No. Voucher Kas', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.voucherNumber },
    { key: 'date', header: 'Tanggal', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'cashierName', header: 'Petugas Kasir', render: (i) => i.cashierName },
    { key: 'payeeOrPayer', header: 'Penerima / Pembayar', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.payeeOrPayer },
    { key: 'description', header: 'Keterangan Voucher Tunai', render: (i) => i.description },
    { key: 'amount', header: 'Nominal Kas (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => `Rp ${i.amount.toLocaleString('id-ID')}` },
    { key: 'status', header: 'Status', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.status}</span> },
    {
      key: 'actions',
      header: 'Detail',
      align: 'center',
      render: (i) => (
        <button
          onClick={() => setSelectedCash(i)}
          className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
          title="Lihat Detail Voucher Kas"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  const giroColumns: ColumnDef<GiroRow>[] = [
    { key: 'giroNumber', header: 'No. Warkat Giro', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.giroNumber },
    {
      key: 'type',
      header: 'Tipe Warkat',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.type === 'GIRO_MASUK' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
        }`}>
          {i.type === 'GIRO_MASUK' ? 'Giro Masuk (GM)' : 'Giro Keluar (GK)'}
        </span>
      )
    },
    { key: 'bankName', header: 'Bank Penerbit', render: (i) => i.bankName },
    { key: 'dueDate', header: 'Jatuh Tempo Kliring', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => i.dueDate },
    { key: 'issuerOrPayee', header: 'Penarik / Penerima', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.issuerOrPayee },
    { key: 'amount', header: 'Nominal Warkat (Rp)', align: 'right', className: 'font-mono font-bold text-slate-900 dark:text-white', render: (i) => `Rp ${i.amount.toLocaleString('id-ID')}` },
    {
      key: 'status',
      header: 'Status Kliring',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.status === 'CAIR' ? 'bg-emerald-500/10 text-emerald-600' : i.status === 'DIENDAPKAN' ? 'bg-amber-500/10 text-amber-600' : 'bg-rose-500/10 text-rose-600'
        }`}>
          {i.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      render: (i) => (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => setSelectedGiro(i)}
            className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
            title="Lihat Detail Warkat Giro"
          >
            <Eye className="w-4 h-4" />
          </button>
          {i.status === 'DIENDAPKAN' && (
            <button onClick={() => handleClearGiro(i.giroNumber)} className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 font-bold rounded-lg flex items-center gap-1 cursor-pointer text-[10px]">
              <CheckCircle2 className="w-3 h-3" />
              <span>Cairkan</span>
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Kas Utama HO & Manajemen Giro"
        icon={Wallet}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Main Cash & Giro Management"
        glossaryItems={[
          { term: 'Voucher Kas Masuk (VKM)', description: 'Penerimaan tunai resmi di Kasir Utama HO (Main Cashier Office).' },
          { term: 'Voucher Kas Keluar (VKK)', description: 'Pengeluaran tunai resmi dari Kasir Utama HO untuk operasional holding.' },
          { term: 'Giro Masuk (GM)', description: 'Penerimaan warkat giro dari pelanggan yang diendapkan hingga tanggal cair.' },
          { term: 'Giro Keluar (GK)', description: 'Penerbitan warkat giro perusahaan kepada vendor yang jatuh tempo disahut bank.' }
        ]}
        badges={[
          { label: 'Main Cashier Active', variant: 'emerald' },
          { label: 'Giro Clearing Register', variant: 'sky' }
        ]}
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="sky"
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Cari voucher / warkat pada ${activeTab}...`}
          />
        </div>
        {activeTab !== 'GIRO' ? (
          <button onClick={() => setIsCashModalOpen(true)} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs shrink-0">
            <Plus className="w-4 h-4" />
            <span>Terbitkan Voucher Kas</span>
          </button>
        ) : (
          <button onClick={() => setIsGiroModalOpen(true)} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs shrink-0">
            <Plus className="w-4 h-4" />
            <span>Terbitkan Warkat Giro</span>
          </button>
        )}
      </div>

      {activeTab !== 'GIRO' ? (
        <DataTable
          headerTitle={`Register Voucher ${activeTab === 'VKM' ? 'Kas Masuk' : 'Kas Keluar'} (${filteredCash.length})`}
          columns={cashColumns}
          data={filteredCash}
          keyExtractor={(i) => i.voucherNumber}
        />
      ) : (
        <DataTable
          headerTitle={`Register Warkat Cek & Giro Perbankan (${filteredGiros.length})`}
          columns={giroColumns}
          data={filteredGiros}
          keyExtractor={(i) => i.giroNumber}
        />
      )}

      {/* Cash Voucher Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedCash !== null}
        onClose={() => setSelectedCash(null)}
        title={`Detail Voucher ${selectedCash?.voucherType === 'VKM' ? 'Kas Masuk (VKM)' : 'Kas Keluar (VKK)'}`}
        subtitle={selectedCash ? `${selectedCash.voucherNumber} • Tanggal: ${selectedCash.date}` : ''}
        badgeLabel={selectedCash?.status}
        badgeType="ACTIVE"
        summaryCards={[
          { label: 'Nominal Kas', value: selectedCash ? `Rp ${selectedCash.amount.toLocaleString('id-ID')}` : '0', color: selectedCash?.voucherType === 'VKM' ? 'text-emerald-600' : 'text-rose-600' },
          { label: 'Tipe Voucher', value: selectedCash?.voucherType || '-' },
          { label: 'Petugas Kasir', value: selectedCash?.cashierName || '-' }
        ]}
        metadata={[
          { label: 'No. Voucher Kas', value: selectedCash?.voucherNumber, mono: true, highlight: true },
          { label: 'Tanggal Transaksi', value: selectedCash?.date, mono: true },
          { label: 'Nama Pihak Terkait', value: selectedCash?.payeeOrPayer },
          { label: 'Akun Kontra (Lawan)', value: selectedCash ? `${selectedCash.contraAccountCode} - ${selectedCash.contraAccountName}` : '-' }
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
            coaCode: selectedCash?.voucherType === 'VKM' ? '1-10100' : (selectedCash?.contraAccountCode || '6-10200'),
            accountName: selectedCash?.voucherType === 'VKM' ? 'Kas Kasir Utama HO' : (selectedCash?.contraAccountName || 'Beban Operasional'),
            debit: selectedCash?.amount || 0,
            credit: 0
          },
          {
            coaCode: selectedCash?.voucherType === 'VKM' ? (selectedCash?.contraAccountCode || '4-10100') : '1-10100',
            accountName: selectedCash?.voucherType === 'VKM' ? (selectedCash?.contraAccountName || 'Pendapatan') : 'Kas Kasir Utama HO',
            debit: 0,
            credit: selectedCash?.amount || 0
          }
        ]}
        footerNotes="Pengeluaran dan penerimaan kas tunai wajib divalidasi oleh Kasir Utama HO."
      />

      {/* Giro Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedGiro !== null}
        onClose={() => setSelectedGiro(null)}
        title="Detail Warkat Cek & Giro Perbankan"
        subtitle={selectedGiro ? `${selectedGiro.giroNumber} • ${selectedGiro.bankName}` : ''}
        badgeLabel={selectedGiro?.status}
        badgeType={selectedGiro?.status === 'CAIR' ? 'ACTIVE' : selectedGiro?.status === 'DIENDAPKAN' ? 'NEUTRAL' : 'ALERT'}
        summaryCards={[
          { label: 'Nominal Giro', value: selectedGiro ? `Rp ${selectedGiro.amount.toLocaleString('id-ID')}` : '0' },
          { label: 'Tipe Warkat', value: selectedGiro?.type === 'GIRO_MASUK' ? 'Giro Masuk' : 'Giro Keluar' },
          { label: 'Jatuh Tempo Kliring', value: selectedGiro?.dueDate || '-' }
        ]}
        metadata={[
          { label: 'No. Warkat Giro', value: selectedGiro?.giroNumber, mono: true, highlight: true },
          { label: 'Bank Penerbit', value: selectedGiro?.bankName },
          { label: 'Tanggal Terbit', value: selectedGiro?.issueDate, mono: true },
          { label: 'Penarik / Penerima', value: selectedGiro?.issuerOrPayee },
          { label: 'Keterangan Giro', value: selectedGiro?.description }
        ]}
        footerNotes="Warkat giro yang telah dicairkan akan memutasi rekening bank dan akun clearing giro otomatis."
      />

      {/* Create Modals */}
      <CreateCashVoucherModal
        isOpen={isCashModalOpen}
        onClose={() => setIsCashModalOpen(false)}
        onSubmit={handleAddCashVoucher}
      />

      <CreateGiroModal
        isOpen={isGiroModalOpen}
        onClose={() => setIsGiroModalOpen(false)}
        onSubmit={handleAddGiro}
      />
    </div>
  );
};

