export interface MeetingTicket {
  id: string;
  ticketCode: string;
  title: string;
  description: string;
  category: 'HEAVY_EQUIPMENT' | 'RAW_MATERIAL' | 'HOSPITALITY_AC' | 'SECURITY' | 'FINANCE_APPROVAL';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'ESCALATED_TO_HO' | 'RESOLVED' | 'CLOSED';
  branchLocation: string;
  createdByName: string;
  assignedToName?: string;
  solutionNote?: string;
  resolvedAt?: string;
  createdAt: string;
  isDeleted?: boolean;
}

export interface MeetingSession {
  id: string;
  sessionCode: string;
  title: string;
  meetingDate: string;
  chairpersonName: string;
  secretaryName: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  notes?: string;
  isDeleted?: boolean;
}

export interface MeetingAgendaItem {
  id: string;
  sessionId: string;
  ticketId: string;
  ticketCode: string;
  ticketTitle: string;
  status: 'PENDING_CARRY_OVER' | 'RESOLVED_WITH_DECISION';
  decisionNote?: string;
  actionItem?: string;
  picName?: string;
  dueDate?: string;
  createdAt: string;
}

export const MOCK_MEETING_TICKETS: MeetingTicket[] = [
  {
    id: 'tck-01',
    ticketCode: 'TCK-202607-001',
    title: 'Solar B35 di Pit Berau Kritis Sisa 2 Hari, Supplier Delay',
    description: 'BBM Solar industri untuk armada Dump Truck Volvo FMX tersisa 4,500 Liter. Pengiriman supplier PT Pertamina Patra Niaga tertahan di pelabuhan.',
    category: 'HEAVY_EQUIPMENT',
    priority: 'CRITICAL',
    status: 'ESCALATED_TO_HO',
    branchLocation: 'Site East Borneo Facility (Berau)',
    createdByName: 'Bambang Fleet Superintendent',
    assignedToName: 'Ir. Hidayat (Direksi HO)',
    createdAt: '2026-07-25 08:30'
  },
  {
    id: 'tck-02',
    ticketCode: 'TCK-202607-002',
    title: 'Chiller Cold Storage Resto Suhu Drop (-5°C), Risiko Daging Impor',
    description: 'Kompresor pendingin Cold Room Resto Alam Rindu mengalami penurunan suhu. Membutuhkan teknisi spesialis penggantian freon R404a.',
    category: 'RAW_MATERIAL',
    priority: 'HIGH',
    status: 'OPEN',
    branchLocation: 'Resto Alam Rindu (Jakarta)',
    createdByName: 'Siti Cold Storage Lead',
    assignedToName: 'Rudi Maintenance Lead',
    createdAt: '2026-07-26 10:15'
  },
  {
    id: 'tck-03',
    ticketCode: 'TCK-202607-003',
    title: 'AC Central Grand Ballroom Hotel Bocor Kebisingan saat MICE Event',
    description: 'Air ducting AC lantai 2 Grand Ballroom meneteskan air saat gladi bersih event korporat PT Petrokimia.',
    category: 'HOSPITALITY_AC',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    branchLocation: 'Hotel Alam Pakuan (Bogor)',
    createdByName: 'Hendra Front Office Mgr',
    assignedToName: 'Chief Engineer Taufik',
    solutionNote: 'Sudah dilakukan pembersihan drainase baki AC & replacement seal karet pipa pendingin.',
    resolvedAt: '2026-07-26 16:40',
    createdAt: '2026-07-26 11:00'
  }
];

export const MOCK_MEETING_SESSIONS: MeetingSession[] = [
  {
    id: 'ses-01',
    sessionCode: 'MTS-2026-W30',
    title: 'Rapat Mingguan Direksi Holding & Evaluasi Kendala Cabang',
    meetingDate: '2026-07-27 09:00',
    chairpersonName: 'Budi Santoso (Holding Executive)',
    secretaryName: 'Siti Rahma (Sekretaris HO)',
    status: 'IN_PROGRESS',
    notes: 'Pembahasan prioritas eskalasi BBM Solar Pertambangan & Efisiensi Bahan Baku Catering Massal Timika.'
  }
];

export const MOCK_AGENDA_ITEMS: MeetingAgendaItem[] = [
  {
    id: 'agd-01',
    sessionId: 'ses-01',
    ticketId: 'tck-01',
    ticketCode: 'TCK-202607-001',
    ticketTitle: 'Solar B35 di Pit Berau Kritis Sisa 2 Hari, Supplier Delay',
    status: 'PENDING_CARRY_OVER',
    decisionNote: 'Persetujuan pinjam pakai Solar 10,000 Liter dari Depo Pit Kutai. HO mengeluarkan Surat Perintah Pengawalan Fleet Tangki BBM.',
    actionItem: 'Kirim armada tangki bantuan dari Pit Kutai ke Pit Berau',
    picName: 'Dedi Logistik HO',
    dueDate: '2026-07-28',
    createdAt: '2026-07-27 09:30'
  }
];
