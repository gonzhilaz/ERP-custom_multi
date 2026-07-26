'use client';

import React, { useState } from 'react';
import { PieChart, TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

interface VarianceRow {
  budgetCode: string;
  departmentName: string;
  category: string;
  annualBudget: number;
  actualSpent: number;
  varianceAmount: number; // annualBudget - actualSpent
  variancePercentage: string;
  status: 'UNDER_BUDGET' | 'NEAR_LIMIT' | 'OVER_BUDGET';
}

export const ManagerialBudgetVarianceView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<VarianceRow[]>([
    { budgetCode: 'BDG-2026-IT', departmentName: 'Divisi Teknologi Informasi', category: 'Biaya Lisensi Cloud & ERP System', annualBudget: 600000000, actualSpent: 350000000, varianceAmount: 250000000, variancePercentage: '58.3% Spent', status: 'UNDER_BUDGET' },
    { budgetCode: 'BDG-2026-HR', departmentName: 'Divisi HRD & Payroll', category: 'Biaya Pelatihan & Sertifikasi K3', annualBudget: 250000000, actualSpent: 240000000, varianceAmount: 10000000, variancePercentage: '96.0% Spent', status: 'NEAR_LIMIT' },
    { budgetCode: 'BDG-2026-OPS', departmentName: 'Operasional Site Tambang', category: 'Biaya BBM Solar Heavy Equipment', annualBudget: 4500000000, actualSpent: 4850000000, varianceAmount: -350000000, variancePercentage: '107.7% Spent', status: 'OVER_BUDGET' }
  ]);

  const filtered = items.filter(
    (i) =>
      i.budgetCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<VarianceRow>[] = [
    { key: 'budgetCode', header: 'Kode Anggaran', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.budgetCode },
    { key: 'departmentName', header: 'Departemen / Divisi', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.departmentName },
    { key: 'category', header: 'Pos Kategori Belanja (COA)', render: (i) => i.category },
    { key: 'annualBudget', header: 'Anggaran Tahunan (Rp)', align: 'right', className: 'font-mono font-bold text-slate-700 dark:text-slate-300', render: (i) => `Rp ${i.annualBudget.toLocaleString('id-ID')}` },
    { key: 'actualSpent', header: 'Realisasi Belanja (Rp)', align: 'right', className: 'font-mono font-bold text-sky-600', render: (i) => `Rp ${i.actualSpent.toLocaleString('id-ID')}` },
    {
      key: 'varianceAmount',
      header: 'Sisa Varians (Rp)',
      align: 'right',
      render: (i) => (
        <span className={`font-mono font-bold text-xs ${i.varianceAmount >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {i.varianceAmount >= 0 ? `+Rp ${i.varianceAmount.toLocaleString('id-ID')}` : `-Rp ${Math.abs(i.varianceAmount).toLocaleString('id-ID')}`}
        </span>
      )
    },
    { key: 'variancePercentage', header: '% Serapan Budget', align: 'center', className: 'font-mono font-bold text-amber-600', render: (i) => i.variancePercentage },
    {
      key: 'status',
      header: 'Status Anggaran',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.status === 'UNDER_BUDGET' ? 'bg-emerald-500/10 text-emerald-600' : i.status === 'NEAR_LIMIT' ? 'bg-amber-500/10 text-amber-600' : 'bg-rose-500/10 text-rose-600'
        }`}>
          {i.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Budget vs Actual Variance Analysis BI Report"
        icon={PieChart}
        iconBgColor="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
        glossaryTitle="Glossary Budget Variance BI"
        glossaryItems={[
          { term: 'Budget Variance', description: 'Analisis selisih antara anggaran plafon tahunan yang disetujui vs pengeluaran kas riil.' },
          { term: 'Over Budget Alert', description: 'Peringatan dini ketika serapan anggaran divisi melebihi 100% plafon.' }
        ]}
        badges={[
          { label: `${items.length} Budget Lines Monitored`, variant: 'purple' },
          { label: 'Executive BI Analytics', variant: 'sky' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari kode anggaran, departemen, atau pos..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Analisis Varians Anggaran vs Realisasi Kas (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.budgetCode}
      />
    </div>
  );
};
