'use client';

import React, { useState } from 'react';
import { Factory, Play, Cpu, Layers } from 'lucide-react';
import { useManufacturing } from '@/hooks/manufacturing/useManufacturing';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { BomManagementTab } from './BomManagementTab';
import { WorkOrderTab } from './WorkOrderTab';

export const ManufacturingView = () => {
  const [activeTab, setActiveTab] = useState<'BOM' | 'WORK_ORDER'>('BOM');
  const {
    recipes,
    workOrders,
    auditLogs,
    filterCategory,
    setFilterCategory,
    searchQuery,
    setSearchQuery,
    addRecipe,
    updateRecipe,
    softDeleteRecipe,
    createWorkOrder,
    completeWorkOrder
  } = useManufacturing();

  const subTabs: SubTabItem[] = [
    { id: 'BOM', label: 'Resep Produksi & Bill of Materials (BOM)', icon: Layers, count: recipes.length },
    { id: 'WORK_ORDER', label: 'Perintah Kerja Produksi (Work Order & WIP)', icon: Cpu, count: workOrders.length }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Manufaktur & PPIC Production Hub"
        icon={Factory}
        iconBgColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        glossaryTitle="Glossary Manufaktur & Resep BOM"
        glossaryItems={[
          { term: 'Bill of Materials (BOM)', description: 'Resep formulasi racikan produksi bahan baku per satuan barang jadi.' },
          { term: 'Work Order (WO)', description: 'Perintah kerja pabrikasi yang memotong stok bahan baku & menghasilkan Work In Process (WIP).' }
        ]}
        badges={[
          { label: `${recipes.length} Resep BOM Active`, variant: 'sky' },
          { label: `${workOrders.length} Work Orders Issued`, variant: 'slate' }
        ]}
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="indigo"
      />

      {activeTab === 'BOM' ? (
        <BomManagementTab
          recipes={recipes}
          auditLogs={auditLogs}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          addRecipe={addRecipe}
          updateRecipe={updateRecipe}
          softDeleteRecipe={softDeleteRecipe}
        />
      ) : (
        <WorkOrderTab
          workOrders={workOrders}
          recipes={recipes}
          createWorkOrder={createWorkOrder}
          completeWorkOrder={completeWorkOrder}
        />
      )}
    </div>
  );
};
