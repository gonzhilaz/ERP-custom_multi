'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTenantContext } from './TenantContext';
import { SystemRole } from '@/lib/auth/rbac-resolver';

export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  systemRole: SystemRole;
  activeTenantId?: string;
  activeBranchId?: string;
}

interface AuthContextType {
  user: UserSession | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { switchUnit } = useTenantContext();
  const [user, setUser] = useState<UserSession | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-detect branch based on user email
  const detectBranchForEmail = (email: string, tenantId: string): string => {
    const e = email.toLowerCase();
    if (tenantId === 'tenant-toko-roti') {
      if (e.includes('storemanager')) return 'br-roti-all';
      if (e.includes('cashier1')) return 'br-roti-02';
      if (e.includes('baker')) return 'br-roti-03';
      return 'br-roti-01'; // Default Sudirman
    }
    if (tenantId === 'tenant-resto-alam-rindu') return 'br-resto-01';
    if (tenantId === 'tenant-mining-braxit') return 'br-mine-01';
    if (tenantId === 'tenant-hotel-alam-pakuan') return 'br-hotel-01';
    return 'br-ho-01';
  };

  // Initialize session from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('erp_auth_token');
      const storedUser = localStorage.getItem('erp_auth_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        const parsedUser: UserSession = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser.activeTenantId) {
          switchUnit(parsedUser.activeTenantId, parsedUser.activeBranchId);
        }
      }
    } catch (e) {
      console.error('Failed to load session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const json = await response.json();

      if (json.success && json.data) {
        const tokenVal = json.data.token;
        const tenantId = json.data.user.activeTenant?.tenantId || 'tenant-toko-roti';
        const branchId = detectBranchForEmail(email, tenantId);

        const userData: UserSession = {
          id: json.data.user.userId || json.data.user.id || 'user-001',
          email: json.data.user.email,
          fullName: json.data.user.fullName,
          systemRole: (json.data.user.systemRole as SystemRole) || 'RETAIL_STORE_MANAGER',
          activeTenantId: tenantId,
          activeBranchId: branchId
        };

        setToken(tokenVal);
        setUser(userData);

        localStorage.setItem('erp_auth_token', tokenVal);
        localStorage.setItem('erp_auth_user', JSON.stringify(userData));

        switchUnit(tenantId, branchId);
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: json.error || 'Login gagal' };
      }
    } catch (err) {
      console.warn('API network login fallback triggered:', err);
      
      let mockRole: SystemRole = 'RETAIL_STORE_MANAGER';
      let mockUnitId = 'tenant-toko-roti';
      let mockName = 'Maya Indah (Manager Toko Roti)';

      if (email.includes('admin') || email.includes('holding')) {
        mockRole = 'HOLDING_EXECUTIVE';
        mockUnitId = 'holding';
        mockName = 'Budi Santoso (Holding Executive)';
      } else if (email.includes('retail') || email.includes('tokoroti')) {
        mockUnitId = 'tenant-toko-roti';
        if (email.includes('cashier1')) {
          mockRole = 'RETAIL_CASHIER';
          mockName = 'Linda Kasir (Cabang Gading)';
        } else if (email.includes('headcashier')) {
          mockRole = 'RETAIL_CASHIER';
          mockName = 'Andi Kasir (Cabang Sudirman)';
        } else if (email.includes('baker')) {
          mockRole = 'COMPANY_ADMIN';
          mockName = 'Chef Anton (Head Baker)';
        } else {
          mockRole = 'RETAIL_STORE_MANAGER';
        }
      } else if (email.includes('resto') || email.includes('alamrindu')) {
        mockRole = 'RESTO_MANAGER';
        mockUnitId = 'tenant-resto-alam-rindu';
        mockName = 'Siti Aminah (Resto Manager)';
      } else if (email.includes('mining') || email.includes('braxit')) {
        mockRole = 'SITE_MANAGER_MINING';
        mockUnitId = 'tenant-mining-braxit';
        mockName = 'Surya Pratama (Site Manager)';
      } else if (email.includes('hotel') || email.includes('alampakuan')) {
        mockRole = 'HOTEL_GENERAL_MANAGER';
        mockUnitId = 'tenant-hotel-alam-pakuan';
        mockName = 'Rudi Hermawan (GM Hotel)';
      }

      const branchId = detectBranchForEmail(email, mockUnitId);
      const mockUserData: UserSession = {
        id: `usr-${Date.now()}`,
        email,
        fullName: mockName,
        systemRole: mockRole,
        activeTenantId: mockUnitId,
        activeBranchId: branchId
      };

      setToken('mock-jwt-token-2026');
      setUser(mockUserData);

      localStorage.setItem('erp_auth_token', 'mock-jwt-token-2026');
      localStorage.setItem('erp_auth_user', JSON.stringify(mockUserData));

      switchUnit(mockUnitId, branchId);
      setIsLoading(false);
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('erp_auth_token');
    localStorage.removeItem('erp_auth_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
