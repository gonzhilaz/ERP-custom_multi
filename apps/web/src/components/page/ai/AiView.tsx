'use client';

import React, { useState } from 'react';
import { Cpu, Send, MessageSquare, FileScan, Terminal, Sparkles, CheckCircle2, HelpCircle, X } from 'lucide-react';
import { useAi } from '@/hooks/ai/useAi';
import { SkeletonTable } from '@/components/ui/loader/skeleton/SkeletonTable';
import { DeepSeekProviderSelector } from './DeepSeekProviderSelector';

export const AiView = () => {
  const { logs, loading, queryInput, setQueryInput, isProcessing, sendAiQuery } = useAi();
  const [showGlossary, setShowGlossary] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendAiQuery();
  };

  const handleSelectPrompt = (promptText: string) => {
    setQueryInput(promptText);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-violet-500 animate-pulse" />
            <span>AI Assistant</span>
          </h1>

          <div className="relative">
            <button
              onClick={() => setShowGlossary(!showGlossary)}
              className="text-slate-400 hover:text-violet-500 transition-colors p-1 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {showGlossary && (
              <div className="absolute left-0 top-7 z-30 w-80 p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-bold text-violet-400">
                  <span>Glossary AI Automation Engine</span>
                  <button onClick={() => setShowGlossary(false)} className="text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  - <strong>DeepSeek-R1 / OpenClaw Local LLM</strong>: Engine AI otomatisasi analisis finansial, WhatsApp bot, & Text-to-SQL query.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Model Provider & Presets Bar */}
      <DeepSeekProviderSelector onSelectPrompt={handleSelectPrompt} />

      {/* Interactive AI Query Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-2xl text-white shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-violet-300">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span>Query AI</span>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Contoh: Tampilkan daftar bahan baku persediaan di gudang yang berada di bawah reorder point..."
            className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-slate-400 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button
            type="submit"
            disabled={isProcessing}
            className={`px-5 py-3 rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
              isProcessing
                ? 'bg-amber-500 animate-pulse'
                : 'bg-violet-600 hover:bg-violet-500 shadow-violet-600/30'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{isProcessing ? 'Menganalisis...' : 'Kirim Query'}</span>
          </button>
        </form>
      </div>

      {/* AI Log Activity Feed */}
      {loading ? (
        <SkeletonTable />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-sm">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Riwayat AI Logs</div>

          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {log.source === 'WHATSAPP_EXECUTIVE_BOT' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> WhatsApp Bot
                      </span>
                    ) : log.source === 'INVOICE_OCR_SCANNER' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center gap-1">
                        <FileScan className="w-3 h-3" /> Document OCR
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 flex items-center gap-1">
                        <Terminal className="w-3 h-3" /> IT Diagnostic
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 font-medium">{log.timestamp}</span>
                  </div>

                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PROCESSED
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900 dark:text-white">{log.userQuery}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 leading-relaxed font-mono">
                  {log.aiResponse}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
