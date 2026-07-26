import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_CHANNELS = [
  { id: 'channel-001', name: '#general-holding', type: 'GROUP_CHANNEL', description: 'Pengumuman & Diskusi Umum Holding' },
  { id: 'channel-002', name: '#finance-coordination', type: 'GROUP_CHANNEL', description: 'Koordinasi Tim Keuangan & Inter-company PO' },
  { id: 'channel-003', name: '#mining-site-alpha', type: 'GROUP_CHANNEL', description: 'Laporan Operasional Site Tambang Gold-01' }
];

const MOCK_MESSAGES: any[] = [
  {
    id: 'msg-001',
    channelId: 'channel-002',
    senderId: 'user-001',
    senderName: 'Budi Santoso (Direksi)',
    type: 'TEXT',
    content: 'Tolong persiapkan laporan laba rugi konsolidasi untuk rapat jam 2 siang ini.',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'msg-002',
    channelId: 'channel-002',
    senderId: 'user-002',
    senderName: 'Siti Aminah',
    type: 'VOICE_NOTE',
    content: 'Voice Mail Catatan Pembelian Bahan Resto (0:24)',
    fileUrl: 'https://example.com/voice-notes/demo-voice-01.webm',
    fileType: 'audio/webm',
    fileSize: 142000,
    createdAt: new Date(Date.now() - 1800000).toISOString()
  }
];

// GET /api/chat/channels
router.get('/channels', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_CHANNELS });
});

// GET /api/chat/messages/:channelId
router.get('/messages/:channelId', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { channelId } = req.params;
  const filtered = MOCK_MESSAGES.filter(m => m.channelId === channelId);
  return res.json({ success: true, data: filtered });
});

// POST /api/chat/messages
router.post('/messages', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { channelId, type, content, fileUrl, fileType, fileSize } = req.body;

  const newMsg = {
    id: `msg-${Date.now()}`,
    channelId,
    senderId: req.user?.userId || 'user-001',
    senderName: 'Budi Santoso',
    type: type || 'TEXT',
    content,
    fileUrl,
    fileType,
    fileSize,
    createdAt: new Date().toISOString()
  };

  MOCK_MESSAGES.push(newMsg);

  return res.json({ success: true, data: newMsg });
});

export default router;
