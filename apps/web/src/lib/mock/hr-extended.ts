export interface EmployeeContract {
  id: string;
  employeeName: string;
  departmentName: string;
  contractType: 'PKWT' | 'PKWTT' | 'OUTSOURCING';
  startDate: string;
  endDate: string;
  daysRemaining: number;
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED';
}

export interface EmployeeLoan {
  id: string;
  loanCode: string;
  employeeName: string;
  departmentName: string;
  totalAmount: number;
  monthlyDeduction: number;
  paidAmount: number;
  remainingAmount: number;
  tenorMonths: number;
  status: 'ACTIVE' | 'PAID_OFF';
}

export interface EmployeeCertification {
  id: string;
  employeeName: string;
  departmentName: string;
  certificateName: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: 'VALID' | 'EXPIRING_SOON' | 'EXPIRED';
}

export interface HrLetterTemplate {
  id: string;
  title: string;
  type: 'PAKLARING' | 'SK_PKWTT' | 'SP_WARNING' | 'SURAT_DINAS';
  employeeName: string;
  position: string;
  issueDate: string;
  letterNumber: string;
}

export const MOCK_CONTRACTS: EmployeeContract[] = [
  {
    id: 'ct-01',
    employeeName: 'Budi Santoso',
    departmentName: 'Operasional Site Tambang',
    contractType: 'PKWT',
    startDate: '2025-08-15',
    endDate: '2026-08-15',
    daysRemaining: 21,
    status: 'EXPIRING_SOON'
  },
  {
    id: 'ct-02',
    employeeName: 'Siti Rahma',
    departmentName: 'Dapur Resto & Catering',
    contractType: 'PKWT',
    startDate: '2025-09-01',
    endDate: '2026-09-01',
    daysRemaining: 38,
    status: 'EXPIRING_SOON'
  },
  {
    id: 'ct-03',
    employeeName: 'Dewi Lestari',
    departmentName: 'Front Office Hotel',
    contractType: 'PKWTT',
    startDate: '2023-01-10',
    endDate: '2099-12-31',
    daysRemaining: 9999,
    status: 'ACTIVE'
  }
];

export const MOCK_LOANS: EmployeeLoan[] = [
  {
    id: 'ln-01',
    loanCode: 'LOAN-2026-012',
    employeeName: 'Budi Santoso',
    departmentName: 'Operasional Site Tambang',
    totalAmount: 6000000,
    monthlyDeduction: 1000000,
    paidAmount: 2000000,
    remainingAmount: 4000000,
    tenorMonths: 6,
    status: 'ACTIVE'
  },
  {
    id: 'ln-02',
    loanCode: 'LOAN-2026-015',
    employeeName: 'Ahmad Rizky',
    departmentName: 'IT & Security',
    totalAmount: 3000000,
    monthlyDeduction: 500000,
    paidAmount: 3000000,
    remainingAmount: 0,
    tenorMonths: 6,
    status: 'PAID_OFF'
  }
];

export const MOCK_CERTIFICATIONS: EmployeeCertification[] = [
  {
    id: 'cert-01',
    employeeName: 'Budi Santoso',
    departmentName: 'Operasional Site Tambang',
    certificateName: 'SIO Operator Heavy Excavator CAT 777',
    issuer: 'Kementerian Ketenagakerjaan RI',
    issueDate: '2024-08-10',
    expiryDate: '2026-08-10',
    status: 'EXPIRING_SOON'
  },
  {
    id: 'cert-02',
    employeeName: 'Chef Arnold',
    departmentName: 'Dapur Resto & Catering',
    certificateName: 'Sertifikasi Hygiene & Sanitasi Pangan (BPOM)',
    issuer: 'Dinas Kesehatan DKI Jakarta',
    issueDate: '2025-02-15',
    expiryDate: '2027-02-15',
    status: 'VALID'
  }
];

export const MOCK_LETTERS: HrLetterTemplate[] = [
  {
    id: 'let-01',
    title: 'Surat Keterangan Kerja (Paklaring)',
    type: 'PAKLARING',
    employeeName: 'Dewi Lestari',
    position: 'Front Office Supervisor',
    issueDate: '2026-07-25',
    letterNumber: 'HRD/PAK/2026/07-042'
  },
  {
    id: 'let-02',
    title: 'Surat Keputusan Pengangkatan Karyawan Tetap',
    type: 'SK_PKWTT',
    employeeName: 'Budi Santoso',
    position: 'Senior Heavy Equipment Operator',
    issueDate: '2026-07-20',
    letterNumber: 'HRD/SK/2026/07-018'
  }
];
