'use client';

import { useState } from 'react';

export interface ParentProvisioningForm {
  companyName: string;
  subdomain: string;
  logoUrl: string;
  address: string;
  phone: string;
  email: string;
  taxIdNpwp: string;
  subscriptionPlan: 'ENTERPRISE_UNLIMITED' | 'PROFESSIONAL' | 'STARTER';
  selectedModules: string[];
  initialAdminName: string;
  initialAdminEmail: string;
  vpsIpAddress: string;
  vpsSshPort: number;
}

export interface ProvisionedVpsNode {
  id: string;
  companyName: string;
  subdomain: string;
  vpsIpAddress: string;
  dbSchema: string;
  status: 'ONLINE_ACTIVE' | 'DEPLOYING' | 'MAINTENANCE';
  activeModulesCount: number;
  initialAdminEmail: string;
  deployedAt: string;
}

export const MOCK_VPS_NODES: ProvisionedVpsNode[] = [
  {
    id: 'node-01',
    companyName: 'Nusantara Enterprise Holding Group',
    subdomain: 'nusantara',
    vpsIpAddress: '103.144.22.10',
    dbSchema: 'tenant_nusantara',
    status: 'ONLINE_ACTIVE',
    activeModulesCount: 9,
    initialAdminEmail: 'corporate@nusantara-holding.co.id',
    deployedAt: '2025-01-01'
  },
  {
    id: 'node-02',
    companyName: 'Mahkota Bakery & Culinary Group',
    subdomain: 'mahkota',
    vpsIpAddress: '103.144.22.18',
    dbSchema: 'tenant_mahkota',
    status: 'ONLINE_ACTIVE',
    activeModulesCount: 5,
    initialAdminEmail: 'contact@mahkota-bakery.com',
    deployedAt: '2025-06-15'
  }
];

export function useAdminProvisioner() {
  const [nodes, setNodes] = useState<ProvisionedVpsNode[]>(MOCK_VPS_NODES);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [generatedDockerYaml, setGeneratedDockerYaml] = useState<string | null>(null);

  const [formData, setFormData] = useState<ParentProvisioningForm>({
    companyName: '',
    subdomain: '',
    logoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=120&auto=format&fit=crop',
    address: 'Jl. Jend. Sudirman Kav 52-53, Jakarta Selatan',
    phone: '+62 21 5558 9900',
    email: 'admin@company.com',
    taxIdNpwp: '01.234.567.8-012.000',
    subscriptionPlan: 'ENTERPRISE_UNLIMITED',
    selectedModules: ['POS', 'INVENTORY', 'MANUFACTURING', 'FINANCE', 'HRD', 'HOTELIER', 'MINING'],
    initialAdminName: 'IT Administrator Parent',
    initialAdminEmail: 'admin@company.com',
    vpsIpAddress: '103.144.22.88',
    vpsSshPort: 22
  });

  const submitProvisioning = () => {
    const created: ProvisionedVpsNode = {
      id: `node-${Date.now()}`,
      companyName: formData.companyName,
      subdomain: formData.subdomain,
      vpsIpAddress: formData.vpsIpAddress,
      dbSchema: `tenant_${formData.subdomain.replace(/[^a-z0-9]/gi, '_')}`,
      status: 'ONLINE_ACTIVE',
      activeModulesCount: formData.selectedModules.length,
      initialAdminEmail: formData.initialAdminEmail,
      deployedAt: new Date().toISOString().substring(0, 10)
    };

    setNodes((prev: ProvisionedVpsNode[]) => [created, ...prev]);

    const yaml = `version: '3.8'

services:
  erp-web-${formData.subdomain}:
    image: node:20-alpine
    container_name: erp-web-${formData.subdomain}
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PARENT_COMPANY_NAME="${formData.companyName}"
      - PARENT_LOGO_URL="${formData.logoUrl}"
      - DATABASE_URL="postgresql://postgres:securepass123@postgres-db:5432/erp_db_${formData.subdomain}?schema=public"

  postgres-db:
    image: postgres:16-alpine
    container_name: erp-db-${formData.subdomain}
    restart: always
    environment:
      - POSTGRES_DB=erp_db_${formData.subdomain}
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=securepass123
`;

    setGeneratedDockerYaml(yaml);
  };

  return {
    nodes,
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    generatedDockerYaml,
    submitProvisioning
  };
}
