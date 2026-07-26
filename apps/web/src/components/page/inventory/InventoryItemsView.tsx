'use client';

import React, { useState } from 'react';
import { Boxes, Plus } from 'lucide-react';
import { useInventory } from '@/hooks/inventory/useInventory';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { ItemCatalogTab } from './items/ItemCatalogTab';
import { CreateItemTab } from './items/CreateItemTab';

export const InventoryItemsView = () => {
  const [activeTab, setActiveTab] = useState<'CATALOG' | 'CREATE'>('CATALOG');

  const {
    items,
    allItems,
    categories,
    alertItems,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addInventoryItem,
    deleteInventoryItem
  } = useInventory();

  const totalValuation = allItems.reduce((acc, curr) => acc + curr.stockQty * curr.costPerUnit, 0);

  const subTabs: SubTabItem[] = [
    { id: 'CATALOG', label: 'Katalog SKU', icon: Boxes },
    { id: 'CREATE', label: 'Tambah Baru', icon: Plus, isAction: true }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Inventory Items"
        icon={Boxes}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Inventory Items"
        glossaryItems={[
          { term: 'SKU Master', description: 'Pengelolaan stok persediaan barang operasional.' },
          { term: 'Buffer Threshold', description: 'Peringatan otomatis saat stok mencapai batas kritis minimum.' }
        ]}
        badges={[
          { label: `${allItems.length} SKU`, variant: 'slate' },
          { label: `Valuasi: Rp ${totalValuation.toLocaleString('id-ID')}`, variant: 'emerald' }
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
        <ItemCatalogTab
          items={items}
          categories={categories}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          deleteInventoryItem={deleteInventoryItem}
        />
      )}

      {activeTab === 'CREATE' && (
        <CreateItemTab
          categories={categories}
          addInventoryItem={addInventoryItem}
          onSuccess={() => setActiveTab('CATALOG')}
        />
      )}
    </div>
  );
};
