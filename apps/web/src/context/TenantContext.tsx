'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_UNITS, TenantUnit, BranchInfo } from '@/lib/mock/units';

interface TenantContextType {
  activeUnit: TenantUnit;
  activeBranch: BranchInfo;
  availableUnits: TenantUnit[];
  availableBranches: BranchInfo[];
  switchUnit: (unitId: string, branchId?: string) => void;
  switchBranch: (branchId: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeUnit, setActiveUnit] = useState<TenantUnit>(MOCK_UNITS[0]);
  const [activeBranch, setActiveBranch] = useState<BranchInfo>(MOCK_UNITS[0].branches[0]);

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
      if (preferredBranchId) {
        const targetBranch = found.branches.find(b => b.id === preferredBranchId || b.code === preferredBranchId);
        if (targetBranch) {
          setActiveBranch(targetBranch);
          return;
        }
      }
      if (found.branches && found.branches.length > 0) {
        setActiveBranch(found.branches[0]);
      }
    }
  };

  const switchBranch = (branchId: string) => {
    if (!activeUnit.branches) return;
    const targetBranch = activeUnit.branches.find(b => b.id === branchId || b.code === branchId);
    if (targetBranch) {
      setActiveBranch(targetBranch);
    }
  };

  return (
    <TenantContext.Provider
      value={{
        activeUnit,
        activeBranch,
        availableUnits: MOCK_UNITS,
        availableBranches: activeUnit.branches || [],
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
