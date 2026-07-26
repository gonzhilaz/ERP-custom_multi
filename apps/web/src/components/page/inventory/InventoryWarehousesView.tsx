'use client';

import React, { useState } from 'react';
import { Warehouse, Plus } from 'lucide-react';
import { useInventory } from '@/hooks/inventory/useInventory';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { StorageCatalogTab } from './warehouses/StorageCatalogTab';
import { CreateStorageTab } from './warehouses/CreateStorageTab';

export const InventoryWarehousesView = () => {
  const [activeTab, setActiveTab] = useState<'CATALOG' | 'CREATE'>('CATALOG');

  const {
    storages,
    allStorages,
    storageTypes,
    addStorageLocation,
    deleteStorageLocation
  } = useInventory();

  const totalMax = allStorages.reduce((acc, curr) => acc + curr.capacityMax, 0);
  const totalUsed = allStorages.reduce((acc, curr) => acc + curr.capacityUsed, 0);
  const totalUtilizedPct = totalMax > 0 ? Math.round((totalUsed / totalMax) * 100) : 0;

  const subTabs: SubTabItem[] = [
    { id: 'CATALOG', label: 'Katalog Gudang', icon: Warehouse },
    { id: 'CREATE', label: 'Tambah Baru', icon: Plus, isAction: true }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Gudang & Storage"
        icon={Warehouse}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Storage Gudang"
        glossaryItems={[
          { term: 'Cold Storage (-20°C)', description: 'Ruang penyimpanan dingin bahan makanan basah (daging/sayur) dengan pelacakan kadaluarsa FEFO.' }
        ]}
        badges={[
          { label: `${allStorages.length} Gudang`, variant: 'slate' },
          { label: `Utilisasi: ${totalUtilizedPct}%`, variant: 'amber' }
        ]}
      />

      {/* SubTabNav Component */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={subTabs}
        colorScheme="amber"
      />

      {/* Sub-Tab Content Rendering */}
      {activeTab === 'CATALOG' && (
        <StorageCatalogTab
          storages={storages}
          storageTypes={storageTypes}
          deleteStorageLocation={deleteStorageLocation}
        />
      )}

      {activeTab === 'CREATE' && (
        <CreateStorageTab
          storageTypes={storageTypes}
          addStorageLocation={addStorageLocation}
          onSuccess={() => setActiveTab('CATALOG')}
        />
      )}
    </div>
  );
};
