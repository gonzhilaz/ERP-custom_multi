'use client';

import { useAuthContext } from '@/context/AuthContext';
import { useTenantContext } from '@/context/TenantContext';

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, login, logout } = useAuthContext();
  const { activeUnit, availableUnits, switchUnit } = useTenantContext();

  return {
    user: user || {
      id: 'guest',
      email: 'guest@holding.com',
      fullName: 'Tamu ERP',
      systemRole: 'RETAIL_STORE_MANAGER'
    },
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    activeUnit,
    availableUnits,
    switchUnit
  };
}
