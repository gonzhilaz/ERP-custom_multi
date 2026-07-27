'use client';

import React, { useState } from 'react';
import { CreditCard, FileText, Clock, Eye } from 'lucide-react';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';
import { ApAgingTab } from './ApAgingTab';

interface ApItem {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  unitUsaha: string;
  dueDate: string;
  amount: number;
  agingDays: number;
  status: 'UNPAID' | 'WAITING_APPROVAL' | 'PAID';
  paymentRef?: string;
  approvedBy?: string;
}

const INITIAL_AP_ITEMS: ApItem[] = [
  {
    id: 'ap-001',
    invoiceNumber: 'INV-SUP-2026-881',
    supplierName: 'PT Meat Prima Indonesia',
    unitUsaha: 'Nusantara Culinary & Catering',
    dueDate: '2026-08-05',
    amount: 94350000,
    agingDays: 19,
    status: 'UNPAID'
  },
  {
    id: 'ap-002',
    invoiceNumber: 'INV-SUP-2026-902',
    supplierName: 'PT Heavy Machinery Supply',
    unitUsaha: 'Kaltim Pertambangan Mandiri',
    dueDate: '2026-08-12',
    amount: 180000000,
    agingDays: 12,
    status: 'UNPAID'
  }
];

export const FinanceApView = () => {
  const [activeTab, setActiveTab] = useState<'DAFTAR_AP' | 'AGING_AP'>('DAFTAR_AP');
  const [apItems, setApItems] = useState<ApItem[]>(INITIAL_AP_ITEMS);
  const [selectedAp, setSelectedAp] = useState<ApItem | null>(null);
  const [detailApItem, setDetailApItem] = useState<ApItem | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    bankAccount: '1-10101 - Kas Bank Mandiri Utama Holding',
    paymentRefNo: 'BKK/2026/07/0104'
  });

  const handleOpenPayment = (item: ApItem) => {
    setSelectedAp(item);
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAp) return;

    setApItems((prev) =>
      prev.map((item) =>
        item.id === selectedAp.id
          ? {
              ...item,
              status: 'PAID',
              paymentRef: paymentForm.paymentRefNo,
              approvedBy: 'Senior Accounting HO'
            }
          : item
      )
    );

    setShowPaymentModal(false);
    setSelectedAp(null);
  };

  const subTabs: SubTabItem[] = [
    { id: 'DAFTAR_AP', label: 'Daftar Tagihan Utang', icon: FileText, count: apItems.filter(a => a.status !== 'PAID').length },
    { id: 'AGING_AP', label: 'Analisis Umur Utang (AP Aging)', icon: Clock }
  ];

  const columns: ColumnDef<ApItem>[] = [
    { key: 'invoiceNumber', header: 'No. Invoice Vendor', className: 'font-mono font-bold text-sky-600', render: (i) => i.invoiceNumber },
    { key: 'supplierName', header: 'Nama Pemasok (Supplier)', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.supplierName },
    { key: 'unitUsaha', header: 'Unit Usaha Pemesan', className: 'text-slate-500', render: (i) => i.unitUsaha },
    { key: 'dueDate', header: 'Jatuh Tempo', className: 'font-mono text-slate-500', render: (i) => i.dueDate },
    { key: 'amount', header: 'Nominal Tagihan', align: 'right', className: 'font-mono font-bold text-rose-600', render: (i) => `Rp ${i.amount.toLocaleString('id-ID')}` },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (i) => <StatusBadge type={i.status === 'PAID' ? 'ACTIVE' : 'ALERT'} label={i.status} />
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      render: (i) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => setDetailApItem(i)}
            className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
            title="Lihat Detail Tagihan"
          >
            <Eye className="w-4 h-4" />
          </button>
          {i.status === 'PAID' ? (
            <span className="font-mono text-emerald-600 font-bold text-[11px]">{i.paymentRef}</span>
          ) : (
            <button
              onClick={() => handleOpenPayment(i)}
              className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-sm cursor-pointer text-[11px]"
            >
              Bayar Utang
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Manajemen Utang Dagang (Accounts Payable)"
        icon={CreditCard}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Accounts Payable"
        glossaryItems={[
          { term: 'Tagihan Utang (AP Invoice)', description: 'Klaim penagihan dari pemasok/supplier atas pembelian barang atau jasa.' },
          { term: 'AP Aging Schedule', description: 'Analisis klasifikasi umur utang berdasarkan jatuh tempo pembayaran vendor.' }
        ]}
        badges={[
          { label: `${apItems.length} Tagihan Vendor`, variant: 'sky' },
          { label: 'Role Restrict: Finance Only', variant: 'slate' }
        ]}
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="sky"
      />

      {activeTab === 'AGING_AP' ? (
        <ApAgingTab />
      ) : (
        <DataTable
          headerTitle="Daftar Tagihan Utang Dagang Vendor"
          columns={columns}
          data={apItems}
          keyExtractor={(i) => i.id}
        />
      )}

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={detailApItem !== null}
        onClose={() => setDetailApItem(null)}
        title="Detail Tagihan Utang Vendor (Accounts Payable)"
        subtitle={detailApItem ? `${detailApItem.invoiceNumber} • ${detailApItem.supplierName}` : ''}
        badgeLabel={detailApItem?.status}
        badgeType={detailApItem?.status === 'PAID' ? 'ACTIVE' : 'ALERT'}
        summaryCards={[
          { label: 'Nominal Tagihan', value: detailApItem ? `Rp ${detailApItem.amount.toLocaleString('id-ID')}` : '0', color: 'text-rose-600' },
          { label: 'Aging (Umur Tagihan)', value: detailApItem ? `${detailApItem.agingDays} Hari` : '0 Hari' },
          { label: 'Status Pembayaran', value: detailApItem?.status || '-', color: detailApItem?.status === 'PAID' ? 'text-emerald-600' : 'text-amber-600' }
        ]}
        metadata={[
          { label: 'No. Invoice Vendor', value: detailApItem?.invoiceNumber, mono: true, highlight: true },
          { label: 'Nama Pemasok', value: detailApItem?.supplierName },
          { label: 'Unit Usaha Pemesan', value: detailApItem?.unitUsaha },
          { label: 'Jatuh Tempo', value: detailApItem?.dueDate, mono: true },
          { label: 'Voucher Ref Bayar', value: detailApItem?.paymentRef || 'Belum Di-settle', mono: true },
          { label: 'Disetujui Oleh', value: detailApItem?.approvedBy || 'Pending Accounting Approval' }
        ]}
        lineItemsHeader="Pos Alokasi Akun Buku Besar (GL Impact)"
        columns={[
          { header: 'Kode COA', accessor: 'coaCode', mono: true },
          { header: 'Nama Akun Buku Besar', accessor: 'accountName' },
          { header: 'Debet (Rp)', accessor: 'debit', align: 'right', isCurrency: true },
          { header: 'Kredit (Rp)', accessor: 'credit', align: 'right', isCurrency: true }
        ]}
        lineItems={[
          { coaCode: '5-10100', accountName: 'Beban Pembelian Bahan Baku / Stok Goods', debit: detailApItem?.amount || 0, credit: 0 },
          { coaCode: '2-10100', accountName: 'Utang Dagang Vendor (AP Sub-Ledger)', debit: 0, credit: detailApItem?.amount || 0 }
        ]}
        footerNotes="Tagihan utang vendor terintegrasi otomatis dengan modul Procurement/Purchase Order & Gudang."
      />

      {/* Payment Modal */}
      {showPaymentModal && selectedAp && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl text-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Konfirmasi Pembayaran Utang Vendor</h3>
            <form onSubmit={handleConfirmPayment} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">No. Voucher Bank Keluar (BKK)</label>
                <input
                  type="text"
                  value={paymentForm.paymentRefNo}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentRefNo: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border font-mono font-semibold"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowPaymentModal(false)} className="px-3 py-1.5 bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer">
                  Batal
                </button>
                <button type="submit" className="px-4 py-1.5 bg-sky-600 text-white font-bold rounded-lg cursor-pointer">
                  Simpan & Bayar Utang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

