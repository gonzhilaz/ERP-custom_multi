import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_API_ASSET_DEPRECIATION = {
  totalAcquisition: 17680000000,
  totalAccumulated: 3701666661,
  totalNetBookValue: 13978333339,
  monthlyExpense: 109583333
};

// GET /api/asset/depreciation
router.get('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_API_ASSET_DEPRECIATION });
});

export default router;
