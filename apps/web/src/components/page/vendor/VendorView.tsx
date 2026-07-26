'use client';

import React, { useState } from 'react';
import { Truck, FileCheck, Plus, CheckCircle, XCircle, HelpCircle, X } from 'lucide-react';
import { useVendor } from '@/hooks/vendor/useVendor';
import { SkeletonTable } from '@/components/ui/loader/skeleton/SkeletonTable';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';

export const VendorView = () => {
  const { vendors, purchaseOrders, loading, activeTab, setActiveTab, approvePO, rejectPO } = useVendor();
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-sky-500" />
            <span>Vendor & Procurement</span>
          </h1>

          {/* Glossary Popup Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Vendor & Procurement"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Procurement & Vendor</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>PO Nominal Threshold</strong>: PO ≤ Rp 50 Jt disetujui Manager, PO &gt; Rp 50 Jt wajib disetujui Direktur Holding.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Vendor AP Linkage</strong>: Pengelolaan saldo utang usaha rekanan terintegrasi dengan COA Keuangan.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>Purchase Order</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 text-xs font-medium">
        <button
          onClick={() => setActiveTab('PO')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'PO'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Purchase Orders ({purchaseOrders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('VENDORS')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'VENDORS'
              ? 'border-sky-600 text-sky-600 dark:text-sky-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Direktori Vendor ({vendors.length})</span>
        </button>
      </div>

      {/* Main Content */}
      {loading ? (
        <SkeletonTable />
      ) : activeTab === 'PO' ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Pengajuan Purchase Order (PO)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">No. PO</th>
                  <th className="py-3 px-4">Vendor Supplier</th>
                  <th className="py-3 px-4">Unit Usaha Pemohon</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4 text-right">Total Nominal</th>
                  <th className="py-3 px-4 text-center">Threshold</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Aksi (Direksi)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {purchaseOrders.map((po) => (
                  <tr key={po.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{po.poNumber}</td>
                    <td className="py-3 px-4 font-semibold">{po.vendorName}</td>
                    <td className="py-3 px-4 text-slate-500">{po.unitUsaha}</td>
                    <td className="py-3 px-4">{po.date}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white">
                      Rp {po.totalAmount.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-center font-medium">
                      {po.requiresExecutiveApproval ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                          ACC Direktur (&gt; 50 Jt)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          ACC Manager (&le; 50 Jt)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {po.status === 'APPROVED' ? (
                        <StatusBadge type="APPROVED" label="DISETUJUI" />
                      ) : po.status === 'REJECTED' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300">
                          DITOLAK
                        </span>
                      ) : (
                        <StatusBadge type="WAITING_APPROVAL_DIREKTUR" label="WAITING ACC DIREKTUR" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {po.status !== 'APPROVED' && po.status !== 'REJECTED' ? (
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => approvePO(po.id)}
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>ACC</span>
                          </button>
                          <button
                            onClick={() => rejectPO(po.id)}
                            className="p-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Tolak</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">Selesai</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Daftar Rekanan Vendor & Utang Usaha (AP)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vendors.map((v) => (
              <div key={v.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{v.name}</h4>
                  <span className="text-xs font-bold text-amber-500">★ {v.rating}</span>
                </div>
                <div className="text-xs text-slate-500">Kontak: {v.contactPerson} ({v.phone})</div>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Utang Usaha (AP): <span className="text-red-600 font-bold">Rp {v.payableBalance.toLocaleString('id-ID')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
