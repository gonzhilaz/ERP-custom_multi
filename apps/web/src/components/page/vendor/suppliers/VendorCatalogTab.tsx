'use client';

import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { VendorCategory, VendorItem } from '@/lib/mock/vendor';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface Props {
  vendors: VendorItem[];
  vendorCategories: VendorCategory[];
  toggleVendorStatus: (id: string) => void;
}

export const VendorCatalogTab: React.FC<Props> = ({
  vendors,
  vendorCategories,
  toggleVendorStatus
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || v.category.includes(selectedCategory);
    return matchesSearch && matchesCat;
  });

  const columns: ColumnDef<VendorItem>[] = [
    {
      key: 'code',
      header: 'Kode & Nama Vendor',
      className: 'font-semibold',
      render: (v) => (
        <div>
          <span className="text-sky-600 dark:text-sky-400 font-mono block text-[11px] font-bold">{v.code}</span>
          <span className="font-bold text-slate-900 dark:text-white">{v.name}</span>
        </div>
      )
    },
    { key: 'category', header: 'Kategori Master', className: 'text-slate-500', render: (v) => v.category },
    {
      key: 'contactPerson',
      header: 'Kontak PIC & Telp',
      render: (v) => (
        <div>
          <span className="font-semibold block">{v.contactPerson}</span>
          <span className="text-[11px] text-slate-400 font-mono">{v.phone}</span>
        </div>
      )
    },
    { key: 'topDays', header: 'Term Pembayaran', align: 'center', className: 'font-bold text-slate-800 dark:text-slate-200', render: (v) => `TOP ${v.topDays} Hari` },
    {
      key: 'apCoaAccount',
      header: 'Linkage COA Utang AP',
      render: (v) => (
        <span className="flex items-center gap-1 font-mono text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
          <BookOpen className="w-3 h-3 text-indigo-500 shrink-0" />
          {v.apCoaAccount || '2-10100 - Utang Dagang Vendor Utama'}
        </span>
      )
    },
    { key: 'payableBalance', header: 'Utang AP Balance', align: 'right', className: 'font-mono text-emerald-600 dark:text-emerald-400 font-bold', render: (v) => `Rp ${v.payableBalance.toLocaleString('id-ID')}` },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (v) => (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
          v.status === 'ACTIVE'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
            : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30'
        }`}>
          {v.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      align: 'center',
      sortable: false,
      render: (v) => (
        <button
          onClick={() => toggleVendorStatus(v.id)}
          className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
            v.status === 'ACTIVE'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 hover:bg-amber-200'
              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-200'
          }`}
        >
          {v.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari kode vendor, nama supplier..."
        categoryValue={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryOptions={vendorCategories.map((c) => ({ value: c.name, label: c.name }))}
        categoryPlaceholder="Semua Kategori"
      />

      <DataTable
        headerTitle={`Katalog Vendor Supplier Terdaftar (${filteredVendors.length} Vendor)`}
        columns={columns}
        data={filteredVendors}
        keyExtractor={(v) => v.id}
      />
    </div>
  );
};
