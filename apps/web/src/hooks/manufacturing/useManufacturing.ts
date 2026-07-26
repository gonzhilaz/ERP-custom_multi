'use client';

import { useState } from 'react';
import {
  BomRecipeItem,
  WorkOrderItem,
  ManufacturingAuditLog,
  MOCK_BOM_RECIPES,
  MOCK_WORK_ORDERS,
  MOCK_MANUFACTURING_AUDIT_LOGS
} from '@/lib/mock/manufacturing';

export function useManufacturing() {
  const [recipes, setRecipes] = useState<BomRecipeItem[]>(MOCK_BOM_RECIPES);
  const [workOrders, setWorkOrders] = useState<WorkOrderItem[]>(MOCK_WORK_ORDERS);
  const [auditLogs, setAuditLogs] = useState<ManufacturingAuditLog[]>(MOCK_MANUFACTURING_AUDIT_LOGS);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeUserRole = 'PRODUCTION_MANAGER';
  const activeUserName = 'Manajer Produksi (User System)';

  const calculateCogm = (components: BomRecipeItem['components'], overheads: BomRecipeItem['overheads'], outputQty: number) => {
    const rawCost = components.reduce((acc, c) => {
      const wasteMultiplier = 1 + c.wastePercentage / 100;
      return acc + c.requiredQty * c.costPerUnit * wasteMultiplier;
    }, 0);
    const overheadCost = overheads.reduce((acc, o) => acc + o.amount, 0);
    const totalBatchCost = rawCost + overheadCost;
    return outputQty > 0 ? Math.round(totalBatchCost / outputQty) : 0;
  };

  const addRecipe = (newRecipe: Omit<BomRecipeItem, 'id' | 'code' | 'updatedAt' | 'estimatedCogmPerUnit'>) => {
    const estimatedCogmPerUnit = calculateCogm(newRecipe.components, newRecipe.overheads, newRecipe.outputQty);
    const created: BomRecipeItem = {
      ...newRecipe,
      id: `bom-${Date.now()}`,
      code: `BOM-REC-${Math.floor(100 + Math.random() * 900)}`,
      estimatedCogmPerUnit,
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setRecipes((prev) => [created, ...prev]);

    const log: ManufacturingAuditLog = {
      id: `mlog-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: activeUserName,
      role: activeUserRole,
      action: 'CREATE_BOM',
      targetId: created.code,
      details: `Formulasi BOM Baru [${created.name}] berhasil dibuat dengan HPP Rp ${estimatedCogmPerUnit.toLocaleString('id-ID')}/${created.outputUom}.`
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const updateRecipe = (id: string, updated: Partial<BomRecipeItem>) => {
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const merged = { ...r, ...updated };
          merged.estimatedCogmPerUnit = calculateCogm(merged.components, merged.overheads, merged.outputQty);
          merged.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
          return merged;
        }
        return r;
      })
    );

    const log: ManufacturingAuditLog = {
      id: `mlog-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: activeUserName,
      role: activeUserRole,
      action: 'EDIT_BOM',
      targetId: id,
      details: `Revisi Formulasi BOM [${updated.name || id}] oleh Manajer Produksi.`
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const softDeleteRecipe = (id: string) => {
    const target = recipes.find((r) => r.id === id);
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'ARCHIVED' } : r)));

    if (target) {
      const log: ManufacturingAuditLog = {
        id: `mlog-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        user: activeUserName,
        role: activeUserRole,
        action: 'ARCHIVE_BOM',
        targetId: target.code,
        details: `Soft-Delete Formulasi BOM [${target.name}]. Data historis COGM tetap tersimpan.`
      };
      setAuditLogs((prev) => [log, ...prev]);
    }
  };

  const createWorkOrder = (woData: Omit<WorkOrderItem, 'id' | 'woNumber' | 'status' | 'totalEstimatedCogm'>) => {
    const targetRecipe = recipes.find((r) => r.id === woData.bomId);
    const estimatedCogmPerUnit = targetRecipe ? targetRecipe.estimatedCogmPerUnit : 10000;
    const totalEstimatedCogm = estimatedCogmPerUnit * woData.targetOutputQty;

    const created: WorkOrderItem = {
      ...woData,
      id: `wo-${Date.now()}`,
      woNumber: `WO-${woData.category.substring(0, 3)}-${new Date().toISOString().substring(0, 7).replace('-', '')}-${Math.floor(100 + Math.random() * 900)}`,
      totalEstimatedCogm,
      status: 'RELEASED'
    };

    setWorkOrders((prev) => [created, ...prev]);

    const log: ManufacturingAuditLog = {
      id: `mlog-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: activeUserName,
      role: activeUserRole,
      action: 'RELEASE_WO',
      targetId: created.woNumber,
      details: `Peluncuran Work Order Produksi ${created.targetOutputQty} ${created.outputUom} [${created.bomName}]. Terposting ke Jurnal COGM Rp ${totalEstimatedCogm.toLocaleString('id-ID')}.`
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const completeWorkOrder = (woId: string) => {
    const target = workOrders.find((w) => w.id === woId);
    setWorkOrders((prev) =>
      prev.map((w) =>
        w.id === woId
          ? {
              ...w,
              status: 'COMPLETED',
              completionDate: new Date().toISOString().replace('T', ' ').substring(0, 16)
            }
          : w
      )
    );

    if (target) {
      const log: ManufacturingAuditLog = {
        id: `mlog-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        user: activeUserName,
        role: activeUserRole,
        action: 'COMPLETE_WO',
        targetId: target.woNumber,
        details: `Work Order [${target.woNumber}] Selesai. ${target.targetOutputQty} ${target.outputUom} siap di Gudang Barang Jadi.`
      };
      setAuditLogs((prev) => [log, ...prev]);
    }
  };

  const filteredRecipes = recipes.filter((r) => {
    const matchesCategory = filterCategory === 'ALL' || r.category === filterCategory;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.outputItemName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && r.status !== 'ARCHIVED';
  });

  const activeWorkOrdersCount = workOrders.filter((w) => w.status === 'IN_PRODUCTION' || w.status === 'RELEASED').length;
  const completedWorkOrdersCount = workOrders.filter((w) => w.status === 'COMPLETED').length;

  return {
    recipes: filteredRecipes,
    allRecipes: recipes,
    workOrders,
    auditLogs,
    filterCategory,
    setFilterCategory,
    searchQuery,
    setSearchQuery,
    activeWorkOrdersCount,
    completedWorkOrdersCount,
    addRecipe,
    updateRecipe,
    softDeleteRecipe,
    createWorkOrder,
    completeWorkOrder
  };
}
