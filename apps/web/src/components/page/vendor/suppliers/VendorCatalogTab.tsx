'use client';

import React, { useState } from 'react';
import { Search, Filter, Star, Truck, BookOpen } from 'lucide-react';
import { VendorCategory, VendorItem } from '@/lib/mock/vendor';

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

  return (
    <div className="space-y-4">
      {/* Search Input & Dynamic Category Filter */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kode vendor, nama supplier..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              selectedCategory === 'ALL'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Semua Kategori
          </button>
          {vendorCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat.name
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Enterprise Vendors Directory Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-sky-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Truck className="w-4 h-4 text-sky-500" />
            <span>Katalog Vendor Supplier Terdaftar ({filteredVendors.length} Vendor)</span>
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Linkage COA Akuntansi Utang AP Active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Kode & Nama Vendor</th>
                <th className="py-3.5 px-4">Kategori Master</th>
                <th className="py-3.5 px-4">Kontak PIC & Telp</th>
                <th className="py-3.5 px-4 text-center">Term Pembayaran</th>
                <th className="py-3.5 px-4">Linkage COA Utang AP</th>
                <th className="py-3.5 px-4 text-right">Utang AP Balance</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredVendors.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold">
                    <span className="text-sky-600 dark:text-sky-400 font-mono block text-[11px]">{v.code}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{v.name}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">{v.category}</td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    <span className="font-semibold block">{v.contactPerson}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{v.phone}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800 dark:text-slate-200">
                    TOP {v.topDays} Hari
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-indigo-500 shrink-0" />
                      {v.apCoaAccount || '2-10100 - Utang Dagang Vendor Utama'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-red-600 dark:text-red-400">
                    Rp {v.payableBalance.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => toggleVendorStatus(v.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all ${
                        v.status === 'ACTIVE'
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                          : 'bg-slate-200 text-slate-500 border-slate-300'
                      }`}
                    >
                      {v.status === 'ACTIVE' ? 'Aktif' : 'Non-Aktif'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="text-xs font-bold text-amber-500 inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-500/20">
                      <Star className="w-3 h-3 fill-amber-400" /> {v.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
