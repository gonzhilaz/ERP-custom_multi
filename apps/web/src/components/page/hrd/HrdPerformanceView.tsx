'use client';

import React, { useState } from 'react';
import { Award, Star, Edit, X } from 'lucide-react';
import { MOCK_EMPLOYEES, EmployeeItem } from '@/lib/mock/hrd';
import { useAuth } from '@/hooks/auth/useAuth';

export const HrdPerformanceView = () => {
  const { user } = useAuth();
  const [employees] = useState<EmployeeItem[]>(MOCK_EMPLOYEES);
  const [selectedEmp, setSelectedEmp] = useState<EmployeeItem | null>(null);
  const [kpiForm, setKpiForm] = useState({
    score: 95,
    achievement: '100% Exceeded',
    reviewNotes: 'Kinerja luar biasa dalam efisiensi operasional dan kepemimpinan tim.'
  });

  const canManage = Boolean(user);

  const handleOpenEdit = (emp: EmployeeItem) => {
    setSelectedEmp(emp);
    setKpiForm({
      score: 92,
      achievement: 'Target Exceeded',
      reviewNotes: 'Memenuhi ekspektasi kinerja kuartal ini dengan produktivitas tinggi.'
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmp) return;

    alert(`Penilaian KPI ${selectedEmp.fullName} berhasil diperbarui! Score: ${kpiForm.score}/100.`);
    setSelectedEmp(null);
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>KPI Kinerja</span>
          </h1>
          <p className="text-[11px] text-slate-500">Evaluasi Capaian Key Performance Indicator (KPI) & Review Kinerja Karyawan</p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm relative group">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{emp.fullName}</h4>
                <div className="text-[10px] text-slate-400">{emp.role} • {emp.unitUsaha}</div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 95/100
                </span>
                {canManage && (
                  <button
                    onClick={() => handleOpenEdit(emp)}
                    className="p-1 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                    title="Edit KPI Score"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Pencapaian Target KPI:</span>
                <span className="font-bold text-emerald-600">100% Exceeded</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[95%]"></div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 dark:text-slate-400 italic">
              "Kinerja luar biasa dalam efisiensi operasional dan kepemimpinan tim."
            </div>
          </div>
        ))}
      </div>

      {/* Edit KPI Modal */}
      {selectedEmp && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Input Review KPI - {selectedEmp.fullName}</span>
              </h3>
              <button onClick={() => setSelectedEmp(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Skor KPI (0 - 100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={kpiForm.score}
                  onChange={(e) => setKpiForm({ ...kpiForm, score: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Status Capaian Target</label>
                <input
                  type="text"
                  required
                  value={kpiForm.achievement}
                  onChange={(e) => setKpiForm({ ...kpiForm, achievement: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Catatan Evaluator / HR</label>
                <textarea
                  rows={3}
                  required
                  value={kpiForm.reviewNotes}
                  onChange={(e) => setKpiForm({ ...kpiForm, reviewNotes: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEmp(null)}
                  className="px-3 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 shadow-sm"
                >
                  Simpan Penilaian KPI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
