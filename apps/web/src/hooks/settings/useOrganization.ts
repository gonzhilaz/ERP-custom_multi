'use client';

import { useState } from 'react';
import {
  MOCK_HOLDINGS,
  MOCK_BRANCHES,
  MOCK_ACCESS_TEMPLATES,
  MOCK_USER_ACCESS_RULES,
  HoldingEnterprise,
  BranchSite,
  AccessTemplate,
  UserAccessRule
} from '@/lib/mock/organization';

export function useOrganization() {
  const [holdings, setHoldings] = useState<HoldingEnterprise[]>(MOCK_HOLDINGS);
  const [branches, setBranches] = useState<BranchSite[]>(MOCK_BRANCHES);
  const [templates, setTemplates] = useState<AccessTemplate[]>(MOCK_ACCESS_TEMPLATES);
  const [userRules, setUserRules] = useState<UserAccessRule[]>(MOCK_USER_ACCESS_RULES);
  const [currentUserRole] = useState<'SUPER_ADMIN' | 'HOLDING_ADMIN' | 'UNIT_ADMIN'>('SUPER_ADMIN');

  const createHoldingEnterprise = (name: string, adminUser: string, adminEmail: string, npwp: string) => {
    if (currentUserRole !== 'SUPER_ADMIN') {
      alert('Hanya Role SUPER_ADMIN yang memiliki wewenang membuat Holding Enterprise Baru!');
      return;
    }

    const newHold: HoldingEnterprise = {
      id: `hold-${Date.now()}`,
      holdingCode: `HOLD-ENT-00${holdings.length + 1}`,
      name,
      taxIdNpwp: npwp,
      holdingAdminUser: adminUser,
      holdingAdminEmail: adminEmail,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setHoldings([...holdings, newHold]);
    alert(`Holding Enterprise [${name}] Berhasil Dibuat oleh Super Admin! Holding Admin: ${adminUser}`);
  };

  const createBranchSite = (name: string, domain: BranchSite['tenantDomain'], city: string, head: string) => {
    const newBranch: BranchSite = {
      id: `br-${Date.now()}`,
      branchCode: `BR-${city.substring(0, 3).toUpperCase()}-${domain}`,
      tenantDomain: domain,
      name,
      cityLocation: city,
      headOfBranch: head
    };

    setBranches([...branches, newBranch]);
    alert(`Cabang/Site [${name}] Berhasil Ditambahkan ke Hirarki Organisasi!`);
  };

  const updateUserAccessTemplate = (userId: string, templateId: string) => {
    const selectedTmpl = templates.find((t) => t.id === templateId);
    setUserRules((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, assignedTemplateId: templateId, customAllowedModules: selectedTmpl ? selectedTmpl.allowedModules : u.customAllowedModules }
          : u
      )
    );
    alert('Izin Modul User Berhasil Diperbarui Berdasarkan Template!');
  };

  return {
    holdings,
    branches,
    templates,
    userRules,
    currentUserRole,
    createHoldingEnterprise,
    createBranchSite,
    updateUserAccessTemplate
  };
}
