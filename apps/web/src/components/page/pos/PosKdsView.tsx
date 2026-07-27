'use client';

import React, { useState } from 'react';
import { Utensils, Clock, CheckCircle2, AlertCircle, ChefHat, Coffee, Wine, BedDouble, Filter, Flame } from 'lucide-react';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';

interface KitchenTicketItem {
  id: string;
  ticketNo: string;
  orderSource: 'ROOM_SERVICE' | 'RESTO_DINE_IN' | 'BANQUET_EVENT';
  sourceDetails: string; // e.g. "Kamar RM-204" or "Meja 08 - Outdoor"
  station: 'HOT_KITCHEN' | 'COLD_STATION' | 'BARISTA_BEVERAGE';
  items: { name: string; qty: number; notes?: string }[];
  elapsedMinutes: number;
  status: 'RECEIVED' | 'COOKING' | 'READY_FOR_SERVE';
  chefAssigned: string;
}

const INITIAL_KITCHEN_TICKETS: KitchenTicketItem[] = [
  {
    id: 'kds-01',
    ticketNo: 'TKT-2026-9912',
    orderSource: 'ROOM_SERVICE',
    sourceDetails: 'Kamar RM-204 (Bpk. Ir. Hendra)',
    station: 'HOT_KITCHEN',
    items: [
      { name: 'Nasi Goreng Buntut Alam Pakuan', qty: 2, notes: 'Pedas Sedang, Telur Ceplok Half-Cook' },
      { name: 'Sate Sapi Wagyu Ribeye (10 Tusuk)', qty: 1, notes: 'Bumbu Kacang Terpisah' }
    ],
    elapsedMinutes: 6,
    status: 'COOKING',
    chefAssigned: 'Chef Chef Juna (Hot Line)'
  },
  {
    id: 'kds-02',
    ticketNo: 'TKT-2026-9915',
    orderSource: 'RESTO_DINE_IN',
    sourceDetails: 'Meja 04 - Terrace Garden',
    station: 'BARISTA_BEVERAGE',
    items: [
      { name: 'Ice Hazelnut Latte Espressone', qty: 2, notes: 'Less Ice, Oat Milk' },
      { name: 'Fresh Avocado Juice Float', qty: 1, notes: 'No Sugar Added' }
    ],
    elapsedMinutes: 3,
    status: 'RECEIVED',
    chefAssigned: 'Barista Fajar'
  },
  {
    id: 'kds-03',
    ticketNo: 'TKT-2026-9918',
    orderSource: 'BANQUET_EVENT',
    sourceDetails: 'Grand Ballroom - Gala MICE',
    station: 'COLD_STATION',
    items: [
      { name: 'Caesar Salad Grilled Chicken', qty: 10, notes: 'Dressing Extra Mayo' },
      { name: 'Slice Fruit Platter Deluxe', qty: 5, notes: 'Semangka, Melon, Anggur' }
    ],
    elapsedMinutes: 12,
    status: 'COOKING',
    chefAssigned: 'Chef Ratna (Pantry Cold)'
  }
];

export const PosKdsView = () => {
  const [tickets, setTickets] = useState<KitchenTicketItem[]>(INITIAL_KITCHEN_TICKETS);
  const [activeStation, setActiveStation] = useState<'ALL' | 'HOT_KITCHEN' | 'COLD_STATION' | 'BARISTA_BEVERAGE'>('ALL');

  const subTabs: SubTabItem[] = [
    { id: 'ALL', label: 'Semua Tiket Dapur', icon: ChefHat, count: tickets.length },
    { id: 'HOT_KITCHEN', label: 'Stasiun Hot Line (Dapur Utama)', icon: Flame, count: tickets.filter(t => t.station === 'HOT_KITCHEN').length },
    { id: 'COLD_STATION', label: 'Cold Station (Salad & Dessert)', icon: Utensils, count: tickets.filter(t => t.station === 'COLD_STATION').length },
    { id: 'BARISTA_BEVERAGE', label: 'Barista & Minuman', icon: Coffee, count: tickets.filter(t => t.station === 'BARISTA_BEVERAGE').length }
  ];

  const handleUpdateStatus = (id: string, nextStatus: KitchenTicketItem['status']) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, status: nextStatus } : t)));
  };

  const handleCompleteTicket = (id: string) => {
    setTickets(tickets.filter((t) => t.id !== id));
    alert('Pesanan Dapur Selesai & Notifikasi Pelayan/Room Service Terkirim!');
  };

  const filteredTickets = tickets.filter((t) => activeStation === 'ALL' || t.station === activeStation);

  return (
    <div className="space-y-4 text-xs">
      <ModuleHeader
        title="Kitchen Display"
        icon={ChefHat}
        iconBgColor="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        glossaryTitle="Glossary KDS Dapur & Restoran"
        glossaryItems={[
          { term: 'Kitchen Display System (KDS)', description: 'Layar monitor dapur real-time pengganti kertas bon untuk pelacakan durasi masak & koordinasi Chef.' },
          { term: 'Room Service Order Sync', description: 'Pesanan makanan dari kamar hotel yang otomatis masuk ke layar KDS Dapur Utama.' }
        ]}
        badges={[
          { label: `${tickets.length} Active Tickets Queue`, variant: 'amber' },
          { label: 'Avg Prep Time: 11 Min', variant: 'emerald' }
        ]}
      />

      <SubTabNav
        activeTab={activeStation}
        onTabChange={(t) => setActiveStation(t as any)}
        tabs={subTabs}
      />

      {/* Ticket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredTickets.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-3xl border-2 space-y-3 transition-all shadow-sm ${
              t.elapsedMinutes > 10
                ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-400'
                : t.status === 'COOKING'
                ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-400'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }`}
          >
            {/* Header Ticket */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div>
                <span className="font-mono font-bold text-sky-600 dark:text-sky-400">{t.ticketNo}</span>
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                  {t.orderSource === 'ROOM_SERVICE' && <BedDouble className="w-3.5 h-3.5 text-amber-500" />}
                  <span>{t.sourceDetails}</span>
                </h4>
              </div>
              <div className="text-right">
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                  t.elapsedMinutes > 10 ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                  ⏱️ {t.elapsedMinutes} Min
                </span>
              </div>
            </div>

            {/* Item List */}
            <div className="space-y-2 py-1">
              {t.items.map((item, idx) => (
                <div key={idx} className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700/60">
                  <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                    <span>{item.qty}x {item.name}</span>
                  </div>
                  {item.notes && (
                    <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">
                      Catatan: {item.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer Action Status */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                <span>Chef: {t.chefAssigned}</span>
                <span className="font-bold text-amber-600">{t.status}</span>
              </div>

              {t.status === 'RECEIVED' ? (
                <button
                  onClick={() => handleUpdateStatus(t.id, 'COOKING')}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  🔥 Mulai Memasak (Cooking)
                </button>
              ) : t.status === 'COOKING' ? (
                <button
                  onClick={() => handleUpdateStatus(t.id, 'READY_FOR_SERVE')}
                  className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  🔔 Makanan Siap Disajikan!
                </button>
              ) : (
                <button
                  onClick={() => handleCompleteTicket(t.id)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesai Disajikan & Tutup Tiket</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

