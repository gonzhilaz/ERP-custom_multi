import 'dotenv/config';
import { PrismaClient as MasterPrismaClient } from '../generated/master-client';
import { SEED_TENANTS } from './seed-data/tenants';
import { SEED_USERS, DEFAULT_PASSWORD_HASH } from './seed-data/users';

const masterPrisma = new MasterPrismaClient();

async function seedMaster() {
  console.log(`=======================================================`);
  console.log(`🌱 Seeding Central Master DB & Multi-Tenant Accounts...`);
  console.log(`=======================================================`);

  // 1. Seed Tenants
  const tenantIdMap = new Map<string, string>();

  // Add Holding record
  const holdingTenant = await masterPrisma.tenant.upsert({
    where: { code: 'HOLDING-HO' },
    update: {},
    create: {
      code: 'HOLDING-HO',
      name: 'Nusantara Enterprise Holding Parent',
      industryType: 'OTHER',
      dbConnectionUri: process.env.MASTER_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/db_master_holding?schema=public',
      modulesEnabled: ['FINANCE', 'INVENTORY', 'VENDOR', 'HRD', 'ESS', 'MANAGERIAL', 'MAIL', 'SETTINGS'],
      status: 'ACTIVE'
    }
  });
  tenantIdMap.set('HOLDING-HO', holdingTenant.id);

  for (const cfg of SEED_TENANTS) {
    const tenant = await masterPrisma.tenant.upsert({
      where: { code: cfg.code },
      update: {
        name: cfg.name,
        modulesEnabled: cfg.modules
      },
      create: {
        code: cfg.code,
        name: cfg.name,
        industryType: cfg.industryType,
        dbConnectionUri: `postgresql://postgres:postgres@localhost:5432/${cfg.dbName}?schema=public`,
        modulesEnabled: cfg.modules,
        status: 'ACTIVE'
      }
    });
    tenantIdMap.set(cfg.code, tenant.id);
    console.log(`✅ Seeded Tenant: [${tenant.code}] ${tenant.name}`);
  }

  // 2. Seed Master Users & Tenant Access Rules
  let count = 0;
  for (const userDef of SEED_USERS) {
    const user = await masterPrisma.masterUser.upsert({
      where: { email: userDef.email },
      update: {
        fullName: userDef.fullName,
        systemRole: userDef.systemRole
      },
      create: {
        email: userDef.email,
        passwordHash: DEFAULT_PASSWORD_HASH,
        fullName: userDef.fullName,
        systemRole: userDef.systemRole,
        isActive: true
      }
    });

    const targetTenantCode = userDef.tenantCode || 'HOLDING-HO';
    const targetTenantId = tenantIdMap.get(targetTenantCode);

    if (targetTenantId) {
      await masterPrisma.userTenantAccess.upsert({
        where: {
          userId_tenantId: {
            userId: user.id,
            tenantId: targetTenantId
          }
        },
        update: {
          roleInTenant: userDef.roleInTenant
        },
        create: {
          userId: user.id,
          tenantId: targetTenantId,
          isDefault: true,
          roleInTenant: userDef.roleInTenant
        }
      });
    }
    count++;
    console.log(`   👤 (${count}/${SEED_USERS.length}) Account: ${user.email} -> Role: ${userDef.roleInTenant}`);
  }

  // 3. Seed Holding Consolidated Ledger Summary Data
  for (const cfg of SEED_TENANTS) {
    const tId = tenantIdMap.get(cfg.code);
    if (!tId) continue;

    await masterPrisma.holdingConsolidatedLedger.upsert({
      where: {
        tenantId_periodYear_periodMonth: {
          tenantId: tId,
          periodYear: 2026,
          periodMonth: 7
        }
      },
      update: {},
      create: {
        tenantId: tId,
        periodYear: 2026,
        periodMonth: 7,
        totalRevenue: 1550000000.00,
        totalExpense: 920000000.00,
        netProfitLoss: 630000000.00,
        totalAssets: 4800000000.00,
        totalLiabilities: 1100000000.00,
        currency: 'IDR'
      }
    });
  }

  console.log(`=======================================================`);
  console.log(`🎉 Master Database & ${SEED_USERS.length} Accounts Seeded Successfully!`);
  console.log(`=======================================================`);
}

seedMaster()
  .catch((e) => {
    console.error(`❌ Seeding failed:`, e);
    process.exit(1);
  })
  .finally(async () => {
    await masterPrisma.$disconnect();
  });
