import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_API_ORE_PRODUCTION = [
  { id: 'ore-01', logCode: 'ORE-202607-001', pitSite: 'Pit East Block 4 Kutai', tonnageExtracted: 1450, grade: 4.8 },
  { id: 'ore-02', logCode: 'ORE-202607-002', pitSite: 'Pit West Block 2 Berau', tonnageExtracted: 1200, grade: 3.2 }
];

// GET /api/mining/ore-production
router.get('/ore-production', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_API_ORE_PRODUCTION });
});

// POST /api/mining/refuel
router.post('/refuel', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { equipmentCode, fuelDispersedLiters } = req.body;
  return res.json({
    success: true,
    refuelCode: `FUEL-REF-${Date.now()}`,
    message: `Pengisian Solar HSD [${fuelDispersedLiters || 500} Liter] untuk Alat Berat [${equipmentCode}] Berhasil Dicatat.`
  });
});

export default router;
