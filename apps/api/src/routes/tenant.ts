import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_TENANTS_DETAIL = [
  {
    id: 'tenant-resto-01',
    code: 'RESTO-01',
    name: 'Nusantara Culinary & Catering',
    industryType: 'RESTAURANT_CATERING',
    status: 'ACTIVE',
    modulesEnabled: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'POS', 'CHAT'],
    monthlyRevenue: 450000000,
    monthlyExpense: 280000000,
    netProfit: 170000000
  },
  {
    id: 'tenant-gold-01',
    code: 'GOLD-MINE-01',
    name: 'PT Borneo Mining Emas',
    industryType: 'GOLD_MINING',
    status: 'ACTIVE',
    modulesEnabled: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'MANAGERIAL', 'CHAT'],
    monthlyRevenue: 3500000000,
    monthlyExpense: 1900000000,
    netProfit: 1600000000
  },
  {
    id: 'tenant-hotel-01',
    code: 'HOTEL-01',
    name: 'Grand Royal Hotel & Resort',
    industryType: 'HOTEL_HOSPITALITY',
    status: 'ACTIVE',
    modulesEnabled: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'HOTELIER', 'CHAT'],
    monthlyRevenue: 890000000,
    monthlyExpense: 520000000,
    netProfit: 370000000
  },
  {
    id: 'tenant-retail-01',
    code: 'RETAIL-01',
    name: 'Nusa Mart Retail Chain',
    industryType: 'RETAIL',
    status: 'ACTIVE',
    modulesEnabled: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'POS', 'CHAT'],
    monthlyRevenue: 620000000,
    monthlyExpense: 410000000,
    netProfit: 210000000
  }
];

// GET /api/tenants
router.get('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    success: true,
    data: MOCK_TENANTS_DETAIL
  });
});

// GET /api/tenants/consolidated-summary (Holding level auto-consolidation)
router.get('/consolidated-summary', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const totalRevenue = MOCK_TENANTS_DETAIL.reduce((acc, t) => acc + t.monthlyRevenue, 0);
  const totalExpense = MOCK_TENANTS_DETAIL.reduce((acc, t) => acc + t.monthlyExpense, 0);
  const netProfit = totalRevenue - totalExpense;

  return res.json({
    success: true,
    data: {
      holdingName: 'Nusantara Enterprise Holding Group',
      totalActiveUnits: MOCK_TENANTS_DETAIL.length,
      periodMonth: 'Juli 2026',
      totalRevenue,
      totalExpense,
      netProfit,
      unitPerformanceBreakdown: MOCK_TENANTS_DETAIL
    }
  });
});

// GET /api/tenants/parent-profile (White-Label Profile & Branding)
router.get('/parent-profile', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    success: true,
    data: {
      companyName: 'Nusantara Enterprise Holding Group',
      brandTagline: 'Multi-Industry Conglomerate & Holding ERP System',
      taxId: '01.345.678.9-012.000',
      headOfficeAddress: 'Treasury Tower Lt. 42, District 8 SCBD',
      city: 'Jakarta Selatan',
      email: 'corporate@nusantara-holding.co.id'
    }
  });
});

// PUT /api/tenants/parent-profile (Update White-Label Profile & Branding)
router.put('/parent-profile', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const { companyName, brandTagline, headOfficeAddress, city, taxId } = req.body;
  return res.json({
    success: true,
    message: 'Profil Parent Company White-Label Berhasil Diperbarui!',
    data: {
      companyName: companyName || 'Nusantara Enterprise Holding Group',
      brandTagline: brandTagline || 'Multi-Industry Conglomerate & Holding ERP System',
      headOfficeAddress,
      city,
      taxId
    }
  });
});

export default router;
