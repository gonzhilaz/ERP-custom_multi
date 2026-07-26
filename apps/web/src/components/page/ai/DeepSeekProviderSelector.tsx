'use client';

import React, { useState } from 'react';
import { Cpu, Sparkles, Database, CheckCircle2 } from 'lucide-react';

interface Props {
  onSelectPrompt: (promptText: string) => void;
}

export const DeepSeekProviderSelector = ({ onSelectPrompt }: Props) => {
  const [selectedModel, setSelectedModel] = useState('DEEPSEEK_R1');

  const presetPrompts = [
    { label: '📊 Omset Toko Roti Bulan Ini', text: 'Berapa total omset dan margin keuntungan Toko Roti Mahkota bulan ini?' },
    { label: '📦 Warning Terigu Kritis', text: 'Tampilkan daftar bahan baku persediaan di gudang yang berada di bawah reorder point.' },
    { label: '⛏️ Produksi Ore Tambang', text: 'Berapa total tonase galian ore emas dari Pit Block 4 minggu ini?' },
    { label: '🏨 Okupansi Hotel Today', text: 'Berapa persentase okupansi kamar hotel hari ini dan kamar dirty housekeeping?' }
  ];

  return (
    <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-sky-400" />
          <span className="font-bold">Enterprise AI Model Provider & OpenClaw Integrator</span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1 text-xs font-bold text-sky-400 focus:outline-none cursor-pointer"
          >
            <option value="DEEPSEEK_R1">🐋 DeepSeek-R1 (Financial Reasoning & Text-to-SQL)</option>
            <option value="DEEPSEEK_V3">⚡ DeepSeek-V3 (Fast Operational Chat)</option>
            <option value="OPENCLAW_LOCAL">🦞 OpenClaw Local LLM (Air-Gapped On-Premise)</option>
            <option value="GEMINI_PRO">✨ Cloud Gemini 1.5 Pro</option>
          </select>
        </div>
      </div>

      {/* Preset Prompts Pills */}
      <div className="space-y-1">
        <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Query Presets Instan (Text-to-SQL & Financial Analysis):
        </div>
        <div className="flex flex-wrap gap-1.5">
          {presetPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => onSelectPrompt(p.text)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-[10px] border border-slate-700 transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
