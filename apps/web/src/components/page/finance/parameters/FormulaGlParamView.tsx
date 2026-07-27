'use client';

import React, { useState } from 'react';
import { Cpu, Plus, Trash2, CheckCircle2, Edit3, Eye } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { SearchableSelect, SearchSelectOption } from '@/components/ui/dropdowns/SearchableSelect';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';
import { COA_DATA } from '@/lib/mock/finance';

interface FormulaGlParam {
  id: string;
  formulaCode: string;
  moduleSource: string;
  triggerEvent: string;
  debitCoaCode: string;
  creditCoaCode: string;
  autoPostStatus: 'AUTOMATIC' | 'APPROVAL_REQUIRED';
}

const INITIAL_FORMULAS: FormulaGlParam[] = [
  { id: 'f-01', formulaCode: 'FML-POS-RETAIL', moduleSource: 'Resto & Retail POS', triggerEvent: 'Checkout Penjualan Kasir', debitCoaCode: '1-10100 (Kas Outlet)', creditCoaCode: '4-10100 (Pendapatan Retail)', autoPostStatus: 'AUTOMATIC' },
  { id: 'f-02', formulaCode: 'FML-HRD-PAYROLL', moduleSource: 'HRD & Payroll Engine', triggerEvent: 'Disbursement Gaji Bulanan', debitCoaCode: '5-20100 (Beban Gaji)', creditCoaCode: '1-10101 (Kas Bank HO)', autoPostStatus: 'APPROVAL_REQUIRED' },
  { id: 'f-03', formulaCode: 'FML-HOTEL-FOLIO', moduleSource: 'Hotel PMS System', triggerEvent: 'Guest Checkout Room Charge', debitCoaCode: '1-10400 (Piutang Customer)', creditCoaCode: '4-10200 (Pendapatan Kamar)', autoPostStatus: 'AUTOMATIC' },
  { id: 'f-04', formulaCode: 'FML-ASSET-DEP', moduleSource: 'Inventory Asset Engine', triggerEvent: 'Auto-Depresiasi Akhir Bulan PMK 72', debitCoaCode: '5-30100 (Beban Penyusutan)', creditCoaCode: '1-30900 (Akumulasi Depresiasi)', autoPostStatus: 'AUTOMATIC' }
];

export const FormulaGlParamView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [formulas, setFormulas] = useState<FormulaGlParam[]>(INITIAL_FORMULAS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedDetailFormula, setSelectedDetailFormula] = useState<FormulaGlParam | null>(null);

  const [form, setForm] = useState({
    formulaCode: '',
    moduleSource: 'Resto & Retail POS',
    triggerEvent: '',
    debitCoaCode: '1-10100',
    creditCoaCode: '4-10100',
    autoPostStatus: 'AUTOMATIC' as 'AUTOMATIC' | 'APPROVAL_REQUIRED'
  });

  const coaOptions: SearchSelectOption[] = COA_DATA.map((c) => ({
    id: c.code,
    label: `[ ${c.code} ] ${c.name}`,
    subLabel: c.categoryName,
    badge: c.type
  }));

  const filteredFormulas = formulas.filter(
    (f) =>
      f.formulaCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.moduleSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.triggerEvent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ formulaCode: '', moduleSource: 'Resto & Retail POS', triggerEvent: '', debitCoaCode: '1-10100', creditCoaCode: '4-10100', autoPostStatus: 'AUTOMATIC' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: FormulaGlParam) => {
    setEditingId(item.id);
    setForm({
      formulaCode: item.formulaCode,
      moduleSource: item.moduleSource,
      triggerEvent: item.triggerEvent,
      debitCoaCode: item.debitCoaCode,
      creditCoaCode: item.creditCoaCode,
      autoPostStatus: item.autoPostStatus
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus formula posting GL ini?')) {
      setFormulas(formulas.filter((f) => f.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.formulaCode || !form.triggerEvent) {
      alert('Kode Formula dan Trigger Event wajib diisi!');
      return;
    }

    if (editingId) {
      setFormulas(
        formulas.map((f) =>
          f.id === editingId ? { ...f, ...form } : f
        )
      );
    } else {
      const created: FormulaGlParam = {
        id: `fml-${Date.now()}`,
        ...form
      };
      setFormulas([created, ...formulas]);
    }

    setIsModalOpen(false);
  };

  const columns: ColumnDef<FormulaGlParam>[] = [
    { key: 'formulaCode', header: 'Kode Formula GL', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.formulaCode },
    { key: 'moduleSource', header: 'Modul Sumber Transaksi', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.moduleSource },
    { key: 'triggerEvent', header: 'Event Pemicu Auto-Post', render: (i) => i.triggerEvent },
    { key: 'debitCoaCode', header: 'Akun COA Debet', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => i.debitCoaCode },
    { key: 'creditCoaCode', header: 'Akun COA Kredit', className: 'font-mono font-bold text-rose-600 dark:text-rose-400', render: (i) => i.creditCoaCode },
    {
      key: 'autoPostStatus',
      header: 'Mode Posting GL',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.autoPostStatus === 'AUTOMATIC' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
        }`}>
          {i.autoPostStatus === 'AUTOMATIC' ? 'AUTO-POST' : 'NEEDS APPROVAL'}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Kelola Aksi',
      align: 'center',
      render: (i) => (
        <div className="flex justify-center items-center gap-1.5">
          <button
            onClick={() => setSelectedDetailFormula(i)}
            className="p-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-lg cursor-pointer transition-colors"
            title="Lihat Detail Formula GL"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => handleOpenEdit(i)} className="p-1.5 text-sky-600 hover:bg-sky-500/10 rounded-lg cursor-pointer" title="Edit Formula">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => handleDelete(i.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer" title="Hapus Formula">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Manage Auto-Post GL Formulas Master"
        icon={Cpu}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary GL Formula Management"
        glossaryItems={[
          { term: 'GL Formula Engine', description: 'Aturan otomatisasi yang mengonversi event bisnis operasional menjadi voucher jurnal seimbang.' },
          { term: 'Trigger Event', description: 'Kondisi transaksi bisnis (misal: Kasir POS Checkout) yang memicu penerbitan jurnal otomatis.' }
        ]}
        badges={[
          { label: `${formulas.length} Formula Registered`, variant: 'emerald' },
          { label: 'Role Restrict: Admin & Finance Only', variant: 'slate' }
        ]}
        actions={
          <button onClick={handleOpenAdd} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Tambah Formula GL Baru</span>
          </button>
        }
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari kode formula atau modul..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Daftar Formula Otomatisasi Jurnal Buku Besar (${filteredFormulas.length})`}
        columns={columns}
        data={filteredFormulas}
        keyExtractor={(i) => i.id}
      />

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedDetailFormula !== null}
        onClose={() => setSelectedDetailFormula(null)}
        title="Detail Formula Otomatisasi Posting GL"
        subtitle={selectedDetailFormula?.formulaCode}
        badgeLabel={selectedDetailFormula?.autoPostStatus}
        badgeType={selectedDetailFormula?.autoPostStatus === 'AUTOMATIC' ? 'ACTIVE' : 'ALERT'}
        summaryCards={[
          { label: 'Mode Auto-Post', value: selectedDetailFormula?.autoPostStatus === 'AUTOMATIC' ? 'AUTO-POST' : 'APPROVAL REQUIRED', color: selectedDetailFormula?.autoPostStatus === 'AUTOMATIC' ? 'text-emerald-600' : 'text-amber-600' },
          { label: 'Modul Sumber', value: selectedDetailFormula?.moduleSource || '-' },
          { label: 'Status Formula', value: 'Active Engine Formula' }
        ]}
        metadata={[
          { label: 'Kode Formula GL', value: selectedDetailFormula?.formulaCode, mono: true, highlight: true },
          { label: 'Modul Transaksi', value: selectedDetailFormula?.moduleSource },
          { label: 'Event Pemicu Posting', value: selectedDetailFormula?.triggerEvent },
          { label: 'Akun COA Debet', value: selectedDetailFormula?.debitCoaCode, mono: true },
          { label: 'Akun COA Kredit', value: selectedDetailFormula?.creditCoaCode, mono: true }
        ]}
        footerNotes="Formula ini mengeksekusi pembuatan entri jurnal otomatis ke General Ledger secara real-time."
      />

      {/* Modal Add/Edit Formula */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingId ? 'Edit Formula GL' : 'Tambah Formula GL Baru'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Kode Formula GL</label>
                  <input type="text" value={form.formulaCode} onChange={(e) => setForm({ ...form, formulaCode: e.target.value })} placeholder="Contoh: FML-POS-RETAIL" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-sky-600 text-xs" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Modul Sumber Transaksi</label>
                  <input type="text" value={form.moduleSource} onChange={(e) => setForm({ ...form, moduleSource: e.target.value })} placeholder="Contoh: POS Resto & Retail" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-bold" required />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Event Pemicu (Trigger Event)</label>
                <input type="text" value={form.triggerEvent} onChange={(e) => setForm({ ...form, triggerEvent: e.target.value })} placeholder="Contoh: Kasir Checkout Penjualan Cash" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-bold" required />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">Akun COA Debet Target:</label>
                <SearchableSelect
                  options={coaOptions}
                  value={form.debitCoaCode}
                  onChange={(val) => setForm({ ...form, debitCoaCode: val })}
                  placeholder="Pilih Akun Debet..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-rose-600 dark:text-rose-400 mb-1">Akun COA Kredit Target:</label>
                <SearchableSelect
                  options={coaOptions}
                  value={form.creditCoaCode}
                  onChange={(val) => setForm({ ...form, creditCoaCode: val })}
                  placeholder="Pilih Akun Kredit..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingId ? 'Simpan Perubahan' : 'Buat Formula GL'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
