'use client';

import React, { useState } from 'react';
import { Layers, Search, Eye } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

interface SubsidiaryEntry {
  id: string;
  subAccountCode: string;
  entityName: string; // Customer / Supplier Name
  entityType: 'CUSTOMER_AR' | 'SUPPLIER_AP';
  refInvoice: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  runningBalance: number;
}

export const FinanceSubsidiaryLedgerView = ({ defaultType }: { defaultType?: 'CUSTOMER_AR' | 'SUPPLIER_AP' }) => {
  const [filterType, setFilterType] = useState<'ALL' | 'CUSTOMER_AR' | 'SUPPLIER_AP'>(defaultType || 'ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSub, setSelectedSub] = useState<SubsidiaryEntry | null>(null);

  const mockSubsidiaryData: SubsidiaryEntry[] = [
    { id: '1', subAccountCode: 'AR-CUST-001', entityName: 'PT Nusantara Jaya Mandiri', entityType: 'CUSTOMER_AR', refInvoice: 'INV/2026/07/0012', date: '2026-07-10', description: 'Penjualan Katering Event Corporate', debit: 45000000, credit: 0, runningBalance: 45000000 },
    { id: '2', subAccountCode: 'AR-CUST-001', entityName: 'PT Nusantara Jaya Mandiri', entityType: 'CUSTOMER_AR', refInvoice: 'PAY/2026/07/0088', date: '2026-07-20', description: 'Pelunasan Bank Transfer Mandiri', debit: 0, credit: 25000000, runningBalance: 20000000 },
    { id: '3', subAccountCode: 'AP-SUPP-102', entityName: 'PT Meat Prima Indonesia', entityType: 'SUPPLIER_AP', refInvoice: 'PO/2026/07/0411', date: '2026-07-12', description: 'Pembelian Daging Import 3-Way Verified', debit: 0, credit: 94350000, runningBalance: 94350000 },
    { id: '4', subAccountCode: 'AP-SUPP-102', entityName: 'PT Meat Prima Indonesia', entityType: 'SUPPLIER_AP', refInvoice: 'PAY/2026/07/0120', date: '2026-07-22', description: 'Pembayaran Giro Bank Permata', debit: 50000000, credit: 0, runningBalance: 44350000 }
  ];

  const filteredData = mockSubsidiaryData.filter((s) => {
    const matchesType = filterType === 'ALL' || s.entityType === filterType;
    const matchesSearch =
      s.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subAccountCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.refInvoice.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const columns: ColumnDef<SubsidiaryEntry>[] = [
    { key: 'subAccountCode', header: 'Kode Kartu Sub', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.subAccountCode },
    { key: 'entityName', header: 'Nama Relasi / Entity', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.entityName },
    { key: 'refInvoice', header: 'No. Tagihan / Ref', className: 'font-mono text-slate-600 dark:text-slate-400', render: (i) => i.refInvoice },
    { key: 'date', header: 'Tanggal', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'description', header: 'Keterangan Mutasi Kartu', render: (i) => i.description },
    { key: 'debit', header: 'Debet (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => i.debit ? `Rp ${i.debit.toLocaleString('id-ID')}` : '-' },
    { key: 'credit', header: 'Kredit (Rp)', align: 'right', className: 'font-mono font-bold text-rose-600 dark:text-rose-400', render: (i) => i.credit ? `Rp ${i.credit.toLocaleString('id-ID')}` : '-' },
    { key: 'runningBalance', header: 'Saldo Akhir Kartu (Rp)', align: 'right', className: 'font-mono font-bold text-slate-900 dark:text-white', render: (i) => `Rp ${i.runningBalance.toLocaleString('id-ID')}` },
    {
      key: 'actions',
      header: 'Detail',
      align: 'center',
      render: (i) => (
        <button
          onClick={() => setSelectedSub(i)}
          className="p-1.5 hover:bg-violet-50 dark:hover:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-lg cursor-pointer transition-colors"
          title="Lihat Detail Kartu Pembantu"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  const titleText =
    defaultType === 'CUSTOMER_AR'
      ? 'Buku Besar Pembantu Piutang (AR Subsidiary Ledger)'
      : defaultType === 'SUPPLIER_AP'
      ? 'Buku Besar Pembantu Utang (AP Subsidiary Ledger)'
      : 'Buku Besar Pembantu (Subsidiary Ledger General)';

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title={titleText}
        icon={Layers}
        iconBgColor="bg-violet-500/10 text-violet-600 dark:text-violet-400"
        glossaryTitle="Glossary Subsidiary Ledger"
        glossaryItems={[
          { term: 'Buku Besar Pembantu (Subsidiary Ledger)', description: 'Rincian detail riwayat transaksi per individu/relasi bisnis (Kartu Piutang Customer / Kartu Utang Supplier).' },
          { term: 'Reconciliation to GL', description: 'Total saldo akhir seluruh kartu pembantu HARUS cocok 100% dengan saldo Akun Induk GL.' }
        ]}
        badges={[
          { label: `Relasi Listed: ${filteredData.length}`, variant: 'slate' },
          { label: 'Sub-Ledger Reconciled ✓', variant: 'emerald' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari nama relasi, kode kartu, atau ref invoice..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Mutasi Kartu Pembantu (${filteredData.length} Transaksi)`}
        columns={columns}
        data={filteredData}
        keyExtractor={(i) => i.id}
      />

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedSub !== null}
        onClose={() => setSelectedSub(null)}
        title="Detail Mutasi Kartu Buku Besar Pembantu"
        subtitle={selectedSub ? `${selectedSub.subAccountCode} • ${selectedSub.entityName}` : ''}
        badgeLabel={selectedSub?.entityType === 'CUSTOMER_AR' ? 'KARTU PIUTANG' : 'KARTU UTANG'}
        badgeType={selectedSub?.entityType === 'CUSTOMER_AR' ? 'ACTIVE' : 'NEUTRAL'}
        summaryCards={[
          { label: 'Saldo Berjalan Kartu', value: selectedSub ? `Rp ${selectedSub.runningBalance.toLocaleString('id-ID')}` : '0' },
          { label: 'Mutasi Debet', value: selectedSub?.debit ? `Rp ${selectedSub.debit.toLocaleString('id-ID')}` : '-', color: 'text-emerald-600' },
          { label: 'Mutasi Kredit', value: selectedSub?.credit ? `Rp ${selectedSub.credit.toLocaleString('id-ID')}` : '-', color: 'text-rose-600' }
        ]}
        metadata={[
          { label: 'Kode Kartu Sub', value: selectedSub?.subAccountCode, mono: true, highlight: true },
          { label: 'Nama Entitas / Relasi', value: selectedSub?.entityName },
          { label: 'No. Acuan (Ref Invoice/Pay)', value: selectedSub?.refInvoice, mono: true },
          { label: 'Tanggal Mutasi', value: selectedSub?.date, mono: true },
          { label: 'Keterangan Mutasi Kartu', value: selectedSub?.description }
        ]}
        footerNotes="Buku pembantu disinkronisasi otomatis dengan voucher transaksi penerimaan & pembayaran."
      />
    </div>
  );
};

