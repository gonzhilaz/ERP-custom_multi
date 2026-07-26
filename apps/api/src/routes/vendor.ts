import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_VENDORS = [
  {
    id: 'v-001',
    code: 'VND-MEAT-01',
    name: 'PT Meat Prima Importindo',
    category: 'Food Ingredient Supplier',
    rating: 4.8,
    payableBalance: 45000000
  },
  {
    id: 'v-002',
    code: 'VND-HEAVY-09',
    name: 'PT Traktor Nusantara Spareparts',
    category: 'Mining Heavy Equipment',
    rating: 4.9,
    payableBalance: 165000000
  }
];

const MOCK_PURCHASE_ORDERS = [
  {
    id: 'po-101',
    poNumber: 'PO/2026/07/0088',
    vendorName: 'PT Traktor Nusantara Spareparts',
    unitUsaha: 'PT Borneo Mining Emas',
    date: '2026-07-22',
    totalAmount: 185000000,
    status: 'WAITING_APPROVAL_DIREKTUR',
    requiresExecutiveApproval: true
  },
  {
    id: 'po-102',
    poNumber: 'PO/2026/07/0089',
    vendorName: 'PT Meat Prima Importindo',
    unitUsaha: 'Nusantara Culinary & Catering',
    date: '2026-07-23',
    totalAmount: 32000000,
    status: 'APPROVED',
    requiresExecutiveApproval: false
  }
];

// GET /api/vendors
router.get('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_VENDORS });
});

// GET /api/vendors/purchase-orders
router.get('/purchase-orders', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_PURCHASE_ORDERS });
});

// POST /api/vendors/purchase-orders/:id/approve
router.post('/purchase-orders/:id/approve', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const po = MOCK_PURCHASE_ORDERS.find(p => p.id === id);

  if (!po) {
    return res.status(404).json({ success: false, error: 'Purchase Order tidak ditemukan' });
  }

  // Nominal threshold check (> 50 Juta requires HOLDING_EXECUTIVE role)
  if (po.requiresExecutiveApproval && req.user?.systemRole !== 'HOLDING_EXECUTIVE' && req.user?.systemRole !== 'SUPER_ADMIN') {
    return res.status(403).json({
      success: false,
      error: 'PO dengan nominal di atas 50 Juta wajib disetujui oleh Direksi / Holding Executive.'
    });
  }

  po.status = 'APPROVED';
  return res.json({ success: true, message: 'PO Berhasil disetujui', data: po });
});

export default router;
