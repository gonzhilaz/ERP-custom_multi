'use client';

import React, { useState } from 'react';
import { Shirt, Plus, CheckCircle2, Clock, Truck, Receipt, Tag, ShieldCheck, AlertCircle } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface GuestLaundryOrder {
  id: string;
  roomNo: string;
  guestName: string;
  serviceType: 'REGULAR_24H' | 'EXPRESS_4H';
  itemsList: string;
  itemCount: number;
  totalCost: number;
  status: 'RECEIVED' | 'IN_LAUNDRY' | 'PRESSING' | 'DELIVERED_TO_ROOM';
  orderTime: string;
}

interface HouseLinenVendorShipment {
  id: string;
  vendorName: string;
  shipmentType: 'OUTGOING_DIRTY' | 'INCOMING_CLEAN';
  linenType: string;
  quantityPcs: number;
  weightKg: number;
  status: 'IN_TRANSIT' | 'RECEIVED_VERIFIED';
  timestamp: string;
}

export const HotelierLaundryView = () => {
  const [activeTab, setActiveTab] = useState<'GUEST_LAUNDRY' | 'HOUSE_LINEN_VENDOR'>('GUEST_LAUNDRY');

  const subTabs: SubTabItem[] = [
    { id: 'GUEST_LAUNDRY', label: 'Laundry Tamu (Guest Laundry)', icon: Shirt },
    { id: 'HOUSE_LINEN_VENDOR', label: 'Linen Operasional & Subcontractor Vendor', icon: Truck }
  ];

  const [guestOrders, setGuestOrders] = useState<GuestLaundryOrder[]>([
    {
      id: 'LND-GST-2026-091',
      roomNo: 'RM-301',
      guestName: 'Ir. Hendra Wijaya',
      serviceType: 'EXPRESS_4H',
      itemsList: '2x Kemeja Batik, 1x Jas Executive, 2x Celana Bahan',
      itemCount: 5,
      totalCost: 285000,
      status: 'PRESSING',
      orderTime: '2026-07-26 09:30'
    },
    {
      id: 'LND-GST-2026-088',
      roomNo: 'RM-104',
      guestName: 'Mr. Johnathan Smith',
      serviceType: 'REGULAR_24H',
      itemsList: '3x T-Shirt Casual, 2x Short Pants',
      itemCount: 5,
      totalCost: 145000,
      status: 'DELIVERED_TO_ROOM',
      orderTime: '2026-07-25 14:15'
    }
  ]);

  const [linenShipments] = useState<HouseLinenVendorShipment[]>([
    {
      id: 'LND-VND-2026-042',
      vendorName: 'PT CleanLinen Subcontractor Utama',
      shipmentType: 'INCOMING_CLEAN',
      linenType: 'Sprei Bedsheet King Size & Handuk Mandi',
      quantityPcs: 250,
      weightKg: 180,
      status: 'RECEIVED_VERIFIED',
      timestamp: '2026-07-26 08:00'
    },
    {
      id: 'LND-VND-2026-041',
      vendorName: 'PT CleanLinen Subcontractor Utama',
      shipmentType: 'OUTGOING_DIRTY',
      linenType: 'Linen Kotor F&B Resto & Seragam Chef',
      quantityPcs: 120,
      weightKg: 95,
      status: 'IN_TRANSIT',
      timestamp: '2026-07-25 17:00'
    }
  ]);

  const guestLaundryColumns: ColumnDef<GuestLaundryOrder>[] = [
    { key: 'id', header: 'No. Slip Laundry', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.id },
    { key: 'roomNo', header: 'No. Kamar & Tamu', render: (i) => <div><div className="font-bold text-slate-900 dark:text-white font-mono">{i.roomNo}</div><div className="text-[10px] text-slate-400">{i.guestName}</div></div> },
    { key: 'serviceType', header: 'Layanan', align: 'center', render: (i) => <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${i.serviceType === 'EXPRESS_4H' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' : 'bg-slate-100 text-slate-600'}`}>{i.serviceType === 'EXPRESS_4H' ? 'EXPRESS 4-JAM (+50%)' : 'REGULAR 24-JAM'}</span> },
    { key: 'itemsList', header: 'Rincian Pakaian', className: 'font-mono text-[11px]', render: (i) => `${i.itemCount} Pcs (${i.itemsList})` },
    { key: 'totalCost', header: 'Tagihan (Auto-Folio)', align: 'right', className: 'font-mono font-bold text-emerald-600', render: (i) => `Rp ${i.totalCost.toLocaleString('id-ID')}` },
    { key: 'status', header: 'Status Proses', align: 'center', render: (i) => <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${i.status === 'DELIVERED_TO_ROOM' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-sky-500/10 text-sky-600'}`}>{i.status}</span> }
  ];

  const houseLinenColumns: ColumnDef<HouseLinenVendorShipment>[] = [
    { key: 'id', header: 'No. Surat Jalan Vendor', className: 'font-mono font-bold text-amber-600 dark:text-amber-400', render: (i) => i.id },
    { key: 'vendorName', header: 'Vendor Subcontractor', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.vendorName },
    { key: 'shipmentType', header: 'Tipe Pengiriman', align: 'center', render: (i) => <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${i.shipmentType === 'INCOMING_CLEAN' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>{i.shipmentType === 'INCOMING_CLEAN' ? 'Penerimaan Linen Bersih' : 'Pengiriman Linen Kotor'}</span> },
    { key: 'linenType', header: 'Deskripsi Linen', render: (i) => `${i.quantityPcs} Pcs (${i.linenType})` },
    { key: 'weightKg', header: 'Berat Timbangan', align: 'right', className: 'font-mono font-bold text-slate-700 dark:text-slate-200', render: (i) => `${i.weightKg} Kg` },
    { key: 'timestamp', header: 'Waktu Pengiriman', className: 'font-mono text-slate-500', render: (i) => i.timestamp }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Operasi Laundry & Linen"
        icon={Shirt}
        iconBgColor="bg-sky-500/10 text-sky-600 dark:text-sky-400"
        glossaryTitle="Glossary Laundry & Linen Subsystem"
        glossaryItems={[
          { term: 'Guest Laundry Service', description: 'Layanan laundry pakaian tamu hotel dengan auto-posting tagihan ke Guest Folio B.' },
          { term: 'House Linen Subcontractor', description: 'Manajemen pencucian sprei, handuk, & seragam karyawan melalui vendor subcontractor eksternal.' }
        ]}
        actions={
          <button onClick={() => alert('Order Laundry Tamu Baru')} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Order Laundry Tamu Baru</span>
          </button>
        }
      />

      <SubTabNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as any)}
        tabs={subTabs}
        colorScheme="sky"
      />

      {activeTab === 'GUEST_LAUNDRY' && (
        <DataTable headerTitle="Order Laundry Tamu (Guest Laundry Service)" columns={guestLaundryColumns} data={guestOrders} keyExtractor={(i) => i.id} />
      )}

      {activeTab === 'HOUSE_LINEN_VENDOR' && (
        <DataTable headerTitle="Pengiriman & Penerimaan Linen Operasional Vendor Subcontractor" columns={houseLinenColumns} data={linenShipments} keyExtractor={(i) => i.id} />
      )}
    </div>
  );
};
