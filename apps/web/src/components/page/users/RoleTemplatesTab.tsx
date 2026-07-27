'use client';

import React, { useState } from 'react';
import { ShieldCheck, Plus, CheckCircle2, Lock, Trash2, Edit2, Copy, X, Sparkles } from 'lucide-react';
import { useRoleTemplates } from '@/hooks/users/useRoleTemplates';
import { RolePermissionTemplate, ModuleActionPermission, DEFAULT_MODULE_PERMISSIONS } from '@/lib/mock/roles';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

export const RoleTemplatesTab = () => {
  const {
    templates,
    activeTemplate,
    selectedTemplateId,
    setSelectedTemplateId,
    addCustomTemplate,
    updateTemplate,
    deleteCustomTemplate
  } = useRoleTemplates();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tenantTypeTarget: 'Retail Bakery Chain',
    permissions: DEFAULT_MODULE_PERMISSIONS.map((m) => ({ ...m }))
  });

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      description: '',
      tenantTypeTarget: 'Retail Bakery Chain',
      permissions: DEFAULT_MODULE_PERMISSIONS.map((m) => ({ ...m }))
    });
    setShowModal(true);
  };

  const handlePermissionToggle = (moduleCode: string, field: keyof ModuleActionPermission) => {
    if (activeTemplate.isSystemPreset) return; // System presets are read-only
    const updatedPermissions = activeTemplate.permissions.map((p) => {
      if (p.moduleCode === moduleCode) {
        return { ...p, [field]: !p[field] };
      }
      return p;
    });

    updateTemplate(activeTemplate.id, { permissions: updatedPermissions });
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    addCustomTemplate({
      name: formData.name,
      description: formData.description || 'Custom Role Template Parent Company',
      tenantTypeTarget: formData.tenantTypeTarget,
      permissions: formData.permissions
    });

    alert(`Template Role Custom [${formData.name}] Berhasil Dibuat!`);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-500" />
            <span>Template Role</span>
          </h2>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Template Role</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column: Template List Selector */}
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="font-bold text-xs text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span>Daftar Template Role ({templates.length})</span>
            <span className="text-[10px] text-slate-400 font-mono">Select to Edit</span>
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplateId(t.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedTemplateId === t.id
                    ? 'bg-sky-50 dark:bg-slate-800 border-sky-500 ring-2 ring-sky-500/20 text-slate-900 dark:text-white font-bold'
                    : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-sky-600 dark:text-sky-400">{t.code}</span>
                  {t.isSystemPreset ? (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> Preset Dev
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      Parent Custom
                    </span>
                  )}
                </div>

                <div className="font-bold text-xs mt-1">{t.name}</div>
                <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{t.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Checkbox Matrix Table */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{activeTemplate.name}</h3>
                {activeTemplate.isSystemPreset && (
                  <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Read-Only System Preset
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">{activeTemplate.description}</p>
            </div>

            {!activeTemplate.isSystemPreset && (
              <button
                onClick={() => deleteCustomTemplate(activeTemplate.id)}
                className="p-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg cursor-pointer transition-colors"
                title="Hapus Template Role Custom"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Checklist Table */}
          <DataTable
            headerTitle={`Akses Otorisasi Hak Modul (${activeTemplate.permissions.length})`}
            columns={[
              {
                key: 'moduleName',
                header: 'Nama Modul',
                className: 'font-semibold text-slate-900 dark:text-white',
                render: (perm) => (
                  <div>
                    <div className="font-bold">{perm.moduleName}</div>
                    <div className="text-[10px] font-mono text-sky-600">{perm.moduleCode}</div>
                  </div>
                )
              },
              ...(['canView', 'canCreate', 'canEdit', 'canDelete', 'canApprove'] as const).map((field) => ({
                key: field,
                header: field === 'canView' ? 'Lihat (Read)' : field === 'canCreate' ? 'Tambah (Create)' : field === 'canEdit' ? 'Edit (Update)' : field === 'canDelete' ? 'Soft Delete' : 'Approval',
                align: 'center' as const,
                sortable: false,
                render: (perm: ModuleActionPermission) => (
                  <input
                    type="checkbox"
                    checked={perm[field]}
                    disabled={activeTemplate.isSystemPreset}
                    onChange={() => handlePermissionToggle(perm.moduleCode, field)}
                    className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500 cursor-pointer disabled:cursor-not-allowed"
                  />
                )
              }))
            ]}
            data={activeTemplate.permissions}
            keyExtractor={(perm) => perm.moduleCode}
          />
        </div>
      </div>

      {/* Modal Add Custom Role Template */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                <span>Buat Template Role Custom Perusahaan</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitCustom} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Nama Template Role</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Kasir Toko Roti Senior / Shift Leader"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Target Jenis Unit Bisnis</label>
                  <select
                    value={formData.tenantTypeTarget}
                    onChange={(e) => setFormData({ ...formData, tenantTypeTarget: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
                  >
                    <option value="Retail Bakery Chain">🍞 Toko Roti / Bakery</option>
                    <option value="Restoran & Catering">🍲 Resto & F&B</option>
                    <option value="Hotel & Hospitality">🏨 Hotel & Hospitality</option>
                    <option value="Tambang Emas">⛏️ Pertambangan Emas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Deskripsi Hak Akses</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsikan peran dan batas tanggung jawab..."
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              {/* Form Checkbox Table */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="font-bold text-xs">Centang Modul Yang Diizinkan:</div>
                <div className="space-y-1.5 max-h-48 overflow-y-auto border p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  {formData.permissions.map((p, idx) => (
                    <div key={p.moduleCode} className="flex items-center justify-between text-[11px] p-1.5 bg-white dark:bg-slate-900 rounded-lg border">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{p.moduleName}</span>
                      <div className="flex gap-3">
                        <label className="flex items-center gap-1 font-semibold">
                          <input
                            type="checkbox"
                            checked={p.canView}
                            onChange={(e) => {
                              const updated = [...formData.permissions];
                              updated[idx].canView = e.target.checked;
                              setFormData({ ...formData, permissions: updated });
                            }}
                          />
                          <span>Lihat</span>
                        </label>
                        <label className="flex items-center gap-1 font-semibold">
                          <input
                            type="checkbox"
                            checked={p.canCreate}
                            onChange={(e) => {
                              const updated = [...formData.permissions];
                              updated[idx].canCreate = e.target.checked;
                              setFormData({ ...formData, permissions: updated });
                            }}
                          />
                          <span>Tambah</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Simpan Template Custom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
