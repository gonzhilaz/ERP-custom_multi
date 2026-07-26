'use client';

import React from 'react';
import { Truck, ShieldAlert, TrendingUp, DollarSign } from 'lucide-react';
import { KpiCard } from '@/components/ui/cards/KpiCard';
import { useVendor } from '@/hooks/vendor/useVendor';

export const VendorOverviewView = () => {
  const { vendors, purchaseOrders } = useVendor();

  const activeVendors = vendors.filter((v) => v.status === 'ACTIVE').length;
  const pendingApprovalPOs = purchaseOrders.filter((po) => po.status.includes('WAITING_APPROVAL'));

  const mockRecentPOLogs = [
    {
      id: 'po-log-01',
      poNumber: 'PO/2026/07/0088',
      vendor: 'PT Indofood Sukses Makmur Tbk',
      category: 'Bahan Baku Produksi',
      amount: 45000000,
      status: 'APPROVED',
      date: '2026-07-23'
    },
    {
      id: 'po-log-02',
      poNumber: 'PO/2026/07/0091',
      vendor: 'Traktor Nusantara Heavy Machinery',
      category: 'Spareparts Fleet',
      amount: 85000000,
      status: 'WAITING_APPROVAL_DIREKTUR',
      date: '2026-07-22'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Ultra-Clean Header Bar */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Truck className="w-5 h-5 text-sky-500" />
          <span>Procurement</span>
        </h1>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Belanja Harian"
          value="Rp 45.000.000"
          subtitle="Hari ini (23 Juli 2026)"
          icon={DollarSign}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50"
        />
        <KpiCard
          title="PO Pending ACC"
          value={`${pendingApprovalPOs.length} PO`}
          subtitle="Di atas Rp 50 Juta"
          icon={ShieldAlert}
          iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50"
        />
        <KpiCard
          title="Vendor Aktif"
          value={`${activeVendors} Vendor`}
          subtitle="Directory Rekanan"
          icon={Truck}
          iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50"
        />
        <KpiCard
          title="Efisiensi Belanja"
          value="Rp 12.400.000"
          subtitle="Savings Price Matrix"
          icon={TrendingUp}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50"
        />
      </div>

      {/* Spend Trend & Price Benchmark Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-sky-500" />
              <span>Tren Belanja Bahan Utama</span>
            </h3>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              +4.2% Normal
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Tepung Terigu & Mentega Industri</div>
                <div className="text-[11px] text-slate-400">Total Alokasi Belanja Bulan Ini</div>
              </div>
              <div className="text-right font-mono font-bold text-sky-600 dark:text-sky-400">
                Rp 148.500.000 <span className="text-[10px] text-emerald-600 font-normal">(Stable)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Solar HSD Fuel Tambang Site-01</div>
                <div className="text-[11px] text-slate-400">Total Alokasi Belanja Bulan Ini</div>
              </div>
              <div className="text-right font-mono font-bold text-sky-600 dark:text-sky-400">
                Rp 420.000.000 <span className="text-[10px] text-amber-600 font-normal">(+3.8%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white">Vendor Price Matrix</h3>
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-0.5 text-xs">
            <div className="font-bold text-emerald-900 dark:text-emerald-300">PT Indofood Sukses (Best Price)</div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400">Rp 245.000 /Karung (TOP 30 Hari)</div>
          </div>
          <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl space-y-0.5 text-xs text-slate-500">
            <div className="font-bold text-slate-700 dark:text-slate-300">CV Bogasari Mitra</div>
            <div className="text-[11px]">Rp 252.000 /Karung (TOP 14 Hari)</div>
          </div>
        </div>
      </div>

      {/* Recent PO Audit Log */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Log Purchase Order (PO) Terkini</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">No. PO</th>
                <th className="py-3 px-4">Vendor Supplier</th>
                <th className="py-3 px-4">Kategori Belanja</th>
                <th className="py-3 px-4 text-right">Nominal PO</th>
                <th className="py-3 px-4 text-center">Status Approval</th>
                <th className="py-3 px-4 text-center">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {mockRecentPOLogs.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-600">{po.poNumber}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{po.vendor}</td>
                  <td className="py-3 px-4 text-slate-500">{po.category}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Rp {po.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {po.status === 'APPROVED' ? (
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 rounded-full text-[10px] font-bold">
                        Approved
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-amber-500/10 text-amber-600 border border-amber-500/30 rounded-full text-[10px] font-bold">
                        Pending ACC Direksi
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-slate-400">{po.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
