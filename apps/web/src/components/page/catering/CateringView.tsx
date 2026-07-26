'use client';

import React, { useState } from 'react';
import { Utensils, Truck, Plus, CheckCircle2, X } from 'lucide-react';
import { useCatering } from '@/hooks/catering/useCatering';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { CateringContract } from '@/lib/mock/catering';

export const CateringView = () => {
  const [activeTab, setActiveTab] = useState<'CONTRACTS' | 'DELIVERIES' | 'CASUAL_WORKERS' | 'CAMP_BOSS'>('CONTRACTS');
  const { contracts, deliveries, addContract, updateDeliveryStatus } = useCatering();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    eventName: '',
    contractStartDate: '2026-08-01',
    contractEndDate: '2026-12-31',
    portionCountPerDay: 500,
    pricePerPortion: 40000,
    totalContractValue: 600000000,
    status: 'ACTIVE' as CateringContract['status']
  });

  const subTabs: SubTabItem[] = [
    { id: 'CONTRACTS', label: 'Kontrak Katering Massal', icon: Utensils, count: contracts.length },
    { id: 'DELIVERIES', label: 'Jadwal Delivery', icon: Truck, count: deliveries.length },
    { id: 'CASUAL_WORKERS', label: 'Daily Worker (DW) Banquet', icon: Utensils },
    { id: 'CAMP_BOSS', label: 'Camp Boss & EDR Mess Hall', icon: Utensils }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.eventName) return;

    addContract(formData);
    alert(`Kontrak Katering Massal Baru [${formData.eventName}] Berhasil Diterbitkan!`);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              Katering Massal
            </h1>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Kontrak Katering</span>
        </button>
      </div>

      {/* SubTab Navigation */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab as any}
        tabs={subTabs}
        colorScheme="emerald"
      />

      {/* Dynamic Content */}
      {activeTab === 'CONTRACTS' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Kode Kontrak</th>
                  <th className="py-3 px-4">Klien & Acara</th>
                  <th className="py-3 px-4">Masa Berlaku</th>
                  <th className="py-3 px-4 text-center">Porsi / Hari</th>
                  <th className="py-3 px-4 text-right">Harga Porsi</th>
                  <th className="py-3 px-4 text-right font-bold text-emerald-600">Total Nilai Kontrak</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {contracts.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{c.contractCode}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{c.eventName}</div>
                      <div className="text-[11px] text-slate-400">{c.clientName}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {c.contractStartDate} s/d {c.contractEndDate}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-sky-600">
                      {c.portionCountPerDay.toLocaleString('id-ID')} Porsi
                    </td>
                    <td className="py-3 px-4 text-right font-mono">
                      Rp {c.pricePerPortion.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                      Rp {c.totalContractValue.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'DELIVERIES' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Kode Dispatch</th>
                  <th className="py-3 px-4">Lokasi Tujuan & Waktu</th>
                  <th className="py-3 px-4 text-center">Jumlah Porsi Box</th>
                  <th className="py-3 px-4">Driver & Armada Truck</th>
                  <th className="py-3 px-4 text-center">Status Kirim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {deliveries.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-mono font-bold text-sky-600">{d.dispatchCode}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{d.destinationLocation}</div>
                      <div className="text-[10px] text-amber-600 font-mono font-bold">{d.deliveryTime}</div>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-emerald-600 text-sm">
                      {d.portionQuantity} Box
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold">{d.driverName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{d.vehiclePlate}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => updateDeliveryStatus(d.id, 'DELIVERED')}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                          d.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-600 text-white hover:bg-sky-500'
                        }`}
                      >
                        {d.status === 'DELIVERED' ? '✓ DELIVERED' : 'Mark Delivered'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'CASUAL_WORKERS' && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Daily Worker (DW) / Casual Staff Payroll Banquet & Event</h3>
            <button onClick={() => alert('Pekerja Harian Lepas (Daily Worker) Baru Berhasil Didaftarkan!')} className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1 cursor-pointer">
              <Plus className="w-4 h-4" />
              <span>Tambah Daily Worker (DW)</span>
            </button>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">BANQUET_SERVER</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Rian Hidayat (Casual Staff)</h4>
              <div className="text-slate-500 text-xs">Event: <strong>Banquet Royal Wedding (500 Pax)</strong></div>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-emerald-600 text-sm">Rp 200.000 / Shift</div>
              <span className="text-[10px] text-slate-400 font-bold">PAID (Harian)</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'CAMP_BOSS' && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Camp Boss & Kantin Karyawan (EDR) Mess Hall Headcount</h3>
            <button onClick={() => alert('Scan Barcode NIK Karyawan Makan Berhasil!')} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl flex items-center gap-1 cursor-pointer">
              <Utensils className="w-4 h-4" />
              <span>Scan NIK Makan Headcount</span>
            </button>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div>
              <span className="font-mono font-bold text-sky-600">NIK-2026-8801</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Rudi Operator Heavy Fleet</h4>
              <div className="text-slate-500 text-xs">Lokasi Kantin: <strong>Mess Hall Site Pit East #01 (LUNCH)</strong></div>
            </div>
            <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              VERIFIED HEADCOUNT
            </span>
          </div>
        </div>
      )}

      {/* Modal Add Contract */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-500" />
                <span>Penerbitan Kontrak Katering Massal Baru</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Nama Klien Corporate / Perusahaan</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. PT Freeport Indonesia / PT Indofood"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Judul Project Katering</label>
                <input
                  type="text"
                  required
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  placeholder="e.g. Katering Massal Mess Karyawan Site"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Jumlah Porsi / Hari</label>
                  <input
                    type="number"
                    required
                    value={formData.portionCountPerDay}
                    onChange={(e) => setFormData({ ...formData, portionCountPerDay: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sky-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Harga Per Porsi (Rp)</label>
                  <input
                    type="number"
                    required
                    value={formData.pricePerPortion}
                    onChange={(e) => setFormData({ ...formData, pricePerPortion: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Terbitkan Kontrak Katering
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
