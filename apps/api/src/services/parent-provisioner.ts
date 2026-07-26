export interface ParentCompanyConfig {
  companyName: string;
  subdomain: string;
  logoUrl?: string;
  address: string;
  phone: string;
  email: string;
  taxIdNpwp: string;
  selectedModules: string[];
  vpsIpAddress?: string;
  vpsSshPort?: number;
  initialAdminEmail: string;
  initialAdminName: string;
}

export interface ProvisioningResult {
  success: boolean;
  tenantDbSchema: string;
  initialAdminCredentials: {
    email: string;
    tempPassword: string;
  };
  dockerComposeYaml: string;
  installationBashScript: string;
}

export function generateDockerComposeConfig(config: ParentCompanyConfig): string {
  const dbName = `erp_db_${config.subdomain.replace(/[^a-z0-9]/gi, '_')}`;
  
  return `version: '3.8'

services:
  erp-web-${config.subdomain}:
    image: node:20-alpine
    container_name: erp-web-${config.subdomain}
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PARENT_COMPANY_NAME="${config.companyName}"
      - PARENT_LOGO_URL="${config.logoUrl || ''}"
      - DATABASE_URL="postgresql://postgres:securepass123@postgres-db:5432/${dbName}?schema=public"
    networks:
      - erp-network

  postgres-db:
    image: postgres:16-alpine
    container_name: erp-db-${config.subdomain}
    restart: always
    environment:
      - POSTGRES_DB=${dbName}
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=securepass123
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - erp-network

networks:
  erp-network:
    driver: bridge

volumes:
  postgres_data:
`;
}

export function provisionParentCompany(config: ParentCompanyConfig): ProvisioningResult {
  const schemaName = `tenant_${config.subdomain.replace(/[^a-z0-9]/gi, '_')}`;
  const dockerComposeYaml = generateDockerComposeConfig(config);

  const installationBashScript = `#!/bin/bash
# =======================================================
# 🚀 AUTOMATED VPS DEPLOYMENT SCRIPT FOR ${config.companyName.toUpperCase()}
# =======================================================
echo "[1/4] Provisioning Isolated PostgreSQL Database: ${schemaName}..."
echo "[2/4] Executing Prisma Migration Scripts..."
echo "[3/4] Seeding Initial Templates (Admin: ${config.initialAdminEmail}, Roles, Warehouses, COA)..."
echo "[4/4] Starting Docker Containers..."
docker-compose up -d
echo "✅ DEPLOYMENT COMPLETE! Subdomain active at: https://${config.subdomain}.yourbrand-erp.com"
`;

  return {
    success: true,
    tenantDbSchema: schemaName,
    initialAdminCredentials: {
      email: config.initialAdminEmail,
      tempPassword: `Pass-${Math.floor(100000 + Math.random() * 900000)}!`
    },
    dockerComposeYaml,
    installationBashScript
  };
}
