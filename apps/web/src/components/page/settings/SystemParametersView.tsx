'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Trash2, HelpCircle, X, Layers } from 'lucide-react';
import { useSystemParameters } from '@/hooks/useSystemParameters';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

export const SystemParametersView = () => {
  const { parameters, addParameter, deleteParameter } = useSystemParameters();
  const [showGlossary, setShowGlossary] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    moduleGroup: 'INVENTORY_ASSET' as const,
    parameterType: 'Kategori Aset Tetap',
    code: 'AST-KENDARAAN',
    name: 'Kendaraan Dinas & Operasional Fleet',
    description: 'Armada mobil dinas, truk box, & motor operasional kantor'
  });

  const filteredParams = parameters.filter((p) => {
    const matchQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.code.toLowerCase().includes(searchQuery.toLowerCase()) || p.parameterType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGroup = groupFilter === 'ALL' || p.moduleGroup === groupFilter;
    return matchQuery && matchGroup;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addParameter(form);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Aturan & Parameter</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-purple-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-purple-400">
                  <span>Zero Hardcode Dynamic Parameters</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Kelola Kategori, Tipe, & Klasifikasi dinas untuk seluruh modul (Inventory, Aset, Procurement, HR, Finance) secara bebas tanpa perlu koding hardcode.
                </p>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setShowModal(true)} className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Tambah Parameter</span>
        </button>
      </div>

      {/* Dynamic Search Filter Component */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Klasifikasi Parameter Terdaftar</h3>
        <DynamicSearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Cari kode parameter, nama, atau tipe klasifikasi..."
          categoryValue={groupFilter}
          onCategoryChange={setGroupFilter}
          categoryPlaceholder="Semua Grup Modul"
          categoryOptions={[
            { label: 'Inventory & Aset', value: 'INVENTORY_ASSET' },
            { label: 'Vendor & Procurement', value: 'VENDOR_PROCUREMENT' },
            { label: 'HRD & Payroll', value: 'HRD_PAYROLL' },
            { label: 'Finance & Legal', value: 'FINANCE_LEGAL' }
          ]}
        />
      </div>

      {/* Parameter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredParams.map((p) => (
          <div key={p.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm relative">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-mono">
                {p.moduleGroup}
              </span>
              <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">{p.code}</span>
            </div>

            <div className="text-[11px] text-slate-400 font-bold uppercase">{p.parameterType}</div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{p.name}</h4>
            <p className="text-slate-500 text-xs">{p.description}</p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-emerald-600 font-bold">ACTIVE PARAMETER</span>
              <button onClick={() => deleteParameter(p.id)} className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-white dark:bg-slate-900 w-full max-w-md p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Form Parameter Baru (Zero Hardcode)</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Grup Modul:</label>
                <SearchableSelect
                  value={form.moduleGroup}
                  onChange={(val) => setForm({ ...form, moduleGroup: val as any })}
                  options={[
                    { id: 'INVENTORY_ASSET', label: 'Inventory & Aset' },
                    { id: 'VENDOR_PROCUREMENT', label: 'Vendor & Procurement' },
                    { id: 'HRD_PAYROLL', label: 'HRD & Payroll' },
                    { id: 'FINANCE_LEGAL', label: 'Finance & Legal' }
                  ]}
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Tipe Parameter / Klasifikasi:</label>
                <input type="text" value={form.parameterType} onChange={(e) => setForm({ ...form, parameterType: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Kode Unik:</label>
                <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none font-mono" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Nama Parameter:</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" />
              </div>
            </div>
            <button type="submit" className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-md cursor-pointer">
              Simpan Parameter Sistem
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
