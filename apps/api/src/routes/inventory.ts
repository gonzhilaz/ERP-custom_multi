import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_INVENTORY = [
  {
    id: 'inv-001',
    code: 'FNB-ING-001',
    name: 'Daging Sapi Ribeye Premium (Import)',
    category: 'Perishable Ingredient',
    warehouse: 'Gudang Utama Resto (Cold Storage)',
    stockQty: 18,
    minStockLevel: 50,
    uom: 'Kg',
    costPerUnit: 185000,
    valuationMethod: 'FIFO',
    isAlert: true
  },
  {
    id: 'inv-002',
    code: 'MINE-EQ-004',
    name: 'Filter Oli Alat Berat Caterpillar CAT 777',
    category: 'Heavy Equipment Sparepart',
    warehouse: 'Gudang Central Site Tambang Gold-01',
    stockQty: 4,
    minStockLevel: 10,
    uom: 'Pcs',
    costPerUnit: 1250000,
    valuationMethod: 'AVERAGE',
    isAlert: true
  },
  {
    id: 'inv-003',
    code: 'HOTEL-AMN-012',
    name: 'Bed Sheet Linen Cotton Suite Room',
    category: 'Hotel Amenity & Housekeeping',
    warehouse: 'Gudang Housekeeping Grand Royal Hotel',
    stockQty: 240,
    minStockLevel: 100,
    uom: 'Pcs',
    costPerUnit: 220000,
    valuationMethod: 'AVERAGE',
    isAlert: false
  }
];

// GET /api/inventory
router.get('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    success: true,
    data: MOCK_INVENTORY
  });
});

// GET /api/inventory/alerts (Re-order level warnings)
router.get('/alerts', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const alerts = MOCK_INVENTORY.filter(i => i.isAlert);
  return res.json({
    success: true,
    totalAlerts: alerts.length,
    data: alerts
  });
});

export default router;
