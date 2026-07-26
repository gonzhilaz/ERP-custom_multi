'use client';

import React, { useState } from 'react';
import { Building2, Upload, CheckCircle2, Globe, Mail, Phone, ShieldCheck, Palette, Image as ImageIcon } from 'lucide-react';
import { ParentCompanyProfile } from '@/lib/mock/settings';

interface Props {
  profile: ParentCompanyProfile;
  updateProfile: (updated: Partial<ParentCompanyProfile>) => void;
}

export const ParentCompanyProfileTab = ({ profile, updateProfile }: Props) => {
  const [formData, setFormData] = useState<ParentCompanyProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl border border-sky-800/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold text-lg shrink-0">
            {formData.logoUrl ? (
              <img src={formData.logoUrl} alt="Company Logo" className="w-full h-full object-contain rounded-xl" />
            ) : (
              <Building2 className="w-6 h-6" />
            )}
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>{formData.companyName}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 font-mono">
                White-Label Active
              </span>
            </h2>
            <p className="text-[11px] text-slate-300">{formData.brandTagline}</p>
          </div>
        </div>

        {isSaved && (
          <div className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Profil Holding Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      {/* Main Profile & Branding Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-500" />
            <span>Profil Company</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Nama Parent Company / Perusahaan Holding</label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Tagline & Deskripsi Singkat Perusahaan</label>
            <input
              type="text"
              value={formData.brandTagline}
              onChange={(e) => setFormData({ ...formData, brandTagline: e.target.value })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
            />
          </div>
        </div>

        {/* Logo URL & Image Preview */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
          <label className="block font-semibold flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-sky-500" />
            <span>URL Custom Logo Perusahaan (White-Label Branding)</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="url"
              value={formData.logoUrl || ''}
              onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              placeholder="https://example.com/logo-holding.png"
              className="flex-1 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 font-mono text-[11px]"
            />
            {formData.logoUrl && (
              <div className="w-9 h-9 p-1 bg-white dark:bg-slate-900 border rounded-lg shrink-0 flex items-center justify-center">
                <img src={formData.logoUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
              </div>
            )}
          </div>
          <p className="text-[10px] text-slate-400">
            Format yang disarankan: PNG transparan atau SVG (Max tinggi 40px). Logo ini akan menggantikan brand header default di Sidebar.
          </p>
        </div>

        {/* Address & Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block font-semibold mb-1">Alamat Head Office (Pusat)</label>
            <input
              type="text"
              required
              value={formData.headOfficeAddress}
              onChange={(e) => setFormData({ ...formData, headOfficeAddress: e.target.value })}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Kota / Kabupaten</label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-semibold mb-1">No. Telepon Perusahaan</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-semibold"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email Corporate</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sky-600 dark:text-sky-400">Nomor NPWP Perusahaan</label>
            <input
              type="text"
              value={formData.taxId}
              onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
              className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sky-600"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-md transition-all cursor-pointer"
          >
            Simpan Perubahan Profil Holding
          </button>
        </div>
      </form>
    </div>
  );
};
