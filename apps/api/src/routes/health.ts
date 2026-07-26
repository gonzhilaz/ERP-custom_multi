import { Router, Response } from 'express';
import { AuthenticatedRequest, authenticateToken } from '../middleware/auth';
import { masterPrisma, tenantPrisma } from '../db';

const router = Router();

// GET /api/system-health/pools
router.get('/pools', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const startMaster = Date.now();
    const tenantsCount = await masterPrisma.tenant.count();
    const latencyMaster = Date.now() - startMaster;

    const startTenant = Date.now();
    const usersCount = await tenantPrisma.localUser.count();
    const latencyTenant = Date.now() - startTenant;

    const dbPools = [
      {
        tenantId: 'tenant-master-holding',
        code: 'HOLDING-DB',
        name: 'Central Master Database (PostgreSQL)',
        dbUriMasked: 'postgresql://postgres:****@localhost:5432/db_master_holding',
        activeConnections: 5,
        idleConnections: 15,
        status: 'HEALTHY',
        latencyMs: latencyMaster,
        recordCount: tenantsCount
      },
      {
        tenantId: 'tenant-default',
        code: 'TENANT-DB',
        name: 'Isolated Tenant Database (PostgreSQL)',
        dbUriMasked: 'postgresql://postgres:****@localhost:5432/db_tenant_default',
        activeConnections: 3,
        idleConnections: 7,
        status: 'HEALTHY',
        latencyMs: latencyTenant,
        recordCount: usersCount
      }
    ];

    return res.json({ success: true, data: dbPools });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
