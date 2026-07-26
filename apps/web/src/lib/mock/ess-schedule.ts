export interface WorkShiftCategory {
  id: string;
  code: string;
  name: string;
  workType: 'OFFICE_HOUR' | 'SHIFT_ROSTER' | 'DAILY_WORKER' | 'HALF_DAY';
  normalHours: string; // e.g. "07:00 - 16:00"
  halfDayHours?: string; // e.g. "08:00 - 12:00 (Setengah Hari)"
  breakHours: string; // e.g. "12:00 - 13:00"
  totalHoursPerDay: number;
  description: string;
}

export interface EmployeeScheduleRoster {
  id: string;
  date: string;
  dayName: string;
  shiftCode: string;
  shiftName: string;
  shiftHours: string;
  supervisorName: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'OFF_DAY';
}

export interface DetailedCalendarAttendance {
  date: string;
  dayNumber: number;
  clockIn: string | null;
  clockOut: string | null;
  breakStart: string | null;
  breakEnd: string | null;
  shiftAssigned: string;
  status: 'PRESENT' | 'LATE' | 'OFF' | 'LEAVE' | 'ABSENT';
  gpsLocation?: string;
  faceMatchScore?: number;
  missedCorrectionReason?: string;
  correctionApprovedBy?: string;
}

export interface OvertimeClaim {
  id: string;
  otCode: string;
  date: string;
  hours: number;
  rateMultiplier: string;
  reason: string;
  supervisorApproval: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  warningMessage?: string;
}

export const MASTER_WORK_SHIFTS: WorkShiftCategory[] = [
  {
    id: 'ws-t1',
    code: 'T1 / S1',
    name: 'Shift 1 Pagi (T1/S1)',
    workType: 'SHIFT_ROSTER',
    normalHours: '07:00 - 16:00',
    breakHours: '12:00 - 13:00',
    totalHoursPerDay: 8,
    description: 'Shift 1 operasional pagi untuk store, resto, & site tambang.'
  },
  {
    id: 'ws-t2a',
    code: 'T2A / S2A',
    name: 'Shift 2A Siang (T2A/S2A)',
    workType: 'SHIFT_ROSTER',
    normalHours: '03:00 - 23:00',
    breakHours: '18:00 - 19:00',
    totalHoursPerDay: 7,
    description: 'Shift 2A operasional siang hingga malam.'
  },
  {
    id: 'ws-t2b',
    code: 'T2B / S2B',
    name: 'Shift 2B Sore (T2B/S2B)',
    workType: 'SHIFT_ROSTER',
    normalHours: '02:00 - 22:00',
    breakHours: '17:00 - 18:00',
    totalHoursPerDay: 7,
    description: 'Shift 2B sore operasional retail & catering.'
  },
  {
    id: 'ws-t3',
    code: 'T3 / S3',
    name: 'Shift 3 Malam (T3/S3)',
    workType: 'SHIFT_ROSTER',
    normalHours: '23:00 - 07:00',
    breakHours: '03:00 - 04:00',
    totalHoursPerDay: 7,
    description: 'Shift 3 malam untuk pengawasan tambang & security hotel.'
  },
  {
    id: 'ws-off',
    code: 'L / OFF',
    name: 'Libur Pekanan (OFF)',
    workType: 'HALF_DAY',
    normalHours: 'N/A (Libur)',
    breakHours: 'N/A',
    totalHoursPerDay: 0,
    description: 'Hari libur pekanan karyawan (OFF).'
  },
  {
    id: 'ws-office',
    code: 'OFFICE-01',
    name: 'Office Hour Regular (08:00 - 17:00 & Setengah Hari Jam 12)',
    workType: 'OFFICE_HOUR',
    normalHours: '08:00 - 17:00 (Senin - Kamis)',
    halfDayHours: '08:00 - 12:00 (Jumat / Sabtu Setengah Hari)',
    breakHours: '12:00 - 13:00',
    totalHoursPerDay: 8,
    description: 'Jam kerja fleksibel staf kantor dengan opsi Jumat/Sabtu setengah hari jam 12.'
  }
];

export const MOCK_WEEKLY_SCHEDULE: EmployeeScheduleRoster[] = [
  { id: 'sch-01', date: '2026-07-20', dayName: 'Senin', shiftCode: 'OFFICE-01', shiftName: 'Office Hour Regular', shiftHours: '08:00 - 17:00', supervisorName: 'Hendra Wijaya (SPV)', status: 'COMPLETED' },
  { id: 'sch-02', date: '2026-07-21', dayName: 'Selasa', shiftCode: 'T1 / S1', shiftName: 'Shift 1 Pagi', shiftHours: '07:00 - 16:00', supervisorName: 'Hendra Wijaya (SPV)', status: 'COMPLETED' },
  { id: 'sch-03', date: '2026-07-22', dayName: 'Rabu', shiftCode: 'T2A / S2A', shiftName: 'Shift 2A Siang', shiftHours: '03:00 - 23:00', supervisorName: 'Hendra Wijaya (SPV)', status: 'COMPLETED' },
  { id: 'sch-04', date: '2026-07-23', dayName: 'Kamis', shiftCode: 'T3 / S3', shiftName: 'Shift 3 Malam', shiftHours: '23:00 - 07:00', supervisorName: 'Hendra Wijaya (SPV)', status: 'COMPLETED' },
  { id: 'sch-05', date: '2026-07-24', dayName: 'Jumat', shiftCode: 'OFFICE-01', shiftName: 'Setengah Hari (Jam 12)', shiftHours: '08:00 - 12:00', supervisorName: 'Hendra Wijaya (SPV)', status: 'SCHEDULED' },
  { id: 'sch-06', date: '2026-07-25', dayName: 'Sabtu', shiftCode: 'OFFICE-01', shiftName: 'Setengah Hari (Jam 12)', shiftHours: '08:00 - 12:00', supervisorName: 'Hendra Wijaya (SPV)', status: 'SCHEDULED' },
  { id: 'sch-07', date: '2026-07-26', dayName: 'Minggu', shiftCode: 'L / OFF', shiftName: 'Libur Pekanan (OFF)', shiftHours: 'N/A', supervisorName: 'Hendra Wijaya (SPV)', status: 'OFF_DAY' }
];

export const MOCK_DETAILED_CALENDAR_ATTENDANCES: Record<string, DetailedCalendarAttendance> = {
  '2026-07-24': {
    date: '2026-07-24',
    dayNumber: 24,
    clockIn: '07:54:10',
    clockOut: '12:05:00',
    breakStart: 'N/A (Half Day)',
    breakEnd: 'N/A (Half Day)',
    shiftAssigned: 'OFFICE-01 Setengah Hari (08:00 - 12:00)',
    status: 'PRESENT',
    gpsLocation: 'HQ Nusantara Group (-6.208, 106.845)',
    faceMatchScore: 99.4
  },
  '2026-07-23': {
    date: '2026-07-23',
    dayNumber: 23,
    clockIn: '07:58:00',
    clockOut: '17:05:22',
    breakStart: '12:00:00',
    breakEnd: '13:00:00',
    shiftAssigned: 'T1 / S1 Shift 1 Pagi (07:00 - 16:00)',
    status: 'PRESENT',
    gpsLocation: 'HQ Nusantara Group (-6.208, 106.845)',
    faceMatchScore: 98.8
  },
  '2026-07-22': {
    date: '2026-07-22',
    dayNumber: 22,
    clockIn: '08:00:00 (Koreksi HR)',
    clockOut: '17:00:00 (Koreksi HR)',
    breakStart: '12:00:00',
    breakEnd: '13:00:00',
    shiftAssigned: 'T2A / S2A Shift 2A Siang',
    status: 'PRESENT',
    gpsLocation: 'Lokasi Tervalidasi HRD',
    faceMatchScore: 100,
    missedCorrectionReason: 'Lupa Absen Selfie saat mati lampu - Laporan Disetujui HRD',
    correctionApprovedBy: 'Siti Aminah (HRD Manager)'
  }
};

export const MOCK_OVERTIME_CLAIMS: OvertimeClaim[] = [
  {
    id: 'ot-001',
    otCode: 'OT-2026-088',
    date: '2026-07-22',
    hours: 3,
    rateMultiplier: '1.5x & 2.0x Rate PerMenaker',
    reason: 'Penyelesaian Laporan Konsolidasi Holding Bulan Juli',
    supervisorApproval: 'Approved by Hendra Wijaya (SPV)',
    status: 'APPROVED'
  },
  {
    id: 'ot-002',
    otCode: 'OT-2026-092',
    date: '2026-07-24',
    hours: 2,
    rateMultiplier: '1.5x Rate PerMenaker',
    reason: 'Audit Stock Opname Gudang Retail Tambahan',
    supervisorApproval: 'Pending Approval SPV',
    status: 'PENDING',
    warningMessage: '⚠️ Pengajuan lembur ini masih Menunggu Approval Atasan (Hendra Wijaya - SPV). Notifikasi aktif di dashboard atasan.'
  }
];
