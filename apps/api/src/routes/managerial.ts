import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_BUDGETS = [
  {
    id: 'bgt-001',
    unitUsaha: 'PT Borneo Mining Emas',
    category: 'Heavy Machinery Maintenance & Fuel',
    budgetAllocated: 2000000000,
    actualSpent: 1850000000,
    variance: 150000000,
    utilizationPercentage: 92.5,
    status: 'ON_TRACK'
  },
  {
    id: 'bgt-002',
    unitUsaha: 'Nusantara Culinary & Catering',
    category: 'Perishable Food Ingredients',
    budgetAllocated: 300000000,
    actualSpent: 280000000,
    variance: 20000000,
    utilizationPercentage: 93.3,
    status: 'ON_TRACK'
  }
];

// GET /api/managerial/budgets
router.get('/budgets', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_BUDGETS });
});

export default router;
