'use client';

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { MenuCategoryItem, PosMenuItem } from '@/lib/mock/pos';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface Props {
  menuItems: PosMenuItem[];
  menuCategories: MenuCategoryItem[];
  deleteMenuItem: (id: string) => void;
}

export const MenuCatalogTab: React.FC<Props> = ({ menuItems, menuCategories, deleteMenuItem }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredMenu = menuItems.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || item.category.includes(selectedCategory);
    return matchesSearch && matchesCat;
  });

  const columns: ColumnDef<PosMenuItem>[] = [
    { key: 'code', header: 'Kode Menu', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.code },
    { key: 'name', header: 'Nama Hidangan F&B', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.name },
    { key: 'category', header: 'Kategori Master', className: 'text-slate-500', render: (i) => i.category },
    { key: 'price', header: 'Harga Jual', align: 'right', className: 'font-bold text-slate-900 dark:text-white font-mono', render: (i) => `Rp ${i.price.toLocaleString('id-ID')}` },
    { key: 'cogsHpp', header: 'HPP Cost', align: 'right', className: 'font-mono font-semibold text-amber-600 dark:text-amber-400', render: (i) => `Rp ${i.cogsHpp.toLocaleString('id-ID')}` },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: () => (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
          Tersedia
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      sortable: false,
      render: (i) => (
        <button
          onClick={() => deleteMenuItem(i.id)}
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all cursor-pointer"
          title="Hapus Menu"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {/* Universal Search & Dynamic Category Filter */}
      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari kode menu, nama hidangan..."
        categoryValue={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryOptions={menuCategories.map((c) => ({ value: c.name, label: c.name }))}
        categoryPlaceholder="Semua Kategori"
      />

      <DataTable
        headerTitle={`Daftar Katalog Menu F&B (${filteredMenu.length} Menu)`}
        columns={columns}
        data={filteredMenu}
        keyExtractor={(i) => i.id}
      />
    </div>
  );
};
