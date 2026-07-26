'use client';

import React, { useState } from 'react';
import { UserPlus, MessageSquare, CheckCircle, Calendar, HelpCircle, X, CheckCircle2, XCircle, Send, FileText, Briefcase } from 'lucide-react';
import { useRecruitment } from '@/hooks/hrd/useRecruitment';
import { ApplicantCandidate } from '@/lib/mock/recruitment';

export const HrdRecruitmentView = () => {
  const { fptks, vacancies, applicants, newApplicantsCount, approveFptk, scheduleInterview, executeHiringScenario } = useRecruitment();
  const [activeTab, setActiveTab] = useState<'PIPELINE' | 'FPTK' | 'VACANCIES'>('PIPELINE');
  const [showGlossary, setShowGlossary] = useState(false);

  // Modal State for Interview & 4 Scenarios
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantCandidate | null>(null);
  const [isInterviewModal, setIsInterviewModal] = useState(false);
  const [isOfferingModal, setIsOfferingModal] = useState(false);

  const [interviewDate, setInterviewDate] = useState('2026-07-29 10:00 WIB');
  const [interviewNotes, setInterviewNotes] = useState('Wawancara Kompetensi & Budaya Perusahaan');

  const [offeringSalary, setOfferingSalary] = useState(9000000);
  const [selectedScenario, setSelectedScenario] = useState<1 | 2 | 3 | 4>(4);

  const handleOpenInterview = (app: ApplicantCandidate) => {
    setSelectedApplicant(app);
    setIsInterviewModal(true);
  };

  const handleOpenOffering = (app: ApplicantCandidate) => {
    setSelectedApplicant(app);
    setIsOfferingModal(true);
  };

  const handleSaveInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApplicant) return;
    scheduleInterview(selectedApplicant.id, interviewDate, interviewNotes);
    alert(`Undangan Interview Berhasil Dikirim via WhatsApp OpenClaw ke ${selectedApplicant.phone}!`);
    setIsInterviewModal(false);
  };

  const handleSaveOffering = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApplicant) return;
    executeHiringScenario(selectedApplicant.id, selectedScenario, offeringSalary, 'HIRED');
    alert(`Proses Offering Skenario ${selectedScenario} Berhasil Di-eksekusi!`);
    setIsOfferingModal(false);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl shrink-0">
            <UserPlus className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Rekrutmen & FPTK</span>
          </h1>

          <div className="relative">
            <button onClick={() => setShowGlossary(!showGlossary)} className="text-slate-400 hover:text-sky-500 p-1 cursor-pointer">
              <HelpCircle className="w-4 h-4" />
            </button>
            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-sky-400">
                  <span>Pusat Rekrutmen Smart WA Bot</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Integrasi WhatsApp Bot (OpenClaw + DeepSeek AI) untuk mengurai CV pelamar secara otomatis dan mengelola 4 Skenario Wawancara & Offering hingga otomatis mendaftar ke Master Karyawan.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('PIPELINE')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'PIPELINE' ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Pelamar WA Bot ({applicants.length})</span>
            {newApplicantsCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                {newApplicantsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('FPTK')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'FPTK' ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Permintaan FPTK ({fptks.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('VACANCIES')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'VACANCIES' ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Lowongan Kerja ({vacancies.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Content: Pipeline */}
      {activeTab === 'PIPELINE' && (
        <div className="space-y-3">
          {applicants.map((app) => (
            <div key={app.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{app.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{app.source}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{app.appliedDate}</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-semibold">
                    Posisi: {app.appliedPosition} ({app.departmentName})
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => handleOpenInterview(app)} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1 cursor-pointer">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Jadwal WA Interview</span>
                  </button>
                  <button onClick={() => handleOpenOffering(app)} className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-1 cursor-pointer">
                    <Send className="w-3.5 h-3.5" />
                    <span>Offering & Skenario</span>
                  </button>
                </div>
              </div>

              {/* Applicant Details & WA Log */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-500">
                <div>
                  <p><strong>Pengalaman:</strong> {app.experienceSummary}</p>
                  <p><strong>Lampiran CV:</strong> <span className="text-sky-500 underline cursor-pointer">{app.cvFileName}</span></p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">OpenClaw Log:</div>
                  {app.waNotificationLog?.map((log, idx) => (
                    <div key={idx} className="text-[10px] text-slate-500 font-mono">{log}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Interview */}
      {isInterviewModal && selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleSaveInterview} className="bg-white dark:bg-slate-900 w-full max-w-md p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Jadwalkan Wawancara WA - {selectedApplicant.name}</h3>
              <button type="button" onClick={() => setIsInterviewModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Waktu & Lokasi Interview:</label>
              <input type="text" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" />
              <label className="font-semibold text-slate-700 dark:text-slate-300">Catatan HRD:</label>
              <textarea value={interviewNotes} onChange={(e) => setInterviewNotes(e.target.value)} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none" rows={2} />
            </div>
            <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md cursor-pointer">
              Kirim Undangan WA OpenClaw
            </button>
          </form>
        </div>
      )}

      {/* Modal 4 Offering Scenarios */}
      {isOfferingModal && selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleSaveOffering} className="bg-white dark:bg-slate-900 w-full max-w-lg p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Offering & 4 Skenario Hiring - {selectedApplicant.name}</h3>
              <button type="button" onClick={() => setIsOfferingModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Nominal Penawaran Gaji (Rp):</label>
                <input type="number" value={offeringSalary} onChange={(e) => setOfferingSalary(Number(e.target.value))} className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl focus:outline-none font-bold text-emerald-600" />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Pilih Skenario Offering:</label>
                <div className="space-y-1.5">
                  <label className="flex items-start gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input type="radio" name="scenario" checked={selectedScenario === 1} onChange={() => setSelectedScenario(1)} className="mt-0.5" />
                    <div><strong>Skenario 1:</strong> Offering Lisan di Interview ➔ Pelamar Menunggu Hasil Final</div>
                  </label>
                  <label className="flex items-start gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input type="radio" name="scenario" checked={selectedScenario === 2} onChange={() => setSelectedScenario(2)} className="mt-0.5" />
                    <div><strong>Skenario 2:</strong> Offering via WA Pasca Interview ➔ Pelamar Konfirmasi ➔ Menunggu Hasil</div>
                  </label>
                  <label className="flex items-start gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input type="radio" name="scenario" checked={selectedScenario === 3} onChange={() => setSelectedScenario(3)} className="mt-0.5" />
                    <div><strong>Skenario 3:</strong> Instant Offering & Direct Decision di Tempat (Hired/Rejected)</div>
                  </label>
                  <label className="flex items-start gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input type="radio" name="scenario" checked={selectedScenario === 4} onChange={() => setSelectedScenario(4)} className="mt-0.5" />
                    <div><strong>Skenario 4:</strong> Offering WA ➔ Candidate Confirm ➔ Auto-Hire & Convert to Employee Master</div>
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-md cursor-pointer">
              Eksekusi Skenario Hiring
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
