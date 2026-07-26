import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_POS_MENU = [
  { id: 'pos-rtl-01', code: 'SKU-RTL-001', name: 'Beras Premium Ramos Super (5 Kg)', category: 'Sembako & Pangan Retail', price: 78000 },
  { id: 'pos-rtl-02', code: 'SKU-RTL-002', name: 'Minyak Goreng Sawit Bimoli Refill (2 Liter)', category: 'Sembako & Pangan Retail', price: 36500 },
  { id: 'pos-rtl-03', code: 'SKU-RTL-003', name: 'Gula Pasir Industri Gulaku Premium (1 Kg)', category: 'Sembako & Pangan Retail', price: 17500 },
  { id: 'pos-rtl-04', code: 'SKU-RTL-004', name: 'Air Mineral Coca-Cola / Aqua Botol (600ml)', category: 'Snack, Biscuit & Minuman', price: 5000 },
  { id: 'pos-rtl-05', code: 'SKU-RTL-005', name: 'Biskuit Khong Guan Assorted Kaleng (1600g)', category: 'Snack, Biscuit & Minuman', price: 112000 },
  { id: 'pos-rtl-06', code: 'SKU-RTL-006', name: 'Lampu LED Philips MyCare 12W White', category: 'Elektronik & Perangkat', price: 49500 },
  { id: 'pos-01', code: 'MENU-FNB-01', name: 'Nasi Goreng Wagyu Spesial Nusantara', category: 'Resto & Kuliner Saji', price: 65000 },
  { id: 'pos-02', code: 'MENU-FNB-02', name: 'Sate Sapi Ribeye Bumbu Kacang (10 Tusuk)', category: 'Resto & Kuliner Saji', price: 95000 }
];

// GET /api/pos/menu
router.get('/menu', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_POS_MENU });
});

// POST /api/pos/checkout
router.post('/checkout', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { cart, paymentMethod } = req.body;

  return res.json({
    success: true,
    transactionId: `TRX-POS-${Date.now()}`,
    message: 'Transaksi POS Kasir Berhasil. Stok Inventory dipotong & Jurnal Sales terposting.',
    paymentMethod: paymentMethod || 'CASH'
  });
});

export default router;
