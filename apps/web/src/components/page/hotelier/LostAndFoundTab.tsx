'use client';

import React, { useState } from 'react';
import { Package, Plus, Search, CheckCircle2, ShieldCheck, Clock, UserCheck } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

interface LostFoundItem {
  id: string;
  itemDescription: string;
  category: 'ELECTRONIC' | 'DOCUMENT_WALLET' | 'JEWELRY' | 'CLOTHING';
  foundLocation: string;
  foundByStaff: string;
  storageLockerNo: string;
  status: 'STORED_IN_SAFE' | 'CLAIMED_BY_GUEST' | 'DISPOSED_EXPIRED';
  foundDate: string;
  claimedByGuestName?: string;
}

export const LostAndFoundTab = () => {
  const [items, setItems] = useState<LostFoundItem[]>([
    {
      id: 'LNF-2026-081',
      itemDescription: 'Dompet Kulit Cokelat berisi Kartu Kredit BCA & SIM A',
      category: 'DOCUMENT_WALLET',
      foundLocation: 'Kamar RM-201 (Executive Suite)',
      foundByStaff: 'Housekeeper Ahmad Subagyo',
      storageLockerNo: 'Locker Safe Box #04',
      status: 'STORED_IN_SAFE',
      foundDate: '2026-07-25 14:00'
    },
    {
      id: 'LNF-2026-078',
      itemDescription: 'Charger Adaptor Laptop Apple MacBook Pro 96W',
      category: 'ELECTRONIC',
      foundLocation: 'Restoran Table #12',
      foundByStaff: 'Waitress Siska',
      storageLockerNo: 'Locker Safe Box #02',
      status: 'CLAIMED_BY_GUEST',
      foundDate: '2026-07-24 20:15',
      claimedByGuestName: 'Mr. Johnathan Smith'
    }
  ]);

  const handleClaim = (itemId: string) => {
    const guestName = prompt('Masukkan Nama Tamu Pengklaim Barang:');
    if (guestName) {
      setItems(
        items.map((i) => (i.id === itemId ? { ...i, status: 'CLAIMED_BY_GUEST', claimedByGuestName: guestName } : i))
      );
      alert(`Barang ${itemId} berhasil diserahkan ke tamu ${guestName}!`);
    }
  };

  const columns: ColumnDef<LostFoundItem>[] = [
    { key: 'id', header: 'No. Kode Barang', className: 'font-mono font-bold text-sky-600 dark:text-sky-400', render: (i) => i.id },
    { key: 'itemDescription', header: 'Deskripsi Barang Temuan', className: 'font-bold text-slate-900 dark:text-white', render: (i) => i.itemDescription },
    { key: 'foundLocation', header: 'Lokasi Ditemukan & Penemu', render: (i) => <div><div className="font-mono font-bold text-slate-700 dark:text-slate-200">{i.foundLocation}</div><div className="text-[10px] text-slate-400">{i.foundByStaff}</div></div> },
    { key: 'storageLockerNo', header: 'Lokasi Safe Locker', className: 'font-mono text-emerald-600 font-bold', render: (i) => i.storageLockerNo },
    { key: 'foundDate', header: 'Tanggal Ditemukan', className: 'font-mono text-slate-500', render: (i) => i.foundDate },
    { key: 'status', header: 'Status Klaim', align: 'center', render: (i) => <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${i.status === 'CLAIMED_BY_GUEST' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>{i.status === 'CLAIMED_BY_GUEST' ? `TERKLAIM (${i.claimedByGuestName})` : 'DISIMPAN DI SAFE'}</span> },
    {
      key: 'actions',
      header: 'Klaim Tamu',
      align: 'center',
      render: (i) => (
        i.status !== 'CLAIMED_BY_GUEST' ? (
          <button onClick={() => handleClaim(i.id)} className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[10px] cursor-pointer flex items-center gap-1 mx-auto">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Serahkan ke Tamu</span>
          </button>
        ) : (
          <span className="text-[10px] text-slate-400 font-mono italic">Verified Claimed</span>
        )
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Lost & Found Registry"
        icon={Package}
        iconBgColor="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        glossaryTitle="Glossary Lost & Found"
        glossaryItems={[
          { term: 'Lost & Found Registry', description: 'Pencatatan barang tercecer/tertinggal tamu di kamar atau area umum hotel dengan prosedur penyerahan terverifikasi.' }
        ]}
        actions={
          <button onClick={() => alert('Input Barang Temuan Baru')} className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer text-xs shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Catat Barang Temuan Baru</span>
          </button>
        }
      />

      <DataTable headerTitle="Registry Barang Tercecer / Tertinggal Tamu (Lost & Found)" columns={columns} data={items} keyExtractor={(i) => i.id} />
    </div>
  );
};
