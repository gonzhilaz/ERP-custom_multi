'use client';

import { useState } from 'react';
import {
  HeavyFleetItem,
  OreProductionLog,
  FuelConsumptionLog,
  MOCK_HEAVY_FLEET,
  MOCK_ORE_LOGS,
  MOCK_FUEL_LOGS
} from '@/lib/mock/mining';

export function useMining() {
  const [fleets, setFleets] = useState<HeavyFleetItem[]>(MOCK_HEAVY_FLEET);
  const [oreLogs, setOreLogs] = useState<OreProductionLog[]>(MOCK_ORE_LOGS);
  const [fuelLogs, setFuelLogs] = useState<FuelConsumptionLog[]>(MOCK_FUEL_LOGS);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ORE_LOGS' | 'FUEL_LOGS' | 'FLEET'>('OVERVIEW');

  const addOreLog = (newLog: Omit<OreProductionLog, 'id' | 'logCode' | 'date'>) => {
    const created: OreProductionLog = {
      ...newLog,
      id: `ore-${Date.now()}`,
      logCode: `ORE-${new Date().toISOString().substring(0, 7).replace('-', '')}-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().substring(0, 10)
    };

    setOreLogs((prev) => [created, ...prev]);
  };

  const addFuelLog = (newFuel: Omit<FuelConsumptionLog, 'id' | 'refuelCode' | 'timestamp'>) => {
    const created: FuelConsumptionLog = {
      ...newFuel,
      id: `fuel-${Date.now()}`,
      refuelCode: `FUEL-REF-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setFuelLogs((prev) => [created, ...prev]);

    // Update fleet current fuel level
    setFleets((prev) =>
      prev.map((f) =>
        f.code === newFuel.equipmentCode
          ? { ...f, currentFuelLevel: Math.min(f.maxTankCapacity, f.currentFuelLevel + newFuel.fuelDispersedLiters) }
          : f
      )
    );
  };

  const totalOreTonnage = oreLogs.reduce((acc, curr) => acc + curr.tonnageExtracted, 0);
  const totalFuelDispersed = fuelLogs.reduce((acc, curr) => acc + curr.fuelDispersedLiters, 0);
  const operationalFleetCount = fleets.filter((f) => f.status === 'OPERATIONAL').length;

  return {
    fleets,
    oreLogs,
    fuelLogs,
    activeTab,
    setActiveTab,
    totalOreTonnage,
    totalFuelDispersed,
    operationalFleetCount,
    addOreLog,
    addFuelLog
  };
}
