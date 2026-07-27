/**
 * Finance Human Error Prevention Guard & Anomaly Detection Engine.
 * Prevents input mistakes, zero-mismatches, double-entries, and extreme nominal typos.
 */

export interface JournalBalanceValidation {
  isBalanced: boolean;
  totalDebit: number;
  totalCredit: number;
  difference: number;
  message?: string;
}

export function validateBalancedJournal(entries: { debit: number; credit: number }[]): JournalBalanceValidation {
  const totalDebit = entries.reduce((acc, curr) => acc + (curr.debit || 0), 0);
  const totalCredit = entries.reduce((acc, curr) => acc + (curr.credit || 0), 0);
  const difference = Math.abs(totalDebit - totalCredit);

  if (difference < 0.01) {
    return {
      isBalanced: true,
      totalDebit,
      totalCredit,
      difference: 0
    };
  }

  return {
    isBalanced: false,
    totalDebit,
    totalCredit,
    difference,
    message: `Jurnal Tidak Seimbang (Out of Balance)! Total Debit (Rp ${totalDebit.toLocaleString('id-ID')}) ≠ Total Kredit (Rp ${totalCredit.toLocaleString('id-ID')}). Selisih: Rp ${difference.toLocaleString('id-ID')}.`
  };
}

export interface NominalOutlierResult {
  isOutlier: boolean;
  inputNominal: number;
  historicalAverage: number;
  multiplier: number;
  warningMessage?: string;
}

export function detectNominalOutlier(
  inputNominal: number,
  historicalAverage: number = 5000000,
  maxMultiplierThreshold: number = 5.0
): NominalOutlierResult {
  if (historicalAverage <= 0 || inputNominal <= 0) {
    return { isOutlier: false, inputNominal, historicalAverage, multiplier: 1.0 };
  }

  const multiplier = inputNominal / historicalAverage;

  if (multiplier >= maxMultiplierThreshold) {
    return {
      isOutlier: true,
      inputNominal,
      historicalAverage,
      multiplier: Math.round(multiplier * 10) / 10,
      warningMessage: `Peringatan Human Error (Typo Nol)! Nominal Rp ${inputNominal.toLocaleString('id-ID')} adalah ${Math.round(multiplier)}x lipat dari rata-rata histori transaksi vendor ini (Rp ${historicalAverage.toLocaleString('id-ID')}). Periksa apakah terjadi kelebihan mengetik angka 0!`
    };
  }

  return { isOutlier: false, inputNominal, historicalAverage, multiplier };
}

export interface ThreeWayMatchResult {
  isMatched: boolean;
  poAmount: number;
  receiptAmount: number;
  invoiceAmount: number;
  varianceAmount: number;
  errorMessage?: string;
}

export function validateThreeWayMatching(
  poAmount: number,
  receiptAmount: number,
  invoiceAmount: number
): ThreeWayMatchResult {
  const varianceAmount = invoiceAmount - Math.min(poAmount, receiptAmount);

  if (varianceAmount <= 0) {
    return {
      isMatched: true,
      poAmount,
      receiptAmount,
      invoiceAmount,
      varianceAmount: 0
    };
  }

  return {
    isMatched: false,
    poAmount,
    receiptAmount,
    invoiceAmount,
    varianceAmount,
    errorMessage: `Peringatan 3-Way Matching Error! Tagihan Invoice (Rp ${invoiceAmount.toLocaleString('id-ID')}) melebihi nilai PO/Penerimaan Barang (Rp ${poAmount.toLocaleString('id-ID')}). Selisih kelebihan bayar: Rp ${varianceAmount.toLocaleString('id-ID')}.`
  };
}
