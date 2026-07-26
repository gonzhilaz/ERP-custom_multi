'use client';

import { useState } from 'react';
import {
  MOCK_CONTRACTS,
  MOCK_LOANS,
  MOCK_CERTIFICATIONS,
  MOCK_LETTERS,
  EmployeeContract,
  EmployeeLoan,
  EmployeeCertification,
  HrLetterTemplate
} from '@/lib/mock/hr-extended';

export function useHrExtended() {
  const [contracts, setContracts] = useState<EmployeeContract[]>(MOCK_CONTRACTS);
  const [loans, setLoans] = useState<EmployeeLoan[]>(MOCK_LOANS);
  const [certifications, setCertifications] = useState<EmployeeCertification[]>(MOCK_CERTIFICATIONS);
  const [letters, setLetters] = useState<HrLetterTemplate[]>(MOCK_LETTERS);

  // Pesangon UU Cipta Kerja Calculator Formula
  const calculatePesangonUUCiptaKerja = (baseSalary: number, yearsOfService: number) => {
    // Uang Pesangon (UP)
    let upMultiplier = Math.min(yearsOfService + 1, 9);
    if (yearsOfService < 1) upMultiplier = 1;
    const upAmount = baseSalary * upMultiplier;

    // Uang Penghargaan Masa Kerja (UPMK)
    let upmkMultiplier = 0;
    if (yearsOfService >= 3 && yearsOfService < 6) upmkMultiplier = 2;
    else if (yearsOfService >= 6 && yearsOfService < 9) upmkMultiplier = 3;
    else if (yearsOfService >= 9 && yearsOfService < 12) upmkMultiplier = 4;
    else if (yearsOfService >= 12) upmkMultiplier = 5;
    const upmkAmount = baseSalary * upmkMultiplier;

    // Uang Penggantian Hak (UPH - Assumed 15% of UP + UPMK)
    const uphAmount = Math.round((upAmount + upmkAmount) * 0.15);

    const totalPesangon = upAmount + upmkAmount + uphAmount;

    return {
      upAmount,
      upmkAmount,
      uphAmount,
      totalPesangon
    };
  };

  const addLoan = (newLoan: Omit<EmployeeLoan, 'id' | 'paidAmount' | 'remainingAmount' | 'status'>) => {
    const item: EmployeeLoan = {
      ...newLoan,
      id: `ln-${Date.now()}`,
      paidAmount: 0,
      remainingAmount: newLoan.totalAmount,
      status: 'ACTIVE'
    };
    setLoans((prev) => [item, ...prev]);
  };

  const processPayrollLoanDeduction = (loanId: string) => {
    setLoans((prev) =>
      prev.map((ln) => {
        if (ln.id !== loanId) return ln;
        const newPaid = ln.paidAmount + ln.monthlyDeduction;
        const newRemaining = Math.max(0, ln.totalAmount - newPaid);
        return {
          ...ln,
          paidAmount: newPaid,
          remainingAmount: newRemaining,
          status: newRemaining === 0 ? 'PAID_OFF' : 'ACTIVE'
        };
      })
    );
  };

  const expiringContractsCount = contracts.filter((c) => c.status === 'EXPIRING_SOON').length;
  const expiringCertsCount = certifications.filter((c) => c.status === 'EXPIRING_SOON').length;

  return {
    contracts,
    loans,
    certifications,
    letters,
    expiringContractsCount,
    expiringCertsCount,
    calculatePesangonUUCiptaKerja,
    addLoan,
    processPayrollLoanDeduction
  };
}
