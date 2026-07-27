'use client';

import React, { useState } from 'react';
import { Plus, Search, LogOut, Trash2, Truck, User } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/button/PrimaryButton';
import { ActionButton } from '@/components/ui/button/ActionButton';
import { StatusBadge } from '@/components/ui/badge/StatusBadge';
import { GlossaryPopover } from '@/components/ui/popover/GlossaryPopover';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';
import { useSecurityOps } from '@/hooks/security/useSecurityOps';

export function SecurityOpsGateLogView() {
  const {
    gateLogs,
    searchQuery,
    setSearchQuery,
    selectedPassType,
    setSelectedPassType,
    checkInVisitor,
    checkOutVisitor,
    softDeleteGateLog
  } = useSecurityOps();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [driverName, setDriverName] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [passType, setPassType] = useState<'INBOUND_SUPPLIER' | 'OUTBOUND_HAULING' | 'VISITOR' | 'STAFF'>('VISITOR');
  const [branchLocation, setBranchLocation] = useState('Site East Borneo Facility (Berau)');
  const [gateOfficerName, setGateOfficerName] = useState('Satpam Agus (Pos 1)');

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehiclePlate || !driverName || !purpose) return;
    checkInVisitor({
      vehiclePlate,
      driverName,
      visitorName,
      purpose,
      passType,
      branchLocation,
      gateOfficerName
    });
    setVehiclePlate('');
    setDriverName('');
    setPurpose('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Gate Pass & Buku Tamu</h1>
          <GlossaryPopover
            title="Log Pintu Gerbang Pos Satpam"
            description="Pencatatan check-in/out supir truk hauling tambang, supir van armada catering, serta buku tamu VIP hotel."
          />
        </div>
        <PrimaryButton icon={Plus} label="Check-In Tamu / Truk" onClick={() => setIsModalOpen(true)} />
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Plat Nomor, Nama Supir, Kode Pass..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <SearchableSelect
            options={[
              { id: 'ALL', label: 'Semua Tipe Pass' },
              { id: 'INBOUND_SUPPLIER', label: 'Inbound Supplier' },
              { id: 'OUTBOUND_HAULING', label: 'Outbound Hauling Tambang' },
              { id: 'VISITOR', label: 'Tamu / Visitor' },
              { id: 'STAFF', label: 'Staff / Karyawan' }
            ]}
            value={selectedPassType}
            onChange={(val) => setSelectedPassType(val)}
            placeholder="Filter Tipe Pass"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="p-3">Kode Pass</th>
                <th className="p-3">Plat Nomor & Supir</th>
                <th className="p-3">Tipe Pass</th>
                <th className="p-3">Keperluan / Cargo Description</th>
                <th className="p-3">Waktu Masuk / Keluar</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {gateLogs.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-bold text-sky-600 dark:text-sky-400">{g.passCode}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900 dark:text-white">{g.vehiclePlate}</div>
                    <div className="text-[11px] text-slate-500">{g.driverName}</div>
                  </td>
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">{g.passType}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">{g.purpose}</td>
                  <td className="p-3 text-[11px] text-slate-500">
                    <div>Masuk: {g.checkInTime}</div>
                    <div>Keluar: {g.checkOutTime || '-'}</div>
                  </td>
                  <td className="p-3">
                    <StatusBadge type={g.status === 'INSIDE' ? 'WARNING' : 'ACTIVE'} label={g.status} />
                  </td>
                  <td className="p-3 text-right space-x-1">
                    {g.status === 'INSIDE' && (
                      <ActionButton icon={LogOut} label="Check-Out" onClick={() => checkOutVisitor(g.id)} />
                    )}
                    <button onClick={() => softDeleteGateLog(g.id)} className="p-1 text-slate-400 hover:text-red-500 transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Check-In Pintu Gerbang Baru</h3>
            <form onSubmit={handleCheckIn} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Plat Nomor Kendaraan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: KT 8821 MIN"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Nama Supir / Pengemudi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap supir"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Keperluan / Deskripsi Muatan Cargo *</label>
                <input
                  type="text"
                  required
                  placeholder="Jelaskan keperluan pengiriman atau kunjungan..."
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full mt-1 p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Tipe Pass Gerbang</label>
                <SearchableSelect
                  options={[
                    { id: 'INBOUND_SUPPLIER', label: 'Inbound Supplier' },
                    { id: 'OUTBOUND_HAULING', label: 'Outbound Hauling Tambang' },
                    { id: 'VISITOR', label: 'Tamu / Visitor' },
                    { id: 'STAFF', label: 'Staff / Karyawan' }
                  ]}
                  value={passType}
                  onChange={(val) => setPassType(val as any)}
                  placeholder="Pilih Tipe Pass"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <ActionButton icon={Trash2} label="Batal" onClick={() => setIsModalOpen(false)} />
                <PrimaryButton icon={Plus} label="Check-In Masuk" onClick={() => {}} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
