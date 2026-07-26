import 'dotenv/config';
import { PrismaClient as TenantPrismaClient } from '../generated/tenant-client';
import { SEED_BRANCHES, TENANT_COA_MAP, SEED_CHAT_CHANNELS } from './seed-data/tenant-details';
import { SEED_USERS } from './seed-data/users';

const tenantPrisma = new TenantPrismaClient();

async function seedTenant() {
  console.log(`=======================================================`);
  console.log(`🌱 Seeding Tenant Database Schema & Organizational Data...`);
  console.log(`=======================================================`);

  // 1. Seed Branches
  const branchMap = new Map<string, string>();
  for (const b of SEED_BRANCHES) {
    const branch = await tenantPrisma.branch.upsert({
      where: { code: b.code },
      update: { name: b.name, address: b.address, phone: b.phone },
      create: { code: b.code, name: b.name, address: b.address, phone: b.phone, isActive: true }
    });
    branchMap.set(b.code, branch.id);
    console.log(`✅ Branch Seeded: [${branch.code}] ${branch.name}`);
  }

  const defaultBranchId = branchMap.get('HO-JKT-01') || Array.from(branchMap.values())[0];

  // 2. Seed Departments
  const deptList = ['Executive Management', 'Front Office', 'Housekeeping', 'Front Cashier', 'Production', 'Event Operations', 'Central Kitchen', 'Supply Chain', 'Engineering', 'Heavy Fleet', 'Field Operations', 'HSE & Legal', 'Logistics', 'Site HRD', 'Management', 'Kitchen BOH', 'Group Finance', 'Group HRD', 'Internal Audit'];

  const deptMap = new Map<string, string>();
  for (const dName of deptList) {
    const deptCode = dName.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 10);
    const existing = await tenantPrisma.department.findFirst({ where: { name: dName } });
    if (existing) {
      deptMap.set(dName, existing.id);
    } else {
      const created = await tenantPrisma.department.create({
        data: { branchId: defaultBranchId, code: deptCode, name: dName }
      });
      deptMap.set(dName, created.id);
    }
  }

  // 3. Seed Standardized COA Accounts across all Tenant domains
  let totalCoaCount = 0;
  for (const [tenantCode, coaAccounts] of Object.entries(TENANT_COA_MAP)) {
    for (const acc of coaAccounts) {
      await tenantPrisma.account.upsert({
        where: { code: acc.code },
        update: { name: acc.name, balance: acc.balance },
        create: {
          code: acc.code,
          name: acc.name,
          type: acc.type,
          balance: acc.balance,
          currency: 'IDR',
          isHeader: false,
          isActive: true
        }
      });
      totalCoaCount++;
    }
  }
  console.log(`✅ ${totalCoaCount} Industry-Specific COA Accounts Seeded across 5 Tenant domains`);

  // 4. Seed Local Users & Roles
  let userCount = 0;
  for (const userDef of SEED_USERS) {
    const localUser = await tenantPrisma.localUser.upsert({
      where: { email: userDef.email },
      update: { fullName: userDef.fullName },
      create: {
        email: userDef.email,
        fullName: userDef.fullName,
        isActive: true
      }
    });

    // Create Employee record
    const deptId = deptMap.get(userDef.department) || Array.from(deptMap.values())[0];
    const nik = `NIK-${Math.floor(100000 + Math.random() * 900000)}`;

    const existingEmp = await tenantPrisma.employee.findUnique({ where: { localUserId: localUser.id } });
    if (!existingEmp) {
      await tenantPrisma.employee.create({
        data: {
          localUserId: localUser.id,
          departmentId: deptId,
          nik: nik,
          fullName: userDef.fullName,
          email: userDef.email,
          salaryType: userDef.roleInTenant.includes('OPERATOR') ? 'DAILY' : userDef.roleInTenant.includes('EVENT') ? 'PIECEWORK_COMMISSION' : 'MONTHLY',
          baseSalary: userDef.roleInTenant.includes('OPERATOR') ? 450000 : 8500000,
          isActive: true
        }
      });
    }

    userCount++;
  }
  console.log(`✅ ${userCount} Local Users & Employee Profiles Seeded`);

  // 5. Seed Chat Channels & Initial Messages
  const adminUser = await tenantPrisma.localUser.findFirst();
  if (adminUser) {
    for (const channelDef of SEED_CHAT_CHANNELS) {
      const existingChannel = await tenantPrisma.chatChannel.findFirst({ where: { name: channelDef.name } });
      if (!existingChannel) {
        const channel = await tenantPrisma.chatChannel.create({
          data: {
            name: channelDef.name,
            description: channelDef.description,
            type: 'GROUP_CHANNEL'
          }
        });

        await tenantPrisma.chatMember.create({
          data: { channelId: channel.id, userId: adminUser.id }
        });

        await tenantPrisma.chatMessage.create({
          data: {
            channelId: channel.id,
            senderId: adminUser.id,
            type: 'TEXT',
            content: `Welcome to the ${channelDef.name} workspace channel! Multi-tenant live sync active.`
          }
        });
      }
    }
    console.log(`✅ ${SEED_CHAT_CHANNELS.length} Live Collaboration Chat Channels Seeded`);
  }

  console.log(`=======================================================`);
  console.log(`🎉 Tenant Database Schema & Mock Data Seeded Successfully!`);
  console.log(`=======================================================`);
}

seedTenant()
  .catch((e) => {
    console.error(`❌ Tenant Seeding failed:`, e);
    process.exit(1);
  })
  .finally(async () => {
    await tenantPrisma.$disconnect();
  });
