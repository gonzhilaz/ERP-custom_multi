'use client';

import React from 'react';
import { X, ShieldCheck, Building2, CheckCircle2, Lock, User, Clock } from 'lucide-react';
import { SystemUserItem } from '@/lib/mock/users';

interface Props {
  user: SystemUserItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailAccessModal: React.FC<Props> = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-2xl shadow-2xl space-y-5 text-xs max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-base shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>{user.fullName}</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20">
                  {user.systemRole}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                <span>{user.email}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Login Terakhir: {user.lastLogin}</span>
                </span>
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Assigned Tenants Section */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
            <Building2 className="w-4 h-4 text-sky-500" />
            <span>Matriks Penugasan Tenant & Unit Usaha</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {user.assignedTenants.map((t) => (
              <div key={t.tenantId} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="font-mono text-sky-600 dark:text-sky-400">[{t.code}]</span>
                    <span className="truncate max-w-[160px]">{t.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-semibold">
                    Peran Unit: <span className="text-slate-700 dark:text-slate-300 font-mono">{t.roleInTenant}</span>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Granular Permissions Section */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-purple-500" />
            <span>Izin RBAC Modul Granular</span>
          </h4>
          <div className="flex flex-wrap gap-1.5 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/50">
            {user.grantedPermissions.map((perm) => (
              <span key={perm} className="px-2.5 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-xl text-[11px] font-mono font-bold">
                {perm}
              </span>
            ))}
          </div>
        </div>

        {/* Security & System Info Footer */}
        <div className="p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
            <Lock className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Status Keamanan: <strong>{user.status === 'ACTIVE' ? 'Aktif Terverifikasi (2FA Ready)' : 'Ditangguhkan / Suspended'}</strong></span>
          </div>
          <button onClick={onClose} className="px-4 py-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-xl text-xs hover:opacity-90 cursor-pointer">
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
