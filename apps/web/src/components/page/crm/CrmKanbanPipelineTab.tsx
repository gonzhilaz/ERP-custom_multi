'use client';

import React, { useState } from 'react';
import { Users, Plus, ArrowRight, CheckCircle2, X, DollarSign } from 'lucide-react';
import { CrmDealItem } from '@/lib/mock/crm';

interface Props {
  deals: CrmDealItem[];
  moveDealStage: (id: string, stage: CrmDealItem['stage']) => void;
  addDeal: (deal: Omit<CrmDealItem, 'id' | 'dealCode'>) => void;
}

export const CrmKanbanPipelineTab = ({ deals, moveDealStage, addDeal }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    dealTitle: '',
    dealValue: 50000000,
    stage: 'LEAD' as CrmDealItem['stage'],
    probabilityPct: 50,
    expectedCloseDate: '2026-08-30',
    ownerName: 'Sales Executive B2B'
  });

  const stages: { key: CrmDealItem['stage']; label: string; color: string }[] = [
    { key: 'LEAD', label: '1. Lead & Inquiry', color: 'border-slate-300 bg-slate-100 text-slate-800' },
    { key: 'PROPOSAL', label: '2. Proposal Sent', color: 'border-sky-300 bg-sky-100 text-sky-800' },
    { key: 'NEGOTIATION', label: '3. Negotiation', color: 'border-amber-300 bg-amber-100 text-amber-800' },
    { key: 'CLOSED_WON', label: '4. Closed Won 🎉', color: 'border-emerald-300 bg-emerald-100 text-emerald-800' }
  ];

  const handleOpenCreate = () => {
    setFormData({
      clientName: '',
      dealTitle: '',
      dealValue: 50000000,
      stage: 'LEAD',
      probabilityPct: 50,
      expectedCloseDate: '2026-08-30',
      ownerName: 'Sales Executive B2B'
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.dealTitle) return;

    addDeal(formData);
    alert(`Peluang B2B Deal [${formData.dealTitle}] Berhasil Ditambahkan ke Pipeline!`);
    setShowModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-500" />
            <span>Sales Pipeline</span>
          </h2>
          <p className="text-[11px] text-slate-500">
            Pelacakan peluang bisnis B2B dari Prospek Awal hingga Kontrak Terbit (Closed Won).
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Peluang Deal Baru</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {stages.map((stg) => {
          const stageDeals = deals.filter((d) => d.stage === stg.key);
          const stageTotalValue = stageDeals.reduce((acc, curr) => acc + curr.dealValue, 0);

          return (
            <div key={stg.key} className="bg-slate-100 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${stg.color}`}>
                    {stg.label} ({stageDeals.length})
                  </span>
                  <span className="font-mono text-[10px] font-bold text-slate-600 dark:text-slate-400">
                    Rp {Math.round(stageTotalValue / 1000000)}M
                  </span>
                </div>

                {stageDeals.map((deal) => (
                  <div key={deal.id} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-sky-600 dark:text-sky-400 font-bold">{deal.dealCode}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                        {deal.probabilityPct}% Prob
                      </span>
                    </div>

                    <div className="font-bold text-slate-900 dark:text-white line-clamp-2">{deal.dealTitle}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{deal.clientName}</div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-600 text-xs">
                        Rp {deal.dealValue.toLocaleString('id-ID')}
                      </span>

                      {deal.stage !== 'CLOSED_WON' && (
                        <button
                          onClick={() => {
                            const nextStage: CrmDealItem['stage'] =
                              deal.stage === 'LEAD' ? 'PROPOSAL' : deal.stage === 'PROPOSAL' ? 'NEGOTIATION' : 'CLOSED_WON';
                            moveDealStage(deal.id, nextStage);
                          }}
                          className="p-1 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-lg cursor-pointer transition-colors"
                          title="Pindahkan ke Tahap Berikutnya"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add Deal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-500" />
                <span>Tambah Peluang B2B Deal Baru</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Nama Perusahaan Klien B2B</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. PT Indofood / Freeport Corporate"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Judul Peluang Project / Kontrak</label>
                <input
                  type="text"
                  required
                  value={formData.dealTitle}
                  onChange={(e) => setFormData({ ...formData, dealTitle: e.target.value })}
                  placeholder="e.g. Kontrak Supply Roti Tawar 5.000 Pack/Bulan"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-emerald-600">Estimasi Nilai Deal (Rp)</label>
                  <input
                    type="number"
                    required
                    value={formData.dealValue}
                    onChange={(e) => setFormData({ ...formData, dealValue: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Tahap Awal Pipeline</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 font-bold text-sky-600"
                  >
                    <option value="LEAD">1. Lead & Inquiry</option>
                    <option value="PROPOSAL">2. Proposal Sent</option>
                    <option value="NEGOTIATION">3. Negotiation</option>
                    <option value="CLOSED_WON">4. Closed Won</option>
                  </select>
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
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold shadow-sm transition-all cursor-pointer"
                >
                  Simpan Deal Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
