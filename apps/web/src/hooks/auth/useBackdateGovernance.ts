'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { isBackdateRoleAuthorized, validateTransactionDate, BackdateValidationResult } from '@/lib/auth/backdate-governance';
import { logAuditEvent } from '@/lib/audit/audit-logger';

const LOCAL_STORAGE_BACKDATE_KEY = 'erp_backdate_unblocked';

export function useBackdateGovernance() {
  const { user } = useAuth();
  const [isBackdateUnblocked, setIsBackdateUnblocked] = useState<boolean>(false);

  // Load status from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_BACKDATE_KEY);
      if (stored === 'true') {
        setIsBackdateUnblocked(true);
      }
    } catch (e) {
      console.error('Failed to load backdate state from localStorage', e);
    }
  }, []);

  const isUserAuthorized = isBackdateRoleAuthorized(user?.systemRole);

  // Toggle backdate unblock state (Super-Admin / Admin only)
  const toggleBackdateUnblock = useCallback((): { success: boolean; message: string } => {
    if (!isUserAuthorized) {
      const msg = 'Akses Ditolak! Hanya Super-Admin dan Admin yang dapat membuka/menutup blokir backdate.';
      alert(msg);
      return { success: false, message: msg };
    }

    const nextState = !isBackdateUnblocked;
    setIsBackdateUnblocked(nextState);
    try {
      localStorage.setItem(LOCAL_STORAGE_BACKDATE_KEY, String(nextState));
    } catch (e) {
      console.error('Failed to save backdate state', e);
    }

    const msg = nextState
      ? 'Akses Backdate Berhasil DIBUKA oleh Super-Admin / Admin.'
      : 'Akses Backdate DIBLOKIR Kembali secara aman.';

    // Log explicit audit trail
    logAuditEvent({
      userName: user?.fullName || 'Super Admin',
      userRole: user?.systemRole || 'HOLDING_EXECUTIVE',
      actionType: nextState ? 'BACKDATE_UNBLOCK' : 'BACKDATE_LOCK',
      targetEntity: 'SYSTEM_SETTINGS_BACKDATE',
      details: `Status Penguncian Backdate diubah menjadi ${nextState ? 'UNBLOCKED' : 'LOCKED'} oleh ${user?.fullName || 'Admin'}.`
    });

    return { success: true, message: msg };
  }, [isUserAuthorized, isBackdateUnblocked, user]);

  // Validate a specific date
  const validateDate = useCallback(
    (transactionDate: string): BackdateValidationResult => {
      return validateTransactionDate({
        transactionDate,
        userRole: user?.systemRole,
        isBackdateUnblocked
      });
    },
    [user?.systemRole, isBackdateUnblocked]
  );

  return {
    isUserAuthorized,
    isBackdateUnblocked,
    toggleBackdateUnblock,
    validateDate
  };
}
