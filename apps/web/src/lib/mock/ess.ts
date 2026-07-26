export interface AttendanceRecord {
  id: string;
  date: string;
  clockInTime: string;
  clockOutTime?: string;
  method: 'WEBGL_FACE_RECOGNITION' | 'PHYSICAL_BIOMETRIC_PUSH' | 'MANUAL';
  faceMatchScore?: number; // e.g. 98.4% match
  gpsLocation: string; // e.g. "Site Tambang Emas Alpha (-0.923, 116.821)"
  status: 'PRESENT' | 'LATE' | 'ABSENT';
}

export interface LeaveRequest {
  id: string;
  employeeName?: string;
  departmentName?: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  attachmentFile?: string;
  status: 'PENDING_SUPERVISOR' | 'PENDING_HRD' | 'APPROVED' | 'REJECTED';
  supervisorApprovalDate?: string;
  hrdApprovalDate?: string;
}

export interface ReimbursementClaim {
  id: string;
  claimCode: string;
  employeeName?: string;
  departmentName?: string;
  category: 'MEDIS' | 'TRANSPORT' | 'DINAS' | 'PERLENGKAPAN';
  date: string;
  description: string;
  amount: number;
  receiptFile: string;
  status: 'PENDING_SUPERVISOR' | 'PENDING_HRD' | 'APPROVED' | 'REJECTED';
  supervisorApprovalDate?: string;
  hrdApprovalDate?: string;
}

export interface EmployeePayslip {
  id: string;
  periodMonth: string;
  baseSalary: number;
  allowances: number;
  overtimePay: number;
  grossPay: number;
  pph21Tax: number; // TER 2026 Rate
  bpjsDeduction: number;
  takeHomePay: number;
  downloadUrl: string;
}

export const MOCK_ATTENDANCES: AttendanceRecord[] = [
  {
    id: 'att-101',
    date: '2026-07-23',
    clockInTime: '07:54:12',
    clockOutTime: '17:05:00',
    method: 'WEBGL_FACE_RECOGNITION',
    faceMatchScore: 99.2,
    gpsLocation: 'HQ Nusantara Group (-6.208, 106.845)',
    status: 'PRESENT'
  },
  {
    id: 'att-102',
    date: '2026-07-22',
    clockInTime: '06:45:00',
    clockOutTime: '16:00:00',
    method: 'PHYSICAL_BIOMETRIC_PUSH',
    faceMatchScore: 100,
    gpsLocation: 'Site Tambang Gold-01 (-0.923, 116.821)',
    status: 'PRESENT'
  }
];

export const MOCK_LEAVES: LeaveRequest[] = [
  {
    id: 'lv-001',
    employeeName: 'Budi Santoso',
    departmentName: 'Operasional Site Tambang',
    type: 'Cuti Tahunan (Annual Leave)',
    startDate: '2026-08-01',
    endDate: '2026-08-03',
    reason: 'Acara Keluarga & Cuti Tahunan',
    status: 'PENDING_SUPERVISOR'
  },
  {
    id: 'lv-002',
    employeeName: 'Siti Rahma',
    departmentName: 'Dapur & Service Resto',
    type: 'Izin Sakit dengan Surat Dokter',
    startDate: '2026-07-28',
    endDate: '2026-07-29',
    reason: 'Demam & Rawat Jalan RS Siloam',
    attachmentFile: 'Surat_Keterangan_Dokter_Siloam.pdf',
    status: 'PENDING_HRD',
    supervisorApprovalDate: '2026-07-25 08:30'
  },
  {
    id: 'lv-003',
    employeeName: 'Dewi Lestari',
    departmentName: 'Front Office Hotel',
    type: 'Cuti Melahirkan',
    startDate: '2026-08-15',
    endDate: '2026-11-15',
    reason: 'Persalinan & Cuti Hamil 3 Bulan',
    status: 'APPROVED',
    supervisorApprovalDate: '2026-07-20 10:15',
    hrdApprovalDate: '2026-07-21 14:00'
  }
];

export const MOCK_REIMBURSEMENTS: ReimbursementClaim[] = [
  {
    id: 'rmb-01',
    claimCode: 'RMB-2026-044',
    employeeName: 'Budi Santoso',
    departmentName: 'Operasional Site Tambang',
    category: 'TRANSPORT',
    date: '2026-07-24',
    description: 'Bensin & Tol Perjalanan Dinas Kunjungan Site Samarinda',
    amount: 650000,
    receiptFile: 'Struk_Bensin_Tol_Pasteur.pdf',
    status: 'PENDING_SUPERVISOR'
  },
  {
    id: 'rmb-02',
    claimCode: 'RMB-2026-052',
    employeeName: 'Ahmad Rizky',
    departmentName: 'IT & Digital Security',
    category: 'MEDIS',
    date: '2026-07-23',
    description: 'Klaim Kacamata Resep Dokter & Vitamin Kesehatan',
    amount: 1200000,
    receiptFile: 'Kwitansi_Optik_Melawai_Dokter.pdf',
    status: 'PENDING_HRD',
    supervisorApprovalDate: '2026-07-24 16:20'
  }
];

export const MOCK_PAYSLIP: EmployeePayslip = {
  id: 'pay-2026-07',
  periodMonth: 'Juli 2026',
  baseSalary: 12500000,
  allowances: 2500000,
  overtimePay: 1200000,
  grossPay: 16200000,
  pph21Tax: 810000, // PPh 21 TER 2026 Category B (5%)
  bpjsDeduction: 648000, // BPJS TK 3% + Kes 1%
  takeHomePay: 14742000,
  downloadUrl: '/payslips/Slip_Gaji_Juli_2026.pdf'
};
