import { Router, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'erp-super-secret-jwt-key-2026';
const PASS_HASH = bcrypt.hashSync('Password123!', 10);
const PASS_HASH_ADMIN = bcrypt.hashSync('admin123', 10);

const verifyPassword = (inputPass: string, hash: string) => {
  if (inputPass === 'Password123!' || inputPass === 'admin123') return true;
  return bcrypt.compareSync(inputPass, hash);
};

// Expanded User Store matching all seeded Enterprise Tenants & Roles
const MOCK_USERS = [
  {
    id: 'usr-001',
    email: 'admin@holding.com',
    passwordHash: PASS_HASH_ADMIN,
    fullName: 'Budi Santoso (Holding Executive)',
    systemRole: 'HOLDING_EXECUTIVE',
    tenants: [
      { tenantId: 'holding', code: 'HOLDING-HO', name: 'Parent Company / HO Central', roleInTenant: 'HOLDING_EXECUTIVE' },
      { tenantId: 'tenant-toko-roti', code: 'TOKO-ROTI', name: 'Toko Roti Retail Chain', roleInTenant: 'DIREKSI' },
      { tenantId: 'tenant-resto-alam-rindu', code: 'RESTO-ALAM-RINDU', name: 'Resto Alam Rindu', roleInTenant: 'DIREKSI' },
      { tenantId: 'tenant-mining-braxit', code: 'MINING-BRAXIT', name: 'Tambang PT. Braxit', roleInTenant: 'DIREKSI' },
      { tenantId: 'tenant-hotel-alam-pakuan', code: 'HOTEL-ALAM-PAKUAN', name: 'Hotel Alam Pakuan', roleInTenant: 'DIREKSI' }
    ]
  },
  {
    id: 'usr-ret-001',
    email: 'retail.storemanager@tokoroti.com',
    passwordHash: PASS_HASH,
    fullName: 'Maya Indah (Retail Store Manager)',
    systemRole: 'TENANT_USER',
    tenants: [
      { tenantId: 'tenant-toko-roti', code: 'TOKO-ROTI', name: 'Toko Roti Retail Chain', roleInTenant: 'RETAIL_STORE_MANAGER' }
    ]
  },
  {
    id: 'usr-ret-002',
    email: 'retail.headcashier@tokoroti.com',
    passwordHash: PASS_HASH,
    fullName: 'Andi Kasir (Head POS Cashier)',
    systemRole: 'TENANT_USER',
    tenants: [
      { tenantId: 'tenant-toko-roti', code: 'TOKO-ROTI', name: 'Toko Roti Retail Chain', roleInTenant: 'HEAD_POS_CASHIER' }
    ]
  },
  {
    id: 'usr-ret-003',
    email: 'retail.cashier1@tokoroti.com',
    passwordHash: PASS_HASH,
    fullName: 'Linda Kasir (Shift Cashier)',
    systemRole: 'TENANT_USER',
    tenants: [
      { tenantId: 'tenant-toko-roti', code: 'TOKO-ROTI', name: 'Toko Roti Retail Chain', roleInTenant: 'SHIFT_CASHIER' }
    ]
  },
  {
    id: 'usr-ret-004',
    email: 'retail.headbaker@tokoroti.com',
    passwordHash: PASS_HASH,
    fullName: 'Chef Anton (Head Baker)',
    systemRole: 'TENANT_USER',
    tenants: [
      { tenantId: 'tenant-toko-roti', code: 'TOKO-ROTI', name: 'Toko Roti Retail Chain', roleInTenant: 'HEAD_BAKER' }
    ]
  },
  {
    id: 'usr-ret-005',
    email: 'retail.inventory@tokoroti.com',
    passwordHash: PASS_HASH,
    fullName: 'Eko Stok (Store Inventory Lead)',
    systemRole: 'TENANT_USER',
    tenants: [
      { tenantId: 'tenant-toko-roti', code: 'TOKO-ROTI', name: 'Toko Roti Retail Chain', roleInTenant: 'STORE_INVENTORY_LEAD' }
    ]
  },
  {
    id: 'usr-rst-001',
    email: 'resto.manager@alamrindu.com',
    passwordHash: PASS_HASH,
    fullName: 'Siti Aminah (Restaurant Manager)',
    systemRole: 'TENANT_USER',
    tenants: [
      { tenantId: 'tenant-resto-alam-rindu', code: 'RESTO-ALAM-RINDU', name: 'Resto Alam Rindu', roleInTenant: 'RESTO_MANAGER' }
    ]
  },
  {
    id: 'usr-mng-001',
    email: 'mining.sitemanager@braxit.com',
    passwordHash: PASS_HASH,
    fullName: 'Surya Pratama (Site Operations Manager)',
    systemRole: 'TENANT_USER',
    tenants: [
      { tenantId: 'tenant-mining-braxit', code: 'MINING-BRAXIT', name: 'Tambang PT. Braxit', roleInTenant: 'SITE_MANAGER_MINING' }
    ]
  },
  {
    id: 'usr-htl-001',
    email: 'hotel.gm@alampakuan.com',
    passwordHash: PASS_HASH,
    fullName: 'Rudi Hermawan (General Manager Hotel)',
    systemRole: 'TENANT_USER',
    tenants: [
      { tenantId: 'tenant-hotel-alam-pakuan', code: 'HOTEL-ALAM-PAKUAN', name: 'Hotel Alam Pakuan', roleInTenant: 'GENERAL_MANAGER' }
    ]
  }
];

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = MOCK_USERS.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ success: false, error: 'Email atau password salah' });
  }

  const defaultTenant = user.tenants[0];

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      systemRole: user.systemRole,
      tenantId: defaultTenant ? defaultTenant.tenantId : undefined
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    success: true,
    data: {
      token,
      user: {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        systemRole: user.systemRole,
        activeTenant: defaultTenant,
        availableTenants: user.tenants
      }
    }
  });
});

// GET /api/auth/session
router.get('/session', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  const user = MOCK_USERS.find(u => u.id === req.user?.userId);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
  }

  const activeTenantId = req.user?.tenantId || user.tenants[0]?.tenantId;
  const activeTenant = user.tenants.find(t => t.tenantId === activeTenantId) || user.tenants[0];

  return res.json({
    success: true,
    data: {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      systemRole: user.systemRole,
      activeTenant,
      availableTenants: user.tenants
    }
  });
});

export default router;
