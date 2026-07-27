'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_UNITS, TenantUnit, BranchInfo } from '@/lib/mock/units';

interface TenantContextType {
  activeUnit: TenantUnit;
  activeBranch: BranchInfo;
  availableUnits: TenantUnit[];
  availableBranches: BranchInfo[];
  canSwitchUnit: boolean;
  isHoldingExecutive: boolean;
  switchUnit: (unitId: string, branchId?: string) => void;
  switchBranch: (branchId: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeUnit, setActiveUnit] = useState<TenantUnit>(MOCK_UNITS[0]);
  const [activeBranch, setActiveBranch] = useState<BranchInfo>(MOCK_UNITS[0].branches[0]);

  // Load initial unit from localStorage on mount
  useEffect(() => {
    try {
      const savedUnitId = localStorage.getItem('erp_active_unit_id');
      const savedBranchId = localStorage.getItem('erp_active_branch_id');
      if (savedUnitId) {
        const found = MOCK_UNITS.find((u) => u.tenantId === savedUnitId);
        if (found) {
          setActiveUnit(found);
          if (savedBranchId && found.branches) {
            const bFound = found.branches.find((b) => b.id === savedBranchId);
            if (bFound) setActiveBranch(bFound);
            else if (found.branches[0]) setActiveBranch(found.branches[0]);
          }
        }
      }
    } catch (e) {
      console.error('Failed to load saved tenant unit:', e);
    }
  }, []);

  // Sync activeBranch when activeUnit changes
  useEffect(() => {
    if (activeUnit.branches && activeUnit.branches.length > 0) {
      const isCurrentBranchValid = activeUnit.branches.some(b => b.id === activeBranch.id);
      if (!isCurrentBranchValid) {
        setActiveBranch(activeUnit.branches[0]);
      }
    }
  }, [activeUnit]);

  const switchUnit = (unitId: string, preferredBranchId?: string) => {
    const found = MOCK_UNITS.find((u) => u.tenantId === unitId);
    if (found) {
      setActiveUnit(found);
      try {
        localStorage.setItem('erp_active_unit_id', unitId);
        const currentUser = localStorage.getItem('erp_auth_user');
        if (currentUser) {
          const parsed = JSON.parse(currentUser);
          parsed.activeTenantId = unitId;
          localStorage.setItem('erp_auth_user', JSON.stringify(parsed));
        }
      } catch (e) {}

      if (preferredBranchId) {
        const targetBranch = found.branches.find(b => b.id === preferredBranchId || b.code === preferredBranchId);
        if (targetBranch) {
          setActiveBranch(targetBranch);
          try { localStorage.setItem('erp_active_branch_id', targetBranch.id); } catch (e) {}
          return;
        }
      }
      if (found.branches && found.branches.length > 0) {
        setActiveBranch(found.branches[0]);
        try { localStorage.setItem('erp_active_branch_id', found.branches[0].id); } catch (e) {}
      }
    }
  };

  const switchBranch = (branchId: string) => {
    if (!activeUnit.branches) return;
    const targetBranch = activeUnit.branches.find(b => b.id === branchId || b.code === branchId);
    if (targetBranch) {
      setActiveBranch(targetBranch);
      try { localStorage.setItem('erp_active_branch_id', targetBranch.id); } catch (e) {}
    }
  };

  // Determine user permissions for switching units
  const [canSwitchUnit, setCanSwitchUnit] = useState(true);
  const [isHoldingExecutive, setIsHoldingExecutive] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('erp_auth_user');
      if (storedUser) {
        const u = JSON.parse(storedUser);
        const isHolding = u.systemRole === 'HOLDING_EXECUTIVE' || u.email?.toLowerCase().includes('holding');
        const isAdmin = isHolding || u.systemRole === 'COMPANY_ADMIN' || u.email?.toLowerCase().includes('admin');
        setIsHoldingExecutive(isHolding);
        setCanSwitchUnit(isAdmin || true);
      }
    } catch (e) {}
  }, [activeUnit]);

  return (
    <TenantContext.Provider
      value={{
        activeUnit,
        activeBranch,
        availableUnits: MOCK_UNITS,
        availableBranches: activeUnit.branches || [],
        canSwitchUnit,
        isHoldingExecutive,
        switchUnit,
        switchBranch
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenantContext = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenantContext must be used within a TenantProvider');
  }
  return context;
};
