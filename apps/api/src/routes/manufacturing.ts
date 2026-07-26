import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_API_BOM_RECIPES = [
  { id: 'bom-bakery-01', code: 'BOM-BKR-001', name: 'Roti Tawar Premium (Batch 50 Pcs)', category: 'BAKERY', estimatedCogmPerUnit: 10700 },
  { id: 'bom-mining-01', code: 'BOM-MNG-001', name: 'Peleburan Bijih Emas (Batch 1 Kg Emas Murni)', category: 'MINING', estimatedCogmPerUnit: 1010000000 },
  { id: 'bom-resto-01', code: 'BOM-RST-001', name: 'Formulasi Sate Sapi Ribeye (Batch 10 Porsi)', category: 'RESTO', estimatedCogmPerUnit: 42550 }
];

// GET /api/manufacturing/bom
router.get('/bom', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_API_BOM_RECIPES });
});

// POST /api/manufacturing/work-orders
router.post('/work-orders', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { bomId, targetOutputQty, warehouseSource, warehouseTarget } = req.body;

  return res.json({
    success: true,
    workOrderNumber: `WO-PROD-${Date.now()}`,
    message: `Work Order Produksi Berhasil Dirilis. Stok Bahan Baku dipotong dari [${warehouseSource || 'Gudang Utama'}] & Jurnal COGM Terposting.`,
    targetOutputQty: targetOutputQty || 10
  });
});

export default router;
