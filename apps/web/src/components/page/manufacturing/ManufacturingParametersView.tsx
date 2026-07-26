'use client';

import React, { useState } from 'react';
import { Sliders, Plus, Edit, Trash2, Tag, Layers, CheckCircle2 } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

interface ManufacturingCategoryItem {
  id: string;
  code: string;
  name: string;
  type: 'BOM_RECIPE' | 'WORKSTATION' | 'SCRAP_AFVAL';
  itemCount: number;
  description: string;
}

interface ManufacturingParameterItem {
  id: string;
  category: string;
  paramKey: string;
  paramValue: string;
  description: string;
}

const MOCK_MANUFACTURING_CATEGORIES: ManufacturingCategoryItem[] = [
  {
    id: 'mfg-cat-01',
    code: 'BOM-FOOD',
    name: 'Resep BOM Makanan & Bahan Baku Dapur',
    type: 'BOM_RECIPE',
    itemCount: 42,
    description: 'Kategori resep bill of materials untuk pengolahan makanan resto & catering.'
  },
  {
    id: 'mfg-cat-02',
    code: 'BOM-PACKAGING',
    name: 'Material Kemasan & Karton Distribusi',
    type: 'BOM_RECIPE',
    itemCount: 18,
    description: 'Kategori komponen pembungkus, kardus, dan kemasan retail.'
  },
  {
    id: 'mfg-cat-03',
    code: 'WS-MIXER',
    name: 'Workstation Stasiun Pengadukan & Mixing',
    type: 'WORKSTATION',
    itemCount: 6,
    description: 'Stasiun kerja lini mesin adonan dan pemrosesan utama.'
  },
  {
    id: 'mfg-cat-04',
    code: 'SCRAP-CUT',
    name: 'Residu Potongan & Afval Terbuang',
    type: 'SCRAP_AFVAL',
    itemCount: 5,
    description: 'Klasifikasi toleransi pemotongan bahan baku terbuang.'
  }
];

const MOCK_MANUFACTURING_PARAMS: ManufacturingParameterItem[] = [
  {
    id: 'mfg-param-01',
    category: 'Wastage / Afval Tolerance',
    paramKey: 'PRODUCTION_LINE_MAX_SCRAP_PCT',
    paramValue: '2.50 %',
    description: 'Toleransi batas maksimal persentase bahan terbuang (afval) pada proses olah resep BOM.'
  },
  {
    id: 'mfg-param-02',
    category: 'Machine Efficiency Benchmarks',
    paramKey: 'OEE_MINIMUM_TARGET_PERCENTAGE',
    paramValue: '85.00 % (World Class Standard)',
    description: 'Target Overall Equipment Effectiveness (OEE) lini pabrik manufaktur.'
  }
];

export const ManufacturingParametersView = () => {
  const [activeTab, setActiveTab] = useState<'CATEGORIES' | 'PARAMETERS'>('CATEGORIES');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<ManufacturingCategoryItem[]>(MOCK_MANUFACTURING_CATEGORIES);
  const [params, setParams] = useState<ManufacturingParameterItem[]>(MOCK_MANUFACTURING_PARAMS);

  // New Category Modal State
  const [isAddCatOpen, setIsAddCatOpen] = useState(false);
  const [newCat, setNewCat] = useState({
    code: '',
    name: '',
    type: 'BOM_RECIPE' as const,
    description: ''
  });

  const subTabs: SubTabItem[] = [
    { id: 'CATEGORIES', label: 'Master Kategori Produksi & BOM', icon: Tag },
    { id: 'PARAMETERS', label: 'Aturan & Parameter Benchmark', icon: Sliders }
  ];

  const filteredCategories = categories.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredParams = params.filter(
    (p) =>
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.paramKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.code || !newCat.name) return;
    const catItem: ManufacturingCategoryItem = {
      id: `mfg-cat-0${categories.length + 1}`,
      code: newCat.code,
      name: newCat.name,
      type: newCat.type,
      itemCount: 0,
      description: newCat.description || 'Kategori manufaktur baru'
    };
    setCategories([catItem, ...categories]);
    setIsAddCatOpen(false);
    setNewCat({ code: '', name: '', type: 'BOM_RECIPE', description: '' });
    alert(`Master Kategori Manufaktur [${catItem.code} - ${catItem.name}] berhasil dibuat!`);
  };

  const categoryColumns: ColumnDef<ManufacturingCategoryItem>[] = [
    { key: 'code', header: 'Kode Kategori', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.code },
    { key: 'name', header: 'Nama Kategori Produksi / BOM', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.name },
    {
      key: 'type',
      header: 'Tipe Klasifikasi',
      render: (i) => (
        <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 font-bold font-mono text-[10px] rounded">
          {i.type}
        </span>
      )
    },
    { key: 'itemCount', header: 'Jumlah Item/BOM', align: 'center', className: 'font-mono font-bold text-emerald-600', render: (i) => i.itemCount },
    { key: 'description', header: 'Keterangan', className: 'text-slate-500', render: (i) => i.description },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      render: (i) => (
        <button
          onClick={() => setCategories(categories.filter((c) => c.id !== i.id))}
          className="p-1 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer"
          title="Hapus Kategori"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )
    }
  ];

  const paramColumns: ColumnDef<ManufacturingParameterItem>[] = [
    { key: 'category', header: 'Kategori Parameter', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.category },
    { key: 'paramKey', header: 'Kode Parameter System', className: 'font-mono text-sky-600 dark:text-sky-400 font-semibold', render: (i) => i.paramKey },
    { key: 'paramValue', header: 'Nilai Acuan Benchmark', className: 'font-bold font-mono text-emerald-600 dark:text-emerald-400', render: (i) => i.paramValue },
    { key: 'description', header: 'Keterangan Pabrik', className: 'text-slate-600 dark:text-slate-300', render: (i) => i.description },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      render: (i) => (
        <button
          onClick={() => setParams(params.filter((p) => p.id !== i.id))}
          className="p-1 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer"
          title="Hapus Parameter"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Aturan & Parameter Manufaktur"
        icon={Sliders}
        iconBgColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        glossaryTitle="Glossary Parameter Manufaktur & Master Kategori"
        glossaryItems={[
          { term: 'Master Kategori BOM', description: 'Pengelompokan resep bill of materials yang digunakan untuk filter pencarian seluruh tabel operasional.' },
          { term: 'Wastage Afval %', description: 'Toleransi batas maksimal persentase bahan terbuang saat produksi.' }
        ]}
        badges={[
          { label: `${categories.length} Kategori BOM`, variant: 'slate' },
          { label: `${params.length} Parameter System`, variant: 'emerald' }
        ]}
        actions={
          <button
            onClick={() => setIsAddCatOpen(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kategori Baru</span>
          </button>
        }
      />

      {/* SubTabNav Component */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={subTabs}
        colorScheme="indigo"
      />

      {/* Universal SearchBar Toolbar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={activeTab === 'CATEGORIES' ? 'Cari kode kategori, nama BOM, keterangan...' : 'Cari kode parameter, nilai benchmark...'}
          />
        </div>
      </div>

      {/* Dynamic Content Table Rendering */}
      {activeTab === 'CATEGORIES' ? (
        <DataTable
          headerTitle={`Master Kelola Kategori Manufaktur & Resep BOM (${filteredCategories.length})`}
          columns={categoryColumns}
          data={filteredCategories}
          keyExtractor={(i) => i.id}
        />
      ) : (
        <DataTable
          headerTitle={`Aturan & Parameter Toleransi Pabrik (${filteredParams.length})`}
          columns={paramColumns}
          data={filteredParams}
          keyExtractor={(i) => i.id}
        />
      )}

      {/* Create New Category Modal */}
      {isAddCatOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-indigo-500" />
                <span>Buat Master Kategori Manufaktur</span>
              </h3>
              <button onClick={() => setIsAddCatOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Kode Kategori</label>
                <input
                  type="text"
                  required
                  value={newCat.code}
                  onChange={(e) => setNewCat({ ...newCat, code: e.target.value })}
                  placeholder="e.g. BOM-BEVERAGE"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono font-bold text-indigo-600 dark:text-indigo-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Nama Kategori Produksi</label>
                <input
                  type="text"
                  required
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  placeholder="e.g. Sirup & Bahan Minuman Resto"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Tipe Klasifikasi</label>
                <select
                  value={newCat.type}
                  onChange={(e) => setNewCat({ ...newCat, type: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                >
                  <option value="BOM_RECIPE">BOM_RECIPE (Resep Formulasi Bahan)</option>
                  <option value="WORKSTATION">WORKSTATION (Lini Mesin / Stasiun Kerja)</option>
                  <option value="SCRAP_AFVAL">SCRAP_AFVAL (Kategori Residu Afval)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Keterangan Tambahan</label>
                <input
                  type="text"
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  placeholder="Deskripsi singkat kategori..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setIsAddCatOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-xl flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan Kategori</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
