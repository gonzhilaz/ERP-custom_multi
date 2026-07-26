'use client';

import React, { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { useHrd } from '@/hooks/hrd/useHrd';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { EmployeeCatalogTab } from './employees/EmployeeCatalogTab';
import { CreateEmployeeTab } from './employees/CreateEmployeeTab';

export const HrdEmployeesView = () => {
  const [activeTab, setActiveTab] = useState<'CATALOG' | 'CREATE'>('CATALOG');

  const {
    employees,
    allEmployees,
    departments,
    addEmployee,
    deleteEmployee
  } = useHrd();

  const totalPayroll = allEmployees.reduce((acc, curr) => acc + curr.netSalary, 0);

  const subTabs: SubTabItem[] = [
    { id: 'CATALOG', label: 'Katalog Karyawan', icon: Users },
    { id: 'CREATE', label: 'Tambah Baru', icon: Plus, isAction: true }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Karyawan"
        icon={Users}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Direksi & Staff Karyawan"
        glossaryItems={[
          { term: 'Employee Master', description: 'Pengelolaan data pegawai, status NIK, & kompensasi THP.' }
        ]}
        badges={[
          { label: `${allEmployees.length} Pegawai Active`, variant: 'slate' },
          { label: `Total THP: Rp ${totalPayroll.toLocaleString('id-ID')}`, variant: 'emerald' }
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
        <EmployeeCatalogTab
          employees={employees}
          departments={departments}
          deleteEmployee={deleteEmployee}
        />
      )}

      {activeTab === 'CREATE' && (
        <CreateEmployeeTab
          departments={departments}
          addEmployee={addEmployee}
          onSuccess={() => setActiveTab('CATALOG')}
        />
      )}
    </div>
  );
};
