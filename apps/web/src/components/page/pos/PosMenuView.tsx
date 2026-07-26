'use client';

import React, { useState } from 'react';
import { UtensilsCrossed, Plus } from 'lucide-react';
import { usePos } from '@/hooks/pos/usePos';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { MenuCatalogTab } from './menu/MenuCatalogTab';
import { CreateMenuTab } from './menu/CreateMenuTab';

export const PosMenuView = () => {
  const [activeTab, setActiveTab] = useState<'CATALOG' | 'CREATE'>('CATALOG');

  const {
    allMenuItems,
    menuCategories,
    addMenuItem,
    deleteMenuItem
  } = usePos();

  const totalAvgPrice = allMenuItems.length > 0 ? Math.round(allMenuItems.reduce((acc, curr) => acc + curr.price, 0) / allMenuItems.length) : 0;

  const subTabs: SubTabItem[] = [
    { id: 'CATALOG', label: 'Katalog Barang & Menu', icon: UtensilsCrossed },
    { id: 'CREATE', label: 'Tambah Baru', icon: Plus, isAction: true }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Katalog Barang POS"
        icon={UtensilsCrossed}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Katalog Barang POS"
        glossaryItems={[
          { term: 'Menu Catalog', description: 'Pengelolaan daftar makanan, minuman, & retail SKU kasir.' }
        ]}
        badges={[
          { label: `${allMenuItems.length} Menu Active`, variant: 'slate' },
          { label: `Rata-rata Harga: Rp ${totalAvgPrice.toLocaleString('id-ID')}`, variant: 'sky' }
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
        <MenuCatalogTab
          menuItems={allMenuItems}
          menuCategories={menuCategories}
          deleteMenuItem={deleteMenuItem}
        />
      )}

      {activeTab === 'CREATE' && (
        <CreateMenuTab
          menuCategories={menuCategories}
          addMenuItem={addMenuItem}
          onSuccess={() => setActiveTab('CATALOG')}
        />
      )}
    </div>
  );
};
