'use client';

import React from 'react';
import { UtensilsCrossed, Plus } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface EquipmentLog {
  id: string;
  itemCode: string;
  itemName: string;
  quantityOut: number;
  quantityReturned: number;
  eventName: string;
  status: string;
}

const MOCK_EQUIPMENT: EquipmentLog[] = [
  { id: 'eq-01', itemCode: 'EQ-CHAFING-01', itemName: 'Chafing Dish Stainless Round + Stove', quantityOut: 45, quantityReturned: 45, eventName: 'Raker Kemenkeu Ballroom', status: 'FULLY_RETURNED' }
];

export const CateringEquipmentView = () => {
  const columns: ColumnDef<EquipmentLog>[] = [
    { key: 'itemCode', header: 'Kode Alat', className: 'font-mono font-bold text-orange-600 dark:text-orange-400', render: (i) => i.itemCode },
    { key: 'itemName', header: 'Nama Peralatan Banquet', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.itemName },
    { key: 'quantityOut', header: 'Keluar (Pcs)', align: 'center', className: 'font-mono font-bold', render: (i) => `${i.quantityOut} Pcs` },
    { key: 'quantityReturned', header: 'Kembali (Pcs)', align: 'center', className: 'font-mono font-bold text-emerald-600 dark:text-emerald-400', render: (i) => `${i.quantityReturned} Pcs` },
    { key: 'eventName', header: 'Event Target', render: (i) => i.eventName },
    { key: 'status', header: 'Status Pengembalian', align: 'center', render: (i) => <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 font-bold text-[10px] rounded-full">{i.status}</span> }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Logistik Peralatan Event"
        icon={UtensilsCrossed}
        iconBgColor="bg-orange-500/10 text-orange-600 dark:text-orange-400"
        glossaryTitle="Glossary Logistik Peralatan Banquet"
        glossaryItems={[{ term: 'Equipment Tracking', description: 'Pelacakan aset peralatan piring, sendok, stove, & chafing dish dari Central Kitchen.' }]}
        actions={
          <button onClick={() => alert('Logistik Alat Keluar Baru')} className="px-3.5 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs">
            <Plus className="w-4 h-4" />
            <span>Kirim Peralatan</span>
          </button>
        }
      />
      <DataTable headerTitle="Pelacakan Pengeluaran & Pengembalian Peralatan Chafing Dish Banquet" columns={columns} data={MOCK_EQUIPMENT} keyExtractor={(i) => i.id} />
    </div>
  );
};
