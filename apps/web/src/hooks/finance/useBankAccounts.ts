import { useState, useEffect } from 'react';
import {
  CorporateBankAccount,
  BankStatementLine,
  MOCK_CORPORATE_BANK_ACCOUNTS,
  TENANT_BANK_MAP,
  MOCK_BANK_STATEMENT_LINES
} from '@/lib/mock/bank-accounts';
import { useTenantContext } from '@/context/TenantContext';

export function useBankAccounts() {
  const { activeUnit } = useTenantContext();
  const initialBanks = TENANT_BANK_MAP[activeUnit.code] || MOCK_CORPORATE_BANK_ACCOUNTS;

  const [bankAccounts, setBankAccounts] = useState<CorporateBankAccount[]>(initialBanks);
  const [statementLines, setStatementLines] = useState<BankStatementLine[]>(MOCK_BANK_STATEMENT_LINES);

  useEffect(() => {
    const tenantBanks = TENANT_BANK_MAP[activeUnit.code] || TENANT_BANK_MAP['HOLDING-HO'] || MOCK_CORPORATE_BANK_ACCOUNTS;
    setBankAccounts(tenantBanks);
  }, [activeUnit.code]);

  const addBankAccount = (newAccount: Omit<CorporateBankAccount, 'id' | 'bankCode'>) => {
    const created: CorporateBankAccount = {
      ...newAccount,
      id: `bank-${Date.now()}`,
      bankCode: `${newAccount.bankName.substring(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`
    };

    setBankAccounts((prev) => [created, ...prev]);
  };

  const reconcileStatementLine = (statementId: string) => {
    setStatementLines((prev) =>
      prev.map((line) =>
        line.id === statementId
          ? {
              ...line,
              matchStatus: 'MATCHED',
              matchedJournalId: `JRN-AUTO-${Math.floor(1000 + Math.random() * 9000)}`
            }
          : line
      )
    );
  };

  const totalBankBalance = bankAccounts.reduce((acc, curr) => acc + curr.currentBalance, 0);
  const unmatchedStatementsCount = statementLines.filter((s) => s.matchStatus === 'UNMATCHED').length;

  return {
    bankAccounts,
    statementLines,
    totalBankBalance,
    unmatchedStatementsCount,
    addBankAccount,
    reconcileStatementLine
  };
}
