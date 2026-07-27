'use client';

import React, { useState } from 'react';
import { FileCheck, Plus, CheckCircle, XCircle, X, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useVendor } from '@/hooks/vendor/useVendor';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { PurchaseOrder } from '@/lib/mock/vendor';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

export const VendorPurchaseOrdersView = () => {
  const { user } = useAuth();
  const isHoldingExecutive = (user?.systemRole as string) === 'HOLDING_EXECUTIVE' || (user?.systemRole as string) === 'COMPANY_ADMIN' || (user?.systemRole as string) === 'ADMIN';
  const { purchaseOrders, approvePO, rejectPO, vendors } = useVendor();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [poList, setPoList] = useState<PurchaseOrder[]>(purchaseOrders);

  const [formData, setFormData] = useState({
    vendorName: vendors[0]?.name || 'PT Indofood Sukses Makmur Tbk',
    unitUsaha: 'Restoran Alam Rindu (FnB)',
    totalAmount: 35000000,
    notes: 'Pembelian pasokan bahan baku bulanan'
  });

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const isExecutiveNeeded = formData.totalAmount > 50000000;
    const newPO: PurchaseOrder = {
      id: `po-${Date.now()}`,
      poNumber: `PO/2026/07/00${Math.floor(Math.random() * 90 + 10)}`,
      vendorName: formData.vendorName,
      unitUsaha: formData.unitUsaha,
      date: new Date().toISOString().split('T')[0],
      totalAmount: Number(formData.totalAmount),
      status: isExecutiveNeeded ? 'WAITING_APPROVAL_DIREKTUR' : 'APPROVED',
      requiresExecutiveApproval: isExecutiveNeeded
    };

    setPoList([newPO, ...poList]);
    alert(
      isExecutiveNeeded
        ? 'PO Berhasil Diterbitkan & Memerlukan ACC Direktur (Nominal > Rp 50.000.000)!'
        : 'PO Berhasil Diterbitkan & Disetujui Otomatis (Nominal <= Rp 50.000.000)!'
    );
    setIsModalOpen(false);
  };

  const handleApprove = (id: string) => {
    setPoList((prev) => prev.map((po) => (po.id === id ? { ...po, status: 'APPROVED' as const } : po)));
    approvePO(id);
  };

  const handleReject = (id: string) => {
    setPoList((prev) => prev.map((po) => (po.id === id ? { ...po, status: 'REJECTED' as const } : po)));
    rejectPO(id);
  };

  return (
    <div className="space-y-4">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Purchase Orders"
        icon={FileCheck}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Purchase Order Governance"
        glossaryItems={[
          { term: 'Threshold Approval', description: 'PO di atas Rp 50.000.000 membutuhkan persetujuan Direktur Utama.' },
          { term: 'Auto Approval', description: 'PO di bawah Rp 50.000.000 langsung approved otomatis.' }
        ]}
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>PO Baru</span>
          </button>
        }
      />

      {/* PO List Table */}
      <DataTable
        headerTitle={`Daftar Purchase Order (${poList.length})`}
        columns={[
          { key: 'poNumber', header: 'No. PO', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (po) => po.poNumber },
          { key: 'vendorName', header: 'Vendor Supplier', className: 'font-semibold text-slate-900 dark:text-white', render: (po) => po.vendorName },
          { key: 'unitUsaha', header: 'Unit Usaha', className: 'text-slate-500', render: (po) => po.unitUsaha },
          { key: 'date', header: 'Tanggal', render: (po) => po.date },
          { key: 'totalAmount', header: 'Total Nominal', align: 'right', className: 'font-bold text-slate-900 dark:text-white', render: (po) => `Rp ${po.totalAmount.toLocaleString('id-ID')}` },
          {
            key: 'approvalLevel',
            header: 'Tingkat Approval',
            align: 'center',
            render: (po) => (
              po.requiresExecutiveApproval ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-500/30">
                  ACC Direktur (&gt; 50 Jt)
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  ACC Manager (&le; 50 Jt)
                </span>
              )
            )
          },
          {
            key: 'status',
            header: 'Status',
            align: 'center',
            render: (po) => (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                po.status === 'APPROVED'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : po.status === 'REJECTED'
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 animate-pulse'
              }`}>
                {po.status === 'APPROVED' ? 'APPROVED' : po.status === 'REJECTED' ? 'REJECTED' : 'PENDING APPROVAL'}
              </span>
            )
          },
          {
            key: 'actions',
            header: 'Aksi (Direksi)',
            align: 'center',
            sortable: false,
            render: (po) => (
              po.status === 'WAITING_APPROVAL_DIREKTUR' && isHoldingExecutive ? (
                <div className="flex items-center justify-center gap-1.5">
                  <button
                    onClick={() => handleApprove(po.id)}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Setujui</span>
                  </button>
                  <button
                    onClick={() => handleReject(po.id)}
                    className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Tolak</span>
                  </button>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400 font-mono">-</span>
              )
            )
          }
        ]}
        data={poList}
        keyExtractor={(po) => po.id}
      />

      {/* New Purchase Order Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-slate-900 dark:text-white text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-sky-500" />
                <span>Penerbitan PO Baru</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePO} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Pilih Vendor Supplier</label>
                <SearchableSelect
                  options={vendors.map((v) => ({ id: v.name, label: `${v.name} (${v.category})` }))}
                  value={formData.vendorName}
                  onChange={(val) => setFormData({ ...formData, vendorName: val })}
                  placeholder="Pilih Vendor Supplier..."
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Unit Usaha Pemohon</label>
                <SearchableSelect
                  options={[
                    { id: 'Restoran Alam Rindu (FnB)', label: 'Restoran Alam Rindu (FnB)' },
                    { id: 'PT Braxit Mining (Tambang Emas)', label: 'PT Braxit Mining (Tambang Emas)' },
                    { id: 'Hotel Alam Pakuan (Hospitality)', label: 'Hotel Alam Pakuan (Hospitality)' },
                    { id: 'Toko Roti Surya (Retail)', label: 'Toko Roti Surya (Retail)' }
                  ]}
                  value={formData.unitUsaha}
                  onChange={(val) => setFormData({ ...formData, unitUsaha: val })}
                  placeholder="Pilih Unit Usaha..."
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Total Nominal Pengajuan (Rp)</label>
                <input
                  type="number"
                  required
                  min={100000}
                  step={100000}
                  value={formData.totalAmount}
                  onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold"
                />
              </div>

              {/* Dynamic Approval Level Notice */}
              <div
                className={`p-3 rounded-2xl border flex items-center gap-2 text-[11px] font-semibold ${
                  formData.totalAmount > 50000000
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>
                  {formData.totalAmount > 50000000
                    ? 'Nominal > Rp 50.000.000: Memerlukan ACC Direktur HO.'
                    : 'Nominal <= Rp 50.000.000: Cukup ACC Manager.'}
                </span>
              </div>

              <div>
                <label className="block font-semibold mb-1">Catatan Keperluan Pengadaan</label>
                <textarea
                  rows={2}
                  required
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Isi rincian item & alasan..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold cursor-pointer">
                  Terbitkan PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
