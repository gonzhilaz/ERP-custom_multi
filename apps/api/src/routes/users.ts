import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';

const router = Router();

const MOCK_USERS_LIST = [
  {
    id: 'user-001',
    fullName: 'Budi Santoso',
    email: 'admin@holding.com',
    systemRole: 'HOLDING_EXECUTIVE',
    assignedTenants: [
      { tenantId: 'tenant-resto-01', code: 'RESTO-01', name: 'Nusantara Culinary & Catering', roleInTenant: 'DIREKSI' },
      { tenantId: 'tenant-gold-01', code: 'GOLD-MINE-01', name: 'PT Borneo Mining Emas', roleInTenant: 'DIREKSI' }
    ],
    grantedPermissions: ['finance:full', 'inventory:full', 'po:approve_executive', 'hrd:payroll', 'system:all'],
    status: 'ACTIVE',
    lastLogin: '2026-07-23 10:55:00'
  },
  {
    id: 'user-002',
    fullName: 'Siti Aminah',
    email: 'manager.resto@holding.com',
    systemRole: 'TENANT_USER',
    assignedTenants: [
      { tenantId: 'tenant-resto-01', code: 'RESTO-01', name: 'Nusantara Culinary & Catering', roleInTenant: 'UNIT_MANAGER' }
    ],
    grantedPermissions: ['finance:view', 'inventory:manage', 'pos:cashier', 'hrd:view'],
    status: 'ACTIVE',
    lastLogin: '2026-07-23 09:12:00'
  }
];

// GET /api/users
router.get('/', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ success: true, data: MOCK_USERS_LIST });
});

export default router;
