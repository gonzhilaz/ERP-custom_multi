'use client';

import { useState } from 'react';
import { MasterTaxItem, TaxAuditLog, MOCK_TAX_ITEMS, MOCK_TAX_AUDIT_LOGS } from '@/lib/mock/tax';

export function useTaxMaster() {
  const [taxes, setTaxes] = useState<MasterTaxItem[]>(MOCK_TAX_ITEMS);
  const [auditLogs, setAuditLogs] = useState<TaxAuditLog[]>(MOCK_TAX_AUDIT_LOGS);
  const [userRole] = useState<string>('IT_ADMIN'); // Simulated current user role (IT_ADMIN / TOP_MANAGEMENT)

  const activeTaxes = taxes.filter((t) => !t.isDeleted);

  const addAuditLog = (action: TaxAuditLog['action'], taxCode: string, details: string) => {
    const newLog: TaxAuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Bambang Soetjipto (Admin)',
      role: userRole,
      action,
      taxCode,
      details
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const createTax = (newTax: Omit<MasterTaxItem, 'id' | 'isDeleted' | 'createdAt' | 'updatedAt'>) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const item: MasterTaxItem = {
      ...newTax,
      id: `tax-${Date.now()}`,
      isDeleted: false,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    setTaxes((prev) => [item, ...prev]);
    addAuditLog('CREATE', item.code, `Pendaftaran Master Pajak Baru: ${item.name} (${item.ratePercentage}%) linked ke ${item.coaAccount}`);
  };

  const updateTax = (id: string, updatedFields: Partial<MasterTaxItem>) => {
    // RBAC Check: Only IT, ADMIN, TOP LEVEL MANAGEMENT
    if (userRole !== 'IT_ADMIN' && userRole !== 'HOLDING_EXECUTIVE') {
      alert('AKSES DITOLAK: Hanya IT, ADMIN, dan TOP LEVEL MANAGEMENT yang diizinkan mengubah Master Pajak System!');
      return;
    }

    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setTaxes((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const next = { ...t, ...updatedFields, updatedAt: timestamp };
          addAuditLog('EDIT', next.code, `Update konfigurasi pajak ${next.name} (${next.ratePercentage}%) linked ke ${next.coaAccount}`);
          return next;
        }
        return t;
      })
    );
  };

  const softDeleteTax = (id: string) => {
    // RBAC Check: Only IT, ADMIN, TOP LEVEL MANAGEMENT
    if (userRole !== 'IT_ADMIN' && userRole !== 'HOLDING_EXECUTIVE') {
      alert('AKSES DITOLAK: Hanya IT, ADMIN, dan TOP LEVEL MANAGEMENT yang diizinkan mengarsipkan Master Pajak!');
      return;
    }

    const target = taxes.find((t) => t.id === id);
    if (!target) return;

    setTaxes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isDeleted: true, status: 'ARCHIVED' } : t))
    );
    addAuditLog('SOFT_DELETE', target.code, `Soft-Delete / Arsip Master Pajak ${target.name} (Data historis pembukuan tetap utuh di audit log)`);
  };

  return {
    taxes: activeTaxes,
    allTaxes: taxes,
    auditLogs,
    userRole,
    createTax,
    updateTax,
    softDeleteTax
  };
}
