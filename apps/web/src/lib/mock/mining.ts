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
    name: 'Caterpillar 390F Heavy Excavator',
    type: 'EXCAVATOR',
    siteLocation: 'Site Pit Block 4 Kutai',
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
    siteLocation: 'Site Pit Block 4 Kutai',
    operatorName: 'Suryadi Mining',
    fuelConsumptionPerHour: 68,
    currentFuelLevel: 920,
    maxTankCapacity: 1300,
    hourMeterTotal: 5180,
    status: 'OPERATIONAL'
  },
  {
    id: 'fleet-03',
    code: 'DZ-CAT-D10T',
    name: 'Caterpillar D10T Dozer Crawler',
    type: 'BULLDOZER',
    siteLocation: 'Stockpile Ore Yard 2',
    operatorName: 'Agus Setiawan',
    fuelConsumptionPerHour: 48,
    currentFuelLevel: 210,
    maxTankCapacity: 1150,
    hourMeterTotal: 6890,
    status: 'UNDER_MAINTENANCE'
  }
];

export const MOCK_ORE_LOGS: OreProductionLog[] = [
  {
    id: 'ore-01',
    logCode: 'ORE-202607-001',
    date: '2026-07-24',
    shift: 'SHIFT_1_DAY',
    pitSite: 'Pit East Block 4 Kutai',
    targetStockpile: 'Stockpile Ore Yard 1 (High Grade)',
    oreGradeGramsPerTon: 4.8,
    tonnageExtracted: 1450,
    haulingTrucksCount: 14,
    supervisor: 'Ir. Hidayat Mining'
  },
  {
    id: 'ore-02',
    logCode: 'ORE-202607-002',
    date: '2026-07-23',
    shift: 'SHIFT_2_NIGHT',
    pitSite: 'Pit West Block 2 Berau',
    targetStockpile: 'Stockpile Ore Yard 2 (Medium Grade)',
    oreGradeGramsPerTon: 3.2,
    tonnageExtracted: 1200,
    haulingTrucksCount: 10,
    supervisor: 'Suprianto Site Engineer'
  }
];

export const MOCK_FUEL_LOGS: FuelConsumptionLog[] = [
  {
    id: 'fuel-01',
    refuelCode: 'FUEL-REF-9981',
    timestamp: '2026-07-24 06:15',
    equipmentCode: 'EXC-CAT-390F',
    equipmentName: 'Caterpillar 390F Heavy Excavator',
    fuelDispersedLiters: 650,
    sourceTank: 'Tangki BBM Solar HSD Utama Site (50.000L)',
    dispenserOperator: 'Joko Dispenser Ops'
  },
  {
    id: 'fuel-02',
    refuelCode: 'FUEL-REF-9982',
    timestamp: '2026-07-24 06:45',
    equipmentCode: 'DT-KOM-785',
    equipmentName: 'Komatsu HD785-7 Mining Dump Truck',
    fuelDispersedLiters: 720,
    sourceTank: 'Tangki BBM Solar HSD Utama Site (50.000L)',
    dispenserOperator: 'Joko Dispenser Ops'
  }
];
