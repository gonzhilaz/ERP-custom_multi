'use client';

import React, { useState } from 'react';
import { FileText, Plus, ShieldCheck, HelpCircle, X, AlertTriangle, Truck, ShieldAlert } from 'lucide-react';
import { MOCK_LEGAL_DOCUMENTS, LegalDocumentItem } from '@/lib/mock/managerial';
import { SearchableSelect } from '@/components/ui/dropdowns/SearchableSelect';

export const ManagerialDmsView = () => {
  const [documents, setDocuments] = useState<LegalDocumentItem[]>(MOCK_LEGAL_DOCUMENTS);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [showGlossary, setShowGlossary] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: '',
    documentNumber: '',
    category: 'Logistik & Fleet (KIR)',
    unitUsaha: 'PT Borneo Mining Emas',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: '2027-08-15'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    const newDoc: LegalDocumentItem = {
      id: `doc-${Date.now()}`,
      documentNumber: form.documentNumber || `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: form.title,
      category: form.category,
      unitUsaha: form.unitUsaha,
      issueDate: form.issueDate,
      expiryDate: form.expiryDate,
      status: 'VALID'
    };

    setDocuments([newDoc, ...documents]);
    alert(`Dokumen Perizinan [${form.title}] Berhasil Ditambahkan ke Legal Vault!`);
    setShowModal(false);
    setForm({
      title: '',
      documentNumber: '',
      category: 'Logistik & Fleet (KIR)',
      unitUsaha: 'PT Borneo Mining Emas',
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: '2027-08-15'
    });
  };

  const filteredDocs = filterCategory === 'ALL'
    ? documents
    : filterCategory === 'FLEET'
    ? documents.filter((d) => d.category.includes('Logistik') || d.category.includes('STNK') || d.category.includes('KIR') || d.category.includes('B3'))
    : documents.filter((d) => !d.category.includes('Logistik') && !d.category.includes('STNK') && !d.category.includes('KIR') && !d.category.includes('B3'));

  const expiringCount = documents.filter((d) => d.status === 'EXPIRING_SOON').length;

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>DMS Legal</span>
          </h1>

          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-purple-500 transition-colors p-1 cursor-pointer"
              title="Informasi Vault Perizinan Legal & Logistik"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-purple-400">
                  <span>Legal & Fleet License Vault</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>Fleet & Logistics Permits</strong>: Pemantauan otomatis Uji KIR Dishub (per 6 bulan), STNK Armada Truk, & Izin Angkutan B3.
                </p>
                <p className="text-[11px] text-slate-300">
                  - <strong>Corporate Licenses</strong>: Vault dokumen IUP Pertambangan, Halal BPOM, & Sertifikat HGB/Legalitas Perusahaan.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <div className="w-64">
            <SearchableSelect
              options={[
                { id: 'ALL', label: 'Semua Perizinan' },
                { id: 'FLEET', label: '🚚 Armada & Logistik (KIR/STNK/B3)' },
                { id: 'CORPORATE', label: '🏢 Perizinan Usaha (IUP/Halal)' }
              ]}
              value={filterCategory}
              onChange={(val) => setFilterCategory(val)}
              placeholder="Pilih Category Perizinan..."
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Perizinan</span>
          </button>
        </div>
      </div>

      {/* Expiring Warning Banner */}
      {expiringCount > 0 && (
        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900/60 flex items-center gap-3 text-xs">
          <div className="p-2 bg-amber-500 text-white rounded-xl shrink-0">
            <AlertTriangle className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-amber-900 dark:text-amber-300">Peringatan Perizinan Expiring (H-60 Alert):</span>
            <p className="text-[11px] text-amber-700 dark:text-amber-400">
              Terdapat <strong>{expiringCount} dokumen perizinan/KIR armada logistik</strong> yang mendekati masa kadaluarsa dalam 30–60 hari ke depan. Harap koordinasi dengan Tim GA / Legal untuk perpanjangan.
            </p>
          </div>
        </div>
      )}

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm relative">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1 ${
                doc.category.includes('Logistik') || doc.category.includes('STNK') || doc.category.includes('KIR')
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                  : 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
              }`}>
                {doc.category.includes('KIR') || doc.category.includes('STNK') ? <Truck className="w-3 h-3" /> : null}
                <span>{doc.category}</span>
              </span>
              <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">{doc.documentNumber}</span>
            </div>

            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{doc.title}</h4>
            <div className="text-xs text-slate-500">Unit Usaha: <span className="font-semibold text-slate-800 dark:text-slate-200">{doc.unitUsaha}</span></div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Masa Berlaku: {doc.issueDate} s/d <strong className="text-slate-900 dark:text-white">{doc.expiryDate}</strong></span>
              {doc.status === 'VALID' ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> VALID
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 animate-pulse">
                  <ShieldAlert className="w-3.5 h-3.5" /> EXPIRING SOON
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Upload Perizinan */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-white dark:bg-slate-900 w-full max-w-md p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Form Upload Perizinan Armada & Legal</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Judul Dokumen Perizinan:</label>
                <input type="text" placeholder="misal: Uji Berkala KIR Truk Tronton B 9122 UXX" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Kategori Perizinan:</label>
                <SearchableSelect
                  value={form.category}
                  onChange={(val) => setForm({ ...form, category: val })}
                  options={[
                    { id: 'Logistik & Fleet (KIR)', label: '🚚 Logistik & Fleet (Uji KIR Dishub)' },
                    { id: 'Logistik & Fleet (STNK)', label: '🚚 Logistik & Fleet (STNK & Pajak Truk)' },
                    { id: 'Izin Angkutan B3', label: '🚚 Izin Transportasi & Angkutan B3' },
                    { id: 'Izin Usaha Tambang (IUP)', label: '⛏️ Izin Usaha Tambang (IUP)' },
                    { id: 'Izin Halal & BPOM', label: '🍳 Izin Halal & BPOM Resto/Catering' }
                  ]}
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Nomor Dokumen / Lisensi:</label>
                <input type="text" placeholder="misal: KIR-DISHUB-2026-081" value={form.documentNumber} onChange={(e) => setForm({ ...form, documentNumber: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Tanggal Terbit:</label>
                  <input type="date" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Tanggal Expire:</label>
                  <input type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-md cursor-pointer">
              Simpan Ke Legal Vault
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
