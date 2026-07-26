export interface AiQueryLog {
  id: string;
  source: 'WHATSAPP_EXECUTIVE_BOT' | 'INVOICE_OCR_SCANNER' | 'IT_LOG_DIAGNOSTIC';
  userQuery: string;
  aiResponse: string;
  timestamp: string;
  status: 'PROCESSED' | 'PENDING';
}

export const MOCK_AI_LOGS: AiQueryLog[] = [
  {
    id: 'ai-001',
    source: 'WHATSAPP_EXECUTIVE_BOT',
    userQuery: 'DeepSeek: Minta summary omset unit Restoran dan Tambang Emas minggu ini',
    aiResponse: 'Ringkasan Eksekutif (DeepSeek Lite): Total omset Tambang Emas: Rp 875.000.000 (Up 12%), Restoran & Catering: Rp 112.500.000 (Up 5%). Total Kas Holding aman.',
    timestamp: '2026-07-23 09:30:15',
    status: 'PROCESSED'
  },
  {
    id: 'ai-002',
    source: 'INVOICE_OCR_SCANNER',
    userQuery: 'Scan Kwitansi Invoice Supplier Meat Prima Importindo.pdf',
    aiResponse: 'OCR Extracted: Vendor: PT Meat Prima Importindo | Total: Rp 45.000.000 | Item: 250kg Ribeye Meat | Auto-Draft Journal Created JV/2026/07/0099.',
    timestamp: '2026-07-23 08:14:02',
    status: 'PROCESSED'
  },
  {
    id: 'ai-003',
    source: 'IT_LOG_DIAGNOSTIC',
    userQuery: 'Diagnosa error log koneksi DB Tenant Hotel pada pkl 03:00',
    aiResponse: 'Diagnostic (OpenClaw Agent): Root cause: Maintenance window ISP di lokasi resort hotel. Retry strategy connection pool berhasil direcovery otomatis.',
    timestamp: '2026-07-23 03:15:00',
    status: 'PROCESSED'
  }
];
