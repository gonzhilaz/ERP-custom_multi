'use client';

import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, CheckCircle2, Edit3, Building2, Eye } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { SearchableSelect, SearchSelectOption } from '@/components/ui/dropdowns/SearchableSelect';
import { useBankAccounts } from '@/hooks/finance/useBankAccounts';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

interface BankAccParamRow {
  accountNumber: string;
  bankName: string;
  accountName: string;
  minBalanceLimit: number;
  autoMatchToleranceDays: number;
  bankChargeCoaCode: string;
  status: string;
}

export const BankAccParamView = () => {
  const { bankAccounts } = useBankAccounts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParam, setSelectedParam] = useState<BankAccParamRow | null>(null);

  const [bankParams, setBankParams] = useState<BankAccParamRow[]>([
    { accountNumber: '122-00-988277-1', bankName: 'Bank Mandiri (Persero)', accountName: 'PT Holding Enterprise Indonesia', minBalanceLimit: 50000000, autoMatchToleranceDays: 3, bankChargeCoaCode: '6-10300 (Beban Admin Bank)', status: 'ACTIVE' },
    { accountNumber: '880-112-9900', bankName: 'Bank Central Asia (BCA)', accountName: 'PT Holding Enterprise Indonesia', minBalanceLimit: 25000000, autoMatchToleranceDays: 2, bankChargeCoaCode: '6-10300 (Beban Admin Bank)', status: 'ACTIVE' },
    { accountNumber: '0012-01-000455-30-1', bankName: 'Bank Rakyat Indonesia (BRI)', accountName: 'PT Holding Enterprise Indonesia', minBalanceLimit: 10000000, autoMatchToleranceDays: 3, bankChargeCoaCode: '6-10300 (Beban Admin Bank)', status: 'ACTIVE' }
  ]);

  const filteredParams = bankParams.filter(
    (b) =>
      b.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.accountName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<BankAccParamRow>[] = [
    { key: 'accountNumber', header: 'No. Rekening Bank', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.accountNumber },
    { key: 'bankName', header: 'Nama Bank Perusahaan', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.bankName },
    { key: 'accountName', header: 'Nama Pemilik Rekening', render: (i) => i.accountName },
    { key: 'minBalanceLimit', header: 'Batas Saldo Minimum (Rp)', align: 'right', className: 'font-mono font-bold text-rose-600 dark:text-rose-400', render: (i) => `Rp ${i.minBalanceLimit.toLocaleString('id-ID')}` },
    { key: 'autoMatchToleranceDays', header: 'Toleransi Auto-Match (Hari)', align: 'center', className: 'font-mono font-bold text-amber-600', render: (i) => `${i.autoMatchToleranceDays} Hari` },
    { key: 'bankChargeCoaCode', header: 'COA Penampung Admin Bank', className: 'font-mono font-bold text-slate-700 dark:text-slate-300', render: (i) => i.bankChargeCoaCode },
    { key: 'status', header: 'Status Parameter', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] rounded">{i.status}</span> },
    {
      key: 'actions',
      header: 'Detail',
      align: 'center',
      render: (i) => (
        <button
          onClick={() => setSelectedParam(i)}
          className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
          title="Lihat Detail Parameter Bank"
        >
          <Eye className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Manage Bank Accounts Settings & Parameters Master"
        icon={CreditCard}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Bank Account Parameters"
        glossaryItems={[
          { term: 'Minimum Balance Limit', description: 'Batas ambang saldo minimum rekening yang memicu peringatan Kasir HO jika mendekati limit.' },
          { term: 'Auto-Match Tolerance', description: 'Toleransi selisih hari antara mutasi rekening koran dengan voucher kas yang dibuat.' }
        ]}
        badges={[
          { label: `${bankParams.length} Rekening Configured`, variant: 'sky' },
          { label: 'Role Restrict: Admin & Finance Only', variant: 'slate' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari nomor rekening atau nama bank..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Daftar Parameter Pengaturan Rekening Bank Corporate (${filteredParams.length})`}
        columns={columns}
        data={filteredParams}
        keyExtractor={(i) => i.accountNumber}
      />

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedParam !== null}
        onClose={() => setSelectedParam(null)}
        title="Detail Parameter Pengaturan Rekening Bank"
        subtitle={selectedParam ? `${selectedParam.bankName} • ${selectedParam.accountNumber}` : ''}
        badgeLabel={selectedParam?.status}
        badgeType="ACTIVE"
        summaryCards={[
          { label: 'Limit Saldo Minimum', value: selectedParam ? `Rp ${selectedParam.minBalanceLimit.toLocaleString('id-ID')}` : '0', color: 'text-rose-600' },
          { label: 'Toleransi Matching', value: selectedParam ? `${selectedParam.autoMatchToleranceDays} Hari` : '-' },
          { label: 'Status Pengaturan', value: selectedParam?.status || '-' }
        ]}
        metadata={[
          { label: 'Nomor Rekening', value: selectedParam?.accountNumber, mono: true, highlight: true },
          { label: 'Nama Bank', value: selectedParam?.bankName },
          { label: 'Pemilik Rekening', value: selectedParam?.accountName },
          { label: 'COA Biaya Admin Bank', value: selectedParam?.bankChargeCoaCode, mono: true }
        ]}
        footerNotes="Parameter ini mengatur batas peringatan saldo kas dan kecocokan otomatis pada modul Rekonsiliasi Bank."
      />
    </div>
  );
};

