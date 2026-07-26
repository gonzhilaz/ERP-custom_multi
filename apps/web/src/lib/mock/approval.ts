export interface ApprovalHierarchyRule {
  id: string;
  moduleCategory: 'HRD_LEAVES' | 'HRD_PERFORMANCE' | 'PROCUREMENT_PO' | 'FINANCE_EXPENSE';
  processName: string;
  nominalThresholdMin?: number;
  nominalThresholdMax?: number;
  evaluatorRole: string;
  firstApproverRole: string;
  finalApproverRole: string;
  description: string;
}

export const MOCK_APPROVAL_RULES: ApprovalHierarchyRule[] = [
  {
    id: 'rule-001',
    moduleCategory: 'HRD_PERFORMANCE',
    processName: 'Evaluasi Kinerja Karyawan (KPI Review)',
    evaluatorRole: 'Direct Supervisor / Manager Unit',
    firstApproverRole: 'HRD Manager',
    finalApproverRole: 'Direksi / Holding Executive',
    description: 'Atasan langsung melakukan scoring KPI (1-100), diverifikasi oleh HRD, dan disetujui Direksi untuk pengajuan bonus.'
  },
  {
    id: 'rule-002',
    moduleCategory: 'HRD_LEAVES',
    processName: 'Pengajuan Cuti, Izin, & Lembur (Overtime)',
    evaluatorRole: 'Karyawan Pemohon',
    firstApproverRole: 'Direct Manager / Supervisor Site',
    finalApproverRole: 'HRD Administrator',
    description: 'Permohonan cuti atau lembur wajib di-ACC oleh manager atasan langsung sebelum dicatat di sistem Payroll.'
  },
  {
    id: 'rule-003',
    moduleCategory: 'PROCUREMENT_PO',
    processName: 'Persetujuan Purchase Order (PO > 50 Juta)',
    nominalThresholdMin: 50000000,
    evaluatorRole: 'Procurement Specialist',
    firstApproverRole: 'Manager Unit Usaha',
    finalApproverRole: 'Direksi / Holding Executive (ACC Mandatory)',
    description: 'PO dengan nominal di atas Rp 50 Juta wajib mendapatkan persetujuan langsung dari Direksi Holding.'
  }
];
