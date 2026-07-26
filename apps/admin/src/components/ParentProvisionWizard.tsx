'use client';

import React from 'react';
import { Building2, Layers, ShieldCheck, Server, Sparkles, CheckCircle2, Copy } from 'lucide-react';
import { ParentProvisioningForm } from '../hooks/useAdminProvisioner';

interface Props {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: ParentProvisioningForm;
  setFormData: (data: ParentProvisioningForm) => void;
  generatedDockerYaml: string | null;
  submitProvisioning: () => void;
}

export const ParentProvisionWizard = ({
  currentStep,
  setCurrentStep,
  formData,
  setFormData,
  generatedDockerYaml,
  submitProvisioning
}: Props) => {
  const steps = [
    { num: 1, label: '1. Profil & Subdomain Parent', icon: Building2 },
    { num: 2, label: '2. Lisensi Modul SaaS', icon: Layers },
    { num: 3, label: '3. Admin & Auto-Seed Templates', icon: ShieldCheck },
    { num: 4, label: '4. VPS Deploy & Docker Script', icon: Server }
  ];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      submitProvisioning();
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-5 text-xs">
      {/* Wizard Step Navigation Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {steps.map((s) => (
          <div
            key={s.num}
            onClick={() => setCurrentStep(s.num)}
            className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-all ${
              currentStep === s.num
                ? 'bg-sky-600 text-white border-sky-400 font-bold shadow-md'
                : currentStep > s.num
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 font-semibold'
                : 'bg-slate-800/60 text-slate-400 border-slate-700'
            }`}
          >
            <s.icon className="w-4 h-4 shrink-0" />
            <span className="truncate">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Step 1: Parent Company Profile */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
            Langkah 1: Identitas & Subdomain Parent Company (Holding)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Nama Perusahaan Holding Parent</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Mahkota Bakery & Culinary Group"
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">Subdomain Klien ERP Dedicated</label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  required
                  value={formData.subdomain}
                  onChange={(e) => setFormData({ ...formData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                  placeholder="mahkota"
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono font-bold text-sky-400 focus:outline-none"
                />
                <span className="font-mono text-slate-400 font-bold shrink-0">.yourbrand-erp.com</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">URL Logo Perusahaan Parent</label>
              <input
                type="text"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-slate-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">NPWP / Pajak Corporate</label>
              <input
                type="text"
                value={formData.taxIdNpwp}
                onChange={(e) => setFormData({ ...formData, taxIdNpwp: e.target.value })}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-slate-300 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Selected Modules */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
            Langkah 2: Paket Langganan & Aktivasi Modul Terpilih
          </h3>

          <div className="space-y-2">
            <label className="block font-semibold text-slate-300">Pilih Paket Subscription</label>
            <select
              value={formData.subscriptionPlan}
              onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value as any })}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl font-bold text-sky-400 focus:outline-none"
            >
              <option value="ENTERPRISE_UNLIMITED">ENTERPRISE UNLIMITED (Seluruh Modul Aktif)</option>
              <option value="PROFESSIONAL">PROFESSIONAL (6 Modul Utama)</option>
              <option value="STARTER">STARTER (3 Modul Operasional)</option>
            </select>
          </div>
        </div>
      )}

      {/* Step 3: Admin & Seeding Templates */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
            Langkah 3: Inisialisasi User Admin Pertama & Auto-Seeding Template
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">Nama Admin IT Klien Pertama</label>
              <input
                type="text"
                required
                value={formData.initialAdminName}
                onChange={(e) => setFormData({ ...formData, initialAdminName: e.target.value })}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl font-bold text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">Email Admin Klien Pertama</label>
              <input
                type="email"
                required
                value={formData.initialAdminEmail}
                onChange={(e) => setFormData({ ...formData, initialAdminEmail: e.target.value })}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl font-bold text-sky-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl space-y-1.5">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Otomatisasi Seeding Template Awal (1st Time Onboarding):</span>
            </div>
            <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5 pl-2">
              <li>Membuat Database Schema terisolasi: <strong className="font-mono text-amber-400">tenant_{formData.subdomain || 'company'}</strong></li>
              <li>Menanamkan Template Role Bawaan (*Holding Exec, Baker Master, Cashier, Site Engineer*)</li>
              <li>Menanamkan Gudang Utama (`WH-MAIN`) & Gudang Display (`WH-RTL-DISPLAY`)</li>
              <li>Menanamkan Chart of Accounts (COA) Standar Akuntansi</li>
            </ul>
          </div>
        </div>
      )}

      {/* Step 4: VPS Deploy & Docker Script */}
      {currentStep === 4 && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
            Langkah 4: Konfigurasi VPS Host Server & Docker Compose Script
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-300">IP Address Server VPS Klien</label>
              <input
                type="text"
                required
                value={formData.vpsIpAddress}
                onChange={(e) => setFormData({ ...formData, vpsIpAddress: e.target.value })}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono font-bold text-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-300">SSH Port</label>
              <input
                type="number"
                value={formData.vpsSshPort}
                onChange={(e) => setFormData({ ...formData, vpsSshPort: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono font-bold text-white focus:outline-none"
              />
            </div>
          </div>

          {generatedDockerYaml && (
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-sky-400 font-bold">
                <span>docker-compose.yml Generated Script:</span>
              </div>
              <pre className="p-3 bg-slate-900 rounded-xl font-mono text-[10px] text-emerald-400 overflow-x-auto">
                {generatedDockerYaml}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Next / Prev Action Buttons */}
      <div className="flex justify-between items-center pt-2 border-t border-slate-800">
        <button
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(currentStep - 1)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold disabled:opacity-50 cursor-pointer"
        >
          Kembali
        </button>

        <button
          onClick={handleNextStep}
          className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>{currentStep === 4 ? '🚀 Provision & Deploy Parent VPS' : 'Langkah Berikutnya'}</span>
        </button>
      </div>
    </div>
  );
};
