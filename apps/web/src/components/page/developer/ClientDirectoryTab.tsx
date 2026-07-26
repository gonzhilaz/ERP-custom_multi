'use client';

import React, { useState } from 'react';
import { Building2, Plus, Key, CheckCircle2, Search, X, ShieldCheck } from 'lucide-react';
import { ClientParentCompany } from '@/lib/mock/developer';

interface Props {
  clients: ClientParentCompany[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  addClient: (client: Omit<ClientParentCompany, 'id' | 'clientCode' | 'joinedDate'>) => void;
  updateClientStatus: (clientId: string, status: ClientParentCompany['status']) => void;
}

export const ClientDirectoryTab = ({
  clients,
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  addClient,
  updateClientStatus
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industryGroup: 'Retail Bakery & FnB Chain',
    contactPerson: '',
    email: '',
    phone: '',
    subscriptionPlan: 'PROFESSIONAL' as ClientParentCompany['subscriptionPlan'],
    monthlyFee: 6500000,
    activeModulesCount: 6,
    totalTenantUnits: 2,
    totalBranches: 4,
    status: 'ACTIVE' as ClientParentCompany['status'],
    licenseKey: `SaaS-PRO-2026-${Math.floor(1000 + Math.random() * 9000)}-KEY`,
    validUntil: '2027-12-31'
  });

  const handleOpenCreate = () => {
    setFormData({
      companyName: '',
      industryGroup: 'Retail Bakery & FnB Chain',
      contactPerson: '',
      email: '',
      phone: '',
      subscriptionPlan: 'PROFESSIONAL',
      monthlyFee: 6500000,
      activeModulesCount: 6,
      totalTenantUnits: 2,
      totalBranches: 4,
      status: 'ACTIVE',
      licenseKey: `SaaS-PRO-2026-${Math.floor(1000 + Math.random() * 9000)}-KEY`,
      validUntil: '2027-12-31'
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email) return;

    addClient(formData);
    alert(`Klien Parent Company Baru [${formData.companyName}] Berhasil Terdaftar di SaaS Developer System!`);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-500" />
            <span>Direktori Klien Parent Company Holding ({clients.length})</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama holding / contact..."
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs font-semibold focus:outline-none"
            />
          </div>

          <button
            onClick={handleOpenCreate}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Klien Holding Baru</span>
          </button>
        </div>
      </div>

      {/* Main Client Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Kode Klien</th>
                <th className="py-3 px-4">Nama Parent Company & Industri</th>
                <th className="py-3 px-4">Contact Person & Email</th>
                <th className="py-3 px-4 text-center">Paket & Modul</th>
                <th className="py-3 px-4 text-right">Biaya Langganan</th>
                <th className="py-3 px-4 font-mono">License Key</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400">{c.clientCode}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{c.companyName}</div>
                    <div className="text-[11px] text-slate-400">{c.industryGroup}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold">{c.contactPerson}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{c.email}</div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-600 font-mono">
                      {c.subscriptionPlan} ({c.activeModulesCount} Modul)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Rp {c.monthlyFee.toLocaleString('id-ID')}/bln
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-500 truncate max-w-[150px]">
                    {c.licenseKey}
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

      {/* Modal Add Client */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-500" />
                <span>Pendaftaran Klien Holding Baru (SaaS Developer Level-1)</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Nama Perusahaan Holding Klien</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Mahkota Bakery & Culinary Group"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Contact Person (CEO/IT Dir)</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Bpk. Rayhan Prasetya"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Email Klien Corporate</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ceo@holding.co.id"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Paket SaaS Langganan</label>
                  <select
                    value={formData.subscriptionPlan}
                    onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold text-sky-600"
                  >
                    <option value="ENTERPRISE_UNLIMITED">ENTERPRISE UNLIMITED (All Modules)</option>
                    <option value="PROFESSIONAL">PROFESSIONAL (6 Modules)</option>
                    <option value="STARTER">STARTER (3 Modules)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-emerald-600">Biaya Langganan Bulanan</label>
                  <input
                    type="number"
                    required
                    value={formData.monthlyFee}
                    onChange={(e) => setFormData({ ...formData, monthlyFee: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Generated License Key</label>
                <input
                  type="text"
                  readOnly
                  value={formData.licenseKey}
                  className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-amber-600"
                />
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
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Daftarkan Klien Holding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
