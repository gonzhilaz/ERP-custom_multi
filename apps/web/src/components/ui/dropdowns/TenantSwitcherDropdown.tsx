'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Store, MapPin, Building } from 'lucide-react';
import { useTenantContext } from '@/context/TenantContext';

export const TenantSwitcherDropdown = () => {
  const { activeUnit, activeBranch, availableUnits, availableBranches, switchUnit, switchBranch } = useTenantContext();
  const [isOpenTenant, setIsOpenTenant] = useState(false);
  const [isOpenBranch, setIsOpenBranch] = useState(false);
  const router = useRouter();

  const handleSelectUnit = (unitId: string) => {
    switchUnit(unitId);
    setIsOpenTenant(false);
    router.push('/');
  };

  const handleSelectBranch = (branchId: string) => {
    switchBranch(branchId);
    setIsOpenBranch(false);
  };

  return (
    <div className="space-y-1.5">
      {/* 1. Tenant / Business Unit Switcher */}
      <div className="relative">
        <button
          onClick={() => {
            setIsOpenTenant(!isOpenTenant);
            setIsOpenBranch(false);
          }}
          className="w-full flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-left transition-colors border border-slate-200 dark:border-slate-700/60"
        >
          <div className="truncate pr-2 flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <div className="truncate">
              <div className="font-semibold text-xs text-slate-900 dark:text-slate-100 truncate">{activeUnit.name}</div>
              <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">{activeUnit.type}</div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        </button>

        {isOpenTenant && (
          <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unit Usaha (Tenants)</div>
            {availableUnits.map((unit) => (
              <button
                key={unit.tenantId}
                onClick={() => handleSelectUnit(unit.tenantId)}
                className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-sky-50 dark:hover:bg-slate-800 ${
                  activeUnit.tenantId === unit.tenantId
                    ? 'bg-sky-50 dark:bg-slate-800/80 font-semibold text-sky-600 dark:text-sky-400'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="truncate">{unit.name}</span>
                <span className="text-[10px] opacity-75">{unit.type}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Branch / Cabang Switcher */}
      {availableBranches && availableBranches.length > 0 && (
        <div className="relative">
          <button
            onClick={() => {
              setIsOpenBranch(!isOpenBranch);
              setIsOpenTenant(false);
            }}
            className="w-full flex items-center justify-between px-2 py-1.5 bg-amber-500/10 dark:bg-amber-500/10 hover:bg-amber-500/20 rounded-lg text-left transition-colors border border-amber-500/30 text-amber-700 dark:text-amber-300"
          >
            <div className="truncate pr-2 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <div className="truncate">
                <span className="text-[11px] font-semibold block truncate">
                  {activeBranch ? activeBranch.name : 'Cabang Utama'}
                </span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          </button>

          {isOpenBranch && (
            <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-500" />
                <span>Pilih Cabang (Branch)</span>
              </div>
              {availableBranches.map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleSelectBranch(b.id)}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-amber-50 dark:hover:bg-slate-800 ${
                    activeBranch?.id === b.id
                      ? 'bg-amber-50 dark:bg-amber-950/40 font-semibold text-amber-600 dark:text-amber-400'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="truncate">{b.name}</span>
                  <span className="text-[10px] opacity-75">{b.address} ({b.city})</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
