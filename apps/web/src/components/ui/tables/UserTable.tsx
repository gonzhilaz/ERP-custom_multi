import React from 'react';
import { SystemUserItem } from '@/lib/mock/users';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { ShieldCheck, UserCheck, Lock } from 'lucide-react';

interface UserTableProps {
  items: SystemUserItem[];
  onToggleStatus: (userId: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ items, onToggleStatus }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Daftar Pengguna System & Akses Unit Usaha</span>
        <span className="text-[11px] text-slate-400">Total {items.length} User Terdaftar</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3 px-4">Pengguna</th>
              <th className="py-3 px-4">System Role</th>
              <th className="py-3 px-4">Akses Unit Usaha (Tenants)</th>
              <th className="py-3 px-4">Izin RBAC Granular</th>
              <th className="py-3 px-4 text-center">Login Terakhir</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {items.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 font-semibold">
                  <div className="text-slate-900 dark:text-white font-bold">{u.fullName}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>
                </td>
                <td className="py-3 px-4 font-bold">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    u.systemRole === 'HOLDING_EXECUTIVE' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300' :
                    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {u.systemRole}
                  </span>
                </td>
                <td className="py-3 px-4 space-y-1">
                  {u.assignedTenants.map((t) => (
                    <div key={t.tenantId} className="flex items-center gap-1.5 text-[11px]">
                      <span className="font-mono font-bold text-sky-600 dark:text-sky-400">[{t.code}]</span>
                      <span className="truncate">{t.name}</span>
                      <span className="text-[9px] px-1 bg-slate-200 dark:bg-slate-800 rounded">{t.roleInTenant}</span>
                    </div>
                  ))}
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {u.grantedPermissions.map((p) => (
                      <span key={p} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 text-center font-mono text-[10px] text-slate-400">{u.lastLogin}</td>
                <td className="py-3 px-4 text-center">
                  <StatusBadge type={u.status} label={u.status} />
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onToggleStatus(u.id)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                      u.status === 'ACTIVE'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 hover:bg-amber-200'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-200'
                    }`}
                  >
                    {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
