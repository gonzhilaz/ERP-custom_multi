'use client';

import React, { useState } from 'react';
import { ShieldCheck, Plus, X, Trash2 } from 'lucide-react';
import { MOCK_APPROVAL_RULES, ApprovalHierarchyRule } from '@/lib/mock/approval';
import { useAuth } from '@/hooks/auth/useAuth';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';

export const ApprovalMatrixView = () => {
  const { user } = useAuth();
  const [rules, setRules] = useState<ApprovalHierarchyRule[]>(MOCK_APPROVAL_RULES);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    processName: '',
    moduleCategory: 'FINANCE_EXPENSE' as ApprovalHierarchyRule['moduleCategory'],
    evaluatorRole: 'FINANCE_STAFF',
    firstApproverRole: 'FINANCE_MANAGER',
    finalApproverRole: 'CFO',
    description: ''
  });

  const canManage = Boolean(user);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.processName) return;

    const newRule: ApprovalHierarchyRule = {
      id: `rule-${Date.now()}`,
      processName: formData.processName,
      moduleCategory: formData.moduleCategory,
      evaluatorRole: formData.evaluatorRole,
      firstApproverRole: formData.firstApproverRole,
      finalApproverRole: formData.finalApproverRole,
      description: formData.description || 'Custom workflow rule'
    };

    setRules([newRule, ...rules]);
    setShowModal(false);
    setFormData({
      processName: '',
      moduleCategory: 'FINANCE_EXPENSE',
      evaluatorRole: 'FINANCE_STAFF',
      firstApproverRole: 'FINANCE_MANAGER',
      finalApproverRole: 'CFO',
      description: ''
    });
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Universal Module Header */}
      <ModuleHeader
        title="Matriks Persetujuan"
        icon={ShieldCheck}
        iconBgColor="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        glossaryTitle="Glossary Approval Matrix"
        glossaryItems={[
          { term: 'Hirarki Approval', description: 'Konfigurasi hirarki persetujuan & wewenang transaksi multi-tenant.' },
          { term: 'Threshold Nominal', description: 'Batas nominal transaksi untuk menentukan level persetujuan manajerial.' }
        ]}
        actions={
          canManage ? (
            <button
              onClick={() => setShowModal(true)}
              className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Rule</span>
            </button>
          ) : undefined
        }
      />

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm relative group">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                {rule.moduleCategory}
              </span>
              {canManage && (
                <button
                  onClick={() => handleDelete(rule.id)}
                  className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                  title="Hapus Rule"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{rule.processName}</h4>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="text-[11px] text-slate-500">Pemohon / Staff: <span className="font-semibold text-slate-800 dark:text-slate-200">{rule.evaluatorRole}</span></div>
              <div className="text-[11px] text-slate-500">Approver Level 1: <span className="font-semibold text-sky-600">{rule.firstApproverRole}</span></div>
              <div className="text-[11px] text-slate-500">Final Approver: <span className="font-bold text-emerald-600">{rule.finalApproverRole}</span></div>
            </div>

            <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-100 dark:border-slate-800">
              {rule.description}
            </p>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-500" />
                <span>Tambah Workflow Rule Baru</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Proses / Transaksi</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Approval Diskon POS Resto > 15%"
                  value={formData.processName}
                  onChange={(e) => setFormData({ ...formData, processName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Kategori Modul</label>
                <select
                  value={formData.moduleCategory}
                  onChange={(e) => setFormData({ ...formData, moduleCategory: e.target.value as ApprovalHierarchyRule['moduleCategory'] })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold"
                >
                  <option value="FINANCE_EXPENSE">FINANCE</option>
                  <option value="PROCUREMENT_PO">PROCUREMENT</option>
                  <option value="HRD_PERFORMANCE">HRD PERFORMANCE</option>
                  <option value="HRD_LEAVES">HRD LEAVES</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Pemohon</label>
                  <input
                    type="text"
                    required
                    value={formData.evaluatorRole}
                    onChange={(e) => setFormData({ ...formData, evaluatorRole: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Approver 1</label>
                  <input
                    type="text"
                    required
                    value={formData.firstApproverRole}
                    onChange={(e) => setFormData({ ...formData, firstApproverRole: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Final Approver</label>
                  <input
                    type="text"
                    required
                    value={formData.finalApproverRole}
                    onChange={(e) => setFormData({ ...formData, finalApproverRole: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Deskripsi / Kriteria Threshold</label>
                <textarea
                  rows={2}
                  placeholder="Deskripsi batasan nominal / wewenang..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-500 shadow-sm"
                >
                  Simpan Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
