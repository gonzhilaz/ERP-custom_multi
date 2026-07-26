'use client';

import React, { useState } from 'react';
import { ShieldCheck, UserCheck, HelpCircle, X, Lock, Key, Settings } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { useOrganization } from '@/hooks/settings/useOrganization';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';

export const AccessControlView = () => {
  const { userRules, templates, currentUserRole, updateUserAccessTemplate } = useOrganization();
  const [showGlossary, setShowGlossary] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredUsers = userRules.filter((u) => {
    const matchQuery = u.userName.toLowerCase().includes(searchQuery.toLowerCase()) || u.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchQuery && matchRole;
  });

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Kontrol Akses"
        icon={ShieldCheck}
        iconBgColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        glossaryTitle="Glossary Kontrol Akses & Security"
        glossaryItems={[
          { term: 'Template Akses Standar', description: 'Preset matriks izin per Peran/Jabatan di seluruh holding.' },
          { term: 'Customized Permission', description: 'Hak akses khusus per User / Tenant / Cabang.' }
        ]}
      />

      {/* Access Templates Banner */}
      <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-3xl border border-purple-200 dark:border-purple-900/60 space-y-3">
        <h3 className="font-bold text-sm text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
          <Key className="w-4 h-4 text-purple-600" />
          <span>Template Akses Standar Perusahaan</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {templates.map((tmpl) => (
            <div key={tmpl.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-purple-200 dark:border-slate-800 space-y-1.5">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">{tmpl.templateName}</h4>
              <p className="text-[11px] text-slate-500">{tmpl.description}</p>
              <div className="text-[10px] text-purple-600 dark:text-purple-400 font-bold font-mono">
                {tmpl.allowedModules.length} Modul Terbuka
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Search Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Matriks Izin Akses Karyawan</h3>
        <DynamicSearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Cari nama karyawan atau email..."
          categoryValue={roleFilter}
          onCategoryChange={setRoleFilter}
          categoryPlaceholder="Semua Role User"
          categoryOptions={[
            { label: 'SUPER_ADMIN', value: 'SUPER_ADMIN' },
            { label: 'HOLDING_ADMIN', value: 'HOLDING_ADMIN' },
            { label: 'UNIT_ADMIN', value: 'UNIT_ADMIN' },
            { label: 'OPERATIONAL_USER', value: 'OPERATIONAL_USER' }
          ]}
        />
      </div>

      {/* User Rules Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500">
              <th className="p-3 font-semibold">Nama & Email User</th>
              <th className="p-3 font-semibold">Role Utama</th>
              <th className="p-3 font-semibold">Tenant & Cabang Assigned</th>
              <th className="p-3 font-semibold">Template Akses Active</th>
              <th className="p-3 font-semibold text-center">Aksi Ganti Template</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-bold text-slate-900 dark:text-white">
                  {u.userName}
                  <span className="block font-mono text-[11px] text-slate-400 font-normal">{u.userEmail}</span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    u.role === 'SUPER_ADMIN' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-3 text-slate-700 dark:text-slate-300">
                  <strong className="block text-slate-800 dark:text-slate-200">{u.tenantDomain} - {u.branchName}</strong>
                  <span className="text-[11px] text-slate-400">{u.departmentName}</span>
                </td>
                <td className="p-3 font-bold text-purple-600 dark:text-purple-400">
                  {u.role === 'SUPER_ADMIN' ? 'FULL SUPER ADMIN ACCESS' : templates.find((t) => t.id === u.assignedTemplateId)?.templateName || 'Custom Rule'}
                </td>
                <td className="p-3 text-center">
                  {u.role !== 'SUPER_ADMIN' ? (
                    <select
                      value={u.assignedTemplateId || ''}
                      onChange={(e) => updateUserAccessTemplate(u.id, e.target.value)}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold cursor-pointer"
                    >
                      <option value="">-- Pilih Template --</option>
                      {templates.map((tmpl) => (
                        <option key={tmpl.id} value={tmpl.id}>
                          {tmpl.templateName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-amber-600 font-bold text-[11px]">Unrestricted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
