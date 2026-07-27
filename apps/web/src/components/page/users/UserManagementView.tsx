'use client';

import React, { useState } from 'react';
import { Users, UserPlus, ShieldCheck, Monitor, History } from 'lucide-react';
import { useUserManagement } from '@/hooks/users/useUserManagement';
import { UserTable } from '@/components/ui/tables/UserTable';
import { SkeletonTable } from '@/components/ui/loader/skeleton/SkeletonTable';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { RoleTemplatesTab } from './RoleTemplatesTab';
import { CreateUserModal } from './CreateUserModal';
import { ActiveSessionsTab } from './ActiveSessionsTab';
import { UserAuditLogTab } from './UserAuditLogTab';

export const UserManagementView = () => {
  const { users, loading, toggleUserStatus } = useUserManagement();
  const [activeTab, setActiveTab] = useState<'USERS' | 'TEMPLATES' | 'SESSIONS' | 'AUDIT_LOG'>('USERS');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userList, setUserList] = useState(users);

  const subTabs: SubTabItem[] = [
    { id: 'USERS', label: 'Pengguna', icon: Users, count: userList.length },
    { id: 'TEMPLATES', label: 'Template Role', icon: ShieldCheck },
    { id: 'SESSIONS', label: 'Sesi Aktif', icon: Monitor },
    { id: 'AUDIT_LOG', label: 'Audit Log Keamanan', icon: History }
  ];

  const handleUserCreated = (newUser: any) => {
    setUserList((prev) => [newUser, ...prev]);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Pengguna & Akses"
        icon={Users}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Governance Pengguna"
        glossaryItems={[
          { term: 'Super Admin', description: 'Hak akses penuh tanpa batas di seluruh tenant & sistem holding.' },
          { term: 'Role Template', description: 'Preset otomatisasi izin modul untuk kemudahan pembagian peran.' },
          { term: 'Force Logout', description: 'Pemutusan paksa sesi login pengguna online dari jarak jauh.' }
        ]}
        actions={
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer text-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah Pengguna</span>
          </button>
        }
      />

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
            <UserTable items={userList} onToggleStatus={toggleUserStatus} />
          )}
        </>
      )}

      {activeTab === 'TEMPLATES' && <RoleTemplatesTab />}
      {activeTab === 'SESSIONS' && <ActiveSessionsTab />}
      {activeTab === 'AUDIT_LOG' && <UserAuditLogTab />}

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};
