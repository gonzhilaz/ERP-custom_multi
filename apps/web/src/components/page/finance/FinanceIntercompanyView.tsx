'use client';

import React, { useState } from 'react';
import { Building2, CheckCircle2, Plus, X, Eye } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

interface EliminationTx {
  id: string;
  txCode: string;
  sellerUnit: string;
  buyerUnit: string;
  description: string;
  amount: number;
  eliminationStatus: string;
  eliminationDate: string;
}

const INITIAL_ELIMINATIONS: EliminationTx[] = [
  {
    id: 'ic-001',
    txCode: 'IC-TX-2026-0044',
    sellerUnit: 'Nusantara Culinary & Catering',
    buyerUnit: 'PT Borneo Mining Emas',
    description: 'Pasokan Katering Makan Siang Lapangan Site Tambang Gold-01',
    amount: 120000000,
    eliminationStatus: 'ELIMINATED_IN_CONSOLIDATION',
    eliminationDate: '2026-07-23'
  },
  {
    id: 'ic-002',
    txCode: 'IC-TX-2026-0045',
    sellerUnit: 'Nusantara Bakery & Resto',
    buyerUnit: 'Hotel Grand Nusantara',
    description: 'Pasokan Roti Sarapan Pagi & Pastry Executive Lounge',
    amount: 45000000,
    eliminationStatus: 'ELIMINATED_IN_CONSOLIDATION',
    eliminationDate: '2026-07-24'
  }
];

export const FinanceIntercompanyView = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<EliminationTx[]>(INITIAL_ELIMINATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedIcItem, setSelectedIcItem] = useState<EliminationTx | null>(null);

  const [form, setForm] = useState({
    sellerUnit: 'Nusantara Culinary & Catering',
    buyerUnit: 'PT Borneo Mining Emas',
    description: '',
    amount: 50000000
  });

  const unitOptions = [
    { id: 'Nusantara Culinary & Catering', value: 'Nusantara Culinary & Catering', label: 'Nusantara Culinary & Catering' },
    { id: 'Nusantara Bakery & Resto', value: 'Nusantara Bakery & Resto', label: 'Nusantara Bakery & Resto' },
    { id: 'Hotel Grand Nusantara', value: 'Hotel Grand Nusantara', label: 'Hotel Grand Nusantara' },
    { id: 'PT Borneo Mining Emas', value: 'PT Borneo Mining Emas', label: 'PT Borneo Mining Emas' }
  ];

  const canManage = Boolean(user);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || form.amount <= 0) return;

    const newTx: EliminationTx = {
      id: `ic-${Date.now()}`,
      txCode: `IC-TX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      sellerUnit: form.sellerUnit,
      buyerUnit: form.buyerUnit,
      description: form.description,
      amount: form.amount,
      eliminationStatus: 'ELIMINATED_IN_CONSOLIDATION',
      eliminationDate: new Date().toISOString().split('T')[0]
    };

    setItems([newTx, ...items]);
    setShowModal(false);
    setForm({
      sellerUnit: 'Nusantara Culinary & Catering',
      buyerUnit: 'PT Borneo Mining Emas',
      description: '',
      amount: 50000000
    });
  };

  const filteredItems = items.filter(
    (i) =>
      i.txCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.sellerUnit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.buyerUnit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<EliminationTx>[] = [
    { key: 'txCode', header: 'Kode Ref', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.txCode },
    { key: 'sellerUnit', header: 'Unit Penjual (Seller)', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.sellerUnit },
    { key: 'buyerUnit', header: 'Unit Pembeli (Buyer)', className: 'text-slate-600 dark:text-slate-300', render: (i) => i.buyerUnit },
    { key: 'description', header: 'Keterangan Transaksi', className: 'text-slate-500', render: (i) => i.description },
    { key: 'amount', header: 'Nominal Eliminasi', align: 'right', className: 'font-mono font-bold text-slate-900 dark:text-white', render: (i) => `Rp ${i.amount.toLocaleString('id-ID')}` },
    {
      key: 'eliminationStatus',
      header: 'Status Laporan',
      align: 'center',
      render: () => (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-mono">
          TER-ELIMINASI
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Detail',
      align: 'center',
      render: (i) => (
        <button
          onClick={() => setSelectedIcItem(i)}
          className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
          title="Lihat Detail Transaksi Intercompany"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Eliminasi Inter-Company"
        icon={Building2}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Intercompany Consolidation"
        glossaryItems={[
          { term: 'Eliminasi Inter-Company', description: 'Pengeliminasian otomatis saldo transaksi antar anak perusahaan agar tidak terjadi ganda penghitungan (double counting) pada laporan konsolidasi holding.' },
          { term: 'Consolidated P&L', description: 'Laporan Laba Rugi Gabungan Holding Enterprise yang bersih dari profit margin internal.' }
        ]}
        badges={[
          { label: `${items.length} Transaksi Ter-Eliminasi`, variant: 'sky' },
          { label: 'Auto Consolidation Sync ✓', variant: 'emerald' }
        ]}
        actions={
          canManage && (
            <button
              onClick={() => setShowModal(true)}
              className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Catat Inter-Company</span>
            </button>
          )
        }
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari kode ref, unit usaha, atau keterangan..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Register Transaksi Antar-Unit Ter-Eliminasi (${filteredItems.length})`}
        columns={columns}
        data={filteredItems}
        keyExtractor={(i) => i.id}
      />

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedIcItem !== null}
        onClose={() => setSelectedIcItem(null)}
        title="Detail Eliminasi Transaksi Inter-Company"
        subtitle={selectedIcItem ? `${selectedIcItem.txCode} • Tanggal: ${selectedIcItem.eliminationDate}` : ''}
        badgeLabel="ELIMINATED IN CONSOLIDATION"
        badgeType="ACTIVE"
        summaryCards={[
          { label: 'Nominal Eliminasi', value: selectedIcItem ? `Rp ${selectedIcItem.amount.toLocaleString('id-ID')}` : '0', color: 'text-sky-600' },
          { label: 'Unit Penjual', value: selectedIcItem?.sellerUnit || '-' },
          { label: 'Unit Pembeli', value: selectedIcItem?.buyerUnit || '-' }
        ]}
        metadata={[
          { label: 'Kode Transaksi IC', value: selectedIcItem?.txCode, mono: true, highlight: true },
          { label: 'Tanggal Eliminasi', value: selectedIcItem?.eliminationDate, mono: true },
          { label: 'Unit Usaha Seller', value: selectedIcItem?.sellerUnit },
          { label: 'Unit Usaha Buyer', value: selectedIcItem?.buyerUnit },
          { label: 'Deskripsi Transaksi', value: selectedIcItem?.description }
        ]}
        lineItemsHeader="Pos Eliminasi Jurnal Konsolidasi Holding"
        columns={[
          { header: 'Kode COA', accessor: 'coaCode', mono: true },
          { header: 'Nama Akun Eliminasi', accessor: 'accountName' },
          { header: 'Debet (Rp)', accessor: 'debit', align: 'right', isCurrency: true },
          { header: 'Kredit (Rp)', accessor: 'credit', align: 'right', isCurrency: true }
        ]}
        lineItems={[
          { coaCode: '4-10900', accountName: 'Pendapatan Inter-Company (Eliminasi Debet)', debit: selectedIcItem?.amount || 0, credit: 0 },
          { coaCode: '5-10900', accountName: 'Beban Inter-Company (Eliminasi Kredit)', debit: 0, credit: selectedIcItem?.amount || 0 }
        ]}
        footerNotes="Eliminasi dilakukan secara otomatis oleh sistem konsolidasi holding pada akhir periode."
      />

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-500" />
                <span>Transaksi Inter-Company Baru</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit Usaha Penjual (Seller)</label>
                <SearchableSelect
                  options={unitOptions}
                  value={form.sellerUnit}
                  onChange={(val) => setForm({ ...form, sellerUnit: val })}
                  placeholder="Pilih Unit Penjual..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit Usaha Pembeli (Buyer)</label>
                <SearchableSelect
                  options={unitOptions}
                  value={form.buyerUnit}
                  onChange={(val) => setForm({ ...form, buyerUnit: val })}
                  placeholder="Pilih Unit Pembeli..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Transaksi Inter-Company</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pasokan Suplai Bahan Baku / Servis Armada"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nominal Transaksi (Rp)</label>
                <input
                  type="number"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-500 shadow-sm cursor-pointer"
                >
                  Simpan & Auto-Eliminasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

