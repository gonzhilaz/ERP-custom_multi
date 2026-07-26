'use client';

import React, { useState } from 'react';
import { Building2, Plus, ShieldAlert, Crown, HelpCircle, X, MapPin } from 'lucide-react';
import { useOrganization } from '@/hooks/settings/useOrganization';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';

export const OrganizationHierarchyView = () => {
  const { holdings, branches, currentUserRole, createHoldingEnterprise, createBranchSite } = useOrganization();
  const [showGlossary, setShowGlossary] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('ALL');
  const [showHoldModal, setShowHoldModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);

  const [holdForm, setHoldForm] = useState({
    name: 'PT Borneo Multi Holding Enterprise',
    adminUser: 'Irfan Ariessaputra',
    adminEmail: 'irfan.ariessaputra@gmail.com',
    npwp: '01.992.881.7-011.000'
  });

  const [branchForm, setBranchForm] = useState({
    name: 'Branch Retail Store Surabaya',
    tenantDomain: 'RETAIL' as const,
    cityLocation: 'Surabaya, Jawa Timur',
    headOfBranch: 'Budi Santoso'
  });

  const filteredBranches = branches.filter((b) => {
    const matchQuery = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.cityLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDomain = domainFilter === 'ALL' || b.tenantDomain === domainFilter;
    return matchQuery && matchDomain;
  });

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Hirarki Organisasi</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-purple-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-purple-400">
                  <span>Hirarki Organisasi Multi-Tenant</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Pengaturan hirarki: <strong>Holding Enterprise ➔ Tenant Unit Usaha ➔ Cabang/Site ➔ Departemen</strong>. HANYA Super Admin yang berhak membuat Holding & Holding Admin.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentUserRole === 'SUPER_ADMIN' && (
            <button onClick={() => setShowHoldModal(true)} className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer">
              <Crown className="w-4 h-4" />
              <span>Buat Holding Baru</span>
            </button>
          )}
          <button onClick={() => setShowBranchModal(true)} className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Tambah Cabang/Site</span>
          </button>
        </div>
      </div>

      {/* Holding Section (Super Admin Governance) */}
      <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-3xl border border-amber-200 dark:border-amber-900/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3 className="font-bold text-sm text-amber-900 dark:text-amber-300">Holding Enterprise (Otoritas Tertinggi Super Admin)</h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200">
            SUPER_ADMIN ONLY
          </span>
        </div>
        {holdings.map((h) => (
          <div key={h.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-amber-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
            <div>
              <span className="font-mono text-[11px] text-amber-600 font-bold">{h.holdingCode}</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{h.name}</h4>
              <div className="text-slate-500 text-[11px]">NPWP: {h.taxIdNpwp}</div>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-[11px] text-slate-400 block">Holding Admin Assigned:</span>
              <strong className="text-amber-700 dark:text-amber-300">{h.holdingAdminUser}</strong>
              <span className="text-[11px] text-slate-500 block font-mono">{h.holdingAdminEmail}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Universal Search Filter Component */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Daftar Cabang & Site Operasional</h3>
        <DynamicSearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Cari nama cabang atau kota lokasi..."
          categoryValue={domainFilter}
          onCategoryChange={setDomainFilter}
          categoryPlaceholder="Semua Unit Usaha"
          categoryOptions={[
            { label: 'Holding Central', value: 'HOLDING' },
            { label: 'Mining Operations', value: 'MINING' },
            { label: 'Resto & F&B', value: 'RESTO' },
            { label: 'Hotel PMS', value: 'HOTEL' },
            { label: 'Retail Chain', value: 'RETAIL' }
          ]}
        />
      </div>

      {/* Grid Cabang */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredBranches.map((b) => (
          <div key={b.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-mono">
                {b.tenantDomain}
              </span>
              <span className="font-mono text-xs font-bold text-slate-500">{b.branchCode}</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-purple-500" />
              <span>{b.name}</span>
            </h4>
            <div className="text-slate-500 text-xs">Lokasi: <strong>{b.cityLocation}</strong></div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
              Head of Branch: <strong className="text-slate-800 dark:text-slate-200">{b.headOfBranch}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Holding Super Admin */}
      {showHoldModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={(e) => { e.preventDefault(); createHoldingEnterprise(holdForm.name, holdForm.adminUser, holdForm.adminEmail, holdForm.npwp); setShowHoldModal(false); }} className="bg-white dark:bg-slate-900 w-full max-w-md p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-500" />
                <span>Form Holding Baru (Super Admin Only)</span>
              </h3>
              <button type="button" onClick={() => setShowHoldModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Nama Holding Enterprise:</label>
                <input type="text" value={holdForm.name} onChange={(e) => setHoldForm({ ...holdForm, name: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Nama Holding Admin:</label>
                <input type="text" value={holdForm.adminUser} onChange={(e) => setHoldForm({ ...holdForm, adminUser: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Email Holding Admin:</label>
                <input type="email" value={holdForm.adminEmail} onChange={(e) => setHoldForm({ ...holdForm, adminEmail: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none font-mono" />
              </div>
            </div>
            <button type="submit" className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md cursor-pointer">
              Terbitkan Holding Enterprise
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
