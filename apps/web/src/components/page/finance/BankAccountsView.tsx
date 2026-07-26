'use client';

import React, { useState } from 'react';
import { CreditCard, ArrowRightLeft, History, FileCheck } from 'lucide-react';
import { useBankAccounts } from '@/hooks/finance/useBankAccounts';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { BankAccountsMasterTab } from './BankAccountsMasterTab';
import { BankReconciliationTab } from './BankReconciliationTab';
import { BankStatementMutationTab } from './BankStatementMutationTab';
import { BankVouchersTab } from './BankVouchersTab';

export const BankAccountsView = () => {
  const [activeTab, setActiveTab] = useState<'MASTER' | 'VOUCHER' | 'MUTASI' | 'RECONCILE'>('MASTER');

  const {
    bankAccounts,
    statementLines,
    totalBankBalance,
    unmatchedStatementsCount,
    addBankAccount,
    reconcileStatementLine
  } = useBankAccounts();

  const subTabs: SubTabItem[] = [
    { id: 'MASTER', label: 'Rekening Bank', icon: CreditCard, count: bankAccounts.length },
    { id: 'VOUCHER', label: 'Voucher Bank (BKM / BKK)', icon: FileCheck },
    { id: 'MUTASI', label: 'Mutasi Bank Koran', icon: History },
    { id: 'RECONCILE', label: 'Rekonsiliasi Bank', icon: ArrowRightLeft, count: unmatchedStatementsCount }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Master & Voucher Rekening Bank"
        icon={CreditCard}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Bank Accounts & Vouchers"
        glossaryItems={[
          { term: 'Voucher Bank Masuk (BKM)', description: 'Voucher resmi penerimaan dana transfer perbankan dari pihak ketiga.' },
          { term: 'Voucher Bank Keluar (BKK)', description: 'Voucher resmi pengeluaran dana transfer perbankan untuk pembayaran vendor / operasional.' },
          { term: 'Mutasi Bank Koran', description: 'History mutasi debet/kredit rekening koran bank secara real-time.' },
          { term: 'Auto-Match Mutasi', description: 'Pencocokan mutasi kas koran dengan saldo transaksi di General Ledger.' }
        ]}
        badges={[
          { label: `${bankAccounts.length} Rekening Active`, variant: 'slate' },
          { label: `Total Saldo: Rp ${totalBankBalance.toLocaleString('id-ID')}`, variant: 'sky' }
        ]}
      />

      {/* SubTab Navigation */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab as any}
        tabs={subTabs}
        colorScheme="sky"
      />

      {/* Dynamic Tab Views */}
      {activeTab === 'MASTER' && (
        <BankAccountsMasterTab
          bankAccounts={bankAccounts}
          totalBankBalance={totalBankBalance}
          addBankAccount={addBankAccount}
        />
      )}

      {activeTab === 'VOUCHER' && (
        <BankVouchersTab />
      )}

      {activeTab === 'MUTASI' && (
        <BankStatementMutationTab />
      )}

      {activeTab === 'RECONCILE' && (
        <BankReconciliationTab
          statementLines={statementLines}
          unmatchedStatementsCount={unmatchedStatementsCount}
          reconcileStatementLine={reconcileStatementLine}
        />
      )}
    </div>
  );
};
