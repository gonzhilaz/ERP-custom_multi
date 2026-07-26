'use client';

import React, { useState } from 'react';
import { FileSpreadsheet, Plus } from 'lucide-react';
import { useFinance } from '@/hooks/finance/useFinance';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { CoaCatalogTab } from './coa/CoaCatalogTab';
import { CreateCoaTab } from './coa/CreateCoaTab';

export const FinanceCoaView = () => {
  const [activeTab, setActiveTab] = useState<'CATALOG' | 'CREATE'>('CATALOG');

  const {
    coaList,
    coaCategories,
    addCoaItem,
    deleteCoaItem
  } = useFinance();

  const totalAssets = coaList
    .filter((c) => c.type === 'ASSET')
    .reduce((acc, curr) => acc + curr.balance, 0);

  const subTabs: SubTabItem[] = [
    { id: 'CATALOG', label: 'Bagan Akun (COA)', icon: FileSpreadsheet },
    { id: 'CREATE', label: 'Tambah Akun Baru', icon: Plus, isAction: true }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Chart of Accounts"
        icon={FileSpreadsheet}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Chart of Accounts"
        glossaryItems={[
          { term: 'Klasifikasi Akun', description: 'Struktur bagan akun standar holding & unit usaha.' },
          { term: 'Mapping COA', description: 'Integrasi otomatis ke jurnal transaksi operasional.' }
        ]}
        badges={[
          { label: `${coaList.length} Akun Active`, variant: 'slate' },
          { label: `Total Aset: Rp ${totalAssets.toLocaleString('id-ID')}`, variant: 'emerald' }
        ]}
      />

      {/* SubTabNav Component */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={subTabs}
        colorScheme="emerald"
      />

      {/* Sub-Tab Content Rendering */}
      {activeTab === 'CATALOG' && (
        <CoaCatalogTab
          coaList={coaList}
          coaCategories={coaCategories}
          deleteCoaItem={deleteCoaItem}
        />
      )}

      {activeTab === 'CREATE' && (
        <CreateCoaTab
          coaCategories={coaCategories}
          addCoaItem={addCoaItem}
          onSuccess={() => setActiveTab('CATALOG')}
        />
      )}
    </div>
  );
};
