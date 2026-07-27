'use client';

import React, { useState } from 'react';
import { Cpu, Send, Sparkles, Brain, MessageSquare } from 'lucide-react';
import { useAi } from '@/hooks/ai/useAi';
import { SkeletonTable } from '@/components/ui/loader/skeleton/SkeletonTable';
import { SubTabNav, SubTabItem } from '@/components/ui/button/SubTabNav';
import { ModuleHeader } from '@/components/ui/cards/ModuleHeader';
import { DeepSeekProviderSelector } from './DeepSeekProviderSelector';
import { DeepSeekTrainingTab } from './DeepSeekTrainingTab';

export const AiView = () => {
  const { logs, loading, queryInput, setQueryInput, isProcessing, sendAiQuery } = useAi();
  const [activeTab, setActiveTab] = useState<'QUERY' | 'TRAINING'>('QUERY');

  const subTabs: SubTabItem[] = [
    { id: 'QUERY', label: 'Interaktif AI Chat', icon: MessageSquare },
    { id: 'TRAINING', label: 'Pelatihan & Knowledge DeepSeek', icon: Brain }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendAiQuery();
  };

  const handleSelectPrompt = (promptText: string) => {
    setQueryInput(promptText);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Universal Module Header */}
      <ModuleHeader
        title="AI Assistant"
        icon={Cpu}
        iconBgColor="bg-violet-500/10 text-violet-600 dark:text-violet-400"
        glossaryTitle="Glossary Engine AI & DeepSeek"
        glossaryItems={[
          { term: 'DeepSeek-R1', description: 'Engine AI penalaran finansial, Text-to-SQL, & analisis rasio bisnis.' },
          { term: 'Fine-Tuning', description: 'Pelatihan model AI berbasis data spesifik aturan bisnis ERP internal.' }
        ]}
      />

      {/* SubTab Navigation */}
      <SubTabNav
        activeTab={activeTab}
        onTabChange={setActiveTab as any}
        tabs={subTabs}
        colorScheme="indigo"
      />

      {/* Tab 1: Interactive Query */}
      {activeTab === 'QUERY' && (
        <div className="space-y-4">
          {/* Model Provider & Presets Bar */}
          <DeepSeekProviderSelector onSelectPrompt={handleSelectPrompt} />

          {/* Interactive AI Query Bar */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-2xl text-white shadow-xl space-y-3 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-violet-300">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Query AI DeepSeek-R1</span>
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
                    ? 'bg-amber-500 animate-pulse text-slate-950'
                    : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30'
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
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Riwayat AI Logs & Analysis Output</div>

              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-mono">{log.timestamp}</span>
                      <span className="px-2 py-0.5 bg-violet-500/10 text-violet-600 dark:text-violet-400 font-mono font-bold rounded">
                        DeepSeek-R1
                      </span>
                    </div>

                    <div className="font-bold text-slate-900 dark:text-white">
                      Q: {log.userQuery}
                    </div>

                    <div className="text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-[11px] whitespace-pre-wrap">
                      {log.aiResponse}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: DeepSeek Model Training & Knowledge Manager */}
      {activeTab === 'TRAINING' && <DeepSeekTrainingTab />}
    </div>
  );
};
