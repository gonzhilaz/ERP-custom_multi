'use client';

import React, { useState } from 'react';
import { Users, ShieldCheck, Percent, Clock, Plus, Trash2, HelpCircle, X, BookOpen, Briefcase } from 'lucide-react';
import { MOCK_WORKER_TYPES, WorkerTypeItem } from '@/lib/mock/hrd';
import { useAuth } from '@/hooks/auth/useAuth';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { DataTable, ColumnDef } from '@/components/ui/tables/DataTable';

export const HrdWorkerSettingsView = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'TYPES' | 'BPJS' | 'PPH' | 'OVERTIME_RULE'>('TYPES');
  const [workerTypes, setWorkerTypes] = useState<WorkerTypeItem[]>(MOCK_WORKER_TYPES);
  const [showGlossary, setShowGlossary] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Overtime Calculation Method Configuration State
  const [overtimeMethod, setOvertimeMethod] = useState<'UU_TENAGA_KERJA' | 'COMPANY_SPECIAL'>('UU_TENAGA_KERJA');
  const [companyOvertimeRate, setCompanyOvertimeRate] = useState(25000); // Rp 25.000 / jam

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'KONTRAK' as WorkerTypeItem['category'],
    expression: '',
    salaryCoa: '5-20100 - Beban Gaji Karyawan Tetap (PKWTT)'
  });

  const canMutate = (user?.systemRole as string) === 'COMPANY_ADMIN' || (user?.systemRole as string) === 'HOLDING_EXECUTIVE' || (user?.systemRole as string) === 'ADMIN';

  const subTabs: SubTabItem[] = [
    { id: 'TYPES', label: 'Tipe Pekerja', icon: Users, count: workerTypes.length },
    { id: 'BPJS', label: 'Persentase BPJS', icon: ShieldCheck },
    { id: 'PPH', label: 'Persentase PPh 21', icon: Percent },
    { id: 'OVERTIME_RULE', label: 'Aturan Perhitungan Lembur', icon: Clock }
  ];

  const handleCreateWorkerType = (e: React.FormEvent) => {
    e.preventDefault();
    const newType: WorkerTypeItem = {
      id: `wt-${Date.now()}`,
      code: formData.code || `WT-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      expression: formData.expression || '(Gaji Pokok + Tunjangan) - PPh21',
      salaryCoa: formData.salaryCoa
    };
    setWorkerTypes([...workerTypes, newType]);
    alert(`Tipe Pekerja [${formData.name}] Berhasil Didaftarkan!`);
    setIsModalOpen(false);
  };

  const handleSoftDeleteWorkerType = (id: string) => {
    if (confirm('Hapus Tipe Pekerja ini?')) {
      setWorkerTypes((prev) => prev.filter((w) => w.id !== id));
    }
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Aturan Pekerja</span>
          </h1>

          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-sky-500 transition-colors p-1 cursor-pointer"
              title="Informasi & Glossary Aturan Pekerja"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-96 p-4 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Glossary Aturan Pekerja & Formula Gaji</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Pusat pengaturan otomatisasi HRD: Tipe Pekerja, Persentase BPJS Kesehatan & Ketenagakerjaan, Skema PPh 21 TER 2026, serta Formula Otomatisasi Lembur (UU Tenaga Kerja PP 35 vs Tarif Khusus Perusahaan).
                </p>
              </div>
            )}
          </div>
        </div>

        {activeTab === 'TYPES' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tipe Pekerja</span>
          </button>
        )}
      </div>

      {/* SubTab Navigation */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={subTabs}
        colorScheme="sky"
      />

      {/* SubTab 1: Tipe Pekerja */}
      {activeTab === 'TYPES' && (
        <DataTable
          headerTitle={`Master Tipe Pekerja & Formula Gaji (${workerTypes.length})`}
          columns={[
            {
              key: 'name',
              header: 'Tipe Pekerja',
              render: (wt) => (
                <div>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span>{wt.name}</span>
                  </div>
                  <div className="font-mono text-[10px] text-slate-400 mt-0.5">{wt.code}</div>
                </div>
              )
            },
            {
              key: 'category',
              header: 'Kategori',
              align: 'center',
              render: (wt) => (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                  {wt.category}
                </span>
              )
            },
            { key: 'expression', header: 'Formula Kalkulasi Gaji', className: 'font-mono text-[11px] text-slate-600 dark:text-slate-300', render: (wt) => wt.expression },
            { key: 'salaryCoa', header: 'Akun COA Beban Gaji', className: 'font-mono text-[11px] text-sky-600 dark:text-sky-400 font-semibold', render: (wt) => wt.salaryCoa },
            {
              key: 'actions',
              header: 'Aksi',
              align: 'center',
              sortable: false,
              render: (wt) => (
                <button
                  onClick={() => handleSoftDeleteWorkerType(wt.id)}
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Hapus Tipe"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )
            }
          ]}
          data={workerTypes}
          keyExtractor={(wt) => wt.id}
        />
      )}

      {/* SubTab 2: Persentase BPJS */}
      {activeTab === 'BPJS' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-500" />
            <span>Persentase Potongan BPJS Kesehatan & Ketenagakerjaan</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 space-y-2">
              <div className="font-bold text-purple-900 dark:text-purple-200">BPJS Kesehatan (Total 5%)</div>
              <div className="text-[11px] text-purple-700 dark:text-purple-300">
                - Tanggungan Perusahaan: <strong>4.0%</strong><br />
                - Tanggungan Karyawan: <strong>1.0%</strong>
              </div>
            </div>
            <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800 space-y-2">
              <div className="font-bold text-sky-900 dark:text-sky-200">BPJS Ketenagakerjaan (JKK, JKM, JHT, JP)</div>
              <div className="text-[11px] text-sky-700 dark:text-sky-300">
                - Jaminan Kecelakaan Kerja (JKK): <strong>0.24% - 1.74%</strong><br />
                - Jaminan Kematian (JKM): <strong>0.30%</strong><br />
                - Jaminan Hari Tua (JHT): <strong>3.7% Perusahaan + 2.0% Karyawan</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: Persentase PPh 21 */}
      {activeTab === 'PPH' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Percent className="w-5 h-5 text-emerald-500" />
            <span>Skema Tarif Efektif Rata-Rata (PPh 21 TER Resmi 2026)</span>
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border text-xs space-y-2">
            <div className="font-bold">Kategori PTKP TER:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px]">
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border">TER Kategori A: TK/0, TK/1, K/0</div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border">TER Kategori B: TK/2, TK/3, K/1, K/2</div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border">TER Kategori C: K/3</div>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 4: Aturan Perhitungan Lembur (UU Tenaga Kerja vs Perusahaan) */}
      {activeTab === 'OVERTIME_RULE' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>Pengaturan Otomatisasi Formula Lembur</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Pilih metode perhitungan tarif lembur yang akan otomatis dikalkulasikan oleh Payroll Engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => setOvertimeMethod('UU_TENAGA_KERJA')}
              className={`p-5 rounded-3xl border-2 cursor-pointer transition-all space-y-3 ${
                overtimeMethod === 'UU_TENAGA_KERJA'
                  ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm text-slate-900 dark:text-white">Metode Standard UU Tenaga Kerja (PP 35/2021)</div>
                <input type="radio" checked={overtimeMethod === 'UU_TENAGA_KERJA'} onChange={() => {}} className="w-4 h-4 text-sky-600" />
              </div>
              <p className="text-[11px] text-slate-500">
                Formula resmi pemerintah: Jam Ke-1 (1.5x Upah Per Jam) • Jam Ke-2 dan seterusnya (2.0x Upah Per Jam). Upah per jam = 1/173 x Gaji Pokok.
              </p>
            </div>

            <div
              onClick={() => setOvertimeMethod('COMPANY_SPECIAL')}
              className={`p-5 rounded-3xl border-2 cursor-pointer transition-all space-y-3 ${
                overtimeMethod === 'COMPANY_SPECIAL'
                  ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-950/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm text-slate-900 dark:text-white">Metode Tarif Flat Khusus Perusahaan</div>
                <input type="radio" checked={overtimeMethod === 'COMPANY_SPECIAL'} onChange={() => {}} className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-[11px] text-slate-500">
                Perhitungan internal perusahaan menggunakan tarif flat konstan per jam lembur tanpa berpatokan pada rasio 1/173.
              </p>
              {overtimeMethod === 'COMPANY_SPECIAL' && (
                <div className="pt-2">
                  <label className="block font-semibold mb-1">Setel Nominal Flat Per Jam (Rp):</label>
                  <input
                    type="number"
                    value={companyOvertimeRate}
                    onChange={(e) => setCompanyOvertimeRate(Number(e.target.value))}
                    className="p-2 bg-white dark:bg-slate-900 rounded-xl border font-mono font-bold w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Worker Type */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-slate-900 dark:text-white text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-500" />
                <span>Tambah Tipe Pekerja & Rumus Gaji</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateWorkerType} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Kode Tipe Pekerja</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. WORKER-BORONGAN"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-sky-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nama Tipe Pekerja</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Pekerja Borongan Pabrik"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Ekspresi Rumus Kalkulasi Gaji</label>
                <input
                  type="text"
                  required
                  value={formData.expression}
                  onChange={(e) => setFormData({ ...formData, expression: e.target.value })}
                  placeholder="e.g. (Hasil Unit x Tarif Unit) - PPh21"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-purple-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold cursor-pointer shadow-sm">
                  Simpan Tipe Pekerja
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
