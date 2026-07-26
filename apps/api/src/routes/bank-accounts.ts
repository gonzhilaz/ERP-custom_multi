import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_API_BANK_ACCOUNTS = [
  { id: 'bank-01', bankCode: 'BCA-CORP-01', bankName: 'PT Bank Central Asia Tbk (BCA)', accountNumber: '8830-192-111', balance: 3450000000, linkedCoa: '1-1102' },
  { id: 'bank-02', bankCode: 'MANDIRI-CORP-02', bankName: 'PT Bank Mandiri (Persero) Tbk', accountNumber: '122-00-9988-771', balance: 1850000000, linkedCoa: '1-1103' }
];

// GET /api/finance/bank-accounts
router.get('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_API_BANK_ACCOUNTS });
});

export default router;
