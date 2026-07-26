import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_API_CATERING = [
  { id: 'cat-01', contractCode: 'CTR-2026-001', clientName: 'PT Freeport Indonesia Site Timika', portionCountPerDay: 1500, status: 'ACTIVE' }
];

// GET /api/catering/contracts
router.get('/contracts', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_API_CATERING });
});

export default router;
