import React from 'react';
import { SystemUserItem } from '@/lib/mock/users';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface UserTableProps {
  items: SystemUserItem[];
  onToggleStatus: (userId: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ items, onToggleStatus }) => {
  const columns: ColumnDef<SystemUserItem>[] = [
    {
      key: 'fullName',
      header: 'Pengguna',
      className: 'font-semibold',
      render: (u) => (
        <div>
          <div className="text-slate-900 dark:text-white font-bold">{u.fullName}</div>
          <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>
        </div>
      )
    },
    {
      key: 'systemRole',
      header: 'System Role',
      className: 'font-bold',
      render: (u) => (
        <span className={`px-2 py-0.5 rounded text-[10px] ${
          u.systemRole === 'HOLDING_EXECUTIVE' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300' :
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
              <span className="truncate">{t.name}</span>
              <span className="text-[9px] px-1 bg-slate-200 dark:bg-slate-800 rounded">{t.roleInTenant}</span>
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
        <div className="flex flex-wrap gap-1">
          {u.grantedPermissions.map((p) => (
            <span key={p} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
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
        <button
          onClick={() => onToggleStatus(u.id)}
          className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
            u.status === 'ACTIVE'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 hover:bg-amber-200'
              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-200'
          }`}
        >
          {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
        </button>
      )
    }
  ];

  return (
    <DataTable
      headerTitle="Daftar Pengguna System & Akses Unit Usaha"
      columns={columns}
      data={items}
      keyExtractor={(u) => u.id}
    />
  );
};
