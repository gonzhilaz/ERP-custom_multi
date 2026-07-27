'use client';

import React, { useState } from 'react';
import { TrendingUp, FileText, Clock, Eye } from 'lucide-react';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';
import { ArAgingTab } from './ArAgingTab';

interface ArItem {
  id: string;
  invoiceNumber: string;
  customerName: string;
  unitUsaha: string;
  dueDate: string;
  amount: number;
  agingDays: number;
  status: 'UNPAID' | 'WAITING_APPROVAL' | 'PAID';
  receiptRef?: string;
  proofFile?: string;
  approvedBy?: string;
}

const INITIAL_AR_ITEMS: ArItem[] = [
  {
    id: 'ar-001',
    invoiceNumber: 'INV-CLI-2026-104',
    customerName: 'PT Freeport Supplier Partner',
    unitUsaha: 'Nusantara Culinary & Catering',
    dueDate: '2026-08-10',
    amount: 140000000,
    agingDays: 14,
    status: 'UNPAID'
  },
  {
    id: 'ar-002',
    invoiceNumber: 'INV-CLI-2026-099',
    customerName: 'Kementerian ESDM Event Reserve',
    unitUsaha: 'Grand Royal Hotel & Resort',
    dueDate: '2026-08-15',
    amount: 200000000,
    agingDays: 8,
    status: 'UNPAID'
  }
];

export const FinanceArView = () => {
  const [activeTab, setActiveTab] = useState<'DAFTAR_AR' | 'AGING_AR'>('DAFTAR_AR');
  const [arItems, setArItems] = useState<ArItem[]>(INITIAL_AR_ITEMS);
  const [selectedAr, setSelectedAr] = useState<ArItem | null>(null);
  const [detailArItem, setDetailArItem] = useState<ArItem | null>(null);
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  const [collectionForm, setCollectionForm] = useState({
    paymentMethod: 'BANK_TRANSFER',
    bankAccount: '1-10101 - Kas Bank Mandiri Utama Holding',
    receiptRefNo: 'RCV-BCA-889102',
    proofFileName: 'Kwitansi_Resmi_Penerimaan_140M.pdf',
    notes: 'Pelunasan invoice catering massal event VIP'
  });

  const handleOpenCollection = (item: ArItem) => {
    setSelectedAr(item);
    setShowCollectionModal(true);
  };

  const handleConfirmCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAr) return;

    setArItems((prev) =>
      prev.map((item) =>
        item.id === selectedAr.id
          ? {
              ...item,
              status: 'PAID',
              receiptRef: collectionForm.receiptRefNo,
              proofFile: collectionForm.proofFileName,
              approvedBy: 'Senior Accounting HO'
            }
          : item
      )
    );

    setShowCollectionModal(false);
    setSelectedAr(null);
  };

  const subTabs: SubTabItem[] = [
    { id: 'DAFTAR_AR', label: 'Daftar Tagihan Piutang', icon: FileText, count: arItems.filter(a => a.status !== 'PAID').length },
    { id: 'AGING_AR', label: 'Analisis Umur Piutang (AR Aging)', icon: Clock }
  ];

  const columns: ColumnDef<ArItem>[] = [
    { key: 'invoiceNumber', header: 'No. Invoice', className: 'font-mono font-bold text-sky-600', render: (i) => i.invoiceNumber },
    { key: 'customerName', header: 'Nama Pelanggan', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.customerName },
    { key: 'unitUsaha', header: 'Unit Usaha', className: 'text-slate-500', render: (i) => i.unitUsaha },
    { key: 'dueDate', header: 'Jatuh Tempo', className: 'font-mono text-slate-500', render: (i) => i.dueDate },
    { key: 'amount', header: 'Nominal Tagihan', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (i) => `Rp ${i.amount.toLocaleString('id-ID')}` },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (i) => <StatusBadge type={i.status === 'PAID' ? 'ACTIVE' : 'ALERT'} label={i.status} />
    },
    {
      key: 'actions',
      header: 'Aksi Penerimaan',
      align: 'center',
      render: (i) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => setDetailArItem(i)}
            className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
            title="Lihat Detail Piutang"
          >
            <Eye className="w-4 h-4" />
          </button>
          {i.status === 'PAID' ? (
            <span className="font-mono text-emerald-600 font-bold text-[11px]">{i.receiptRef}</span>
          ) : (
            <button
              onClick={() => handleOpenCollection(i)}
              className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-sm cursor-pointer text-[11px]"
            >
              Konfirmasi Penerimaan
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Manajemen Piutang Dagang (Accounts Receivable)"
        icon={TrendingUp}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Accounts Receivable"
        glossaryItems={[
          { term: 'Tagihan Piutang (AR Invoice)', description: 'Klaim penagihan pembayaran produk/jasa kepada pelanggan.' },
          { term: 'AR Aging Schedule', description: 'Analisis klasifikasi umur piutang berdasarkan tingkat keterlambatan pembayaran.' },
          { term: 'Cadangan Bad Debt', description: 'Alokasi kerugian piutang tak tertagih berdasarkan kebijakan akuntansi.' }
        ]}
        badges={[
          { label: `${arItems.length} Tagihan Active`, variant: 'sky' },
          { label: 'Role Restrict: Finance Only', variant: 'slate' }
        ]}
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="sky"
      />

      {activeTab === 'AGING_AR' ? (
        <ArAgingTab />
      ) : (
        <DataTable
          headerTitle="Daftar Tagihan Piutang Dagang Pelanggan"
          columns={columns}
          data={arItems}
          keyExtractor={(i) => i.id}
        />
      )}

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={detailArItem !== null}
        onClose={() => setDetailArItem(null)}
        title="Detail Tagihan Piutang Pelanggan (Accounts Receivable)"
        subtitle={detailArItem ? `${detailArItem.invoiceNumber} • ${detailArItem.customerName}` : ''}
        badgeLabel={detailArItem?.status}
        badgeType={detailArItem?.status === 'PAID' ? 'ACTIVE' : 'ALERT'}
        summaryCards={[
          { label: 'Nominal Piutang', value: detailArItem ? `Rp ${detailArItem.amount.toLocaleString('id-ID')}` : '0', color: 'text-emerald-600' },
          { label: 'Aging (Umur Tagihan)', value: detailArItem ? `${detailArItem.agingDays} Hari` : '0 Hari' },
          { label: 'Status Penagihan', value: detailArItem?.status || '-', color: detailArItem?.status === 'PAID' ? 'text-emerald-600' : 'text-amber-600' }
        ]}
        metadata={[
          { label: 'No. Invoice AR', value: detailArItem?.invoiceNumber, mono: true, highlight: true },
          { label: 'Nama Pelanggan', value: detailArItem?.customerName },
          { label: 'Unit Usaha Penerbit', value: detailArItem?.unitUsaha },
          { label: 'Jatuh Tempo', value: detailArItem?.dueDate, mono: true },
          { label: 'Kwitansi Receipt', value: detailArItem?.receiptRef || 'Belum Lunas', mono: true },
          { label: 'File Bukti Bayar', value: detailArItem?.proofFile || 'Tidak Ada Lampiran' }
        ]}
        lineItemsHeader="Pos Alokasi Akun Buku Besar (GL Posting)"
        columns={[
          { header: 'Kode COA', accessor: 'coaCode', mono: true },
          { header: 'Nama Akun Buku Besar', accessor: 'accountName' },
          { header: 'Debet (Rp)', accessor: 'debit', align: 'right', isCurrency: true },
          { header: 'Kredit (Rp)', accessor: 'credit', align: 'right', isCurrency: true }
        ]}
        lineItems={[
          { coaCode: '1-10400', accountName: 'Piutang Usaha Pelanggan (AR Sub-Ledger)', debit: detailArItem?.amount || 0, credit: 0 },
          { coaCode: '4-10100', accountName: 'Pendapatan Penjualan Produksi / Layanan', debit: 0, credit: Math.round((detailArItem?.amount || 0) / 1.12) },
          { coaCode: '2-10300', accountName: 'Utang PPN Keluaran (12%)', debit: 0, credit: (detailArItem?.amount || 0) - Math.round((detailArItem?.amount || 0) / 1.12) }
        ]}
        footerNotes="Tagihan piutang diterbitkan otomatis oleh sistem saat penyerahan produk/layanan disetujui."
      />

      {/* Collection Modal */}
      {showCollectionModal && selectedAr && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl text-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Konfirmasi Penerimaan Piutang</h3>
            <form onSubmit={handleConfirmCollection} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">No. Kwitansi Receipt</label>
                <input
                  type="text"
                  value={collectionForm.receiptRefNo}
                  onChange={(e) => setCollectionForm({ ...collectionForm, receiptRefNo: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border font-mono font-semibold"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowCollectionModal(false)} className="px-3 py-1.5 bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer">
                  Batal
                </button>
                <button type="submit" className="px-4 py-1.5 bg-sky-600 text-white font-bold rounded-lg cursor-pointer">
                  Simpan & Terbitkan Kwitansi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

