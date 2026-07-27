import { SystemRole } from './rbac-resolver';

/**
 * Checks if a user role is authorized to unblock backdate transactions.
 * Only Super-Admin (HOLDING_EXECUTIVE) and Admin (COMPANY_ADMIN) can unblock backdate.
 */
export function isBackdateRoleAuthorized(role?: SystemRole | string | null): boolean {
  if (!role) return false;
  const normalizedRole = role.toUpperCase();
  return (
    normalizedRole === 'HOLDING_EXECUTIVE' ||
    normalizedRole === 'COMPANY_ADMIN' ||
    normalizedRole === 'SUPER_ADMIN' ||
    normalizedRole === 'ADMIN'
  );
}

export interface ValidateBackdateParams {
  transactionDate: string; // Format: YYYY-MM-DD
  userRole?: SystemRole | string | null;
  isBackdateUnblocked: boolean;
}

export interface BackdateValidationResult {
  allowed: boolean;
  isBackdate: boolean;
  reason?: string;
}

/**
 * Validates whether a transaction date (potentially backdated) is allowed to be saved.
 */
export function validateTransactionDate({
  transactionDate,
  userRole,
  isBackdateUnblocked
}: ValidateBackdateParams): BackdateValidationResult {
  if (!transactionDate) {
    return { allowed: true, isBackdate: false };
  }

  // Get current date string in local YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Compare dates
  const isBackdate = transactionDate < todayStr;

  if (!isBackdate) {
    return { allowed: true, isBackdate: false };
  }

  // Transaction IS backdated
  const isAuthorizedRole = isBackdateRoleAuthorized(userRole);

  if (isAuthorizedRole && isBackdateUnblocked) {
    return {
      allowed: true,
      isBackdate: true,
      reason: 'Akses backdate diizinkan oleh Super-Admin / Admin.'
    };
  }

  if (!isAuthorizedRole) {
    return {
      allowed: false,
      isBackdate: true,
      reason: 'Transaksi Backdate Diblokir! Hanya Super-Admin dan Admin yang memiliki wewenang untuk membuka blokir backdate.'
    };
  }

  return {
    allowed: false,
    isBackdate: true,
    reason: 'Transaksi Backdate Diblokir! Silakan aktifkan Buka Blokir Backdate di Header Navigasi sebelum menyimpan.'
  };
}
