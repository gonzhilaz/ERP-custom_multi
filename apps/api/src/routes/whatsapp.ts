import { Router, Request, Response } from 'express';

const router = Router();

// In-Memory Gateway State
let isWhatsAppConnected = true; // Simulated connected status
const messageLogs: Array<{ id: string; phone: string; message: string; type: string; sentAt: string }> = [
  {
    id: 'wa-msg-101',
    phone: '+6281299008877',
    message: '🚨 [CRITICAL TICKET] TCK-202607-001: Solar B35 di Pit Berau Kritis Sisa 2 Hari! Membutuhkan Keputusan Direksi HO segera.',
    type: 'TICKET_ESCALATION',
    sentAt: '2026-07-27 08:31'
  },
  {
    id: 'wa-msg-102',
    phone: '+6281311223344',
    message: '🛡️ [SECURITY ALERT] INC-202607-004: Kerusakan Kawat Pagar Pembatas Barat Site Pit Berau. Ditemukan saat patroli shift malam.',
    type: 'SECURITY_INCIDENT',
    sentAt: '2026-07-27 03:31'
  }
];

// GET /api/whatsapp/status
router.get('/status', (req: Request, res: Response) => {
  res.json({
    status: isWhatsAppConnected ? 'CONNECTED' : 'DISCONNECTED',
    phone: '+6285711223344 (ERP Enterprise Gateway)',
    botName: 'Nusantara ERP OpenClaw Bot',
    logsCount: messageLogs.length,
    timestamp: new Date().toISOString()
  });
});

// GET /api/whatsapp/logs
router.get('/logs', (req: Request, res: Response) => {
  res.json({
    success: true,
    logs: messageLogs
  });
});

// POST /api/whatsapp/send
router.post('/send', (req: Request, res: Response) => {
  const { phone, message, type } = req.body;
  if (!phone || !message) {
    return res.status(400).json({ error: 'Phone number and message are required' });
  }

  const logEntry = {
    id: `wa-msg-${Date.now()}`,
    phone,
    message,
    type: type || 'DIRECT_ALERT',
    sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };

  messageLogs.unshift(logEntry);

  console.log(`📱 [WHATSAPP GATEWAY] Sent to ${phone}: "${message}"`);

  return res.json({
    success: true,
    message: 'WhatsApp notification sent successfully',
    log: logEntry
  });
});

// POST /api/whatsapp/send-ticket-alert
router.post('/send-ticket-alert', (req: Request, res: Response) => {
  const { ticketCode, title, priority, branchLocation, createdByName } = req.body;

  const phone = '+62811223344'; // Target Executive Phone
  const formattedMsg = `🚨 [ERP ESCALATION ALERT]\n\n` +
    `*Kode Tiket*: ${ticketCode}\n` +
    `*Judul*: ${title}\n` +
    `*Prioritas*: ${priority}\n` +
    `*Lokasi*: ${branchLocation}\n` +
    `*Pelapor*: ${createdByName}\n\n` +
    `Membutuhkan tindakan / keputusan Direksi HO segera di modul /meeting-notes.`;

  const logEntry = {
    id: `wa-msg-${Date.now()}`,
    phone,
    message: formattedMsg,
    type: 'TICKET_ESCALATION',
    sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };

  messageLogs.unshift(logEntry);

  return res.json({
    success: true,
    message: 'Ticket WhatsApp Alert dispatched to HO Executives',
    log: logEntry
  });
});

// POST /api/whatsapp/send-security-alert
router.post('/send-security-alert', (req: Request, res: Response) => {
  const { incidentCode, title, severity, location, patrolOfficerName } = req.body;

  const phone = '+628198765432'; // Target Security Head Phone
  const formattedMsg = `🛡️ [SECURITY INCIDENT ALERT]\n\n` +
    `*Kode Insiden*: ${incidentCode}\n` +
    `*Temuan*: ${title}\n` +
    `*Severity*: ${severity}\n` +
    `*Lokasi*: ${location}\n` +
    `*Petugas Patroli*: ${patrolOfficerName}\n\n` +
    `Telah dicatat di modul Security Ops & di-link ke Tiket Kendala.`;

  const logEntry = {
    id: `wa-msg-${Date.now()}`,
    phone,
    message: formattedMsg,
    type: 'SECURITY_INCIDENT',
    sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };

  messageLogs.unshift(logEntry);

  return res.json({
    success: true,
    message: 'Security Incident WhatsApp Alert dispatched to Security Team',
    log: logEntry
  });
});

export default router;
