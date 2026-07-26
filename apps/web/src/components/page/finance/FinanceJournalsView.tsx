'use client';

import React, { useState } from 'react';
import { FileSpreadsheet, Plus, Eye, BookOpen, Layers, CheckCircle2, RotateCcw } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { JournalDetailModal } from '@/components/ui/modals/JournalDetailModal';
import { CreateManualJournalModal } from '@/components/ui/modals/CreateManualJournalModal';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';

interface JournalEntry {
  jvNumber: string;
  date: string;
  type: 'GENERAL' | 'SPECIAL' | 'ADJUSTING' | 'CLOSING' | 'REVERSING';
  description: string;
  debitAmount: number;
  creditAmount: number;
  postedBy: string;
  status: string;
  lineItems: { coaCode: string; accountName: string; debit: number; credit: number }[];
}

export const FinanceJournalsView = () => {
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'SPECIAL' | 'ADJUSTING' | 'CLOSING' | 'REVERSING'>('GENERAL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJournal, setSelectedJournal] = useState<JournalEntry | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [journals, setJournals] = useState<JournalEntry[]>([
    {
      jvNumber: 'JV/2026/07/0090',
      date: '2026-07-24',
      type: 'GENERAL',
      description: 'Auto-Post Kasir POS Retail: Penjualan Beras & Minyak + PPN 12% & HPP FIFO',
      debitAmount: 128240,
      creditAmount: 128240,
      postedBy: 'Kasir POS System Auto-Post',
      status: 'POSTED',
      lineItems: [
        { coaCode: '1-10100', accountName: 'Kas Kasir Outlet Retail', debit: 128240, credit: 0 },
        { coaCode: '4-10100', accountName: 'Pendapatan Penjualan Retail POS', debit: 0, credit: 114500 },
        { coaCode: '2-10300', accountName: 'Utang PPN Keluaran Retail (12%)', debit: 0, credit: 13740 }
      ]
    },
    {
      jvNumber: 'SJ/2026/07/0012',
      date: '2026-07-24',
      type: 'SPECIAL',
      description: 'Jurnal Khusus Kas Masuk (Sales Journal): Penerimaan Invoice PT Nusantara',
      debitAmount: 45000000,
      creditAmount: 45000000,
      postedBy: 'Kasir Utama HO',
      status: 'POSTED',
      lineItems: [
        { coaCode: '1-10101', accountName: 'Kas Bank Mandiri Operasional', debit: 45000000, credit: 0 },
        { coaCode: '1-10400', accountName: 'Piutang Usaha (AR Customer)', debit: 0, credit: 45000000 }
      ]
    },
    {
      jvNumber: 'AJE/2026/07/0004',
      date: '2026-07-31',
      type: 'ADJUSTING',
      description: 'Jurnal Penyesuaian Depresiasi Aset Tetap Bulan Juli 2026 & Beban Dibayar Muka',
      debitAmount: 15500000,
      creditAmount: 15500000,
      postedBy: 'Senior Accounting HO',
      status: 'POSTED',
      lineItems: [
        { coaCode: '5-30100', accountName: 'Beban Penyusutan Kendaraan Ops', debit: 15500000, credit: 0 },
        { coaCode: '1-30900', accountName: 'Akumulasi Penyusutan Kendaraan', debit: 0, credit: 15500000 }
      ]
    },
    {
      jvNumber: 'CJE/2026/07/0001',
      date: '2026-07-31',
      type: 'CLOSING',
      description: 'Jurnal Penutup Akhir Periode: Menutup Akun Pendapatan & Beban ke Ikhtisar Laba Rugi',
      debitAmount: 450000000,
      creditAmount: 450000000,
      postedBy: 'Chief Accountant',
      status: 'POSTED',
      lineItems: [
        { coaCode: '4-10100', accountName: 'Pendapatan Penjualan Retail POS', debit: 450000000, credit: 0 },
        { coaCode: '3-90000', accountName: 'Ikhtisar Laba Rugi (Income Summary)', debit: 0, credit: 450000000 }
      ]
    },
    {
      jvNumber: 'RJE/2026/08/0001',
      date: '2026-08-01',
      type: 'REVERSING',
      description: 'Jurnal Pembalik Awal Periode: Pembalikan Akrual Beban Gaji Yang Masih Harus Dibayar',
      debitAmount: 12500000,
      creditAmount: 12500000,
      postedBy: 'Accounting System Auto-Reverse',
      status: 'POSTED',
      lineItems: [
        { coaCode: '2-10200', accountName: 'Utang Gaji Akrual (Accrued Payroll)', debit: 12500000, credit: 0 },
        { coaCode: '5-20100', accountName: 'Beban Gaji Karyawan', debit: 0, credit: 12500000 }
      ]
    }
  ]);

  const subTabs: SubTabItem[] = [
    { id: 'GENERAL', label: 'Jurnal Umum (General)', icon: FileSpreadsheet },
    { id: 'SPECIAL', label: 'Jurnal Khusus (Special)', icon: BookOpen },
    { id: 'ADJUSTING', label: 'Jurnal Penyesuaian (AJE)', icon: Layers },
    { id: 'CLOSING', label: 'Jurnal Penutup (CJE)', icon: CheckCircle2 },
    { id: 'REVERSING', label: 'Jurnal Pembalik (RJE)', icon: RotateCcw }
  ];

  const filteredJournals = journals.filter(
    (j) =>
      j.type === activeTab &&
      (j.jvNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.postedBy.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddJournal = (newEntry: any) => {
    setJournals([newEntry, ...journals]);
  };

  const columns: ColumnDef<JournalEntry>[] = [
    { key: 'jvNumber', header: 'No. Voucher', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.jvNumber },
    { key: 'date', header: 'Tanggal', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'description', header: 'Keterangan Transaksi Jurnal', className: 'font-semibold text-slate-900 dark:text-white', render: (i) => i.description },
    { key: 'debitAmount', header: 'Debet (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => `Rp ${i.debitAmount.toLocaleString('id-ID')}` },
    { key: 'creditAmount', header: 'Kredit (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => `Rp ${i.creditAmount.toLocaleString('id-ID')}` },
    { key: 'status', header: 'Status Ledger', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.status}</span> },
    {
      key: 'actions',
      header: 'Audit Voucher',
      align: 'center',
      render: (i) => (
        <button onClick={() => setSelectedJournal(i)} className="px-2.5 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 font-bold rounded-lg flex items-center gap-1 mx-auto cursor-pointer text-[10px]">
          <Eye className="w-3 h-3" />
          <span>Audit</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Pusat Jurnal Keuangan (Journals Hub)"
        icon={FileSpreadsheet}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Accounting Journals"
        glossaryItems={[
          { term: 'General Journal (Jurnal Umum)', description: 'Catatan kronologis seluruh transaksi keuangan umum enterprise.' },
          { term: 'Special Journal (Jurnal Khusus)', description: 'Jurnal khusus transaksi rutin bervolume tinggi (Kas Masuk/Keluar, Penjualan, Pembelian).' },
          { term: 'Adjusting Journal (Jurnal Penyesuaian)', description: 'Jurnal penyesuaian akrual, depresiasi, dan beban dibayar muka di akhir periode.' },
          { term: 'Closing Journal (Jurnal Penutup)', description: 'Jurnal penutupan saldo pendapatan dan beban ke ikhtisar laba rugi.' },
          { term: 'Reversing Journal (Jurnal Pembalik)', description: 'Jurnal pembalik di awal periode baru untuk membalik akrual tertentu.' }
        ]}
        badges={[
          { label: `${journals.length} Voucher Jurnal Registered`, variant: 'slate' },
          { label: 'Debet = Kredit (Balanced) ✓', variant: 'emerald' }
        ]}
        actions={
          <button onClick={() => setIsCreateModalOpen(true)} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Tambah Jurnal Manual</span>
          </button>
        }
      />

      {/* SubTab Navigation for 5 Journal Types */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as any)}
        tabs={subTabs}
        colorScheme="sky"
      />

      {/* Universal SearchBar Toolbar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Cari voucher pada ${activeTab}...`}
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Daftar Transaksi ${subTabs.find(t => t.id === activeTab)?.label} (${filteredJournals.length})`}
        columns={columns}
        data={filteredJournals}
        keyExtractor={(i) => i.jvNumber}
      />

      {/* Modal Detail Voucher */}
      <JournalDetailModal
        isOpen={!!selectedJournal}
        onClose={() => setSelectedJournal(null)}
        journal={selectedJournal}
      />

      {/* Modal Create Manual Journal */}
      <CreateManualJournalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        initialType={activeTab}
        onSubmit={handleAddJournal}
      />
    </div>
  );
};
