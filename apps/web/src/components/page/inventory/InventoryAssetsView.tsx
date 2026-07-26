'use client';

import React, { useState } from 'react';
import { Building, Plus } from 'lucide-react';
import { useInventory } from '@/hooks/inventory/useInventory';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { AssetCatalogTab } from './assets/AssetCatalogTab';
import { CreateAssetTab } from './assets/CreateAssetTab';

export const InventoryAssetsView = () => {
  const [activeTab, setActiveTab] = useState<'CATALOG' | 'CREATE'>('CATALOG');

  const {
    assets,
    allAssets,
    assetCategories,
    searchQuery,
    setSearchQuery,
    addAssetItem,
    deleteAssetItem
  } = useInventory();

  const totalCost = allAssets.reduce((acc, curr) => acc + curr.purchaseCost, 0);
  const totalBookValue = allAssets.reduce((acc, curr) => acc + curr.bookValue, 0);

  const subTabs: SubTabItem[] = [
    { id: 'CATALOG', label: 'Katalog Aset', icon: Building },
    { id: 'CREATE', label: 'Tambah Baru', icon: Plus, isAction: true }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Asset Tetap"
        icon={Building}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Aktiva Tetap & Depresiasi"
        glossaryItems={[
          { term: 'Aset Tetap', description: 'Pengelolaan daftar aktiva tetap perusahaan, perolehan, & penyusutan bulanan.' }
        ]}
        badges={[
          { label: `${allAssets.length} Unit Aset`, variant: 'slate' },
          { label: `Nilai Buku: Rp ${totalBookValue.toLocaleString('id-ID')}`, variant: 'purple' }
        ]}
      />

      {/* SubTabNav Component */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={subTabs}
        colorScheme="sky"
      />

      {/* Sub-Tab Content Rendering */}
      {activeTab === 'CATALOG' && (
        <AssetCatalogTab
          assets={assets}
          assetCategories={assetCategories}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          deleteAssetItem={deleteAssetItem}
        />
      )}

      {activeTab === 'CREATE' && (
        <CreateAssetTab
          assetCategories={assetCategories}
          addAssetItem={addAssetItem}
          onSuccess={() => setActiveTab('CATALOG')}
        />
      )}
    </div>
  );
};
