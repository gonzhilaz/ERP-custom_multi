export interface RequisitionFPTK {
  id: string;
  fptkCode: string;
  departmentName: string;
  positionTitle: string;
  headcountNeeded: number;
  reason: 'EXPANSION' | 'REPLACEMENT' | 'SEASONAL';
  salaryMin: number;
  salaryMax: number;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'FULFILLED' | 'REJECTED';
  requestedBy: string;
  requestDate: string;
}

export interface JobVacancy {
  id: string;
  vacancyCode: string;
  title: string;
  departmentName: string;
  openings: number;
  filled: number;
  location: string;
  closingDate: string;
  status: 'OPEN' | 'CLOSED';
}

export interface ApplicantCandidate {
  id: string;
  applicantCode: string;
  name: string;
  phone: string;
  email: string;
  appliedPosition: string;
  departmentName: string;
  experienceSummary: string;
  cvFileName: string;
  source: 'WHATSAPP_BOT' | 'EMAIL_BOT' | 'CAREER_PORTAL';
  appliedDate: string;
  status:
    | 'NEW_APPLICANT'
    | 'SCREENING'
    | 'INTERVIEW_SCHEDULED'
    | 'OFFERING_GIVEN'
    | 'WA_OFFERING_PENDING'
    | 'HIRED'
    | 'REJECTED';
  interviewDate?: string;
  interviewNotes?: string;
  offeringSalary?: number;
  scenarioType?: 1 | 2 | 3 | 4;
  waNotificationLog?: string[];
}

export const MOCK_FPTKS: RequisitionFPTK[] = [
  {
    id: 'fptk-01',
    fptkCode: 'FPTK-2026-008',
    departmentName: 'Operasional Site Tambang',
    positionTitle: 'Operator Excavator CAT 777',
    headcountNeeded: 3,
    reason: 'EXPANSION',
    salaryMin: 8500000,
    salaryMax: 12000000,
    status: 'APPROVED',
    requestedBy: 'Bambang Tri (Manager Site Mining)',
    requestDate: '2026-07-20'
  },
  {
    id: 'fptk-02',
    fptkCode: 'FPTK-2026-012',
    departmentName: 'Dapur Resto & Catering',
    positionTitle: 'Junior Line Cook Catering',
    headcountNeeded: 2,
    reason: 'REPLACEMENT',
    salaryMin: 4500000,
    salaryMax: 6000000,
    status: 'PENDING_APPROVAL',
    requestedBy: 'Chef Arnold (Head Chef)',
    requestDate: '2026-07-24'
  }
];

export const MOCK_VACANCIES: JobVacancy[] = [
  {
    id: 'vac-01',
    vacancyCode: 'VAC-2026-04',
    title: 'Operator Excavator CAT 777',
    departmentName: 'Operasional Site Tambang',
    openings: 3,
    filled: 1,
    location: 'Site Samarinda, Kaltim',
    closingDate: '2026-08-15',
    status: 'OPEN'
  },
  {
    id: 'vac-02',
    vacancyCode: 'VAC-2026-07',
    title: 'Staff Akuntansi & Tax PPh 21',
    departmentName: 'Finance & Accounting',
    openings: 1,
    filled: 0,
    location: 'HQ Holding Central Jakarta',
    closingDate: '2026-08-10',
    status: 'OPEN'
  }
];

export const MOCK_APPLICANTS: ApplicantCandidate[] = [
  {
    id: 'cand-101',
    applicantCode: 'APPL-WA-881',
    name: 'Rian Hidayat',
    phone: '+6281399881122',
    email: 'rian.hidayat@gmail.com',
    appliedPosition: 'Operator Excavator CAT 777',
    departmentName: 'Operasional Site Tambang',
    experienceSummary: '4 Tahun Operator Alat Berat tambang batu bara Kaltim, Sertifikat SIO Aktif',
    cvFileName: 'CV_Rian_Hidayat_Operator.pdf',
    source: 'WHATSAPP_BOT',
    appliedDate: '2026-07-25 09:14',
    status: 'NEW_APPLICANT',
    waNotificationLog: ['[WA BOT] Template Format Dikirim', '[WA BOT] Format & CV Berhasil Di-parse']
  },
  {
    id: 'cand-102',
    applicantCode: 'APPL-WA-890',
    name: 'Anita Wijaya',
    phone: '+6285712345678',
    email: 'anita.wijaya@gmail.com',
    appliedPosition: 'Staff Akuntansi & Tax PPh 21',
    departmentName: 'Finance & Accounting',
    experienceSummary: '3 Tahun Staff Accounting retail, PPh 21 TER Brevet A/B',
    cvFileName: 'CV_Anita_Wijaya_TaxAcc.pdf',
    source: 'WHATSAPP_BOT',
    appliedDate: '2026-07-25 08:30',
    status: 'NEW_APPLICANT',
    waNotificationLog: ['[WA BOT] Template Format Dikirim', '[WA BOT] Format & CV Berhasil Di-parse']
  },
  {
    id: 'cand-103',
    applicantCode: 'APPL-WA-755',
    name: 'Doni Pratama',
    phone: '+6281277665544',
    email: 'doni.pratama@gmail.com',
    appliedPosition: 'Junior Line Cook Catering',
    departmentName: 'Dapur Resto & Catering',
    experienceSummary: '2 Tahun Commis Chef Hotel 4 Star, Sertifikat Hygiene Food',
    cvFileName: 'CV_Doni_Pratama_Chef.pdf',
    source: 'WHATSAPP_BOT',
    appliedDate: '2026-07-24 14:00',
    status: 'INTERVIEW_SCHEDULED',
    interviewDate: '2026-07-28 10:00 WIB',
    interviewNotes: 'Wawancara Dapur Resto HQ Central',
    waNotificationLog: ['[WA BOT] Undangan Interview Dikirim via WA']
  }
];
