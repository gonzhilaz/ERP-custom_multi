import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_API_REPORTS_SUMMARY = {
  totalRevenue: 8935000000,
  totalCogs: 4645000000,
  grossProfit: 4290000000,
  operatingExpenses: 1317000000,
  netIncome: 2973000000,
  grossMarginPct: 48.0,
  netMarginPct: 33.3
};

// GET /api/finance/reports/summary
router.get('/summary', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_API_REPORTS_SUMMARY });
});

export default router;
