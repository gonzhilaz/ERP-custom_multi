'use client';

import React, { useState } from 'react';
import { Trash2, FileSpreadsheet } from 'lucide-react';
import { CoaCategory, CoaItem } from '@/lib/mock/finance';
import { DynamicSearchFilter, FilterOption } from '@/components/ui/forms/DynamicSearchFilter';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface Props {
  coaList: CoaItem[];
  coaCategories: CoaCategory[];
  deleteCoaItem: (id: string) => void;
}

export const CoaCatalogTab: React.FC<Props> = ({ coaList, coaCategories, deleteCoaItem }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredCoa = coaList.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'ALL' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const categoryOptions: FilterOption[] = [
    { label: 'Aktiva / Asset', value: 'ASSET' },
    { label: 'Kewajiban / Liability', value: 'LIABILITY' },
    { label: 'Ekuitas / Equity', value: 'EQUITY' },
    { label: 'Pendapatan / Revenue', value: 'REVENUE' },
    { label: 'Beban / Expense', value: 'EXPENSE' }
  ];

  const columns: ColumnDef<CoaItem>[] = [
    { key: 'code', header: 'Kode COA', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => i.code },
    { key: 'name', header: 'Nama Akun Buku Besar', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.name },
    { key: 'categoryName', header: 'Kelompok Akun', className: 'text-slate-500', render: (i) => i.categoryName },
    {
      key: 'type',
      header: 'Tipe',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
          i.type === 'ASSET' ? 'bg-emerald-500/10 text-emerald-600' :
          i.type === 'LIABILITY' ? 'bg-amber-500/10 text-amber-600' :
          i.type === 'EQUITY' ? 'bg-purple-500/10 text-purple-600' :
          i.type === 'REVENUE' ? 'bg-sky-500/10 text-sky-600' : 'bg-rose-500/10 text-rose-600'
        }`}>
          {i.type}
        </span>
      )
    },
    { key: 'balance', header: 'Saldo Saat Ini', align: 'right', className: 'font-mono font-bold text-slate-900 dark:text-white', render: (i) => `Rp ${i.balance.toLocaleString('id-ID')}` },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      render: (i) => (
        <button onClick={() => deleteCoaItem(i.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer" title="Hapus Akun">
          <Trash2 className="w-4 h-4" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari kode akun, nama COA, kelompok..."
        categoryValue={selectedType}
        onCategoryChange={setSelectedType}
        categoryOptions={categoryOptions}
        categoryPlaceholder="Semua Tipe Akun"
        colorScheme="emerald"
      />

      <DataTable
        headerTitle={`Katalog Bagan Akun Terdaftar (${filteredCoa.length})`}
        columns={columns}
        data={filteredCoa}
        keyExtractor={(i) => i.id}
      />
    </div>
  );
};
