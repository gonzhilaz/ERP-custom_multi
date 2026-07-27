export interface HeavyFleetItem {
  id: string;
  code: string;
  name: string;
  type: 'EXCAVATOR' | 'DUMP_TRUCK' | 'BULLDOZER' | 'DRILLING_RIG' | 'GENERATOR_SET';
  siteLocation: string;
  operatorName: string;
  fuelConsumptionPerHour: number; // Liter / Jam
  currentFuelLevel: number; // Liter
  maxTankCapacity: number; // Liter
  hourMeterTotal: number; // Hours
  status: 'OPERATIONAL' | 'STANDBY' | 'UNDER_MAINTENANCE';
}

export interface OreProductionLog {
  id: string;
  logCode: string;
  date: string;
  shift: 'SHIFT_1_DAY' | 'SHIFT_2_NIGHT';
  pitSite: string;
  targetStockpile: string;
  oreGradeGramsPerTon: number; // Gold grade (g/t)
  tonnageExtracted: number; // Ton
  haulingTrucksCount: number;
  supervisor: string;
}

export interface FuelConsumptionLog {
  id: string;
  refuelCode: string;
  timestamp: string;
  equipmentCode: string;
  equipmentName: string;
  fuelDispersedLiters: number;
  sourceTank: string;
  dispenserOperator: string;
}

export const MOCK_HEAVY_FLEET: HeavyFleetItem[] = [
  {
    id: 'fleet-01',
    code: 'EXC-CAT-390F',
    name: 'Caterpillar 390F Heavy Excavator (90 Ton)',
    type: 'EXCAVATOR',
    siteLocation: 'Site Pit East Block 4 Kutai',
    operatorName: 'Bambang Sukismo',
    fuelConsumptionPerHour: 55,
    currentFuelLevel: 850,
    maxTankCapacity: 1200,
    hourMeterTotal: 4210,
    status: 'OPERATIONAL'
  },
  {
    id: 'fleet-02',
    code: 'DT-KOM-785',
    name: 'Komatsu HD785-7 Mining Dump Truck (100 Ton)',
    type: 'DUMP_TRUCK',
    siteLocation: 'Site Pit East Block 4 Kutai',
    operatorName: 'Suryadi Mining',
    fuelConsumptionPerHour: 68,
    currentFuelLevel: 920,
    maxTankCapacity: 1300,
    hourMeterTotal: 5180,
    status: 'OPERATIONAL'
  },
  {
    id: 'fleet-03',
    code: 'DT-VOL-FMX',
    name: 'Volvo FMX 440 6x4 Rigid Dump Hauler',
    type: 'DUMP_TRUCK',
    siteLocation: 'Hauling Road Kilometer 45 Berau',
    operatorName: 'Agus Setiawan',
    fuelConsumptionPerHour: 28.5,
    currentFuelLevel: 450,
    maxTankCapacity: 600,
    hourMeterTotal: 3420,
    status: 'OPERATIONAL'
  },
  {
    id: 'fleet-04',
    code: 'DZ-CAT-D10T',
    name: 'Caterpillar D10T Dozer Crawler (70 Ton)',
    type: 'BULLDOZER',
    siteLocation: 'Stockpile Ore Yard 2 Sangatta',
    operatorName: 'Joko Susilo',
    fuelConsumptionPerHour: 48,
    currentFuelLevel: 210,
    maxTankCapacity: 1150,
    hourMeterTotal: 6890,
    status: 'UNDER_MAINTENANCE'
  },
  {
    id: 'fleet-05',
    code: 'GEN-CUM-500',
    name: 'Cummins Silent Generator Set 500 kVA',
    type: 'GENERATOR_SET',
    siteLocation: 'Camp Mess Hall & Processing Plant',
    operatorName: 'Rudi Maintenance',
    fuelConsumptionPerHour: 42,
    currentFuelLevel: 1800,
    maxTankCapacity: 2500,
    hourMeterTotal: 12450,
    status: 'OPERATIONAL'
  }
];

export const MOCK_ORE_LOGS: OreProductionLog[] = [
  {
    id: 'ore-01',
    logCode: 'ORE-202607-001',
    date: '2026-07-26',
    shift: 'SHIFT_1_DAY',
    pitSite: 'Pit East Block 4 Kutai',
    targetStockpile: 'Stockpile Ore Yard 1 (High Grade Au)',
    oreGradeGramsPerTon: 4.8,
    tonnageExtracted: 1450,
    haulingTrucksCount: 14,
    supervisor: 'Ir. Hidayat Mining'
  },
  {
    id: 'ore-02',
    logCode: 'ORE-202607-002',
    date: '2026-07-26',
    shift: 'SHIFT_2_NIGHT',
    pitSite: 'Pit West Block 2 Berau',
    targetStockpile: 'Stockpile Ore Yard 2 (Medium Grade Au)',
    oreGradeGramsPerTon: 3.2,
    tonnageExtracted: 1200,
    haulingTrucksCount: 12,
    supervisor: 'Rahmat Metallurgist'
  },
  {
    id: 'ore-03',
    logCode: 'ORE-202607-003',
    date: '2026-07-25',
    shift: 'SHIFT_1_DAY',
    pitSite: 'Pit South Nickel Sangatta',
    targetStockpile: 'Stockpile Ore Nickel Yard 3 (Fe 48%)',
    oreGradeGramsPerTon: 1.8,
    tonnageExtracted: 2850,
    haulingTrucksCount: 22,
    supervisor: 'Dedi Kurniawan'
  }
];

export const MOCK_FUEL_CONSUMPTION_LOGS: FuelConsumptionLog[] = [
  {
    id: 'fuel-01',
    refuelCode: 'BBM-202607-089',
    timestamp: '2026-07-26 06:15',
    equipmentCode: 'EXC-CAT-390F',
    equipmentName: 'Caterpillar 390F Excavator',
    fuelDispersedLiters: 450,
    sourceTank: 'Fuel Tanker Truck 01 (Solar B35)',
    dispenserOperator: 'Hendra Fuel Dispatch'
  },
  {
    id: 'fuel-02',
    refuelCode: 'BBM-202607-090',
    timestamp: '2026-07-26 06:45',
    equipmentCode: 'DT-VOL-FMX',
    equipmentName: 'Volvo FMX 440 Dump Truck',
    fuelDispersedLiters: 320,
    sourceTank: 'Fuel Station Central Pit 4',
    dispenserOperator: 'Hendra Fuel Dispatch'
  }
];

export const MOCK_FUEL_LOGS = MOCK_FUEL_CONSUMPTION_LOGS;
