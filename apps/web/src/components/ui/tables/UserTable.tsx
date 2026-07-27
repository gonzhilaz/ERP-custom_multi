import React, { useState } from 'react';
import { SystemUserItem } from '@/lib/mock/users';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { UserDetailAccessModal } from '@/components/page/users/UserDetailAccessModal';
import { Eye, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface UserTableProps {
  items: SystemUserItem[];
  onToggleStatus: (userId: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ items, onToggleStatus }) => {
  const [selectedUser, setSelectedUser] = useState<SystemUserItem | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  const filteredItems = items.filter((u) => {
    if (roleFilter !== 'ALL' && u.systemRole !== roleFilter) return false;
    return true;
  });

  const columns: ColumnDef<SystemUserItem>[] = [
    {
      key: 'fullName',
      header: 'Pengguna',
      className: 'font-semibold',
      render: (u) => (
        <div>
          <div className="text-slate-900 dark:text-white font-bold flex items-center gap-1.5">
            <span>{u.fullName}</span>
            {u.systemRole === 'SUPER_ADMIN' && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                SUPER ADMIN
              </span>
            )}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>
        </div>
      )
    },
    {
      key: 'systemRole',
      header: 'System Role',
      className: 'font-bold',
      render: (u) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
          u.systemRole === 'SUPER_ADMIN' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30' :
          u.systemRole === 'HOLDING_EXECUTIVE' ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30' :
          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
        }`}>
          {u.systemRole}
        </span>
      )
    },
    {
      key: 'assignedTenants',
      header: 'Akses Unit Usaha (Tenants)',
      sortable: false,
      render: (u) => (
        <div className="space-y-1">
          {u.assignedTenants.map((t) => (
            <div key={t.tenantId} className="flex items-center gap-1.5 text-[11px]">
              <span className="font-mono font-bold text-sky-600 dark:text-sky-400">[{t.code}]</span>
              <span className="truncate max-w-[140px] text-slate-700 dark:text-slate-300">{t.name}</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-slate-500">{t.roleInTenant}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'grantedPermissions',
      header: 'Izin RBAC Granular',
      sortable: false,
      render: (u) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {u.grantedPermissions.map((p) => (
            <span key={p} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-semibold">
              {p}
            </span>
          ))}
        </div>
      )
    },
    { key: 'lastLogin', header: 'Login Terakhir', align: 'center', className: 'font-mono text-[10px] text-slate-400', render: (u) => u.lastLogin },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (u) => <StatusBadge type={u.status} label={u.status} />
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      sortable: false,
      render: (u) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => setSelectedUser(u)}
            className="p-1 text-slate-400 hover:text-sky-500 transition-colors cursor-pointer"
            title="Lihat Detail Matriks Akses"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleStatus(u.id)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
              u.status === 'ACTIVE'
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
            }`}
          >
            {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <DataTable
        headerTitle={`Daftar Pengguna System & Otorisasi Akses (${filteredItems.length})`}
        columns={columns}
        data={filteredItems}
        filterComponent={
          <SearchableSelect
            value={roleFilter}
            onChange={(val) => setRoleFilter(val)}
            options={[
              { id: 'ALL', label: 'Semua Peran System' },
              { id: 'SUPER_ADMIN', label: 'Super Admin Enterprise' },
              { id: 'HOLDING_EXECUTIVE', label: 'Holding Executive' },
              { id: 'TENANT_USER', label: 'Tenant Unit User' }
            ]}
            className="w-52"
          />
        }
        keyExtractor={(u) => u.id}
      />

      <UserDetailAccessModal
        user={selectedUser}
        isOpen={selectedUser !== null}
        onClose={() => setSelectedUser(null)}
      />
    </>
  );
};
