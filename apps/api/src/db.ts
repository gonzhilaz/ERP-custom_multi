import 'dotenv/config';
import { PrismaClient as MasterPrismaClient } from '@erp/database/generated/master-client';
import { PrismaClient as TenantPrismaClient } from '@erp/database/generated/tenant-client';

export const masterPrisma = new MasterPrismaClient();
export const tenantPrisma = new TenantPrismaClient();

// Helper to get dynamic tenant prisma client based on tenant db connection string
const tenantClientCache = new Map<string, TenantPrismaClient>();

export function getTenantPrismaClient(dbUri?: string): TenantPrismaClient {
  if (!dbUri) return tenantPrisma;
  if (!tenantClientCache.has(dbUri)) {
    const client = new TenantPrismaClient({
      datasources: {
        db: { url: dbUri }
      }
    });
    tenantClientCache.set(dbUri, client);
  }
  return tenantClientCache.get(dbUri)!;
}
