'use client';

import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, Target, Plus, Star, X, HelpCircle } from 'lucide-react';
import { MOCK_CRM_PARTNERS, CrmPartner } from '@/lib/mock/crm';
import { KpiCard } from '@/components/ui/cards/KpiCard';

export const CrmSalesView = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<CrmPartner | null>(null);
  const [showGlossary, setShowGlossary] = useState(false);

  const customers = MOCK_CRM_PARTNERS.filter((p) => p.type === 'CLIENT_B2B' || p.type === 'RETAIL_CUSTOMER');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <span>CRM Sales</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-emerald-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary CRM Sales"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-emerald-400">
                  <span>Glossary CRM & Sales Funnel</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Sales Pipeline Funnel</strong>: Tahapan kualifikasi prospek dari Leads, Proposal, Kontrak, hingga Deals Won.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Client B2B</strong>: Pengelolaan direktori konsumen corporate & limit piutang usaha.
                </p>
              </div>
            )}
          </div>
        </div>

        <button className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Client B2B</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Target Penjualan"
          value="Rp 6.00 M"
          subtitle="Target Q3"
          icon={Target}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50"
        />
        <KpiCard
          title="Realisasi Omset"
          value="Rp 5.46 M"
          subtitle="91% Target"
          icon={DollarSign}
          iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50"
        />
        <KpiCard
          title="Konsumen Aktif"
          value={`${customers.length} Client`}
          subtitle="Repeat Orders"
          icon={Users}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50"
        />
      </div>

      {/* Main Customers Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Daftar Konsumen B2B ({customers.length})</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Kode Client</th>
                <th className="py-3 px-4">Nama Pelanggan Corporate</th>
                <th className="py-3 px-4">Sektor Industri</th>
                <th className="py-3 px-4">Contact Person PIC</th>
                <th className="py-3 px-4 text-right">Saldo Piutang (AR)</th>
                <th className="py-3 px-4 text-center">Rating</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {customers.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedCustomer(item)}
                  className="hover:bg-emerald-50/60 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-emerald-600">{item.code}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{item.name}</td>
                  <td className="py-3 px-4 text-slate-500">{item.industry}</td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{item.contactPerson}</td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-600">
                    Rp {item.outstandingBalance.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-amber-500 flex items-center justify-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {item.rating}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-600">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 360-Degree Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-600">{selectedCustomer.code}</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mt-0.5">{selectedCustomer.name}</h3>
                <p className="text-xs text-slate-400">{selectedCustomer.industry}</p>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
                <span className="text-slate-400">Contact Person PIC:</span>
                <div className="font-bold text-slate-900 dark:text-white">{selectedCustomer.contactPerson}</div>
                <div className="text-[11px] text-slate-500">{selectedCustomer.phone} • {selectedCustomer.email}</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
                <span className="text-slate-400">Limit Kredit / Piutang (AR):</span>
                <div className="font-bold text-emerald-600">Rp {selectedCustomer.outstandingBalance.toLocaleString('id-ID')}</div>
                <div className="text-[11px] text-slate-500">Credit Limit: Rp {selectedCustomer.creditLimit.toLocaleString('id-ID')}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
