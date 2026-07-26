'use client';

import React, { useState } from 'react';
import { Truck, Plus, CheckCircle2, PackageCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { DynamicSearchFilter } from '@/components/ui/forms/DynamicSearchFilter';

interface GoodsReceiptRow {
  grnNo: string;
  date: string;
  poNo: string;
  supplierName: string;
  warehouseLocation: string;
  qtyOrdered: number;
  qtyReceived: number;
  qtyRejected: number;
  unit: string;
  receivedBy: string;
  status: 'FULL_MATCH' | 'PARTIAL' | 'REJECTED';
}

export const VendorGoodsReceiptView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [grnList, setGrnList] = useState<GoodsReceiptRow[]>([
    { grnNo: 'GRN-2026-07-0091', date: '2026-07-24', poNo: 'PO-2026-07-0044', supplierName: 'PT Heavy Equipment Sparepart Tbk', warehouseLocation: 'Gudang Site Tambang Timika', qtyOrdered: 20, qtyReceived: 20, qtyRejected: 0, unit: 'Pcs', receivedBy: 'Budi Santoso (Head Storekeeper)', status: 'FULL_MATCH' },
    { grnNo: 'GRN-2026-07-0094', date: '2026-07-25', poNo: 'PO-2026-07-0038', supplierName: 'CV Textile Linens Utama', warehouseLocation: 'Gudang Housekeeping Hotel', qtyOrdered: 50, qtyReceived: 48, qtyRejected: 2, unit: 'Set', receivedBy: 'Siti Aminah (Receiver Supervisor)', status: 'PARTIAL' }
  ]);

  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = grnList.filter((g) => {
    const matchesSearch =
      g.grnNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.poNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns: ColumnDef<GoodsReceiptRow>[] = [
    { key: 'grnNo', header: 'No. Goods Receipt (GRN)', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.grnNo },
    { key: 'date', header: 'Tanggal Terima', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'poNo', header: 'Ref No. PO', className: 'font-mono font-bold text-emerald-600', render: (i) => i.poNo },
    { key: 'supplierName', header: 'Nama Supplier', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.supplierName },
    { key: 'warehouseLocation', header: 'Gudang Penerima', render: (i) => i.warehouseLocation },
    { key: 'qtyOrdered', header: 'Qty PO', align: 'center', className: 'font-mono text-slate-600', render: (i) => `${i.qtyOrdered} ${i.unit}` },
    { key: 'qtyReceived', header: 'Qty Diterima', align: 'center', className: 'font-mono font-bold text-emerald-600', render: (i) => `${i.qtyReceived} ${i.unit}` },
    { key: 'qtyRejected', header: 'Qty Ditolak', align: 'center', className: 'font-mono font-bold text-rose-600', render: (i) => `${i.qtyRejected} ${i.unit}` },
    { key: 'receivedBy', header: 'Petugas Receiver', className: 'font-semibold text-slate-700', render: (i) => i.receivedBy },
    {
      key: 'status',
      header: 'Status Receiving',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.status === 'FULL_MATCH' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
        }`}>
          {i.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Goods Receipt Note (GRN) Receiver Register"
        icon={PackageCheck}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Goods Receipt Note"
        glossaryItems={[
          { term: 'Goods Receipt Note (GRN)', description: 'Bukti fisik penerimaan barang di gudang dari supplier sesuai Purchase Order.' },
          { term: 'Partial Receiving', description: 'Kondisi barang yang datang kurang dari jumlah yang dipesan di PO.' }
        ]}
        badges={[
          { label: `${grnList.length} GRN Issued`, variant: 'emerald' },
          { label: 'Integrasi Verifikasi 3-Way', variant: 'sky' }
        ]}
      />

      <DynamicSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Cari GRN no, PO no, atau supplier..."
        categoryValue={statusFilter}
        onCategoryChange={setStatusFilter}
        categoryOptions={[
          { label: 'Full Match (Sesuai PO)', value: 'FULL_MATCH' },
          { label: 'Partial (Parsial)', value: 'PARTIAL' },
          { label: 'Ditolak (Rejected)', value: 'REJECTED' }
        ]}
        categoryPlaceholder="Semua Status Receiving"
        colorScheme="emerald"
      />

      <DataTable
        headerTitle={`Berita Acara Penerimaan Barang Gudang (GRN) (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.grnNo}
      />
    </div>
  );
};
