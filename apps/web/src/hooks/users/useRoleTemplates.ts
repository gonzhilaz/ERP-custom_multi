'use client';

import { useState } from 'react';
import {
  RolePermissionTemplate,
  MOCK_ROLE_TEMPLATES,
  DEFAULT_MODULE_PERMISSIONS
} from '@/lib/mock/roles';

export function useRoleTemplates() {
  const [templates, setTemplates] = useState<RolePermissionTemplate[]>(MOCK_ROLE_TEMPLATES);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(MOCK_ROLE_TEMPLATES[0].id);
  const [filterTenantType, setFilterTenantType] = useState<string>('ALL');

  const addCustomTemplate = (newTemplate: Omit<RolePermissionTemplate, 'id' | 'code' | 'isSystemPreset' | 'userCount' | 'updatedAt'>) => {
    const created: RolePermissionTemplate = {
      ...newTemplate,
      id: `tmpl-custom-${Date.now()}`,
      code: `TPL-CST-${Math.floor(100 + Math.random() * 900)}`,
      isSystemPreset: false,
      userCount: 0,
      updatedAt: new Date().toISOString().substring(0, 10)
    };

    setTemplates((prev) => [created, ...prev]);
    setSelectedTemplateId(created.id);
  };

  const updateTemplate = (id: string, updated: Partial<RolePermissionTemplate>) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated, updatedAt: new Date().toISOString().substring(0, 10) } : t))
    );
  };

  const deleteCustomTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id || t.isSystemPreset));
  };

  const activeTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  const filteredTemplates = templates.filter((t) => {
    if (filterTenantType === 'ALL') return true;
    return t.tenantTypeTarget === filterTenantType || t.isSystemPreset;
  });

  return {
    templates: filteredTemplates,
    allTemplates: templates,
    activeTemplate,
    selectedTemplateId,
    setSelectedTemplateId,
    filterTenantType,
    setFilterTenantType,
    addCustomTemplate,
    updateTemplate,
    deleteCustomTemplate
  };
}
