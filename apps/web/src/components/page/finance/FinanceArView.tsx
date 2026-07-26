'use client';

import React, { useState } from 'react';
import { TrendingUp, FileText, Clock } from 'lucide-react';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
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
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3 px-4">No. Invoice</th>
                  <th className="py-3 px-4">Nama Pelanggan</th>
                  <th className="py-3 px-4">Unit Usaha</th>
                  <th className="py-3 px-4">Jatuh Tempo</th>
                  <th className="py-3 px-4 text-right">Nominal Tagihan</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Aksi Penerimaan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {arItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-600">{item.invoiceNumber}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{item.customerName}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.unitUsaha}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{item.dueDate}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-600">Rp {item.amount.toLocaleString('id-ID')}</td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge type={item.status === 'PAID' ? 'ACTIVE' : 'ALERT'} label={item.status} />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {item.status === 'PAID' ? (
                        <span className="font-mono text-emerald-600 font-bold">{item.receiptRef}</span>
                      ) : (
                        <button
                          onClick={() => handleOpenCollection(item)}
                          className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-sm cursor-pointer"
                        >
                          Konfirmasi Penerimaan
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
