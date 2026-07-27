'use client';

import React, { useState } from 'react';
import { Users, UserPlus, ShieldCheck, HelpCircle, X, Monitor } from 'lucide-react';
import { useUserManagement } from '@/hooks/users/useUserManagement';
import { UserTable } from '@/components/ui/tables/UserTable';
import { SkeletonTable } from '@/components/ui/loader/skeleton/SkeletonTable';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { RoleTemplatesTab } from './RoleTemplatesTab';
import { CreateUserModal } from './CreateUserModal';
import { ActiveSessionsTab } from './ActiveSessionsTab';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

export const UserManagementView = () => {
  const { users, loading, filterRole, setFilterRole, toggleUserStatus } = useUserManagement();
  const [activeTab, setActiveTab] = useState<'USERS' | 'TEMPLATES' | 'SESSIONS'>('USERS');
  const [showGlossary, setShowGlossary] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userList, setUserList] = useState(users);

  const subTabs: SubTabItem[] = [
    { id: 'USERS', label: 'Daftar Pengguna System', icon: Users, count: userList.length },
    { id: 'TEMPLATES', label: 'Template Role & Checklist Modul', icon: ShieldCheck },
    { id: 'SESSIONS', label: 'Sesi Login Active & IP Security', icon: Monitor }
  ];

  const handleUserCreated = (newUser: any) => {
    setUserList((prev) => [newUser, ...prev]);
  };

  return (
    <div className="space-y-4">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Pengguna & Akses"
        icon={Users}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Pengguna & Security"
        glossaryItems={[
          { term: 'Role Template', description: 'Template preset holding untuk otomatisasi centang hak akses modul.' },
          { term: 'Active Sessions', description: 'Pemantauan pengguna online & pemutusan akses IP (Force Logout).' }
        ]}
      >
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah Pengguna</span>
        </button>
      </ModuleHeader>

      {/* SubTab Navigation */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab as any}
        tabs={subTabs}
        colorScheme="sky"
      />

      {/* Dynamic Tab Content */}
      {activeTab === 'USERS' && (
        <>
          {loading ? (
            <SkeletonTable />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs w-64">
                  <span className="text-slate-400 font-semibold shrink-0">Filter Peran:</span>
                  <SearchableSelect
                    options={[
                      { id: 'ALL', label: 'Semua Peran System' },
                      { id: 'HOLDING_EXECUTIVE', label: 'Holding Executive' },
                      { id: 'TENANT_USER', label: 'Tenant Unit User' }
                    ]}
                    value={filterRole}
                    onChange={(val) => setFilterRole(val)}
                    placeholder="Pilih Peran System..."
                  />
                </div>
              </div>

              <UserTable items={userList} onToggleStatus={toggleUserStatus} />
            </div>
          )}
        </>
      )}

      {activeTab === 'TEMPLATES' && <RoleTemplatesTab />}
      {activeTab === 'SESSIONS' && <ActiveSessionsTab />}

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};
