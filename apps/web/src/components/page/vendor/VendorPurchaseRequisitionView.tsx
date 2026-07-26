'use client';

import React, { useState } from 'react';
import { ShoppingBag, Plus, CheckCircle2, Clock, UserCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';

interface PurchaseRequisitionRow {
  prNo: string;
  date: string;
  requestorDept: string;
  itemName: string;
  qtyRequested: number;
  unit: string;
  estimatedTotal: number;
  urgency: 'NORMAL' | 'URGENT';
  approvalStatus: 'APPROVED' | 'PENDING_APPROVAL' | 'REJECTED';
  poReference?: string;
}

export const VendorPurchaseRequisitionView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [requisitions, setRequisitions] = useState<PurchaseRequisitionRow[]>([
    { prNo: 'PR-2026-07-0112', date: '2026-07-24', requestorDept: 'Departemen Tambang Site 1', itemName: 'Suku Cadang Filter Solar Heavy Excavator CAT 320', qtyRequested: 20, unit: 'Pcs', estimatedTotal: 45000000, urgency: 'URGENT', approvalStatus: 'APPROVED', poReference: 'PO-2026-07-0044' },
    { prNo: 'PR-2026-07-0115', date: '2026-07-25', requestorDept: 'Departemen Housekeeping Hotel', itemName: 'Linen Sprei King Size Cotton 100%', qtyRequested: 50, unit: 'Set', estimatedTotal: 25000000, urgency: 'NORMAL', approvalStatus: 'PENDING_APPROVAL' }
  ]);

  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = requisitions.filter((r) => {
    const matchesSearch =
      r.prNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.requestorDept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || r.approvalStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: ColumnDef<PurchaseRequisitionRow>[] = [
    { key: 'prNo', header: 'No. Purchase Requisition (PR)', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.prNo },
    { key: 'date', header: 'Tanggal PR', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'requestorDept', header: 'Departemen Pengaju', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.requestorDept },
    { key: 'itemName', header: 'Nama Barang/Jasa Diminta', render: (i) => i.itemName },
    { key: 'qtyRequested', header: 'Qty Diminta', align: 'center', className: 'font-mono font-bold text-sky-600', render: (i) => `${i.qtyRequested} ${i.unit}` },
    { key: 'estimatedTotal', header: 'Estimasi Biaya (Rp)', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (i) => `Rp ${i.estimatedTotal.toLocaleString('id-ID')}` },
    {
      key: 'urgency',
      header: 'Prioritas',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${i.urgency === 'URGENT' ? 'bg-rose-500/10 text-rose-600' : 'bg-slate-100 text-slate-600'}`}>
          {i.urgency}
        </span>
      )
    },
    {
      key: 'approvalStatus',
      header: 'Status Approval PR',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.approvalStatus === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-600' : i.approvalStatus === 'PENDING_APPROVAL' ? 'bg-amber-500/10 text-amber-600' : 'bg-rose-500/10 text-rose-600'
        }`}>
          {i.approvalStatus}
        </span>
      )
    },
    { key: 'poReference', header: 'Ref PO Terbit', className: 'font-mono font-bold text-sky-600', render: (i) => i.poReference || 'Belum Terbit PO' }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Purchase Requisition (PR) Internal Request Hub"
        icon={ShoppingBag}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Purchase Requisition"
        glossaryItems={[
          { term: 'Purchase Requisition (PR)', description: 'Permintaan pengadaan barang/jasa internal dari departemen ke tim Procurement.' },
          { term: 'PO Conversion', description: 'Proses konversi PR yang telah disetujui Manajer menjadi Purchase Order (PO) ke Supplier.' }
        ]}
        badges={[
          { label: `${requisitions.length} PR Requests`, variant: 'sky' },
          { label: 'Multi-Level Approval Flow', variant: 'amber' }
        ]}
      />

      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari no PR, departemen, atau barang..."
        categoryValue={statusFilter}
        onCategoryChange={setStatusFilter}
        categoryOptions={[
          { label: 'Disetujui (Approved)', value: 'APPROVED' },
          { label: 'Pending Approval', value: 'PENDING_APPROVAL' },
          { label: 'Ditolak (Rejected)', value: 'REJECTED' }
        ]}
        categoryPlaceholder="Semua Status Approval"
        colorScheme="sky"
      />

      <DataTable
        headerTitle={`Daftar Permintaan Pembelian Internal (PR) (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.prNo}
      />
    </div>
  );
};
