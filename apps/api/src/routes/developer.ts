import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_API_CLIENTS = [
  { id: 'client-01', code: 'CLT-NUSANTARA-01', companyName: 'Nusantara Enterprise Holding Group', plan: 'ENTERPRISE_UNLIMITED', status: 'ACTIVE' },
  { id: 'client-02', code: 'CLT-MAHKOTA-02', companyName: 'Mahkota Bakery & Culinary Group', plan: 'PROFESSIONAL', status: 'ACTIVE' },
  { id: 'client-03', code: 'CLT-BORNEO-03', companyName: 'PT Borneo Resources & Mining', plan: 'ENTERPRISE_UNLIMITED', status: 'ACTIVE' }
];

// GET /api/developer/clients
router.get('/clients', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_API_CLIENTS });
});

// POST /api/developer/generate-license
router.post('/generate-license', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { clientName, plan } = req.body;
  const licenseKey = `SaaS-${(plan || 'ENT').substring(0, 3)}-2026-${(clientName || 'CLIENT').substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-KEY`;

  return res.json({
    success: true,
    licenseKey,
    message: `Kunci Lisensi SaaS Berhasil Dibuat untuk [${clientName || 'Klien Baru'}]`
  });
});

export default router;
