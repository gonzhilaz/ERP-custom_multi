'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Trash2, CheckCircle2, Edit3, ShieldAlert, Eye } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { SearchableSelect, SearchSelectOption } from '@/components/ui/dropdowns/SearchableSelect';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';
import { COA_DATA } from '@/lib/mock/finance';

interface TaxRuleParam {
  id: string;
  ruleCode: string;
  ruleName: string;
  taxRatePct: string;
  glAccountCode: string;
  appliesTo: string;
}

const INITIAL_TAX_RULES: TaxRuleParam[] = [
  { id: 'fp-01', ruleCode: 'TAX-PPN-12', ruleName: 'PPN Masukan/Keluaran Standard (12%)', taxRatePct: '12%', glAccountCode: '2-10300', appliesTo: 'Transaksi Retail POS & Vendor PO Procurement' },
  { id: 'fp-02', ruleCode: 'TAX-PPH-23', ruleName: 'PPh Pasal 23 Jasa Manajemen (2%)', taxRatePct: '2%', glAccountCode: '2-10400', appliesTo: 'Sewa Alat Berat & Layanan Jasa Rekanan' },
  { id: 'fp-03', ruleCode: 'TAX-PB1-10', ruleName: 'Pajak Daerah Resto & Hotel PB1 (10%)', taxRatePct: '10%', glAccountCode: '2-10301', appliesTo: 'Penjualan F&B Resto & Kamar Hotel PMS' }
];

export const AturanPajakParamView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rules, setRules] = useState<TaxRuleParam[]>(INITIAL_TAX_RULES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    ruleCode: '',
    ruleName: '',
    taxRatePct: '12%',
    glAccountCode: '2-10300',
    appliesTo: ''
  });

  const coaOptions: SearchSelectOption[] = COA_DATA.map((c) => ({
    id: c.code,
    label: `[ ${c.code} ] ${c.name}`,
    subLabel: c.categoryName,
    badge: c.type
  }));

  const filteredRules = rules.filter(
    (r) =>
      r.ruleCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ruleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.glAccountCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ ruleCode: '', ruleName: '', taxRatePct: '12%', glAccountCode: '2-10300', appliesTo: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TaxRuleParam) => {
    setEditingId(item.id);
    setForm({
      ruleCode: item.ruleCode,
      ruleName: item.ruleName,
      taxRatePct: item.taxRatePct,
      glAccountCode: item.glAccountCode,
      appliesTo: item.appliesTo
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus aturan pajak ini?')) {
      setRules(rules.filter((r) => r.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ruleCode || !form.ruleName) {
      alert('Kode dan Nama Aturan Pajak wajib diisi!');
      return;
    }

    if (editingId) {
      setRules(
        rules.map((r) =>
          r.id === editingId ? { ...r, ...form } : r
        )
      );
    } else {
      const created: TaxRuleParam = {
        id: `tax-${Date.now()}`,
        ...form
      };
      setRules([created, ...rules]);
    }

    setIsModalOpen(false);
  };

  const [selectedDetailRule, setSelectedDetailRule] = useState<TaxRuleParam | null>(null);

  const columns: ColumnDef<TaxRuleParam>[] = [
    { key: 'ruleCode', header: 'Kode Aturan Pajak', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.ruleCode },
    { key: 'ruleName', header: 'Nama Aturan Pajak', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.ruleName },
    { key: 'taxRatePct', header: 'Tarif (%)', align: 'center', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs', render: (i) => i.taxRatePct },
    { key: 'glAccountCode', header: 'Akun COA Penampung', className: 'font-mono font-bold text-slate-700 dark:text-slate-300', render: (i) => i.glAccountCode },
    { key: 'appliesTo', header: 'Skop Pemetaan Transaksi', render: (i) => i.appliesTo },
    {
      key: 'actions',
      header: 'Kelola Aksi',
      align: 'center',
      render: (i) => (
        <div className="flex justify-center items-center gap-1.5">
          <button
            onClick={() => setSelectedDetailRule(i)}
            className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
            title="Lihat Detail Aturan Pajak"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => handleOpenEdit(i)} className="p-1.5 text-sky-600 hover:bg-sky-500/10 rounded-lg cursor-pointer" title="Edit Aturan">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => handleDelete(i.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer" title="Hapus Aturan">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Manage Aturan Pajak & GL Rules Master"
        icon={Sliders}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary Tax Rules Management"
        glossaryItems={[
          { term: 'Tarif Pajak (%)', description: 'Persentase pengenaan potongan pajak PPN 12%, PPh 21, PPh 23 2%, PB1 10%.' },
          { term: 'COA Penampung', description: 'Kode akun General Ledger penampung utang/piutang pajak otomatis.' }
        ]}
        badges={[
          { label: `${rules.length} Aturan Pajak Active`, variant: 'amber' },
          { label: 'Role Restrict: Admin & Finance Only', variant: 'slate' }
        ]}
        actions={
          <button onClick={handleOpenAdd} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Tambah Aturan Pajak Baru</span>
          </button>
        }
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari kode atau nama aturan pajak..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Daftar Aturan Pajak & Auto-Post COA (${filteredRules.length})`}
        columns={columns}
        data={filteredRules}
        keyExtractor={(i) => i.id}
      />

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedDetailRule !== null}
        onClose={() => setSelectedDetailRule(null)}
        title="Detail Master Aturan Pajak & Map COA"
        subtitle={selectedDetailRule?.ruleCode}
        badgeLabel="ACTIVE RULE"
        badgeType="ACTIVE"
        summaryCards={[
          { label: 'Tarif Pajak (%)', value: selectedDetailRule?.taxRatePct || '0%', color: 'text-emerald-600' },
          { label: 'Akun COA Penampung', value: selectedDetailRule?.glAccountCode || '-' },
          { label: 'Status Master', value: 'Active Master' }
        ]}
        metadata={[
          { label: 'Kode Aturan Pajak', value: selectedDetailRule?.ruleCode, mono: true, highlight: true },
          { label: 'Nama Aturan Pajak', value: selectedDetailRule?.ruleName },
          { label: 'Tarif Potongan', value: selectedDetailRule?.taxRatePct, mono: true },
          { label: 'Kode COA GL Penampung', value: selectedDetailRule?.glAccountCode, mono: true },
          { label: 'Skop Transaksi Terkena', value: selectedDetailRule?.appliesTo }
        ]}
        footerNotes="Aturan pajak ini digunakan otomatis saat pembuatan Invoice, Cash Voucher, dan PO."
      />

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingId ? 'Edit Aturan Pajak' : 'Tambah Aturan Pajak Baru'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Kode Aturan Pajak</label>
                  <input type="text" value={form.ruleCode} onChange={(e) => setForm({ ...form, ruleCode: e.target.value })} placeholder="Contoh: TAX-PPN-12" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-sky-600 text-xs" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Tarif Pajak (%)</label>
                  <input type="text" value={form.taxRatePct} onChange={(e) => setForm({ ...form, taxRatePct: e.target.value })} placeholder="12%" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-emerald-600 text-xs" required />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nama Aturan Pajak</label>
                <input type="text" value={form.ruleName} onChange={(e) => setForm({ ...form, ruleName: e.target.value })} placeholder="Contoh: PPN Masukan/Keluaran Standard (12%)" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-bold" required />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-sky-600 dark:text-sky-400 mb-1">Pilih COA Penampung Pajak:</label>
                <SearchableSelect
                  options={coaOptions}
                  value={form.glAccountCode}
                  onChange={(val) => setForm({ ...form, glAccountCode: val })}
                  placeholder="Pilih Akun COA..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Skop Pemetaan Transaksi</label>
                <textarea value={form.appliesTo} onChange={(e) => setForm({ ...form, appliesTo: e.target.value })} rows={2} placeholder="Penjelasan modul mana saja yang terkena pemotongan pajak ini..." className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white" required />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingId ? 'Simpan Perubahan' : 'Buat Aturan Pajak'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
