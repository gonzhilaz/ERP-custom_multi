/**
 * Surat Perintah Perjalanan Dinas (SPPD) & Disposisi Tugas Keluar Cabang Governance.
 */

export type SppdStatus = 'DRAFT' | 'WAITING_SPV_APPROVAL' | 'WAITING_MANAGER_APPROVAL' | 'ISSUED' | 'COMPLETED' | 'REJECTED';

export interface SppdOrder {
  id: string;
  sppdNumber: string;
  employeeId: string;
  employeeName: string;
  employeePosition: string;
  department: string;
  originBranch: string;
  destinationBranch: string;
  purpose: string;
  startDate: string;
  endDate: string;
  daysCount: number;
  allowancePerDiem: number;
  transportAllowance: number;
  status: SppdStatus;
  approvedBySpv?: string;
  approvedByManager?: string;
  issuedDate?: string;
  qrVerificationToken: string;
}

export const INITIAL_SPPD_ORDERS: SppdOrder[] = [
  {
    id: 'sppd-001',
    sppdNumber: 'SPPD/2026/07/0042',
    employeeId: 'EMP-004',
    employeeName: 'Rudi Hermawan',
    employeePosition: 'Senior Mining Maintenance Engineer',
    department: 'Operasional Site Tambang',
    originBranch: 'Jakarta HQ Holding',
    destinationBranch: 'Site Tambang Emas Samarinda Kaltim',
    purpose: 'Inspeksi Rutin & Kalibrasi Excavator CAT 777D serta Overhaul Engine Heavy Fleet',
    startDate: '2026-08-01',
    endDate: '2026-08-07',
    daysCount: 7,
    allowancePerDiem: 3500000,
    transportAllowance: 2500000,
    status: 'ISSUED',
    approvedBySpv: 'Bambang Wijaya (SPV Site)',
    approvedByManager: 'Ir. H. Gunawan (VP Mining Ops)',
    issuedDate: '2026-07-25',
    qrVerificationToken: 'SPPD-VERIFY-8890-SAMARINDA'
  },
  {
    id: 'sppd-002',
    sppdNumber: 'SPPD/2026/07/0045',
    employeeId: 'EMP-012',
    employeeName: 'Siti Rahmawati',
    employeePosition: 'Quality Assurance Chef Manager',
    department: 'Catering & Resto Production',
    originBranch: 'Jakarta Bakery Kitchen',
    destinationBranch: 'Resort Hotel PMS Bali Branch',
    purpose: 'Audit Standar Mutu Resep Menu Dinner VIP Guest & Pelatihan Hygiene Kitchen Staff',
    startDate: '2026-08-10',
    endDate: '2026-08-14',
    daysCount: 5,
    allowancePerDiem: 2500000,
    transportAllowance: 1800000,
    status: 'WAITING_MANAGER_APPROVAL',
    approvedBySpv: 'Chef Ahmad Dahlan',
    qrVerificationToken: 'SPPD-VERIFY-9912-BALI'
  }
];

export function generateSppdNumber(sequence: number = 46): string {
  const month = new Date().getMonth() + 1;
  const monthStr = month < 10 ? `0${month}` : `${month}`;
  return `SPPD/2026/${monthStr}/${sequence.toString().padStart(4, '0')}`;
}
