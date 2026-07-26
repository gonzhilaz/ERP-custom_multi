'use client';

import React, { useState } from 'react';
import { CreditCard, FileText, Clock } from 'lucide-react';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
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
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3 px-4">No. Invoice Vendor</th>
                  <th className="py-3 px-4">Nama Pemasok (Supplier)</th>
                  <th className="py-3 px-4">Unit Usaha Pemesan</th>
                  <th className="py-3 px-4">Jatuh Tempo</th>
                  <th className="py-3 px-4 text-right">Nominal Tagihan</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Aksi Pembayaran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {apItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-600">{item.invoiceNumber}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{item.supplierName}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.unitUsaha}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{item.dueDate}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-rose-600">Rp {item.amount.toLocaleString('id-ID')}</td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge type={item.status === 'PAID' ? 'ACTIVE' : 'ALERT'} label={item.status} />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {item.status === 'PAID' ? (
                        <span className="font-mono text-emerald-600 font-bold">{item.paymentRef}</span>
                      ) : (
                        <button
                          onClick={() => handleOpenPayment(item)}
                          className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-sm cursor-pointer"
                        >
                          Bayar Utang
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
