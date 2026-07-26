export interface DepartmentCategory {
  id: string;
  code: string;
  name: string;
  employeeCount: number;
  salaryCoaCode: string;
  salaryCoaName: string;
  description: string;
}

export interface WorkerTypeItem {
  id: string;
  code: string;
  name: string; // PKWT, PKWTT, Outsourcing, Magang, Borongan Harian
  category: 'KONTRAK' | 'TETAP' | 'OUTSOURCING' | 'HARIAN_LEPAS' | 'BORONGAN' | 'MAGANG';
  maxDaysPerMonth?: number; // e.g. < 21 hari for Buruh Harian Lepas
  expression: string; // e.g. (Gaji Pokok + Lembur) - (BPJS + PPh21 TER)
  salaryCoa: string;
  description?: string;
  isDeleted?: boolean;
}

export interface PayrollFormulaRule {
  id: string;
  code: string;
  name: string;
  workerTypeId: string;
  expression: string; // e.g. (Gaji Pokok + Lembur) - (BPJS + PPh21 TER)
  baseSalaryCoa: string;
  isDeleted?: boolean;
}

export interface EmployeeItem {
  id: string;
  nik: string;
  fullName: string;
  departmentId: string;
  department: string;
  workerTypeId: string;
  workerTypeName: string;
  unitUsaha: string;
  role: string;
  salaryType: 'MONTHLY' | 'DAILY' | 'PIECEWORK_COMMISSION';
  baseSalary: number;
  bpjsKesehatan: number;
  bpjsKetenagakerjaan: number;
  pph21Rate: number; // TER percentage
  netSalary: number;
  status: 'ACTIVE' | 'ON_LEAVE' | 'PROBATION';
  isDeleted?: boolean;
}

export const MOCK_WORKER_TYPES: WorkerTypeItem[] = [
  {
    id: 'wt-01',
    code: 'PKWTT-TETAP',
    name: 'PKWTT (Karyawan Tetap)',
    category: 'TETAP',
    expression: '(Gaji Pokok + Tunjangan + Lembur) - (BPJS 4.24% + PPh21 TER)',
    salaryCoa: '5-20100 - Beban Gaji Karyawan Tetap (PKWTT)',
    description: 'Karyawan tetap tanpa batas waktu berakhirnya hubungan kerja.'
  },
  {
    id: 'wt-02',
    code: 'PKWT-KONTRAK',
    name: 'PKWT (Karyawan Kontrak Waktu Tertentu)',
    category: 'KONTRAK',
    expression: '(Gaji Kontrak + Bonus Kinerja) - (BPJS 4.24% + PPh21 TER)',
    salaryCoa: '5-20101 - Beban Gaji Kontrak (PKWT)',
    description: 'Pekerja kontrak jangka pendek sesuai batas waktu perjanjian kerja.'
  },
  {
    id: 'wt-03',
    code: 'PKWT-HARIAN',
    name: 'Buruh Harian Lepas (PKWT < 21 Hari)',
    category: 'HARIAN_LEPAS',
    maxDaysPerMonth: 20,
    expression: '(Upah Harian x Jumlah Hari Hadir) - PPh21 Harian',
    salaryCoa: '5-20102 - Beban Upah Buruh Harian Lepas',
    description: 'Pekerja harian lepas dengan batas kerja maksimal < 21 hari per bulan.'
  },
  {
    id: 'wt-04',
    code: 'OUTSOURCING-3RD',
    name: 'Pekerja Alih Daya (Outsourcing)',
    category: 'OUTSOURCING',
    expression: '(Biaya Jasa Manajemen Outsourcing + Invoice Fee)',
    salaryCoa: '5-20103 - Beban Jasa Pekerja Outsourcing',
    description: 'Tenaga kerja dari perusahaan penyedia jasa pihak ketiga.'
  }
];

export const MOCK_PAYROLL_FORMULAS: PayrollFormulaRule[] = [
  {
    id: 'pf-01',
    code: 'FORMULA-PKWTT',
    name: 'Formula Gaji Standar PKWTT (Bulanan)',
    workerTypeId: 'wt-01',
    expression: '(Gaji Pokok + Tunjangan + Lembur) - (BPJS 4.24% + PPh21 TER)',
    baseSalaryCoa: '5-20100 - Beban Gaji Karyawan Tetap (PKWTT)'
  },
  {
    id: 'pf-02',
    code: 'FORMULA-HARIAN',
    name: 'Formula Buruh Harian Lepas (< 21 Hari)',
    workerTypeId: 'wt-03',
    expression: '(Upah Harian x Jumlah Hari Hadir) - PPh21 Harian',
    baseSalaryCoa: '5-20102 - Beban Upah Buruh Harian Lepas'
  }
];

export const MOCK_DEPARTMENTS: DepartmentCategory[] = [
  {
    id: 'dept-01',
    code: 'DEPT-EXEC',
    name: 'Executive Board & Management',
    employeeCount: 1,
    salaryCoaCode: '5-20100',
    salaryCoaName: 'Beban Gaji Direksi & Executive',
    description: 'Direksi holding & pimpinan eksekutif unit usaha.'
  },
  {
    id: 'dept-02',
    code: 'DEPT-MINE',
    name: 'Mining Operations & Heavy Equip',
    employeeCount: 1,
    salaryCoaCode: '5-20101',
    salaryCoaName: 'Beban Gaji Operator & Technicians Mining',
    description: 'Operator alat berat CAT/Komatsu, supervisor tambang, & teknisi.'
  },
  {
    id: 'dept-03',
    code: 'DEPT-KITCHEN',
    name: 'Kitchen & Catering Operations',
    employeeCount: 1,
    salaryCoaCode: '5-20103',
    salaryCoaName: 'Beban Gaji Chef & Staf Resto',
    description: 'Head chef, cook helper, barista, & tim catering.'
  }
];

export const MOCK_EMPLOYEES: EmployeeItem[] = [
  {
    id: 'emp-001',
    nik: 'NIK-HOLDING-001',
    fullName: 'Budi Santoso',
    departmentId: 'dept-01',
    department: 'Executive Board & Management',
    workerTypeId: 'wt-01',
    workerTypeName: 'PKWTT (Karyawan Tetap)',
    unitUsaha: 'Holding Central',
    role: 'Holding Executive',
    salaryType: 'MONTHLY',
    baseSalary: 35000000,
    bpjsKesehatan: 350000,
    bpjsKetenagakerjaan: 700000,
    pph21Rate: 9.0,
    netSalary: 30800000,
    status: 'ACTIVE'
  },
  {
    id: 'emp-002',
    nik: 'NIK-MINE-088',
    fullName: 'Rudi Hermawan',
    departmentId: 'dept-02',
    department: 'Mining Operations & Heavy Equip',
    workerTypeId: 'wt-03',
    workerTypeName: 'Buruh Harian Lepas (PKWT < 21 Hari)',
    unitUsaha: 'PT Borneo Mining Emas',
    role: 'Operator CAT 777',
    salaryType: 'DAILY',
    baseSalary: 450000,
    bpjsKesehatan: 45000,
    bpjsKetenagakerjaan: 90000,
    pph21Rate: 2.5,
    netSalary: 10800000,
    status: 'ACTIVE'
  },
  {
    id: 'emp-003',
    nik: 'NIK-FNB-014',
    fullName: 'Dewi Lestari',
    departmentId: 'dept-03',
    department: 'Kitchen & Catering Operations',
    workerTypeId: 'wt-02',
    workerTypeName: 'PKWT (Karyawan Kontrak Waktu Tertentu)',
    unitUsaha: 'Nusantara Culinary & Catering',
    role: 'Head Catering Chef',
    salaryType: 'PIECEWORK_COMMISSION',
    baseSalary: 8500000,
    bpjsKesehatan: 85000,
    bpjsKetenagakerjaan: 170000,
    pph21Rate: 4.0,
    netSalary: 14200000,
    status: 'ACTIVE'
  }
];
