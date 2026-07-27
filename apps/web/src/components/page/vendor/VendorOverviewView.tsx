'use client';

import React from 'react';
import { Truck, ShieldAlert, TrendingUp, DollarSign, AlertTriangle, BarChart3, PieChart, Users } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { KpiCard } from '@/components/ui/cards/KpiCard';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { useVendor } from '@/hooks/vendor/useVendor';

interface PurchaseOrderLog {
  id: string;
  poNumber: string;
  vendor: string;
  category: string;
  amount: number;
  status: string;
  date: string;
}

export const VendorOverviewView = () => {
  const { vendors, purchaseOrders } = useVendor();

  const activeVendors = vendors.filter((v) => v.status === 'ACTIVE').length;
  const pendingApprovalPOs = purchaseOrders.filter((po) => po.status.includes('WAITING_APPROVAL'));

  const mockRecentPOLogs: PurchaseOrderLog[] = [
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

  const columns: ColumnDef<PurchaseOrderLog>[] = [
    { key: 'poNumber', header: 'No. Purchase Order', className: 'font-mono font-bold text-sky-600', render: (i) => i.poNumber },
    { key: 'vendor', header: 'Nama Vendor / Supplier', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.vendor },
    { key: 'category', header: 'Kategori Pembelian', className: 'text-slate-500', render: (i) => i.category },
    { key: 'amount', header: 'Nominal PO (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (i) => `Rp ${i.amount.toLocaleString('id-ID')}` },
    { key: 'status', header: 'Status Persetujuan', align: 'center', render: (i) => <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 font-bold font-mono text-[10px] rounded">{i.status}</span> },
    { key: 'date', header: 'Tanggal PO', align: 'center', className: 'font-mono text-slate-500', render: (i) => i.date }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Module Header */}
      <ModuleHeader
        title="Pengadaan Overview"
        icon={Truck}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Procurement"
        glossaryItems={[
          { term: 'Procurement Spend Trend', description: 'Analisis tren total alokasi dana pembelian bahan baku & barang ke supplier.' },
          { term: 'Vendor SLA Rating', description: 'Skor ketepatan waktu pengiriman & kualitas spesifikasi barang dari vendor.' }
        ]}
        badges={[
          { label: '3-Way Matching Active', variant: 'emerald' },
          { label: 'Multi-Category Vendor Network', variant: 'sky' }
        ]}
      />

      {/* Warning Banner */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <div className="font-bold text-xs">Peringatan Pengadaan: PO Pending Approval & SLA Vendor</div>
            <div className="text-[11px] text-amber-700 dark:text-amber-300">
              Terdapat {pendingApprovalPOs.length} PO bernilai di atas Rp 50 Juta memerlukan persetujuan Direktur Keuangan.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold shrink-0">
          <span className="px-2 py-1 bg-amber-500/20 rounded-lg">{pendingApprovalPOs.length} PO Pending</span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Belanja Harian" value="Rp 45.000.000" subtitle="Alokasi PO Hari Ini" icon={DollarSign} iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" />
        <KpiCard title="PO Pending ACC" value={`${pendingApprovalPOs.length} PO`} subtitle="Membutuhkan Persetujuan" icon={ShieldAlert} iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/50" />
        <KpiCard title="Total Vendor Aktif" value={`${activeVendors} Supplier`} subtitle="Tersertifikasi Quality SLA" icon={Truck} iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50" />
        <KpiCard title="Efisiensi Pembelian" value="+15.8% Margin" subtitle="Negosiasi Kontrak Massal" icon={TrendingUp} iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/50" />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Procurement Spend Breakdown Progress Bars */}
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-sky-500" />
              <span>Komposisi Pengeluaran Belanja per Kategori Vendor</span>
            </h3>
            <span className="font-mono text-[10px] text-sky-600 font-bold bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-md">Bulan Ini</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Bahan Baku Produksi & Catering', amount: 'Rp 680 Jt', pct: 52, color: 'bg-sky-500' },
              { name: 'Spareparts Fleet & Alat Berat', amount: 'Rp 340 Jt', pct: 26, color: 'bg-indigo-500' },
              { name: 'Perlengkapan Guest Supplies Hotel', amount: 'Rp 160 Jt', pct: 12, color: 'bg-emerald-500' },
              { name: 'Peralatan POS & IT Hardware', amount: 'Rp 130 Jt', pct: 10, color: 'bg-amber-500' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{item.amount} ({item.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Purchase Orders Table */}
        <DataTable headerTitle="Daftar Terkini Purchase Order (PO) Vendor" columns={columns} data={mockRecentPOLogs} keyExtractor={(i) => i.id} />
      </div>
    </div>
  );
};
