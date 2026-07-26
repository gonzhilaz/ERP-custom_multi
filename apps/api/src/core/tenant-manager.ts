import { PrismaClient as TenantPrismaClient } from '@erp/database/generated/tenant-client';

class TenantConnectionManager {
  private tenantClients: Map<string, TenantPrismaClient> = new Map();

  /**
   * Get or create a dynamic Prisma Client connection for a specific Tenant Database
   */
  public getTenantClient(tenantId: string, connectionUri: string): TenantPrismaClient {
    if (this.tenantClients.has(tenantId)) {
      return this.tenantClients.get(tenantId)!;
    }

    const client = new TenantPrismaClient({
      datasources: {
        db: {
          url: connectionUri,
        },
      },
    });

    this.tenantClients.set(tenantId, client);
    return client;
  }

  /**
   * Close connection for a specific tenant
   */
  public async removeTenantClient(tenantId: string): Promise<void> {
    if (this.tenantClients.has(tenantId)) {
      const client = this.tenantClients.get(tenantId)!;
      await client.$disconnect();
      this.tenantClients.delete(tenantId);
    }
  }

  /**
   * Graceful cleanup for all tenant DB connections
   */
  public async disconnectAll(): Promise<void> {
    for (const [tenantId, client] of this.tenantClients.entries()) {
      await client.$disconnect();
    }
    this.tenantClients.clear();
  }
}

export const tenantManager = new TenantConnectionManager();
