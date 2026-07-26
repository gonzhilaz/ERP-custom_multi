'use client';

import React, { useState } from 'react';
import { Sliders, Tag, Plus, Trash2, CheckCircle2, Lock, ShieldAlert } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { COA_CATEGORIES, CoaCategory } from '@/lib/mock/finance';

interface TaxRuleParam {
  id: string;
  ruleCode: string;
  ruleName: string;
  taxRatePct: string;
  glAccountCode: string;
  appliesTo: string;
}

interface LockPeriodParam {
  periodMonth: string;
  status: 'LOCKED' | 'OPEN';
  lockedBy: string;
  lockedAt: string;
}

const MOCK_FINANCE_RULES: TaxRuleParam[] = [
  { id: 'fp-01', ruleCode: 'TAX-PPN-12', ruleName: 'PPN Masukan/Keluaran Standard (12%)', taxRatePct: '12%', glAccountCode: '2-10300 (Utang PPN Keluaran)', appliesTo: 'Transaksi Retail & Vendor PO' },
  { id: 'fp-02', ruleCode: 'TAX-PPH-23', ruleName: 'PPh Pasal 23 Jasa Manajemen (2%)', taxRatePct: '2%', glAccountCode: '2-10400 (Utang PPh 23)', appliesTo: 'Sewa & Layanan Jasa Rekanan' },
  { id: 'fp-03', ruleCode: 'TAX-PB1-10', ruleName: 'Pajak Daerah Resto & Hotel PB1 (10%)', taxRatePct: '10%', glAccountCode: '2-10301 (Utang PB1 Resto/Hotel)', appliesTo: 'Penjualan F&B & Kamar Hotel' }
];

export const FinanceParametersView = () => {
  const [activeTab, setActiveTab] = useState<'CATEGORIES' | 'RULES' | 'LOCK_PERIOD'>('CATEGORIES');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<CoaCategory[]>(COA_CATEGORIES);
  const [taxRules, setTaxRules] = useState<TaxRuleParam[]>(MOCK_FINANCE_RULES);

  const [lockPeriods, setLockPeriods] = useState<LockPeriodParam[]>([
    { periodMonth: '2026-06 (Juni 2026)', status: 'LOCKED', lockedBy: 'Chief Accountant HO', lockedAt: '2026-07-01 23:59:00' },
    { periodMonth: '2026-07 (Juli 2026)', status: 'OPEN', lockedBy: '-', lockedAt: '-' }
  ]);

  // New Category Modal State
  const [isAddCatOpen, setIsAddCatOpen] = useState(false);
  const [newCat, setNewCat] = useState({
    code: '',
    name: '',
    type: 'ASSET' as const,
    description: ''
  });

  const subTabs: SubTabItem[] = [
    { id: 'CATEGORIES', label: 'Kelola Katalog Kategori COA', icon: Tag },
    { id: 'RULES', label: 'Kelola Aturan Pajak & GL Rules', icon: Sliders },
    { id: 'LOCK_PERIOD', label: 'Penguncian Periode Akuntansi (Cut-Off Lock)', icon: Lock }
  ];

  const filteredCategories = categories.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRules = taxRules.filter(
    (r) =>
      r.ruleCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ruleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.glAccountCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.code || !newCat.name) {
      alert('Kode dan nama kategori wajib diisi!');
      return;
    }

    const created: CoaCategory = {
      id: `cat-${Date.now()}`,
      code: newCat.code,
      name: newCat.name,
      type: newCat.type,
      accountCount: 0,
      description: newCat.description || 'Kategori COA Kostum'
    };

    setCategories([created, ...categories]);
    setIsAddCatOpen(false);
    setNewCat({ code: '', name: '', type: 'ASSET', description: '' });
  };

  const handleToggleLock = (periodMonth: string) => {
    setLockPeriods(
      lockPeriods.map((p) =>
        p.periodMonth === periodMonth
          ? {
              ...p,
              status: p.status === 'LOCKED' ? 'OPEN' : 'LOCKED',
              lockedBy: p.status === 'OPEN' ? 'Chief Accountant HO' : '-',
              lockedAt: p.status === 'OPEN' ? new Date().toLocaleString('id-ID') : '-'
            }
          : p
      )
    );
  };

  const catColumns: ColumnDef<CoaCategory>[] = [
    { key: 'code', header: 'Kode Kategori', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.code },
    { key: 'name', header: 'Nama Kategori COA', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.name },
    { key: 'type', header: 'Tipe Klasifikasi', render: (i) => <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold font-mono text-[10px] rounded">{i.type}</span> },
    { key: 'description', header: 'Keterangan Akuntansi', render: (i) => i.description }
  ];

  const ruleColumns: ColumnDef<TaxRuleParam>[] = [
    { key: 'ruleCode', header: 'Kode Aturan', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.ruleCode },
    { key: 'ruleName', header: 'Nama Aturan Pajak / GL', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.ruleName },
    { key: 'taxRatePct', header: 'Tarif (%)', align: 'center', className: 'font-mono font-bold text-emerald-600', render: (i) => i.taxRatePct },
    { key: 'glAccountCode', header: 'Kode COA Penampung', className: 'font-mono font-bold text-slate-900 dark:text-white', render: (i) => i.glAccountCode },
    { key: 'appliesTo', header: 'Skop Pemetaan Transaksi', render: (i) => i.appliesTo }
  ];

  const lockColumns: ColumnDef<LockPeriodParam>[] = [
    { key: 'periodMonth', header: 'Periode Bulan Akuntansi', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.periodMonth },
    {
      key: 'status',
      header: 'Status Penguncian (Lock)',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded flex items-center justify-center gap-1 ${
          i.status === 'LOCKED' ? 'bg-rose-500/10 text-rose-600' : 'bg-emerald-500/10 text-emerald-600'
        }`}>
          {i.status === 'LOCKED' ? <Lock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
          {i.status === 'LOCKED' ? 'TERKUNCI (LOCKED)' : 'TERBUKA (OPEN)'}
        </span>
      )
    },
    { key: 'lockedBy', header: 'Pengunci / Otorisator', render: (i) => i.lockedBy },
    { key: 'lockedAt', header: 'Waktu Penguncian', className: 'font-mono text-slate-500', render: (i) => i.lockedAt },
    {
      key: 'actions',
      header: 'Aksi Lock / Unlock',
      align: 'center',
      render: (i) => (
        <button
          onClick={() => handleToggleLock(i.periodMonth)}
          className={`px-3 py-1 font-bold rounded-lg cursor-pointer text-[10px] ${
            i.status === 'LOCKED' ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20' : 'bg-rose-500/10 text-rose-600 hover:bg-rose-500/20'
          }`}
        >
          {i.status === 'LOCKED' ? 'Buka Kunci Periode' : 'Kunci Periode Akuntansi'}
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Settings & Parameter Modul Finance"
        icon={Sliders}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Finance Parameters"
        glossaryItems={[
          { term: 'Kategori COA', description: 'Pengelompokan akun Bagan Akun (Asset, Liability, Equity, Revenue, Expense).' },
          { term: 'Aturan Pajak & GL Rules', description: 'Parameter otomatisasi potongan PPN 12%, PPh 23 2%, dan PB1 Resto/Hotel 10%.' },
          { term: 'Lock Period Cut-Off', description: 'Penguncian periode akuntansi bulanan untuk mencegah backdated posting transaksi.' }
        ]}
        badges={[
          { label: 'Role Restrict: Admin & Finance Only', variant: 'slate' },
          { label: `${categories.length} Kategori COA`, variant: 'sky' }
        ]}
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="sky"
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Cari parameter pada ${activeTab}...`}
          />
        </div>

        {activeTab === 'CATEGORIES' && (
          <button onClick={() => setIsAddCatOpen(true)} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs shrink-0">
            <Plus className="w-4 h-4" />
            <span>Tambah Kategori COA</span>
          </button>
        )}
      </div>

      {activeTab === 'CATEGORIES' && (
        <DataTable
          headerTitle={`Katalog Kategori Akun COA (${filteredCategories.length})`}
          columns={catColumns}
          data={filteredCategories}
          keyExtractor={(i) => i.code}
        />
      )}

      {activeTab === 'RULES' && (
        <DataTable
          headerTitle={`Aturan Pajak & Pemetaan Otomatis GL (${filteredRules.length})`}
          columns={ruleColumns}
          data={filteredRules}
          keyExtractor={(i) => i.ruleCode}
        />
      )}

      {activeTab === 'LOCK_PERIOD' && (
        <DataTable
          headerTitle="Tabel Status Penguncian Periode Akuntansi (Cut-Off Lock Period)"
          columns={lockColumns}
          data={lockPeriods}
          keyExtractor={(i) => i.periodMonth}
        />
      )}

      {/* Modal Add Category */}
      {isAddCatOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl text-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tambah Kategori Akun COA Baru</h3>
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Kode Kategori</label>
                <input type="text" value={newCat.code} onChange={(e) => setNewCat({ ...newCat, code: e.target.value })} placeholder="Contoh: CAT-ASSET-01" className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border font-mono font-bold" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Nama Kategori</label>
                <input type="text" value={newCat.name} onChange={(e) => setNewCat({ ...newCat, name: e.target.value })} placeholder="Contoh: Kas & Bank Lancar" className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border font-bold" required />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddCatOpen(false)} className="px-3 py-1.5 bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer">
                  Batal
                </button>
                <button type="submit" className="px-4 py-1.5 bg-sky-600 text-white font-bold rounded-lg cursor-pointer">
                  Simpan Kategori
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
