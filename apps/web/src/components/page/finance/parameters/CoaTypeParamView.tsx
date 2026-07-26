'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, CheckCircle2, Edit3 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';
import { SearchableSelect, SearchSelectOption } from '@/components/ui/dropdowns/SearchableSelect';
import { COA_CATEGORIES, CoaCategory } from '@/lib/mock/finance';

export const CoaTypeParamView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<CoaCategory[]>(COA_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    code: '',
    name: '',
    type: 'ASSET' as 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE',
    description: ''
  });

  const typeOptions: SearchSelectOption[] = [
    { id: 'ASSET', label: 'Aset / Aktiva (Asset)', badge: 'Asset' },
    { id: 'LIABILITY', label: 'Kewajiban / Utang (Liability)', badge: 'Liability' },
    { id: 'EQUITY', label: 'Ekuitas / Modal (Equity)', badge: 'Equity' },
    { id: 'REVENUE', label: 'Pendapatan (Revenue)', badge: 'Revenue' },
    { id: 'EXPENSE', label: 'Beban Operasional & HPP (Expense)', badge: 'Expense' }
  ];

  const filteredCategories = categories.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm({ code: '', name: '', type: 'ASSET', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CoaCategory) => {
    setEditingId(item.id);
    setForm({
      code: item.code,
      name: item.name,
      type: item.type,
      description: item.description
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus/mengarsipkan kategori tipe COA ini?')) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.name) {
      alert('Kode dan Nama Tipe COA wajib diisi!');
      return;
    }

    if (editingId) {
      setCategories(
        categories.map((c) =>
          c.id === editingId
            ? { ...c, code: form.code, name: form.name, type: form.type, description: form.description }
            : c
        )
      );
    } else {
      const created: CoaCategory = {
        id: `cat-${Date.now()}`,
        code: form.code,
        name: form.name,
        type: form.type,
        accountCount: 0,
        description: form.description || 'Tipe Kategori COA Baru'
      };
      setCategories([created, ...categories]);
    }

    setIsModalOpen(false);
  };

  const columns: ColumnDef<CoaCategory>[] = [
    { key: 'code', header: 'Kode Tipe COA', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.code },
    { key: 'name', header: 'Nama Tipe Kategori', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.name },
    {
      key: 'type',
      header: 'Klasifikasi Utama',
      render: (i) => (
        <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold font-mono text-[10px] rounded-lg border border-slate-200 dark:border-slate-700">
          {i.type}
        </span>
      )
    },
    { key: 'accountCount', header: 'Jumlah Akun COA', align: 'center', className: 'font-mono font-bold text-slate-600', render: (i) => i.accountCount || 0 },
    { key: 'description', header: 'Deskripsi Keterangan Akuntansi', render: (i) => i.description },
    {
      key: 'actions',
      header: 'Kelola Aksi',
      align: 'center',
      render: (i) => (
        <div className="flex justify-center items-center gap-1.5">
          <button onClick={() => handleOpenEdit(i)} className="p-1.5 text-sky-600 hover:bg-sky-500/10 rounded-lg cursor-pointer">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => handleDelete(i.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Manage COA Type & Category Master"
        icon={Tag}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary COA Type Management"
        glossaryItems={[
          { term: 'COA Type / Category', description: 'Pengelompokan struktur hierarki bagan akun (Asset, Liability, Equity, Revenue, Expense).' },
          { term: 'Klasifikasi Utama', description: 'Tipe saldo normal akun (Debet / Kredit) dalam penyusunan Laporan Keuangan.' }
        ]}
        badges={[
          { label: `${categories.length} Tipe Registered`, variant: 'sky' },
          { label: 'Role Restrict: Admin & Finance Only', variant: 'slate' }
        ]}
        actions={
          <button onClick={handleOpenAdd} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Tambah Tipe COA Baru</span>
          </button>
        }
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari kode atau nama tipe COA..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Daftar Pengaturan Tipe Kategori COA (${filteredCategories.length})`}
        columns={columns}
        data={filteredCategories}
        keyExtractor={(i) => i.id}
      />

      {/* Modal Add/Edit COA Type */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingId ? 'Edit Tipe Kategori COA' : 'Tambah Tipe Kategori COA Baru'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Kode Tipe COA</label>
                  <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="Contoh: CAT-ASSET-01" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-sky-600 text-xs" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nama Tipe Kategori</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Kas & Bank Lancar" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-bold" required />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-sky-600 dark:text-sky-400 mb-1">Klasifikasi Utama Saldo Normal:</label>
                <SearchableSelect
                  options={typeOptions}
                  value={form.type}
                  onChange={(val) => setForm({ ...form, type: val as any })}
                  placeholder="Pilih Klasifikasi..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Keterangan / Deskripsi Kategori</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Penjelasan skop penggunaan tipe COA dalam laporan keuangan..." className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white" />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs cursor-pointer">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingId ? 'Simpan Perubahan' : 'Buat Tipe COA'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
