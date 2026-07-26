import { Router, Response, Request } from 'express';
import { provisionParentCompany, ParentCompanyConfig } from '../services/parent-provisioner';

const router = Router();

const MOCK_PROVISIONED_NODES = [
  {
    id: 'node-01',
    companyName: 'Nusantara Enterprise Holding Group',
    subdomain: 'nusantara',
    vpsIpAddress: '103.144.22.10',
    status: 'ONLINE_ACTIVE',
    dbSchema: 'tenant_nusantara',
    lastPing: '2026-07-24 10:50',
    activeModulesCount: 9
  },
  {
    id: 'node-02',
    companyName: 'Mahkota Bakery & Culinary Group',
    subdomain: 'mahkota',
    vpsIpAddress: '103.144.22.18',
    status: 'ONLINE_ACTIVE',
    dbSchema: 'tenant_mahkota',
    lastPing: '2026-07-24 10:52',
    activeModulesCount: 5
  }
];

// GET /api/provisioner/nodes
router.get('/nodes', (req: Request, res: Response) => {
  return res.json({ success: true, data: MOCK_PROVISIONED_NODES });
});

// POST /api/provisioner/provision-parent
router.post('/provision-parent', (req: Request, res: Response) => {
  const config: ParentCompanyConfig = req.body;
  if (!config.companyName || !config.subdomain || !config.initialAdminEmail) {
    return res.status(400).json({ success: false, message: 'Missing required parameters' });
  }

  const result = provisionParentCompany(config);

  return res.json({
    success: true,
    message: `Provisioning Parent Company [${config.companyName}] Selesai!`,
    result
  });
});

export default router;
