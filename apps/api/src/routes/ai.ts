import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_AI_LOGS = [
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
  }
];

// GET /api/ai/logs
router.get('/logs', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_AI_LOGS });
});

// POST /api/ai/query (OpenClaw + DeepSeek Agent endpoint)
router.post('/query', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { prompt, source } = req.body;

  const newLog = {
    id: `ai-${Date.now()}`,
    source: source || 'WHATSAPP_EXECUTIVE_BOT',
    userQuery: prompt,
    aiResponse: `[DeepSeek Lite + OpenClaw Agent]: Analisis eksekutif real-time berhasil diproses dari Central DB. Total omset & efisiensi anggaran sesuai proyeksi.`,
    timestamp: new Date().toLocaleString(),
    status: 'PROCESSED'
  };

  MOCK_AI_LOGS.unshift(newLog);

  return res.json({ success: true, data: newLog });
});

export default router;
