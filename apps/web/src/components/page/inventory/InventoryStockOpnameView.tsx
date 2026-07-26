'use client';

import React, { useState } from 'react';
import { ClipboardCheck, Plus, CheckCircle2, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';
import { UniversalSearchBar } from '@/components/ui/forms/UniversalSearchBar';

interface StockOpnameRow {
  opnameNo: string;
  date: string;
  warehouseName: string;
  itemCode: string;
  itemName: string;
  systemStock: number;
  physicalStock: number;
  variance: number; // physicalStock - systemStock
  unit: string;
  adjustReason: string;
  adjustGlAccount: string;
  status: 'DRAFT' | 'APPROVED' | 'POSTED';
}

export const InventoryStockOpnameView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [opnameList, setOpnameList] = useState<StockOpnameRow[]>([
    { opnameNo: 'OPN-2026-07-001', date: '2026-07-24', warehouseName: 'Gudang Utama HO Jakarta', itemCode: 'SKU-RIT-001', itemName: 'Beras Premium Head 10kg', systemStock: 500, physicalStock: 495, variance: -5, unit: 'Karung', adjustReason: 'Kerusakan kemasan saat penataan rakit', adjustGlAccount: '5-40100 (Beban Kerugian Inventory)', status: 'POSTED' },
    { opnameNo: 'OPN-2026-07-002', date: '2026-07-24', warehouseName: 'Gudang Site Tambang Timika', itemCode: 'SKU-MNG-009', itemName: 'Oli Mesin Diesel Heavy Duty 200L', systemStock: 45, physicalStock: 45, variance: 0, unit: 'Drum', adjustReason: 'Hasil penghitungan phisik 100% cocok', adjustGlAccount: 'N/A', status: 'APPROVED' },
    { opnameNo: 'OPN-2026-07-003', date: '2026-07-25', warehouseName: 'Gudang Resto Central Kitchen', itemCode: 'SKU-RST-044', itemName: 'Daging Sapi Sirloin Import', systemStock: 120, physicalStock: 118, variance: -2, unit: 'Kg', adjustReason: 'Shrinkage penyusutan suhu chiller (-2 kg)', adjustGlAccount: '5-40100 (Beban Kerugian Inventory)', status: 'DRAFT' }
  ]);

  const filtered = opnameList.filter(
    (o) =>
      o.opnameNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.warehouseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<StockOpnameRow>[] = [
    { key: 'opnameNo', header: 'No. Stock Opname', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.opnameNo },
    { key: 'date', header: 'Tanggal Opname', className: 'font-mono text-slate-500', render: (i) => i.date },
    { key: 'warehouseName', header: 'Lokasi Gudang', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.warehouseName },
    { key: 'itemName', header: 'Nama Barang & SKU', render: (i) => <div><p className="font-bold text-slate-900 dark:text-white">{i.itemName}</p><p className="font-mono text-[10px] text-slate-400">{i.itemCode}</p></div> },
    { key: 'systemStock', header: 'Stok Sistem', align: 'center', className: 'font-mono font-bold text-slate-700', render: (i) => `${i.systemStock} ${i.unit}` },
    { key: 'physicalStock', header: 'Stok Fisik', align: 'center', className: 'font-mono font-bold text-sky-600', render: (i) => `${i.physicalStock} ${i.unit}` },
    {
      key: 'variance',
      header: 'Selisih (Variance)',
      align: 'center',
      render: (i) => (
        <span className={`font-mono font-bold text-xs ${i.variance === 0 ? 'text-emerald-600' : i.variance < 0 ? 'text-rose-600' : 'text-amber-600'}`}>
          {i.variance > 0 ? `+${i.variance}` : i.variance} {i.unit}
        </span>
      )
    },
    { key: 'adjustReason', header: 'Alasan Penyesuaian', render: (i) => i.adjustReason },
    { key: 'adjustGlAccount', header: 'COA Auto-Adjust', className: 'font-mono font-bold text-slate-600', render: (i) => i.adjustGlAccount },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (i) => (
        <span className={`px-2 py-0.5 font-bold font-mono text-[10px] rounded ${
          i.status === 'POSTED' ? 'bg-emerald-500/10 text-emerald-600' : i.status === 'APPROVED' ? 'bg-sky-500/10 text-sky-600' : 'bg-slate-100 text-slate-600'
        }`}>
          {i.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Physical Stock Opname & Stock Adjustment Journal"
        icon={ClipboardCheck}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Stock Opname & Variance"
        glossaryItems={[
          { term: 'Stock Opname', description: 'Penghitungan fisik jumlah persediaan di gudang untuk pencocokan dengan saldo sistem.' },
          { term: 'Stock Adjustment Journal', description: 'Ayat jurnal otomatis yang memotong/menambah saldo barang & memposting selisih ke COA Kerugian Inventory.' }
        ]}
        badges={[
          { label: `${opnameList.length} Opname Records`, variant: 'emerald' },
          { label: 'Role Restrict: Warehouse Manager', variant: 'slate' }
        ]}
      />

      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="w-full md:w-96">
          <UniversalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari no opname, gudang, atau nama barang..."
          />
        </div>
      </div>

      <DataTable
        headerTitle={`Hasil Penyesuaian Stok Fisik Gudang (${filtered.length})`}
        columns={columns}
        data={filtered}
        keyExtractor={(i) => i.opnameNo}
      />
    </div>
  );
};
