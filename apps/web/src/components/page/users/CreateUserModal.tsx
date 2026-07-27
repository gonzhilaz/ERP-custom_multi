'use client';

import React, { useState } from 'react';
import { UserPlus, ShieldCheck, CheckCircle2, X, Sparkles } from 'lucide-react';
import { useRoleTemplates } from '@/hooks/users/useRoleTemplates';
import { RolePermissionTemplate } from '@/lib/mock/roles';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: (newUser: any) => void;
}

export const CreateUserModal = ({ isOpen, onClose, onUserCreated }: Props) => {
  const { templates } = useRoleTemplates();

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0]?.id || '');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Toko Roti & Bakery Ops',
    userRole: 'RETAIL_CASHIER'
  });

  if (!isOpen) return null;

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];
  const enabledModuleNames = selectedTemplate
    ? selectedTemplate.permissions.filter((p) => p.canView || p.canCreate).map((p) => p.moduleName)
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onUserCreated({
      id: `usr-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      department: formData.department,
      role: selectedTemplate ? selectedTemplate.name : 'Custom Role',
      status: 'ACTIVE',
      templateName: selectedTemplate?.name
    });

    alert(
      `Pengguna Baru [${formData.name}] Berhasil Dibuat!\n\nTemplate Role: ${selectedTemplate?.name}\nHak Akses Modul (${enabledModuleNames.length} Modul Tercentang Auto):\n- ${enabledModuleNames.join('\n- ')}`
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4 text-xs">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-sky-500" />
            <span>Pendaftaran Pengguna Baru Berbasis Template Role</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-semibold mb-1">Pilih Template Role Akses</label>
            <SearchableSelect
              options={templates.map((t) => ({
                id: t.id,
                label: `[${t.isSystemPreset ? 'Preset Dev' : 'Custom Parent'}] ${t.name}`
              }))}
              value={selectedTemplateId}
              onChange={(val) => setSelectedTemplateId(val)}
              placeholder="Pilih Template Role Akses..."
            />
          </div>

          {/* Auto-populated Modules Badge Display */}
          {selectedTemplate && (
            <div className="p-3 bg-sky-50 dark:bg-slate-800/60 rounded-xl border border-sky-200 dark:border-slate-700 space-y-1.5">
              <div className="font-bold text-[11px] text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                <span>Otomatis Tercentang untuk Role Ini ({enabledModuleNames.length} Modul):</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {enabledModuleNames.map((modName) => (
                  <span key={modName} className="px-2 py-0.5 rounded text-[9px] font-bold bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-200 border shadow-xs">
                    ✓ {modName}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Nama Lengkap Pengguna</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Maya Indah"
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email Log In</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="maya@nusantara.co.id"
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Departemen / Divisi Operasional</label>
            <input
              type="text"
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="e.g. Toko Roti & Bakery Ops"
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-sm transition-all cursor-pointer"
            >
              Simpan & Daftarkan User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
