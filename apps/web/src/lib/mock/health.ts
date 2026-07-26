export interface TenantDbPoolStatus {
  tenantId: string;
  code: string;
  name: string;
  dbUriMasked: string;
  activeConnections: number;
  idleConnections: number;
  status: 'HEALTHY' | 'DEGRADED' | 'DISCONNECTED';
  latencyMs: number;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  user: string;
  tenantCode: string;
  action: string;
  ipAddress: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const MOCK_DB_POOLS: TenantDbPoolStatus[] = [
  {
    tenantId: 'tenant-master-holding',
    code: 'HOLDING-DB',
    name: 'Central Holding Database',
    dbUriMasked: 'postgresql://master_admin:****@localhost:5432/db_master_holding',
    activeConnections: 12,
    idleConnections: 38,
    status: 'HEALTHY',
    latencyMs: 4
  },
  {
    tenantId: 'tenant-resto-01',
    code: 'RESTO-01',
    name: 'Nusantara Culinary & Catering DB',
    dbUriMasked: 'postgresql://tenant_resto:****@localhost:5432/db_tenant_resto_01',
    activeConnections: 6,
    idleConnections: 14,
    status: 'HEALTHY',
    latencyMs: 6
  },
  {
    tenantId: 'tenant-gold-01',
    code: 'GOLD-MINE-01',
    name: 'PT Borneo Mining Emas DB',
    dbUriMasked: 'postgresql://tenant_gold:****@localhost:5432/db_tenant_gold_01',
    activeConnections: 18,
    idleConnections: 32,
    status: 'HEALTHY',
    latencyMs: 8
  },
  {
    tenantId: 'tenant-hotel-01',
    code: 'HOTEL-01',
    name: 'Grand Royal Hotel & Resort DB',
    dbUriMasked: 'postgresql://tenant_hotel:****@localhost:5432/db_tenant_hotel_01',
    activeConnections: 8,
    idleConnections: 22,
    status: 'HEALTHY',
    latencyMs: 5
  }
];

export const MOCK_SECURITY_LOGS: SecurityAuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-07-23 10:45:12',
    user: 'Budi Santoso (Holding Exec)',
    tenantCode: 'GOLD-MINE-01',
    action: 'APPROVAL_PO_EXECUTIVE_NOMINAL',
    ipAddress: '180.252.114.88',
    riskLevel: 'LOW'
  },
  {
    id: 'log-002',
    timestamp: '2026-07-23 09:12:00',
    user: 'Siti Aminah',
    tenantCode: 'RESTO-01',
    action: 'SWITCH_TENANT_CONTEXT',
    ipAddress: '180.252.114.89',
    riskLevel: 'LOW'
  }
];
