'use client';

import React, { useState } from 'react';
import { Key, Copy, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { LicenseKeyItem } from '@/lib/mock/developer';

interface Props {
  licenseKeys: LicenseKeyItem[];
  generateNewLicenseKey: (clientName: string, plan: string) => string;
}

export const LicenseGeneratorTab = ({ licenseKeys, generateNewLicenseKey }: Props) => {
  const [clientName, setClientName] = useState('');
  const [plan, setPlan] = useState('ENTERPRISE_UNLIMITED');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName) return;

    const key = generateNewLicenseKey(clientName, plan);
    setGeneratedKey(key);
  };

  const handleCopy = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Tool Banner */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">License Generator</h2>
          </div>
        </div>

        {/* Generator Form */}
        <form onSubmit={handleGenerate} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block font-semibold mb-1">Nama Klien Parent Company</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Mahkota Bakery & Culinary Group"
              className="w-full p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Paket SaaS Langganan</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 font-bold text-sky-600"
            >
              <option value="ENTERPRISE_UNLIMITED">ENTERPRISE UNLIMITED (All Modules)</option>
              <option value="PROFESSIONAL">PROFESSIONAL (6 Modules)</option>
              <option value="STARTER">STARTER (3 Modules)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Lisensi Kunci</span>
          </button>
        </form>

        {/* Output Generated Key Box */}
        {generatedKey && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2 animate-in fade-in duration-200">
            <div className="flex justify-between items-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Lisensi Kunci Berhasil Terbuat!</span>
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{isCopied ? 'Tersalin!' : 'Copy License Key'}</span>
              </button>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-emerald-500/30 font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
              {generatedKey}
            </div>
          </div>
        )}
      </div>

      {/* Generated License Keys History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
          Riwayat Kunci Lisensi Terdaftar ({licenseKeys.length})
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-4">License Key String</th>
                <th className="py-2.5 px-4">Nama Klien Target</th>
                <th className="py-2.5 px-4">Paket Plan</th>
                <th className="py-2.5 px-4">Masa Berlaku</th>
                <th className="py-2.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {licenseKeys.map((lic) => (
                <tr key={lic.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-2.5 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">{lic.licenseKey}</td>
                  <td className="py-2.5 px-4 font-bold">{lic.clientName}</td>
                  <td className="py-2.5 px-4 font-mono font-semibold text-sky-600">{lic.plan}</td>
                  <td className="py-2.5 px-4 font-mono text-[11px] text-slate-400">{lic.issuedDate} s/d {lic.expiryDate}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      lic.status === 'ACTIVATED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {lic.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
