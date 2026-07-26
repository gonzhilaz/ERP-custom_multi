'use client';

import { useState } from 'react';
import {
  ClientParentCompany,
  LicenseKeyItem,
  SaaSDeveloperMetrics,
  MOCK_CLIENT_PARENT_COMPANIES,
  MOCK_LICENSE_KEYS,
  MOCK_DEVELOPER_METRICS
} from '@/lib/mock/developer';

export function useDeveloper() {
  const [clients, setClients] = useState<ClientParentCompany[]>(MOCK_CLIENT_PARENT_COMPANIES);
  const [licenseKeys, setLicenseKeys] = useState<LicenseKeyItem[]>(MOCK_LICENSE_KEYS);
  const [metrics, setMetrics] = useState<SaaSDeveloperMetrics>(MOCK_DEVELOPER_METRICS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const addClient = (newClient: Omit<ClientParentCompany, 'id' | 'clientCode' | 'joinedDate'>) => {
    const created: ClientParentCompany = {
      ...newClient,
      id: `client-${Date.now()}`,
      clientCode: `CLT-${newClient.companyName.substring(0, 4).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`,
      joinedDate: new Date().toISOString().substring(0, 10)
    };

    setClients((prev) => [created, ...prev]);

    setMetrics((prev) => ({
      ...prev,
      monthlyRecurringRevenue: prev.monthlyRecurringRevenue + created.monthlyFee,
      annualRecurringRevenue: (prev.monthlyRecurringRevenue + created.monthlyFee) * 12,
      totalActiveHoldingClients: prev.totalActiveHoldingClients + 1
    }));
  };

  const generateNewLicenseKey = (clientName: string, plan: string) => {
    const keyString = `SaaS-${plan.substring(0, 3)}-${new Date().getFullYear()}-${clientName.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-KEY`;
    const created: LicenseKeyItem = {
      id: `lic-${Date.now()}`,
      licenseKey: keyString,
      clientName,
      plan,
      issuedDate: new Date().toISOString().substring(0, 10),
      expiryDate: `${new Date().getFullYear() + 1}-12-31`,
      status: 'UNUSED'
    };

    setLicenseKeys((prev) => [created, ...prev]);
    return keyString;
  };

  const updateClientStatus = (clientId: string, status: ClientParentCompany['status']) => {
    setClients((prev) => prev.map((c) => (c.id === clientId ? { ...c, status } : c)));
  };

  const filteredClients = clients.filter((c) => {
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    const matchesSearch =
      c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clientCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return {
    clients: filteredClients,
    allClients: clients,
    licenseKeys,
    metrics,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    addClient,
    generateNewLicenseKey,
    updateClientStatus
  };
}
