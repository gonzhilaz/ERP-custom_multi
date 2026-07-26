'use client';

import React, { useState } from 'react';
import { Truck, Plus } from 'lucide-react';
import { useVendor } from '@/hooks/vendor/useVendor';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { VendorCatalogTab } from './suppliers/VendorCatalogTab';
import { CreateVendorTab } from './suppliers/CreateVendorTab';

export const VendorSuppliersView = () => {
  const [activeTab, setActiveTab] = useState<'CATALOG' | 'CREATE'>('CATALOG');

  const {
    vendors,
    vendorCategories,
    addVendor,
    toggleVendorStatus
  } = useVendor();

  const totalAP = vendors.reduce((acc, curr) => acc + curr.payableBalance, 0);

  const subTabs: SubTabItem[] = [
    { id: 'CATALOG', label: 'Direktori Vendor', icon: Truck },
    { id: 'CREATE', label: 'Tambah Baru', icon: Plus, isAction: true }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Direktori Vendor"
        icon={Truck}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Direktori Vendor"
        glossaryItems={[
          { term: 'Vendor Master', description: 'Pengelolaan direktori supplier rekanan resmi.' }
        ]}
        badges={[
          { label: `${vendors.length} Vendor`, variant: 'slate' },
          { label: `Total AP: Rp ${totalAP.toLocaleString('id-ID')}`, variant: 'amber' }
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
        <VendorCatalogTab
          vendors={vendors}
          vendorCategories={vendorCategories}
          toggleVendorStatus={toggleVendorStatus}
        />
      )}

      {activeTab === 'CREATE' && (
        <CreateVendorTab
          vendorCategories={vendorCategories}
          addVendor={addVendor}
          onSuccess={() => setActiveTab('CATALOG')}
        />
      )}
    </div>
  );
};
