'use client';

import React, { useState } from 'react';
import { Trash2, FileSpreadsheet, Eye } from 'lucide-react';
import { CoaCategory, CoaItem } from '@/lib/mock/finance';
import { DynamicSearchFilter, FilterOption } from '@/components/ui/forms/DynamicSearchFilter';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { FinanceItemDetailModal } from '@/components/ui/modals/FinanceItemDetailModal';

interface Props {
  coaList: CoaItem[];
  coaCategories: CoaCategory[];
  deleteCoaItem: (id: string) => void;
}

export const CoaCatalogTab: React.FC<Props> = ({ coaList, coaCategories, deleteCoaItem }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedCoa, setSelectedCoa] = useState<CoaItem | null>(null);

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
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => setSelectedCoa(i)}
            className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg cursor-pointer transition-colors"
            title="Lihat Detail Akun COA"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => deleteCoaItem(i.id)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer" title="Hapus Akun">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
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

      {/* Item Detail Modal */}
      <FinanceItemDetailModal
        isOpen={selectedCoa !== null}
        onClose={() => setSelectedCoa(null)}
        title="Detail Akun Buku Besar (Chart of Accounts)"
        subtitle={selectedCoa ? `${selectedCoa.code} • ${selectedCoa.name}` : ''}
        badgeLabel={selectedCoa?.type}
        badgeType="ACTIVE"
        summaryCards={[
          { label: 'Saldo Berjalan', value: selectedCoa ? `Rp ${selectedCoa.balance.toLocaleString('id-ID')}` : '0', color: 'text-emerald-600' },
          { label: 'Kelompok Akun', value: selectedCoa?.categoryName || '-' },
          { label: 'Tipe Akun', value: selectedCoa?.type || '-' }
        ]}
        metadata={[
          { label: 'Kode COA Akun', value: selectedCoa?.code, mono: true, highlight: true },
          { label: 'Nama Lengkap Akun', value: selectedCoa?.name },
          { label: 'Tipe Akun Utama', value: selectedCoa?.type },
          { label: 'Kategori Kelompok', value: selectedCoa?.categoryName },
          { label: 'Status Penggunaan', value: 'Aktif Digunakan dalam Ledger' }
        ]}
        footerNotes="Kode COA mengikuti bagan standar akuntansi PSAK Indonesia & struktur HO ERP."
      />
    </div>
  );
};

