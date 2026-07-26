export interface IncomingLetter {
  id: string;
  agendaNumber: string;
  letterNumber: string; // Nomor Surat dari pengirim
  sender: string;
  subject: string;
  receivedDate: string;
  dispositionTo: string; // Disposisi ke Kepala Departemen
  dispositionNotes: string; // Catatan disposisi atasan
  attachmentUrl?: string;
  status: 'PENDING_DISPOSITION' | 'DISPOSITIONED' | 'COMPLETED';
}

export interface OutgoingLetter {
  id: string;
  letterNumber: string; // Auto-generated e.g. "088/HOLDING-SK/VII/2026"
  recipient: string;
  subject: string;
  createdDate: string;
  author: string;
  approver: string;
  status: 'DRAFT' | 'WAITING_SIGNATURE' | 'DISPATCHED';
}

export const MOCK_INCOMING_LETTERS: IncomingLetter[] = [
  {
    id: 'inc-001',
    agendaNumber: 'AGD/2026/07/044',
    letterNumber: '503/IUP-OP/ESDM/2026',
    sender: 'Dinas Energi & Sumber Daya Mineral (ESDM)',
    subject: 'Undangan Evaluasi AMDAL & Operational Safety Site Tambang Gold-01',
    receivedDate: '2026-07-22',
    dispositionTo: 'Kepala Operasional Tambang & Direksi Legal',
    dispositionNotes: 'Tolong persiapkan tim audit teknis untuk hadir pada rapat koordinasi tanggal 28 Juli 2026.',
    attachmentUrl: 'https://example.com/letters/esdm-evaluasi-amdal.pdf',
    status: 'DISPOSITIONED'
  },
  {
    id: 'inc-002',
    agendaNumber: 'AGD/2026/07/045',
    letterNumber: 'BPOM-HALAL/8812/2026',
    sender: 'LPPOM MUI & BPOM RI',
    subject: 'Pemberitahuan Perpanjangan Sertifikasi Halal Dapur Central Catering Massal',
    receivedDate: '2026-07-23',
    dispositionTo: 'Head Catering Chef & Quality Assurance',
    dispositionNotes: 'Lakukan verifikasi bahan baku supplier daging dan bumbu dapur.',
    attachmentUrl: 'https://example.com/letters/bpom-halal-notice.pdf',
    status: 'DISPOSITIONED'
  }
];

export const MOCK_OUTGOING_LETTERS: OutgoingLetter[] = [
  {
    id: 'out-001',
    letterNumber: '088/HOLDING-SK/VII/2026',
    recipient: 'PT Meat Prima Importindo',
    subject: 'Surat Penunjukan Vendor Utama Pasokan Daging Catering Massal Tahun 2026-2027',
    createdDate: '2026-07-21',
    author: 'Siti Aminah (Resto Manager)',
    approver: 'Budi Santoso (Direksi)',
    status: 'DISPATCHED'
  }
];
