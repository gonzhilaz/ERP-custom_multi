'use client';

import { useState } from 'react';
import {
  MOCK_PAYROLL_DISBURSEMENT_BATCHES,
  MOCK_DISBURSEMENT_EMPLOYEES,
  PayrollDisbursementBatch,
  PayrollDisbursementItem
} from '@/lib/mock/payroll-disburse';

export function usePayrollDisbursement() {
  const [batches, setBatches] = useState<PayrollDisbursementBatch[]>(MOCK_PAYROLL_DISBURSEMENT_BATCHES);
  const [employees, setEmployees] = useState<PayrollDisbursementItem[]>(MOCK_DISBURSEMENT_EMPLOYEES);
  const [isSendingWa, setIsSendingWa] = useState(false);

  const downloadBankExportFile = (batch: PayrollDisbursementBatch) => {
    alert(`Mengekspor File Transfer Bank Resmi [${batch.exportFormatFileName}] Format ${batch.bankName}! Siap diunggah ke Internet Banking.`);
    setBatches((prev) =>
      prev.map((b) => (b.id === batch.id ? { ...b, status: 'DISBURSED' } : b))
    );
  };

  const sendMassWaPayslips = () => {
    setIsSendingWa(true);
    setTimeout(() => {
      setIsSendingWa(false);
      setEmployees((prev) =>
        prev.map((emp) => ({
          ...emp,
          waStatus: 'SENT',
          waSendTimestamp: new Date().toLocaleString()
        }))
      );
      alert(`Slip Gaji Digital Berhasil Dikirimkan via WhatsApp OpenClaw ke ${employees.length} Karyawan!`);
    }, 2000);
  };

  return {
    batches,
    employees,
    isSendingWa,
    downloadBankExportFile,
    sendMassWaPayslips
  };
}
