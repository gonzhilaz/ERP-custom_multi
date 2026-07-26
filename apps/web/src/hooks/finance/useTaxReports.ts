'use client';

import { useState } from 'react';
import {
  MOCK_TAX_REPORTS,
  TaxReportItem
} from '@/lib/mock/hr-finance-integration';

export function useTaxReports() {
  const [taxReports, setTaxReports] = useState<TaxReportItem[]>(MOCK_TAX_REPORTS);

  const exportCoretaxCsv = (report: TaxReportItem) => {
    alert(`Mengekspor File Import CSV e-SPT Coretax DJP [${report.csvFileName}] Periode ${report.periodMonth}! Siap diunggah ke Portal DJP.`);
    setTaxReports((prev) =>
      prev.map((t) => (t.id === report.id ? { ...t, status: 'EXPORTED_CORETAX' } : t))
    );
  };

  const printBuktiPotong1721A1 = (employeeName: string) => {
    alert(`Mencetak Formulir Bukti Potong PPh 21 (Form 1721-A1) Resmi untuk Karyawan: ${employeeName}`);
  };

  return {
    taxReports,
    exportCoretaxCsv,
    printBuktiPotong1721A1
  };
}
